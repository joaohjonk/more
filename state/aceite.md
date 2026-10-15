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
| R-LAYOUT-02 | uma peça por foto de produto (grade, PDP, post de peça), ver o par de exemplos. Proporção da imagem 3:4 (fonte), 4:5 (feed, 1080x1350), 9… | medida no site | |
| R-IMG-01 | foto de peça é fotografia, nunca gerada ou alterada por IA; troca de acabamento só com foto real ou render exato do material. O arquivo f… | medida no site | |
| R-IMG-02 | registro estúdio = fundo bege infinito + uma luz dura lateral com sombra de janela de borda nítida; registro low-key = fundo quase preto … | medida no site | |
| R-GEN-01 | a marca entra sempre como o arquivo oficial assets/official/more-wordmark.svg ou more-wordmark-small.svg - por referência (<img>/<image>/… | medida no site | |
| R-COPY-01 | nenhuma palavra proibida (exclusivo/a, exclusividade, sofisticado/a, sofisticação, luxuoso/a, luxo, requintado/a, requinte, premium, glam… | medida no site | |
| R-COMMERCE-01 | toda página de produto (og:type=product) mostra em texto exatamente um rótulo - "Pronta entrega" ou "Sob encomenda" com prazo em dias, se… | medida no site | |
| R-COMMERCE-02 | nenhum card de grade (classe product-card* ou card-product*) mostra preço (R$); o preço fica na página de produto (proposta da call de 20… | medida no site | |
| R-MOTION-01 | duração é um token motion.duration - 80, 140, 200, 300, 450, 500, 700, 800 ou 1000ms (0s = troca instantânea); qualquer outro valor falha… | medida no site | |
| R-COPY-02 | legenda de peça = frase com o nome canônico (checks/nomes-canonicos.json), depois UMA linha seca de 3 a 12 palavras sem palavra de materi… | proposed | |
| R-COPY-03 | português primeiro. Página com <html lang="pt-BR">; todo bloco de 6+ palavras em inglês (mais palavras-função inglesas que portuguesas) f… | proposed | |
| R-COLOR-04 | tons color.campo (vermelho-jambo, amarelo-igarata, verde-jamaica, berinjela; petróleo é só proposta) são fundo de cartaz, convite, livro,… | proposed | |
| R-LOGO-01 | num layout (SVG com viewBox, ou HTML com data-canvas="LxA"), a marca é M (lado maior da marca = 16-25% do lado menor do quadro) ou XL (95… | proposed | |
| R-SHAPE-02 | no ellipses, pills or rounded graphic shapes in any medium | rejected | |
| R-LAYOUT-03 | todo contêiner com rolagem vertical (overflow ou overflow-y auto/scroll) termina com padding-bottom >= 106px (layout.bar-safe) no mesmo s… | proposed | |
| R-NAME-01 | um nome canônico por peça, "<Tipo> <complemento em minúscula> <Nome>" (Mesa de centro Cildo, Cadeira 556-A), igual no site, Instagram, et… | proposed | |
| R-FILE-01 | arquivos se chamam MORE_<CANAL>_<peça-slug>_<variante>_<AAAAMMDD>_v<nn>.<ext> (MORE_IG_mesa-de-centro-cildo_4x5_20261105_v02.jpg). CANAL … | proposed | |
| R-PRINT-01 | PDF de impressão declara PDF/X-4, toda página tem TrimBox e BleedBox com 3mm de sangria em cada lado, e off-white nunca é tinta (é o pape… | proposed | |
| R-MOTION-02 | vídeo troca de foto por corte seco (Hard cut) - nenhuma fusão nem fade, medido pelo script; o movimento de luz é Shadow sweep (mancha dur… | proposed | |
| P-01 | XL embaixo, quase sangrando | observada na marca | |
| P-02 | M = 1/6 do lado curto | inferida | |
| P-03 | S = 60px / 18mm mínimo | inventada por nós | |
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
