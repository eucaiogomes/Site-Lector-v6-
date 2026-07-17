# Página: Clientes

| Campo | Valor |
|-------|--------|
| **Slug** | `clientes` |
| **Status** | `wip` |
| **Código** | `pages/clientes/index.dc.html` |
| **Rota pública** | `/clientes` |
| **Última atualização** | 2026-07-17 |
| **Lead form** | `shared/lead-form` (interest `demo`) |
| **Nav** | Item principal **Clientes** (ativo) |
| **Variante de header** | `light` (`.lec-nav` + drawer `.lec-mnav`) |

---

## Objetivo

Converter visitantes B2B mostrando **o que a empresa ganha** ao ser cliente Lector — atendimento, suporte, parcerias reais e logos com destaque — **sem inventar depoimentos novos**.

## Público

- Gestores de RH / T&D e liderança avaliando fornecedor  
- Decisores que pedem prova social e SLA de suporte  
- Visitantes que clicam em “Clientes” no menu  

## Mensagem principal

**Headline:** Empresas que aprendem com a Lector.  
**Sub:** Plataforma, atendimento e suporte para provar resultado de capacitação — com parcerias de longa data e time próximo do seu contexto.  

## Seções (ordem)

| # | ID | Nome | Conteúdo / notas |
|---|-----|------|------------------|
| 0 | — | Promo + nav light | Item Clientes ativo |
| 1 | `hero` | Hero | Headline + sub + CTAs (demo / sou cliente) |
| 2 | `logos` | Quem confia | Grade de logos **grandes** (`assets/clients/`) |
| 3 | `ganhos` | O que você ganha | 4–6 benefícios concretos de ser cliente |
| 4 | `suporte` | Atendimento e suporte | Pilares: onboarding, suporte, CSM, evolução |
| 5 | `cases` | Parcerias em evidência | Microsoft + Philips (conteúdo já público na home — sem quotes inventadas) |
| 6 | `cta` | CTA final | Falar com especialista |
| 7 | — | Footer | Padrão ink-950 |

> Sem badges de título de seção. Sem depoimentos fabricados.

## CTAs

| Label | Destino | Tipo |
|-------|---------|------|
| Falar com especialista | Lead form (`demo`) | primary |
| Sou cliente | `https://lector.live` | secondary |
| Conhecer a plataforma | `/pages/plataforma-lector/index.dc.html` | ghost |

## Conteúdo e dados

- Logos: `assets/clients/*.png` (lista em `content/site.json` → `clients`)  
- Cases: mesmos fatos da home (`#depoimento`) — Microsoft LATAM educação; Philips +15 anos  
- Suporte: e-mail `contato@lector.com.br`, horário seg–sex 9h–18h (já em `llms.txt` / contato)  

## SEO

| Campo | Valor |
|-------|--------|
| Title | Clientes e parcerias \| Lector |
| Meta description | Veja o que sua empresa ganha como cliente Lector: suporte próximo, parcerias de longa data e logos de quem já aprende com a plataforma. |

## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | Quais empresas usam a Lector e o que o cliente ganha? |
| Cápsula | Removida do hero; FAQ/static seções cobrem prova |
| Schema | Organization |

## Design

- Tema claro paper; hero navy suave  
- Prefixo CSS: `cl-`  
- Logos em cards grandes (não marquee pequeno)  
- Sem emoji; Lucide  

## Critérios de aceite

- [x] Spec + página  
- [x] Paths absolutos DS/assets/shared  
- [x] Lead form nos CTAs  
- [x] Nav Clientes aponta para esta página em todas as rotas  
- [x] Sem depoimentos inventados  
- [x] Logos em destaque  
- [x] vercel rewrite + sitemap + site.json + llms.txt  
