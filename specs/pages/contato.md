# Página: Contato

| Campo | Valor |
|-------|--------|
| **Slug** | `contato` |
| **Status** | `live` |
| **Código** | `pages/contato/index.dc.html` (~760 linhas) |
| **Rota pública** | `/contato` |
| **Última atualização** | 2026-07-17 |
| **Lead form** | formulário embutido + modal `shared/lead-form` disponível |
| **Nav** | Item principal “Contato” |
| **Variante de header** | `light` (`.lec-nav`) |

---

## Objetivo

Canal único de conversão: falar com especialista, pedir demo ou diagnóstico, com formulário e dados de contato.

## Público

- Visitantes prontos para conversar (fim do funil)  
- Quem chega pelo item Contato do menu  

## Mensagem principal

**Headline:** Contato: vamos conversar sobre o aprendizado da *sua empresa*.  
**Nota de título:** sem kicker/badge acima do H1.
**Sub:** Conte o desafio. Um especialista Lector responde com o próximo passo certo — demonstração, diagnóstico ou consultoria.  

## Seções

| # | ID | Nome | Notas |
|---|-----|------|--------|
| 0 | — | Nav | Contato; CTA solid → `#form` |
| 1 | `hero` | Hero dark | Headline + sub |
| 2 | `form` | Formulário + canais | Form + aside (e-mail, painel, horário, “o que acontece depois”) |
| 3 | — | Footer | Padrão ink-950 |

> “O que acontece depois” está no aside do form (`.ct-next`), não em seção separada.

## CTAs / formulário

**Campos:** nome, empresa, e-mail, telefone, interesse, mensagem (opcional).  

**Interesses no select:** demonstração, especialista, diagnóstico, conteúdo, NR-1, vendas, serviços, outro.

**Envio:** validação front-end + mensagem de sucesso (backend a integrar).

**Canais:**  
- `contato@lector.com.br`  
- Painel: `https://app.lector.com.br/painel`  
- Horário: seg. a sex., 9h–18h  

## SEO

| Campo | Valor |
|-------|--------|
| Title | Contato \| Fale com a Lector |
| Meta description | Fale com um especialista Lector. Agende demonstração, diagnóstico ou consultoria de educação corporativa. |

**Implementação:** title e meta presentes.

## Design

- Hero dark + corpo paper  
- Prefixo CSS: `ct-*`  
- Tokens DS; Lucide  


## GEO / cápsula

| Campo | Valor |
|-------|--------|
| Pergunta-alvo | Como falar com a Lector? |
| Cápsula | Fale com um especialista Lector por formulário ou e-mail (contato@lector.com.br) para demonstração, diagnóstico de maturidade T&D ou consultoria de educação corporativa. |
| Schema | Organization |

## Critérios de aceite

- [x] Spec + página  
- [x] Link Contato no nav de todas as páginas  
- [x] Paths `../../` e tokens DS  
- [x] Title + meta description  
- [ ] Endpoint real de envio  
