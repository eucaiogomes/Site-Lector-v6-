# Página: Home

| Campo | Valor |
|-------|--------|
| **Slug** | `home` |
| **Status** | `live` |
| **Código** | `pages/home/index.dc.html` |
| **Rota pública** | `/` |
| **Última atualização** | 2026-07-16 |

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
**Eyebrow:** Plataforma de aprendizado com IA nativa

## Seções (ordem no HTML)

| # | ID | Nome | Notas |
|---|-----|------|--------|
| 0 | — | Announcement + header fixos | Marquee diagnóstico + nav dark pill |
| 1 | `top` | Hero dark | Vídeo `hero.mp4`, CTA “Explore a plataforma” |
| 2 | `depoimento` | Depoimentos | Carrossel Microsoft ↔ Philips + marquee de logos |
| 2b | `ia` | IA Lector | Grafo + copy + 3 capacidades; **só** CTA Agendar demonstração |
| 3 | `plataforma` | Soluções / plataforma | Statement + showcase |
| 4 | `autoria` | Ferramenta de autoria | Spotlight; CTA Agendar demonstração |
| 5 | `lms` | LMS completo | Spotlight flip; imagem `lms.png` |
| 6 | `rede-social` | Rede social corporativa | Spotlight + `rede-social.png` |
| 7 | `webconferencia` | Webconferência | Spotlight flip + mock de sala |
| 8 | — | Módulos bento | 6 módulos |
| 9 | `numeros` | Resultados | Stats + count-up |
| 10 | `contato` | CTA final | “Falar com especialista” → lead form |
| 11 | — | Footer | Logo light + links |

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
- Logo header dark: `assets/brand/logo-lector-light.svg`
- Logo footer: `assets/brand/logo-lector-light.svg`
- Orbit: `assets/brand/orbit.svg`
- Hero vídeo: `assets/media/home/hero.mp4`
- Autoria: `assets/media/home/video-autoria.mp4`
- LMS / rede: `assets/media/home/lms.png`, `rede-social.png`
- Nav: sincronizar com `content/site.json`

## SEO

| Campo | Valor |
|-------|--------|
| Title | Lector — Plataforma de aprendizado com IA nativa |
| Meta description | Uma só plataforma para criar, ensinar, engajar e medir capacitação corporativa. |
| OG image | a definir em `assets/media/home/` |

## Design

- Hero e header: **dark premium** navy
- Conteúdo: paper / claro
- Tokens DS; Lucide; sem emoji
- Product spotlights (`.lk-spotlight`): um CTA por seção (Agendar demonstração)

## Estados e interações

- Fechar announcement
- Header pill no scroll
- Lead form modal (CTAs)
- Reveal on scroll (`data-reveal`)
- Marquee de logos + depoimentos

## Fora de escopo

- App LMS logado
- Backend de lead (só UI + log)
- i18n

## Critérios de aceite

- [x] Paths `../../` para DS e assets
- [x] Logos clientes em `assets/clients/`
- [x] CTAs abrem lead form
- [x] Dropdown soluções com descrições
- [ ] Meta title/description no helmet
- [ ] Mobile: header usável (drawer na home)
