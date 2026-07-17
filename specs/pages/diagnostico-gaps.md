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

Converter gestores de T&D e liderança que querem tornar o conhecimento **visível**, fechar gaps com precisão e provar resultado (não engajamento): diagnóstico contextualizado ao negócio, jornada personalizada e ROI.

## Público

- RH / T&D e compliance  
- Diretoria que cobra impacto em receita/custo  
- Empresas sob pressão de NR-1 e evidência de treinamento  

## Mensagem principal

**Headline:** Antes de ensinar, nós *entendemos* sua empresa.  
**Sub:** Diagnóstico de Gaps de Conhecimento contextualizado: a IA analisa processos, cargos, documentos, normas e objetivos estratégicos; identifica gaps colaborador por colaborador; entrega jornada personalizada e prova de impacto.  
**Punch do problema:** O problema nunca foi falta de treinamento — foi não saber onde o conhecimento está faltando.  
**Punch da jornada:** O verdadeiro resultado não é um certificado — é a empresa evoluindo competência por competência.

## Design (alinhado à home / plataforma / NR-1)

A página segue a **mesma família visual da home**, não o shell light de blog/contato:

| Elemento | Implementação |
|----------|----------------|
| Announce | Marquee laranja dismissível (`lk-announce`) |
| Header | Pill dark glass fixo + dropdown `.lk-nav-dd` |
| Hero | Full viewport + `mandala-girando.mp4` + CTA sheen + secondary “Como funciona” |
| Logos | Marquee de clientes |
| Statement | Conhecimento invisível + punch |
| Problema | 4 cards de sintomas (erros, produtividade, oportunidades, percepção tardia) |
| Pilares | 4 cards paper (contextual / gaps / jornada / resultado) |
| Passos | Seção dark 01–04 com orbit |
| Jornada | Split copy + lista colaborador / time / negócio |
| Painel | Mock dark do Painel de Competências |
| Por que agora | Stats + CTA NR-1 |
| FAQ | Accordion + schema FAQPage (6 perguntas) |
| CTA final | Faixa laranja full-bleed |
| Footer | Ink-950 4 colunas |
| Motion | `data-reveal`, marquee, CTA glow/sheen |

### Títulos — sem badge de seção

**Regra do site:** não usar badge/eyebrow/kicker acima do H2. O tema entra no título.

| Seção | Título (H2 / H1) |
|-------|------------------|
| Hero | Antes de ensinar, nós *entendemos* sua empresa. |
| Statement | O maior ativo da sua empresa é *invisível*. Até agora. |
| Benefícios | Diagnóstico contextualizado: compreenda o negócio *antes* de desenvolver pessoas. |
| Método | Como funciona: da compreensão do negócio à certificação, competência por competência. |
| Jornada | Quando cada pessoa aprende exatamente o que precisa, *toda a empresa evolui.* |
| Painel | Painel de Competências: o conhecimento da empresa, visível em tempo real. |
| Por que agora | Por que agora: performance e conformidade cobram o *mesmo mapa*. |
| FAQ | Ainda com dúvidas sobre o Diagnóstico de Gaps de Conhecimento? |
| CTA | Torne o conhecimento da sua empresa visível. |

Chips de status no mock (Ativo / Em curso / Pendente) são UI de produto, não badges de seção.

## Seções (ordem)

| # | ID | Nome |
|---|-----|------|
| 0 | — | Announce + nav dark (item Gaps ativo) |
| 1 | `hero` | Hero cinemático (CTA demo + âncora método) |
| 2 | — | Logos clientes (marquee) |
| 3 | `statement` | Conhecimento invisível + punch |
| 4 | `problema` | 4 sintomas do gap invisível |
| 5 | `beneficios` | 4 pilares paper |
| 6 | `metodo` | Passos dark 01–04 |
| 7 | `jornada` | Jornada personalizada pós-diagnóstico |
| 8 | `painel` | Mock Painel de Competências |
| 9 | `por-que-agora` | Stats + CTA NR-1 |
| 10 | `faq` | FAQ accordion |
| 11 | `cta` | CTA laranja |
| 12 | — | Footer |

## CTAs

| Label | Destino |
|-------|---------|
| Agendar demonstração | Lead form (`diagnostico`) |
| Como funciona | `#metodo` |
| Ver no meu contexto | Lead form (`diagnostico`) |
| Acessar painel completo | `https://lector.live` |
| Quero adequar minha empresa à NR-1 | Lead form (`nr1`) |
| Falar com especialista (nav / announce) | Lead form (`diagnostico`) |

## SEO

| Campo | Valor |
|-------|--------|
| Title | Diagnóstico de Gaps de Conhecimento \| Lector |
| Meta description | Antes de ensinar, a Lector entende sua empresa. Diagnóstico de Gaps contextualizado com IA: processos, cargos e competências — jornada personalizada e prova de resultado, não engajamento de fachada. |

**Implementação:** title, meta e Open Graph presentes.

## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | Como a Lector diagnostica gaps de conhecimento e prova resultado? |
| Cápsula no hero | Removida (hero limpo: headline + sub + CTAs) |
| Schema | Organization + SoftwareApplication + FAQPage (6 Qs) |
| Conteúdo crítico estático | FAQ + statement + método + jornada + benefícios |

## Critérios de aceite

- [x] Spec + página + nav  
- [x] Paths `../../` e lead form  
- [x] Família visual dark (home / plataforma / NR-1)  
- [x] Copy PT-BR sem badges de título de seção  
- [x] SEO + GEO no helmet  
- [x] Narrativa alinhada à trilogia da home (invisível → diagnóstico → jornada)  
- [ ] Assets finais do painel (mock HTML por enquanto)  
