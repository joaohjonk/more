# Métricas das fontes da More

Lidas com `cstack type font --json` nos arquivos servidos pelo site (cópia local fora do repositório).
Imagem: [especime.png](especime.png) — tamanhos reais do site, features OpenType, glifos e métricas. Refeito em 15.10 com os arquivos oficiais da licença (`marca-oficial/fontes/`, fora do repositório).

| Métrica | Muoto Regular | Muoto Mono Condensed Regular |
|---|---|---|
| Arquivo servido pelo site | `.otf` (contornos CFF) | `.woff` (na verdade WOFF2, contornos TrueType) |
| Fabricante (vendor) | 205TF (`205`) | 205TF (`205`) |
| Design | Matthieu Cortat, Anthony Franklin, Sander Vermeulen | idem |
| Versão | 2.000 | 1.000 |
| UPM | 1000 | 1000 |
| Altura-x | 520 (0,52 em) | 520 (0,52 em) |
| Altura de maiúscula | 720 (0,72 em) | 720 (0,72 em) |
| Ascendente / descendente (hhea = typo) | 960 / −240, line gap 0 | 960 / −240, line gap 0 |
| Win ascent / descent | 1110 / 350 | 1110 / 350 |
| Entrelinha normal | 1,2 (USE_TYPO_METRICS) | 1,2 (USE_TYPO_METRICS) |
| Peso / largura (OS/2) | 400 / 5 (normal) | 400 / 3 (condensada) |
| Glifos / codepoints | 850 / 593 | 754 / 571 |
| Português | completo | completo |
| Kerning | sim (GPOS kern) | não |
| Algarismos tabulares (tnum) | sim | não (monoespaçada, já alinha) |
| Versalete real (smcp) | não | não |
| Itálico licenciado | Muoto Italic, −12°, 850 glifos | Condensed Italic, −12°, 753 glifos |
| Embedding (fsType) | `0x0004` preview-and-print | `0x0004` preview-and-print |
| Nome interno | Muoto / Muoto-Regular | `.` (nomes removidos no subset web) |

## Features OpenType

Lidas com fontTools nos `.otf` da licença e testadas no Chromium (ver o espécime).

| Feature | Muoto | Mono | O que faz |
|---|---|---|---|
| `tnum` / `pnum` | sim | não | algarismos tabulares ou proporcionais (preços e medidas em coluna) |
| `case` | sim | sim | hífen, parênteses e colchetes na altura das maiúsculas |
| `zero` | sim | sim | zero cortado |
| `frac`, `numr`, `dnom`, `sups`, `subs`, `sinf`, `ordn` | sim | sim | frações (1/2 → ½), índices, ordinais |
| `ss01` | sim | sim | setas: `--E` →, `--W` ←, `--N` ↑, `--S` ↓, `--NE` ↗ |
| `ss02` | pontuação alternativa | `x` entre algarismos vira × | |
| `ss03` | `x` entre algarismos vira × | não existe | `72x54x80` → `72×54×80` |
| `kern`, `cpsp` | sim | não | kerning, espaço de maiúsculas |

Total: 22 features na Muoto, 17 na Mono.

## Tamanhos usados no site

9 (`micro`), 10 (`caption`), 11 (`label`), 12 (`small`), 13 (`body`), 15 (`ui`),
22 (`title`), 25 (`statement-mobile`), 26 (`statement`), 28 (`statement-lg`), 32 (`about`) px.
Tokens `--font-size-*` em `brand/build/css/more-tokens.css`.

## Pesos: o que o navegador realmente desenha

- A licença da More só tem **Regular e Italic (400)** das duas famílias. O site serve só o Regular do Muoto. A classe `.muoto` pede `font-weight: 300`:
  sem arquivo Light, o navegador usa o Regular. Na tela, "300" é Regular.
- 600 e 700 não têm arquivo: o navegador gera **negrito sintético** (contorno engrossado).
  Evitar em texto de marca; se a hierarquia precisar de peso, licenciar o corte certo.
- Os CSS de tokens levam `font-synthesis: none`: peça feita com eles mostra 400 onde pedir 300, 600 ou 700.
- A entrelinha 1 usada em statements fica abaixo da normal (1,2): acentos de maiúscula
  (Á, Ê) podem encostar na linha de cima em textos de várias linhas.

## Licença

- Fontes da 205TF, comerciais. fsType `0x0004` = *preview-and-print*: podem ser incorporadas
  só para visualizar e imprimir (ex.: PDF), não para edição.
- O fsType é um aviso técnico; quem manda é o EULA da 205TF (www.205.tf/eula). Ele proíbe
  copiar as fontes para terceiros (inclusive freelancers e gráficas), converter formatos
  e usar na web sem licença web.
- Por isso **nenhum arquivo de fonte entra neste repositório** nem em página publicada,
  nem em base64. O espécime é uma imagem PNG de texto composto nelas.
- Quem precisar das fontes no computador (Figma, InDesign) usa a licença da More em seu nome.
