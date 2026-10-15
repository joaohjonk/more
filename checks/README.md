# Checks da marca More

Cada regra de `brand/rules/brand-rules.yaml` tem um script aqui ou um par de exemplos em `brand/examples/`. Os scripts são Node 18+ e não têm dependências. As imagens também usam `python3` com Pillow, e o vídeo usa `ffmpeg`. Cada script sai com 0 quando passa e com 1 quando falha, e a mensagem vem em pt-BR.

```
node checks/run-all.mjs <pasta|arquivo ...>   # roda tudo e imprime a tabela passa/falha
node checks/self-test.mjs                      # cada script passa no fixture ok e falha no fixture falha
```

| Regra | Como é checada | Comando |
|---|---|---|
| R-COLOR-01 | cor literal = token aprovado (cstack tokens lint + `site-sem-token` não vale), branco só como texto | `node checks/color-tokens.mjs <css/html/svg>` |
| R-COLOR-02 | body com fundo #E5E1DB e texto #2D211E, sem #000, sem fundo #FFF | `node checks/ground-ink.mjs <css da página>` |
| R-COLOR-03 | cor cromática (saturação ≥ 0,25) só ciano como estado ativo/hover de navegação, ou erro em seletor de erro; nunca texto ciano sobre off-white | `node checks/accent.mjs <css/html>` |
| R-SHAPE-01 | raio só 0, 2px, 8px, 10px, 50%, "8px 8px 0", "0 8px 8px" | `node checks/radius.mjs <css/html>` |
| R-TYPE-01 | Muoto/MuotoMono + fallbacks dos tokens; 400, 300 só em .muoto, 600 só em ativo, 700 falha | `node checks/type.mjs <css/html>` |
| R-TYPE-02 | ação de texto tem palavra entre colchetes; isentos: miniatura, quantidade +/-, fechar só com ícone, amostra | `node checks/actions.mjs <html>` |
| R-LAYOUT-01 | menu/carrinho/adicionar embaixo, centralizados, 35px, vidro; sem cabeçalho fixo; isentos: filtro da coleção e botão voltar | `node checks/bars.mjs <css/html>` |
| R-LAYOUT-02 | proporção 3:4 / 4:5 / 9:16 / 3:2, exportações 1080x1350 e 1080x1920, foto de produto sem raio (2px em miniatura/amostra); **exemplos** para "uma peça por foto" | `node checks/aspect.mjs <imagem/css>` + `brand/examples/R-LAYOUT-02-*` |
| R-IMG-01 | nenhum metadado de IA nem linhagem de geração | `node checks/no-ai.mjs <imagem>` |
| R-IMG-02 | **exemplos**: luz dura com sombra nítida contra luz difusa | `brand/examples/R-IMG-02-sim.jpg` / `-nao.jpg` |
| R-GEN-01 | marca = SVG oficial (referência ou paths iguais), nunca digitada | `node checks/wordmark.mjs <svg/html>` |
| R-COPY-01 | palavras proibidas, `!`, emoji, hashtag, frase com mais de 16 palavras | `node checks/copy.mjs <txt/md/html>` |
| R-COMMERCE-01 | página de produto com o texto "Pronta entrega" ou "Sob encomenda" + prazo | `node checks/commerce.mjs <produto.html>` |
| R-COMMERCE-02 | card de grade sem R$ | `node checks/grid-price.mjs <html>` |
| R-MOTION-01 | duração da escala motion.duration, curva ease/ease-out/ease-in-out/tokens (linear só contador), sem `all`, reduced-motion por seletor | `node checks/motion.mjs <css da página>` |
| R-COPY-02 | legenda = nome canônico + uma linha seca (3-12 palavras) + material | `node checks/caption.mjs <legenda.txt>` |
| R-COPY-03 | `lang="pt-BR"`, inglês só dentro de `lang="en"` | `node checks/lang.mjs <html/txt/md>` |
| R-COLOR-04 | um tom campo por quadro (ΔE ≤ 10), petróleo nunca como fundo, fundo chapado em peça gráfica; campo fora da UI (accent) | `node checks/campo.mjs <imagem> [--grafica]` |
| R-LOGO-01 | marca em M (16-25% do lado menor) ou XL (95-100% da largura, na base), cor e forma | `node checks/logo.mjs <layout.svg/html>` |
| R-SHAPE-02 | rejeitada, sem check | - |
| R-LAYOUT-03 | contêiner com rolagem vertical termina com padding-bottom ≥ 106px | `node checks/scroll-safe.mjs <css/html>` |
| R-NAME-01 | variantes e maiúsculas proibidas (`nomes-canonicos.json`) | `node checks/names.mjs <txt/md/html/csv>` |
| R-FILE-01 | `MORE_<CANAL>_<peça-slug>_<variante>_<AAAAMMDD>_v<nn>.<ext>` | `node checks/filename.mjs <arquivo>` |
| R-PRINT-01 | PDF/X-4, sangria de 3mm, off-white sem tinta, raster ≥ 300 dpi | `node checks/print.mjs <pdf/imagem>` |
| R-MOTION-02 | sem fusão nem fade entre fotos; **exemplos** para o Shadow sweep | `node checks/cuts.mjs <video>` + `brand/examples/R-MOTION-02-*` |

Arquivos de apoio:

- `lib.mjs`: parser de CSS, cores, variáveis e imagem.
- `text-lib.mjs`: listas de palavras.
- `nomes-canonicos.json`: nomes das peças. É uma proposta, e as entradas marcadas `decisao_pendente` esperam a equipe.
- `registry.mjs`: o mapa regra → script → fixtures.
- `fixtures/`: as entradas ok e falha do autoteste.
- `site-ao-vivo.txt`: o que o site no ar quebra hoje.
