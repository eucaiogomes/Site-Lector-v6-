const auth = require('../_lib/admin-auth');

const FAIL_DELAY_MS = 400;

/** POST { email, password } → cookie de sessão do admin. */
module.exports = async function handler(req, res) {
  auth.noStore(res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  if (!auth.isConfigured()) {
    res.status(500).json({ ok: false, error: 'server_not_configured' });
    return;
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (!auth.checkCredentials(body.email, body.password)) {
    // Atraso fixo: encarece tentativa em série (o server.js ainda limita POST por IP).
    await new Promise((r) => setTimeout(r, FAIL_DELAY_MS));
    res.status(401).json({ ok: false, error: 'invalid_credentials' });
    return;
  }

  const email = auth.startSession(req, res);
  res.status(200).json({ ok: true, email });
};
