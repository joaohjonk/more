# Marca oficial da More

Desenho: Manoela Moura e Anna's, 2025 (direção criativa de Manoela Moura, design de Anna's; crédito na p. 39 do PDF do guia de uso).
Origem: pasta `logo/` do material oficial entregue pela More em 15.10.2026 (`/mnt/project-files/more/marca-oficial/logo/`).

| Arquivo aqui | Original | Drive id |
|---|---|---|
| `more-wordmark.svg` | `More • logo preto.svg` (481 × 123, `fill="black"`) | 1jiXT1KojF5-Ch9opDxh7Yy1rct7XVFBz |
| `more-wordmark.png` | `More • logo preto.png` (2881 × 735) | 1qL8xPWS1v7gzZnqxXxDOn3Btc9PHauz7 |
| `more-wordmark.pdf` | `More • logo preto.pdf` | 1w6G-NJPwmx4XBd8xSOUA70aEGkuJFYZ_ |
| `more-wordmark.dwg` | `More • logo preto.dwg` (AutoCAD 2018) | 1tCM7i6R91GZxD_7Nt6hiqTp9FAt_J5ta |
| `more-wordmark-cinza.svg` / `.png` | `More • logo cinza` (`#434345`, preto 89%) | ver manifesto.csv |
| `more-wordmark-branco.svg` / `.png` | `More • logo branco` | ver manifesto.csv |
| `more-wordmark-currentcolor.svg` | os mesmos 4 paths do preto, com `fill="currentColor"` | derivado |
| `more-wordmark-small.svg` | os mesmos 4 paths, `width="60"`; só muda o tamanho de exibição | derivado |

Os SVG e PNG vieram com um bloco de proveniência C2PA injetado pela pasta compartilhada (`<metadata>` no SVG, chunk `caBX` no PNG). Ele foi retirado; paths e pixels são os do original (diferença de pixels entre o PNG original e o daqui: nenhuma).

## Prova da troca

Até 15.10 o repositório usava o SVG copiado do site (272 × 69), agora em `legado/`. É o mesmo desenho: rasterizados a 2881 × 735 e comparados com o PNG oficial, os pixels de tinta coincidem em

- `more-wordmark.svg` oficial: 98,43%
- `legado/more-wordmark-site.svg`: 98,86%

A diferença entre os dois fica nas bordas (antisserrilhamento) e na proporção: 481 : 123 = 3,911 no oficial, 272 : 69 = 3,942 no do site. Para refazer: `PW=…/playwright-core/index.mjs CHROME=…/chrome node assets/official/prova-raster.mjs [svg] [png]` (aceite acima de 98%).

## Uso

- Em HTML e SVG, a marca entra inline com os paths de `more-wordmark-currentcolor.svg` e a cor pelo CSS (R-GEN-01, `checks/wordmark.mjs`).
- `checks/wordmark.mjs` ainda aceita os paths de `legado/` para não quebrar peças feitas antes da troca. Peça nova usa o oficial.
- Tamanho mínimo pelo guia: 18 mm no papel, 120 px na tela (guia de uso p. 5). O menu do site usa 60 px, abaixo desse mínimo (ver P-03 em `state/aceite.md`).
- Regras de uso do guia (p. 6: sem contorno, vertical lido de baixo para cima, nunca em cor, diagonal, máscara ou efeito) estão como proposta P-LOGO-02.
