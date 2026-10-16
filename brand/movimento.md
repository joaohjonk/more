# Movimento · medido em 15.10.2026

Uma coisa muda por vez, devagar e curto.

## O que o site faz hoje

Lido do CSS do tema (t/7) com o navegador, não de memória.

| Onde | O que muda | Duração | Curva |
|---|---|---|---|
| Abertura | letras saem; body 0 → 1; catálogo sobe 24px | 600 · 700 · 450ms | ease · ease · out-expo |
| Card, hover | foto 1 a 60%; foto 2 a 75% do quadro, escala .8 → 1; "Pronta entrega" aparece | 200ms | snap (.63,.01,0,1.01) |
| Filtro | cor do link | 150ms | ease |
| Menu | barra cresce em largura e altura, fundo escurece; conteúdo aparece | 500 · 300ms | ease |
| Menu, hover na peça | foto troca por opacidade (JS, sem transição) | 0 | - |
| Carrinho | gaveta em altura; botão adicionar em largura e fundo | 500 · 1000ms | ease |
| PDP | miniaturas 0 → 1; acordeão (borda); materiais (altura); contador | 700 · 300 · 1000 · 140ms | ease |
| Sobre | overlay 0 → 1; vídeo escala e desfoca | 800 · 700ms | ease · ease-out |

Fora da escala: 150, 180, 280, 400 e 600ms (já na R-MOTION-01).

## As referências, no mesmo dia

| Loja | Hover do card | Duração | Curva | Propriedades |
|---|---|---|---|---|
| The Row | fusão para a foto no corpo, quadro inteiro | 300ms | ease | opacity |
| Jacquemus | fusão entre fotos do tile; painéis em 800ms | 300ms | ease | opacity |
| Knoll | fusão para foto em ambiente, escala .95 → 1 | 600ms | .215,.61,.355,1 | opacity, transform |
| Norr11 | a foto não troca; o nome aparece. Foto carrega em 1,2s | 200ms | ease | opacity |
| Kann Design | fusão, quadro inteiro | 250ms | ease-in-out | all |
| Massproductions | fusão, quadro inteiro | 400ms | ease | opacity |
| Vipp | fusão entre fotos de categoria | 300ms | ease-in-out | opacity |

O que vem delas é o tempo e a curva. O quadro é da More. Jacquemus estava em manutenção; o CSS carregou.

## A segunda foto do card

Três coisas mudam ao mesmo tempo no site, em 200ms. O snap passa de 1 e dá um pulo. O quadro (foto 2 a 75%, foto 1 a 60%) fica.

Quatro versões lado a lado em `demos/hover-foto/index.html`:

- A · hoje: 200ms snap, escala .8 → 1 a 75% do quadro, foto 1 a 60%.
- B · sem movimento: troca seca, no mesmo quadro. Funciona; na grade, pisca a cada card.
- C · recomendada: o quadro de hoje, só opacidade, 300ms, ease, sem escala. O tempo e a curva de The Row e Jacquemus.
- D · comparação: 500ms ease-out com escala .98 → 1 (a versão Knoll). A escala mexe na peça de novo; meio segundo é lento na grade.

Recomendação: C. Se o time preferir zero movimento, B passa na mesma regra (duração 0).

O que o site precisa, em `product-card.css`: tirar o `scale(.8)` do repouso da foto 2. Tirar `transform` da transição. `transition:opacity 300ms ease` nas duas fotos. Posição, tamanho e o 60% ficam.

## O que entrou no sistema

- Tokens (`brand/tokens/space.tokens.json`, `brand/generated/tokens.css`): `motion.distance` (none 0, rise 24px), `motion.scale` (in .8 medido, soft .98 proposta), `motion.role` (hover-swap 300ms ease, panel 500ms ease, enter 450ms out-expo).
- R-MOTION-03, segunda foto por fusão: `node checks/hover-swap.mjs <css/html>`.
- R-MOTION-04, interação orienta e não encena (sem sequestro de rolagem, loader, cursor próprio, carrossel automático; hover também por foco): `node checks/interacao.mjs <css/html>`.
- R-MOTION-01 aceita a curva `ease` escrita como token (`.25,.1,.25,1`).
- Seção Movimento do guia (`index.html`) com as duas tabelas e o link da demo.

Tudo marcado como proposta em `state/aceite.md` até o time decidir.
