# Página: Criação de Conteúdo sob Demanda

| Campo | Valor |
|-------|--------|
| **Slug** | `conteudo-sob-demanda` |
| **Status** | `wip` |
| **Código** | `pages/conteudo-sob-demanda/index.dc.html` |
| **Rota pública** | `/conteudo-sob-demanda` |
| **Última atualização** | 2026-07-17 |
| **Lead form** | `shared/lead-form` (interest `conteudo`) |
| **Nav** | Nossas Soluções → Criação de Conteúdo sob Demanda (ativo) |
| **Variante de header** | `dark` (home / plataforma / NR-1) |

---

## Objetivo

Converter gestores de T&D e RH que precisam de conteúdo de treinamento sem equipe de produção: pedido → fila real → IA + especialistas → revisão humana → publicação na Universidade Corporativa com identidade da marca.

## Público

- Gestores de T&D e RH corporativo  
- Times sem estúdio / autoria interna  
- Empresas que já usam ou avaliam a plataforma Lector  

## Mensagem principal

**Headline:** Sua empresa pede o treinamento. A Lector *produz*.  
**Sub:** Onboarding, compliance, trilha comercial, comunicado de mudança — roteiro, avatar com uniforme da empresa, identidade visual e publicação na Universidade Corporativa.  

## Design

| Elemento | Implementação |
|----------|----------------|
| Announce | Marquee laranja |
| Header | Pill dark glass + `.lk-nav-dd` |
| Hero | Split: copy + mock `fila_producao.lector` ao vivo |
| Logos | Marquee clientes |
| Realidade | Statement + 6 dores |
| Como funciona | Dark 01–04 + pipeline chips |
| Catálogo | 6 cards paper |
| Variedade | Chips de tipos |
| Porta-voz | Avatar / identidade da marca |
| Incluso | Checklist |
| FAQ | Accordion + FAQPage |
| CTA final | Faixa laranja |
| Footer | Ink-950 |

**Sem badges de seção / sem emoji** — ícones Lucide.

## Seções (ordem)

| # | ID | Nome |
|---|-----|------|
| 0 | — | Announce + nav dark |
| 1 | `hero` | Hero + fila de produção; vídeo loop `assets/media/conteudo-sob-demanda/criacao-de-conteudo.mp4` |
| 2 | — | Logos |
| 3 | `realidade` | A realidade de hoje + dores |
| 4 | `como-funciona` | Você pede · a gente entrega |
| 5 | `exemplos` | Galeria de conteúdos criados (4 vídeos lado a lado) |
| 6 | `catalogo` | O que dá pra pedir |
| 7 | `variedade` | Variedade, não modelo único |
| 8 | `porta-voz` | Avatar com uniforme da empresa |
| 9 | `incluso` | O que está incluso |
| 10 | `faq` | Perguntas frequentes |
| 11 | `cta` | CTA laranja |
| 12 | — | Footer |

### Galeria (`#exemplos`)

Layout full-bleed: grade de 4 colunas ocupa a largura da janela (2 no tablet, 1 no mobile). Cada item: vídeo + capa + overlay de play. Ao terminar um vídeo, o próximo da fila inicia automaticamente.

| Item | Vídeo | Capa |
|------|--------|------|
| 1 · Demonstração 1 | `assets/media/conteudo-sob-demanda/video-demonstracao-1.mp4` | `video-demonstracao-1-poster.jpg` |
| 2 · Demonstração 2 | `assets/media/conteudo-sob-demanda/video-demonstracao-2.mp4` | `video-demonstracao-2-poster.jpg` |
| 3 · Demonstração 3 | `assets/media/conteudo-sob-demanda/video-demonstracao-3.mp4` | `video-demonstracao-3-poster.jpg` |
| 4 · Demonstração 4 | `assets/media/conteudo-sob-demanda/video-demonstracao-4.mp4` | `video-demonstracao-4-poster.jpg` |

## CTAs

| Label | Destino |
|-------|---------|
| Solicitar um conteúdo | Lead form (`conteudo`) |
| Falar com especialista (nav) | Lead form (`conteudo`) |

## SEO

| Campo | Valor |
|-------|--------|
| Title | Criação de Conteúdo sob Demanda \| Lector |
| Meta description | Sua empresa pede o treinamento. A Lector produz: onboarding, compliance, trilha comercial e comunicados — com avatar, identidade da marca e publicação na Universidade Corporativa. |

## GEO

| Campo | Valor |
|-------|--------|
| Cápsula hero | Não (hero limpo + FAQ estático) |
| Schema | Organization + SoftwareApplication + FAQPage |

## Critérios de aceite

- [x] Spec + página alinhadas ao copy comercial  
- [x] Família dark (home / plataforma / NR-1)  
- [x] Paths `../../` e lead form  
- [x] Sem badges de seção / sem emoji  
- [x] FAQ + schema  
- [ ] Assets finais de avatar/porta-voz  
