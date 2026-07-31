/**
 * Servidor de produção do lector-site (Lightsail / qualquer VM Node).
 *
 *   node server.js            # porta 3000 (ou PORT do ambiente)
 *
 * Serve os arquivos estáticos, aplica os rewrites de vercel.json e executa as
 * funções de api/ com o mesmo contrato da Vercel — as mesmas funções rodam nos
 * dois ambientes, sem fork de código.
 *
 * Diferenças para o devserver.js (que continua sendo só para desenvolvimento):
 *   - cache longo para assets versionados, no-cache para HTML
 *   - gzip para conteúdo textual
 *   - limite de tamanho de corpo e rate limit nos endpoints /api/*
 *   - /healthz para health check do balanceador
 *   - shutdown gracioso no SIGTERM (systemd)
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

const MAX_BODY = 64 * 1024; // 64 KB
const RATE_MAX = Number(process.env.RATE_LIMIT_MAX || 5);
const RATE_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);

let rewrites = [];
try {
  const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  rewrites = Array.isArray(vercel.rewrites) ? vercel.rewrites : [];
} catch (err) {
  console.warn('[server] vercel.json não lido:', err.message);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

const COMPRESSIBLE = /^(text\/|application\/(json|xml|javascript)|image\/svg)/;

function applyRewrites(pathname) {
  for (const rule of rewrites) {
    if (rule.source === pathname) return rule.destination;
  }
  return pathname;
}

function resolveFile(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null; // percent-encoding inválido
  }
  const target = path.normalize(path.join(ROOT, decoded));
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) return null; // path traversal

  const candidates = [target];
  if (!path.extname(target)) {
    candidates.push(
      path.join(target, 'index.dc.html'),
      path.join(target, 'index.html'),
      `${target}.dc.html`,
      `${target}.html`
    );
  }

  for (const candidate of candidates) {
    try {
      const stat = fs.statSync(candidate);
      if (stat.isFile()) return candidate;
    } catch {
      /* próximo candidato */
    }
  }
  return null;
}

function cacheControl(file) {
  const ext = path.extname(file).toLowerCase();
  if (file.includes(`${path.sep}assets${path.sep}media${path.sep}`)) {
    return 'public, max-age=31536000, immutable';
  }
  if (ext === '.html') return 'no-cache';
  if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg', '.ico',
       '.woff', '.woff2', '.ttf', '.mp4', '.webm', '.mp3'].includes(ext)) {
    return 'public, max-age=604800';
  }
  return 'public, max-age=3600';
}

/* ── rate limit em memória, por IP, só para /api/* ──────────────────────── */
const hits = new Map();

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.socket.remoteAddress || 'desconhecido';
}

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > RATE_MAX;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, list] of hits) {
    const keep = list.filter((t) => now - t < RATE_WINDOW_MS);
    if (keep.length) hits.set(ip, keep);
    else hits.delete(ip);
  }
}, RATE_WINDOW_MS).unref();

/* ── rotas /api/* — mesmo contrato da Vercel ────────────────────────────── */
function handleApi(req, res, pathname) {
  const file = path.join(ROOT, pathname.replace(/^\//, '') + '.js');
  if (!file.startsWith(path.join(ROOT, 'api') + path.sep) || !fs.existsSync(file)) return false;

  if (req.method === 'POST' && rateLimited(clientIp(req))) {
    res.writeHead(429, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'rate_limited' }));
    console.log(`429 ${req.method} ${pathname}`);
    return true;
  }

  let raw = '';
  let aborted = false;
  req.on('data', (c) => {
    if (aborted) return;
    raw += c;
    if (raw.length > MAX_BODY) {
      aborted = true;
      res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'payload_too_large' }));
      req.destroy();
    }
  });
  req.on('end', async () => {
    if (aborted) return;
    try {
      req.body = raw && /json/.test(req.headers['content-type'] || '') ? JSON.parse(raw) : raw;
    } catch {
      req.body = {};
    }
    // Shim da API de resposta da Vercel
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (obj) => {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(obj));
    };
    try {
      await require(file)(req, res);
    } catch (err) {
      console.error(`[api] ${pathname} falhou:`, err);
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'handler_threw' }));
    }
    console.log(`${res.statusCode} ${req.method} ${pathname}`);
  });
  return true;
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    res.end('ok');
    return;
  }

  if (pathname.startsWith('/api/') && handleApi(req, res, pathname)) return;

  const file = resolveFile(applyRewrites(pathname));

  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`404 — não encontrado: ${pathname}`);
    console.log(`404 ${pathname}`);
    return;
  }

  const type = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
  const headers = {
    'Content-Type': type,
    'Cache-Control': cacheControl(file),
    'X-Content-Type-Options': 'nosniff',
  };

  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  if (acceptsGzip && COMPRESSIBLE.test(type)) {
    headers['Content-Encoding'] = 'gzip';
    headers.Vary = 'Accept-Encoding';
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
  } else {
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  }
  console.log(`200 ${pathname} -> ${path.relative(ROOT, file)}`);
});

server.listen(PORT, HOST, () => {
  console.log(`[server] lector-site em http://${HOST}:${PORT}`);
  const faltando = ['EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO'].filter((k) => !process.env[k]);
  if (faltando.length) {
    console.warn(`[server] ATENÇÃO: faltam variáveis ${faltando.join(', ')} — os formulários vão responder 500.`);
  }
});

function shutdown(sig) {
  console.log(`[server] ${sig} recebido, encerrando...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 10000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
