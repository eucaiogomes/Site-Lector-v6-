const nodemailer = require('nodemailer');
const { waitUntil } = require('@vercel/functions');
const db = require('./_lib/leads-db');
const portal = require('./_lib/lector-portal');
const { grantPortalAccess } = require('./_lib/portal-access');

/** Campos com coluna própria em leads_site; o resto do corpo vai para `dados`. */
const KNOWN_FIELDS = ['nome', 'empresa', 'email', 'telefone', 'interesse', 'mensagem', 'origem', 'pagina', 'website'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const body = req.body || {};
  const nome = String(body.nome || '').trim();
  const empresa = String(body.empresa || '').trim();
  const email = String(body.email || '').trim();
  const telefone = String(body.telefone || '').trim();
  const interesse = String(body.interesse || '').trim();
  const mensagem = String(body.mensagem || '').trim();
  const origem = String(body.origem || '').trim();

  // Honeypot: bots fill hidden fields, real users leave it blank
  if (String(body.website || '').trim()) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!nome || !empresa || !email || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: 'invalid_fields' });
    return;
  }

  // Grava primeiro: com o lead no banco, uma falha no e-mail não perde o contato.
  const dados = db.extrasFrom(body, KNOWN_FIELDS);
  const pagina = db.pageFrom(req, body, dados);
  const lead = { tipo: 'contato', nome, empresa, email, telefone, interesse, mensagem, origem, pagina, dados };
  const { saved, id } = await db.saveLead(lead);

  // Usuário no portal Lector + e-mail de acesso ao lead: em segundo plano, o formulário não espera.
  // Na Vercel o waitUntil mantém a função viva até terminar; no server.js o processo já continua rodando.
  if (saved && id && portal.isConfigured()) {
    waitUntil(grantPortalAccess({ ...lead, id }).catch((err) => console.error('[contact] acesso ao portal falhou:', err)));
  }

  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    if (saved) {
      res.status(200).json({ ok: true });
      return;
    }
    res.status(500).json({ ok: false, error: 'server_not_configured' });
    return;
  }

  const to = EMAIL_TO.split(',').map((s) => s.trim()).filter(Boolean);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const rows = [
    ['Nome', nome],
    ['Empresa', empresa],
    ['E-mail', email],
    ['Telefone', telefone || '—'],
    ['Interesse', interesse || '—'],
    ['Origem', origem || '—'],
  ];

  const html =
    '<h2>Novo contato pelo site Lector</h2>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`
      )
      .join('') +
    '</table>' +
    `<p style="font-weight:bold">Mensagem</p><p>${escapeHtml(mensagem || '—').replace(/\n/g, '<br>')}</p>`;

  try {
    await transporter.sendMail({
      from: `"Site Lector" <${EMAIL_USER}>`,
      to,
      replyTo: email,
      subject: `Novo contato: ${nome} (${empresa})`,
      html,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact form send error', err);
    if (saved) {
      res.status(200).json({ ok: true });
      return;
    }
    res.status(500).json({ ok: false, error: 'send_failed' });
  }
};
