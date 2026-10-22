const auth = require('../_lib/admin-auth');
const db = require('../_lib/leads-db');

/** GET → leads do site, mais recentes primeiro (Relatórios › Leads site). Exige sessão do admin. */
module.exports = async function handler(req, res) {
  auth.noStore(res);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  if (!auth.requireAdmin(req, res)) return;

  try {
    const { provider, leads, truncated } = await db.listLeads();
    res.status(200).json({ ok: true, provider, truncated, leads });
  } catch (err) {
    if (err.code === 'db_not_configured') {
      res.status(503).json({ ok: false, error: 'db_not_configured' });
      return;
    }
    console.error('[api/admin/leads] falha ao listar:', err.message);
    res.status(500).json({ ok: false, error: 'db_error' });
  }
};
