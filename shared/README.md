# Shared

Peças reutilizáveis do **marketing site** (não o design system em `design-system/`).

```text
shared/
  lead-form.css              # modal de lead (branco, identidade Lector)
  lead-form.js               # injeta o modal; abre em CTAs
  schema-organization.json   # referência do JSON-LD Organization (fonte no HTML)
  README.md
```

Specs: `specs/components/lead-form.md`, `specs/components/header.md`, `specs/geo.md`.

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

## Schema Organization

`schema-organization.json` é cópia de referência. O JSON-LD canônico vive no **helmet de cada página** (não importar este arquivo em runtime). Ao mudar dados da organização, atualize o HTML de todas as páginas + este arquivo + `llms.txt` se aplicável.

## Ainda não extraído

| Peça | Onde vive hoje |
|------|----------------|
| Header dark / light | Duplicado em cada `pages/*/index.dc.html` |
| Footer | Duplicado (padrão ink-950 + colunas) |
| Promo bar | Duplicado nas páginas com announce |

Extrair aqui quando estabilizar — ver `specs/components/header.md`.
