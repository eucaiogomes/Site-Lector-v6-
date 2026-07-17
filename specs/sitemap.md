# Sitemap — Lector Site

Atualize este arquivo sempre que criar, renomear ou descontinuar uma página.  
Fonte de dados paralela: `content/site.json`.

**Última revisão:** 2026-07-17 (higiene + docs alinhadas ao repo)

## Status

| Status | Significado |
|--------|-------------|
| `live` | Implementada, linkável, pronta para tráfego |
| `wip` | Código completo e navegável; mídia/copy comercial ou placeholders ainda abertos |
| `planned` | Spec ou intenção, sem pasta em `pages/` |
| `archived` | Mantida só como referência |

## Mapa

| Rota (slug) | Título | Spec | Código | Status | Header |
|-------------|--------|------|--------|--------|--------|
| `home` | Home | `specs/pages/home.md` | `pages/home/index.dc.html` | `live` | dark |
| `blog` | Blog | `specs/pages/blog.md` | `pages/blog/index.dc.html` | `live` | light |
| `contato` | Contato | `specs/pages/contato.md` | `pages/contato/index.dc.html` | `live` | light |
| `plataforma-lector` | Plataforma Lector | `specs/pages/plataforma-lector.md` | `pages/plataforma-lector/index.dc.html` | `wip` | dark |
| `copiloto-vendas` | Copiloto de Vendas | `specs/pages/copiloto-vendas.md` | `pages/copiloto-vendas/index.dc.html` | `wip` | light |
| `solucao-nr-1` | Solução NR-1 | `specs/pages/solucao-nr-1.md` | `pages/solucao-nr-1/index.dc.html` | `wip` | dark |
| `conteudo-sob-demanda` | Criação de Conteúdo sob Demanda | `specs/pages/conteudo-sob-demanda.md` | `pages/conteudo-sob-demanda/index.dc.html` | `wip` | dark |
| `diagnostico-gaps` | Diagnóstico de Gaps | `specs/pages/diagnostico-gaps.md` | `pages/diagnostico-gaps/index.dc.html` | `wip` | dark |
| `servicos-especializados` | Serviços Especializados | `specs/pages/servicos-especializados.md` | `pages/servicos-especializados/index.dc.html` | `wip` | light |
| `clientes` | Clientes | `specs/pages/clientes.md` | `pages/clientes/index.dc.html` | `wip` | light |
| `solucoes` | Hub Nossas Soluções | — | — | `planned` | — |

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
| `/clientes` | `pages/clientes/index.dc.html` |

Nav e CTAs no HTML usam **paths absolutos do arquivo estático** (`/pages/<slug>/index.dc.html`), que funcionam na Vercel sem depender do rewrite. Rewrites limpos (`/blog`, …) continuam no `vercel.json` como alias amigável.

`sitemap.xml` e `llms.txt` listam as **URLs públicas limpas** (não os paths `/pages/...`).

## Navegação principal (atual)

```
Nossas Soluções ▾ · Blog · Clientes · Contato
CTA: Falar com especialista  →  lead form modal (ou #form na página contato)
```

- **Clientes** → `/clientes` (`pages/clientes/index.dc.html`)
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
| `#conhecimento` | Conhecimento invisível (scroll-scrub) |
| `#diagnostico-home` | Diagnóstico + jornada (split com globo 3D) |
| `#jornada` | Coluna da jornada (dentro de `#diagnostico-home`) |
| `#ia` | IA Lector |
| `#plataforma` | Statement “todas num só lugar” + entrada para soluções |
| `#autoria` | Ferramenta de autoria |
| `#lms` | LMS |
| `#rede-social` | Rede social corporativa |
| `#webconferencia` | Webconferência |
| `#documentos` | Gestão de documentos |
| `#talentos` | Gestão de talentos |
| `#modulos` | Módulos bento |
| `#numeros` | Resultados / stats |
| `#contato` | CTA final (também abre lead form) |

## Shared / componentes de site

| Peça | Path | Spec |
|------|------|------|
| Lead form modal | `shared/lead-form.{js,css}` | `specs/components/lead-form.md` |
| Schema Organization (ref.) | `shared/schema-organization.json` | `specs/geo.md` |
| Header | embutido por página (dark / light) | `specs/components/header.md` |
| Footer | embutido por página | — (ainda sem spec; padrão ink-950 + colunas) |

## Mídia por página

| Slug | Conteúdo em `assets/media/<slug>/` |
|------|-------------------------------------|
| `home` | `hero.mp4`, `video-autoria.mp4`, `gestao-documentos.mp4`, `gestao-talentos.png`, `lms.png`, `rede-social.png`, `webconferencia.png`, `conhecimento-scroll.mp4` (+ poster) |
| `plataforma-lector` | `mandala-girando.mp4`, `hero-poster.jpg`, `onboarding.png` (também reutiliza mídia da home em spotlights) |
| `copiloto-vendas` | `hero.jpg`, `antes-reuniao.jpg`, `durante-reuniao.jpg`, `depois-reuniao.jpg`, `gestao.jpg` |
| `conteudo-sob-demanda` | `criacao-de-conteudo.mp4`, `video-demonstracao-1..4.mp4` + posters |
| `clientes` | só `.gitkeep` (usa logos em `assets/clients/`) |
| `contato`, `diagnostico-gaps`, `servicos-especializados`, `solucao-nr-1` | só `.gitkeep` (mocks HTML ou placeholders) |

**Regra:** mídia de produção **nunca** na raiz do repo. Dumps → `references/raw/`.

## Dívida conhecida (sitemap)

- [x] Rewrites Vercel para rotas limpas (`/blog`, `/contato`, soluções, `/clientes`)
- [x] Página `clientes`
- [x] Meta title/description na home (e demais páginas)
- [ ] Página hub `solucoes`
- [ ] Extrair header/footer para `shared/`
- [ ] Backend de leads (modal + forms embutidos)
- [ ] Mídia final em soluções ainda com `.gitkeep` (NR-1, gaps, serviços, contato)

## Como registrar página nova

1. Linha na tabela acima  
2. Entry em `content/site.json` → `nav` e `pages`  
3. Spec + pasta em `pages/`  
4. URL em `sitemap.xml` + rewrite em `vercel.json`  
5. Link no dropdown/nav em **todas** as páginas HTML (header ainda duplicado)  
6. Pasta `assets/media/<slug>/` se houver mídia  
