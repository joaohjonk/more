# More · sistema de design

**Menos do mesmo.** Este repositório guarda o sistema de design da More (mymore.design) em arquivos que pessoas e IA conseguem ler: cores, tipografia, espaços, grid, movimento, componentes, fotografia, voz e regras.

Abra **[index.html](index.html)** para ver tudo de forma visual (página do sistema de design).

Tudo foi medido no site e no Instagram em 15/10/2026 e organizado com o [cstack](https://github.com/joaohjonk/cstack). Os valores estão como **provisórios** até o time More aprovar.

## O que tem aqui

| Pasta / arquivo | O que é |
|---|---|
| `index.html` | Página visual do sistema (cores, tipos, componentes, regras, pendências) |
| `brand/tokens/*.tokens.json` | Os tokens no padrão W3C DTCG: `color`, `type`, `space` (inclui grid, raio, blur, movimento) |
| `brand/generated/tokens.css` | Os mesmos tokens como variáveis CSS, prontos para usar no Shopify ou em qualquer página |
| `brand/brand-system.json` | A "verdade" da marca: cada fato com fonte, confiança e status (aprovado, provisório, dúvida) |
| `brand/brand-world.json` | Produtos e elementos fixos que a IA não pode reinventar (Tomada TOM.01, Poltrona Leticia, luz de estúdio) |
| `brand/rules/brand-rules.yaml` | Regras checáveis (ex.: canto vivo, um acento só, peça nunca gerada por IA) |
| `assets/official/` | Logotipo More em SVG (extraído do site) |
| `references/` | Referências com o porquê: imagens próprias (gold) e pesquisa de fluxos das lojas premiadas de Home & Decor |
| `cstack.config.yaml` | Orçamento e permissões para IA (começa em zero: nada pago roda sem autorização) |

## Como usar no dia a dia

1. Abra o Claude com acesso a este repositório e peça: *"Instale o cstack (github.com/joaohjonk/cstack) e use o workspace da More deste repo."*
2. Para criar algo: comece com `/brief`; depois a skill do trabalho (`/copywriting`, `/workflow landing-page`, `/shot-dna`, `/three-d`...).
3. Para checar: `/brand-verify` e `/creative-review`. Quem cria nunca aprova o próprio trabalho.
4. Toda correção do time vira regra nova aqui. É assim que o gosto da More se acumula em vez de se perder.

Comandos úteis (com o cstack instalado):

```bash
cstack brand check --ws .     # valida o workspace
cstack tokens check --ws .    # valida os tokens
cstack tokens build --ws .    # gera brand/generated/tokens.css
cstack brand context --task page   # o que a IA precisa ler para fazer uma página
```

## Pendências para o time

- Aprovar os tokens como oficiais.
- Confirmar a licença web das fontes 205TF (Muoto e Muoto Mono) para páginas novas.
- Idioma do texto Sobre e do menu (hoje em inglês provisório, repetido).
- Preços de R$ 1 na Tomada TOM.01 e na Estante Dominó; grafias "Velugo Girassol" e "Angelim Pedra ebanidada" no Shopify.

## Demo

`demos/hover-foto/` compara a troca de foto do card: como o site faz hoje, sem movimento, a recomendada (o quadro de hoje, fusão 300ms, R-MOTION-03) e a versão Knoll, com as medidas de The Row, Jacquemus, Knoll e Norr11. `brand/movimento.md` é a nota para o time.

`demos/tomada-3d/` é a exploração da página da Tomada TOM.01 com a peça em 3D (Three.js, modelada a partir das medidas e fotos reais, sem gerar a peça por IA). Abra `demos/tomada-3d/index.html` no navegador.
