# Subir o site no Bitnami (Lightsail)

A Vercel continua no ar sem alteração — aqui só há arquivos **novos**.
`vercel.json` e `api/*.js` não foram tocados: as mesmas funções rodam nos dois lugares.

| Peça | Papel no Bitnami |
|---|---|
| Apache (já vem no Bitnami) | Serve os estáticos e encaminha `/api/*` para o Node |
| `server.js` na porta 3000 | Executa `api/contact.js` e `api/newsletter.js` |
| `/etc/lector-site.env` | Credenciais do Gmail (fora do site, root, chmod 600) |

Os formulários dependem dos dois: sem o Node, `/api/*` responde 503; sem as
credenciais, responde `server_not_configured`.

---

## 1. Instância

Lightsail → Create instance → **Node.js** (blueprint Bitnami) → 2 GB de RAM
(o site tem ~275 MB, sendo 114 MB de vídeo em `assets/media`).

Anexe um **IP estático** e libere **80** e **443** em Networking.

Baixe a chave SSH em Account → SSH keys. Nos comandos abaixo, troque
`SEU_IP` e o caminho da chave.

## 2. Criar a pasta do projeto

```bash
ssh -i ~/Downloads/LightsailDefaultKey.pem bitnami@SEU_IP "sudo mkdir -p /opt/bitnami/projects/lector-site && sudo chown bitnami:bitnami /opt/bitnami/projects/lector-site"
```

## 3. Enviar os arquivos (do seu Mac)

```bash
rsync -avz --delete -e "ssh -i ~/Downloads/LightsailDefaultKey.pem" --exclude node_modules --exclude .git --exclude .env "/Users/suportelector/Documents/Site Lector/lector-site/" bitnami@SEU_IP:/opt/bitnami/projects/lector-site/
```

`--exclude .env` é proposital: **credenciais não sobem junto com o código.**

Instale a dependência (nodemailer) usando o Node do Bitnami:

```bash
ssh -i ~/Downloads/LightsailDefaultKey.pem bitnami@SEU_IP "cd /opt/bitnami/projects/lector-site && /opt/bitnami/node/bin/npm install --omit=dev"
```

## 4. Credenciais

Já conectado por SSH na instância:

```bash
sudo tee /etc/lector-site.env > /dev/null <<'EOF'
EMAIL_USER=sitelector@gmail.com
EMAIL_PASS=a senha de app do Gmail, com os espaços
EMAIL_TO=comercial@lectortec.com.br,suporte2@lectortec.com.br
EOF
```

```bash
sudo chown root:root /etc/lector-site.env && sudo chmod 600 /etc/lector-site.env
```

Cuidados que costumam quebrar aqui:

- **Sem aspas** nos valores — o systemd trata `EMAIL_PASS="abc def"` como valor
  *com* as aspas e o Gmail recusa a autenticação.
- A senha de app tem espaços; pode deixar como está.
- `EMAIL_TO` aceita vários endereços separados por vírgula.
- O arquivo fica fora do projeto, então o `rsync` nunca o sobrescreve.

## 5. Serviço do Node

```bash
sudo cp /opt/bitnami/projects/lector-site/deploy/bitnami/lector-site.service /etc/systemd/system/ && sudo systemctl daemon-reload
```

```bash
sudo systemctl enable --now lector-site
```

Confirme que subiu:

```bash
curl -s localhost:3000/healthz
```

Deve responder `ok`. Se não, o motivo está em:

```bash
sudo journalctl -u lector-site -n 50 --no-pager
```

## 6. Apache do Bitnami

```bash
sudo cp /opt/bitnami/projects/lector-site/deploy/bitnami/lector-site-vhost.conf /opt/bitnami/apache/conf/vhosts/ && sudo cp /opt/bitnami/projects/lector-site/deploy/bitnami/lector-site-https-vhost.conf /opt/bitnami/apache/conf/vhosts/
```

Troque o domínio nos dois arquivos:

```bash
sudo sed -i 's/SEU_DOMINIO.com.br/o-seu-dominio.com.br/g' /opt/bitnami/apache/conf/vhosts/lector-site-vhost.conf /opt/bitnami/apache/conf/vhosts/lector-site-https-vhost.conf
```

Valide a sintaxe antes de reiniciar:

```bash
sudo /opt/bitnami/apache/bin/httpd -t -f /opt/bitnami/apache/conf/httpd.conf
```

```bash
sudo /opt/bitnami/ctlscript.sh restart apache
```

> O Bitnami tem uma página padrão em `/opt/bitnami/apache/conf/vhosts/00_status-vhost.conf`
> e afins. Se o site não aparecer, verifique se outro vhost está capturando o
> `_default_` — os arquivos são lidos em ordem alfabética.

## 7. HTTPS

Com o domínio já apontando para o IP estático:

```bash
sudo /opt/bitnami/bncert-tool
```

Ele detecta os vhosts que você copiou, emite o certificado Let's Encrypt e
configura a renovação automática.

## 8. Validar sem enviar e-mail de verdade

```bash
curl -s -X POST https://SEU_DOMINIO/api/newsletter -H "Content-Type: application/json" -d '{"email":"invalido"}'
```

| Resposta | Significado |
|---|---|
| `{"ok":false,"error":"invalid_email"}` | ✅ tudo certo — API no ar e validando |
| `{"ok":false,"error":"server_not_configured"}` | ❌ as variáveis `EMAIL_*` não chegaram ao processo |
| `{"ok":false,"error":"send_failed"}` | ❌ chegaram, mas o Gmail recusou (senha de app errada/revogada) |
| `{"ok":false,"error":"rate_limited"}` | 5 envios em 10 min do mesmo IP — limite do `server.js` |
| 503 | ❌ Apache no ar, Node fora (`systemctl status lector-site`) |
| HTML da home | ❌ o vhost não está encaminhando `/api/` |

Confira também as URLs limpas: `/`, `/home`, `/blog`, `/contato`, `/sobre` etc.

## Atualizações seguintes

```bash
rsync -avz --delete -e "ssh -i ~/Downloads/LightsailDefaultKey.pem" --exclude node_modules --exclude .git --exclude .env "/Users/suportelector/Documents/Site Lector/lector-site/" bitnami@SEU_IP:/opt/bitnami/projects/lector-site/
```

```bash
ssh -i ~/Downloads/LightsailDefaultKey.pem bitnami@SEU_IP "sudo systemctl restart lector-site"
```

Só é preciso reiniciar o Apache se você mudar os vhosts. O `/etc/lector-site.env`
nunca é tocado — credenciais se configuram uma vez só.

## Observações

- **Porta 25 é bloqueada pela AWS**, mas o nodemailer com `service: 'gmail'` usa
  587/465 — funciona sem pedir liberação.
- O Gmail pode disparar alerta de segurança no primeiro envio a partir de um IP
  novo (a AWS fica nos EUA). Se `send_failed` acontecer só em produção, verifique
  os alertas da conta `sitelector@gmail.com`.
- Ao adicionar uma página nova no `vercel.json`, replique a `RewriteRule` nos dois
  vhosts — as URLs limpas não são automáticas no Apache.
- O `server.js` limita 5 POSTs por IP a cada 10 min em `/api/*`. Na Vercel esse
  limite não existe.
