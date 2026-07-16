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
| 0 | — | Announcement + header fixos | Pill laranja (diagnóstico) + nav pill |
| 1 | `top` | Hero dark | Background imagem/vídeo, CTA “Explore a plataforma” |
| 2 | — | Kinetic words | Faixa tipográfica inferior do hero |
| 3 | `plataforma` | Soluções / plataforma | Showcase ferramentas |
| 4 | — | Depoimento / parceiro | Microsoft e narrativa de parceria |
| 5 | `numeros` | Clientes | Marquee / logos em `assets/clients/` |
| 6 | — | Pilares | Diferenciais |
| 7 | `contato` | Formulário / CTA | Captura de lead |
| 8 | — | Blog teaser / newsletter | (se presente no HTML) |
| 9 | — | Footer | Logo light + links |

> Ao editar, mantenha comentários `<!-- SECTION: … -->` alinhados a esta tabela.

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Explore a plataforma | `#contato` / `#plataforma` | primary hero |
| Comece agora | `#contato` | primary header |
| Quero meu diagnóstico | (announcement) | banner |
| Entrar | `#entrar` | secondary |

## Conteúdo e dados

- Logos clientes: `assets/clients/*.png` (lista montada no script da página)
- Logo header/footer: `assets/brand/logo-lector-light.svg`
- Orbit decorativo: `assets/brand/orbit.svg`
- Nav global ideal: sincronizar com `content/site.json`

## SEO

| Campo | Valor |
|-------|--------|
| Title | Lector — Plataforma de aprendizado com IA nativa |
| Meta description | Uma só plataforma para criar, ensinar, engajar e medir capacitação corporativa. |
| OG image | a definir em `assets/media/home/` |

## Design

- Hero e header: **dark premium** navy
- Seções de conteúdo: paper / claro com acentos brand
- Tokens: `design-system/tokens/*`
- Ícones Lucide via CDN
- Referência de direção: `design-system/readme.md` (premium / editorial)

## Estados e interações

- Fechar announcement (`announceOpen`)
- Header pill style dinâmico no scroll (se implementado)
- Reveal on scroll (`data-reveal`)
- Hover CTA hero (`.lk-hero-cta`)
- Marquee de logos

## Fora de escopo (nesta versão)

- App LMS logado
- Blog completo (só teaser/âncora)
- CMS headless
- i18n

## Critérios de aceite

- [x] Página renderiza com DS e assets nos paths novos
- [x] Logos de clientes resolvem em `../../assets/clients/`
- [ ] Meta title/description no helmet
- [ ] Nav aponta para páginas reais quando existirem (`solucoes`, `blog`, etc.)
- [ ] Mobile: header e CTAs usáveis
- [ ] Sem links quebrados para `assets/` antigos na raiz
