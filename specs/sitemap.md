# Sitemap — Lector Site

Atualize este arquivo sempre que criar, renomear ou descontinuar uma página.

## Status

| Status | Significado |
|--------|-------------|
| `live` | Implementada e linkável |
| `wip` | Em construção |
| `planned` | Spec ou intenção, sem código ainda |
| `archived` | Mantida só como referência |

## Mapa

| Rota (slug) | Título | Spec | Código | Status |
|-------------|--------|------|--------|--------|
| `home` | Home | `specs/pages/home.md` | `pages/home/index.dc.html` | `live` |
| `solucoes` | Nossas Soluções | — | — | `planned` |
| `clientes` | Clientes | — | — | `planned` |
| `blog` | Blog | — | — | `planned` |
| `contato` | Contato | — | — | `planned` |
| `servicos` | Serviços | — | — | `planned` |

> Slugs planejados alinham com o DS (`lector-site`) e o nav da home. Priorize conforme o roadmap do produto.

## Navegação principal (alvo)

```
Home → Soluções → Blog → Clientes → Contato
CTA: Comece agora / Diagnóstico
```

Fonte de dados operacional: `content/site.json`.

## Âncoras na home (hoje)

| Âncora | Seção |
|--------|--------|
| `#top` | Hero |
| `#plataforma` | Soluções / plataforma |
| `#capacidades` | (nav Blog — revisar) |
| `#numeros` | Clientes / números |
| `#depoimento` | Depoimento |
| `#contato` | Formulário / CTA |
| `#entrar` | Login (externo ou placeholder) |

## Como registrar página nova

1. Linha na tabela acima
2. Entry em `content/site.json` → `nav` e `pages`
3. Spec + pasta em `pages/`
