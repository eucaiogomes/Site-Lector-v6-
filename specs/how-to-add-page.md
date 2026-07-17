# Como adicionar uma página nova

Fluxo padrão para humanos e agentes. Siga a ordem.

## 1. Definir o slug

- minúsculas, hífen se precisar: `solucoes`, `trabalhe-conosco`
- sem acento no nome de pasta
- único no sitemap e em `content/site.json`

## 2. Escrever a spec

```bash
cp specs/pages/_TEMPLATE.md specs/pages/<slug>.md
```

Preencha: objetivo, público, seções, CTAs, SEO, estados, fora de escopo, lead form, item de nav.

**Não comece o HTML sem a spec mínima** (pelo menos objetivo + seções + CTA).

## 3. Criar a pasta da página

```text
pages/<slug>/
  index.dc.html
  page.css      # opcional (hoje o CSS costuma ir no helmet)
  page.js       # opcional
```

### Escolher boilerplate

| Tipo de página | Copiar de | Header |
|----------------|-----------|--------|
| Marketing / solução (nav clara) | `pages/blog/` ou `pages/servicos-especializados/` | `.lec-nav` light + mobile drawer |
| Landing dark full-bleed | `pages/home/` | dark glass (caso especial) |

Inclua sempre:

- tokens + `design-system/styles.css` + `_ds_bundle.js`
- Lucide CDN
- **`shared/lead-form.css` + `shared/lead-form.js`** (`data-base="../.."`)
- Logo em `../../assets/brand/`
- `<title>` e `<meta name="description">` no helmet
- `lang="pt-BR"` no `<html>` quando possível

## 4. Mídia (se houver)

```text
assets/media/<slug>/
```

Imagens otimizadas; nomes descritivos (`hero-desktop.webp`, não `IMG_0032.png`).  
Até a mídia final, deixe `.gitkeep` e use mocks HTML se necessário.

## 5. Registrar

- [ ] `specs/sitemap.md` — linha com status `wip` (ou `planned` → `wip`)
- [ ] `content/site.json` — `pages` + `nav` se for linkável (`href`: `/pages/<slug>/index.dc.html`)
- [ ] `vercel.json` — rewrite `"source": "/<slug>"` → `pages/<slug>/index.dc.html`
- [ ] `sitemap.xml` + `llms.txt` se for página pública
- [ ] **Todas** as páginas em `pages/*/index.dc.html` — item no dropdown/nav com `href="/pages/<slug>/index.dc.html"` (nunca `../slug/…` relativo)
- [ ] Spec da página: status, critérios de aceite

## 6. Implementar por seções

Ordem sugerida:

1. Helmet + tokens + shell (header/footer)
2. Hero
3. Seções de conteúdo (uma de cada vez)
4. CTA / formulário
5. Polimento mobile + a11y básica

Comente `<!-- SECTION: nome -->` em cada bloco.  
Mantenha a tabela de seções da spec alinhada ao HTML.

## 7. Checklist de entrega

- [ ] Spec alinhada com o que foi construído
- [ ] Paths `../../` corretos (DS, assets, shared)
- [ ] Lead form no helmet se houver CTAs de conversão
- [ ] Só tokens do DS para cor/tipo/espaço
- [ ] Copy PT-BR, tom Lector, sem emoji
- [ ] CTAs abrem o modal (ou destino documentado)
- [ ] Title + meta description no helmet
- [ ] Schema Organization no helmet (copiar de outra página; ver `specs/geo.md`)
- [ ] Cápsula GEO no topo se for página de marketing/solução
- [ ] Atualizar `sitemap.xml` e `llms.txt` se for rota pública
- [ ] Sem “vagas limitadas” / escassez inventada
- [ ] Sem dependência de `references/`
- [ ] Sem arquivos soltos na raiz do repo
- [ ] Sitemap + `site.json` atualizados
- [ ] Nav sincronizada em **todas** as páginas HTML

## Exemplo rápido

```text
slug: clientes

specs/pages/clientes.md
pages/clientes/index.dc.html
assets/media/clientes/   (opcional — logos já estão em assets/clients/)
```

## Anti-padrões

| Evite | Prefira |
|-------|---------|
| HTML solto na raiz | `pages/<slug>/` |
| Spec só no chat | `specs/pages/<slug>.md` |
| Copiar dump de `references/` | Reimplementar com DS Lector |
| Página de 4k linhas sem seções | Seções comentadas + CSS local se preciso |
| Nav hardcode divergente do JSON | Atualizar `site.json` **e** todos os HTMLs |
| Lixo na raiz (vídeos, HTML solto) | `references/raw/` ou `assets/media/<slug>/` |
| Marcar `live` com placeholders de preço/número sem aviso | Manter `wip` ou marcar placeholders como “a confirmar” |
| Badge / eyebrow em CAIXA ALTA acima do H2 | Incorporar o tema **no título** da seção (`specs/brand.md`) |
