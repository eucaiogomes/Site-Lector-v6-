const auth = require('../_lib/admin-auth');

/** POST → apaga o cookie de sessão do admin. */
module.exports = async function handler(req, res) {
  auth.noStore(res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  auth.endSession(req, res);
  res.status(200).json({ ok: true });
};
