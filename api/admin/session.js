const auth = require('../_lib/admin-auth');

/** GET → { ok, email } da sessão atual, ou 401 (o admin mostra a tela de login). */
module.exports = async function handler(req, res) {
  auth.noStore(res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const session = auth.requireAdmin(req, res);
  if (!session) return;
  res.status(200).json({ ok: true, email: session.email });
};
