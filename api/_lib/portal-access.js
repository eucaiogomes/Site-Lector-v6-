/**
 * Acesso ao portal Lector para o lead: cria o usuário (lector-portal.js), manda ao lead o e-mail com
 * login e senha e grava o resultado em leads_site (portal_status, portal_usuario_id, portal_detalhe).
 *
 * Só para a landing Unimeds: o lead pediu o microlearning "Segurança de dados na saúde" e a conta é o
 * acesso a ele dentro do portal. Os outros formulários só gravam o lead e avisam o comercial.
 *
 * A senha só existe no e-mail enviado ao lead: não vai para o banco, para o log nem para o admin.
 * Usado depois do envio do formulário (api/contact.js, em segundo plano) e pelo botão do admin
 * (api/admin/portal-access.js).
 */
const nodemailer = require('nodemailer');
const portal = require('./lector-portal');
const db = require('./leads-db');
const { buildPortalAccessEmail } = require('./emails/portal-access-email');

const PORTAL_URL = () => String(process.env.LECTOR_PORTAL_URL || 'https://lector.live/lector_modelo').replace(/\/+$/, '');

/** Formulários que dão acesso ao portal (início da `origem`; a landing anexa " · utm_source · utm_campaign"). */
const PORTAL_ORIGENS = ['lp-unimeds'];

/**
 * O lead ganha (ou pode receber de novo) acesso ao portal? Lead da landing Unimeds, ou alguém que esta
 * integração já criou no portal (o "Reenviar acesso" do admin continua valendo para ele).
 */
function isEligible(lead) {
  if (!lead || lead.tipo !== 'contato') return false;
  const origem = String(lead.origem || '');
  if (PORTAL_ORIGENS.some((o) => origem.startsWith(o))) return true;
  return lead.portal_status === 'criado' || (lead.portal_status === 'erro' && Boolean(lead.portal_usuario_id));
}

/** <select name="interesse"> do modal e da página Contato (as landings já mandam o texto pronto). */
const INTERESSES = {
  diagnostico: 'diagnóstico gratuito',
  demonstracao: 'uma demonstração da plataforma',
  especialista: 'falar com um especialista',
  conteudo: 'conteúdo sob demanda',
  nr1: 'NR-1',
  vendas: 'Copiloto de Vendas',
  servicos: 'Serviços Especializados',
  outro: 'outro assunto',
};

async function sendAccessEmail(lead, password) {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) throw new Error('SMTP não configurado (EMAIL_USER / EMAIL_PASS)');
  const firstname = portal.splitName(lead.nome).firstname;
  const login = String(lead.email).trim().toLowerCase();
  const email = buildPortalAccessEmail({ firstname, login, password, url: PORTAL_URL() });
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: EMAIL_USER, pass: EMAIL_PASS } });
  await transporter.sendMail({
    from: `"Lector" <${EMAIL_USER}>`,
    to: login,
    replyTo: String(EMAIL_TO || EMAIL_USER).split(',')[0].trim(),
    subject: email.subject,
    html: email.html,
    text: email.text,
    attachments: email.attachments,
  });
}

/**
 * Cadastra o lead no portal e avisa o lead por e-mail. Nunca lança.
 * @param lead linha de leads_site (precisa de id, tipo, nome, email…)
 * @returns {Promise<{ status: string, userId: number|null, detalhe: string|null }>}
 */
async function grantPortalAccess(lead) {
  if (!portal.isConfigured()) return { status: null, userId: null, detalhe: 'Integração com o portal não configurada.' };
  if (!isEligible(lead)) return { status: null, userId: null, detalhe: 'Só leads da landing Unimeds ganham acesso ao portal.' };

  const result = await portal.provisionLead({
    ...lead,
    interesseLabel: INTERESSES[lead.interesse] || lead.interesse || '',
    formulario: [lead.origem, lead.pagina].filter(Boolean).join(' · '),
  }, {
    // Reenvio de acesso de quem já foi cadastrado sem pendência: só troca a senha.
    skipGroups: lead.portal_status === 'criado' && !lead.portal_detalhe,
  });

  const { password, ...saved } = result;
  if (result.status === 'criado' && password) {
    try {
      await sendAccessEmail(lead, password);
    } catch (err) {
      console.error(`[portal-access] lead ${lead.id}: e-mail de acesso não enviado:`, err.message);
      saved.detalhe = [saved.detalhe, `E-mail com a senha não foi enviado (${err.message}). Use "Reenviar acesso" no admin.`].filter(Boolean).join(' ');
    }
  }

  try {
    await db.setPortalResult(lead.id, saved);
  } catch (err) {
    console.error(`[portal-access] lead ${lead.id}: resultado não gravado:`, err.message);
  }
  console.log(`[portal-access] lead ${lead.id}: ${saved.status}${saved.userId ? ` (usuário ${saved.userId})` : ''}${saved.detalhe ? ` — ${saved.detalhe}` : ''}`);
  return saved;
}

module.exports = { grantPortalAccess, isEligible };
