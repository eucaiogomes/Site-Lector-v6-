# Página: Criação de Conteúdo sob Demanda

| Campo | Valor |
|-------|--------|
| **Slug** | `conteudo-sob-demanda` |
| **Status** | `wip` |
| **Código** | `pages/conteudo-sob-demanda/index.dc.html` |
| **Rota pública** | `/conteudo-sob-demanda` |
| **Última atualização** | 2026-07-16 |
| **Lead form** | `shared/lead-form` (CTAs → modal) |
| **Nav** | Nossas Soluções → Criação de Conteúdo sob Demanda |

---

## Objetivo

Converter gestores de T&D e marketing interno que precisam de cursos, vídeos e materiais com qualidade e prazo — sem montar estúdio nem equipe de autoria completa.

## Público

- Gestores de T&D e RH corporativo
- Lideranças que precisam de conteúdo sob demanda (onboarding, produto, compliance, vendas)
- Times que já usam ou avaliam a plataforma Lector

## Mensagem principal

**Headline:** Conteúdo sob demanda. Do briefing à publicação, sem fila infinita.  
**Sub:** Cursos, vídeos e materiais com qualidade editorial, prazo previsível e entrega pronta para a plataforma Lector.  
**Descrição (nav):** Cursos, vídeos e materiais sob demanda — com qualidade editorial, prazo previsível e publicação na plataforma Lector.

## Seções (ordem)

| # | ID | Nome | Notas |
|---|-----|------|--------|
| 0 | — | Promo + nav | Padrão claro; item Conteúdo sob Demanda ativo |
| 1 | `hero` | Hero | Headline, CTAs, mock de produção |
| 2 | `para-quem` | Para quem | 3 cards de cenários |
| 3 | `entrega` | O que entregamos | Tipos de conteúdo + escopo |
| 4 | `como-funciona` | Como funciona | Briefing → produção → publicação |
| 5 | `cta` | CTA final | Form + contato |
| 6 | — | Footer | Logo light |

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Solicitar orçamento | `#cta` | primary |
| Ver como funciona | `#como-funciona` | secondary |
| Falar com especialista | `#cta` | primary form |

## Conteúdo e dados

- Copy na própria página (wip; refinável com comercial)
- Mídia futura: `assets/media/conteudo-sob-demanda/`

## SEO

| Campo | Valor |
|-------|--------|
| Title | Criação de Conteúdo sob Demanda \| Lector |
| Meta description | Cursos, vídeos e materiais sob demanda com qualidade editorial, prazo previsível e publicação na plataforma Lector. |

## Design

- Tema: claro + hero dark navy
- Tokens DS; Lucide (`clapperboard`); sem emoji
- Nav light sticky (padrão blog/soluções)

## Fora de escopo

- Portfólio de cases em vídeo
- Calculadora de preço
- Integração de briefing real com backend

## Critérios de aceite

- [x] Spec da página existe
- [x] Link na navbar (Nossas Soluções) em home, blog e páginas de solução
- [x] Paths `../../` corretos
- [x] Sitemap + `site.json` atualizados
- [ ] Copy final validada com comercial
- [ ] Responsivo mobile
