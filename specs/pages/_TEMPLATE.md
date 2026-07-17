# Página: \<TÍTULO\>

| Campo | Valor |
|-------|--------|
| **Slug** | `meu-slug` |
| **Status** | `planned` \| `wip` \| `live` |
| **Código** | `pages/meu-slug/index.dc.html` |
| **Rota pública** | `/meu-slug` (ou `/` se home) |
| **Última atualização** | AAAA-MM-DD |
| **Lead form** | `shared/lead-form` (CTAs → modal) \| embutido \| nenhum |
| **Nav** | Item principal / dropdown → … |
| **Variante de header** | `dark` (home) \| `light` (`.lec-nav`) |

---

## Objetivo

Uma frase: o que esta página deve fazer na jornada do visitante.

## Público

Quem chega aqui e com qual intenção.

## Mensagem principal

Headline + subcopy (rascunho aprovável).

## Seções (ordem)

| # | ID | Nome | Conteúdo / notas |
|---|-----|------|------------------|
| 0 | — | Promo + nav | … |
| 1 | `hero` | Hero | … |
| 2 | `…` | … | … |
| 3 | `cta` | CTA final | … |
| 4 | — | Footer | … |

> Ao editar o HTML, mantenha comentários `<!-- SECTION: … -->` alinhados a esta tabela.

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| … | Lead form / `#id` / URL | primary / secondary |

## Conteúdo e dados

- Textos longos: colar aqui ou apontar para `content/…`
- Logos / mídia: paths em `assets/…`
- Formulários: campos e integração (ou placeholder)
- Placeholders comerciais: listar o que ainda precisa validação

## SEO

| Campo | Valor |
|-------|--------|
| Title | … |
| Meta description | … (≤160 chars) |
| OG image | `assets/media/<slug>/…` |

## GEO / cápsula (ver `specs/geo.md`)

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | A pergunta que a página responde para uma IA |
| Cápsula (≤150 chars ou 1º parágrafo extraível) | [o que é] + [para quem] + [resultado] |
| FAQ estático no HTML | sim / não |
| Schema previsto | Organization / SoftwareApplication / FAQPage / … |

## Design

- Tema dominante: claro / dark / misto
- Componentes do DS a reutilizar: …
- Prefixo CSS local da página (se houver): …
- Referências visuais (só em `references/`): …
- **Sem badges de título de seção** — tema no H2 (`specs/brand.md` / `AGENTS.md`)

## Estados e interações

- Mobile nav, modais, empty states, loading, etc.

## Fora de escopo

O que **não** entra nesta página nesta versão.

## Critérios de aceite

- [ ] Spec alinhada com o HTML
- [ ] Paths `../../` corretos (DS, assets, shared)
- [ ] Title + meta description no helmet
- [ ] Lead form no helmet se houver CTAs de conversão
- [ ] Nav sincronizada (item ativo quando aplicável)
- [ ] Copy PT-BR, tom Lector, sem emoji
- [ ] Tokens do DS (sem hex aleatórios)
- [ ] Responsivo mobile
- [ ] Acessível o suficiente (contraste, labels, focus)
- [ ] Sitemap + `site.json` atualizados
