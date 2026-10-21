# Página: Unimeds (landing de campanha)

| Campo | Valor |
|-------|--------|
| **Slug** | `unimeds` |
| **Status** | `wip` |
| **Código** | `pages/unimeds/index.dc.html` |
| **Rota pública** | `/unimeds` |
| **Última atualização** | 2026-10-19 |
| **Lead form** | Embutido na página (não usa `shared/lead-form`; ver "Exceções ao AGENTS.md") |
| **Nav** | Fora do menu do site. Landing de campanha (LinkedIn), `noindex` |
| **Variante de header** | pill branco sobre hero `dark`, reduzido: só âncoras internas + CTA |

---

## Objetivo

Receber leads da cadência de prospecção no LinkedIn para Unimeds. A página mostra uma dor (dificuldade de produzir conteúdo próprio de treinamento), entrega uma experiência concreta (microlearning gratuito **"Segurança de dados na saúde: 5 situações que exigem atenção"**) e converte em dois passos:

1. Formulário simples → acesso gratuito (assistir online + baixar o vídeo ou o pacote SCORM).
2. Demonstração da Ferramenta de Autoria da Lector.

## Público

RH, T&D, Educação Corporativa, DHO, Qualidade e Educação Continuada de Unimeds.

## Mensagem principal

> Sua Unimed não precisa depender apenas de cursos prontos para capacitar suas equipes. É possível transformar situações reais da operação em treinamentos digitais próprios, interativos e mais aderentes.

**Ordem de comunicação:** dor → experiência concreta → Ferramenta de Autoria → formulário → demonstração.

## Fonte

Briefing do cliente (landing Unimeds, aprovado para implementação). Textos das seções vêm do briefing sem alteração. O visual segue a **home do site** (pill glass, Sora, laranja `--brand`, seções dark/light alternadas), não a paleta azul/laranja do mockup original.

## Design

| Elemento | Implementação |
|----------|----------------|
| Header | Pill **branco** fixo, **mesmo tamanho da navbar da home** (1160 × 70 px, logo 24 px, links 14,5 px, botão 46 px com quadrado laranja de 32 px), a 14 px do topo; logo escura com link para a home (`/pages/home/index.dc.html`), 3 âncoras + CTA "Acessar o microlearning" com círculo laranja. No mobile: só logo + CTA |
| Hero | Reproduz o mockup aprovado do cliente (1728×910). Foto `assets/media/unimeds/hero-unimeds.{webp,jpg}` com gradiente navy já aplicado à esquerda; H1 Sora 800 com trecho em `--brand` itálico; CTAs empilhados (laranja + contorno branco) |
| Prévia do hero | Card de interface **em HTML** (texto real) sobre a foto, na área reservada a ele |
| Seções | Dor (light) → Microlearning (dark, destaque) → Autoria (light) → Processo (dark) → Possibilidades (light) → Depoimento (oculto) → Formulário (faixa `--brand`) → Footer (ink-950) |
| Cards | `border-radius:20px`, borda `--ink-100`, hover com borda laranja (padrão `nr-diff__card`) |

### Títulos — sem badge de seção

Regra do site: sem eyebrow/pill acima do H2. Os eyebrows do briefing ("A dor", "Acesso gratuito", "O processo"…) **não são renderizados**; o tema já está no H2.

Exceções de texto simples (não são badges de seção):
- Hero: linha "Para RH, T&D e Educação Corporativa de Unimeds" em texto corrido, sem caixa/pill, acima do H1.
- Bloco de oferta: "Microlearning gratuito" como linha de texto com ícone, sem pill.
- Mock do hero: chip "Interativo" é UI do produto.

## Seções (ordem)

| # | ID | Nome | Conteúdo / notas |
|---|-----|------|------------------|
| 0 | `topo` | Header | Pill branco; logo → home; âncoras `#unimeds`, `#microlearning`, `#ferramenta-autoria`; CTA → `#formulario` |
| 1 | `unimeds` | Hero | H1 do briefing; CTA primário → `#formulario` (`hero_microlearning_click`); secundário → `#ferramenta-autoria` (`authoring_cta_click`); microcopy; prévia em moldura |
| 2 | `dor` | Dor | Título que acende palavra por palavra ao rolar ("rapidamente em treinamento?" em laranja) + bento 7/5 · 5/7 com micro-animação em cada card: Cursos genéricos, Produção lenta, Fornecedores caros, Plataforma subutilizada |
| 3 | `microlearning` | Microlearning gratuito | Mídia (config) + bloco de oferta + 4 pontos (Contexto, Simulação, Feedback, Transferência) |
| 4 | `ferramenta-autoria` | Ferramenta de Autoria | Título palavra a palavra ("conteúdos próprios." em laranja) + vitrine: 6 abas à esquerda e janela do editor à direita com uma cena animada por recurso; CTA → `#formulario` (`authoring_cta_click`) |
| 5 | `processo` | Processo | Título palavra a palavra ("treinamento publicado." em laranja) + 4 cards altos (Identifique, Estruture, Crie, Publique) com número gigante em laranja chapado e trilha ligada à rolagem |
| 6 | `possibilidades` | Possibilidades | 6 cards de conteúdo |
| 7 | `depoimento` | Depoimento | **Oculta** até haver depoimento autorizado (ver abaixo) |
| 8 | `formulario` | Formulário | Texto + card com 6 campos; estados de carregando e erro; depois do envio, agradecimento com "Acessar microlearning" e então a tela de sucesso (vídeo + downloads) |
| 9 | — | Footer | **Mesmo rodapé da home** (Produto, Empresa, newsletter `shared/newsletter.js`, Privacidade/Segurança/Termos). Links da coluna Produto apontam para `/pages/home/index.dc.html#…` |

> Ao editar o HTML, mantenha os comentários `<!-- SECTION: … -->` alinhados a esta tabela.

## Foto do hero

- Origem: o próprio mockup aprovado pelo cliente (imagem de referência 1728×910). Navbar, textos, botões e card foram removidos da imagem; as áreas foram preenchidas com o fundo ao redor. A área atrás do card ficou como janela desfocada, porque o card a cobre.
- O gradiente navy da esquerda faz parte da foto. No desktop não há overlay CSS; no mobile (≤960 px) há overlay navy forte.
- Posicionamento: `_wireHeroStage()` calcula um "palco" 1728×910 em modo cover (`--stage-x/y/w/h/s`). Foto e card usam o mesmo palco, e o card fica sempre em 69,5% × 19% da foto, escalado junto. Em 1728×910 o resultado coincide com o mockup.
- Telas estreitas ou altas (entre 961 px e ~1440 px de largura, ou com proporção mais alta que a da foto): a área do card na foto chega perto da borda direita. O card então **encolhe** (`--card-s` < `--stage-s`) para terminar a 20 px da borda, alinhado ao pill do header. Ele nunca anda para a esquerda, onde está o rosto; só desliza um pouco para a direita (`--card-dx`) se ficaria a menos de 24 px do texto de apoio (≈961–990 px). Em 1440×900 e 1920×1080 a composição fica igual (no máximo 1 px menor em 1440 com barra de rolagem fixa, como no Windows). O JS usa o mesmo breakpoint do CSS (`matchMedia('(max-width: 960px)')`, que conta a barra de rolagem).
- A foto gerada no ChatGPT (homem de frente, enquadramento fechado) **não** foi usada.

## Seção da dor (animações)

- **Título:** o JS divide o H2 em palavras (`.w`) e acende cada uma conforme o título sobe na tela (de 90% a 40% da altura da janela). Sem JS, com movimento reduzido ou em aba oculta, o título aparece inteiro.
- **Bento:** cards em 12 colunas (7/5 e 5/7; uma coluna abaixo de 900 px). Cada card tem um visual em HTML (`aria-hidden`) que ilustra a dor, sem números inventados:
  - 01: três "Curso pronto" e um espaço tracejado "Processo da sua Unimed".
  - 02: esteira Necessidade → Briefing → Produção → Publicado, parada em "Aguardando produção".
  - 03: itens que se somam (Briefing, Contratação, Revisão, Custo adicional).
  - 04: catálogo da plataforma quase vazio, com a barra "Conteúdos próprios" baixa.
- **Movimento:** os visuais animam **uma vez** quando o card entra na tela (classe `.is-in`). O único loop é o spinner de "aguardando". Spotlight laranja segue o cursor só em dispositivos com hover. `prefers-reduced-motion` desliga tudo e mostra o estado final.
- O reveal limpa os estilos inline depois da transição, para o `:hover` dos cards funcionar.

## Ferramenta de Autoria (vitrine)

- **Abas** (`role="tablist"`, vertical): os 6 recursos do briefing. A aba ativa mostra a descrição e uma barra laranja de progresso. Todos os textos ficam no HTML; os inativos estão só recolhidos.
- **Autoplay:** troca de aba a cada 6,5 s enquanto a vitrine está visível. Para de vez quando a pessoa clica ou usa o teclado (setas, Home, End). Não roda com `prefers-reduced-motion`.
- **Janela = mockup do Lector Studio** (editor de gravação, `hml.lector.live/studio-editor`): reproduz o produto real. Tem cabeçalho com título, "Salvo automaticamente · publique para gerar o vídeo", "Pré-visualizar" e "Publicar"; barra lateral Capítulos/Slides/Vídeos/Áudios/Legendas; player com play laranja; barra Gravar/Narrar; timeline com faixas Câmera (azul), Slides (laranja) e Áudio (onda verde) e cursor de tempo laranja. Tokens copiados do produto e restritos ao bloco `.st` (`#0c0d10`, `#101114`, `#f26b1f`, `#6b85f0`, `#e0913a`, `#3fbf8a`, fonte Geist/Geist Mono via Google Fonts). Não usa imagem nem rosto da gravação real; a câmera é um avatar neutro.
- **Cenas** (conteúdo `aria-hidden`; reiniciam a cada troca de aba; o item ativo da barra lateral acompanha):
  1. IA: slide do módulo + painel "Assistente de IA" com sugestões; o cursor clica em **Aplicar** (vira "Aplicado"), aparece "Gerando o treinamento…", o painel recolhe e o vídeo de uma apresentadora toca no player (play vira pausa, tempo e cursor de tempo correm). Aba com 13,5 s. Vídeo: `assets/media/unimeds/autoria-video.mp4` (13 s, 960×540, sem áudio, 711 KB) + capa `autoria-video-poster.jpg`, recortados de um vídeo do Criador de Videoaulas (trecho 6,6–19,6 s, só rosto e ombros, sem legendas nem painéis do tema original).
  2. Gravação de tela: "Gravar" vira "Gravando", tela de sistema interno no player com câmera e REC, cursor clicando em "Salvar" e clipe "Tela" crescendo na timeline.
  3. Interações: slide de quiz "Situação 1 de 5", o cursor escolhe a resposta e aparece o feedback.
  4. Personalizados: abas de versão (Cooperativa/Hospital/Unidade/Atendimento) trocando o subtítulo do slide.
  5. Revisão: orientação antiga riscada, nova inserida e clipe da timeline vira "Slide atualizado".
  6. Publicação: modal "Publicar treinamento" (plataforma da Unimed ou solução completa da Lector), "Gerando vídeo" até "Publicado" e o cursor de tempo correndo.
- No mobile a janela fica acima das abas, sem a barra lateral, o assistente de IA e os ícones da toolbar.
- Feito em HTML, não em imagem gerada, para o texto ficar nítido, indexável e editável.

## Processo (animação)

- **Cards** altos (cerca de 410 px no desktop), com ícone, título e texto no topo. O número da etapa ("01"–"04", Sora 800, até 196 px) fica atrás, no canto inferior direito, cortado pela borda do card.
- **Trilha** acima dos cards: enche de laranja conforme a lista sobe na tela (de 95% a 35% da altura). Ao passar pelo nó de uma etapa, o nó acende e o card ganha `.is-on`: o número sobe e passa de contorno a **laranja chapado**, o ícone fica laranja e a borda brilha. Reversível ao rolar para cima.
- Tablet e celular (≤1100 px): sem trilha; cada card acende quando o topo passa de 72% da tela. Grid 2 colunas → 1 coluna (≤640 px).
- Hover: card sobe 6 px e brilho laranja segue o cursor na borda. `prefers-reduced-motion`: tudo aceso, sem transições.

## Página de acesso ao microlearning (`/unimeds/microlearning`)

- Código: `pages/unimeds-microlearning/index.dc.html` (rewrite no `vercel.json`), `noindex`.
- **Fluxo depois do envio (atualizado em 2026-10-21):**
  - **Tela de sucesso direta no card do formulário:** Ao enviar, o formulário é substituído diretamente pela tela de sucesso:
    - Ícone de check em círculo verde claro
    - Título: "Acesso liberado com sucesso!"
    - Subtítulo: "Assista aqui mesmo ou baixe o vídeo e o pacote SCORM para usar com a sua equipe."
    - Player de vídeo com capa `microlearning-poster.jpg` (`assets/media/unimeds/microlearning-poster.jpg`) e controles para assistir direto no card
    - Botão primário laranja: "Acessar o microlearning" levando para a página dedicada (`/pages/unimeds-microlearning/index.dc.html`), onde estão o player ampliado, resumo de 5 pontos e os downloads do vídeo MP4 e pacote SCORM 1.2.
  - Os CTAs de acesso da landing (header, hero, seção Microlearning) levam ao `#formulario`: o microlearning só é liberado depois do envio.
- Conteúdo: confirmação "Acesso liberado", título "Segurança de dados na saúde", player com legendas queimadas no vídeo, botões de download (MP4 e SCORM), seção "Resumo da aula" (faixa full-bleed com fundo laranja da marca e marca d'água de órbita branca, contendo os 5 pontos do vídeo) e chamada para falar com um especialista. Rodapé igual ao da home.
- Vídeo: `assets/media/unimeds/microlearning-seguranca-dados.mp4` (2 min 6 s, 1080p, H.264 + AAC, 22 MB; otimizado a partir de "video final 2.mp4", 52 MB), com **marca d'água fixa da Lector** (logo branco a 80% de opacidade, 246 px, canto inferior esquerdo, do início ao fim, gravada no vídeo). Capa: `microlearning-poster.jpg`.
- Pacote SCORM: `assets/media/unimeds/seguranca-de-dados-na-saude-unimed-scorm.zip` (SCORM 1.2, 22 MB, nota mínima 70; curso interativo com o vídeo da aula, gerado no Criador de Videoaulas). O `.gitignore` bloqueia `*.zip`; este arquivo tem exceção própria. Para trocar o pacote, manter o mesmo nome ou atualizar a exceção e o `PAGE_CONFIG`.
- **Encerramento:** logo depois do "Resumo da aula" entra, com dissolve de 1 s (a música do microlearning sai enquanto a voz entra), o vídeo da apresentadora com a chamada "Quer produzir conteúdos como este para o seu time? Conheça a Ferramenta de Autoria da Lector. Fale com o nosso time de especialistas." (8 s, origem `Woman_speaking_in_office_20261020082906.mp4`, ampliado de 720p para 1080p). Termina com o último quadro escurecendo para preto (0,65 s). O encerramento não tem legenda.
- Eventos: `microlearning_view` (primeiro play), `microlearning_download`, `demo_request`.
- A página não exige login: quem tiver o link acessa. Para bloquear de verdade, seria preciso link assinado gerado após o envio do formulário.

## Componente de mídia (seção Microlearning)

Configurado em `PAGE_CONFIG.PREVIEW` no script da página. Troca o formato sem mexer no resto:

| `type` | Comportamento |
|--------|----------------|
| `mock` | Prévia desenhada em HTML. Usada enquanto não houver asset aprovado |
| `image` | `<img src=imageSrc alt=alt>`. Sem botão de play (não simula ação inexistente) |
| `video` (atual) | Teaser ~10 s: `<video playsinline muted preload="metadata" poster=posterSrc>`, botão de play por teclado/toque, sem áudio automático, evento `microlearning_preview_play` ao iniciar |

**Teaser em uso:** `assets/media/unimeds/microlearning-teaser.mp4` (9,9 s, 1280×720, sem áudio, 0,9 MB) + `microlearning-teaser-poster.jpg`. Montado a partir do microlearning com dissolves de 0,35 s: abertura "Segurança de dados na Saúde" (1,7 s), pedido por aplicativo de mensagens (30 s), "Pare e pense" (42,4 s), "Antes de enviar, confira" (62,3 s) e "Resumo da aula" (114,9 s), com a marca d'água da Lector e escurecendo no fim. As legendas estão gravadas no vídeo. Os trechos foram escolhidos para a legenda não bater na marca d'água.

`assets/media/unimeds/microlearning-preview.jpg` (gerado por IA, texto incorreto) não é usado. **Não usar como asset final.**

## Depoimento

- H2 exato: **Depoimento**. Prova social somente em texto, nunca em vídeo.
- A seção fica `hidden`. Ela só aparece quando `PAGE_CONFIG.TESTIMONIAL.quote` for preenchido (com autorização por escrito do cliente, incluindo nome da Unimed e cargo).
- Sem autorização: não publicar frase com aspas, nem atribuição fictícia, nem rótulos internos ("ilustrativo", "provisório").

## Formulário

Campos (todos obrigatórios, `label` visível): Nome · E-mail corporativo · Unimed / empresa · Cargo · Você já utiliza uma plataforma de aprendizagem? · Principal desafio atual.

- Validação de formato de e-mail. Domínios pessoais **não** são bloqueados.
- Erro de envio mantém os dados preenchidos.
- Campo honeypot `website` (oculto) para bots.
- Sem bullets de benefícios e sem a palavra "abaixo" no texto da seção.
- Sem checkbox de consentimento por enquanto (adicionar só se o jurídico exigir; link para a política de privacidade ainda não existe no site).

### Payload enviado

Campos do formulário (`nome`, `email`, `empresa`, `cargo`, `plataforma`, `desafio`) +

`segment=unimeds` · `lead_source=linkedin_unimeds` · `campaign=microlearning_seguranca_dados` · `utm_source` · `utm_medium` · `utm_campaign` · `utm_content` · `submitted_at` (ISO) · `origin_url`.

UTMs são guardados em `sessionStorage` na entrada e reenviados no submit e anexados à URL de demonstração.

### Configuração (placeholders, sem URL inventada)

Em `PAGE_CONFIG`:

| Chave | Uso |
|-------|-----|
| `FORM_SUBMIT_ENDPOINT` | POST JSON do lead. Hoje `/api/contact` (e-mail comercial) |
| `FORM_FORMAT` | `contact-api` (padrão): adapta o payload ao contrato de `api/contact.js`. `flat`: envia o payload completo, para um CRM |
| `MICROLEARNING_DOWNLOAD_URL` | Botão "Baixar o microlearning" (gerar URL assinada após validação, se necessário) |
| `MICROLEARNING_SCORM_URL` | Botão "Baixar em SCORM para o seu LMS" (vazio = botão oculto) |
| `DEMO_BOOKING_URL` | Botão "Conhecer a Ferramenta de Autoria" |

Comportamento sem configuração:
- **localhost / 127.0.0.1:** mostra os botões sem URL configurada (`href="#"`) na tela de sucesso, só para revisar layout. Sem `FORM_SUBMIT_ENDPOINT`, o envio é simulado.
- **Produção:** sem `FORM_SUBMIT_ENDPOINT` o envio mostra erro. Não há sucesso falso. Botão sem URL não aparece. **Enquanto `MICROLEARNING_VIDEO_SRC`, `MICROLEARNING_DOWNLOAD_URL` e `MICROLEARNING_SCORM_URL` estiverem vazias, a tela de sucesso fica sem vídeo e sem download: não publicar a página antes de preenchê-las.**

### Mapeamento para `/api/contact`

`api/contact.js` só lê `nome, empresa, email, telefone, interesse, mensagem, origem` e envia um e-mail para `EMAIL_TO`. Com `FORM_FORMAT: 'contact-api'` a página envia:

| Campo da API | Valor |
|--------------|-------|
| `nome`, `email`, `empresa` | Campos do formulário |
| `interesse` | `Microlearning gratuito (segurança de dados na saúde) + Ferramenta de Autoria` |
| `origem` | `lp-unimeds` + ` · utm_source` + ` · utm_campaign` (quando existirem) |
| `mensagem` | Linhas: Cargo · Já utiliza plataforma (texto da opção) · Principal desafio (texto da opção) · Segmento · Fonte do lead · Campanha · Enviado em · URL de origem · `utm_source/medium/campaign/content/term` |
| `website` | Honeypot, sempre vazio |

Limitações: o lead chega por e-mail, sem CRM. Não há campo `telefone` no formulário. `origin_url` é o primeiro toque da sessão; uma nova entrada com UTMs substitui o valor anterior.

Teste local sem enviar e-mail: `MAIL_DRY_RUN=1 node devserver.js 4322` e abrir `http://localhost:4322/unimeds?utm_source=teste`. Sem `nodemailer` instalado (`npm install`) a API responde 500.

## Analytics (`lectorTrack` → `dataLayer` / `gtag`)

`hero_microlearning_click` · `authoring_cta_click` · `microlearning_preview_play` · `form_start` · `form_validation_error` · `form_submit_success` · `form_submit_error` · `microlearning_access` · `microlearning_view` · `microlearning_download` · `demo_request`.

Eventos não carregam identificadores de usuário nem dados do formulário. A página não carrega GTM/GA por conta própria; sem eles os eventos só vão para o console.

## SEO / compartilhamento

- Title: `Conteúdos de treinamento para Unimeds | Lector`
- Description: do briefing (seção 11).
- `lang="pt-BR"`, `og:title`, `og:description`, `og:image`, schema `Organization`.
- `noindex, nofollow` (campanha). Fora de `sitemap.xml` e `llms.txt` de propósito.
- `og:image` = foto do hero (`hero-unimeds.jpg`, vinda do mockup aprovado).
- `canonical`: confirmar a rota definitiva.

## Exceções ao AGENTS.md

- Form embutido em vez de `shared/lead-form` (exigência do briefing: acesso imediato + 6 campos).
- Header sem dropdown/nav do site (briefing: nada que tire o visitante antes da conversão).
- **Rodapé:** a pedido da Lector usa o mesmo rodapé da home, com links de saída e newsletter. Isso diverge do briefing (seção 4.1); confirmar com o cliente se for um problema.
- Sem cápsula GEO (landing `noindex`).
- Não carrega `design-system/_ds_bundle.js` (810 KB): a página não usa componentes do DS. O **botão flutuante de WhatsApp da home** foi replicado em HTML/CSS (`.lp-wa`), com o mesmo número, mensagem, visual e etiqueta no hover. Clique registra `whatsapp_click`. A pedido da Lector; também é um link de saída, como o rodapé.

## Restrições do briefing

Sem hospitais ou indústrias · sem segunda oferta principal · sem depoimento em vídeo · sem depoimento sem autorização · sem prometer funcionalidade inexistente · sem dizer que a IA entrega treinamento completo sem revisão humana · sem download fictício.

## Critérios de aceite

Ver seção 13 do briefing. Pendentes: asset real de mídia da seção Microlearning (a prévia), agenda de demonstração (hoje vai para o contato), depoimento autorizado.
