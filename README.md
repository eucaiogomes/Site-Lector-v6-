# Site Lector

Site institucional e marketing da **Lector** — plataforma de aprendizado com IA nativa (LMS / educação corporativa B2B).

Organizado para crescer com **IA e agentes de código**: specs primeiro, uma pasta por página, design system centralizado.

**Idioma:** Português (BR) · Tom: confiante, direto, segunda pessoa (“você”) · Sem emoji

---

## Estado atual (2026-07-17)

| Área | Situação |
|------|----------|
| Home, Blog, Contato | `live` — SEO (title/meta), schema Organization, lead form |
| 6 páginas de solução | `wip` — HTML completo e linkável; polish comercial / mídia parcial |
| Página `/clientes` | `wip` — valor, suporte, cases e logos |
| Hub `/solucoes` | `planned` (sem pasta em `pages/`) |
| Lead form | Modal + página Contato + landings → `api/contact.js` (e-mail) e banco de leads |
| Admin `/admin` | Login + Relatórios › Leads site (todos os formulários do site) |
| Header/footer | Duplicados por página (variantes dark e light) |
| GEO foundation | `llms.txt`, `robots.txt`, `sitemap.xml` na raiz |
| Mídia de produção | Ver tabela em [`specs/sitemap.md`](specs/sitemap.md) |

Mapa canônico: [`specs/sitemap.md`](specs/sitemap.md).

---

## Estrutura

| Pasta / arquivo | Função |
|-----------------|--------|
| `specs/` | Documentação e contratos (humanos + agentes) |
| `pages/` | Código de cada página (`pages/<slug>/index.dc.html`) |
| `design-system/` | Tokens CSS, styles e bundle de componentes |
| `assets/` | Brand, clientes e mídia de produção |
| `content/` | Dados estruturados (nav, CTAs, status — **não** lido em runtime) |
| `shared/` | Lead form modal + schema Organization de referência |
| `references/` | Inspiração e rascunhos (**não** é produção; gitignore parcial) |
| `AGENTS.md` | Regras para agentes de código |
| `vercel.json` | Rewrites de rotas limpas + headers |
| `llms.txt` · `robots.txt` · `sitemap.xml` | Foundation GEO / SEO na raiz do deploy |

---

## Páginas

| Rota | Status | Path | Layout header |
|------|--------|------|---------------|
| `/` Home | live | `pages/home/index.dc.html` | dark (`lk-*`) |
| `/blog` | live | `pages/blog/index.dc.html` | light (`lec-*`) |
| `/contato` | live | `pages/contato/index.dc.html` | light |
| `/plataforma-lector` | wip | `pages/plataforma-lector/index.dc.html` | dark |
| `/copiloto-vendas` | wip | `pages/copiloto-vendas/index.dc.html` | light |
| `/solucao-nr-1` | wip | `pages/solucao-nr-1/index.dc.html` | dark |
| `/conteudo-sob-demanda` | wip | `pages/conteudo-sob-demanda/index.dc.html` | dark |
| `/diagnostico-gaps` | wip | `pages/diagnostico-gaps/index.dc.html` | dark |
| `/servicos-especializados` | wip | `pages/servicos-especializados/index.dc.html` | light |
| `/clientes` | wip | `pages/clientes/index.dc.html` | light |

**Navegação principal:** Nossas Soluções ▾ · Blog · Clientes · Contato · CTA “Falar com especialista”

---

## Como abrir

Arquivo no browser (ou runtime Design Canvas):

```text
pages/home/index.dc.html
```

Paths relativos a partir de `pages/<slug>/`:

```text
../../support.js
../../design-system/
../../assets/
../../shared/
```

---

## Lead form

CTAs de conversão abrem o modal em `shared/lead-form.js` (identidade branca Lector).  
Spec: [`specs/components/lead-form.md`](specs/components/lead-form.md).

Contato embutido na página: `pages/contato/` (form full-page + canais).

---

## Admin (`/admin`) e banco de leads

Todo envio dos formulários do site (modal "Falar com especialista", página Contato, landings Unimeds e
Treinamentos próprios, newsletter do rodapé e do blog) é gravado na tabela `leads_site` e aparece em
**`/admin` › Relatórios › Marketing Comercial › Leads site** (filtros, detalhes, copiar/CSV/XLS/PDF).
O e-mail para o comercial continua saindo como antes; se o e-mail falhar, o lead fica salvo mesmo assim.

| Peça | Onde |
|------|------|
| Tabela | `db/schema.sql` (Huawei e Supabase) + `db/supabase-rls.sql` (só Supabase) |
| Banco | `api/_lib/leads-db.js` — `DB_PROVIDER=postgres` (`DATABASE_URL`) ou `supabase` (`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`) |
| Login | `api/_lib/admin-auth.js` — `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` |
| API do admin | `api/admin/{login,logout,session,leads}.js` |
| Tela | `admin-app/` (Vite + React, copiado do admin da Tela-Recompensas) → build em `admin/` |

Variáveis: ver `.env.example`. Local:

```bash
npm install                      # pg + nodemailer (funções do site)
npm --prefix admin-app install   # React/Vite do admin (só na 1ª vez)
node devserver.js                # site + api + /admin em http://localhost:4321
npm run admin:dev                # opcional: admin com recarga ao vivo em http://localhost:5174/admin/
```

**Mudou algo em `admin-app/`?** Rode `npm run admin:build` e commite a pasta `admin/` junto — o deploy
(Vercel e VM) publica o build pronto, sem etapa de build no servidor.

> Huawei na Vercel: as funções da Vercel saem de IPs variáveis, então o RDS da Huawei precisaria aceitar
> conexão pública (com SSL). Com o site na VM da Huawei, use a rede privada. Para testes na Vercel, o
> Supabase funciona direto.

---

## Deploy (GitHub + Vercel)

Site **estático** — sem build step. `vercel.json` reescreve as rotas limpas (`/`, `/blog`, `/contato`, soluções, `/clientes`…) para `pages/<slug>/index.dc.html`.

1. Push no GitHub  
2. Importar em [vercel.com/new](https://vercel.com/new)  
3. Framework: **Other** · Build vazio · Output: `.`  
4. Deploy automático em `main`

Links internos no HTML usam paths absolutos do arquivo (`/pages/<slug>/index.dc.html`) — estáveis na Vercel. Rewrites limpos (`/blog`, …) são alias amigável.

---

## Adicionar uma página

Siga [`specs/how-to-add-page.md`](specs/how-to-add-page.md) (resumo em `AGENTS.md`).

1. Spec em `specs/pages/<slug>.md`  
2. Código em `pages/<slug>/index.dc.html`  
3. Atualizar `specs/sitemap.md` + `content/site.json` + `sitemap.xml` + rewrite em `vercel.json`  
4. Incluir `shared/lead-form` no helmet e sincronizar nav em **todas** as páginas  
5. Mídia em `assets/media/<slug>/` se necessário  

---

## Marca rápida

| Uso | Valor |
|-----|--------|
| Laranja | `#F66B0A` |
| Navy | `#00204D` |
| Fontes | Sora · Plus Jakarta Sans · JetBrains Mono |
| Ícones | Lucide (linha) |

Detalhes: [`specs/brand.md`](specs/brand.md) e [`design-system/readme.md`](design-system/readme.md).

---

## Documentação (ordem de leitura)

1. `AGENTS.md` — regras de ouro  
2. `specs/product.md` + `specs/brand.md`  
3. `specs/architecture.md` + `specs/sitemap.md`  
4. `specs/geo.md` — GEO (IAs): o que está no ar vs bloqueado por dados externos  
5. Spec da página em `specs/pages/`  
6. `specs/components/` se for nav ou formulário  

---

## Referências e higiene

- Arquivos em `references/` **não** entram no site publicado. Ver [`references/README.md`](references/README.md).  
- **Não** deixe vídeos, PNG ou HTML soltos na raiz do repo — mídia de produção vai em `assets/media/<slug>/`; dumps em `references/raw/`.  
# Site-Lector-v6-
# Site-Lector-v6-
