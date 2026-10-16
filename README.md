# More · sistema de design e site do projeto

**O que é.** Tudo o que foi feito para a More (mymore.design) em outubro de 2026: o sistema de design em arquivos que pessoas e IA leem (cores, tipos, espaços, regras, voz), e o site do projeto com o guia, as peças da abertura de 05.11, a coleção, o catálogo e os estudos.
**Onde está no ar.** [mymore.netlify.app](https://mymore.netlify.app). O sistema de design em [/sistema/](https://mymore.netlify.app/sistema/), o guia em [/guia/](https://mymore.netlify.app/guia/).
**Por onde começar.** Rode o setup abaixo, abra o Claude Code nesta pasta e leia [o que só a More responde](https://mymore.netlify.app/guia/#perguntas).

## Começar em três passos

```bash
git clone https://github.com/joaohjonk/more.git && cd more
bash setup.sh
claude
```

O `setup.sh` instala o que é recomendado e confere o que falta, com uma linha `ok`, `aviso` ou `falta` para cada item. Pode rodar de novo quantas vezes quiser. Ele não pede senha nem chave e não faz nenhuma chamada paga. No fim, ele lista os passos que dependem de conta ou licença.

Dentro do Claude Code, um bom primeiro pedido é: *"Leia o README e o CLAUDE.md e me mostre o que está em aberto."*

Opções: `bash setup.sh --sem-navegador` pula o Chromium do gstack (é o download maior; ele baixa sozinho no primeiro teste de site). `bash setup.sh --so-conferir` só confere, sem instalar.

### O que o setup instala

| Ferramenta | Para que serve aqui | Onde fica |
|---|---|---|
| Git, Node.js 20+ | Base de tudo. No Mac, o Node vem pelo Homebrew; o Git, por `xcode-select --install`. | sistema |
| [Claude Code](https://claude.com/claude-code) | O agente de IA que lê este repositório e usa as ferramentas abaixo. | `~/.local/bin/claude` |
| [cstack](https://github.com/joaohjonk/cstack) | O método de marca: tokens, regras checáveis e as skills `/brief`, `/creative-review`, `/brand-verify`. Comando `cstack` (o setup cria o atalho no seu `~/.zshrc`). | `~/cstack` |
| [gstack](https://github.com/garrytan/gstack) | O testador de sites do Garry Tan: abre um navegador e testa o site (`/qa`, `/design-review`), revisa código (`/review`). Precisa do Bun, que o setup também instala. | `~/.claude/skills/gstack` |
| Style Dictionary | Gera os arquivos de entrega dos tokens (CSS, variáveis do Figma, mapa do Shopify). | `node_modules/` |
| MCPs (conectores) | Netlify (publicar), Figma (ler e escrever no Figma), Shopify Dev (documentação e API do tema). Estão em `.mcp.json`: o Claude Code pergunta se pode usá-los ao abrir a pasta. | `.mcp.json` |
| Opcionais | `python3` com Pillow (checks de imagem) e `ffmpeg` (check de vídeo). O setup só avisa se faltarem. | sistema |

### Contas e licenças (passos manuais)

| O quê | De quem é | Como conseguir |
|---|---|---|
| Claude Code | sua | Rode `claude` e entre com a sua conta Claude. |
| Fontes Muoto e Muoto Mono (205TF) | da More | Os arquivos estão com a More e **nunca entram neste repositório** (o repositório é público e a licença não permite). Para publicar com elas, ver "Publicar o site". |
| Netlify (mymore.netlify.app) | do Joao | Peça ao Joao um convite para o time no Netlify. Depois, `/mcp` no Claude Code para logar o MCP. |
| Shopify (mymore.design) | da More | Acesso de colaborador pelo dono da loja. |
| Figma | sua | `/mcp` no Claude Code e entre com a sua conta. |
| fal.ai, Apify (geração e coleta) | de quem usar | Só por variável de ambiente (`FAL_KEY`, `APIFY_TOKEN`), nunca em arquivo. O orçamento em `cstack.config.yaml` está em zero: nada pago roda sem alguém mudar isso de propósito. |

## Mapa do repositório

| Pasta ou arquivo | O que é |
|---|---|
| `index.html` | A página do sistema de design (a fonte de [/sistema/](https://mymore.netlify.app/sistema/)). |
| `brand/tokens/*.tokens.json` | Os tokens no padrão W3C DTCG: cor, tipo, espaço (com grid, raio, movimento). Cada cor tem o valor medido no site e o valor oficial do guia de uso. |
| `brand/generated/tokens.css` | Os mesmos tokens como variáveis CSS, prontos para o Shopify ou qualquer página. |
| `brand/build/` | Entregas: `css/`, `figma/` (variáveis para importar), `shopify/` (mapa do tema), `pdf/` (regras numa página, o que a licença das fontes cobre). |
| `brand/rules/brand-rules.yaml` | As regras (R-COLOR-01, R-TYPE-01...). Cada uma tem um script em `checks/` ou um par de exemplos em `brand/examples/`. |
| `brand/brand-system.json` | Os fatos da marca, cada um com fonte, confiança e status (aprovado, provisório, dúvida). |
| `checks/` | Os scripts que conferem uma peça contra as regras. Ver [checks/README.md](checks/README.md). |
| `state/aceite.md`, `state/approvals.jsonl` | A tabela do que a More ainda precisa aceitar ou recusar, e onde cada decisão fica registrada. |
| `assets/official/` | A marca More do brand book em SVG, PNG e PDF. |
| `references/` | Referências com o porquê: fotos próprias (`gold/`) e a pesquisa das lojas de Home & Decor. |
| `demos/` | Hover do card de produto e a Tomada TOM.01 em 3D. |
| `site/` | O site inteiro como está no ar (menos as fontes). Cada seção é uma pasta: `guia/`, `sistema/`, `colecao/`, `loja-3d/`, `abertura/`, `stack/`, `catalogo/`, `negocio/`, e `nav/` com a faixa de navegação. |
| `scripts/` | `publicar.sh` (publica o site) e `sincronizar-sistema.sh` (leva o sistema da raiz para `site/sistema/`). |
| `setup.sh`, `.mcp.json`, `CLAUDE.md` | O setup, os conectores e as instruções para o agente. |
| `cstack.config.yaml` | Orçamento e permissões da IA. Começa em zero. |

## Tarefas comuns

### Ver o site no seu computador

```bash
python3 -m http.server 8000 -d site
```

Abra http://localhost:8000. Sem as fontes da More na pasta `site/fonts/`, as páginas usam as fontes de reserva (Helvetica Neue, Arial, Menlo), e o resto fica igual.

### Mudar uma cor, um tamanho ou um espaço

1. Edite o valor em `brand/tokens/color.tokens.json`, `type.tokens.json` ou `space.tokens.json`.
2. Confira e gere os arquivos:
   ```bash
   cstack tokens check --ws .
   cstack tokens build --ws . && node brand/tokens/font-synthesis.mjs
   npm run tokens:build
   ```
3. Leve a mudança para a página publicada: `bash scripts/sincronizar-sistema.sh`.
4. Se a mudança vale como oficial, registre a decisão em `state/approvals.jsonl` (o formato está em `state/aceite.md`).

### Conferir uma peça contra as regras

```bash
node checks/run-all.mjs <arquivo ou pasta>
```

Sai uma tabela passa/falha, em português, com a regra de cada linha. `node checks/self-test.mjs` confere os próprios scripts.

### Editar as peças da abertura

O convite, o livro, a lista, as etiquetas, as placas e a vitrine estão em `site/abertura/`. Cada peça tem um arquivo mestre `MORE_FONTE_*.html`, e o convite lê os textos de `convite/abertura.json`. Os nomes de arquivo seguem a regra R-FILE-01 (`MORE_<CANAL>_<peça>_<variante>_<AAAAMMDD>_v<nn>`), e `node checks/filename.mjs` confere.

Os arquivos exportados (PNG, PDF e MP4 em `exports/`) foram gerados por `_tools/exportar-abertura.sh` e `exportar-loja.sh`. Os scripts auxiliares que eles chamam (`shot.mjs`, `pdf.mjs`, `frames.mjs`, `caixas.py`, `dpi.py`) ainda não estão neste repositório: peça ao Joao, ou peça ao Claude Code para refazê-los a partir do que o `.sh` descreve.

### Publicar o site

```bash
bash scripts/publicar.sh                                # prévia num endereço de rascunho; o site no ar não muda
bash scripts/publicar.sh --prod --fontes <pasta>        # publica no endereço principal, com as fontes da More
```

A pasta de `--fontes` precisa ter `205TF-Muoto-Regular.otf` e `205TF-MuotoMono-CondensedRegular.woff2`, os dois arquivos da licença. O script os copia para `/fonts/` no pacote publicado, nunca para o repositório. Na primeira vez, o Netlify abre o navegador para o login (é preciso estar no time do site). O site ainda não publica sozinho a cada commit: ligar o Netlify ao repositório é um passo para depois.

### Trabalhar com a IA

- **Criar algo:** comece com `/brief`; depois a skill do trabalho (`/copywriting`, `/workflow landing-page`, `/shot-dna`).
- **Checar:** `/brand-verify` e `/creative-review`. Quem cria nunca aprova o próprio trabalho.
- **Testar o site:** `/qa https://mymore.netlify.app` (fluxos e erros) e `/design-review` (o visual), do gstack.
- **Aprender:** toda correção do time vira regra nova em `brand/rules/`. É assim que o gosto da More se acumula em vez de se perder.

## O que não se quebra

- **Fonte licenciada nunca no repositório.** O `.gitignore` bloqueia `.otf`, `.woff`, `.woff2` e `.ttf` em `site/`, e `node checks/fontes.mjs` confere.
- **Peça nunca gerada por IA.** Foto de produto é fotografia (R-IMG-01). A IA trabalha em volta: texto, layout, conferência.
- **Chave só em variável de ambiente.** Nunca em arquivo, nunca no commit.
- **Nada publica sozinho.** `cstack.config.yaml` tem `publish: allowed: false`; publicar é sempre `scripts/publicar.sh` rodado por uma pessoa.
- **Tudo é proposta até a More aceitar.** Os tokens e as regras estão como provisórios; o aceite fica em `state/approvals.jsonl`.

## Perguntas em aberto para a More

- No guia, [O que só a More responde](https://mymore.netlify.app/guia/#perguntas): as perguntas numeradas sobre marca e impresso, onde o guia de uso e o site discordam, medidas, preços, fotos e o site.
- No sistema, `state/aceite.md`: cada regra, token e proposta esperando aceite ou recusa.
- Em `checks/nomes-canonicos.json`: os nomes de peça marcados `decisao_pendente`.

## Como isto foi feito

Com o [cstack](https://github.com/joaohjonk/cstack), o [gstack](https://github.com/garrytan/gstack) e o Claude Code, a partir de medidas do site e do Instagram da More (15/10/2026), do guia de uso da marca e da conversa com o time. O método está em [/guia/](https://mymore.netlify.app/guia/) e o stack da loja em [/stack/](https://mymore.netlify.app/stack/).
