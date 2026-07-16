# Lector — Design System

Lector é uma plataforma de **LMS** (cursos online / ensino). Este projeto é o **design system** da marca: tokens, componentes React reutilizáveis, cards de fundamentos e UI kits de tela cheia. Consumidores linkam um único arquivo: **`styles.css`** (na raiz), que apenas `@import`a os arquivos de token.

> **Direção de marca:** ver `guidelines/DIRECTION.md` — estética **premium / editorial / "feito à mão"**, fugindo de template de IA. Derivada das referências de social/proposta enviadas pelo usuário (laranja+navy do anúncio Lector; dark premium estilo Ajux; tipografia gigante estilo Grow).

## Cor da marca (oficial, extraída do logo vetorizado)
- **Laranja `#F66B0A`** (`--orange-500` / `--brand`) — cor primária da identidade (o swoosh orbital).
- **Navy `#00204D`** (`--navy-800` / `--accent-navy`) — cor secundária (a palavra "lector"). Usada nas seções/cards escuros premium e como tinta dos textos fortes.
- Acentos: âmbar/sunrise para realces; neutros "warm ink" com leve fundo navy; verde/vermelho/azul/amarelo para status.

## Fontes (substituição sinalizada)
Sem arquivos de fonte da marca; usamos os mais próximos no **Google Fonts**, aprovados pelo usuário:
- **Sora** — display / títulos (peso 700–800, geométrico).
- **Plus Jakarta Sans** — UI e corpo.
- **JetBrains Mono** — números, preços, código.

Se houver fontes oficiais da Lector, enviar que substituímos.

---

## CONTENT FUNDAMENTALS (tom & copy)
- **Idioma:** Português (BR). Segunda pessoa direta — **"você"**.
- **Tom:** confiante, direto, de marketing. Frases curtas de impacto + subcopy explicativa.
- **Mistura de pesos no display:** parte regular + palavra-chave em **bold** ou *itálico* laranja. Ex.: "Aprenda com **quem** *ensina de verdade*", "Libere o **Máximo**".
- **Eyebrows** em CAIXA ALTA com tracking largo (ex.: `PARA EQUIPES`).
- **Preço:** `R$` pequeno, número grande, centavos e `/mês` sobrescritos em mono.
- **Sem emoji.** Ícones de linha (Lucide) no lugar.
- Exemplos de voz: "com quem entende", "Estética pensada. Conversão real.", "Proteja o que mais importa."

## VISUAL FOUNDATIONS
- **Cor:** laranja de marca `--brand #F66B0A` (rampa `--orange-*`) + **navy #00204D** (`--navy-*`) como secundária; acento âmbar/sunrise; neutros com leve fundo navy (`--ink-*`) chegando a `--ink-950 #001026`. Status verde/vermelho/azul/amarelo. Tema claro arejado (padrão) + dark premium navy.**claro** (padrão) e **dark premium** (ink-950 com brilho).
- **Gradientes (uso mínimo):** marca é majoritariamente **cor chapada**. Gradientes reservados a brilho metálico sutil de cards dark (`--card-dark-bg`, `--sheen-top`) e proteção de imagem; `--glow-orange`/`--glow-navy` para halos radiais discretos.
- **Tipo:** display Sora 800 com tracking negativo; mistura de pesos; **tipografia mega** estourando atrás dos cards (motivo recorrente).
- **Cards (bento):** rounding generoso (`--radius-xl/2xl`), sombra warm e suave; variações `surface / sunken / outline / dark / brand / gradient`; motivo de **notch** (canto côncavo cortado); brilho metálico/sheen no topo nos cards dark.
- **Forma:** botões **pill** por padrão, com glow laranja no primário; selos circulares com ícone; barras de contato em pill; setas ↗ nos CTAs.
- **Espaçamento:** grade base 4px (`--space-*`); ritmo de seção `--section-y`.
- **Movimento:** `--ease-out` / `--ease-spring`; durações 140/220/380ms. Hover = lift sutil + sombra; press = leve scale(0.98). Sem animações decorativas infinitas.
- **Sombras:** warm, em camadas (`--shadow-xs…xl`) + `--shadow-brand` (glow laranja para CTAs/ativos). Focus ring `--ring-brand`.

## ICONOGRAFIA
- Sistema de **linha estilo Lucide** (ISC), traço ~1.85px, cantos arredondados, grade 24px. Subconjunto curado embutido em `components/core/Icon.jsx` (`book-open`, `play-circle`, `graduation-cap`, `award`, `flame`, `bar-chart`, etc.). Em telas cheias pode-se carregar Lucide via CDN.
- **Sem emoji.** Unicode não é usado como ícone.
- Logos em `assets/` (logo completo laranja+navy, variante texto-branco, swoosh isolado). O **swoosh orbital** do logo é o motivo gráfico central — reaproveitado como vetores `orbit`/`rings-cross` que cruzam as seções.

---

## ÍNDICE (manifesto da raiz)
- **`styles.css`** — entrada global (apenas `@import`s).
- **`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- **`assets/`** — `logo-lector.svg` (laranja+navy), `logo-lector-light.svg` (texto branco p/ fundo escuro), `logo-lector-mono-white.svg`, `logo-mark.svg` (swoosh isolado), e vetores orbitais `orbit.svg`, `rings-cross.svg`, `arc-divider.svg`, `orbit-node.svg`.
- **`components/core/`** — Icon, Button, IconButton, Badge, Tag, Avatar, Card (com `spotlight`), Stat, ProgressBar, Input, Switch, Tabs, FeatureItem, **Accordion**, **Menu** (dropdown de ações), **Pagination**, **Skeleton**.
- **`components/premium/`** — DisplayHeadline, EyebrowLabel, MegaType, NumberedSection, OrbitDivider, PriceCard, Seal, ContactBar, MediaCard.
- **`components/blog/`** — ArticleCard (vertical/horizontal/overlay), Byline, PullQuote, NewsletterCTA.
- **`components/forms/`** — Textarea, Select, Checkbox, RadioGroup, **Slider**, **Rating** (estrelas), **Calendar** (date picker PT-BR) — somam-se a Input, Switch, Tabs do core.
- **`components/dashboard/`** — kit de analytics: **MetricCard** (KPI com tendência ↗↘/neutra, comparativo "vs. período", meta/progresso, densidade `sm` e skeleton de carregamento + sparkline), **Sparkline**, **LineChart** (linha/área, multi-série, tooltip), **BarChart** (simples/comparativo, linha de meta tracejada + rótulos de valor), **DonutChart** (com legenda + centro), **DataTable** (sortável + paginada, densidade, barra proporcional na célula, linha de totais e clique na linha), **SegmentedControl** (filtros / date range) e **FilterBar** (barra de filtros aplicados com chips removíveis + "Limpar"). Paleta sóbria (laranja de marca + navy + ink), **sem gradiente**, dados reais em SVG. Template montado em `templates/analytics-dashboard/`.
- **`components/library/`** — `UI-Library.card.html`: vitrine storybook única da biblioteca (7 componentes novos + fundamentos, em claro e dark premium lado a lado).
- **`components/overlays/`** — Modal, Toast (+ ToastViewport), PromoBanner, PromoModal, LeadMagnet (anúncios/popups/captura de e-mail).
- **`components/mobile/`** — MobileHeader, StickyCTA, BottomSheet (peças de landing mobile).
- **`guidelines/`** — `DIRECTION.md` (direção premium) + cards de fundamentos (`@dsCard`): cor, tipo, espaçamento, marca.
- **`ui_kits/lector-web/`**, **`ui_kits/lector-app/`**, **`ui_kits/lector-blog/`** e **`ui_kits/lector-forms/`** — recriações de tela cheia (marketing, LMS, blog editorial, formulários & popups).
- **`ui_kits/lector-home-lp2/`** — landing institucional **Lector Live** (educação corporativa B2B) com animações de rolagem: hero editorial, showcase das 6 ferramentas, depoimento parceiro Microsoft, logos de clientes, 4 pilares, formulário de contato, blog e newsletter.

## NOTAS
- **Marca:** o design system serve tanto o produto de cursos (demo `lector-web`) quanto a marca institucional **Lector Tecnologia / Lector Live** (educação corporativa). Mesma linguagem visual; copy varia pelo público.
- **Starting points / templates:** as telas em `ui_kits/` podem ser migradas para `templates/<slug>/` (com `<!-- @template … -->`) quando se quiser oferecê-las no seletor de templates dos projetos consumidores.
- **Imagens:** fotos de pessoas/blog usam Unsplash como placeholder; logos reais de clientes ficam em `assets/clients/`.
