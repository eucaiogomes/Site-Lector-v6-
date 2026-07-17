# Componente: Header / Navbar

| Campo | Valor |
|-------|--------|
| **Status** | `wip` (ainda embutido por página, sem partial) |
| **Fonte de dados** | `content/site.json` → `nav` + `ctas` (não lido em runtime — sincronizar à mão) |
| **Última atualização** | 2026-07-17 |

## Onde é usado

| Página(s) | Variante | Classes |
|-----------|----------|---------|
| Home | Dark pill (glass navy) | inline + `.lk-nav-dd` |
| Blog, Contato, Plataforma, Copiloto, NR-1, Conteúdo, Gaps, Serviços | Light sticky | `.lec-nav` / `.lec-dd` / `.lec-mnav` |

## Estrutura

```
[Logo]  [Nossas Soluções ▾]  Blog  Clientes  Contato  |  [Falar com especialista]
              └─ 6 itens com ícone + título + descrição
```

### Dropdown “Nossas Soluções”

Cada item: ícone Lucide + título + descrição (canônico em `content/site.json` → `nav[0].children`).

| # | Label | href relativo típico | Status |
|---|-------|----------------------|--------|
| 1 | Plataforma Lector | `../plataforma-lector/index.dc.html` | wip |
| 2 | Copiloto de Vendas | `../copiloto-vendas/index.dc.html` | wip |
| 3 | Solução NR-1 | `../solucao-nr-1/index.dc.html` | wip |
| 4 | Criação de Conteúdo sob Demanda | `../conteudo-sob-demanda/index.dc.html` | wip |
| 5 | Diagnóstico de Gaps | `../diagnostico-gaps/index.dc.html` | wip |
| 6 | Serviços Especializados | `../servicos-especializados/index.dc.html` | wip |

Item da página atual: classe `is-active` + `aria-current="page"` quando aplicável.

### Links principais

| Label | Destino |
|-------|---------|
| Blog | `../blog/index.dc.html` (ou `./` no blog) |
| Clientes | `../home/index.dc.html#numeros` (página dedicada `planned`) |
| Contato | `../contato/index.dc.html` |
| Logo | `../home/index.dc.html` |

### CTA único

- Label: **Falar com especialista**
- Home e soluções: abre lead form (`#contato` / `#cta` interceptado) ou solid button
- Página contato: scroll para `#form` (form embutido)

### Mobile

- Páginas light: burger + drawer `.lec-mnav` com lista de soluções + links + CTA  
- Home: drawer dedicado ainda incompleto (melhoria pendente na spec da home)

## Paths de assets

- Dark (home / footer): `assets/brand/logo-lector-light.svg`
- Light (nav clara): `assets/brand/logo-lector.svg`

## Promo / announcement bar

Páginas light e home costumam ter faixa de diagnóstico acima da nav (“Quero meu diagnóstico” → lead form).  
Home: marquee + dismiss.

## Ao editar a nav

1. Atualize `content/site.json`  
2. Atualize **todas** as cópias em `pages/*/index.dc.html` (dropdown + mobile)  
3. Atualize `specs/sitemap.md` se o mapa mudar  
4. Marque item ativo na página corrente  

## Evolução

Extrair para `shared/header` (partial ou JS) com variantes `dark` | `light` + `activePage`, preferencialmente lendo `site.json` ou um partial gerado.
