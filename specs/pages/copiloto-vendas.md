# Página: Copiloto de Vendas

| Campo | Valor |
|-------|--------|
| **Slug** | `copiloto-vendas` |
| **Status** | `wip` |
| **Código** | `pages/copiloto-vendas/index.dc.html` (~870 linhas) |
| **Rota pública** | `/copiloto-vendas` |
| **Última atualização** | 2026-07-17 |
| **Lead form** | `shared/lead-form` (CTAs → modal) |
| **Nav** | Nossas Soluções → Copiloto de Vendas (ativo) |
| **Variante de header** | `light` |
| **Referência** | `references/raw/raiz-2026-07/treinar-equipe-de-vendas.html` (não linkar) |

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
| 0 | — | Promo + nav | Item Copiloto ativo |
| 1 | `hero` | Hero dark | Headline, CTAs, stats, mídia mock |
| 2 | `jornada` | Jornada | Briefing → ao vivo → feedback |
| 3 | `recursos` | Recursos | Cards dark |
| 4 | `gestao` | Gestão | Dashboard + bullets |
| 5 | `cta` | CTA final | Demo + consultor |
| 6 | — | Footer | Logo light |

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Ver o copiloto em ação | `#cta` | primary |
| Como funciona | `#jornada` | secondary |
| Agendar demonstração | `#cta` / lead form | primary |
| Falar com especialista | Lead form | nav |

## Conteúdo e dados

- Mídia em `assets/media/copiloto-vendas/`:
  - `hero.jpg` — hero
  - `antes-reuniao.jpg` — jornada (antes)
  - `durante-reuniao.png` — jornada (durante)
  - `depois-reuniao.jpg` — jornada (depois)
  - `gestao.jpg` — seção gestão
- Interest lead form: `vendas`

## SEO

| Campo | Valor |
|-------|--------|
| Title | Treinamento de Vendas com IA \| Copiloto Lector |
| Meta description | Diagnóstico de técnica comercial com IA, trilhas e certificação para reduzir ramp-up e elevar a performance do time de vendas. |

**Implementação:** title e meta presentes.

## Design

- Hero e recursos: **dark navy**  
- Jornada e gestão: paper / claro  
- Prefixo CSS: `cv-*`  
- Tokens DS; Lucide; sem emoji  

## Fora de escopo

- Integração CRM real  
- Player de demo embutido  
- Pricing desta página  


## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | Como a Lector treina equipes comerciais com IA? |
| Cápsula | O Copiloto de Vendas da Lector é a IA que prepara, acompanha e evolui cada vendedor — antes, durante e depois da reunião — com trilhas e certificação para reduzir ramp-up. |
| Schema | Organization + SoftwareApplication |

## Critérios de aceite

- [x] Spec alinhada com HTML (seções)  
- [x] Nav aponta para esta página (dropdown + mobile)  
- [x] Paths `../../` corretos  
- [x] Tokens + PT-BR + SEO  
- [x] Assets de mídia em `assets/media/copiloto-vendas/`  
- [ ] Copy/stats finais validados com comercial  
