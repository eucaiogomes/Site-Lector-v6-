/**
 * E-mail "Seu acesso ao portal Lector" — enviado ao lead da landing Unimeds com login, senha e o botão
 * para o portal (api/_lib/portal-access.js).
 *
 * Feito para leitores de e-mail, não para navegador: layout em tabelas, estilos inline, botão "à prova de
 * Outlook" (VML), texto de pré-visualização oculto, versão em texto puro e o logo embutido como anexo
 * inline (cid:) — Gmail e Outlook não exibem SVG nem dependem de imagem hospedada.
 * Logo: assets/brand/logo-lector-light-email.png (480×96, versão clara do logo oficial para fundo navy).
 */
const fs = require('fs');
const path = require('path');

const LOGO_CID = 'logo-lector@site.lector';
const LOGO_FILE = path.join(__dirname, '../../../assets/brand/logo-lector-light-email.png');

/** Conteúdo que o lead pediu na landing (aparece no texto do e-mail). */
const CONTEUDO = 'Segurança de dados na saúde';

const C = {
  navy: '#00204D',
  navy2: '#0B3A7E',
  orange: '#F66B0A',
  ink: '#1A2B45',
  muted: '#5A6B85',
  line: '#E3E8F0',
  page: '#EEF2F7',
  soft: '#F7F9FC',
};
const SANS = "'Plus Jakarta Sans','Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const DISPLAY = "Sora,'Plus Jakarta Sans','Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,'Liberation Mono',monospace";

let logoCache = null;
function logoAttachment() {
  if (!logoCache) logoCache = fs.readFileSync(LOGO_FILE);
  return { filename: 'lector.png', content: logoCache, cid: LOGO_CID, contentType: 'image/png', contentDisposition: 'inline' };
}

function esc(v) {
  return String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Linha do quadro de acesso: rótulo à esquerda, valor à direita (empilha no celular). */
function credRow(label, valueHtml, last) {
  const border = last ? '' : `border-bottom:1px solid ${C.line};`;
  return `
          <tr>
            <td class="cred-label" style="${border}padding:16px 20px;width:96px;font-family:${SANS};font-size:12px;line-height:18px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.muted};vertical-align:middle;">${label}</td>
            <td class="cred-value" style="${border}padding:16px 20px 16px 0;font-family:${SANS};font-size:16px;line-height:24px;font-weight:700;color:${C.navy};vertical-align:middle;overflow-wrap:anywhere;word-break:break-word;">${valueHtml}</td>
          </tr>`;
}

function step(n, title, text) {
  return `
          <tr>
            <td style="padding:0 0 18px;vertical-align:top;width:44px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;"><tr>
                <td align="center" style="width:32px;height:32px;border-radius:999px;background:#FFF1E6;font-family:${SANS};font-size:14px;line-height:32px;font-weight:800;color:${C.orange};">${n}</td>
              </tr></table>
            </td>
            <td style="padding:4px 0 18px;vertical-align:top;font-family:${SANS};font-size:15px;line-height:23px;color:${C.muted};">
              <strong style="color:${C.ink};">${title}</strong><br>${text}
            </td>
          </tr>`;
}

/**
 * @param {{ firstname: string, login: string, password: string, url: string, logoSrc?: string }} p
 *   logoSrc: só para pré-visualização no navegador (data: URI); no envio o logo vai como cid.
 * @returns {{ subject: string, html: string, text: string, attachments: object[] }}
 */
function buildPortalAccessEmail({ firstname, login, password, url, logoSrc }) {
  const nome = esc(firstname);
  const link = esc(url);
  const logo = logoSrc || `cid:${LOGO_CID}`;
  const preheader = `Seu login e senha para assistir ao microlearning ${CONTEUDO} no portal Lector.`;

  const html = `<!doctype html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Seu acesso ao portal Lector</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Sora:wght@700;800&display=swap" rel="stylesheet">
  <style>
    body { margin:0 !important; padding:0 !important; background:${C.page}; -webkit-text-size-adjust:100%; }
    table { border-collapse:collapse; }
    img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    a { color:${C.orange}; }
    .btn a:hover { background:#E25E04 !important; }
    @media (max-width:620px) {
      .container { width:100% !important; }
      .px { padding-left:24px !important; padding-right:24px !important; }
      .hero-title { font-size:26px !important; line-height:34px !important; }
      .cred-label, .cred-value { display:block !important; width:auto !important; padding-left:16px !important; padding-right:16px !important; }
      .cred-label { padding-bottom:2px !important; border-bottom:0 !important; }
      .cred-value { padding-top:0 !important; }
      .btn-wrap { width:100% !important; }
      .btn a { display:block !important; padding-left:0 !important; padding-right:0 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${C.page};">
  <div style="display:none;max-height:0;max-width:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${C.page};">${esc(preheader)}${'&#847;&zwnj;&nbsp;'.repeat(40)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
    <tr>
      <td align="center" style="padding:36px 12px 28px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

          <!-- Faixa laranja + cabeçalho navy com o logo -->
          <tr><td style="height:5px;line-height:5px;font-size:0;background:${C.orange};background-image:linear-gradient(90deg,${C.orange} 0%,#FF9A4D 100%);border-radius:20px 20px 0 0;">&nbsp;</td></tr>
          <!-- Destaque (um bloco só: o degradê não pode recomeçar entre o logo e o título) -->
          <tr>
            <td class="px" bgcolor="${C.navy}" style="background:${C.navy};background-image:linear-gradient(135deg,${C.navy} 0%,${C.navy2} 100%);padding:32px 44px 44px;">
              <img src="${logo}" width="150" height="30" alt="Lector" style="display:block;width:150px;height:30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;margin-top:36px;"><tr>
                <td style="background:rgba(246,107,10,.16);border:1px solid rgba(246,107,10,.45);border-radius:999px;padding:6px 14px;font-family:${SANS};font-size:12px;line-height:16px;font-weight:700;letter-spacing:.04em;color:#FFB27A;">&#9679;&nbsp; Acesso liberado</td>
              </tr></table>
              <h1 class="hero-title" style="margin:20px 0 0;font-family:${DISPLAY};font-size:32px;line-height:40px;font-weight:800;letter-spacing:-.01em;color:#FFFFFF;">Olá, ${nome}!<br>Seu acesso ao portal está pronto.</h1>
              <p style="margin:16px 0 0;font-family:${SANS};font-size:16px;line-height:26px;color:#C9D4E5;">Assista ao microlearning <strong style="color:#FFFFFF;">${esc(CONTEUDO)}</strong> no portal Lector e veja, na prática, como a sua equipe pode produzir os próprios treinamentos.</p>
            </td>
          </tr>

          <!-- Dados de acesso + botão -->
          <tr>
            <td class="px" bgcolor="#FFFFFF" style="background:#FFFFFF;padding:40px 44px 8px;">
              <p style="margin:0 0 14px;font-family:${SANS};font-size:13px;line-height:18px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.navy};">Seus dados de acesso</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.line};border-radius:14px;border-collapse:separate;background:${C.soft};">
                ${credRow('Portal', `<a href="${link}" style="color:${C.navy};text-decoration:none;">${esc(url.replace(/^https?:\/\//, ''))}</a>`)}
                ${credRow('Login', `<span style="color:${C.navy};text-decoration:none;">${esc(login).replace('@', '@<wbr>')}</span>`)}
                ${credRow('Senha', `<span style="display:inline-block;font-family:${MONO};font-size:18px;line-height:24px;letter-spacing:.06em;color:${C.navy};background:#FFFFFF;border:1px dashed #F6A56A;border-radius:8px;padding:6px 12px;">${esc(password)}</span>`, true)}
              </table>

              <table role="presentation" class="btn-wrap" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 0;border-collapse:separate;">
                <tr>
                  <td class="btn" align="center" bgcolor="${C.orange}" style="border-radius:999px;background:${C.orange};box-shadow:0 10px 24px rgba(246,107,10,.30);">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${link}" style="height:56px;v-text-anchor:middle;width:300px;" arcsize="50%" stroke="f" fillcolor="${C.orange}">
                      <w:anchorlock/>
                      <center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Acessar o portal &#8594;</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${link}" target="_blank" style="display:inline-block;padding:18px 44px;font-family:${SANS};font-size:16px;line-height:20px;font-weight:800;color:#FFFFFF;text-decoration:none;border-radius:999px;background:${C.orange};">Acessar o portal &nbsp;&#8594;</a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0;font-family:${SANS};font-size:13px;line-height:20px;color:${C.muted};">Se o botão não abrir, copie e cole no navegador:<br><a href="${link}" style="color:${C.orange};text-decoration:underline;word-break:break-all;">${link}</a></p>
            </td>
          </tr>

          <!-- Passo a passo -->
          <tr>
            <td class="px" bgcolor="#FFFFFF" style="background:#FFFFFF;padding:36px 44px 12px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
                <tr><td colspan="2" style="padding:28px 0 18px;font-family:${SANS};font-size:13px;line-height:18px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:${C.navy};">Como acessar</td></tr>
                ${step(1, 'Clique em “Acessar o portal”', 'A página de entrada da Lector abre no navegador.')}
                ${step(2, 'Entre com seu login e senha', 'Use os dados acima, exatamente como estão.')}
                ${step(3, 'Assista ao microlearning', `Abra <strong style="color:${C.ink};">${esc(CONTEUDO)}</strong> e conheça a plataforma por dentro.`)}
              </table>
            </td>
          </tr>

          <!-- Segurança -->
          <tr>
            <td class="px" bgcolor="#FFFFFF" style="background:#FFFFFF;padding:8px 44px 40px;border-radius:0 0 20px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.soft};border-radius:12px;border-collapse:separate;">
                <tr>
                  <td style="width:4px;background:${C.orange};border-radius:12px 0 0 12px;font-size:0;line-height:0;">&nbsp;</td>
                  <td style="padding:16px 18px;font-family:${SANS};font-size:13px;line-height:20px;color:${C.muted};">
                    <strong style="color:${C.ink};">Dica de segurança:</strong> no primeiro acesso, troque a senha por uma só sua em <em>Meu cadastro</em>. Não foi você que pediu este acesso? É só ignorar este e-mail.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Rodapé -->
          <tr>
            <td align="center" style="padding:28px 24px 0;font-family:${SANS};font-size:12px;line-height:19px;color:#8592A6;">
              <strong style="color:${C.navy};">Lector</strong> · Educação corporativa com IA nativa<br>
              Você recebeu este e-mail porque pediu o microlearning em nosso site.<br>
              Dúvidas? Responda este e-mail que nossa equipe ajuda você.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Olá, ${firstname}!`,
    '',
    `Seu acesso ao portal Lector está pronto. Lá você assiste ao microlearning "${CONTEUDO}".`,
    '',
    `Portal: ${url}`,
    `Login: ${login}`,
    `Senha: ${password}`,
    '',
    'Como acessar:',
    '1. Abra o link do portal acima.',
    '2. Entre com seu login e senha.',
    `3. Assista ao microlearning "${CONTEUDO}".`,
    '',
    'Dica de segurança: no primeiro acesso, troque a senha por uma só sua em Meu cadastro.',
    'Não foi você que pediu este acesso? É só ignorar este e-mail.',
    '',
    'Lector · Educação corporativa com IA nativa',
  ].join('\n');

  return {
    subject: `${firstname}, seu acesso ao portal Lector está pronto`,
    html,
    text,
    attachments: logoSrc ? [] : [logoAttachment()],
  };
}

module.exports = { buildPortalAccessEmail, LOGO_FILE };
