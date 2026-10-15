#!/bin/bash
# Exporta etiquetas (A6 e 50x90, com e sem faca), lista A4 e vitrine. Uso: bash _tools/exportar-loja.sh [AAAAMMDD] [vNN]
set -e
cd "$(dirname "$0")"; T=$PWD; cd ..; W=$PWD
D=${1:-$(date +%Y%m%d)}; V=${2:-v03}; B=http://localhost:8765
shot(){ node $T/shot.mjs "$1" "$2" $3 $4 ${5:-1} "${6:-}" 1500 >/dev/null; }
P=$W/placas/exports; mkdir -p $P
for H in $(python3 -c "import json;print(' '.join(p['handle'] for p in json.load(open('$W/placas/etiquetas.json'))['pecas']))"); do
  shot "$B/placas/etiquetas.html?f=a6&p=$H"  $P/MORE_PRINT_etiqueta_${H}_A6_${D}_${V}.png 600 760 3 "#$H"
  shot "$B/placas/etiquetas.html?f=tag&p=$H" $P/MORE_PRINT_etiqueta_${H}_50x90_${D}_${V}.png 400 520 3 "#$H"
done
node $T/pdf.mjs "$B/placas/etiquetas.html?f=a6"  $P/MORE_PRINT_etiquetas_A6_${D}_${V}.pdf 105 148 >/dev/null
node $T/pdf.mjs "$B/placas/etiquetas.html?f=tag" $P/MORE_PRINT_etiquetas_50x90_${D}_${V}.pdf 50 90 >/dev/null
shot "$B/placas/etiquetas.html?f=a6&faca=1"  $P/MORE_PRINT_etiquetas_A6-faca_${D}_${V}.png 1560 800 2
shot "$B/placas/etiquetas.html?f=tag&faca=1" $P/MORE_PRINT_etiquetas_50x90-faca_${D}_${V}.png 1000 540 2
L=$W/lista/exports; mkdir -p $L
shot "$B/lista/lista.html" $L/MORE_PRINT_pecas-na-loja_A4_${D}_${V}.png 920 1270 2 .page
node $T/pdf.mjs "$B/lista/lista.html" $L/MORE_PRINT_pecas-na-loja_A4_${D}_${V}.pdf 210 297 >/dev/null
X=$W/vitrine/exports; mkdir -p $X
shot "$B/vitrine/vitrine.html?w=2000&h=2600" $X/MORE_LOJA_vitrine_abertura_2000x2600_${D}_${V}.png 800 900 2 "#v"
shot "$B/vitrine/vitrine.html?w=2000&h=2600&fase=depois" $X/MORE_LOJA_vitrine_depois_2000x2600_${D}_${V}.png 800 900 2 "#v"
node $T/pdf.mjs "$B/vitrine/vitrine.html?w=2000&h=2600&esc=0.378&semref=1" $X/MORE_LOJA_vitrine_abertura_1-10_${D}_${V}.pdf 230 290 >/dev/null
node $T/pdf.mjs "$B/vitrine/vitrine.html?w=2000&h=2600&esc=0.378&semref=1&fase=depois" $X/MORE_LOJA_vitrine_depois_1-10_${D}_${V}.pdf 230 290 >/dev/null
ls $P $L $X | wc -l
