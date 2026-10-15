#!/bin/bash
# Exporta a comunicação de 05.11 a partir de convite/abertura.html + abertura.json.
# Pré-requisitos: node + playwright-core (npm i em _tools), ffmpeg, e um servidor local na raiz:
#   cd explorations/assets && python3 -m http.server 8765
# Uso: bash _tools/exportar-abertura.sh [AAAAMMDD] [vNN]
set -e
cd "$(dirname "$0")"; T=$PWD; cd ..; W=$PWD
D=${1:-$(date +%Y%m%d)}; V=${2:-v03}; U=http://localhost:8765/convite/abertura.html; E=$W/convite/exports; mkdir -p $E
shot(){ node $T/shot.mjs "$1" "$2" $3 $4 ${5:-1} .sheet ${6:-1200} >/dev/null; }
for P in aviso convite vespera dia obrigado; do
  shot "$U?peca=$P&f=story" $E/MORE_IG_abertura_${P}_story-9x16_${D}_${V}.png 1080 1920
  shot "$U?peca=$P&f=post"  $E/MORE_IG_abertura_${P}_post-4x5_${D}_${V}.png 1080 1350
  shot "$U?peca=$P&f=wa"    $E/MORE_WA_abertura_${P}_4x5_${D}_${V}.png 1200 1500
done
# story em vídeo (7 s) para aviso, convite e véspera
for P in aviso convite vespera; do
  rm -rf /tmp/more-frames; mkdir -p /tmp/more-frames
  node $T/frames.mjs "$U?peca=$P&f=story&motion=1" /tmp/more-frames 1080 1920 24 7 >/dev/null
  ffmpeg -y -loglevel error -framerate 24 -i /tmp/more-frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart $E/MORE_IG_abertura_${P}_story-9x16_${D}_${V}.mp4
done
# convite impresso A5: prova (trim) e arquivo com sangria 3 mm + slug
shot "$U?peca=convite&f=a5" $E/MORE_PRINT_abertura_convite-A5_${D}_${V}.png 592 840 3
node $T/pdf.mjs "$U?peca=convite&f=a5" $E/MORE_PRINT_abertura_convite-A5_${D}_${V}.pdf 148 210 >/dev/null
node $T/pdf.mjs "$U?peca=convite&f=a5&bleed=1" $E/MORE_PRINT_abertura_convite-A5-sangria3mm_${D}_${V}.pdf 176 238 >/dev/null
shot "$U?peca=convite&f=a5&bleed=1" $E/MORE_PRINT_abertura_convite-A5-sangria3mm_${D}_${V}.png 704 952 2
# fora das regras: a elipse
shot "$U?peca=convite&f=wa&elipse=1"    $E/MORE_WA_abertura_convite-elipse_4x5_${D}_${V}.png 1200 1500
shot "$U?peca=convite&f=post&elipse=1"  $E/MORE_IG_abertura_convite-elipse_post-4x5_${D}_${V}.png 1080 1350
shot "$U?peca=convite&f=story&elipse=1" $E/MORE_IG_abertura_convite-elipse_story-9x16_${D}_${V}.png 1080 1920
ls $E | wc -l
