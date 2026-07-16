# Como adicionar uma página nova

Fluxo padrão para humanos e agentes. Siga a ordem.

## 1. Definir o slug

- minúsculas, hífen se precisar: `solucoes`, `trabalhe-conosco`
- sem acento no nome de pasta
- único no sitemap

## 2. Escrever a spec

```bash
cp specs/pages/_TEMPLATE.md specs/pages/<slug>.md
```

Preencha: objetivo, público, seções, CTAs, SEO, estados, fora de escopo.

**Não comece o HTML sem a spec mínima** (pelo menos objetivo + seções + CTA).

## 3. Criar a pasta da página

```text
pages/<slug>/
  index.dc.html
  page.css      # opcional
  page.js       # opcional
```

Copie o boilerplate de paths de `pages/home/index.dc.html` (helmet + design-system).

## 4. Mídia (se houver)

```text
assets/media/<slug>/
```

Imagens otimizadas; nomes descritivos (`hero-desktop.webp`, não `IMG_0032.png`).

## 5. Registrar

- [ ] `specs/sitemap.md` — linha com status `wip` → `live`
- [ ] `content/site.json` — `pages` + `nav` se for linkável
- [ ] Header/footer da home (ou shared) se a nav for estática no HTML

## 6. Implementar por seções

Ordem sugerida:

1. Helmet + tokens + shell (header/footer)
2. Hero
3. Seções de conteúdo (uma de cada vez)
4. CTA / formulário
5. Polimento mobile + a11y básica

Comente `<!-- SECTION: nome -->` em cada bloco.

## 7. Checklist de entrega

- [ ] Spec alinhada com o que foi construído
- [ ] Paths `../../` corretos
- [ ] Só tokens do DS para cor/tipo/espaço
- [ ] Copy PT-BR, tom Lector, sem emoji
- [ ] CTAs com destino real ou `#` documentado
- [ ] Sem dependência de `references/`
- [ ] Sitemap + `site.json` atualizados

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
| Nav hardcode divergente do JSON | Manter `content/site.json` como fonte |
