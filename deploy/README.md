# Deploy no AWS Lightsail (instância Linux)

A Vercel continua funcionando sem nenhuma alteração — este diretório só **acrescenta**
arquivos. `vercel.json` e `api/*.js` não foram tocados.

| Ambiente  | Quem serve o site            | Quem executa `api/*.js`        | Credenciais           |
|-----------|------------------------------|--------------------------------|-----------------------|
| Vercel    | CDN da Vercel                | runtime serverless da Vercel   | painel da Vercel      |
| Lightsail | `server.js`                  | `server.js` (mesmo contrato)   | `/etc/lector-site.env` |
| Local     | `devserver.js`               | `devserver.js`                 | `.env` do projeto     |

As funções de `api/` são as mesmas nos três — nenhum fork de código.

---

## 1. Criar a instância

Lightsail → **Create instance** → Linux/Unix → **Ubuntu 22.04 LTS** → plano de
2 GB RAM (o site tem ~275 MB, sendo 114 MB de vídeo em `assets/media`).

Em **Networking** da instância, libere as portas **80 (HTTP)** e **443 (HTTPS)**.

## 2. Instalar o Node

```bash
sudo apt update && sudo apt install -y nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

## 3. Subir os arquivos

Do seu Mac (ajuste o IP e o caminho da chave `.pem` baixada do Lightsail):

```bash
rsync -avz --delete -e "ssh -i ~/Downloads/LightsailDefaultKey.pem" --exclude node_modules --exclude .git --exclude .env "/Users/suportelector/Documents/Site Lector/lector-site/" ubuntu@SEU_IP:/var/www/lector-site/
```

O `--exclude .env` é proposital: **as credenciais não sobem junto com o código.**

Na instância, instale a dependência de produção:

```bash
cd /var/www/lector-site && npm install --omit=dev
```

## 4. Credenciais — o passo que faz os formulários funcionarem

Crie o arquivo de ambiente **fora do diretório do site**, legível só pelo root:

```bash
sudo tee /etc/lector-site.env > /dev/null <<'EOF'
EMAIL_USER=sitelector@gmail.com
EMAIL_PASS=a senha de app do Gmail, com os espaços
EMAIL_TO=comercial@lectortec.com.br,suporte2@lectortec.com.br
EOF
sudo chown root:root /etc/lector-site.env
sudo chmod 600 /etc/lector-site.env
```

Detalhes que costumam quebrar aqui:

- **Sem aspas** nos valores. O systemd trata `EMAIL_PASS="abc def"` como um valor
  que inclui as aspas, e a autenticação no Gmail falha.
- A senha de app tem espaços — pode deixar como está, sem escapar.
- `EMAIL_TO` aceita vários endereços separados por vírgula.
- Esse arquivo **não** fica no repositório e **não** é sobrescrito pelo `rsync`.

## 5. Serviço systemd

```bash
sudo cp /var/www/lector-site/deploy/lector-site.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now lector-site
sudo systemctl status lector-site
```

Se as variáveis não forem carregadas, o log avisa na inicialização:

```bash
sudo journalctl -u lector-site -n 50 --no-pager
```

## 6. Nginx + HTTPS

```bash
sudo cp /var/www/lector-site/deploy/nginx-lector-site.conf /etc/nginx/sites-available/lector-site
sudo sed -i 's/SEU_DOMINIO.com.br/o-seu-dominio.com.br/g' /etc/nginx/sites-available/lector-site
sudo ln -sf /etc/nginx/sites-available/lector-site /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Com o domínio já apontando para o IP estático da instância:

```bash
sudo apt install -y certbot python3-certbot-nginx && sudo certbot --nginx
```

## 7. Validar sem enviar e-mail de verdade

```bash
curl -s -X POST https://SEU_DOMINIO/api/newsletter -H "Content-Type: application/json" -d '{"email":"invalido"}'
```

Respostas e o que significam:

| Resposta | Significado |
|---|---|
| `{"ok":false,"error":"invalid_email"}` | ✅ tudo certo — a API está no ar e validando |
| `{"ok":false,"error":"server_not_configured"}` | ❌ as variáveis `EMAIL_*` não chegaram ao processo |
| `{"ok":false,"error":"send_failed"}` | ❌ chegaram, mas o Gmail recusou (senha de app errada/revogada) |
| `{"ok":false,"error":"rate_limited"}` | 5 envios em 10 min do mesmo IP — limite do `server.js` |
| 404 / HTML | ❌ o nginx não está encaminhando para o Node |

## Atualizações seguintes

```bash
rsync -avz --delete -e "ssh -i ~/Downloads/LightsailDefaultKey.pem" --exclude node_modules --exclude .git --exclude .env "/Users/suportelector/Documents/Site Lector/lector-site/" ubuntu@SEU_IP:/var/www/lector-site/
ssh -i ~/Downloads/LightsailDefaultKey.pem ubuntu@SEU_IP "sudo systemctl restart lector-site"
```

O `/etc/lector-site.env` fica intocado — credenciais são configuradas uma vez só.

## Observações

- **Porta 25 é bloqueada pela AWS**, mas o Gmail usa 587/465 via `service: 'gmail'`
  do nodemailer, então o envio funciona sem pedir liberação.
- O Gmail pode pedir confirmação no primeiro envio a partir de um IP novo (a AWS
  fica nos EUA). Se der `send_failed` só em produção, verifique os alertas de
  segurança da conta `sitelector@gmail.com`.
- O `server.js` aplica rate limit de 5 POSTs por IP a cada 10 min em `/api/*`
  (ajustável por `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_MS`). Na Vercel não existe
  esse limite — lá o endpoint fica exposto a spam no formulário.
