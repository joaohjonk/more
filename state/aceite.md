# Tabela de aceite

Uma linha por regra, proposta ou grupo de tokens. Para decidir, acrescente uma linha em `state/approvals.jsonl` com o mesmo `artifact_ref`, `type` `approve` (aceita) ou `reject` (recusa), `by` com o nome de quem decidiu, `date` e `reason` (o porquê, ou o que muda). Exemplo:

```json
{"id":"dec-R-COLOR-01","date":"2026-11-05","by":"Nome","type":"approve","artifact_ref":"brand/rules/brand-rules.yaml#R-COLOR-01","reason":"ok"}
```

| Item | O quê | Origem | Decisão |
|---|---|---|---|
| R-COLOR-01 | toda cor literal em CSS/HTML/SVG é o valor de um token de cor aprovado (brand/generated/tokens.css). Tokens color.site-sem-token-* (#1A1A… | medida no site | |
| R-COLOR-02 | html/body/:root declara background off-white #E5E1DB e color preto #2D211E; #000 opaco não aparece em nenhuma propriedade; #FFF nunca é f… | medida no site | |
| R-COLOR-03 | ciano-destaque #8BC0D0 é a única cor cromática da interface (saturação HSL >= 0,25; a outra exceção é erro #E07A5F em seletor de erro). C… | medida no site | |
| R-SHAPE-01 | estrutura é reta (radius.none) - imagens, cards, barras, botões de checkout e filtro, inputs. border-radius só pode ser 0, 2px (radius.th… | medida no site | |
| R-TYPE-01 | font-family começa com Muoto ou MuotoMono (Muoto Mono Condensed); fallbacks só DM Sans, Martian Mono, Helvetica Neue, Arial, sans-serif, … | medida no site | |
| R-TYPE-02 | toda ação de texto (<button>, <input type=submit/button>, <a> com classe btn/button, role=button) tem uma palavra entre colchetes ([Volta… | medida no site | |
| R-LAYOUT-01 | menu, carrinho e adicionar-ao-carrinho (seletor fixed/sticky com menu, add-to-cart, add_to_cart, in-cart, cart-button, checkout) ficam em… | medida no site | |
| R-LAYOUT-02 | uma peça por foto de produto (grade, PDP, post de peça), ver o par de exemplos. Proporção da imagem 2:3 (fonte: o original da câmera, como o… | medida no site | |
| R-IMG-01 | foto de peça é fotografia, nunca gerada ou alterada por IA; troca de acabamento só com foto real ou render exato do material. O arquivo f… | medida no site | |
| R-IMG-02 | registro estúdio = fundo bege infinito + uma luz dura lateral com sombra de janela de borda nítida; registro low-key = fundo quase preto … | medida no site | |
| R-GEN-01 | a marca entra sempre com os paths oficiais (assets/official/more-wordmark*.svg, o desenho do brand book de Manoela Moura e Anna's, 2025; os … | medida no site | |
| R-COPY-01 | nenhuma palavra proibida (exclusivo/a, exclusividade, sofisticado/a, sofisticação, luxuoso/a, luxo, requintado/a, requinte, premium, glam… | medida no site | |
| R-COMMERCE-01 | toda página de produto (og:type=product) mostra em texto exatamente um rótulo - "Pronta entrega" ou "Sob encomenda" com prazo em dias, se… | medida no site | |
| R-COMMERCE-02 | nenhum card de grade (classe product-card* ou card-product*) mostra preço (R$); o preço fica na página de produto (proposta da call de 20… | medida no site | |
| R-MOTION-01 | duração é um token motion.duration - 80, 140, 200, 300, 450, 500, 700, 800 ou 1000ms (0s = troca instantânea); qualquer outro valor falha… | medida no site | |
| R-COPY-02 | legenda de peça = frase com o nome canônico (checks/nomes-canonicos.json), depois UMA linha seca de 3 a 12 palavras sem palavra de materi… | proposed | |
| R-COPY-03 | português primeiro. Página com <html lang="pt-BR">; todo bloco de 6+ palavras em inglês (mais palavras-função inglesas que portuguesas) f… | proposed | |
| R-COLOR-04 | tons color.campo (vermelho-jambo, amarelo-igarata, verde-jamaica, berinjela; petróleo é só proposta) são fundo de cartaz, convite, livro,… | proposed | |
| R-LOGO-01 | num layout (SVG com viewBox, ou HTML com data-canvas="LxA"), medido pelo script. Onde leva marca (tipo lido do nome MORE_<CANAL>_<slug>_<var… | proposed | |
| R-SHAPE-02 | no ellipses, pills or rounded graphic shapes in any medium | rejected | |
| R-LAYOUT-03 | todo contêiner com rolagem vertical (overflow ou overflow-y auto/scroll) termina com padding-bottom >= 106px (layout.bar-safe) no mesmo s… | proposed | |
| R-NAME-01 | um nome canônico por peça, "<Tipo> <complemento em minúscula> <Nome>" (Mesa de centro Cildo, Cadeira 556-A), igual no site, Instagram, etiqu… | proposed | |
| R-FILE-01 | arquivos se chamam MORE_<CANAL>_<peça-slug>_<variante>_<AAAAMMDD>_v<nn>.<ext> (MORE_IG_mesa-de-centro-cildo_4x5_20261105_v02.jpg). CANAL … | proposed | |
| R-PRINT-01 | PDF de impressão declara PDF/X-4, toda página tem TrimBox e BleedBox com 3mm de sangria em cada lado, e off-white nunca é tinta (é o pape… | proposed | |
| R-MOTION-03 | a segunda foto do card entra por fusão no quadro de hoje (75%, primeira a 60%) - só opacity, 300ms ou 0, ease; sem escala (demos/hover-foto) | proposed | |
| R-MOTION-04 | a interação orienta, não encena - sem sequestro de rolagem, loader teatral, cursor próprio ou carrossel automático; hover também por foco | proposed | |
| motion.role.*, motion.distance.*, motion.scale.soft | papéis de movimento (hover-swap 300ms ease, panel 500ms, enter 450ms out-expo), distância (0 / 24px) e escala leve | proposed | |
| R-MOTION-02 | vídeo troca de foto por corte seco (Hard cut) - nenhuma fusão nem fade, medido pelo script; o movimento de luz é Shadow sweep (mancha dur… | proposed | |
| P-01 | XL embaixo, quase sangrando | observada na marca | |
| P-02 | M = 1/6 do lado curto | inferida | |
| P-03 | S = 120 px / 18 mm mínimo, guia p. 5 (o menu do site usa 60 px) | guia de uso | |
| P-04 | respiro = altura do O | inventada por nós | |
| P-05 | Sombra que atravessa a peça | observada na marca | |
| P-06 | Corte seco, ordem ampla → detalhe → material | inferida | |
| P-07 | Build M-O-R-E com 120ms de defasagem | inventada por nós | |
| P-08 | Fundo de cor saturada atrás de uma peça | observada na marca | |
| P-09 | Os 5 hex | inferida | |
| P-10 | Nomes Vermelho Jambo, Amarelo Igaratá, Verde Jamaica, Berinjela | inferida | |
| P-11 | Nome 'petróleo' | inventada por nós | |
| P-12 | Sem elipses (R-SHAPE-02) | inventada por nós | |
| T-COLOR | Paleta de cores do :root do site como tokens oficiais | medida no site | |
| T-TYPE | Escala de tipo medida no site (9–32px), pesos 300/400/600 | medida no site | |
| T-SPACE | Espaços, raios, breakpoints e durações medidos no site | medida no site | |
| T-SITE-SEM-TOKEN | #1A1A1A, #DAD7D1, #DEDBD5: viram token ou o tema passa a usar um existente? | medida no site | |
| T-TEXT-COLOR | Texto corrido em preto #2D211E (corrige o #000 do site) | medida no site | |
| C-story | Story: texto no terço de cima, Muoto 44 px e mono 26 px, sem marca, sem colchetes | padrão provisório | |
| C-texto-sobre-foto | Texto sobre foto: preto em área clara, branco em área escura, nunca sobre a peça | padrão provisório | |
| C-etiqueta | Etiqueta: nome, status sem colchetes, medidas e madeira do site, mymore.design, sem preço, furo 5 mm | padrão provisório | |
| C-pagina-evento | Página de evento: [Como chegar] com link do Google Maps | padrão provisório | |

## Material oficial, 15.10

Propostas que saem do guia de uso da More (`marca-oficial/guia-de-uso/More • guia de uso.pdf`, Drive 1v1F7NWHiFE0gDpsAXdnpaUCMZh7f8Et3). Páginas do PDF como o leitor mostra; o número impresso no rodapé é uma a menos. Nada aqui muda token ou regra até o time decidir.

| Item | O quê | Origem | Decisão |
|---|---|---|---|
| P-COR-01 | Preto puro e branco do guia no lugar do preto quente #2D211E e do off-white #E5E1DB. Pergunta para o time: o site é exceção ao guia? | guia de uso, p. 8-10 | |
| P-COR-02 | A paleta sazonal oficial de 9 cores (hex, CMYK, Pantone) substitui os cinco color.campo, que ficam como alias. R-COLOR-04 passa a citar as regras do guia: uma cor sazonal por layout, sem tons nem degradês, texto só preto ou branco sobre cor, cor sobre foto só com a foto em preto e branco e a cor em multiply | guia de uso, p. 11-15 | |
| P-COR-03 | Nunca preto com cinza (Preto 89%) no mesmo layout. O rodapé do site hoje junta o bloco cinza-escuro com as barras em preto por cima | guia de uso, p. 14 | |
| P-LOGO-02 | Regras de uso da marca: pode em outline; na vertical, lida de baixo para cima; nunca em cor, na diagonal, de cima para baixo, com máscara de foto ou com efeito; sempre preto, cinza #434345 ou branco | guia de uso, p. 6 | |
| P-IMG-03 | R-IMG-02 reescrita com o texto do guia: quatro tempos de luz na campanha (amanhecer, meio-dia, entardecer, noite); still com luz difusa e sombra levemente marcada; seis ângulos (frente, 3/4 frente, lado, costas, 3/4 costas, detalhe); sem pessoas, sem estúdio à mostra, sem luz com desenho de janela, sem luz escura e dramática (low-key), sem luz flat sem sombra | guia de uso, p. 20-24 | |
| P-IMG-04 | Receita de luz do EXIF ao lado dos exemplos de R-IMG-02: Canon EOS 5D Mark IV, EF 100 mm f/2.8L Macro e EF 24-70 mm f/2.8L II, f/7,1, 1/80 s, ISO 400, balanço de branco manual (MORE_0800 e amostra da campanha) | guia de uso, p. 20-23 | |
| P-GRID-01 | Grid de campanha do guia: margem de cerca de 5% do lado menor, colunas finas em múltiplos de três (9, 12, 15 ou 18), texto corrido até 12 pt e títulos até 20 pt, um alinhamento por peça | guia de uso, p. 26-31 | |
| P-TYPE-03 | O guia só nomeia Muoto Regular. Decidir se a Muoto Mono Condensed do site (preços, medidas, botões) é uma exceção documentada ao guia | guia de uso, p. 17 | |
| P-CAMPO-01 | vermelho-jambo deixa de ser campo e vira o acabamento vermelho da TOM.01 (pasta PDT_FIX_TOM_TOM.01, variante _V). O vermelho da paleta oficial é outro (#AE1B3A, Pantone 206 C) | guia de uso, p. 11 | |
| P-CAMPO-02 | verde-jamaica, berinjela e petroleo marcados "sem foto oficial": as fotos do Instagram de onde saíram não têm original no Drive, e nenhuma das 9 cores do guia bate com elas | guia de uso, p. 11 | |
| R-FONT-01 | Nenhum arquivo de fonte (.otf, .ttf, .woff, .woff2, .eot) no repositório nem no histórico. Script pronto em checks/fontes.mjs, fora do run-all até o aceite. Hoje falha: 8 arquivos da Muoto em dois branches de outras frentes (site/abertura, site/nav, site/catalogo, site/loja-3d) | guia de uso, p. 17 (Muoto, 205TF) e EULA 205TF | |
