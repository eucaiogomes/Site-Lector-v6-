# Specs

Contratos legíveis por **humanos e agentes**. Código sem spec tende a virar monólito.

Atualizado em **2026-07-17** com base no estado real do repositório.

## Índice

| Arquivo | Para quê |
|---------|----------|
| `product.md` | O que é o produto e o mapa de oferta no site |
| `brand.md` | Marca, tom, tokens resumidos |
| `architecture.md` | Pastas, camadas, formato DC, dívida técnica |
| `sitemap.md` | Rotas, status, mídia e âncoras |
| `geo.md` | **GEO** — ser recomendado/citado por IAs (llms.txt, schema, cápsulas) |
| `how-to-add-page.md` | Fluxo de nova página |
| `pages/_TEMPLATE.md` | Modelo de spec de página |
| `pages/<slug>.md` | Spec de cada página |
| `components/header.md` | Navbar / dropdown soluções |
| `components/lead-form.md` | Modal de captura de leads |

## Páginas com spec

| Spec | Status | Código (aprox.) | Observação |
|------|--------|-----------------|------------|
| `pages/home.md` | live | ~5.6k linhas | Meta SEO ok; drawer mobile home pendente |
| `pages/blog.md` | live | ~1.0k linhas | Posts mock em JS; imagens Unsplash |
| `pages/contato.md` | live | ~830 linhas | Form embutido; backend a integrar |
| `pages/plataforma-lector.md` | wip | ~2.1k linhas | Mídia parcial; polish comercial |
| `pages/copiloto-vendas.md` | wip | ~950 linhas | Fotos de jornada presentes |
| `pages/solucao-nr-1.md` | wip | ~970 linhas | FAQ + FAQPage; mídia dedicada ausente |
| `pages/conteudo-sob-demanda.md` | wip | ~1.6k linhas | Showreel + 4 demos em assets |
| `pages/diagnostico-gaps.md` | wip | ~1.4k linhas | Mock do painel em HTML |
| `pages/servicos-especializados.md` | wip | ~710 linhas | Página mais enxuta |
| `pages/clientes.md` | wip | ~840 linhas | Logos em `assets/clients/` |

**Significado de status**

| Status | Significado no site Lector |
|--------|----------------------------|
| `live` | Publicável e linkável; polish menor aceitável |
| `wip` | HTML completo e navegável no dropdown; copy comercial, mídia ou placeholders ainda abertos |
| `planned` | Intenção ou âncora; sem pasta em `pages/` ainda |
| `archived` | Só referência |

## Ordem de leitura (agente novo)

1. `../AGENTS.md`
2. `product.md` + `brand.md`
3. `architecture.md` + `sitemap.md`
4. Spec da página que vai editar em `pages/`
5. `components/` se for mexer em nav ou formulário
6. `geo.md` se a tarefa envolver SEO/GEO, FAQ, schema, llms.txt ou conteúdo citável por IAs

## Manutenção

Ao mudar HTML de uma página, **atualize a spec** (seções, CTAs, critérios de aceite).  
Ao mudar nav, atualize `sitemap.md` + `content/site.json` + HTML de **todas** as páginas (header ainda não é shared).  
Ao mudar rotas públicas, atualize também `sitemap.xml` e `vercel.json`.
