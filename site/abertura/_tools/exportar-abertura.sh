#!/bin/bash
# Exporta a comunicação de 05.11 a partir do mestre convite/MORE_FONTE_evento-20261105_abertura_*.html + abertura.json.
# Nomes no padrão R-FILE-01: MORE_<CANAL>_evento-20261105_<variante>_<AAAAMMDD>_v<nn>. Canais: IGS (story), IG (post 4x5), EMAIL (WhatsApp e e-mail), CONVITE (A5 impresso).
# Pré-requisitos: node + playwright-core (node_modules em _tools), ffmpeg, pypdf, Pillow, e um servidor local na raiz:
#   cd explorations/assets && python3 -m http.server 8765
# Uso: bash _tools/exportar-abertura.sh [AAAAMMDD] [vNN]
set -e
cd "$(dirname "$0")"; T=$PWD; cd ..; W=$PWD
D=${1:-$(date +%Y%m%d)}; V=${2:-v04}; M=$(ls $W/convite/MORE_FONTE_evento-20261105_abertura_*.html | tail -1); U=http://localhost:8765/convite/$(basename $M); E=$W/convite/exports; mkdir -p $E
EV=evento-20261105
shot(){ node $T/shot.mjs "$1" "$2" $3 $4 ${5:-1} .sheet ${6:-1200} >/dev/null; }
for P in aviso convite vespera dia obrigado; do
  shot "$U?peca=$P&f=story" $E/MORE_IGS_${EV}_${P}_${D}_${V}.png 1080 1920
  shot "$U?peca=$P&f=post"  $E/MORE_IG_${EV}_${P}-4x5_${D}_${V}.png 1080 1350
  shot "$U?peca=$P&f=wa"    $E/MORE_EMAIL_${EV}_${P}-wa-4x5_${D}_${V}.png 1200 1500
done
# story em vídeo (7 s, só cortes secos) para aviso, convite e véspera
for P in aviso convite vespera; do
  rm -rf /tmp/more-frames; mkdir -p /tmp/more-frames
  node $T/frames.mjs "$U?peca=$P&f=story&motion=1" /tmp/more-frames 1080 1920 24 7 >/dev/null
  ffmpeg -y -loglevel error -framerate 24 -i /tmp/more-frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart $E/MORE_IGS_${EV}_${P}_${D}_${V}.mp4
done
# convite impresso A5: prova no formato (PNG 300 dpi) e arquivo com sangria 3 mm (PDF com TrimBox + PNG 300 dpi)
shot "$U?peca=convite&f=a5" $E/MORE_CONVITE_${EV}_a5_${D}_${V}.png 592 840 3
shot "$U?peca=convite&f=a5&bleed=1" $E/MORE_CONVITE_${EV}_a5-sangria3mm_${D}_${V}.png 616 864 3
node $T/pdf.mjs "$U?peca=convite&f=a5&bleed=1" $E/MORE_CONVITE_${EV}_a5-sangria3mm_${D}_${V}.pdf 154 216 >/dev/null
python3 -I $T/caixas.py $E/MORE_CONVITE_${EV}_a5-sangria3mm_${D}_${V}.pdf >/dev/null
python3 -I $T/dpi.py $E/MORE_CONVITE_${EV}_a5_${D}_${V}.png $E/MORE_CONVITE_${EV}_a5-sangria3mm_${D}_${V}.png >/dev/null
# a variante com a elipse laranja do convite atual
shot "$U?peca=convite&f=wa&elipse=1"    $E/MORE_EMAIL_${EV}_convite-elipse-wa-4x5_${D}_${V}.png 1200 1500
shot "$U?peca=convite&f=post&elipse=1"  $E/MORE_IG_${EV}_convite-elipse-4x5_${D}_${V}.png 1080 1350
shot "$U?peca=convite&f=story&elipse=1" $E/MORE_IGS_${EV}_convite-elipse_${D}_${V}.png 1080 1920
ls $E | wc -l
