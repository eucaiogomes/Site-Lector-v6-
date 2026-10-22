/**
 * Armazenamento dos leads do site — tabela leads_site (db/schema.sql).
 *
 * Dois provedores, escolhidos por DB_PROVIDER (ou deduzidos das variáveis presentes):
 *   postgres → DATABASE_URL: Postgres da Huawei Cloud, um Postgres local ou o próprio
 *              Postgres do Supabase (connection string do pooler).
 *   supabase → SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY: API REST do Supabase.
 *              A chave é de servidor — nunca vai para o navegador.
 *
 * Sem nenhuma configuração, saveLead() não grava nada e os formulários seguem só
 * mandando e-mail, como antes. O "_" no nome da pasta impede a Vercel de publicar
 * este arquivo como função.
 */
const TABLE = 'leads_site';
const SELECT = 'id,criado_em,tipo,nome,empresa,email,telefone,interesse,mensagem,origem,pagina,dados';
/** Teto da listagem do admin (os filtros e a paginação do relatório rodam no navegador). */
const MAX_LIST = 5000;

/** Limite de caracteres por coluna: o formulário é público, então nada entra sem corte. */
const LIMITS = {
  nome: 200,
  empresa: 200,
  email: 320,
  telefone: 60,
  interesse: 300,
  mensagem: 5000,
  origem: 200,
  pagina: 500,
};
const MAX_EXTRA_KEYS = 30;
const MAX_EXTRA_VALUE = 2000;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function provider() {
  const p = String(process.env.DB_PROVIDER || '').trim().toLowerCase();
  if (p === 'postgres' || p === 'supabase') return p;
  if (p === 'none' || p === 'off') return null;
  if (p) {
    console.warn(`[leads-db] DB_PROVIDER="${p}" desconhecido (use postgres ou supabase); leads não serão gravados.`);
    return null;
  }
  if (process.env.DATABASE_URL) return 'postgres';
  if (process.env.SUPABASE_URL && supabaseKey()) return 'supabase';
  return null;
}

function cut(value, max) {
  const s = value == null ? '' : String(value).trim();
  return s ? s.slice(0, max) : null;
}

/* ── Postgres (pg) ────────────────────────────────────────────────────────── */
let pool = null;

/**
 * DATABASE_SSL: disable | require (criptografa sem validar o certificado) | verify.
 * Padrão: sem SSL em localhost, "require" para qualquer outro host (Huawei RDS, Supabase).
 */
function sslOption(connectionString) {
  const mode = String(process.env.DATABASE_SSL || '').trim().toLowerCase();
  if (['disable', 'off', 'false', '0'].includes(mode)) return false;
  if (mode === 'verify') {
    return process.env.DATABASE_SSL_CA
      ? { rejectUnauthorized: true, ca: process.env.DATABASE_SSL_CA.replace(/\\n/g, '\n') }
      : { rejectUnauthorized: true };
  }
  if (mode) return { rejectUnauthorized: false };
  return /@(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/.test(connectionString) ? false : { rejectUnauthorized: false };
}

/** Parâmetros ssl* da URL sobrescreveriam a opção acima no driver: quem manda é DATABASE_SSL. */
function withoutSslParams(connectionString) {
  try {
    const u = new URL(connectionString);
    ['ssl', 'sslmode', 'sslcert', 'sslkey', 'sslrootcert'].forEach((k) => u.searchParams.delete(k));
    return u.toString();
  } catch {
    return connectionString;
  }
}

function pgPool() {
  if (pool) return pool;
  const { Pool } = require('pg');
  const raw = process.env.DATABASE_URL;
  pool = new Pool({
    connectionString: withoutSslParams(raw),
    ssl: sslOption(raw),
    max: Number(process.env.DATABASE_POOL_MAX || 3),
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 8000,
  });
  pool.on('error', (err) => console.error('[leads-db] erro no pool do Postgres:', err.message));
  return pool;
}

async function pgInsert(row) {
  await pgPool().query(
    `INSERT INTO ${TABLE} (tipo, nome, empresa, email, telefone, interesse, mensagem, origem, pagina, dados)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [row.tipo, row.nome, row.empresa, row.email, row.telefone, row.interesse, row.mensagem, row.origem, row.pagina, JSON.stringify(row.dados)]
  );
}

async function pgList(limit) {
  const { rows } = await pgPool().query(
    `SELECT ${SELECT} FROM ${TABLE} ORDER BY criado_em DESC, id DESC LIMIT $1`,
    [limit]
  );
  return rows;
}

/* ── Supabase (REST / PostgREST) ──────────────────────────────────────────── */
function supabaseKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || '';
}

function supabaseRequest(path, init = {}) {
  const base = String(process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  const key = supabaseKey();
  const headers = { apikey: key, 'Content-Type': 'application/json', ...(init.headers || {}) };
  // A service_role clássica é um JWT e vai também no Authorization; a secret key nova (sb_secret_…) só no apikey.
  if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;
  return fetch(`${base}/rest/v1/${path}`, { ...init, headers, signal: AbortSignal.timeout(8000) });
}

async function supabaseFail(r) {
  const text = await r.text().catch(() => '');
  return new Error(`Supabase respondeu ${r.status}: ${text.slice(0, 300)}`);
}

async function supabaseInsert(row) {
  const r = await supabaseRequest(TABLE, {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(row),
  });
  if (!r.ok) throw await supabaseFail(r);
}

/** O Supabase devolve no máximo 1000 linhas por chamada: busca em páginas até o limite. */
async function supabaseList(limit) {
  const PAGE = 1000;
  const out = [];
  for (let offset = 0; offset < limit; offset += PAGE) {
    const size = Math.min(PAGE, limit - offset);
    const r = await supabaseRequest(`${TABLE}?select=${SELECT}&order=criado_em.desc,id.desc&limit=${size}&offset=${offset}`);
    if (!r.ok) throw await supabaseFail(r);
    const rows = await r.json();
    out.push(...rows);
    if (rows.length < size) break;
  }
  return out;
}

/* ── API do módulo ────────────────────────────────────────────────────────── */

/** Monta a linha a partir dos campos do formulário, com cortes de tamanho. */
function toRow(lead) {
  const row = { tipo: lead.tipo === 'newsletter' ? 'newsletter' : 'contato' };
  Object.keys(LIMITS).forEach((k) => {
    row[k] = cut(lead[k], LIMITS[k]);
  });
  row.dados = lead.dados && typeof lead.dados === 'object' ? lead.dados : {};
  return row;
}

/**
 * Grava um lead. Nunca lança: falha de banco não pode derrubar o envio do formulário.
 * @returns {Promise<{ configured: boolean, saved: boolean }>}
 */
async function saveLead(lead) {
  const p = provider();
  if (!p) return { configured: false, saved: false };
  const row = toRow(lead);
  if (!row.email) return { configured: true, saved: false };
  try {
    if (p === 'postgres') await pgInsert(row);
    else await supabaseInsert(row);
    return { configured: true, saved: true };
  } catch (err) {
    console.error(`[leads-db] falha ao gravar lead (${p}):`, err.message);
    return { configured: true, saved: false };
  }
}

/**
 * Leads mais recentes primeiro (até MAX_LIST). Lança em erro de banco.
 * @returns {Promise<{ provider: string, leads: object[], truncated: boolean }>}
 */
async function listLeads() {
  const p = provider();
  if (!p) {
    const err = new Error('Banco de leads não configurado');
    err.code = 'db_not_configured';
    throw err;
  }
  const rows = p === 'postgres' ? await pgList(MAX_LIST + 1) : await supabaseList(MAX_LIST + 1);
  return { provider: p, leads: rows.slice(0, MAX_LIST), truncated: rows.length > MAX_LIST };
}

/**
 * Campos que o formulário mandou além dos conhecidos (cargo, desafio, campanha, utm_*…),
 * só valores simples e com limite de chaves/tamanho.
 */
function extrasFrom(body, knownKeys) {
  const out = {};
  if (!body || typeof body !== 'object') return out;
  let count = 0;
  for (const [key, value] of Object.entries(body)) {
    if (count >= MAX_EXTRA_KEYS) break;
    if (knownKeys.includes(key) || !/^[\w.-]{1,60}$/.test(key)) continue;
    if (value == null || value === '') continue;
    if (typeof value === 'boolean' || typeof value === 'number') out[key] = value;
    else if (typeof value === 'string') out[key] = value.trim().slice(0, MAX_EXTRA_VALUE);
    else continue;
    count += 1;
  }
  return out;
}

/**
 * Página do envio: `pagina` do corpo ou o Referer (mesma origem manda o caminho completo).
 * UTMs da URL da página entram nos extras quando o formulário não mandou as próprias.
 */
function pageFrom(req, body, dados) {
  let pagina = body && typeof body.pagina === 'string' ? body.pagina : '';
  const referer = req.headers && req.headers.referer;
  if (referer) {
    try {
      const u = new URL(referer);
      if (!pagina) pagina = u.pathname;
      UTM_KEYS.forEach((k) => {
        const v = u.searchParams.get(k);
        if (v && dados && !dados[k]) dados[k] = v.slice(0, 200);
      });
    } catch {
      /* Referer inválido: segue sem página */
    }
  }
  return pagina;
}

module.exports = { provider, saveLead, listLeads, extrasFrom, pageFrom };
