# Página: Blog

| Campo | Valor |
|-------|--------|
| **Slug** | `blog` |
| **Status** | `live` |
| **Código** | `pages/blog/index.dc.html` |
| **Rota pública** | `/blog` |
| **Última atualização** | 2026-07-16 |
| **Lead form** | `shared/lead-form` (CTA nav) |
| **Fonte visual** | `lector-blog/` (kit de referência) |

---

## Objetivo

Publicar conteúdo de educação corporativa, carreira e T&D para atrair e nutrir leads B2B, reforçar autoridade da Lector e direcionar para contato/diagnóstico.

## Público

- Gestores de RH e T&D
- Lideranças e profissionais em desenvolvimento
- Visitantes que chegam por SEO / conteúdo

## Mensagem principal

**Headline:** Ideias para aprender, crescer e fazer acontecer  
**Sub:** Histórias, guias e ideias sobre carreira, design, dados e tecnologia — escritos por quem ensina na Lector.  
**Eyebrow:** Blog da Lector

## Seções (ordem)

| # | ID | Nome | Conteúdo / notas |
|---|-----|------|------------------|
| 0 | — | Promo bar + nav sticky | Nav clara (estilo lector-blog); Blog ativo |
| 1 | `hero` | Masthead | Eyebrow + headline + sub |
| 2 | `featured` | Em alta | Card overlay grande + 3 horizontais |
| 3 | `publicacoes` | Grade + filtros | Tabs: Todos, Carreira, Design, Tecnologia, Dados, Produtividade |
| 4 | `newsletter` | Newsletter CTA | E-mail + inscrição (placeholder) |
| 5 | `artigo` | Leitura (estado) | View de artigo com voltar, capa, corpo, relacionados |
| 6 | — | Footer | Logo light + copyright |

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Fazer diagnóstico gratuito | `../home/index.dc.html#contato` | primary |
| Falar com a Lector | `../home/index.dc.html#contato` | primary (artigo) |
| Inscrever newsletter | `#` (placeholder) | form |

## Conteúdo e dados

- Posts mock em JS (`POSTS`) — 6 artigos de exemplo
- Imagens Unsplash (placeholder até mídia própria)
- Corpo de artigo: texto de demonstração compartilhado

## SEO

| Campo | Valor |
|-------|--------|
| Title | Blog de Educação Corporativa, NR-1 e T&D \| Lector |
| Meta description | Artigos sobre LMS, NR-1, treinamento corporativo, IA e performance de equipes. Conteúdo prático da Lector para RH e T&D no Brasil. |
| OG image | — |

## Design

- Tema dominante: claro (fundo page, nav sticky branca)
- Base visual: `lector-blog/index.html` + tokens do design system
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

## Critérios de aceite

- [x] Spec alinhada com o HTML
- [x] Link Blog na navbar da home leva a esta página
- [x] Paths `../../design-system` e `../../assets` corretos
- [x] Tokens / identidade Lector
- [x] Copy PT-BR, sem emoji
- [x] Responsivo básico (mobile nav)
- [x] Sitemap + site.json atualizados
