# Página: Serviços Especializados

| Campo | Valor |
|-------|--------|
| **Slug** | `servicos-especializados` |
| **Status** | `wip` |
| **Código** | `pages/servicos-especializados/index.dc.html` (~630 linhas) |
| **Rota pública** | `/servicos-especializados` |
| **Última atualização** | 2026-07-17 |
| **Nav** | Nossas Soluções → Serviços Especializados (ativo) |
| **Lead form** | `shared/lead-form` |
| **Variante de header** | `light` |

---

## Objetivo

Converter empresas que precisam de consultoria e operação de educação corporativa — além (ou junto) da plataforma.

## Público

- Gestores de T&D / RH em estruturação ou evolução  
- Times que precisam de conteúdo e universidade corporativa  
- Empresas que querem repensar gestão do conhecimento  

## Mensagem principal

**Headline:** Especialistas ao seu lado, em *cada fase*.  
**Sub:** Apoio em estruturação, conteúdo e estratégia — da universidade corporativa à gestão do conhecimento.  

## Seções

| # | ID | Nome | Notas |
|---|-----|------|--------|
| 0 | — | Promo + nav | Item ativo |
| 1 | `hero` | Headline + CTAs | |
| 2 | `servicos` | 3 pilares | `#td`, `#conteudo`, `#gc` nos artigos |
| 3 | `fases` | Do diagnóstico à operação | |
| 4 | `cta` | Falar com consultor | |
| 5 | — | Footer | |

## CTAs

| Label | Destino |
|-------|---------|
| Falar com consultor | Lead form (`interest`: `servicos`) |
| Conhecer a plataforma | `../plataforma-lector/index.dc.html` |

## SEO

| Campo | Valor |
|-------|--------|
| Title | Serviços Especializados \| Consultoria Lector |
| Meta description | Especialistas ao seu lado em cada fase: T&D, conteúdo e gestão do conhecimento. |

**Implementação:** title e meta presentes (meta no HTML pode ser ligeiramente mais longa).

## Design

- Prefixo CSS: `se-*`  
- Tokens DS; Lucide (`briefcase`)  
- Página mais enxuta do dropdown  

## Títulos (sem badge de seção)

- “Seja qual for a necessidade: apoiamos em todas as fases do projeto.”  
- “Apoio em todas as fases: do diagnóstico à operação”  


## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | Que consultoria a Lector oferece além da plataforma? |
| Cápsula | Os Serviços Especializados da Lector apoiam T&D, conteúdo e gestão do conhecimento em todas as fases — da universidade corporativa à operação do dia a dia. |
| Schema | Organization + SoftwareApplication |

## Critérios de aceite

- [x] Spec + página + nav  
- [x] Lead form nos CTAs  
- [x] Sem badges de título de seção  
- [x] SEO no helmet  
- [ ] Mídia / cases se comercial pedir  
