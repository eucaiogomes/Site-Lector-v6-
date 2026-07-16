# Arquitetura do site

## Princípio

**Crescer por pastas**, não por monólito.

- Cada página = `pages/<slug>/` + `specs/pages/<slug>.md`
- Visual compartilhado = `design-system/`
- Conteúdo global = `content/site.json`
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
│  design-system/  tokens + componentes   │
├─────────────────────────────────────────┤
│  assets/    mídia de produção           │
├─────────────────────────────────────────┤
│  support.js runtime DC                  │
└─────────────────────────────────────────┘
```

## Formato de página

Arquivos `.dc.html` (Design Canvas):

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="../../support.js"></script>
</head>
<body>
<x-dc>
  <helmet>
    <!-- links do design-system + lucide + CSS da página -->
  </helmet>
  <!-- seções da página -->
</x-dc>
<script type="text/dc" data-dc-script data-props='{}'>
  // estado e handlers da página
</script>
</body>
</html>
```

## Convenções de seções no HTML

Comente cada bloco para agentes e humanos:

```html
<!-- SECTION: hero -->
<!-- SECTION: clients -->
<!-- SECTION: features -->
<!-- SECTION: cta -->
<!-- SECTION: footer -->
```

## Design system

- Entrada: `design-system/styles.css` (+ tokens em `tokens/`)
- Bundle de componentes: `design-system/_ds_bundle.js`
- Documentação interna: `design-system/readme.md`

**Regra:** se o token existe, use o token. Só CSS local em `pages/<slug>/page.css` para layout único daquela página.

## Assets

```
assets/
  brand/           # logos e motifs oficiais
  clients/         # logos de clientes (PNG)
  media/
    <slug>/        # mídia específica de uma página
```

## Referências

```
references/
  inspiration/     # sites de referência (ex.: heimdallpower)
  raw/             # prints, vídeos baixados, colagens
```

Agentes **não** devem importar esses arquivos em páginas sem curadoria explícita do usuário.

## Evolução futura (quando precisar)

| Necessidade | Onde encaixar |
|-------------|----------------|
| Next.js / Astro | `pages/` vira rotas do framework; specs permanecem |
| CMS | `content/` vira API ou MDX |
| i18n | `content/pt/`, `content/en/` |
| Partials de header/footer | `shared/header.dc.html`, etc. |
| Componentes custom do site | `shared/components/` ou specs em `specs/components/` |

A estrutura atual já antecipa isso: **specs estáveis**, **código por página**, **DS central**.
