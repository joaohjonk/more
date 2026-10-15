# Tokens

Valores medidos do site ao vivo (mymore.design, CSS capturado em 15/10/2026), no formato W3C DTCG. A comparação com o site está em `state/token-diff.md`.

- **Status.** Tudo aqui é `PROVISIONAL` até o time aceitar em `state/approvals.jsonl` (resumo em `state/aceite.md`). Tokens com `PROPOSED` ou origem "inventada por nós" (campos de cor, display, logo M/XL, bar-safe) são propostas; a origem de cada uma está em `brand/origem-das-propostas.json`.
- **Cores que o site usa e que não viraram token** (#1A1A1A, #DAD7D1, #DEDBD5) ficam fora daqui, listadas em `state/token-diff.md`.
- **Um CSS só para as peças:** `brand/generated/tokens.css` (`node ~/cstack/bin/cstack.mjs tokens build --ws .`).
- `npm run tokens:build` (Style Dictionary) gera os arquivos de entrega: `brand/build/css` (mesmo conteúdo em rgba), `brand/build/figma` (variáveis para importar no Figma) e o mapa do tema em `brand/build/shopify`.
- Os tokens `font.print-size.*` estão em pt; o formato DTCG não tem pt, então o arquivo grava px.
