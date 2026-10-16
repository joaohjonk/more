#!/usr/bin/env bash
# Prepara um computador para continuar o projeto More: instala o que é recomendado e confere o que falta.
#   bash setup.sh                  instala e confere
#   bash setup.sh --sem-navegador  igual, sem baixar o Chromium do gstack (os testes de site ficam para depois)
#   bash setup.sh --so-conferir    só confere, não instala nada
# Pode rodar de novo quantas vezes quiser. Nunca pede nem grava senha ou chave, e não faz nenhuma chamada paga.
# Feito para macOS (com Homebrew) e Linux. Compatível com o bash 3.2 que vem no Mac.
set -u

INSTALAR=1; NAVEGADOR=1
for a in "$@"; do
  case "$a" in
    --so-conferir) INSTALAR=0 ;;
    --sem-navegador) NAVEGADOR=0 ;;
    -h|--help) sed -n '2,7p' "$0"; exit 0 ;;
    *) printf 'setup: opção desconhecida %s (use --help)\n' "$a" >&2; exit 1 ;;
  esac
done

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CSTACK_DIR="$HOME/cstack"
GSTACK_DIR="$HOME/.claude/skills/gstack"
FALTAS=""
SO="$(uname -s)"

titulo(){ printf '\n%s\n' "$1"; }
ok(){ printf '  ok     %s\n' "$1"; }
aviso(){ printf '  aviso  %s\n' "$1"; }
falta(){ printf '  falta  %s\n' "$1"; FALTAS="${FALTAS}  - $1
"; }
tem(){ command -v "$1" >/dev/null 2>&1; }
# compara versões x.y.z: verdadeiro se $1 >= $2
versao_ok(){ [ "$(printf '%s\n%s\n' "$2" "$1" | sort -t. -k1,1n -k2,2n -k3,3n | head -1)" = "$2" ]; }

# o perfil do shell onde entram o alias do cstack e o PATH do bun
if [ "$SO" = "Darwin" ] || [ "${SHELL:-}" != "${SHELL%zsh}" ]; then PERFIL="$HOME/.zshrc"; else PERFIL="$HOME/.bashrc"; fi
no_perfil(){ # $1 linha; acrescenta uma vez só
  [ -f "$PERFIL" ] && grep -qF "$1" "$PERFIL" && return 0
  [ "$INSTALAR" = 1 ] || return 0
  printf '\n%s\n' "$1" >> "$PERFIL"; ok "acrescentado em $PERFIL: $1"
}

printf 'More · setup em %s\n' "$REPO"
[ "$INSTALAR" = 1 ] || printf '(modo --so-conferir: nada é instalado)\n'

# 1. Programas de base -----------------------------------------------------------------------------
titulo "1. Programas de base"
BREW=0; tem brew && BREW=1

if tem git; then ok "git $(git --version | awk '{print $3}')"
else
  if [ "$SO" = "Darwin" ]; then falta "git: rode  xcode-select --install  e depois este script de novo"
  else falta "git: instale pelo gerenciador de pacotes (ex.: sudo apt install git)"; fi
fi

node_ok(){ tem node && [ "$(node -p 'process.versions.node.split(".")[0]')" -ge 20 ] 2>/dev/null; }
if ! node_ok && [ "$INSTALAR" = 1 ] && [ "$BREW" = 1 ]; then brew install node; fi
if node_ok; then ok "node $(node -v)"
else
  if [ "$SO" = "Darwin" ] && [ "$BREW" = 0 ]; then falta "Node.js 20 ou mais novo: instale o Homebrew (https://brew.sh) e rode este script de novo, ou baixe em https://nodejs.org"
  else falta "Node.js 20 ou mais novo: https://nodejs.org"; fi
fi

# bun: o gstack precisa dele (1.3.3 ou mais novo)
[ -d "$HOME/.bun/bin" ] && PATH="$HOME/.bun/bin:$PATH"
if ! tem bun && [ "$INSTALAR" = 1 ] && tem curl; then
  curl -fsSL https://bun.sh/install 2>/dev/null | bash >/dev/null 2>&1 && PATH="$HOME/.bun/bin:$PATH"
fi
if tem bun && ! versao_ok "$(bun --version)" 1.3.3 && [ "$INSTALAR" = 1 ]; then bun upgrade >/dev/null 2>&1; fi
if tem bun && versao_ok "$(bun --version)" 1.3.3; then ok "bun $(bun --version)"; no_perfil 'export PATH="$HOME/.bun/bin:$PATH"'
elif tem bun; then falta "bun $(bun --version) é antigo para o gstack: rode  bun upgrade"
else falta "bun (para o gstack): curl -fsSL https://bun.sh/install | bash"; fi

# Claude Code: o agente que usa o cstack, o gstack e os MCPs
[ -d "$HOME/.local/bin" ] && PATH="$HOME/.local/bin:$PATH"
if ! tem claude && [ "$INSTALAR" = 1 ] && tem curl; then
  curl -fsSL https://claude.ai/install.sh | bash >/dev/null 2>&1 && PATH="$HOME/.local/bin:$PATH"
fi
if tem claude; then ok "Claude Code $(claude --version 2>/dev/null | awk '{print $1}')"; no_perfil 'export PATH="$HOME/.local/bin:$PATH"'
else falta "Claude Code: curl -fsSL https://claude.ai/install.sh | bash"; fi

# sem git ou node o resto não roda
if ! tem git || ! node_ok; then
  printf '\nFalta o básico para seguir:\n%s' "$FALTAS"; exit 1
fi

# 2. Dependências deste repositório ---------------------------------------------------------------
titulo "2. Dependências do repositório (Style Dictionary, para gerar os tokens)"
if [ -d "$REPO/node_modules/style-dictionary" ]; then ok "node_modules já instalado"
elif [ "$INSTALAR" = 1 ]; then (cd "$REPO" && npm ci --no-audit --no-fund --loglevel=error) && ok "npm ci" || falta "npm ci falhou em $REPO"
else falta "node_modules: rode  npm ci  na pasta do repositório"; fi

# 3. cstack: sistema de marca para IA (tokens, regras, skills /brief, /creative-review...) -----------
titulo "3. cstack (github.com/joaohjonk/cstack)"
if [ "$INSTALAR" = 1 ]; then
  if [ -d "$CSTACK_DIR/.git" ]; then git -C "$CSTACK_DIR" pull --ff-only -q || aviso "não deu para atualizar $CSTACK_DIR (mudanças locais?); sigo com a versão que está lá"
  else git clone -q --depth 1 https://github.com/joaohjonk/cstack.git "$CSTACK_DIR"; fi
  (cd "$CSTACK_DIR" && ./setup >/dev/null) || falta "cstack: ./setup falhou em $CSTACK_DIR"
fi
if [ -f "$CSTACK_DIR/bin/cstack.mjs" ] && [ -d "$HOME/.claude/skills/brief" ]; then
  ok "cstack em $CSTACK_DIR, skills ligadas em ~/.claude/skills"
  no_perfil "alias cstack='node \"$CSTACK_DIR/bin/cstack.mjs\"'"
else falta "cstack: git clone --depth 1 https://github.com/joaohjonk/cstack.git ~/cstack && cd ~/cstack && ./setup"; fi

# 4. gstack: testes de site no navegador, revisão de código e de design (/qa, /design-review, /review) --
titulo "4. gstack (github.com/garrytan/gstack)"
if [ "$INSTALAR" = 1 ] && tem bun; then
  if [ -d "$GSTACK_DIR/.git" ]; then ok "gstack já instalado (para atualizar, peça /gstack-upgrade no Claude Code)"
  else git clone -q --single-branch --depth 1 https://github.com/garrytan/gstack.git "$GSTACK_DIR"; fi
  if [ "$NAVEGADOR" = 1 ]; then (cd "$GSTACK_DIR" && ./setup -q) || falta "gstack: ./setup falhou em $GSTACK_DIR"
  else (cd "$GSTACK_DIR" && ./setup -q --no-browser) || falta "gstack: ./setup falhou em $GSTACK_DIR"; fi
fi
if [ -f "$GSTACK_DIR/SKILL.md" ] && [ -e "$HOME/.claude/skills/qa" ]; then ok "gstack em $GSTACK_DIR, skills /qa /design-review /review ligadas"
else falta "gstack: git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup"; fi

# 5. Conferência do sistema de design --------------------------------------------------------------
titulo "5. Conferência do sistema de design"
if [ -f "$CSTACK_DIR/bin/cstack.mjs" ]; then
  C="node $CSTACK_DIR/bin/cstack.mjs"
  if (cd "$REPO" && $C brand check --ws . >/dev/null 2>&1); then ok "cstack brand check: passa"; else falta "cstack brand check falhou: rode  cstack brand check --ws .  para ver"; fi
  if (cd "$REPO" && $C tokens check --ws . >/dev/null 2>&1); then ok "cstack tokens check: passa"; else falta "cstack tokens check falhou: rode  cstack tokens check --ws .  para ver"; fi
fi
if (cd "$REPO" && node checks/self-test.mjs >/dev/null 2>&1); then ok "checks da marca: todos passam no autoteste"
else aviso "algum check da marca não passou no autoteste (rode  node checks/self-test.mjs ). Os de imagem pedem python3 com Pillow, o de vídeo pede ffmpeg"; fi

# 6. Opcionais: só para exportar imagem e vídeo -----------------------------------------------------
titulo "6. Opcionais (checar e exportar imagem, vídeo e PDF)"
if tem python3 && python3 -c 'import PIL' >/dev/null 2>&1; then ok "python3 com Pillow"; else aviso "python3 com Pillow ausente: os checks de imagem não rodam (python3 -m pip install Pillow)"; fi
if tem ffmpeg; then ok "ffmpeg"; else aviso "ffmpeg ausente: o check de vídeo não roda ($( [ "$BREW" = 1 ] && echo 'brew install ffmpeg' || echo 'instale o ffmpeg'))"; fi

# 7. MCPs ---------------------------------------------------------------------------------------------
titulo "7. MCPs (conectores do Claude Code)"
ok ".mcp.json do repositório traz netlify, figma e shopify-dev"
printf '         Ao abrir o Claude Code nesta pasta ele pergunta se pode usá-los: responda que sim.\n'
printf '         Figma e Netlify pedem login: dentro do Claude Code, digite /mcp e entre com a sua conta.\n'

# Resumo ---------------------------------------------------------------------------------------------
titulo "Resumo"
if [ -z "$FALTAS" ]; then printf '  Tudo instalado.\n'; else printf '  Falta:\n%s' "$FALTAS"; fi
cat <<'FIM'

  Passos que dependem de conta ou licença (o script não faz):
  - Claude Code: rode  claude  e entre com a sua conta Claude.
  - Fontes Muoto e Muoto Mono (205TF): a licença é da More; os arquivos nunca entram no repositório.
    Para publicar com elas: bash scripts/publicar.sh --fontes <pasta com os arquivos>
  - Netlify (o site mymore.netlify.app): a conta é do Joao; peça um convite para o time no Netlify.
  - Shopify (mymore.design): acesso de colaborador pelo dono da loja na More.
  - Figma: a sua própria conta.

  Abra um terminal novo (para valer o alias do cstack) e depois:
    cd <pasta do repositório> && claude
  e peça, por exemplo: "leia o README e me mostre o que está em aberto".
FIM
[ -z "$FALTAS" ]
