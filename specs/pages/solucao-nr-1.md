# Página: Solução NR-1

| Campo | Valor |
|-------|--------|
| **Slug** | `solucao-nr-1` |
| **Status** | `wip` |
| **Código** | `pages/solucao-nr-1/index.dc.html` |
| **Rota pública** | `/solucao-nr-1` |
| **Última atualização** | 2026-07-17 |
| **Lead form** | `shared/lead-form` (interest `nr1`) |
| **Nav** | Nossas Soluções → Solução NR-1 (ativo) |
| **Variante de header** | `dark` (mesmo padrão home / plataforma-lector) |

---

## Objetivo

Converter gestores de SST, RH e compliance que precisam atender à NR-1 (riscos psicossociais): diagnosticar, treinar e gerar evidências auditáveis na mesma plataforma Lector.

## Público

- Gestores de SST / SESMT  
- RH e compliance corporativo  
- Liderança exposta a fiscalização e auditoria  

## Mensagem principal

**Headline:** A NR-1 exige gestão de riscos psicossociais. A Lector entrega o *processo inteiro*.  
**Sub:** Diagnóstico, trilhas obrigatórias e evidências de conformidade em uma única plataforma.

## Design (alinhado à home / plataforma)

| Elemento | Implementação |
|----------|----------------|
| Announce | Marquee laranja (fiscalização NR-1) |
| Header | Pill dark glass + dropdown `.lk-nav-dd` |
| Hero | Full viewport + `mandala-girando.mp4` + CTA sheen |
| Logos | Marquee de clientes |
| Statement | Tipografia navy “Boa vontade não é processo documentado” |
| Pilares | Cards paper (diagnóstico, trilhas, evidências) |
| Passos | Seção dark 01–03 |
| Status | Painel mock de conformidade |
| FAQ | Accordion |
| CTA final | Faixa laranja + lead form |
| Footer | Ink-950 |

### Títulos — sem badge de seção

**Regra do site:** não usar badge/eyebrow/kicker acima do H2. O tema entra no título.

| Seção | Título (H2) |
|-------|-------------|
| Solução | Ciclo completo de conformidade NR-1 na mesma plataforma onde você treina. |
| Como funciona | Como funciona: do diagnóstico à evidência, em três passos. |
| Status | Visibilidade e conformidade que o time e o auditor entendem. |

Chips **Completo / Pronto / 892** no mock de status são UI de produto, não badges de seção.

## Seções (ordem)

| # | ID | Nome |
|---|-----|------|
| 0 | — | Announce + nav dark |
| 1 | `hero` | Hero cinemático |
| 2 | — | Logos clientes |
| 3 | `problema` | Statement |
| 4 | `solucao` | 3 pilares |
| 5 | `como-funciona` | Passos dark 01–03 |
| 6 | `status` | Mock conformidade |
| 7 | `faq` | FAQ |
| 8 | `cta` | CTA laranja |
| 9 | — | Footer |

## CTAs

| Label | Destino |
|-------|---------|
| Falar com especialista em NR-1 | Lead form (`nr1`) |
| Agendar diagnóstico de risco psicossocial | Lead form (`nr1`) |
| Falar com especialista (nav) | `#cta` / lead form |

## SEO

| Campo | Valor |
|-------|--------|
| Title | Solução NR-1 — Riscos psicossociais e evidências \| Lector |
| Meta description | Diagnóstico, trilhas obrigatórias e evidências de conformidade NR-1 em uma única plataforma. |


## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | Como a Lector atende a NR-1 / riscos psicossociais? |
| Cápsula no hero | Removida (hero limpo: headline + sub + CTA) |
| Schema | Organization + SoftwareApplication + FAQPage (espelha FAQ da página) |
| FAQ estático | sim (`<details>`) |

## Critérios de aceite

- [x] Visual alinhado à home / plataforma-lector  
- [x] SEO no helmet  
- [x] Lead form nos CTAs (`nr1`)  
- [x] Paths `../../` corretos  
- [x] Copy PT-BR  
- [ ] Mídia exclusiva em `assets/media/solucao-nr-1/` se necessário  
- [ ] Copy jurídico/compliance revisado se necessário  
