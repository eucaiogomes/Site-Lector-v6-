# Marca — Lector

Fonte canônica de tokens: `design-system/tokens/` e `design-system/readme.md`.

**Última revisão:** 2026-07-17

## Cores oficiais

| Papel | Hex | Token |
|-------|-----|--------|
| Laranja (primária) | `#F66B0A` | `--brand` / `--orange-500` |
| Navy (secundária) | `#00204D` | `--accent-navy` / `--navy-800` |
| Ink profundo | `#001026` | `--ink-950` |
| Paper (fundo claro) | `#FBFAF7` | `--paper` / `--surface-page` |

Tema padrão: **claro arejado**. Seções hero/premium usam **dark navy** (`--ink-950` / `--navy-*`).

CTA final laranja chapado (`--brand`) aparece na home e em vários fechamentos.

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

### Padrões de página no site

| Variante | Uso | Nav |
|----------|-----|-----|
| Dark premium | Home (hero full-bleed + header glass) | Dark pill |
| Light sticky | Blog e páginas de solução | `.lec-nav` clara |
| Hero dark + corpo paper | Soluções (plataforma, NR-1, copiloto, etc.) | Light sticky |

## Logos

| Arquivo | Uso |
|---------|-----|
| `assets/brand/logo-lector.svg` | Fundo claro (laranja + navy) |
| `assets/brand/logo-lector-light.svg` | Fundo escuro (texto claro) — header home, footers |
| `assets/brand/logo-mark.svg` | Swoosh isolado |
| `assets/brand/orbit.svg` | Motivo decorativo de seção |

## Copy (voz)

- Idioma: **PT-BR**  
- Tratamento: **você**  
- Exemplos de voz: “com quem entende”, “Estética pensada. Conversão real.”, “O poder de aprender de verdade.”  
- Evitar: “IA genérica”, superlativos vazios, emoji  

### Títulos de seção (obrigatório)

**Não use badges / eyebrows / kickers** acima do H2 (rótulo em CAIXA ALTA, pill com bolinha, “§01”, etc.).

O tema da seção deve estar **no próprio título**:

| Evitar | Preferir |
|--------|----------|
| Badge “Como funciona” + H2 “Do diagnóstico à evidência…” | H2 “Como funciona: do diagnóstico à evidência, em três passos.” |
| Badge “Ciclo completo” + H2 “Conformidade NR-1…” | H2 “Ciclo completo de conformidade NR-1 na mesma plataforma…” |
| Badge “Visibilidade” + H2 “Conformidade que o time…” | H2 “Visibilidade e conformidade que o time e o auditor entendem.” |

**Exceção:** chips de status **dentro** de mock de produto/UI (ex.: Completo, Pronto, 892) — não são títulos de seção.

### CTAs recorrentes

| Label | Uso típico |
|-------|------------|
| Falar com especialista | Nav + CTA final |
| Agendar demonstração | Product spotlights / IA |
| Fazer diagnóstico gratuito | Announcement + plataforma |
| Solicitar orçamento | Conteúdo sob demanda |
| Explore a plataforma | Hero home |

## Contato institucional (copy)

- E-mail: `contato@lector.com.br`  
- Horário: seg. a sex., 9h–18h  
- Painel cliente: `https://app.lector.com.br/painel`  

## Não fazer

- Gradientes decorativos em excesso (marca é cor chapada; gradiente só em sheen/glow pontual)  
- Emoji como ícone  
- Hex soltos fora dos tokens  
- Logo esticada ou sem área de respiro  
- Duplicar logos fora de `assets/brand/`  
- **Badges de título de seção** (eyebrow/kicker/pill acima do H2) — ver tabela acima  

