# Lector — Design System (consumo no site)

Este diretório é o **design system consumido pelo site de marketing** da Lector: tokens CSS, styles de entrada e bundle runtime do Design Canvas.

> Para regras de marca e tom de copy no site, use também `specs/brand.md` e `specs/product.md`.

## O que existe neste monorepo

```text
design-system/
  tokens/
    fonts.css
    colors.css
    typography.css
    spacing.css
    effects.css
    base.css
  styles.css          # entrada: @import dos tokens
  _ds_bundle.js       # componentes runtime DC — não editar à mão sem necessidade
  _ds_manifest.json
  _adherence.oxlintrc.json
  readme.md
```

Não há, neste repo, pastas `components/core`, `ui_kits/` ou `guidelines/` — isso era estrutura de um kit/export maior. O site usa **tokens + styles + bundle + CSS local por página**.

## Como incluir em uma página

A partir de `pages/<slug>/index.dc.html`:

```html
<link rel="stylesheet" href="../../design-system/tokens/fonts.css">
<link rel="stylesheet" href="../../design-system/tokens/colors.css">
<link rel="stylesheet" href="../../design-system/tokens/typography.css">
<link rel="stylesheet" href="../../design-system/tokens/spacing.css">
<link rel="stylesheet" href="../../design-system/tokens/effects.css">
<link rel="stylesheet" href="../../design-system/tokens/base.css">
<link rel="stylesheet" href="../../design-system/styles.css">
<script src="../../design-system/_ds_bundle.js"></script>
```

**Regra:** se o token existe, use o token. Não inventar hex soltos.

## Cor da marca

| Papel | Hex | Token |
|-------|-----|--------|
| Laranja (primária) | `#F66B0A` | `--brand` / `--orange-500` |
| Navy (secundária) | `#00204D` | `--accent-navy` / `--navy-800` |
| Ink profundo | `#001026` | `--ink-950` |
| Paper | `#FBFAF7` | `--paper` / `--surface-page` |

Acentos: âmbar/sunrise; neutros warm ink; status verde/vermelho/azul/amarelo.  
Tema claro arejado (padrão) + seções **dark premium** navy.

Gradientes: uso **mínimo** — marca é cor chapada; sheen/glow só pontuais.

## Tipografia

| Uso | Família | Token |
|-----|---------|--------|
| Display | Sora 700–800 | `--font-display` |
| UI / corpo | Plus Jakarta Sans | `--font-sans` |
| Mono / stats | JetBrains Mono | `--font-mono` |

Fontes via Google Fonts em `tokens/fonts.css`.

## Forma e movimento

- Botões **pill**; CTA primário com glow laranja  
- Cards bento: `--radius-xl` / `2xl`, sombras warm  
- Espaçamento base 4px (`--space-*`); ritmo de seção `--section-y`  
- Movimento: `--ease-out` / `--ease-spring`; 140 / 220 / 380ms  
- Focus: `--ring-brand`  

## Ícones e logos

- **Lucide** via CDN nas páginas (linha, sem emoji)  
- Logos de produção: `assets/brand/` (não dentro de `design-system/` neste monorepo)  
- Clientes: `assets/clients/`  

## CSS local das páginas

Cada página pode definir classes próprias no `<style>` do helmet (`lk-*` na home, `lec-*` na nav light, `pl-*`, `cv-*`, `nr-*`, etc.).  
Prefira tokens do DS dentro desse CSS local.

## Não fazer

- Criar CSS global paralelo que ignore os tokens  
- Editar `support.js` ou regenerar o bundle sem necessidade  
- Linkar assets de `references/`  
- Usar emoji como ícone  

## Evolução

Se o monorepo de design system completo (React kits, storybook, etc.) for reintegrado, documentar o caminho de import e manter este readme como **visão do consumidor do site**.
