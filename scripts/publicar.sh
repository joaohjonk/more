#!/usr/bin/env bash
# Publica a pasta site/ em mymore.netlify.app.
#   bash scripts/publicar.sh                         prévia: endereço de rascunho, o site no ar não muda
#   bash scripts/publicar.sh --prod                  publica no endereço principal
#   bash scripts/publicar.sh --fontes <pasta>        inclui as fontes Muoto (licença da More) em /fontes/
#   bash scripts/publicar.sh --so-montar             só monta a pasta e diz onde ficou, sem publicar
# Precisa de acesso ao site no Netlify (a conta é do Joao): na primeira vez o Netlify abre o navegador para o login.
# Sem --fontes, as páginas caem nas fontes de reserva (Helvetica Neue, Arial, Menlo).
set -e
R="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_ID="${NETLIFY_SITE_ID:-ef0ef390-3ae4-4167-8f17-868c5f267a11}"
PROD=""; FONTES=""; SO_MONTAR=0
while [ $# -gt 0 ]; do
  case "$1" in
    --prod) PROD="--prod"; shift ;;
    --fontes) FONTES="$2"; shift 2 ;;
    --so-montar) SO_MONTAR=1; shift ;;
    -h|--help) sed -n '2,8p' "$0"; exit 0 ;;
    *) echo "publicar: opção desconhecida $1 (use --help)" >&2; exit 1 ;;
  esac
done
B="$(mktemp -d)/more-site"; mkdir -p "$B"; cp -R "$R/site/." "$B/"
if [ -n "$FONTES" ]; then
  # os dois arquivos oficiais da licença 205TF, renomeados como a licença recomenda
  mkdir -p "$B/fonts"
  cp "$FONTES/205TF-Muoto-Regular.otf" "$B/fonts/mr.otf"
  cp "$FONTES/205TF-MuotoMono-CondensedRegular.woff2" "$B/fonts/mm.woff2"
else
  echo "aviso: sem --fontes, o site sai com as fontes de reserva"
fi
# nenhum arquivo de fonte fora de /fonts/
if find "$B" -type f \( -iname '*.otf' -o -iname '*.woff' -o -iname '*.woff2' -o -iname '*.ttf' \) ! -path "$B/fonts/*" | grep -q .; then
  echo "publicar: arquivo de fonte fora de /fonts/; nada foi publicado" >&2; exit 1
fi
echo "pasta montada: $B ($(find "$B" -type f | wc -l | tr -d ' ') arquivos)"
[ "$SO_MONTAR" = 1 ] && exit 0
npx -y netlify-cli@27 deploy --dir "$B" --site "$SITE_ID" $PROD
