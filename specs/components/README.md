# Specs de componentes (site)

Use esta pasta para documentar **peças reutilizáveis do site** (não o design system inteiro).

O design system oficial vive em `design-system/` (Button, Card, Modal, etc.).  
Aqui ficam apenas componentes ou padrões **específicos do marketing site**, por exemplo:

- Header institucional
- Footer
- Client logo marquee
- Form de diagnóstico / contato
- Announcement pill

## Como adicionar

1. Crie `specs/components/<nome>.md`
2. Se virar código compartilhado, coloque em `shared/` (ex.: `shared/header.dc.html`)
3. Referencie nas specs de página que usam a peça

## Template mínimo

```markdown
# Componente: Nome

## Onde é usado
- pages/home, pages/…

## Props / variantes
- …

## Markup / paths de assets
- …

## Não fazer
- …
```
