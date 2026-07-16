# Componente: Header / Navbar

| Campo | Valor |
|-------|--------|
| **Status** | `wip` (ainda embutido por página, sem partial) |
| **Fonte de dados** | `content/site.json` → `nav` + `ctas` |
| **Última atualização** | 2026-07-16 |

## Onde é usado

| Página | Variante | Classes |
|--------|----------|---------|
| Home | Dark pill (glass navy) | inline + `.lk-nav-dd` |
| Blog, Plataforma, Copiloto, NR-1, Conteúdo | Light pill | `.lec-nav` / `.lec-dd` / `.lec-mnav` |

## Estrutura

```
[Logo]  [Nossas Soluções ▾]  Blog  Clientes  Contato  |  [Falar com especialista]
              └─ itens com título + descrição
```

### Dropdown “Nossas Soluções”

Cada item: ícone + título + descrição (ver `content/site.json` → `nav[0].children`).

1. Plataforma Lector  
2. Copiloto de Vendas  
3. Solução NR-1  
4. Criação de Conteúdo sob Demanda  
5. Diagnóstico de Gaps *(planned)*  
6. Serviços Especializados *(planned)*  

### CTA único

- Label: **Falar com especialista**
- Abre o lead form modal (`shared/lead-form.js`)

### Mobile

Páginas light: burger + drawer `.lec-mnav`.  
Home: ainda sem drawer dedicado (melhoria pendente).

## Paths de assets

- Dark: `assets/brand/logo-lector-light.svg`
- Light: `assets/brand/logo-lector.svg`

## Evolução

Extrair para `shared/header` (partial ou JS) com variantes `dark` | `light` + `activePage`, lendo `site.json`.
