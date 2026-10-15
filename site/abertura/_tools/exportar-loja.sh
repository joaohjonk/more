#!/bin/bash
# Exporta etiquetas (A6 e 50x90, com faca), lista A4, vitrine e capa do livro. Nomes no padrão R-FILE-01.
# Impressos: PNG a 12 px/mm com 300 dpi declarado; PDF com sangria de 3 mm, TrimBox e BleedBox (R-PRINT-01).
# Uso: bash _tools/exportar-loja.sh [AAAAMMDD] [vNN]
set -e
cd "$(dirname "$0")"; T=$PWD; cd ..; W=$PWD
D=${1:-$(date +%Y%m%d)}; V=${2:-v05}; B=http://localhost:8765; EV=evento-20261105
shot(){ node $T/shot.mjs "$1" "$2" $3 $4 ${5:-1} "${6:-}" 1500 >/dev/null; }
m(){ basename $(ls $W/$1 | tail -1); }
ET=$(m "placas/MORE_FONTE_marca_etiquetas_*.html"); LI=$(m "lista/MORE_FONTE_marca_lista-a4_*.html"); VI=$(m "vitrine/MORE_FONTE_marca_vitrine_*.html"); CA=$(m "livro/MORE_FONTE_marca_livro-capa_*.html"); FL=$(m "livro/MORE_FONTE_marca_livro-flatplan_*.html")
P=$W/placas/exports; mkdir -p $P
# handle do site -> slug do nome canônico (R-FILE-01)
python3 - "$W" <<'PY' > /tmp/more-slugs.txt
import json,sys,unicodedata,re
W=sys.argv[1]
slug=lambda s: re.sub(r'^-|-$','',re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower()))
for p in json.load(open(f'{W}/placas/etiquetas.json',encoding='utf-8'))['pecas']: print(p['handle'], slug(p['nome']))
PY
while read H S; do
  shot "$B/placas/$ET?f=a6&p=$H"  $P/MORE_ETIQUETA_${S}_a6_${D}_${V}.png 600 760 3 "#$H"
  shot "$B/placas/$ET?f=tag&p=$H" $P/MORE_ETIQUETA_${S}_50x90_${D}_${V}.png 400 520 3 "#$H"
done < /tmp/more-slugs.txt
node $T/pdf.mjs "$B/placas/$ET?f=a6"  $P/MORE_ETIQUETA_marca_a6_${D}_${V}.pdf 105 148 3 >/dev/null
node $T/pdf.mjs "$B/placas/$ET?f=tag" $P/MORE_ETIQUETA_marca_50x90_${D}_${V}.pdf 50 90 3 >/dev/null
shot "$B/placas/$ET?f=a6&faca=1"  $P/MORE_ETIQUETA_marca_a6-faca_${D}_${V}.png 1560 800 3
shot "$B/placas/$ET?f=tag&faca=1" $P/MORE_ETIQUETA_marca_50x90-faca_${D}_${V}.png 1000 540 3
L=$W/lista/exports; mkdir -p $L
shot "$B/lista/$LI" $L/MORE_PRINT_marca_pecas-na-loja-a4_${D}_${V}.png 920 1270 3 .page
node $T/pdf.mjs "$B/lista/$LI" $L/MORE_PRINT_marca_pecas-na-loja-a4_${D}_${V}.pdf 210 297 3 >/dev/null
X=$W/vitrine/exports; mkdir -p $X $W/web
shot "$B/vitrine/$VI?w=2000&h=2600" $W/web/vitrine-abertura.png 800 900 2 "#v"
shot "$B/vitrine/$VI?w=2000&h=2600&fase=depois" $W/web/vitrine-depois.png 800 900 2 "#v"
node $T/pdf.mjs "$B/vitrine/$VI?w=2000&h=2600&esc=0.378&semref=1" $X/MORE_VITRINE_${EV}_abertura-1-10_${D}_${V}.pdf 230 290 3 >/dev/null
node $T/pdf.mjs "$B/vitrine/$VI?w=2000&h=2600&esc=0.378&semref=1&fase=depois" $X/MORE_VITRINE_marca_depois-1-10_${D}_${V}.pdf 230 290 3 >/dev/null
K=$W/livro/exports; mkdir -p $K
for C in jambo amarelo; do
  Q=$([ $C = jambo ] && echo "?v=jambo" || echo "")
  shot "$B/livro/$CA$Q" $K/MORE_LIVRO_marca_capa-frente-${C}_${D}_${V}.png 1000 1300 3 "#cover"
  shot "$B/livro/$CA$Q" $K/MORE_LIVRO_marca_capa-lombada-${C}_${D}_${V}.png 1000 1300 3 "#spine"
  shot "$B/livro/$CA$Q" $K/MORE_LIVRO_marca_capa-verso-${C}_${D}_${V}.png 1000 1300 3 "#back"
done
shot "$B/livro/$FL" $K/MORE_LIVRO_marca_flatplan-a3_${D}_${V}.png 1760 1270 3 .page
node $T/pdf.mjs "$B/livro/$FL" $K/MORE_LIVRO_marca_flatplan-a3_${D}_${V}.pdf 420 297 3 >/dev/null
python3 -I $T/caixas.py $P/*.pdf $L/*.pdf $X/*.pdf $K/*.pdf >/dev/null
python3 -I $T/dpi.py $P/*.png $L/*.png $K/*.png >/dev/null
ls $P $L $X $K | wc -l
