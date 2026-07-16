# Arquitetura do site

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
├── support.js
├── vercel.json
├── content/site.json
├── shared/
│   ├── lead-form.css
│   └── lead-form.js
├── pages/<slug>/index.dc.html
├── design-system/
├── assets/
│   ├── brand/
│   ├── clients/
│   └── media/<slug>/
├── specs/
└── references/          # NÃO é produção
    ├── inspiration/
    ├── prototypes/      # ex.: lector-blog antigo
    └── raw/             # dumps, vídeos soltos, prints
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
    <!-- tokens DS + styles + shared/lead-form + lucide -->
  </helmet>
  <!-- seções -->
</x-dc>
<script type="text/x-dc" data-dc-script data-props="{}">
  // estado e handlers
</script>
</body>
</html>
```

Helmet típico (paths a partir de `pages/<slug>/`):

```html
<link rel="stylesheet" href="../../design-system/tokens/fonts.css">
<!-- … demais tokens … -->
<link rel="stylesheet" href="../../design-system/styles.css">
<link rel="stylesheet" href="../../shared/lead-form.css">
<script src="../../design-system/_ds_bundle.js"></script>
<script src="https://unpkg.com/lucide@latest"></script>
<script src="../../shared/lead-form.js" data-base="../.."></script>
```

## Convenções de seções

```html
<!-- SECTION: hero -->
<!-- SECTION: nav -->
<!-- SECTION: cta -->
<!-- SECTION: footer -->
```

## Design system

- Tokens: `design-system/tokens/*`
- Styles: `design-system/styles.css`
- Bundle: `design-system/_ds_bundle.js`
- Doc: `design-system/readme.md`

**Regra:** se o token existe, use o token.

## Assets

```
assets/
  brand/           # logo-lector.svg, logo-lector-light.svg, orbit, mark
  clients/         # logos de clientes
  media/
    home/          # hero.mp4, video-autoria.mp4, lms.png, rede-social.png
    <slug>/        # mídia de página (pode ter só .gitkeep no wip)
```

## Shared

| Arquivo | Função |
|---------|--------|
| `lead-form.css` / `lead-form.js` | Modal de lead (todas as páginas) |

Header/footer ainda embutidos por página — extrair quando estabilizar.

## Referências

```
references/
  inspiration/     # sites de referência
  prototypes/      # protótipos descontinuados (ex. lector-blog)
  raw/             # prints, vídeos soltos, HTML de rascunho
```

Agentes **não** linkam `references/` em produção.

## Evolução futura

| Necessidade | Onde encaixar |
|-------------|----------------|
| Next.js / Astro | `pages/` vira rotas; specs permanecem |
| CMS | `content/` |
| i18n | `content/pt/`, `content/en/` |
| Header/footer partial | `shared/header.*` |
| Backend de leads | endpoint + `lead-form.js` onSubmit |
