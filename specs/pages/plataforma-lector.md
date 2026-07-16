# Página: Plataforma Lector

| Campo | Valor |
|-------|--------|
| **Slug** | `plataforma-lector` |
| **Status** | `wip` |
| **Código** | `pages/plataforma-lector/index.dc.html` |
| **Rota pública** | `/plataforma-lector` |
| **Última atualização** | 2026-07-16 |
| **Lead form** | `shared/lead-form` (CTAs → modal) |
| **Nav** | Nossas Soluções → Plataforma Lector |

---

## Objetivo

Converter visitantes B2B (RH/T&D e liderança) que exploram a oferta principal: apresentar a Lector como sistema operacional de conhecimento (LMS + webconferência + IA nativa), com prova de ecossistema, cases, segurança e captura de lead (diagnóstico / demo).

## Público

- Gestores de T&D e RH corporativo
- Liderança de Gente & Gestão
- Decisores que comparam LMS e consolidação de ferramentas

## Mensagem principal

**Eyebrow:** Lector · Enterprise Knowledge Operating System  
**Headline:** Pare de provar engajamento. Comece a provar resultado.  
**Sub:** Plataforma brasileira que une LMS, webconferência própria e IA nativa treinada no conhecimento da empresa — performance medível e compliance auditável.

## Seções (ordem)

| # | ID | Nome | Conteúdo / notas |
|---|-----|------|------------------|
| 0 | — | Promo + nav | Mesmo padrão blog/home; item Plataforma ativo |
| 1 | `hero` | Hero | Headline, sub, 2 CTAs, badges Microsoft / 20 anos, trust line |
| 2 | `numeros` | Stats | Placeholders [X][Y][Z] até comercial (issue 6/7) |
| 3 | `por-que` | §01 Por que Lector | Diferenciais + logos clientes |
| 4 | `por-dentro` | §02 Por dentro | Mock universidade corporativa + assistente IA |
| 5 | `ecossistema` | §03 Ecossistema | Grid de módulos + ambiente exclusivo |
| 6 | `rede-social` | §04 Rede social | Copy + mock de posts |
| 7 | `onboarding` | §05 Onboarding | Dor + 3 pilares (trilhas, IA, dashboard) |
| 8 | `universidade` | §06 Universidade inteligente | Cadeia 01–10 + OS do conhecimento |
| 9 | `lideranca` | §07 Liderança & talentos | Dois blocos de oferta |
| 10 | `depoimentos` | §08 O que dizem | Placeholders até validar com clientes |
| 11 | `seguranca` | §09 Segurança & LGPD | Incompleto de propósito (issue 9) |
| 12 | `investimento` | §10 Investimento | 3 planos placeholder (issue 13) |
| 13 | `faq` | §11 FAQ | Accordion |
| 14 | `cta` | §12 Próximo passo | Form nome / e-mail / empresa |
| 15 | — | Footer | Logo light + copyright |

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Fazer diagnóstico gratuito | `#cta` | primary |
| Agendar demonstração | `#cta` | secondary |
| Fazer diagnóstico (planos) | `#cta` | card |

## Conteúdo e dados

- Logos clientes: `assets/clients/` (microsoft, philips, unimed, sicoob, koch, sesi-senai, …)
- Números hero: **não publicar cifras finais** sem confirmação comercial
- Depoimentos: placeholders do briefing
- Preços: placeholders Essencial / Compliance NR-1 / Enterprise
- Segurança: campos técnicos a preencher
- Consentimento form: texto a validar com jurídico

## SEO

| Campo | Valor |
|-------|--------|
| Title | Plataforma Lector — LMS, IA e universidade corporativa |
| Meta description | LMS, webconferência e IA nativa em um só ambiente. Transforme treinamento em performance medível e compliance NR-1 auditável. |
| OG image | a definir em `assets/media/plataforma-lector/` |

## Design

- Hero: **dark navy** premium
- Corpo: paper / claro com cards bento
- Tokens do DS; ícones Lucide (sem emoji)
- Nav clara sticky (padrão blog)
- Mock UI de universidade e rede social em cards

## Estados e interações

- Menu mobile
- FAQ accordion
- Nav sombra ao scroll
- Submit form: placeholder (sem backend)

## Fora de escopo

- Integração real de form / CRM
- Números e preços finais
- Depoimentos assinados
- Detalhe técnico LGPD/hospedagem completo
- Páginas filhas (copiloto, NR-1, etc.)

## Critérios de aceite

- [ ] Spec alinhada com o HTML
- [ ] Link na navbar (home + blog) aponta para esta página
- [ ] Paths `../../design-system` e `../../assets` corretos
- [ ] Tokens CSS (sem hex soltos desnecessários)
- [ ] Copy PT-BR, tom Lector, sem emoji
- [ ] Placeholders de número/preço/segurança visíveis como “a confirmar”
- [ ] Responsivo básico + FAQ usável
- [ ] Sitemap + `site.json` atualizados
