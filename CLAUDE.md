# Instruções para o agente · projeto More

Leia o [README.md](README.md) antes de qualquer tarefa: ele traz o mapa do repositório, os comandos e as contas.

- **Idioma.** Texto para pessoas em português do Brasil, direto, sem jargão sem explicação. Comandos, código e nomes de arquivo ficam como estão.
- **Sistema primeiro.** Antes de criar uma peça, leia `brand/brand-system.json`, `brand/rules/brand-rules.yaml` e os tokens em `brand/tokens/`. Cor, tipo e espaço vêm dos tokens (`brand/generated/tokens.css`), nunca de um valor digitado.
- **Conferir antes de entregar.** `node checks/run-all.mjs <arquivo>` em toda peça, e `/creative-review` (cstack) por um revisor que não fez a peça. Quem cria não aprova.
- **Status.** Tokens e regras são provisórios até a More aceitar em `state/approvals.jsonl`. Nunca grave uma decisão em nome do time.
- **Nunca.** Fonte licenciada no repositório; foto de peça gerada ou alterada por IA (R-IMG-01); chave de API em arquivo; publicar sem uma pessoa pedir (`scripts/publicar.sh` é rodado por gente).
- **Ferramentas.** cstack para marca (`/brief`, `/creative-direction`, `/brand-verify`, `/creative-review`); gstack para testar o site (`/qa`, `/design-review`) e revisar código (`/review`). Para navegar na web, use o `/browse` do gstack.
- **Site.** `site/` é o site como está no ar. Depois de mudar o sistema na raiz, rode `bash scripts/sincronizar-sistema.sh` para levar a mudança a `site/sistema/`.
- **Toda correção vira regra.** Quando o time corrigir algo, proponha a regra nova em `brand/rules/brand-rules.yaml` e um check ou par de exemplos.
