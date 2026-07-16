# Página: Copiloto de Vendas

| Campo | Valor |
|-------|--------|
| **Slug** | `copiloto-vendas` |
| **Status** | `wip` |
| **Código** | `pages/copiloto-vendas/index.dc.html` |
| **Rota pública** | `/copiloto-vendas` |
| **Última atualização** | 2026-07-16 |
| **Lead form** | `shared/lead-form` (CTAs → modal) |
| **Nav** | Nossas Soluções → Copiloto de Vendas |
| **Fonte visual** | `treinar-equipe-de-vendas.html` (referência na raiz) |

---

## Objetivo

Converter líderes comerciais e de T&D que precisam treinar o time de vendas: apresentar o Copiloto de Vendas da Lector (IA antes, durante e depois da reunião), com jornada, recursos, gestão e CTA de demonstração.

## Público

- Heads e gerentes de vendas
- Gestores de enablement / T&D comercial
- Diretores que buscam reduzir ramp-up e elevar win rate

## Mensagem principal

**Headline:** A IA que prepara, acompanha e evolui cada vendedor do seu time.  
**Sub:** Diagnóstico de técnica comercial com IA, trilhas e certificação; copiloto na webconferência Lector, com alertas ao vivo.

## Seções (ordem)

| # | ID | Nome | Notas |
|---|-----|------|--------|
| 0 | — | Promo + nav | Padrão claro; item Copiloto ativo |
| 1 | `hero` | Hero dark | Headline, CTAs, stats 3x / -42% / 24/7, mídia |
| 2 | `jornada` | Jornada | Briefing → ao vivo → feedback |
| 3 | `recursos` | Recursos | 6 cards dark |
| 4 | `gestao` | Gestão | Dashboard + bullets |
| 5 | `cta` | CTA final | Demo + consultor |
| 6 | — | Footer | Logo light |

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Ver o copiloto em ação | `#cta` | primary |
| Como funciona | `#jornada` | secondary |
| Agendar demonstração | `#cta` / home contato | primary |

## Conteúdo e dados

- Copy e estrutura: `treinar-equipe-de-vendas.html`
- Mídia: `assets/media/copiloto-vendas/` (placeholders até assets finais)

## SEO

| Campo | Valor |
|-------|--------|
| Title | Treinamento de Vendas com IA \| Copiloto Lector |
| Meta description | Diagnóstico de técnica comercial com IA, trilhas e certificação para reduzir ramp-up e elevar a performance do time de vendas. |

## Design

- Hero e recursos: **dark navy**
- Jornada e gestão: paper / claro
- Tokens DS; Lucide; sem emoji
- Sem labels `§0X` nas seções

## Fora de escopo

- Integração CRM real
- Player de demo embutido
- Pricing desta página

## Critérios de aceite

- [ ] Spec alinhada com HTML
- [ ] Nav (home, blog, plataforma) aponta para esta página
- [ ] Paths `../../` corretos
- [ ] Tokens + PT-BR
- [ ] Sitemap + site.json
