# Página: Plataforma Lector

| Campo | Valor |
|-------|--------|
| **Slug** | `plataforma-lector` |
| **Status** | `wip` |
| **Código** | `pages/plataforma-lector/index.dc.html` |
| **Rota pública** | `/plataforma-lector` |
| **Última atualização** | 2026-07-17 (showreel com áudio) |
| **Lead form** | `shared/lead-form` (CTAs → modal) |
| **Nav** | Nossas Soluções → Plataforma Lector (ativo) |
| **Variante de header** | `dark` (mesmo padrão da home: glass navy + marquee) |

---

## Objetivo

Converter visitantes B2B (RH/T&D e liderança) que exploram a oferta principal: apresentar a Lector como sistema operacional de conhecimento (LMS + webconferência + IA nativa), com prova de ecossistema e captura de lead (diagnóstico / demo).

## Público

- Gestores de T&D e RH corporativo  
- Liderança de Gente & Gestão  
- Decisores que comparam LMS e consolidação de ferramentas  

## Mensagem principal

**Headline:** Uma plataforma. Todas as ferramentas. *IA nativa.*  
**Sub:** LMS, webconferência própria e IA nativa — performance medível e compliance auditável em um só ambiente.

## Design (alinhado à home)

A página segue a **mesma família visual da home**, não o shell light das demais soluções:

| Elemento | Implementação |
|----------|----------------|
| Announce | Marquee laranja dismissível (`lk-announce`) |
| Header | Pill dark glass fixo + dropdown `.lk-nav-dd` |
| Hero | Full viewport + mandala + tipografia mega + CTA sheen |
| Títulos de seção | **Sem badge/eyebrow** — tema no H2 (`specs/brand.md`) |
| Logos | Marquee de clientes (grayscale → color no hover) |
| Statement | Bloco tipográfico navy (como `#plataforma` na home) |
| Spotlights | `.lk-spotlight` / flip (universidade, rede social, onboarding) |
| Módulos | Bento dark com earth + orbit (`.lk-modules`) |
| Stats | Cards premium brancos (`.lk-stats`) |
| CTA final | Faixa laranja full-bleed (como `#contato` na home) |
| Footer | Ink-950 4 colunas |
| Motion | `data-reveal`, stats `is-visible`, marquee, CTA glow |

## Seções (ordem)

| # | ID | Nome | Notas |
|---|-----|------|--------|
| 0 | — | Announce + nav dark | Item Plataforma ativo no dropdown |
| 1 | `hero` | Hero cinemático | CTAs diagnóstico + ver plataforma |
| 2 | — | Logos clientes | Marquee |
| 3 | `por-que` | Statement | “Inteligência que conecta tudo” |
| 4 | — | Diferenciais | H2 “Por que a Lector…”; 6 cards |
| 5 | `showreel` | Vídeo produto | `hero.mp4` com áudio + capa + **globo de rede** (canvas, meia esfera full-bleed atrás do player) |
| 6 | `por-dentro` | Universidade full-width | H2 com “Universidade corporativa…”; janela full-width |
| 7 | `ecossistema` | Módulos bento | H2 “Uma plataforma…”; sem eyebrow |
| 8 | `rede-social` | Spotlight flip | Tema no H2 |
| 9 | `onboarding` | Spotlight | Tema no H2; mídia `assets/media/plataforma-lector/onboarding.png` |
| 10 | `universidade` | Dark chain 01–10 | H2 “Sistema operacional do conhecimento…” |
| 11 | `lideranca` | Liderança & talentos | H2 “Liderança e talentos…” |
| 12 | `numeros` | Stats | H2 “Resultados reais…” |
| 13 | `faq` | FAQ | Accordion enxuto |
| 14 | `cta` | CTA laranja | Lead form modal |
| 15 | — | Footer | |

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Fazer diagnóstico gratuito | Lead form (`diagnostico`) | primary hero / final |
| Agendar demonstração | Lead form (`demonstracao`) | spotlights |
| Falar com especialista | `#cta` / lead form | nav |

## Conteúdo e dados

- Vídeo hero (mandala muted): `assets/media/plataforma-lector/mandala-girando.mp4`  
- Showreel com áudio (após diferenciais): `assets/media/home/hero.mp4` — play sob clique, controls nativos, **não** muted  
- Capa do showreel: `assets/media/plataforma-lector/hero-poster.jpg` (poster do vídeo)  
- LMS spotlight: `assets/media/home/lms.png`  
- Logos: `assets/clients/`  
- Mídia dedicada: `assets/media/plataforma-lector/` (onboarding.png etc.)  
- Preços e depoimentos placeholders: **removidos** desta versão visual (FAQ cobre investimento genérico)  

## SEO

| Campo | Valor |
|-------|--------|
| Title | Plataforma Lector — LMS, IA e universidade corporativa |
| Meta description | LMS, webconferência e IA nativa em um só ambiente. Transforme treinamento em performance medível e compliance NR-1 auditável. |

## Fora de escopo

- Integração real de form / CRM  
- Números comerciais finais além dos já exibidos  
- Depoimentos assinados  
- Detalhe técnico LGPD completo (pode voltar em seção dedicada depois)  


## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | O que é a plataforma unificada Lector? |
| Cápsula (sub do hero, sem bloco “Em uma frase”) | A Lector é a plataforma brasileira de educação corporativa com IA nativa: LMS, webconferência, autoria e compliance NR-1 para provar resultado de treinamento — não só engajamento. |
| Schema | Organization + SoftwareApplication |

## Critérios de aceite

- [x] Visual alinhado à home (dark header, hero, spotlights, modules, CTA laranja)  
- [x] SEO no helmet  
- [x] Lead form nos CTAs  
- [x] Paths `../../` corretos  
- [x] Copy PT-BR, tom Lector  
- [x] Assets em `assets/media/plataforma-lector/` (`mandala-girando.mp4`, `hero-poster.jpg`, `onboarding.png`)  
- [ ] Mobile drawer (hoje nav desktop some em &lt;960px como na home)  
