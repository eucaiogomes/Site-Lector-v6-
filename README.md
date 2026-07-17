# Site Lector

Site institucional e marketing da **Lector** — plataforma de aprendizado com IA nativa (LMS / educação corporativa B2B).

Organizado para crescer com **IA e agentes de código**: specs primeiro, uma pasta por página, design system centralizado.

**Idioma:** Português (BR) · Tom: confiante, direto, segunda pessoa (“você”) · Sem emoji

---

## Estado atual (2026-07-17)

| Área | Situação |
|------|----------|
| Home, Blog, Contato | `live` — código e SEO (home ainda sem meta title/description) |
| 6 páginas de solução | `wip` — HTML completo e linkável no dropdown; mídia final e alguns placeholders comerciais abertos |
| Hub `/solucoes` e `/clientes` | `planned` — só âncoras na home por enquanto |
| Lead form | UI modal pronta; **sem backend** (log no console) |
| Header/footer | Duplicados por página (duas variantes: dark home / light demais) |
| Mídia de produção | Só `assets/media/home/` tem arquivos; demais pastas com `.gitkeep` |

Mapa canônico: [`specs/sitemap.md`](specs/sitemap.md).

---

## Estrutura

| Pasta | Função |
|-------|--------|
| `specs/` | Documentação e contratos (humanos + agentes) |
| `pages/` | Código de cada página (`pages/<slug>/index.dc.html`) |
| `design-system/` | Tokens CSS, styles e bundle de componentes |
| `assets/` | Brand, clientes e mídia de produção |
| `content/` | Dados estruturados (nav, CTAs, status das páginas) |
| `shared/` | Lead form modal e utilitários do site |
| `references/` | Inspiração e rascunhos (**não** é produção) |
| `AGENTS.md` | Regras para agentes de código |

---

## Páginas

| Rota | Status | Path |
|------|--------|------|
| `/` Home | live | `pages/home/index.dc.html` |
| `/blog` | live | `pages/blog/index.dc.html` |
| `/contato` | live | `pages/contato/index.dc.html` |
| `/plataforma-lector` | wip | `pages/plataforma-lector/index.dc.html` |
| `/copiloto-vendas` | wip | `pages/copiloto-vendas/index.dc.html` |
| `/solucao-nr-1` | wip | `pages/solucao-nr-1/index.dc.html` |
| `/conteudo-sob-demanda` | wip | `pages/conteudo-sob-demanda/index.dc.html` |
| `/diagnostico-gaps` | wip | `pages/diagnostico-gaps/index.dc.html` |
| `/servicos-especializados` | wip | `pages/servicos-especializados/index.dc.html` |

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

Site **estático** — sem build step. `vercel.json` reescreve as rotas limpas (`/`, `/blog`, `/contato`, soluções…) para `pages/<slug>/index.dc.html`.

1. Push no GitHub  
2. Importar em [vercel.com/new](https://vercel.com/new)  
3. Framework: **Other** · Build vazio · Output: `.`  
4. Deploy automático em `main`

Links internos no HTML usam paths absolutos do arquivo (`/pages/<slug>/index.dc.html`) — estáveis na Vercel. Rewrites limpos (`/blog`, …) são alias opcional.

---

## Adicionar uma página

Siga [`specs/how-to-add-page.md`](specs/how-to-add-page.md) (resumo em `AGENTS.md`).

1. Spec em `specs/pages/<slug>.md`  
2. Código em `pages/<slug>/index.dc.html`  
3. Atualizar `specs/sitemap.md` + `content/site.json`  
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
4. `specs/geo.md` — GEO (IAs): status do que já está no ar vs bloqueado por dados externos  
5. Spec da página em `specs/pages/`  
6. `specs/components/` se for nav ou formulário  

### Foundation GEO (raiz)

| Arquivo | Função |
|---------|--------|
| `llms.txt` | Resumo da Lector para crawlers de IA |
| `robots.txt` | Bots de busca/IA + sitemap |
| `sitemap.xml` | URLs públicas atuais |

---

## Referências

Arquivos em `references/` (dumps, protótipos, prints) **não** entram no site publicado.  
Ver [`references/README.md`](references/README.md).
