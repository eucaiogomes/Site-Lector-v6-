# Shared

Peças reutilizáveis do **marketing site** (não o design system em `design-system/`).

```text
shared/
  lead-form.css    # modal de lead (branco, identidade Lector)
  lead-form.js     # injeta o modal; abre em CTAs
  README.md
```

Specs: `specs/components/lead-form.md`, `specs/components/header.md`.

## Lead form modal

Em cada página (helmet):

```html
<link rel="stylesheet" href="../../shared/lead-form.css">
<script src="../../shared/lead-form.js" data-base="../.."></script>
```

Logo do modal: `assets/brand/logo-lector.svg`.

Abre em CTAs de conversão, `#contato` / `#cta`, e announcement de diagnóstico.  
API: `window.__LectorLeadForm.open({ interest: 'demonstracao' })`.

Header/footer ainda embutidos por página; extrair aqui quando estabilizar.
