# Marca — Lector

Fonte canônica de tokens: `design-system/tokens/` e `design-system/readme.md`.

## Cores oficiais

| Papel | Hex | Token |
|-------|-----|--------|
| Laranja (primária) | `#F66B0A` | `--brand` / `--orange-500` |
| Navy (secundária) | `#00204D` | `--accent-navy` / `--navy-800` |
| Ink profundo | `#001026` | `--ink-950` |
| Paper (fundo claro) | `#FBFAF7` | `--paper` / `--surface-page` |

Tema padrão: **claro arejado**. Seções hero/premium usam **dark navy** (`--ink-950` / `--navy-*`).

## Tipografia

| Uso | Família | Token |
|-----|---------|--------|
| Display / H1 | Sora 700–800 | `--font-display` |
| UI e corpo | Plus Jakarta Sans | `--font-sans` |
| Preços, stats, código | JetBrains Mono | `--font-mono` |

**Padrão editorial:** mistura de pesos no display — palavra-chave em **bold** ou *itálico laranja*.

## Forma e UI

- Botões **pill** por padrão; CTA primário com glow laranja
- Cards bento com radius generoso (`--radius-xl` / `2xl`)
- Motivo gráfico: **swoosh orbital** (`assets/brand/orbit.svg`, `logo-mark.svg`)
- Ícones: **Lucide** (linha), ~1.85px — **sem emoji**
- Movimento: ease-out / spring, 140–380ms; hover = lift sutil

## Logos

| Arquivo | Uso |
|---------|-----|
| `assets/brand/logo-lector.svg` | Fundo claro (laranja + navy) |
| `assets/brand/logo-lector-light.svg` | Fundo escuro (texto claro) |
| `assets/brand/logo-mark.svg` | Swoosh isolado |
| `assets/brand/orbit.svg` | Motivo decorativo de seção |

## Copy (voz)

- Idioma: **PT-BR**
- Tratamento: **você**
- Eyebrows em CAIXA ALTA + tracking largo
- Exemplos de voz: “com quem entende”, “Estética pensada. Conversão real.”

## Não fazer

- Gradientes decorativos em excesso (marca é cor chapada; gradiente só em sheen/glow pontual)
- Emoji como ícone
- Hex soltos fora dos tokens
- Logo esticada ou sem área de respiro
