/**
 * Cadastro do lead como usuário no portal Lector (Lector Web Service — mesmas chamadas da tela
 * Cadastros › Usuários do portal). Documentação: https://documenter.getpostman.com/view/2372983/SVSDPWfq
 *
 *   LECTOR_API_URL        https://lector.live/lector-web-service
 *   LECTOR_PORTAL_ID      ID do portal (lector_modelo = 1115)
 *   LECTOR_API_USER       login de uma conta com permissão de criar usuários no portal
 *   LECTOR_API_PASSWORD   senha dessa conta
 *   LECTOR_PROFILE_ID     perfil dado ao lead (Aluno = 10790 no lector_modelo)
 *   LECTOR_GROUP_IDS      grupos/cargos do lead, separados por vírgula (Grupo Leads = 406925 + Cargo Leads)
 *
 * Fluxo: login (cookie rememberMe, reaproveitado) → o e-mail já existe na Lector? → se não, saveUser
 * (com o perfil) → saveUserPassword (senha inicial) → addMember em cada grupo/cargo.
 *
 * SEGURANÇA — usuários da Lector são globais (um e-mail vale para todos os portais):
 *   - E-mail que já existe na Lector nunca é alterado: nem dados, nem senha, nem grupos. Sem essa trava,
 *     qualquer visitante trocaria a senha de outro usuário digitando o e-mail dele no formulário.
 *   - Só recebe senha o usuário que esta integração criou (ID guardado no lead em portal_usuario_id).
 */
const crypto = require('crypto');

const TIMEOUT_MS = 10000;

/** Cookies de sessão da conta de serviço ("rememberMe=…; JSESSIONID=…"), reaproveitados enquanto a instância vive. */
let session = null;

function config() {
  return {
    base: String(process.env.LECTOR_API_URL || 'https://lector.live/lector-web-service').replace(/\/+$/, ''),
    portalId: Number(process.env.LECTOR_PORTAL_ID) || 0,
    user: String(process.env.LECTOR_API_USER || '').trim(),
    password: String(process.env.LECTOR_API_PASSWORD || ''),
    profileId: Number(process.env.LECTOR_PROFILE_ID) || 0,
    groupIds: String(process.env.LECTOR_GROUP_IDS || '')
      .split(',')
      .map((s) => Number(s.trim()))
      .filter((n) => n > 0),
  };
}

function isConfigured() {
  const c = config();
  return Boolean(c.portalId && c.user && c.password);
}

class PortalError extends Error {}

async function call(path, { method = 'GET', form, json, cookie, headers: extra } = {}) {
  const headers = { Accept: 'application/json, text/plain, */*', 'X-Requested-With': 'XMLHttpRequest', ...extra };
  let body;
  if (form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    body = new URLSearchParams(form).toString();
  } else if (json) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  }
  if (cookie) headers.Cookie = cookie;
  const res = await fetch(config().base + path, { method, headers, body, redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS) });
  return { status: res.status, text: await res.text(), headers: res.headers };
}

async function login() {
  const c = config();
  // Igual à tela de login do portal: accountId no corpo + Authorization Basic (a doc do Postman não cita os dois).
  const r = await call('/security/login', {
    method: 'POST',
    form: { username: c.user, password: c.password, remember: 'true', accountId: String(c.portalId) },
    headers: { Authorization: `Basic ${Buffer.from(`${c.user}:${c.password}`).toString('base64')}` },
  });
  if (r.status !== 200) throw new PortalError(`login da conta de serviço recusado (HTTP ${r.status}): ${r.text.slice(0, 120)}`);
  // A resposta traz "rememberMe=deleteMe" (limpa a sessão antiga) e depois o rememberMe novo: vale o último.
  const list = typeof r.headers.getSetCookie === 'function' ? r.headers.getSetCookie() : String(r.headers.get('set-cookie') || '').split(/,(?=\s*\w+=)/);
  const last = (name) => list
    .map((c) => new RegExp(`^\\s*${name}=([^;]*)`).exec(c))
    .filter((m) => m && m[1] && m[1] !== 'deleteMe')
    .map((m) => m[1])
    .pop();
  const remember = last('rememberMe');
  if (!remember) throw new PortalError('login sem cookie rememberMe na resposta');
  const jsession = last('JSESSIONID');
  return `rememberMe=${remember}${jsession ? `; JSESSIONID=${jsession}` : ''}`;
}

/** Chamada autenticada; sessão vencida (401/403/redirect para login) refaz o login uma vez. */
async function authed(path, opts = {}) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    if (!session) session = await login();
    const r = await call(path, { ...opts, cookie: session });
    if (r.status !== 401 && r.status !== 403 && !(r.status >= 300 && r.status < 400)) return r;
    session = null;
  }
  throw new PortalError(`sem permissão na API (${path})`);
}

/** Usuário da Lector com este e-mail, em qualquer portal (busca exata), ou null. */
async function findGlobalUser(email) {
  const r = await authed(`/users/0?userMail=${encodeURIComponent(email)}`);
  if (r.status === 404) return null;
  if (r.status !== 200) throw new PortalError(`busca de usuário falhou (HTTP ${r.status})`);
  try {
    const u = JSON.parse(r.text);
    return u && u.id ? u : null;
  } catch {
    throw new PortalError('busca de usuário devolveu resposta inválida');
  }
}

/** O usuário já está neste portal? A busca do relatório é por "contém", então confere o e-mail exato. */
async function isInPortal(email) {
  const r = await authed('/report/users', {
    method: 'POST',
    form: {
      start: '0',
      length: '10',
      accountId: String(config().portalId),
      preferredLanguage: 'pt_BR',
      'columns[0][data]': 'userEmail',
      'filter[0][column]': 'userEmail',
      'filter[0][type]': 'string',
      'filter[0][argument]': email,
    },
  });
  if (r.status !== 200) return false;
  try {
    const list = JSON.parse(r.text).data || [];
    return list.some((u) => String(u.userEmail || '').toLowerCase() === email.toLowerCase() && !u.removed);
  } catch {
    return false;
  }
}

/** "Mariana de Souza Lima" → { firstname: "Mariana", lastname: "de Souza Lima" }. O portal exige sobrenome para definir senha. */
function splitName(nome) {
  const parts = String(nome || '').trim().split(/\s+/).filter(Boolean);
  return { firstname: parts[0] || 'Lead', lastname: parts.slice(1).join(' ') || '-' };
}

/** Senha inicial: primeiro nome (sem acento) + "@" + 4 dígitos aleatórios. Ex.: "Mariana@4821". */
function initialPassword(nome) {
  const first = String(nome || '')
    .trim()
    .split(/\s+/)[0]
    .normalize('NFD')
    .replace(/[^A-Za-z]/g, '');
  const base = first.length >= 3 ? first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() : 'Lector';
  return `${base}@${crypto.randomInt(1000, 10000)}`;
}

/** Resumo do usuário no portal, no formato do cadastro manual ("Tenho interesse em …"). */
function abstractFor(lead) {
  const lines = [];
  if (lead.interesseLabel) lines.push(`Tenho interesse em ${lead.interesseLabel}.`);
  if (lead.empresa) lines.push(`Empresa: ${lead.empresa}`);
  if (lead.mensagem) lines.push(lead.mensagem);
  lines.push(`Lead do site Lector (${lead.formulario || lead.origem || 'formulário'}).`);
  return lines.join('\n').slice(0, 2000);
}

function userModel(lead) {
  const c = config();
  const { firstname, lastname } = splitName(lead.nome);
  const email = String(lead.email).trim().toLowerCase();
  return {
    '@class': 'AccountUserModel',
    type: 'USER',
    profiles: c.profileId ? [{ profile: { profile: { id: c.profileId } } }] : [],
    language: 'pt-BR',
    abstract: { pt_BR: abstractFor(lead) },
    firstname,
    lastname,
    username: email,
    email,
    phoneNumber: lead.telefone || null,
    hiredPosition: (lead.dados && lead.dados.cargo) || null,
    customFields: [],
    preferences: JSON.stringify({ language: 'pt-BR' }),
  };
}

/**
 * Cadastra o lead no portal. Nunca lança.
 * @param lead { email, nome, empresa, telefone, mensagem, interesseLabel, formulario, dados, portal_usuario_id }
 * @param opts.skipGroups reenvio de acesso: o usuário já está nos grupos, só troca a senha
 * @returns {Promise<{ status: 'criado'|'ja_existia'|'erro', userId: number|null, detalhe: string|null, password?: string }>}
 */
async function provisionLead(lead, { skipGroups = false } = {}) {
  const c = config();
  const email = String(lead.email || '').trim().toLowerCase();
  if (!email || !lead.nome) return { status: 'erro', userId: null, detalhe: 'Lead sem nome ou e-mail: não dá para criar o usuário.' };

  let userId = Number(lead.portal_usuario_id) || null;
  const model = userModel(lead);
  try {
    // Usuário que esta integração já criou numa tentativa anterior: retoma de onde parou.
    if (!userId) {
      const existing = await findGlobalUser(email);
      if (existing) {
        const here = await isInPortal(email);
        return {
          status: 'ja_existia',
          userId: existing.id,
          detalhe: here
            ? `Já era usuário deste portal (ID ${existing.id}). Nada foi alterado.`
            : `E-mail já usado na Lector em outro portal (ID ${existing.id}). Nada foi alterado; inclua no portal manualmente, se for o caso.`,
        };
      }
      const r = await authed(`/accounts/${c.portalId}/saveUser`, { method: 'POST', json: model });
      if (r.status !== 200 || !/^\d+$/.test(r.text.trim())) {
        if (/already exists/i.test(r.text)) return { status: 'ja_existia', userId: null, detalhe: 'O portal informou que o usuário já existe. Nada foi alterado.' };
        throw new PortalError(`criação do usuário falhou (HTTP ${r.status}): ${r.text.slice(0, 160)}`);
      }
      userId = Number(r.text.trim());
    }
  } catch (err) {
    return { status: 'erro', userId, detalhe: err instanceof PortalError ? err.message : `Falha ao falar com o portal: ${err.message}` };
  }

  const password = initialPassword(lead.nome);
  try {
    const r = await authed(`/accounts/${c.portalId}/saveUserPassword`, { method: 'POST', json: { ...model, id: userId, password } });
    if (r.status !== 200) throw new PortalError(`HTTP ${r.status}: ${r.text.slice(0, 160)}`);
  } catch (err) {
    return { status: 'erro', userId, detalhe: `Usuário criado (ID ${userId}), mas a senha não foi definida: ${err.message}` };
  }

  const failed = [];
  for (const groupId of skipGroups ? [] : c.groupIds) {
    try {
      const r = await authed(`/accountGroup/addMember/accountGroup/${groupId}/member/${userId}`, { method: 'POST' });
      if (r.status !== 200) failed.push(groupId);
    } catch {
      failed.push(groupId);
    }
  }
  return {
    status: 'criado',
    userId,
    password,
    detalhe: failed.length ? `Usuário criado, mas não entrou no(s) grupo(s)/cargo(s) ${failed.join(', ')}.` : null,
  };
}

/** Só para testes: esquece o cookie da conta de serviço. */
function resetSession() {
  session = null;
}

module.exports = { isConfigured, provisionLead, initialPassword, splitName, resetSession };
