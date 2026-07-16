# Site Lector

Site institucional e marketing da **Lector** — plataforma de aprendizado com IA nativa (LMS / educação corporativa B2B).

Organizado para crescer com **IA e agentes de código**: specs primeiro, uma pasta por página, design system centralizado.

---

## Estrutura

| Pasta | Função |
|-------|--------|
| `specs/` | Documentação e contratos (humanos + agentes) |
| `pages/` | Código de cada página (`pages/<slug>/index.dc.html`) |
| `design-system/` | Tokens CSS, styles e bundle de componentes |
| `assets/` | Brand, clientes e mídia de produção |
| `content/` | Dados estruturados (nav, CTAs) |
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

Mapa completo: `specs/sitemap.md`.

---

## Como abrir

Abra no browser (ou runtime Design Canvas):

```text
pages/home/index.dc.html
```

Paths relativos: `../../support.js`, `../../design-system/`, `../../assets/`, `../../shared/`.

---

## Lead form

CTAs abrem o modal em `shared/lead-form.js` (identidade branca Lector).  
Spec: `specs/components/lead-form.md`.

---

## Deploy (GitHub + Vercel)

Site **estático** — sem build step. `vercel.json` reescreve `/` para a home.

1. Push no GitHub  
2. Importar em [vercel.com/new](https://vercel.com/new)  
3. Framework: **Other** · Build vazio · Output: `.`  
4. Deploy automático em `main`

---

## Adicionar uma página

Siga `specs/how-to-add-page.md` (resumo em `AGENTS.md`).

1. Spec em `specs/pages/<slug>.md`  
2. Código em `pages/<slug>/index.dc.html`  
3. Atualizar `specs/sitemap.md` + `content/site.json`  
4. Incluir `shared/lead-form` no helmet e link na nav  

---

## Marca rápida

- Laranja: `#F66B0A`  
- Navy: `#00204D`  
- Fontes: Sora · Plus Jakarta Sans · JetBrains Mono  
- Ver `specs/brand.md` e `design-system/readme.md`

---

## Referências

Arquivos em `references/` (dumps, protótipos, prints) **não** entram no site publicado.
