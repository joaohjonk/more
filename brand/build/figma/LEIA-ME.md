# Variáveis da More para o Figma

Três arquivos, um por coleção, no formato W3C DTCG (o mesmo que o Figma exporta):

| Arquivo | Coleção no Figma | Conteúdo |
|---|---|---|
| `Cor.tokens.json` | **Cor** | cores com alpha; aliases (`surface/page` → `off-white` etc.) viram referências |
| `Espaço.tokens.json` | **Espaço** | space, layout, radius, breakpoint — números em px |
| `Tipo.tokens.json` | **Tipo** | famílias (texto), pesos, tamanhos, tamanhos de impressão, entrelinhas |

Ficaram de fora: estilos de texto compostos (`type.*`), motion, blur, aspect, logo,
`layout.columns-pdp` (texto `344px 1fr 344px`) e `radius.round` (50%, não é px).

## Como importar (passo a passo)

1. Abra o arquivo de design da More no Figma (precisa de permissão de edição).
2. Sem nada selecionado, no painel direito clique em **Variables** (ou no menu de
   variáveis locais) para abrir a janela de variáveis.
3. No menu da lista de coleções, escolha **Import variables** / **Importar variáveis**.
4. Arraste `Cor.tokens.json`. Dê à coleção o nome **Cor**. O arquivo vira um modo (renomeie para "Padrão").
5. Repita com `Espaço.tokens.json` (coleção **Espaço**) e `Tipo.tokens.json` (coleção **Tipo**).
6. Confira: `text/primary` deve aparecer como alias de `preto`; `alpha/preto-80` com 80% de opacidade.

Se o seu plano ou versão não mostrar a opção de importar, use um plugin que leia DTCG
(ex.: Tokens Studio) apontando para os mesmos arquivos.

## Cuidados

- **Famílias**: o valor é o nome da fonte (`Muoto`, `MuotoMono`). Se a fonte instalada no seu
  computador tiver outro nome (ex.: "Muoto Mono"), ajuste a variável. As fontes 205TF são
  licenciadas: instale pela licença da More, nunca por arquivo copiado do site.
- **Entrelinhas** são multiplicadores (1.47). No Figma, digite em % (147%); a descrição de cada
  variável já traz o valor em %.
- **Pesos** 300/600/700: o site só tem o Regular do Muoto (ver `brand/specimen/metricas.md`).

## Propostas — prefixo `[proposta]` na descrição

Estes tokens ainda não são da marca; foram observados ou inventados por nós e esperam aprovação
da More. No Figma a descrição começa com `[proposta]`:

- Cor: `campo/vermelho-jambo`, `campo/verde-jamaica`, `campo/petroleo` (inventada),
  `campo/berinjela`, `campo/amarelo-igarata` e o alias `campo/mostarda-igarata`, que aponta para ela
- Espaço: `layout/bar-safe`
- Tipo: `size/display-3`, `size/display-2`, `size/display-1` (inventados)

Todos os outros valores são PROVISÓRIOS: vêm do tema ao vivo, aguardando aprovação do time More.

## Regerar

`npm run tokens:build` na raiz do repositório (fonte: `brand/tokens/*.tokens.json`).
