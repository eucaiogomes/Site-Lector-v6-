# Site Lector

Site institucional e marketing da **Lector** — plataforma de aprendizado com IA nativa (LMS / educação corporativa B2B).

Organizado para crescer com **IA e agentes de código**: specs primeiro, uma pasta por página, design system centralizado.

---

## Estrutura

| Pasta | Função |
|-------|--------|
| `specs/` | Documentação e contratos para humanos + agentes |
| `pages/` | Código de cada página (`pages/<slug>/index.dc.html`) |
| `design-system/` | Tokens CSS, styles e bundle de componentes |
| `assets/` | Brand, clientes e mídia de produção |
| `content/` | Dados estruturados (nav, CTAs, copy global) |
| `shared/` | Partials e utilitários compartilhados |
| `references/` | Inspiração e rascunhos (**não** é produção) |
| `AGENTS.md` | Regras obrigatórias para agentes de código |

---

## Página atual

- **Home** → `pages/home/index.dc.html`  
  Spec: `specs/pages/home.md`

---

## Como abrir a home

Abra no browser (ou no runtime Design Canvas):

```text
pages/home/index.dc.html
```

Paths relativos já apontam para `../../support.js`, `../../design-system/` e `../../assets/`.

---

## Deploy (GitHub + Vercel)

Site **estático** — sem build step. A Vercel serve os arquivos e o `vercel.json` aponta `/` para a home.

1. Push deste repositório no GitHub
2. Em [vercel.com/new](https://vercel.com/new), importe o repo
3. Framework Preset: **Other** · Build Command: vazio · Output Directory: `.` (raiz)
4. Deploy — cada push em `main` publica automaticamente

URL local de produção: `https://<seu-projeto>.vercel.app/`

---

## Adicionar uma página

Siga `specs/how-to-add-page.md` (resumo em `AGENTS.md`).

1. Spec em `specs/pages/<slug>.md`
2. Código em `pages/<slug>/index.dc.html`
3. Atualizar `specs/sitemap.md` + `content/site.json`

---

## Marca rápida

- Laranja: `#F66B0A`
- Navy: `#00204D`
- Fontes: Sora · Plus Jakarta Sans · JetBrains Mono
- Ver `specs/brand.md` e `design-system/readme.md`

---

## Referências

Arquivos em `references/` (dumps de sites, prints, vídeos) servem só de inspiração. Não linkar no site publicado.
