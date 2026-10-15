# Tokens × site ao vivo

Base: CSS do tema capturado em 2026-10-15 (`/mnt/project-files/more/site-raw/stylesheet/`, 11 arquivos, 1.685 declarações) e estilos computados em 1440px e 390px (home, coleção, PDP Poltrona Leticia). O repositório foi tratado como hipótese; onde o site declara um valor, o site venceu.

## O que estava errado no repositório e foi corrigido

| Token | Antes | Site | Agora |
|---|---|---|---|
| `font.size.title` 22px | "nome do produto na PDP" | `.product__title.muoto` é 26px; 22px só aparece como versão mobile de declarações (footer, Sobre, carrinho vazio) | descrição corrigida; `type.product-title` passa a usar 26px |
| `type.product-title` | 22px / 400 | 26px / 300 | 26px / 300 |
| `type.statement`, `type.about`, `type.label` | peso 400 | `.muoto` pede 300 | peso 300 (ver nota da fonte) |
| `radius` | só 0 e 999px | 0, 2px, 8px, 10px, 50%; mais 5px, 6px e 20px soltos | escala `none / thumb 2 / tooltip 8 / panel 10 / round 50%` |
| `radius.round` | 999px | 50% | 50% |
| `layout` espaço do menu | sem `--menu-spacing-top` | 35px no `:root` renderizado | `layout.bar-spacing-top` 35px, `layout.bar-gap` 6px |
| `layout.bar-safe` 106px | sem origem | 30 + 35 + 6 + 35 | descrição com a conta do site |

## O que o site usa e não tinha token (adicionado)

- **Tamanhos:** 9px (preço riscado), 12px (footer mobile, modal, carrinho), 25px (declaração do menu no mobile), 28px (carrinho vazio).
- **Peso:** 700 (`.text--title`, botão da newsletter).
- **Entrelinha:** 1.15 (descrição do produto), 2 (footer, menu mobile), 1.9 (grupos do menu no mobile).
- **Espaço:** 4px (7 usos), 12px (9 usos), 24px, 120px (6 usos), 140px (topo da coleção).
- **Duração:** 140ms (contador do carrinho, 8 usos), 300ms (acordeão), 700ms (fade do body, vídeo), 1000ms (botão de carrinho, 11 usos).
- **Breakpoints:** 1440, 1200, 1024, 768, 600 (todos max-width). Antes não havia nenhum.
- **Cores com alfa do `:root`:** `--preto-03`, `--preto-01`, `--marrom-60` (que é cinza: virou `alpha.cinza-60`), `--off-white-transparent`, `#fff9`.
- **Grade da PDP:** `344px 1fr 344px`, e 280px abaixo de 1440px.

## O que o site já quebra

Saída de `cstack tokens lint` no CSS do site antes da correção: FAIL, 7 cores fora dos tokens.

| Onde | O quê | Regra |
|---|---|---|
| `body` (critical.css) | não define `color`, então todo texto corrido sai `#000`, não `--preto` | R-COLOR-02 |
| `collection-list.css .collection-list__filter a` | `#1a1a1a` literal em 15px | R-COLOR-01 |
| `about.css .about__content` | fundo `#1a1a1a` literal | R-COLOR-01 |
| `product.css` amostra de material | `#dad7d1` e `#dedbd5` literais | R-COLOR-01 |
| `cart-drawer.css .quantity__button:hover` | `#fff9` literal | R-COLOR-01 |
| `:root` | `--marrom-60` tem valor cinza; `--marrom-80` = `--preto-80` (dois nomes, um valor) | nomes |
| `:root` | `--cinza-texto` e `--branco-30` declarados e nunca usados | limpeza |
| `modal.css`, `about.css` | raios 5px, 6px e 20px fora da escala | R-SHAPE-01 |
| `.muoto` | pede peso 300, mas o tema só carrega Muoto Regular (.otf); o navegador mostra Regular | tipo |
| filtro ativo, `.text--title` | pesos 600 e 700 sem arquivo: negrito sintético | tipo |
| durações | 150, 180, 280, 350, 400 e 600ms aparecem uma ou duas vezes cada | movimento |

## Contraste por tamanho de texto

AA pede 4,5:1 abaixo de 24px (ou 18,7px em negrito) e 3:1 acima.

| Texto | Fundo | Razão | Uso no site | Resultado |
|---|---|---|---|---|
| preto | off-white | 11,96 | nomes, botões | passa |
| cinza-medio | off-white | 4,28 | preço no grid 13px, "pronta entrega" 10px, medidas e descrição 11px | **reprova** nesses tamanhos |
| cinza-medio | cinza-overlay sobre off-white | 3,16 | quantidade e remover no carrinho, 12px | **reprova** |
| cinza-medio | `#dad7d1` | abaixo de 4,28 | nome do material no acordeão | **reprova** |
| cinza-claro | cinza-escuro (footer) | 3,88 | links do footer 13px, CNPJ 10px | **reprova** |
| cinza-texto | off-white | 2,21 | não usado | não usar para texto |
| erro | off-white | 2,27 | erro do modal 12px | **reprova** |
| ciano-destaque | off-white | 1,53 | aba "Fixos" ativa, 15px | **reprova** como texto |
| branco | preto-80 sobre off-white | 8,96 | menu aberto | passa |
| branco | vermelho-jambo | 8,19 | cartaz | passa |
| preto | amarelo-igarata | 5,92 | cartaz | passa |
| off-white | petroleo | 4,64 | proposta | passa só acima de 4,5 |

## Fontes

Métricas lidas dos arquivos do site com `cstack type font`: Muoto Regular (OTF/CFF) e Muoto Mono Condensed Regular (WOFF2), ambas com UPM 1000, altura-x 520, altura de caixa-alta 720, ascendente 960, descendente −240 e entrelinha normal 1,2. Embedding é "preview-and-print". A licença 205TF proíbe copiar os arquivos, inclusive para fornecedores, e proíbe converter para web sem licença própria. Os arquivos ficam fora do repositório.
