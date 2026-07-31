/**
 * Dev server estático para o lector-site.
 * Serve os arquivos do diretório do site e aplica os rewrites de vercel.json,
 * para que as URLs limpas (/plataforma-lector, /home, ...) funcionem localmente.
 *
 *   node devserver.js [porta]
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT = __dirname;
const PORT = Number(process.argv[2] || process.env.PORT || 4321);

let rewrites = [];
try {
  const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  rewrites = Array.isArray(vercel.rewrites) ? vercel.rewrites : [];
} catch (err) {
  console.warn('[devserver] vercel.json não lido:', err.message);
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

function applyRewrites(pathname) {
  for (const rule of rewrites) {
    if (rule.source === pathname) return rule.destination;
  }
  return pathname;
}

function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname);
  const target = path.normalize(path.join(ROOT, decoded));
  if (!target.startsWith(ROOT)) return null; // path traversal

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

/**
 * Rotas /api/* — executa as funções de lector-site/api/ como a Vercel faria.
 * Com MAIL_DRY_RUN=1 o envio real é substituído por um stub que apenas registra
 * a mensagem no console (útil para testar os formulários sem credenciais SMTP).
 */
if (process.env.MAIL_DRY_RUN === '1') {
  const nodemailer = require('nodemailer');
  nodemailer.createTransport = () => ({
    sendMail: async (msg) => {
      console.log('[dry-run] e-mail NÃO enviado:', JSON.stringify({
        to: msg.to, replyTo: msg.replyTo, subject: msg.subject,
      }));
      return { messageId: 'dry-run' };
    },
  });
  process.env.EMAIL_USER = process.env.EMAIL_USER || 'dry-run@local';
  process.env.EMAIL_PASS = process.env.EMAIL_PASS || 'dry-run';
  process.env.EMAIL_TO = process.env.EMAIL_TO || 'dry-run@local';
}

function handleApi(req, res, pathname) {
  const file = path.join(ROOT, pathname.replace(/^\//, '') + '.js');
  if (!file.startsWith(path.join(ROOT, 'api')) || !fs.existsSync(file)) return false;

  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', async () => {
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

  if (pathname.startsWith('/api/') && handleApi(req, res, pathname)) return;

  const file = resolveFile(applyRewrites(pathname));

  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`404 — não encontrado: ${pathname}`);
    console.log(`404 ${pathname}`);
    return;
  }

  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(file).pipe(res);
  console.log(`200 ${pathname} -> ${path.relative(ROOT, file)}`);
});

server.listen(PORT, () => {
  console.log(`[devserver] lector-site em http://localhost:${PORT}`);
});
