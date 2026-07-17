# Arquitetura do site

**Última revisão:** 2026-07-17

## Princípio

**Crescer por pastas**, não por monólito.

- Cada página = `pages/<slug>/` + `specs/pages/<slug>.md`  
- Visual compartilhado = `design-system/`  
- Conteúdo global = `content/site.json`  
- Utilitários de site = `shared/`  
- Inspiração / dumps = `references/` (nunca produção)  

## Camadas

```
┌─────────────────────────────────────────┐
│  specs/     contratos (o que construir) │
├─────────────────────────────────────────┤
│  pages/     implementação por rota      │
├─────────────────────────────────────────┤
│  content/   dados e copy estruturados   │
├─────────────────────────────────────────┤
│  shared/    lead form, partials futuros │
├─────────────────────────────────────────┤
│  design-system/  tokens + componentes   │
├─────────────────────────────────────────┤
│  assets/    mídia de produção           │
├─────────────────────────────────────────┤
│  support.js runtime DC                  │
└─────────────────────────────────────────┘
```

## Mapa de pastas (produção)

```
/
├── AGENTS.md
├── README.md
├── support.js              # runtime Design Canvas — não editar
├── vercel.json             # rewrites + headers
├── content/site.json       # nav, ctas, pages, clients
├── shared/
│   ├── lead-form.css
│   └── lead-form.js
├── pages/<slug>/index.dc.html
├── design-system/
│   ├── tokens/             # fonts, colors, typography, spacing, effects, base
│   ├── styles.css
│   ├── _ds_bundle.js
│   └── readme.md
├── assets/
│   ├── brand/
│   ├── clients/
│   └── media/<slug>/
├── specs/
└── references/             # NÃO é produção
    ├── inspiration/
    ├── prototypes/
    └── raw/
```

## Formato de página

Arquivos `.dc.html` (Design Canvas):

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="../../support.js"></script>
</head>
<body>
<x-dc>
  <helmet>
    <!-- title, meta description, tokens DS, styles, lead-form, lucide -->
  </helmet>
  <!-- seções com <!-- SECTION: nome --> -->
</x-dc>
<script type="text/x-dc" data-dc-script data-props="{}">
  // estado e handlers
</script>
</body>
</html>
```

Helmet típico (paths a partir de `pages/<slug>/`):

```html
<title>…</title>
<meta name="description" content="…">
<link rel="stylesheet" href="../../design-system/tokens/fonts.css">
<!-- colors, typography, spacing, effects, base -->
<link rel="stylesheet" href="../../design-system/styles.css">
<link rel="stylesheet" href="../../shared/lead-form.css">
<script src="../../design-system/_ds_bundle.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<script src="../../shared/lead-form.js" data-base="../.."></script>
```

### Duas famílias de layout

| Família | Páginas | Header | Prefixo CSS local |
|---------|---------|--------|-------------------|
| Home dark | `home` | Glass navy + dropdown `.lk-nav-dd` | `lk-*` |
| Light sticky | blog, contato, 6 soluções | `.lec-nav` + `.lec-dd` + drawer `.lec-mnav` | por página (`pl-`, `cv-`, `nr-`, `dg-`, `se-`, `ct-`, `blog-`) |

Ao copiar boilerplate, escolha a família certa. **Não misture** classes `lk-` da home com o shell light sem adaptar.

## Convenções de seções

```html
<!-- SECTION: promo bar -->
<!-- SECTION: nav -->
<!-- SECTION: hero -->
<!-- SECTION: cta -->
<!-- SECTION: footer -->
```

IDs de âncora em minúsculas com hífen: `id="como-funciona"`.

## Design system

Neste monorepo o DS é consumido como **tokens CSS + bundle**:

| Arquivo | Função |
|---------|--------|
| `design-system/tokens/*` | Variáveis de cor, tipo, espaço, efeitos |
| `design-system/styles.css` | Entrada (`@import` dos tokens) |
| `design-system/_ds_bundle.js` | Componentes runtime do canvas |
| `design-system/readme.md` | Doc do DS no contexto deste site |

**Regra:** se o token existe, use o token. Evite hex soltos.

## Assets

```
assets/
  brand/           # logo-lector.svg, logo-lector-light.svg, orbit, mark
  clients/         # logos PNG de clientes
  media/
    home/          # únicos arquivos de produção hoje
    <slug>/        # .gitkeep nas soluções até mídia final
```

## Shared

| Arquivo | Função |
|---------|--------|
| `lead-form.css` / `lead-form.js` | Modal de lead (todas as páginas) |

Header e footer ainda **embutidos por página** — extrair para `shared/` quando estabilizar (ver `specs/components/header.md`).

## Deploy e rotas

- Estático, sem build  
- `vercel.json`: rewrites de rotas limpas (`/`, `/blog`, `/contato`, 6 soluções…) → `pages/<slug>/index.dc.html`; `Content-Type` para `.dc.html`; cache longo em `assets/media/`  
- Links internos de **páginas** usam paths absolutos do arquivo (`/pages/<slug>/index.dc.html`) — não quebram na Vercel  
- Assets/CSS/JS no helmet usam paths absolutos da raiz (`/design-system/…`, `/assets/…`, `/support.js`)  

## Dívida técnica relevante

| Item | Impacto |
|------|---------|
| Header/footer duplicados (~9×) | Qualquer mudança de nav exige editar todas as páginas |
| `site.json` não é lido em runtime | Fonte de verdade para agentes; HTML pode divergir se não sincronizar |
| Lead form sem backend | Conversão só UI |
| Assets relativos `../../` | Funcionam nas rotas limpas de 1 segmento; preferir `/assets/…` se surgir path aninhado |
| Design system readme legado | Descrevia monorepo React/kits; doc alinhada ao consumo local |

## Referências

```
references/
  inspiration/     # sites de referência (ex. Heimdall)
  prototypes/      # protótipos descontinuados (ex. lector-blog)
  raw/             # prints, vídeos, HTML de rascunho
  raw/raiz-2026-07/  # arquivos que estavam na raiz (limpeza)
```

Agentes **não** linkam `references/` em produção.

## Evolução futura

| Necessidade | Onde encaixar |
|-------------|----------------|
| Next.js / Astro | `pages/` vira rotas; specs permanecem |
| CMS | `content/` |
| i18n | `content/pt/`, `content/en/` |
| Header/footer partial | `shared/header.*` / `shared/footer.*` |
| Backend de leads | endpoint + `lead-form.js` onSubmit + forms embutidos |
| Assets root-absolute | Trocar `../../assets` e `../../design-system` por `/assets`, `/design-system` |
