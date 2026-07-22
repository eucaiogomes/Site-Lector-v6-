const nodemailer = require('nodemailer');

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

  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
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
    res.status(500).json({ ok: false, error: 'send_failed' });
  }
};
