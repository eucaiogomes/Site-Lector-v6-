# AGENTS.md — Lector Site

Instruções para agentes de código (Grok, Claude, Cursor, Codex, etc.).
Leia este arquivo **antes** de criar ou editar qualquer página.

---

## O que é este projeto

Site institucional / marketing da **Lector** (LMS + educação corporativa B2B).
Stack atual: HTML no formato Design Canvas (`.dc.html`) + design system próprio em CSS tokens + `support.js` (runtime).

**Idioma:** Português (BR). Tom: confiante, direto, marketing — segunda pessoa ("você"). Sem emoji.

**Docs canônicas:** `specs/` (product, brand, architecture, sitemap, pages, components).  
Estado e rotas: `specs/sitemap.md` + `content/site.json`.

---

## Mapa de pastas (fonte da verdade)

```
/
├── AGENTS.md                 ← você está aqui
├── README.md
├── support.js                ← runtime DC (não editar manualmente)
├── vercel.json
│
├── specs/                    ← SPECS (leia antes de codar)
│   ├── product.md
│   ├── brand.md
│   ├── architecture.md
│   ├── sitemap.md
│   ├── how-to-add-page.md
│   ├── pages/                ← 1 spec por página
│   └── components/           ← header, lead-form, …
│
├── pages/                    ← CÓDIGO das páginas
│   └── <slug>/
│       └── index.dc.html
│
├── design-system/            ← tokens, styles, bundle
│
├── assets/
│   ├── brand/                ← logos oficiais (logo-lector.svg, light, orbit)
│   ├── clients/
│   └── media/<slug>/         ← mídia de produção por página
│
├── content/
│   └── site.json             ← nav, CTAs, páginas (fonte para agentes; não é lido em runtime)
│
├── shared/                   ← lead form e utilitários do site
│   ├── lead-form.css
│   └── lead-form.js
│
└── references/               ← NÃO é produção
    ├── inspiration/
    ├── prototypes/           ← ex.: lector-blog antigo
    └── raw/                  ← dumps, vídeos soltos, rascunhos
```

---

## Regras de ouro

1. **Spec antes de código.** Toda página nova precisa de `specs/pages/<slug>.md` (copie `_TEMPLATE.md`).
2. **Uma pasta por página** em `pages/<slug>/`. Não soltar HTML na raiz.
3. **Use o design system.** Cores, tipo, raios e sombras vêm de `design-system/tokens/*`. Não inventar hex soltos.
4. **Assets no lugar certo:**
   - marca → `assets/brand/`
   - clientes → `assets/clients/`
   - mídia de página → `assets/media/<slug>/`
5. **`references/` é sagrado de lixo útil.** Nunca copiar dumps para `pages/` ou `assets/` de produção sem curadoria.
6. **Não editar `support.js`** (gerado). Não mexer no bundle do DS sem necessidade.
7. **Atualize o sitemap** (`specs/sitemap.md` + `content/site.json`) ao adicionar rota/página.
8. **CTAs de lead** usam `shared/lead-form` — inclua CSS/JS no helmet de páginas novas.
9. **Cresça por adição**, não por monólito: shared/partials; seções comentadas no HTML.
10. **Nav é duplicada.** Header ainda está embutido em cada página. Mudança de menu = editar **todas** as `pages/*/index.dc.html` + `site.json` + `sitemap.md`.
11. **Spec acompanha o HTML.** Ao mudar seções/CTAs, atualize `specs/pages/<slug>.md`.
12. **Sem badges de título de seção.** Não use labels/eyebrows em CAIXA ALTA (ou pills) acima do H2. O tema da seção entra **no próprio título** (ex.: “Como funciona: do diagnóstico à evidência…”). Status em mocks de UI (ex.: Completo / Pronto) são permitidos — isso não é badge de seção.
13. **GEO (IAs).** Conteúdo crítico (FAQ, cápsula de resposta, prova) em **HTML estático**, legível sem JS. Ver `specs/geo.md`.
    - Foundation no deploy: `llms.txt`, `robots.txt`, `sitemap.xml` (raiz).
    - Schema `Organization` no helmet de cada página (não remover).
    - Cápsula `.geo-capsule` / `data-geo-capsule` no topo das páginas de marketing.
    - **Nunca** reintroduzir “vagas limitadas” ou escassez sem lastro real.

---

## Duas famílias de layout

| Família | Páginas | Header |
|---------|---------|--------|
| Dark home | `home` | Glass navy + dropdown `.lk-nav-dd` |
| Light sticky | blog, contato, 6 soluções | `.lec-nav` + `.lec-dd` + drawer `.lec-mnav` |

Boilerplate de solução: copiar de `blog` ou `servicos-especializados`, não da home.

---

## Paths relativos a partir de `pages/<slug>/`

```html
<script src="../../support.js"></script>
<link rel="stylesheet" href="../../design-system/tokens/fonts.css">
<link rel="stylesheet" href="../../design-system/tokens/colors.css">
<link rel="stylesheet" href="../../design-system/tokens/typography.css">
<link rel="stylesheet" href="../../design-system/tokens/spacing.css">
<link rel="stylesheet" href="../../design-system/tokens/effects.css">
<link rel="stylesheet" href="../../design-system/tokens/base.css">
<link rel="stylesheet" href="../../design-system/styles.css">
<link rel="stylesheet" href="../../shared/lead-form.css">
<script src="../../design-system/_ds_bundle.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<script src="../../shared/lead-form.js" data-base="../.."></script>
<img src="../../assets/brand/logo-lector.svg" alt="Lector">
```

Inclua também `<title>` e `<meta name="description">` no helmet (exceto se a tarefa for só visual e a spec disser o contrário).

---

## Fluxo: adicionar uma página nova

1. Ler `specs/how-to-add-page.md`
2. Criar `specs/pages/<slug>.md` a partir do template
3. Criar `pages/<slug>/index.dc.html` (com lead-form no helmet)
4. Registrar em `specs/sitemap.md`, `content/site.json`, `sitemap.xml` e rewrite em `vercel.json` (`/<slug>` → `pages/<slug>/index.dc.html`)
5. Se precisar de mídia: `assets/media/<slug>/`
6. Linkar na nav em **todas** as páginas com path absoluto do arquivo (`/pages/<slug>/index.dc.html` — nunca `../slug/…` relativo)

---

## Marca (resumo)

| Token / uso | Valor |
|-------------|--------|
| Brand (laranja) | `#F66B0A` → `--brand` / `--orange-500` |
| Navy | `#00204D` → `--accent-navy` / `--navy-800` |
| Ink escuro | `#001026` → `--ink-950` |
| Display | Sora 700–800 |
| UI / corpo | Plus Jakarta Sans |
| Mono | JetBrains Mono |
| Ícones | Lucide (linha), sem emoji |

Detalhes: `specs/brand.md` e `design-system/readme.md`.

---

## Status das páginas (resumo)

| Status | Significado |
|--------|-------------|
| `live` | Home, Blog, Contato |
| `wip` | 6 soluções (HTML completo e linkável; mídia/placeholders comerciais abertos) |
| `planned` | Hub Soluções, página Clientes |

Detalhe: `specs/sitemap.md`.

---

## O que NÃO fazer

- Criar CSS global paralelo ao design system
- Duplicar logos em várias pastas
- Colocar conteúdo de produção em `references/`
- Deixar lixo (vídeos, HTML solto, dumps) na **raiz**
- Páginas monólito sem seções nomeadas
- Commitar dumps grandes de sites de referência sem `.gitignore`
- Atualizar nav em só uma página e esquecer as outras
- Tratar `design-system/readme.md` legado de monorepo React como mapa de pastas deste site
- Usar **badge / eyebrow / kicker** como título de seção (rótulo pequeno acima do H2)

---

## Checklist rápido antes de entregar

- [ ] Spec da página existe e está coerente com o HTML
- [ ] Paths `../../design-system`, `../../assets`, `../../shared` corretos
- [ ] Tokens CSS usados (não hex aleatórios)
- [ ] Lead form incluído se a página tiver CTAs de conversão
- [ ] Title + meta description no helmet
- [ ] Sitemap + `site.json` atualizados
- [ ] Nav sincronizada em todas as páginas afetadas
- [ ] Copy em PT-BR, tom Lector
- [ ] Sem badges de título de seção (tema no H2)
- [ ] Responsivo básico (mobile/desktop)
- [ ] Sem dependência de arquivos em `references/`
