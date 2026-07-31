# Página: Blog

| Campo | Valor |
|-------|--------|
| **Slug** | `blog` |
| **Status** | `live` |
| **Código** | `pages/blog/index.dc.html` (~940 linhas) |
| **Rota pública** | `/blog` |
| **Última atualização** | 2026-07-31 |
| **Lead form** | `shared/lead-form` (CTA nav) |
| **Nav** | Item principal “Blog” ativo |
| **Variante de header** | `light` (`.lec-nav`) |
| **Fonte visual** | `references/prototypes/lector-blog/` (não linkar em produção) |

---

## Objetivo

Publicar conteúdo de educação corporativa, carreira e T&D para atrair e nutrir leads B2B, reforçar autoridade da Lector e direcionar para contato/diagnóstico.

## Público

- Gestores de RH e T&D  
- Lideranças e profissionais em desenvolvimento  
- Visitantes que chegam por SEO / conteúdo  

## Mensagem principal

**Headline:** Blog da Lector: inteligência, estratégia e inovação em Educação Corporativa  
**Sub:** Insights práticos sobre LMS com IA, NR-1, enablement de vendas, diagnósticos de habilidades e ROI de T&D para lideranças.  
**Nota:** sem eyebrow/badge acima do H1.  

## Seções (ordem)

| # | ID | Nome | Conteúdo / notas |
|---|-----|------|------------------|
| 0 | — | Promo bar + nav sticky | Nav clara; Blog ativo |
| 1 | `hero` | Masthead | Eyebrow + headline + sub |
| 2 | `featured` | Em alta | Card overlay grande + 3 horizontais |
| 3 | `publicacoes` | Grade + filtros | Tabs: Todos, T&D e Onboarding, Gestão do Conhecimento, Comunicação Corporativa |
| 4 | `newsletter` | Newsletter CTA | E-mail + inscrição (placeholder) |
| 5 | `artigo` | Leitura (estado) | View de artigo com voltar, capa, corpo próprio por post (`blocks`), relacionados |
| 6 | — | Footer | Logo light + copyright |

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Falar com especialista | Lead form modal | primary nav |
| Fazer diagnóstico gratuito | Lead form / home `#contato` | primary |
| Inscrever newsletter | `#` (placeholder) | form |

## Conteúdo e dados

- 4 posts em JS (`_posts()`): 1 institucional de T&D + 3 artigos migrados do site antigo (gestão do conhecimento, treinamento online/onboarding, comunicação corporativa)
- Cada post tem `blocks`: `P` (parágrafo), `H` (h2), `Q` (citação), `UL` (lista), `CTA` (parágrafo + link). O template renderiza por tipo com `sc-if`
- Imagens Unsplash (placeholder até mídia própria)
- Autoria: "Equipe Lector" nos posts migrados; datas de publicação são provisórias

## SEO

| Campo | Valor |
|-------|--------|
| Title | Blog de Educação Corporativa, NR-1 e T&D \| Lector |
| Meta description | Artigos sobre LMS, NR-1, treinamento corporativo, IA e performance de equipes. Conteúdo prático da Lector para RH e T&D no Brasil. |
| OG image | — |

**Implementação:** title e meta description presentes no helmet.

## Design

- Tema dominante: claro (fundo page, nav sticky branca)  
- Base visual: protótipo lector-blog + tokens do design system  
- Sem emoji; ícones Lucide quando necessário  

## Estados e interações

- Filtro por categoria (client-side)  
- Abrir artigo / voltar à home do blog  
- Dropdown Nossas Soluções + menu mobile  
- Nav com sombra ao scroll  

## Fora de escopo

- CMS / posts reais em Markdown  
- Comentários, likes, compartilhamento real  
- Autenticação / área logada  
- SEO por artigo individual (rotas dinâmicas)  


## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Cápsula “Em uma frase” | Removida do hero |
| Schema | Organization (Article por post quando CMS real) |

## Critérios de aceite

- [x] Spec alinhada com o HTML  
- [x] Link Blog na navbar da home leva a esta página  
- [x] Paths `../../design-system` e `../../assets` corretos  
- [x] Tokens / identidade Lector  
- [x] Copy PT-BR, sem emoji  
- [x] Title + meta description  
- [x] Responsivo básico (mobile nav)  
- [x] Sitemap + site.json atualizados  
- [ ] CMS / conteúdo real  
