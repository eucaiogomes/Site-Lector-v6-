# Página: Contato

| Campo | Valor |
|-------|--------|
| **Slug** | `contato` |
| **Status** | `live` |
| **Código** | `pages/contato/index.dc.html` |
| **Rota pública** | `/contato` |
| **Última atualização** | 2026-07-16 |
| **Nav** | Contato (item principal) |
| **Lead form** | formulário embutido + `shared/lead-form` nos CTAs |

---

## Objetivo

Canal único de conversão: falar com especialista, pedir demo ou diagnóstico, com formulário e dados de contato.

## Público

- Visitantes prontos para conversar (fim do funil)
- Quem chega pelo item Contato do menu

## Mensagem principal

**Headline:** Vamos conversar sobre o aprendizado da sua empresa.  
**Sub:** Conte o desafio. Um especialista Lector responde com o próximo passo certo — demo, diagnóstico ou consultoria.

## Seções

| # | ID | Nome |
|---|-----|------|
| 0 | — | Nav (Contato ativo) |
| 1 | `hero` | Headline + sub |
| 2 | `form` | Formulário + canais (e-mail, app, horário) |
| 3 | `proximos` | O que acontece depois do envio |
| 4 | — | Footer |

## CTAs / formulário

Campos: nome, empresa, e-mail, telefone, interesse, mensagem.  
Envio: validação front-end + mensagem de sucesso (backend a integrar).

## SEO

| Campo | Valor |
|-------|--------|
| Title | Contato \| Fale com a Lector |
| Meta description | Fale com um especialista Lector. Agende demonstração, diagnóstico ou consultoria de educação corporativa. |

## Critérios de aceite

- [x] Spec + página
- [x] Link Contato no nav de todas as páginas
- [x] Paths `../../` e tokens DS
- [ ] Endpoint real de envio
