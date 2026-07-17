# Componente: Lead form modal

| Campo | Valor |
|-------|--------|
| **Código** | `shared/lead-form.js` + `shared/lead-form.css` |
| **Status** | `live` |
| **Última atualização** | 2026-07-17 |

## Onde é usado

Todas as páginas em `pages/*/index.dc.html` (incluído no helmet).

A página **Contato** também tem formulário **embutido** (não é o modal); o modal continua disponível para CTAs que o disparem.

## Comportamento

- Modal **branco** com identidade Lector (logo `assets/brand/logo-lector.svg`, faixa brand, CTA laranja)
- Abre ao clicar em CTAs de conversão, classes de botão primário, announcement de diagnóstico, ou links `#contato` / `#cta`
- Fecha com X, backdrop ou Escape
- Sucesso local (sem backend ainda — log no console)

## Como incluir

```html
<link rel="stylesheet" href="../../shared/lead-form.css">
<script src="../../shared/lead-form.js" data-base="../.."></script>
```

`data-base` aponta para a raiz do site (a partir de `pages/<slug>/` = `../..`).

## Props / API

| API | Uso |
|-----|-----|
| `window.__LectorLeadForm.open({ interest })` | Abre o modal |
| `window.__LectorLeadForm.close()` | Fecha |
| `data-open-lead` | Força abertura no elemento |
| `data-lead-interest` | Pré-seleciona o select de interesse |
| `data-no-lead` | Não intercepta o clique |

### Valores de `interest`

| value | Label no select |
|-------|-----------------|
| `demonstracao` | Agendar demonstração |
| `especialista` | Falar com especialista |
| `diagnostico` | Diagnóstico de maturidade T&D |
| `conteudo` | Criação de conteúdo sob demanda |
| `nr1` | Solução NR-1 |
| `vendas` | Copiloto de Vendas |
| `servicos` | Serviços Especializados |
| `outro` | Outro assunto |

Heurística de texto no clique (ex.: botão com “demonstr”) também preenche o select.

## Campos do formulário

| Campo | Obrigatório |
|-------|-------------|
| Nome | sim |
| Empresa | sim |
| E-mail corporativo | sim |
| Telefone / WhatsApp | não |
| Interesse | sim (select; default “Fazer diagnóstico gratuito”) |
| Mensagem | não |

Nota LGPD no rodapé do modal (Privacidade/Termos ainda a publicar).

## Não fazer

- Duplicar markup do modal em cada página
- Linkar assets em `references/`
- Enviar dados a endpoint sem HTTPS / sem consentimento documentado
- Remover o include do helmet em página com CTAs de conversão

## Evolução

- Endpoint de envio + consentimento LGPD validado com jurídico  
- Unificar validação com o form da página Contato  
