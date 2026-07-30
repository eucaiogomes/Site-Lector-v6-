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
| Lead form | UI modal pronta; **sem backend** (log no console) |
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
