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
  const email = String(body.email || '').trim();
  const origem = String(body.origem || '').trim();
  const pagina = String(body.pagina || '').trim();

  // Honeypot: bots fill hidden fields, real users leave it blank
  if (String(body.website || '').trim()) {
    res.status(200).json({ ok: true });
    return;
  }

  if (!email || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: 'invalid_email' });
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

  const quando = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const rows = [
    ['E-mail', email],
    ['Origem', origem || '—'],
    ['Página', pagina || '—'],
    ['Data', `${quando} (horário de Brasília)`],
  ];

  const html =
    '<h2>Nova inscrição na newsletter</h2>' +
    `<p>O e-mail <strong>${escapeHtml(email)}</strong> deseja receber a newsletter da Lector ` +
    '(novidades sobre T&amp;D, IA e aprendizado).</p>' +
    '<table cellpadding="6" style="border-collapse:collapse">' +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`
      )
      .join('') +
    '</table>';

  try {
    await transporter.sendMail({
      from: `"Site Lector" <${EMAIL_USER}>`,
      to,
      replyTo: email,
      subject: `Newsletter: ${email} quer receber novidades`,
      html,
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('newsletter send error', err);
    res.status(500).json({ ok: false, error: 'send_failed' });
  }
};
