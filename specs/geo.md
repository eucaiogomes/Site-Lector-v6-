# GEO — Generative Engine Optimization (Site Lector)

Documento de referência para **aparecer e ser citado** por IAs (ChatGPT, Claude, Gemini, Perplexity, etc.).

**Fonte original:** `references/raw/Checklist-Site-Lector-GEO-Conversao.pdf`  
**Última atualização:** 2026-07-17

GEO não substitui SEO clássico: exige **HTML estático legível por crawlers**, **fatos citáveis**, **schema**, **frescor** e **presença em terceiros**.

---

## Status de implementação (repo)

Legenda: `feito` · `parcial` · `bloqueado` (precisa dado externo) · `pendente`

### Feito neste monorepo (sem depender de comercial/jurídico)

| Item | Status | Onde |
|------|--------|------|
| Remover escassez fabricada (“vagas limitadas”) | **feito** | Announce home, plataforma, blog, copiloto → urgência NR-1 real |
| `/llms.txt` | **feito** | Raiz `llms.txt` |
| `/robots.txt` (bots de IA liberados + sitemap) | **feito** | Raiz `robots.txt` |
| `/sitemap.xml` | **feito** | Raiz `sitemap.xml` (paths atuais do static deploy) |
| Meta title/description home | **feito** | `pages/home/index.dc.html` helmet |
| JSON-LD `Organization` | **feito** | Helmet de **todas** as páginas (`pages/*/index.dc.html`) |
| JSON-LD `SoftwareApplication` | **feito** | Home + 6 soluções |
| JSON-LD `FAQPage` | **feito** | `solucao-nr-1` (espelha FAQ visível) |
| Cápsulas GEO (“Em uma frase”) | **feito** | Home + 6 soluções + blog + contato |
| Lead form: 3 campos obrigatórios (nome, e-mail, empresa) | **feito** | Tel/mensagem opcionais; interesse com “Fazer diagnóstico gratuito” primeiro |
| Aviso de uso de dados no lead form | **parcial** | Nota no modal; páginas Privacidade/Termos ainda `bloqueado` |
| Headers Vercel para txt/xml | **feito** | `vercel.json` |
| Spec `geo.md` + regras em `AGENTS.md` | **feito** | Este arquivo + AGENTS #13 |

### Ainda bloqueado (precisa dado externo)

| Item | Precisa de | Issue checklist |
|------|------------|-----------------|
| Política de Privacidade + Termos | Texto jurídico + DPO | P0 #2 |
| Números reais no hero (X empresas, Y colaboradores) | Comercial | P1 #6 |
| Fontes nomeadas de estatísticas de mercado | Conteúdo / pesquisa | P1 #7 |
| Página `/precos` com faixas | Comercial | P2 #13 |
| Página `/seguranca` com hosting/SSO/SLA reais | Técnico + jurídico | P1 #9 |
| Cases e depoimentos com métrica | Cliente + comercial | P1 #6 |
| Domínio definitivo no Schema/`llms.txt` | Deploy / DNS | — |
| Reviews B2B Stack / portais | Marketing | P2 #16 |
| Monitoramento mensal dos 20 prompts | Operação | P2 #17 |

### Pendente técnico (pode fazer sem “segredo comercial”)

| Item | Notas |
|------|--------|
| HTML 100% estático em listagens (`sc-for` logos/módulos/stats) | Crawler não expande templates DC; priorizar FAQ e prova crítica (já ok em NR-1 FAQ) |
| Rewrites Vercel para URLs limpas (`/blog`, `/solucao-nr-1`) | **feito** — `vercel.json` + `sitemap.xml` + `llms.txt` + nav absoluta |
| BreadcrumbList schema | Após rotas limpas |
| Article schema no blog | Quando posts forem páginas reais (não só mock JS) |
| Unificar CTA label “Fazer diagnóstico gratuito” em todos os heróis | Parcial — formulário já prioriza diagnóstico |
| Extrair header shared | Reduz drift de nav (não é GEO, mas facilita) |

---

## O que é GEO neste projeto

| Objetivo | Como se mede |
|----------|----------------|
| Ser **recomendado** por IAs em perguntas de compra B2B | Aparece nos 20 prompts de monitoramento |
| Ser **citado com enquadramento correto** | Planilha mensal (posição, texto, concorrentes) |
| Entregar resposta **extraível** | Cápsula + FAQ em HTML estático |
| Manter **autoridade** | Schema, `llms.txt`, cases, comparativos, mídia conquistada |

---

## Princípios (agentes e humanos)

1. **Conteúdo em HTML estático.** Crawlers de IA em geral **não executam JavaScript**.
2. **Cápsula no topo.** Primeiro bloco útil responde a pergunta da página.
3. **Fatos verificáveis.** Sem escassez inventada; números com fonte ou não publicar.
4. **Schema espelha o HTML.** FAQPage só com perguntas renderizadas.
5. **Frescor.** Datas visíveis + `dateModified` quando houver conteúdo editorial.
6. **Terceiros.** 84% das citações vêm de mídia conquistada, não só do site.

### Regras no monorepo

- `AGENTS.md` regra **#13 GEO**
- Sem **badges de título de seção** (regra #12) — ver `specs/brand.md`
- Spec de página: seção **GEO / cápsula** no `_TEMPLATE.md`

---

## Arquivos de foundation (raiz do deploy)

| Arquivo | Função |
|---------|--------|
| `llms.txt` | Resumo da Lector para IAs |
| `robots.txt` | Allow + bots de IA + `Sitemap: /sitemap.xml` |
| `sitemap.xml` | URLs públicas atuais |
| `shared/schema-organization.json` | Cópia de referência do Organization (fonte no HTML) |
| `vercel.json` | Headers de content-type para txt/xml |

**Nota:** `sitemap.xml` usa paths relativos ao host (`/pages/...`). No deploy Vercel, o host final completa a URL. Quando houver domínio definitivo e rewrites limpos, **atualizar loc para URLs absolutas** `https://dominio/...`.

### Bots liberados em `robots.txt`

GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Googlebot, CCBot, Bytespider, Applebot-Extended.

Disallow: `/references/`, `/specs/`, `/design-system/`, `/support.js`.

---

## Schema.org (implementado no HTML)

| Tipo | Páginas |
|------|---------|
| `Organization` | Todas |
| `SoftwareApplication` | home, plataforma-lector, solucao-nr-1, copiloto-vendas, diagnostico-gaps, conteudo-sob-demanda, servicos-especializados |
| `FAQPage` | solucao-nr-1 |

Validar no [Rich Results Test](https://search.google.com/test/rich-results) após deploy com domínio real.

Templates extras (Article, BreadcrumbList): Anexo C no final.

---

## Cápsulas publicadas (texto canônico)

| Página | Cápsula (em produção) |
|--------|------------------------|
| Home | Sub do hero: “Uma só plataforma para criar, ensinar, engajar e medir…” (sem caixa “Em uma frase”) |
| plataforma-lector | **Só nesta página** — sub do hero (não em caixa “Em uma frase”): “A Lector é a plataforma brasileira de educação corporativa com IA nativa: LMS, webconferência, autoria e compliance NR-1 para provar resultado de treinamento — não só engajamento.” |
| solucao-nr-1 | Cápsula “Em uma frase” removida do hero (FAQ + seções cobrem o conteúdo crítico) |
| copiloto-vendas | O Copiloto de Vendas da Lector é a IA que prepara, acompanha e evolui cada vendedor — antes, durante e depois da reunião — com trilhas e certificação para reduzir ramp-up. |
| diagnostico-gaps | A Lector diagnostica gaps por habilidade, entrega trilha cirúrgica e certifica o resultado — para provar impacto em receita ou custo, não só engajamento de curso. |
| conteudo-sob-demanda | A Lector produz cursos, vídeos e materiais sob demanda com qualidade editorial, prazo previsível e publicação na plataforma — do briefing à medição. |
| servicos-especializados | Os Serviços Especializados da Lector apoiam T&D, conteúdo e gestão do conhecimento em todas as fases — da universidade corporativa à operação do dia a dia. |
| contato | Fale com um especialista Lector por formulário ou e-mail (contato@lector.com.br) para demonstração, diagnóstico de maturidade T&D ou consultoria de educação corporativa. |
| blog | O blog da Lector publica guias e ideias sobre educação corporativa, NR-1, LMS, IA e T&D para RH e lideranças no Brasil. |

Markup: `<p class="geo-capsule" data-geo-capsule="">` (variante `geo-capsule--dark` em heróis escuros).

---

## Conteúdo futuro que as IAs pedem

| Página / hub | Status |
|--------------|--------|
| `/precos` | planned — precisa comercial |
| `/seguranca` | planned — precisa técnico/jurídico |
| Comparativos (Twygo, Docebo, etc.) | planned |
| Hub `/nr-1` + frescor no blog | planned |
| Cases quantificados | planned |

---

## Monitoramento — 20 prompts (mensal)

Rodar em ChatGPT, Gemini, Claude e Perplexity. Registrar: aparece? posição? enquadramento? concorrentes?

1. melhor plataforma de treinamento corporativo do Brasil  
2. melhor LMS corporativo com IA em português  
3. plataforma para atender a NR-1 riscos psicossociais  
4. como cumprir a NR-1 de riscos psicossociais na minha empresa  
5. software para inventário de riscos psicossociais PGR  
6. alternativas ao Docebo no Brasil  
7. Lector vale a pena? avaliações  
8. Twygo ou Lector, qual escolher?  
9. plataforma de educação corporativa com webconferência própria  
10. LMS para hospitais / cooperativas / indústria *(3 variações)*  
11. quanto custa uma plataforma LMS por colaborador  
12. plataforma de treinamento que comprova resultado e não só engajamento  
13. software de compliance e treinamento integrado  
14. ferramenta de autoria de cursos com IA em português  
15. plataforma para universidade corporativa  
16. como treinar gestores para riscos psicossociais NR-1  
17. melhor plataforma de onboarding de colaboradores  
18. LMS com relatórios para auditoria e compliance  
19. plataforma de desenvolvimento de equipes comerciais  
20. software de gestão do conhecimento corporativo Brasil  

---

## Checklist do agente (merge)

- [ ] Conteúdo crítico legível **sem JS** (cápsula, FAQ se houver)  
- [ ] Cápsula presente em páginas de solução  
- [ ] Schema Organization no helmet (não remover)  
- [ ] Title + meta description  
- [ ] Sem “vagas limitadas” / escassez sem lastro  
- [ ] Imagens com `alt`; nomes de arquivo sem espaço  
- [ ] Se rota nova: `sitemap.xml` + `llms.txt` + `specs/sitemap.md` + `content/site.json`  
- [ ] Spec da página com bloco GEO / cápsula  

---

## Próximos passos recomendados (ordem)

1. **Jurídico:** Privacidade + Termos + link no footer e no lead form  
2. **Comercial:** 3 números + faixas de preço + aprovação de fontes  
3. **Deploy:** domínio definitivo → atualizar `url`/`logo` no Schema e `llms.txt`  
4. **Páginas:** `/seguranca` e `/precos`  
5. **Operação:** planilha dos 20 prompts (baseline mês 1)  

---

## Anexo — JSON-LD (referência)

Organization e SoftwareApplication já estão no HTML das páginas. Cópia de Organization: `shared/schema-organization.json`.

### FAQPage

Só em páginas com FAQ **estático** no markup. Espelhar 1:1 as perguntas visíveis (modelo: `solucao-nr-1`).

### Article (blog futuro)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[título]",
  "description": "[cápsula]",
  "datePublished": "AAAA-MM-DD",
  "dateModified": "AAAA-MM-DD",
  "author": { "@type": "Person", "name": "[autor real]" },
  "publisher": { "@type": "Organization", "name": "Lector" }
}
```

---

## Relação com o repositório

| Artefato | Função |
|----------|--------|
| `specs/geo.md` | Este documento — contrato + status |
| `specs/sitemap.md` | Rotas e status de produto |
| `specs/pages/<slug>.md` | Cápsula e pergunta-alvo por página |
| `AGENTS.md` | Regras #12 (sem badge de seção) e #13 (GEO) |
| `llms.txt` / `robots.txt` / `sitemap.xml` | Foundation crawl |
| `references/raw/Checklist-Site-Lector-GEO-Conversao.pdf` | Checklist v6 original |
