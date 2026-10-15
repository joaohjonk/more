# Tokens

Valores medidos do site ao vivo (mymore.design, CSS capturado em 15/10/2026), no formato W3C DTCG. A comparação com o site está em `state/token-diff.md`.

- **Status.** Tudo aqui é `PROVISIONAL` até o time aceitar em `state/approvals.jsonl` (resumo em `state/aceite.md`). Tokens com `PROPOSED` ou origem "inventada por nós" (campos de cor, display, logo M/XL, bar-safe) são propostas; a origem de cada uma está em `brand/origem-das-propostas.json`.
- **Cores que o site usa e que não viraram token** (#1A1A1A, #DAD7D1, #DEDBD5) ficam fora daqui, listadas em `state/token-diff.md`.
- **Um CSS só para as peças:** `brand/generated/tokens.css` (`node ~/cstack/bin/cstack.mjs tokens build --ws .` e depois `node brand/tokens/font-synthesis.mjs`, que acrescenta `font-synthesis: none`).
- `npm run tokens:build` (Style Dictionary) gera os arquivos de entrega: `brand/build/css` (mesmo conteúdo em rgba), `brand/build/figma` (variáveis para importar no Figma) e o mapa do tema em `brand/build/shopify`.
- **Valor oficial ao lado do medido.** Cada cor tem `$extensions.more.oficial`: o valor do guia de uso da More (hex, RGB, CMYK, Pantone, página) quando o guia tem contrapartida, e `null` quando não tem (ciano, cinzas quentes, cores com alfa). O `$value` continua o medido no site; trocar pelo do guia é proposta (P-COR-01 e P-COR-02 em `state/aceite.md`).
- **Fontes licenciadas.** `font.family.*.$extensions.more.licenca` lista os arquivos da licença 205TF (só Regular e Italic, peso 400) e as features OpenType de cada família. Pesos 300, 600 e 700 não existem; os arquivos de fonte nunca entram neste repositório.
- Os tokens `font.print-size.*` estão em pt; o formato DTCG não tem pt, então o arquivo grava px.
