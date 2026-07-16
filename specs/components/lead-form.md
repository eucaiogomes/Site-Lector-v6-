# Componente: Lead form modal

| Campo | Valor |
|-------|--------|
| **Código** | `shared/lead-form.js` + `shared/lead-form.css` |
| **Status** | `live` |
| **Última atualização** | 2026-07-16 |

## Onde é usado

Todas as páginas em `pages/*/index.dc.html` (incluído no helmet).

## Comportamento

- Modal **branco** com identidade Lector (logo `assets/brand/logo-lector.svg`, faixa brand, CTA laranja)
- Abre ao clicar em CTAs: “Falar com especialista”, “Agendar demonstração”, links `#contato` / `#cta`, classes de botão primário, announcement de diagnóstico
- Fecha com X, backdrop ou Escape
- Sucesso local (sem backend ainda — log no console)

## Como incluir

```html
<link rel="stylesheet" href="../../shared/lead-form.css">
<script src="../../shared/lead-form.js" data-base="../.."></script>
```

## Props / API

| API | Uso |
|-----|-----|
| `window.__LectorLeadForm.open({ interest })` | Abre o modal |
| `window.__LectorLeadForm.close()` | Fecha |
| `data-open-lead` | Força abertura no elemento |
| `data-lead-interest` | Pré-seleciona o select de interesse |
| `data-no-lead` | Não intercepta o clique |

Valores de `interest`: `demonstracao`, `especialista`, `diagnostico`, `conteudo`, `nr1`, `vendas`, `outro`.

## Campos do formulário

Nome, empresa, e-mail, telefone/WhatsApp, interesse, mensagem (opcional).

## Não fazer

- Duplicar markup do modal em cada página
- Linkar assets em `references/`
- Enviar dados a endpoint sem HTTPS / sem consentimento documentado
