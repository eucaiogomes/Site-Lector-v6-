# Specs de componentes (site)

Peças reutilizáveis do **marketing site** (não o design system em `design-system/`).

| Spec | Status | Código |
|------|--------|--------|
| [header.md](./header.md) | wip (duplicado por página) | embutido em `pages/*/index.dc.html` |
| [lead-form.md](./lead-form.md) | live | `shared/lead-form.{js,css}` |

## Como adicionar

1. Crie `specs/components/<nome>.md`
2. Código compartilhado em `shared/`
3. Referencie nas specs de página
