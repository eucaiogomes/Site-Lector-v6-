# AGENTS.md — Lector Site

Instruções para agentes de código (Grok, Claude, Cursor, Codex, etc.).
Leia este arquivo **antes** de criar ou editar qualquer página.

---

## O que é este projeto

Site institucional / marketing da **Lector** (LMS + educação corporativa B2B).
Stack atual: HTML no formato Design Canvas (`.dc.html`) + design system próprio em CSS tokens + `support.js` (runtime).

**Idioma:** Português (BR). Tom: confiante, direto, marketing — segunda pessoa ("você"). Sem emoji.

---

## Mapa de pastas (fonte da verdade)

```
/
├── AGENTS.md                 ← você está aqui
├── README.md
├── support.js                ← runtime DC (não editar manualmente)
│
├── specs/                    ← SPECS (leia antes de codar)
│   ├── product.md
│   ├── brand.md
│   ├── architecture.md
│   ├── sitemap.md
│   ├── how-to-add-page.md
│   ├── pages/                ← 1 spec por página
│   │   ├── _TEMPLATE.md
│   │   └── home.md
│   └── components/           ← specs de peças reutilizáveis
│
├── pages/                    ← CÓDIGO das páginas
│   └── <slug>/
│       ├── index.dc.html     ← entry da página
│       ├── page.css          ← opcional, só se a página precisar
│       └── page.js           ← opcional
│
├── design-system/            ← tokens, styles, bundle (não reinventar)
│   ├── styles.css
│   ├── tokens/
│   └── _ds_bundle.js
│
├── assets/
│   ├── brand/                ← logos, orbit, marca
│   ├── clients/              ← logos de clientes
│   └── media/                ← imagens/vídeos de produção
│
├── content/                  ← conteúdo estruturado (nav, CTAs, copy global)
│   └── site.json
│
├── shared/                   ← partials / utilitários futuros
│
└── references/               ← NÃO é produção (inspiração, dumps, rascunhos)
    ├── inspiration/
    └── raw/
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
5. **`references/` é sagrado de lixo útil.** Nunca copiar dumps de concorrentes para `pages/` ou `assets/` de produção sem curadoria.
6. **Não editar `support.js`** (gerado). Não mexer no bundle do DS sem necessidade.
7. **Atualize o sitemap** (`specs/sitemap.md` + `content/site.json`) ao adicionar rota/página.
8. **Cresça por adição**, não por monólito: novas seções → preferir partials/shared; páginas grandes → seções comentadas claras no HTML.

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
<script src="../../design-system/_ds_bundle.js"></script>
<img src="../../assets/brand/logo-lector.svg" alt="Lector">
```

---

## Fluxo: adicionar uma página nova

1. Ler `specs/how-to-add-page.md`
2. Criar `specs/pages/<slug>.md` a partir do template
3. Criar `pages/<slug>/index.dc.html`
4. Registrar em `specs/sitemap.md` e `content/site.json`
5. Se precisar de mídia: `assets/media/<slug>/`
6. Linkar a partir do nav (home / header global) quando a página estiver pronta

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

## O que NÃO fazer

- Criar CSS global paralelo ao design system
- Duplicar logos em várias pastas
- Colocar conteúdo de produção em `references/`
- Páginas monólito de 5k linhas sem seções nomeadas
- Commitar dumps grandes de sites de referência sem `.gitignore`

---

## Checklist rápido antes de entregar

- [ ] Spec da página existe e está coerente com o HTML
- [ ] Paths `../../design-system` e `../../assets` corretos
- [ ] Tokens CSS usados (não hex aleatórios)
- [ ] Sitemap atualizado
- [ ] Copy em PT-BR, tom Lector
- [ ] Responsivo básico (mobile/desktop)
- [ ] Sem dependência de arquivos em `references/`
