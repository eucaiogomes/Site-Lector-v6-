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
│  shared/    lead form, schema, partials │
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
├── llms.txt                # resumo para crawlers de IA
├── robots.txt
├── sitemap.xml             # URLs públicas limpas
├── content/site.json       # nav, ctas, pages, clients (agentes; não runtime)
├── shared/
│   ├── lead-form.css
│   ├── lead-form.js
│   └── schema-organization.json
├── pages/<slug>/index.dc.html
├── design-system/
│   ├── tokens/             # fonts, colors, typography, spacing, effects, base
│   ├── styles.css
│   ├── _ds_bundle.js
│   └── readme.md
├── assets/
│   ├── brand/              # logo-lector.svg, light, mark, orbit
│   ├── clients/
│   └── media/<slug>/
├── specs/
└── references/             # NÃO é produção (inspiration / prototypes / raw)
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
    <!-- title, meta description, tokens DS, styles, lead-form, lucide, JSON-LD -->
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

### Duas famílias de layout (header)

| Família | Prefixo CSS | Páginas atuais |
|---------|-------------|----------------|
| **Dark** (glass navy + `.lk-nav-dd`) | `lk-*` | `home`, `plataforma-lector`, `solucao-nr-1`, `conteudo-sob-demanda`, `diagnostico-gaps` |
| **Light** sticky (`.lec-nav` + drawer `.lec-mnav`) | `lec-*` / prefixo da página | `blog`, `contato`, `copiloto-vendas`, `servicos-especializados`, `clientes` |

Ao copiar boilerplate, escolha a família certa. **Não misture** classes `lk-` da família dark com o shell light sem adaptar.

Boilerplate light: copiar de `blog` ou `servicos-especializados`.  
Boilerplate dark de solução: copiar de `solucao-nr-1` ou `diagnostico-gaps` (não da home monólito).

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
  brand/           # logo-lector.svg, logo-lector-light.svg, logo-mark.svg, orbit.svg
  clients/         # logos PNG de clientes (11 arquivos)
  media/
    home/                    # hero, scrubs, spotlights de produto
    plataforma-lector/       # mandala, poster, onboarding
    copiloto-vendas/         # fotos de jornada comercial
    conteudo-sob-demanda/    # showreel + 4 demos + posters
    clientes/ | contato/ | diagnostico-gaps/ | servicos-especializados/ | solucao-nr-1/
                             # .gitkeep até mídia final
```

**Higiene:** nunca commitar vídeos/PNG soltos na raiz. Produção → `assets/media/<slug>/`. Dumps → `references/raw/`.

## Shared

| Arquivo | Função |
|---------|--------|
| `lead-form.css` / `lead-form.js` | Modal de lead (todas as páginas) |
| `schema-organization.json` | Cópia de referência do JSON-LD Organization (fonte no HTML de cada página) |

Header e footer ainda **embutidos por página** — extrair para `shared/` quando estabilizar (ver `specs/components/header.md`).

## Deploy e rotas

- Estático, sem build  
- `vercel.json`: rewrites de rotas limpas → `pages/<slug>/index.dc.html`; `Content-Type` para `.dc.html`; cache longo em `assets/media/`; headers para `llms.txt` / `robots.txt` / `sitemap.xml`  
- Links internos de **páginas** usam paths absolutos do arquivo (`/pages/<slug>/index.dc.html`)  
- Assets no HTML frequentemente usam paths absolutos da raiz (`/assets/…`)  

## Dívida técnica relevante

| Item | Impacto |
|------|---------|
| Header/footer duplicados (~10×) | Qualquer mudança de nav exige editar todas as páginas |
| `site.json` não é lido em runtime | Fonte de verdade para agentes; HTML pode divergir se não sincronizar |
| Lead form sem backend | Conversão só UI |
| Home monólito (~5.6k linhas) | Preferir seções comentadas; extrair partials quando estabilizar |
| Design system readme legado | Já alinhado ao consumo local (tokens + bundle) |

## Referências

```
references/
  inspiration/     # sites de referência (ex. Heimdall) — gitignored
  prototypes/      # protótipos descontinuados — gitignored
  raw/             # prints, vídeos, HTML de rascunho — gitignored
  raw/raiz-2026-07/  # arquivos que estavam na raiz (limpeza anterior)
```

Agentes **não** linkam `references/` em produção. Ver `references/README.md`.

## Evolução futura

| Necessidade | Onde encaixar |
|-------------|----------------|
| Next.js / Astro | `pages/` vira rotas; specs permanecem |
| CMS | `content/` |
| i18n | `content/pt/`, `content/en/` |
| Header/footer partial | `shared/header.*` / `shared/footer.*` |
| Backend de leads | endpoint + `lead-form.js` onSubmit + forms embutidos |
