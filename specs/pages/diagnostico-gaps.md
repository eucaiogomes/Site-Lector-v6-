# Página: Diagnóstico de Gaps

| Campo | Valor |
|-------|--------|
| **Slug** | `diagnostico-gaps` |
| **Status** | `wip` |
| **Código** | `pages/diagnostico-gaps/index.dc.html` |
| **Rota pública** | `/diagnostico-gaps` |
| **Última atualização** | 2026-07-17 |
| **Nav** | Nossas Soluções → Diagnóstico de Gaps (ativo) |
| **Lead form** | `shared/lead-form` (interest `diagnostico`) |
| **Variante de header** | `dark` (mesmo padrão home / plataforma-lector / solucao-nr-1) |

---

## Objetivo

Converter gestores de T&D e liderança que querem provar resultado (não engajamento): mostrar diagnóstico por habilidade, trilha cirúrgica, certificação e ROI.

## Público

- RH / T&D e compliance  
- Diretoria que cobra impacto em receita/custo  
- Empresas sob pressão de NR-1 e evidência de treinamento  

## Mensagem principal

**Headline:** Pare de provar engajamento. Comece a provar *resultado*.  
**Sub:** Gap real por habilidade, conhecimento cirúrgico alinhado ao plano estratégico e certificação mensurável — sem hora de curso e sem engajamento de fachada.  

## Design (alinhado à home / plataforma / NR-1)

A página segue a **mesma família visual da home**, não o shell light de blog/contato:

| Elemento | Implementação |
|----------|----------------|
| Announce | Marquee laranja dismissível (`lk-announce`) |
| Header | Pill dark glass fixo + dropdown `.lk-nav-dd` |
| Hero | Full viewport + `mandala-girando.mp4` + CTA sheen |
| Logos | Marquee de clientes (grayscale → color no hover) |
| Statement | Bloco tipográfico navy (“Engajamento… não é resultado”) |
| Pilares | Cards paper (resultado / cirúrgico / gaps) |
| Passos | Seção dark 01–04 com orbit |
| Painel | Mock dark do Painel de Competências |
| Por que agora | Stats cards + CTA NR-1 |
| FAQ | Accordion + schema FAQPage |
| CTA final | Faixa laranja full-bleed |
| Footer | Ink-950 4 colunas |
| Motion | `data-reveal`, marquee, CTA glow/sheen |

### Títulos — sem badge de seção

**Regra do site:** não usar badge/eyebrow/kicker acima do H2. O tema entra no título.

| Seção | Título (H2) |
|-------|-------------|
| Benefícios | Muito mais que um LMS: prove *resultado*, não cliques. |
| Método | Como funciona: do diagnóstico à certificação, habilidade por habilidade. |
| Painel | Painel de Competências em tempo real |
| Por que agora | Por que agora: a lei também está cobrando *agora*. |
| FAQ | Ainda com dúvidas sobre diagnóstico de gaps? |

Chips de status no mock (Ativo / Em curso / Pendente) são UI de produto, não badges de seção.

## Seções (ordem)

| # | ID | Nome |
|---|-----|------|
| 0 | — | Announce + nav dark (item Gaps ativo) |
| 1 | `hero` | Hero cinemático (CTA único: Agendar demonstração) |
| 2 | — | Logos clientes (marquee) |
| 3 | `statement` | Statement tipográfico |
| 4 | `beneficios` | 3 pilares paper |
| 5 | `metodo` | Passos dark 01–04 |
| 6 | `painel` | Mock Painel de Competências |
| 7 | `por-que-agora` | Stats + CTA NR-1 |
| 8 | `faq` | FAQ accordion |
| 9 | `cta` | CTA laranja |
| 10 | — | Footer |

## CTAs

| Label | Destino |
|-------|---------|
| Agendar demonstração | Lead form (`diagnostico`) |
| Acessar painel completo | `https://app.lector.com.br/painel` |
| Quero adequar minha empresa à NR-1 | Lead form (`nr1`) |
| Falar com especialista (nav / announce) | Lead form (`diagnostico`) |

## SEO

| Campo | Valor |
|-------|--------|
| Title | Diagnóstico de Gaps por Habilidade \| Lector |
| Meta description | Diagnóstico por habilidade, trilha cirúrgica e certificação com prova de resultado — ROI e evidência, não engajamento de fachada. |

**Implementação:** title, meta e Open Graph presentes.

## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | Como provar resultado com diagnóstico por habilidade? |
| Cápsula no hero | Removida (hero limpo: headline + sub + CTA) |
| Schema | Organization + SoftwareApplication + FAQPage |
| Conteúdo crítico estático | FAQ accordion + copy de seções (método, painel, benefícios) |

## Critérios de aceite

- [x] Spec + página + nav  
- [x] Paths `../../` e lead form  
- [x] Família visual dark (home / plataforma / NR-1)  
- [x] Copy PT-BR sem badges de título de seção  
- [x] SEO + GEO no helmet  
- [ ] Assets finais do painel (mock HTML por enquanto)  
