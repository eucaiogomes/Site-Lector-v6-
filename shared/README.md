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

- Logo do modal: `assets/brand/logo-lector.svg`  
- API: `window.__LectorLeadForm.open({ interest: 'demonstracao' })`  
- Interests: `demonstracao`, `especialista`, `diagnostico`, `conteudo`, `nr1`, `vendas`, `servicos`, `outro`  

Abre em CTAs de conversão, `#contato` / `#cta`, e announcement de diagnóstico.  
Backend ainda **não** integrado (sucesso local + log).

## Ainda não extraído

| Peça | Onde vive hoje |
|------|----------------|
| Header dark / light | Duplicado em cada `pages/*/index.dc.html` |
| Footer | Duplicado (padrão ink-950 + colunas) |
| Promo bar | Duplicado nas páginas light + home |

Extrair aqui quando estabilizar — ver `specs/components/header.md`.
