# Página: Crie seus próprios treinamentos (landing genérica de tráfego pago)

| Campo | Valor |
|-------|--------|
| **Slug** | `treinamentos-proprios` |
| **Status** | `wip` |
| **Código** | `pages/treinamentos-proprios/index.dc.html` |
| **Rota pública** | `/treinamentos-proprios` |
| **Última atualização** | 2026-10-19 |
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
| 1 | `empresas` | Hero | **Duas colunas** (estrutura do briefing): texto à esquerda; à direita, composição "profissional de T&D + tela de treinamento": foto em card (`profissional.webp`, 819×1024, pessoa gerada por IA no ChatGPT), card de tela de treinamento sobreposto ("Como transformar uma necessidade real em treinamento?", Contexto da operação / Escolha como agir / Feedback aplicável, progresso, selo "Conteúdo próprio"), selos flutuantes "Criado pela sua equipe — com apoio de IA e revisão humana" e "Pronto para publicar — na sua plataforma". No celular: foto e tela empilhadas. H1 do Criativo A; CTAs "Quero ver o microlearning" e "Conhecer a Ferramenta de Autoria" |
| 2 | `dor` | Dor | "O curso pronto conhece a sua operação?" + bento: Cursos genéricos, Produção demorada, Fornecedores caros, Plataforma subutilizada |
| 3 | `microlearning` | Microlearning gratuito | "Assista, baixe e veja como um conteúdo próprio pode ser criado." Mídia configurável (mock/imagem/vídeo) com legenda "Prévia do microlearning · Como criar um microtreinamento próprio"; oferta; 4 pontos (Contexto, Simulação, Feedback, Transferência) |
| 4 | `ferramenta-autoria` | Ferramenta de Autoria | Vitrine com 6 abas + mockup do Lector Studio. Tema neutro das cenas: "Novo processo de atendimento" (cliente, pedido, exceção ao processo; versões Comercial/Operações/Atendimento/Liderança; publicar na "Sua plataforma de aprendizagem") |
| 5 | `processo` | Processo | "Da necessidade da equipe ao treinamento publicado." (sem texto de apoio, como no briefing) + 4 cards com número laranja e trilha |
| 6 | `possibilidades` | Possibilidades | "Conteúdos que sua empresa pode criar internamente." 6 cards com ícones com volume (estilo 3D em CSS, laranja e navy alternados) (Integração, Atualização de processos, Compliance e segurança, Atendimento e vendas, Educação continuada, Lideranças) |
| 7 | `depoimento` | Depoimento | **Oculta** até haver depoimento autorizado (`PAGE_CONFIG.TESTIMONIAL`). Textos: "Conteúdo conectado à realidade da sua operação." |
| 8 | `formulario` | Formulário | Indicação curta "Conteúdo gratuito" abaixo do texto (sem lista de benefícios). 6 campos: Nome, E-mail corporativo, Empresa, Cargo, Plataforma (seleção), Principal desafio (seleção) |
| 9 | — | Footer | Mesmo rodapé da home + WhatsApp flutuante |

## Formulário e dados

Placeholders: "Seu nome", "nome@empresa.com.br", "Nome da empresa", "Seu cargo". Envia para `/api/contact` (`FORM_FORMAT: 'contact-api'`), com cargo/respostas/campanha em `mensagem`.

Payload completo:

`segment=geral` · `lead_source=meta_paid` · `campaign=criativo_a_dor` · `creative=A_dor_cursos_prontos` · `landing_page=/treinamentos-proprios` · `utm_source/medium/campaign/content/term` · `submitted_at` · `origin_url`.

`origem` no e-mail: `lp-treinamentos-proprios · utm_source · utm_campaign`.

Configuração em `PAGE_CONFIG` (mesmas chaves da Unimeds): `FORM_SUBMIT_ENDPOINT`, `MICROLEARNING_VIEW_URL`, `MICROLEARNING_DOWNLOAD_URL`, `DEMO_BOOKING_URL`, `PREVIEW`, `TESTIMONIAL`. **Não publicar para o anúncio antes de preencher as URLs de assistir e baixar.**

Analytics: mesmos eventos da Unimeds; `event_category: lp_treinamentos_proprios`; contexto do form `lp_form`.

## Mídia

`assets/media/treinamentos-proprios/`: `profissional.webp`/`.jpg` (foto do hero), `hero.webp`/`hero.jpg` (usado só como `og:image`), `autoria-video.mp4` + `autoria-video-poster.jpg` (cena da IA no editor).

## SEO

- Title: `Crie seus próprios treinamentos | Lector`
- Description: "Sua empresa ainda depende de cursos prontos? Experimente gratuitamente um microlearning e conheça a Ferramenta de Autoria da Lector para criar conteúdos próprios."
- `og:image`: `hero.jpg`. `canonical`: `https://lector.com.br/treinamentos-proprios`. `noindex, nofollow` (campanha); fora de `sitemap.xml`.

## Pendências

- Mockup aprovado da landing genérica.
- URLs reais de assistir/baixar o microlearning e de demonstração.
- Depoimento autorizado (ou manter a seção oculta).
- `og:image` específica da campanha, se houver.
