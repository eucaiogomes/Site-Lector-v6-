# Sitemap — Lector Site

Atualize este arquivo sempre que criar, renomear ou descontinuar uma página.

## Status

| Status | Significado |
|--------|-------------|
| `live` | Implementada e linkável |
| `wip` | Em construção |
| `planned` | Spec ou intenção, sem código ainda |
| `archived` | Mantida só como referência |

## Mapa

| Rota (slug) | Título | Spec | Código | Status |
|-------------|--------|------|--------|--------|
| `home` | Home | `specs/pages/home.md` | `pages/home/index.dc.html` | `live` |
| `blog` | Blog | `specs/pages/blog.md` | `pages/blog/index.dc.html` | `live` |
| `plataforma-lector` | Plataforma Lector | `specs/pages/plataforma-lector.md` | `pages/plataforma-lector/index.dc.html` | `wip` |
| `copiloto-vendas` | Copiloto de Vendas | `specs/pages/copiloto-vendas.md` | `pages/copiloto-vendas/index.dc.html` | `wip` |
| `solucao-nr-1` | Solução NR-1 | `specs/pages/solucao-nr-1.md` | `pages/solucao-nr-1/index.dc.html` | `wip` |
| `conteudo-sob-demanda` | Criação de Conteúdo sob Demanda | `specs/pages/conteudo-sob-demanda.md` | `pages/conteudo-sob-demanda/index.dc.html` | `wip` |
| `diagnostico-gaps` | Diagnóstico de Gaps | `specs/pages/diagnostico-gaps.md` | `pages/diagnostico-gaps/index.dc.html` | `wip` |
| `servicos-especializados` | Serviços Especializados | `specs/pages/servicos-especializados.md` | `pages/servicos-especializados/index.dc.html` | `wip` |
| `solucoes` | Hub Nossas Soluções | — | — | `planned` |
| `clientes` | Clientes | — | — | `planned` |
| `contato` | Contato | `specs/pages/contato.md` | `pages/contato/index.dc.html` | `live` |

## Navegação principal (atual)

```
Nossas Soluções ▾ · Blog · Clientes · Contato
CTA: Falar com especialista  →  lead form modal
```

### Dropdown Nossas Soluções

| Item | Status |
|------|--------|
| Plataforma Lector | wip |
| Copiloto de Vendas | wip |
| Solução NR-1 | wip |
| Criação de Conteúdo sob Demanda | wip |
| Diagnóstico de Gaps | wip |
| Serviços Especializados | wip |

Fonte de dados: `content/site.json`.

## Âncoras na home

| Âncora | Seção |
|--------|--------|
| `#top` | Hero |
| `#depoimento` | Depoimentos |
| `#ia` | IA Lector |
| `#plataforma` | Soluções / plataforma |
| `#autoria` | Ferramenta de autoria |
| `#lms` | LMS |
| `#rede-social` | Rede social |
| `#webconferencia` | Webconferência |
| `#numeros` | Resultados / clientes |
| `#contato` | CTA final (também abre lead form) |

## Shared / componentes de site

| Peça | Path | Spec |
|------|------|------|
| Lead form modal | `shared/lead-form.{js,css}` | `specs/components/lead-form.md` |
| Header | embutido por página | `specs/components/header.md` |

## Como registrar página nova

1. Linha na tabela acima  
2. Entry em `content/site.json` → `nav` e `pages`  
3. Spec + pasta em `pages/`  
4. Link na navbar quando estiver pronta  
