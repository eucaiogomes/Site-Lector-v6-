# Página: Home

| Campo | Valor |
|-------|--------|
| **Slug** | `home` |
| **Status** | `live` |
| **Código** | `pages/home/index.dc.html` (~5.6k linhas) |
| **Rota pública** | `/` (rewrite Vercel; arquivo em `pages/home/`) |
| **Última atualização** | 2026-07-17 |
| **Lead form** | `shared/lead-form` (CTAs → modal) |
| **Nav** | Principal; dropdown soluções completo |
| **Variante de header** | `dark` (glass navy + `.lk-nav-dd`) |

---

## Objetivo

Converter visitantes B2B (RH/T&D e liderança) em leads: explorar a plataforma, reconhecer credibilidade (clientes/Microsoft) e solicitar contato ou diagnóstico.

## Público

- Gestores de T&D e RH corporativo  
- Decisores que comparam LMS / consolidação de ferramentas  
- Visitantes que chegam por marca Lector / campanha  

## Mensagem principal

**Headline:** O poder de aprender *de verdade*.  
**Sub:** Uma só plataforma para criar, ensinar, engajar e medir. Menos ferramentas soltas, mais gente aprendendo.  
**Eyebrow:** nenhum (sem badge/kicker acima do H1)

## Seções (ordem no HTML)

| # | ID | Nome | Notas |
|---|-----|------|--------|
| 0 | — | Announcement + header fixos | Marquee diagnóstico + nav dark pill |
| 1 | `top` | Hero dark | Vídeo `hero.mp4`, CTA “Explore a plataforma”, ícones das ferramentas (LMS, Webconf, Autoria, IA, Rede, Gestão de Talentos, Documentos) |
| 2 | `depoimento` | Depoimentos | Carrossel Microsoft ↔ Philips + marquee de logos |
| 3 | `conhecimento` | Conhecimento invisível (trilogia 1/3) | Vídeo scroll-scrub `conhecimento-scroll.mp4` (sticky + avança com a rolagem) |
| 4 | `diagnostico-home` + `jornada` | Diagnóstico + Jornada (trilogia 2–3) | Duas colunas + **globo 3D** no centro (`lk-story-split`); âncora `#jornada` na coluna direita |
| 6 | `ia` | IA Lector | Grafo + copy + 3 capacidades; CTA Agendar demonstração |
| 7 | `plataforma` | Statement soluções | “Por que pagar diversas ferramentas…” |
| 8 | `autoria` | Autoria (tema no H2; sem badge) | Spotlight; `video-autoria.mp4` |
| 9 | `lms` | LMS (tema no H2) | Spotlight flip; `lms.png` |
| 10 | `rede-social` | Rede social (tema no H2) | Spotlight; `rede-social.png` |
| 11 | `webconferencia` | Webconferência (tema no H2) | Spotlight flip; `webconferencia.png` |
| 12 | `documentos` | Gestão de documentos (tema no H2) | Spotlight; `gestao-documentos.mp4` |
| 13 | `talentos` | Gestão de talentos (tema no H2) | Spotlight flip; `gestao-talentos.png` |
| 14 | — | Módulos bento (`#modulos`) | 9 módulos (6 nativos + NR-1, Copiloto, Conteúdo sob Demanda); sem eyebrow de seção |
| 15 | `numeros` | Resultados reais (tema no H2) | Stats + count-up |
| 16 | `contato` | CTA final | “Falar com especialista” → lead form |
| 17 | — | Footer | Logo light + links |

> Sem badges/eyebrows de título de seção — ver `AGENTS.md` e `specs/brand.md`.

### Trilogia narrativa

| Seção | Headline | Visual | Punch |
|-------|----------|--------|-------|
| `conhecimento` | O maior ativo da sua empresa é invisível. Até agora. | **Scroll-scrub only** (`.lk-scrub`): `conhecimento-scroll.mp4` (~720p, ~0.6MB) — sem autoplay/loop | O problema nunca foi falta de treinamento… |
| `diagnostico-home` + `jornada` | Antes de ensinar… / Quando cada pessoa aprende… | Split 3 colunas: copy \| **globo 3D** (`data-story-globe`) \| copy | Compreender o negócio → evolução competência a competência |

Scrub só em `conhecimento`. Diagnóstico + jornada vivem em `#diagnostico-home` com globo de rede (mesmo motor do depoimentos, tema dark). Respeitam `prefers-reduced-motion`.

> Ao editar, mantenha comentários `<!-- SECTION: … -->` alinhados a esta tabela.

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Falar com especialista | Lead form modal | primary nav + CTA final |
| Agendar demonstração | Lead form modal | IA + product spotlights |
| Explore a plataforma | Lead form modal | hero |
| Quero meu diagnóstico | Lead form modal (announcement) | banner |

Formulário: `shared/lead-form.js` — ver `specs/components/lead-form.md`.

## Conteúdo e dados

- Logos clientes: `assets/clients/*.png`  
- Logo header/footer dark: `assets/brand/logo-lector-light.svg`  
- Orbit: `assets/brand/orbit.svg`  
- Hero: `assets/media/home/hero.mp4`  
- Scrub sessão 1: `assets/media/home/conhecimento-scroll.mp4` (+ poster)  

- Autoria: `assets/media/home/video-autoria.mp4`  
- LMS / rede / webconf: `assets/media/home/lms.png`, `rede-social.png`, `webconferencia.png`  
- Documentos: `assets/media/home/gestao-documentos.mp4`  
- Talentos: `assets/media/home/gestao-talentos.png`  


- Nav: sincronizar com `content/site.json` e com as outras páginas  

## SEO

| Campo | Valor |
|-------|--------|
| Title | Lector — Plataforma de aprendizado com IA nativa |
| Meta description | Uma só plataforma para criar, ensinar, engajar e medir capacitação corporativa. LMS, webconferência, IA nativa e compliance NR-1. |
| OG image | a definir em `assets/media/home/` |

**Implementação:** `<title>` e `<meta name="description">` presentes no helmet.

## Design

- Hero e header: **dark premium** navy  
- Conteúdo: paper / claro  
- Tokens DS; Lucide; sem emoji  
- Product spotlights (`.lk-spotlight`): um CTA por seção  
- Classes locais: `lk-*`  

## Estados e interações

- Fechar announcement  
- Header pill no scroll  
- Lead form modal (CTAs)  
- Reveal on scroll (`data-reveal`)  
- Marquee de logos + depoimentos  
- Count-up nos stats  

## Fora de escopo

- App LMS logado  
- Backend de lead (só UI + log)  
- i18n  


## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | O que é a Lector e o que ela resolve? |
| Cápsula / sub hero | Uma só plataforma para criar, ensinar, engajar e medir. Menos ferramentas soltas, mais gente aprendendo. (texto longo de GEO fica só em `plataforma-lector`) |
| Schema | Organization + SoftwareApplication no helmet |
| HTML estático | Title/meta/schema/cápsula no markup; listagens ainda usam sc-for (JS) |

## Critérios de aceite

- [x] Paths `../../` para DS e assets  
- [x] Logos clientes em `assets/clients/`  
- [x] CTAs abrem lead form  
- [x] Dropdown soluções com 6 itens e descrições  
- [x] Meta title/description no helmet  
- [x] Schema Organization + SoftwareApplication  
- [x] Sem escassez fabricada no announce  
- [x] Sub do hero próprio (cápsula longa só em plataforma-lector)  
- [ ] Mobile: header usável (drawer dedicado na home)  
