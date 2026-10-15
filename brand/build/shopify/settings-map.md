# Tema Shopify ↔ tokens da More

> **Aplicar depois do `shopify theme pull`.** O time ainda não tem acesso à loja: nada aqui foi
> testado no tema real. Primeiro baixe o tema (`shopify theme pull`), depois edite numa cópia
> (tema não publicado) e compare com o site ao vivo antes de publicar.

Fonte dos valores: `brand/tokens/*.tokens.json` → `npm run tokens:build` → `brand/build/css/more-tokens.css`.
Regra: **cores da marca e medidas do menu ficam fixas no tema** (travadas). Só os destaques
`ciano-destaque` e `cart-accent` viram configuração da loja (`settings_schema.snippet.json`).

## Mapa das variáveis do `:root` do tema

| Variável do tema | Valor no tema | Token | Variável gerada | Setting proposto | Decisão |
|---|---|---|---|---|---|
| `--preto` | #2d211e | `color.preto` | `--color-preto` | `color_preto` (color) | fixo |
| `--preto-01` | rgba(1,1,1,.01) | `color.alpha.preto-01` | `--color-alpha-preto-01` | `color_preto_01` (color) | fixo |
| `--preto-03` | #00000003 | `color.alpha.preto-03` | `--color-alpha-preto-03` | `color_preto_03` (color) | fixo |
| `--preto-10` | #2d211e1a | `color.alpha.preto-10` | `--color-alpha-preto-10` | `color_preto_10` (color) | fixo |
| `--preto-80` | #2d211ecc | `color.alpha.preto-80` | `--color-alpha-preto-80` | `color_preto_80` (color) | fixo |
| `--cinza-escuro` | #5d554f | `color.cinza-escuro` | `--color-cinza-escuro` | `color_cinza_escuro` (color) | fixo |
| `--cinza-medio` | #686868 | `color.cinza-medio` | `--color-cinza-medio` | `color_cinza_medio` (color) | fixo |
| `--cinza-texto` | #999898 | `color.cinza-texto` | `--color-cinza-texto` | `color_cinza_texto` (color) | fixo (declarado, sem uso; candidato a remover) |
| `--cinza-claro` | #bdbdbd | `color.cinza-claro` | `--color-cinza-claro` | `color_cinza_claro` (color) | fixo |
| `--cinza-overlay` | rgba(182,189,191,.8) | `color.alpha.cinza-overlay` | `--color-alpha-cinza-overlay` | `color_cinza_overlay` (color) | fixo |
| `--off-white` | #e5e1db | `color.off-white` | `--color-off-white` | `color_off_white` (color) | fixo |
| `--off-white-transparent` | off-white a 0% | `color.alpha.off-white-0` | `--color-alpha-off-white-0` | `color_off_white_0` (color) | fixo |
| `--ciano-destaque` | #8bc0d0 | `color.ciano-destaque` | `--color-ciano-destaque` | `color_ciano_destaque` (color) | **configurável** |
| `--marrom` | #574d4b | `color.marrom` | `--color-marrom` | `color_marrom` (color) | fixo |
| `--marrom-80` | #2d211ecc | `color.alpha.preto-80` (mesmo valor de `--preto-80`) | `--color-alpha-preto-80` | — (usar `color_preto_80`) | fixo; nome enganoso, é preto |
| `--marrom-60` | #b4b8b999 | `color.alpha.cinza-60` | `--color-alpha-cinza-60` | `color_cinza_60` (color) | fixo; nome enganoso, é cinza azulado |
| `--branco` | #ffffff | `color.branco` | `--color-branco` | `color_branco` (color) | fixo |
| `--branco-30` | branco a 30% | `color.alpha.branco-30` | `--color-alpha-branco-30` | `color_branco_30` (color) | fixo (declarado, sem uso) |
| `--cart-accent` | #c1cfd6 | `color.cart-accent` | `--color-cart-accent` | `color_cart_accent` (color) | **configurável** |
| `--erro` | #e07a5f | `color.erro` | `--color-erro` | `color_erro` (color) | fixo (cor de feedback) |
| `--blur-soft` | 10px | `blur.soft` | `--blur-soft` | `range_blur_soft` (range 0–40 px) | fixo |
| `--blur-medium` | 13px | `blur.medium` | `--blur-medium` | `range_blur_medium` (range 0–40 px) | fixo |
| `--blur-strong` | 20px | `blur.strong` | `--blur-strong` | `range_blur_strong` (range 0–40 px) | fixo |
| `--blur-heavy` | 26px | `blur.heavy` | `--blur-heavy` | `range_blur_heavy` (range 0–40 px) | fixo |
| `--menu-start-width` | 320px | `layout.bar-width` | `--layout-bar-width` | `range_menu_start_width` (range 280–400 px, passo 10) | fixo |
| `--menu-grow-width` | 580px | `layout.bar-width-open` | `--layout-bar-width-open` | `range_menu_grow_width` (range 480–680 px, passo 10) | fixo |
| `--menu-bottom` | 30px | `layout.bar-bottom` | `--layout-bar-bottom` | `range_menu_bottom` (range 0–60 px) | fixo |
| `--menu-button-size` | 35px | `layout.bar-height` | `--layout-bar-height` | `range_menu_button_size` (range 28–48 px) | fixo |
| `--menu-spacing-top` | 35px | `layout.bar-spacing-top` | `--layout-bar-spacing-top` | `range_menu_spacing_top` (range 20–60 px) | fixo |
| `--gap-btw-buttons` | 6px | `layout.bar-gap` | `--layout-bar-gap` | `range_gap_btw_buttons` (range 0–20 px) | fixo |
| `--cart-motion-duration` | .5s | `motion.duration.base` | `--motion-duration-base` (500ms) | `range_cart_motion_duration` (range 0–1000 ms, passo 50) | fixo |

"Fixo" = o valor fica escrito no CSS do tema, igual ao token; o setting proposto só existe
para manter o mesmo nome caso a More decida abrir aquele valor no futuro. Não criar esses
settings agora: deixar a loja trocar a cor da marca quebra a identidade.

## Como aplicar (depois do `shopify theme pull`)

1. Cole o objeto de `settings_schema.snippet.json` como um novo grupo no array de
   `config/settings_schema.json`.
2. No `:root` do tema (hoje em `critical.css`/`theme.liquid`), mantenha os nomes atuais e troque
   só os dois destaques para ler a configuração:

   ```liquid
   --ciano-destaque: {{ settings.color_ciano_destaque | default: '#8bc0d0' }};
   --cart-accent: {{ settings.color_cart_accent | default: '#c1cfd6' }};
   ```

   Os demais continuam com os valores da tabela (iguais a `more-tokens.css`).
3. **Correção obrigatória** — o `body` não define cor, então o texto corrido sai em `#000`
   em vez do preto da marca (`#2d211e`, regra R-COLOR-02). Adicionar:

   ```css
   body { color: var(--preto); }
   ```

4. Conferir no tema de teste: texto corrido em #2d211e, menu (320 → 580px), carrinho e modal
   iguais ao site ao vivo. Só então publicar.

## Fora do mapa

Cores do site sem variável (`#1a1a1a`, `#dad7d1`, `#dedbd5`) estão em `color.site-sem-token.*`;
as cores de campo (`color.campo.*`) são propostas e não entram no tema até a More aprovar.

Nota sobre `range`: o Shopify aceita no máximo 101 passos entre `min` e `max`; por isso as larguras do menu usam passo 10.
