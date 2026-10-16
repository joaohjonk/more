#!/usr/bin/env bash
# Copia o sistema de design da raiz do repositório para site/sistema/, a página publicada em /sistema/.
# Rode depois de mudar index.html, brand/ (tokens, regras, builds), assets/ ou demos/ na raiz.
# Texto (html, css, js, json) é sempre copiado; imagem, SVG e PDF só entram quando ainda não existem em site/sistema,
# porque as cópias publicadas levam metadados de procedência (C2PA) que a raiz não tem.
# Uso: bash scripts/sincronizar-sistema.sh
set -e
R="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; D="$R/site/sistema"
copia(){ # $1 origem (arquivo), $2 destino (arquivo)
  mkdir -p "$(dirname "$2")"
  case "$1" in
    *.html|*.css|*.js|*.mjs|*.json) cmp -s "$1" "$2" || cp "$1" "$2" ;;
    *) [ -e "$2" ] || cp "$1" "$2" ;;
  esac; }
copia_pasta(){ # $1 pasta de origem relativa à raiz
  [ -d "$R/$1" ] || return 0
  find "$R/$1" -type f ! -name '*.md' ! -name '.keep' | while read -r f; do copia "$f" "$D/${f#$R/}"; done; }
copia "$R/index.html" "$D/index.html"
for p in brand/generated brand/tokens brand/build brand/examples brand/specimen assets references/gold/instagram references/gold/site demos state/teste-cego; do copia_pasta "$p"; done
# a faixa de navegação do site e o [Índice] na barra (o mesmo que a montagem do site faz)
grep -q 'nav/shell.js' "$D/index.html" || sed -i.bak -E '1,/<body[^>]*>/s#(<body[^>]*>)#\1<script src="/nav/shell.js" data-section="sistema" data-into="body" data-foot="on" defer></script>#' "$D/index.html"
grep -q 'href="/">Índice' "$D/index.html" || sed -i.bak 's#<nav aria-label="Seções">#<nav aria-label="Seções"><a href="/">Índice</a>#' "$D/index.html"
rm -f "$D/index.html.bak"
echo "site/sistema atualizado. Confira com: git status site/sistema"
