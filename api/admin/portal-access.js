const auth = require('../_lib/admin-auth');
const db = require('../_lib/leads-db');
const portal = require('../_lib/lector-portal');
const { grantPortalAccess, isEligible } = require('../_lib/portal-access');

/**
 * POST { id } → cadastra o lead da landing Unimeds no portal Lector (ou reenvia o acesso com senha nova,
 * se foi esta integração que criou o usuário) e devolve o resultado. Botão do modal de detalhes do admin.
 */
module.exports = async function handler(req, res) {
  auth.noStore(res);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  if (!auth.requireAdmin(req, res)) return;

  if (!portal.isConfigured()) {
    res.status(503).json({ ok: false, error: 'portal_not_configured' });
    return;
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const id = String(body.id || '').trim();
  if (!/^\d+$/.test(id)) {
    res.status(400).json({ ok: false, error: 'invalid_id' });
    return;
  }

  let lead;
  try {
    lead = await db.getLead(id);
  } catch (err) {
    console.error('[api/admin/portal-access] falha ao ler o lead:', err.message);
    res.status(500).json({ ok: false, error: 'db_error' });
    return;
  }
  if (!lead) {
    res.status(404).json({ ok: false, error: 'not_found' });
    return;
  }
  if (lead.tipo !== 'contato') {
    res.status(400).json({ ok: false, error: 'newsletter_lead' });
    return;
  }
  if (!isEligible(lead)) {
    res.status(400).json({ ok: false, error: 'not_eligible' });
    return;
  }
  if (lead.portal_status === 'ja_existia') {
    res.status(409).json({ ok: false, error: 'user_already_existed' });
    return;
  }

  const result = await grantPortalAccess(lead);
  res.status(200).json({ ok: true, result });
};
