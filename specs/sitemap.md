# Sitemap — Lector Site

Atualize este arquivo sempre que criar, renomear ou descontinuar uma página.  
Fonte de dados paralela: `content/site.json`.

**Última revisão:** 2026-07-17

## Status

| Status | Significado |
|--------|-------------|
| `live` | Implementada, linkável, pronta para tráfego |
| `wip` | Código completo e navegável; mídia/copy comercial ou placeholders ainda abertos |
| `planned` | Spec ou intenção, sem pasta em `pages/` |
| `archived` | Mantida só como referência |

## Mapa

| Rota (slug) | Título | Spec | Código | Status |
|-------------|--------|------|--------|--------|
| `home` | Home | `specs/pages/home.md` | `pages/home/index.dc.html` | `live` |
| `blog` | Blog | `specs/pages/blog.md` | `pages/blog/index.dc.html` | `live` |
| `contato` | Contato | `specs/pages/contato.md` | `pages/contato/index.dc.html` | `live` |
| `plataforma-lector` | Plataforma Lector | `specs/pages/plataforma-lector.md` | `pages/plataforma-lector/index.dc.html` | `wip` |
| `copiloto-vendas` | Copiloto de Vendas | `specs/pages/copiloto-vendas.md` | `pages/copiloto-vendas/index.dc.html` | `wip` |
| `solucao-nr-1` | Solução NR-1 | `specs/pages/solucao-nr-1.md` | `pages/solucao-nr-1/index.dc.html` | `wip` |
| `conteudo-sob-demanda` | Criação de Conteúdo sob Demanda | `specs/pages/conteudo-sob-demanda.md` | `pages/conteudo-sob-demanda/index.dc.html` | `wip` |
| `diagnostico-gaps` | Diagnóstico de Gaps | `specs/pages/diagnostico-gaps.md` | `pages/diagnostico-gaps/index.dc.html` | `wip` |
| `servicos-especializados` | Serviços Especializados | `specs/pages/servicos-especializados.md` | `pages/servicos-especializados/index.dc.html` | `wip` |
| `solucoes` | Hub Nossas Soluções | — | — | `planned` |
| `clientes` | Clientes | — | — | `planned` |

### Rotas no deploy

| URL pública | Rewrite Vercel (`vercel.json`) |
|-------------|-------------------------------|
| `/` | `pages/home/index.dc.html` |
| `/home` | `pages/home/index.dc.html` |
| `/blog` | `pages/blog/index.dc.html` |
| `/contato` | `pages/contato/index.dc.html` |
| `/plataforma-lector` | `pages/plataforma-lector/index.dc.html` |
| `/copiloto-vendas` | `pages/copiloto-vendas/index.dc.html` |
| `/solucao-nr-1` | `pages/solucao-nr-1/index.dc.html` |
| `/conteudo-sob-demanda` | `pages/conteudo-sob-demanda/index.dc.html` |
| `/diagnostico-gaps` | `pages/diagnostico-gaps/index.dc.html` |
| `/servicos-especializados` | `pages/servicos-especializados/index.dc.html` |

Nav e CTAs no HTML usam **paths absolutos do arquivo estático** (`/pages/<slug>/index.dc.html`), que funcionam na Vercel sem depender do rewrite. Rewrites limpos (`/blog`, …) continuam no `vercel.json` como alias amigável.

## Navegação principal (atual)

```
Nossas Soluções ▾ · Blog · Clientes · Contato
CTA: Falar com especialista  →  lead form modal (ou #form na página contato)
```

- **Clientes** → `#numeros` na home (página dedicada `planned`)
- **Nossas Soluções** (rótulo) → `#plataforma` na home; filhos são páginas próprias

### Dropdown Nossas Soluções

| # | Item | Slug | Status | Ícone Lucide (HTML) |
|---|------|------|--------|---------------------|
| 1 | Plataforma Lector | `plataforma-lector` | wip | `layout-grid` |
| 2 | Copiloto de Vendas | `copiloto-vendas` | wip | `trending-up` |
| 3 | Solução NR-1 | `solucao-nr-1` | wip | `shield-check` |
| 4 | Criação de Conteúdo sob Demanda | `conteudo-sob-demanda` | wip | `clapperboard` |
| 5 | Diagnóstico de Gaps | `diagnostico-gaps` | wip | `scan-search` |
| 6 | Serviços Especializados | `servicos-especializados` | wip | `briefcase` |

Descrições canônicas: `content/site.json` → `nav[0].children`.

## Âncoras na home

| Âncora | Seção |
|--------|--------|
| `#top` | Hero |
| `#depoimento` | Depoimentos (Microsoft / Philips) |
| `#ia` | IA Lector |
| `#plataforma` | Statement “todas num só lugar” + entrada para soluções |
| `#autoria` | Ferramenta de autoria |
| `#lms` | LMS |
| `#rede-social` | Rede social corporativa |
| `#webconferencia` | Webconferência |
| `#numeros` | Resultados / clientes (também alvo de “Clientes” no nav) |
| `#contato` | CTA final (também abre lead form) |

Home também tem bloco de **módulos bento** (6 cards) entre webconferência e `#numeros` (sem id de âncora dedicado).

## Shared / componentes de site

| Peça | Path | Spec |
|------|------|------|
| Lead form modal | `shared/lead-form.{js,css}` | `specs/components/lead-form.md` |
| Header | embutido por página (dark home / light demais) | `specs/components/header.md` |
| Footer | embutido por página | — (ainda sem spec; padrão ink-950 + colunas) |

## Mídia por página

| Slug | `assets/media/<slug>/` |
|------|------------------------|
| `home` | `hero.mp4`, `video-autoria.mp4`, `lms.png`, `rede-social.png` |
| demais | só `.gitkeep` — mocks HTML ou placeholders |

## Dívida conhecida (sitemap)

- [ ] Rewrites Vercel para rotas limpas (`/blog`, `/contato`, soluções)
- [ ] Página hub `solucoes` e página `clientes`
- [ ] Extrair header/footer para `shared/`
- [ ] Meta title/description na home
- [ ] Backend de leads (modal + forms embutidos)

## Como registrar página nova

1. Linha na tabela acima  
2. Entry em `content/site.json` → `nav` e `pages`  
3. Spec + pasta em `pages/`  
4. Link no dropdown/nav em **todas** as páginas HTML (header ainda duplicado)  
5. Pasta `assets/media/<slug>/` se houver mídia  
