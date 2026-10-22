/**
 * Login do admin (/admin) — uma conta definida por variáveis de ambiente:
 *   ADMIN_EMAIL           e-mail de acesso
 *   ADMIN_PASSWORD        senha de acesso
 *   ADMIN_SESSION_SECRET  segredo que assina o cookie de sessão (32+ caracteres aleatórios).
 *                         Trocar o segredo derruba todas as sessões abertas.
 *
 * Sessão: cookie HttpOnly + SameSite=Strict com { e-mail, expiração } assinado em HMAC-SHA256.
 * Nada fica guardado no servidor, então funciona igual na Vercel (serverless) e no server.js.
 */
const crypto = require('crypto');

const COOKIE = 'lector_admin';
const MAX_AGE_S = 8 * 60 * 60; // 8 h

function config() {
  return {
    email: String(process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
    password: String(process.env.ADMIN_PASSWORD || ''),
    secret: String(process.env.ADMIN_SESSION_SECRET || ''),
  };
}

function isConfigured() {
  const c = config();
  return Boolean(c.email && c.password && c.secret.length >= 32);
}

/** Comparação em tempo constante (o hash iguala os tamanhos). */
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function checkCredentials(email, password) {
  const c = config();
  if (!isConfigured()) return false;
  const emailOk = safeEqual(String(email || '').trim().toLowerCase(), c.email);
  const passOk = safeEqual(String(password || ''), c.password);
  return emailOk && passOk;
}

function sign(data) {
  return crypto.createHmac('sha256', config().secret).update(data).digest('base64url');
}

function createToken(email) {
  const payload = Buffer.from(JSON.stringify({ e: email, exp: Math.floor(Date.now() / 1000) + MAX_AGE_S })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  if (!token || !isConfigured()) return null;
  const [payload, sig] = String(token).split('.');
  if (!payload || !sig) return null;
  const expected = sign(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    // Sessão de outro e-mail (ADMIN_EMAIL trocado) ou vencida não vale.
    if (data.e !== config().email || !(data.exp > Date.now() / 1000)) return null;
    return { email: data.e };
  } catch {
    return null;
  }
}

function cookies(req) {
  const out = {};
  String((req.headers && req.headers.cookie) || '')
    .split(';')
    .forEach((part) => {
      const i = part.indexOf('=');
      if (i <= 0) return;
      try {
        out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
      } catch {
        /* cookie malformado de outro site/app: ignora */
      }
    });
  return out;
}

function isHttps(req) {
  const proto = String((req.headers && req.headers['x-forwarded-proto']) || '').split(',')[0].trim();
  return proto === 'https' || Boolean(req.socket && req.socket.encrypted);
}

function cookieHeader(req, value, maxAge) {
  return [
    `${COOKIE}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${maxAge}`,
    isHttps(req) ? 'Secure' : '',
  ].filter(Boolean).join('; ');
}

function startSession(req, res) {
  const email = config().email;
  res.setHeader('Set-Cookie', cookieHeader(req, createToken(email), MAX_AGE_S));
  return email;
}

function endSession(req, res) {
  res.setHeader('Set-Cookie', cookieHeader(req, '', 0));
}

function getSession(req) {
  return readToken(cookies(req)[COOKIE]);
}

/** Respostas do admin nunca vão para cache (nem de proxy/CDN). */
function noStore(res) {
  res.setHeader('Cache-Control', 'no-store');
}

/** Sessão válida ou responde 401 e devolve null. */
function requireAdmin(req, res) {
  const session = getSession(req);
  if (!session) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return null;
  }
  return session;
}

module.exports = { isConfigured, checkCredentials, startSession, endSession, getSession, requireAdmin, noStore };
