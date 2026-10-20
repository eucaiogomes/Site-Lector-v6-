# Página: Crie seus próprios treinamentos (landing genérica de tráfego pago)

| Campo | Valor |
|-------|--------|
| **Slug** | `treinamentos-proprios` |
| **Status** | `wip` |
| **Código** | `pages/treinamentos-proprios/index.dc.html` |
| **Rota pública** | `/treinamentos-proprios` |
| **Última atualização** | 2026-10-20 |
| **Lead form** | Embutido na página (mesmo componente da landing Unimeds) |
| **Nav** | Fora do menu do site. Landing de campanha (Meta Ads, Criativo A), `noindex` |
| **Variante de header** | pill branco (mesmo tamanho da navbar da home) sobre hero `dark` |
| **Base** | Criada a partir de `pages/unimeds` — mesmos componentes, animações e decisões visuais. Ver `specs/pages/unimeds.md` para o comportamento detalhado de cada componente. |

---

## Objetivo

Gerar leads de tráfego pago (inicialmente Meta Ads) interessados em criar, atualizar ou publicar conteúdos de treinamento próprios. Oferta de entrada: microlearning gratuito (assistir online + baixar). Conversão secundária: demonstração da Ferramenta de Autoria.

## Público

RH, T&D, Educação Corporativa, DHO, Desenvolvimento Organizacional, Universidade Corporativa e áreas de treinamento — **qualquer setor** (sem restrição a saúde, indústria ou Unimeds).

## Criativo de origem (continuidade de mensagem)

**Criativo A — Dor.** Anúncio: "Sua empresa ainda depende de cursos prontos?" / "Cursos genéricos não acompanham a operação. Veja como criar um microtreinamento próprio."

- H1 do hero **exatamente**: "Sua empresa ainda depende de cursos prontos?"
- Texto de apoio do hero começa com a frase do anúncio.

## Mensagem principal

> Sua empresa não precisa depender apenas de cursos prontos. Com a Ferramenta de Autoria da Lector, sua equipe pode transformar conhecimentos, processos e situações reais da operação em microtreinamentos próprios, interativos e mais aderentes.

## Decisões visuais (iguais à landing Unimeds)

- Visual da **home do site** (Sora/Plus Jakarta, laranja `--brand`, navy, seções dark/light), não a paleta azul/Inter do briefing — mesma decisão da Lector para a landing Unimeds.
- **Sem sobretítulos/badges acima dos títulos** (pedido da Lector; regra do site). Os sobretítulos do briefing (A dor, Acesso gratuito, O processo, Possibilidades…) não aparecem. Só fica a linha de público do hero ("Para RH, T&D e Educação Corporativa").
- Navbar do tamanho da home; logo leva para a home. Rodapé e botão de WhatsApp iguais aos da home (diverge do briefing, que pede para não ter links de saída — decisão da Lector).
- **Mockup do briefing não disponível nesta máquina** (`/home/ubuntu/lector_lp_generica_mockup/...`). A composição segue a landing Unimeds; ajustar quando o mockup for enviado.
- **Revisão de 2026-10-20 (briefing reenviado pelo cliente, idêntico ao original):** todo o texto do briefing está na página. A Lector confirmou as quatro divergências: sem sobretítulos, visual da home (não a paleta azul/Inter), logo/rodapé/WhatsApp mantidos e, depois do envio, **só a confirmação de contato** (sem vídeo nem download; ver Formulário e dados).

## Versão sóbria (menos "cara de IA")

Pedido da Lector: o site estava com aparência de gerado por IA. Nesta página:

- **Sem efeitos decorativos:** sem brilho laranja de fundo, órbitas, anel girando, botão pulsando com reflexo, card flutuando, brilho seguindo o mouse e título acendendo palavra por palavra. Ficam só a entrada suave das seções, a trilha do processo e as cenas do editor.
- **Sem selos flutuantes no hero.** O sinal de "conteúdo próprio" fica no título da barra do card ("Microlearning próprio · Lector").
- **Listas editoriais no lugar de cards com ícone:** Dor (2 colunas numeradas), pontos do microlearning (4 colunas), Possibilidades (3 colunas de texto), todas com divisórias finas.
- **Números no lugar de ícones** nas abas da vitrine e nos cards do processo.
- Formulário: "Gratuito." como linha de texto, sem pílula.
- Próximo passo para ficar autêntico: trocar a foto gerada por IA e as telas desenhadas por fotos reais da equipe e capturas reais do Lector Studio.

## Seções (ordem)

| # | ID | Nome | Conteúdo |
|---|-----|------|----------|
| 0 | `topo` | Header | Âncoras: Para empresas (`#empresas`), Microlearning, Ferramenta de Autoria; CTA → `#formulario` |
| 1 | `empresas` | Hero | **Mesmo hero da landing Unimeds** (pedido da Lector em 2026-10-20): foto em tela cheia (`hero.webp`/`.jpg`, 1728×910, profissional de T&D no notebook com caneca da Lector, gerada por IA, com o degradê navy já na imagem) e o card de tela de treinamento posicionado sobre a foto pelo mesmo "palco" em JS (`_wireHeroStage`); entre 961 px e ~1440 px o card encolhe para não passar da borda direita, como na landing Unimeds (ver `unimeds.md`, Foto do hero). Card: "Como transformar uma necessidade real em treinamento?", texto de apoio, Contexto da operação / Escolha como agir / Feedback aplicável, progresso; sinal de conteúdo próprio e interativo no título da barra e no rótulo "Interativo". Até 960 px: foto escurecida ao fundo e card abaixo do texto. Linha de público, H1 do Criativo A, texto de apoio, CTAs "Quero ver o microlearning" e "Conhecer a Ferramenta de Autoria", microcopy de acesso gratuito |
| 2 | `dor` | Dor | "O curso pronto conhece a sua operação?" + texto do briefing + lista numerada em 2 colunas: Cursos genéricos, Produção demorada, Fornecedores caros, Plataforma subutilizada |
| 3 | `microlearning` | Microlearning gratuito | "Receba um exemplo e veja como um conteúdo próprio pode ser criado." Mídia configurável (mock/imagem/vídeo), hoje o **teaser em vídeo** (ver Mídia), com legenda "Prévia do microlearning · Como criar um microtreinamento próprio"; oferta; 4 pontos (Contexto, Simulação, Feedback, Transferência) |
| 4 | `ferramenta-autoria` | Ferramenta de Autoria | Vitrine com 6 abas + mockup do Lector Studio. Tema neutro das cenas: "Novo processo de atendimento" (cliente, pedido, exceção ao processo; versões Comercial/Operações/Atendimento/Liderança; publicar na "Sua plataforma de aprendizagem") |
| 5 | `processo` | Processo | "Da necessidade da equipe ao treinamento publicado." (sem texto de apoio, como no briefing) + 4 cards com número laranja e trilha |
| 6 | `possibilidades` | Possibilidades | "Conteúdos que sua empresa pode criar internamente." 6 temas em 3 colunas de texto (Integração de novos colaboradores, Atualização de processos, Compliance e segurança, Atendimento e vendas, Educação continuada, Desenvolvimento de lideranças) |
| 7 | `depoimento` | Depoimento | Título "Depoimento". **Oculta** até haver depoimento autorizado (`PAGE_CONFIG.TESTIMONIAL`). Textos: "Conteúdo conectado à realidade da sua operação." + texto institucional do briefing |
| 8 | `formulario` | Formulário | Linha curta "Gratuito." (sem lista de benefícios). 6 campos: Nome, E-mail corporativo, Empresa, Cargo, Plataforma (seleção), Principal desafio (seleção). Botão "Receber o microlearning gratuito" + mensagem de privacidade |
| 9 | — | Footer | Mesmo rodapé da home + WhatsApp flutuante |

## Formulário e dados

Placeholders: "Seu nome", "nome@empresa.com.br", "Nome da empresa", "Seu cargo". Envia para `/api/contact` (`FORM_FORMAT: 'contact-api'`), com cargo/respostas/campanha em `mensagem`.

Payload completo:

`segment=geral` · `lead_source=meta_paid` · `campaign=criativo_a_dor` · `creative=A_dor_cursos_prontos` · `landing_page=/treinamentos-proprios` · `utm_source/medium/campaign/content/term` · `submitted_at` · `origin_url`.

`origem` no e-mail: `lp-treinamentos-proprios · utm_source · utm_campaign`.

E-mail pessoal (gmail, hotmail, outlook, live, yahoo, icloud, bol, uol, terra, ig) **não é bloqueado**: o lead segue normalmente e ganha a linha "Qualificação: e-mail pessoal, qualificar manualmente" em `mensagem` (`email_personal: true` no payload completo).

Configuração em `PAGE_CONFIG`: `FORM_SUBMIT_ENDPOINT`, `FORM_FORMAT`, `PREVIEW`, `TESTIMONIAL`.

**Tela de sucesso (decisão da Lector em 2026-10-20):** depois do envio, o card mostra só a confirmação "Recebemos seus dados!" + "Em breve um especialista da Lector vai entrar em contato com você para enviar o microlearning." **Não libera vídeo, download nem link de demonstração** (diverge da seção 6 do briefing). As chaves `MICROLEARNING_*` e `DEMO_BOOKING_URL` foram removidas desta página.

**Textos alinhados ao contato do especialista** (no lugar de "assista online e baixe" do briefing):

| Onde | Texto |
|------|-------|
| Botão do header | "Receber o microlearning" (celular: "Receber") |
| Microcopy do hero | "Gratuito: um especialista da Lector envia para você um exemplo de microlearning próprio." |
| Título da seção Microlearning | "Receba um exemplo e veja como um conteúdo próprio pode ser criado." |
| Oferta | "Conheça a experiência completa com um especialista." + "…É gratuito: um especialista da Lector envia o microlearning e mostra como criar conteúdos assim." |
| Formulário | "Receba o microlearning e conheça a Ferramenta de Autoria com um especialista." + "Preencha seus dados e um especialista da Lector entra em contato para enviar o microlearning gratuito e apresentar a Ferramenta de Autoria." |
| Privacidade | "Seus dados serão utilizados para o envio do microlearning e o contato relacionado à demonstração." |

Analytics: mesmos eventos da Unimeds, exceto `microlearning_view`, `microlearning_download` e `demo_request` (a tela de sucesso não tem mais esses links); `event_category: lp_treinamentos_proprios`; contexto do form `lp_form`.

## Mídia

`assets/media/treinamentos-proprios/`: `hero.webp`/`hero.jpg` (foto do hero e `og:image`; mesma imagem do hero da landing Unimeds), `autoria-video.mp4` + `autoria-video-poster.jpg` (cena da IA no editor). `profissional.webp`/`.jpg` era a foto do hero em duas colunas e não é mais usada.

**Teaser da área de prévia** (`PREVIEW.type = 'video'`): `microlearning-teaser.mp4` (9,6 s, 1280×720, sem áudio, 1 MB) + `microlearning-teaser-poster.jpg`. Montagem com dissolves de 0,35 s de trechos de treinamentos produzidos pela Lector: `conteudo-sob-demanda/video-demonstracao-2.mp4` (Comunicação Assertiva), `-3` (apresentador de terno), `-1` (Engenharia de Prompts), `-4` (apresentadora de blazer, recortada para 16:9) e `autoria-video.mp4` (apresentadora Lector, recorte do vídeo de assédio sem mostrar o tema). Marca d'água da Lector no canto inferior esquerdo e escurecendo no fim. Tocado sem som, com botão de play e evento `microlearning_preview_play`.

## SEO

- Title: `Crie seus próprios treinamentos | Lector`
- Description: "Sua empresa ainda depende de cursos prontos? Experimente gratuitamente um microlearning e conheça a Ferramenta de Autoria da Lector para criar conteúdos próprios."
- `og:image`: `hero.jpg`. `canonical`: `https://lector.com.br/treinamentos-proprios`. `noindex, nofollow` (campanha); fora de `sitemap.xml`.

## Pendências

- Mockup aprovado da landing genérica.
- Depoimento autorizado (ou manter a seção oculta).
- `og:image` específica da campanha, se houver.
