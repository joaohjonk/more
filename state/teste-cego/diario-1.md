# Diário do teste cego · 10 peças

Designer da More, sem histórico da conversa, só com /home/user/more-blind e as fotos do Instagram. Data: 15/10/2026.
Formato: peça · regra ou seção · o que precisei decidir · o que escolhi · onde o sistema deveria ter dito. "geral" = vale para várias peças.

## Entradas

- [geral] [tokens.css / build] Dois CSS de tokens gerados com conteúdos diferentes (brand/generated/tokens.css e brand/build/css/more-tokens.css, este com rgba e comentários) e um terceiro desatualizado embutido em brand/generated/guide.html (radius-round 999px, sem DM Sans/Martian Mono no fallback) · usei brand/generated/tokens.css, copiado para pecas/css/tokens.css · o README deveria dizer qual arquivo é a fonte para peças fora do Shopify e o guide.html deveria ser regenerado ou apagado
- [geral] [R-COLOR-01] O próprio tokens.css gerado reprova no check R-COLOR-01 (#1A1A1A, #DAD7D1, #DEDBD5 dos tokens site-sem-token) quando fica junto das peças · mantive o arquivo como veio e registrei a falha · o build deveria excluir color.site-sem-token-* do CSS ou o check deveria ignorar definições de variável
- [geral] [Tipografia] Fontes substitutas: o sistema cita DM Sans e Martian Mono largura 75 "Google Fonts" e o index carrega DM Sans 400/600 e Martian Mono wdth 75 · carreguei exatamente a mesma URL do index.html · deveria haver uma linha "para peças fora do site, carregue esta URL" no guia de tipografia
- [geral] [Tipografia] O sistema não diz se peça impressa (PDF) pode usar as substitutas livres ou se deve esperar a licença desktop da 205TF · usei DM Sans/Martian Mono no PDF · a seção "Escala de impressão" deveria dizer o que fazer até a licença chegar
- [geral] [R-TYPE-01 / tokens] Pesos: type.statement/about/label pedem 300, R-TYPE-01 só aceita 300 em seletor .muoto, o metricas.md diz que 300 renderiza 400 · usei 400 em tudo · os tokens compostos deveriam dizer 400 se é o que aparece
- [geral] [Escala social] Não existe escala de tipo para Instagram (1080 px); só tela (px) e impresso (pt) · usei tokens de tela ×2 (1080 = 2× um celular de 540) e display sem multiplicar · a seção "Exportação por canal" deveria trazer tamanhos de texto para feed e story
- [geral] [Escala display] display-1 diz "só impresso e telas maiores que um celular" e no mesmo token "na tela use clamp(96px, 20vw, 240px)", que só faz sentido em celular · usei o clamp na landing, inclusive em 390 px · decidir se display entra no celular
- [geral] [Escala display] Entrelinha de display: index diz 0,9 para os três; token display-3 diz 0,95 · usei 0,9 · unificar no token
- [geral] [Tipografia impressa] Tokens font.print-size estão em "px" mas a descrição diz pt (6 pt, 7 pt…) · tratei como pt e converti (pt×96/72) · o token deveria ter unidade pt ou mm
- [geral] [Fotografia / R-LAYOUT-02] As fotos de origem não são 3:4: Instagram 1440×1440, 1080×1350, 1440×1631; site 600×900 e 1000×1499 (2:3) · recortei 4:5, 9:16 e 3:4 do que havia, no centro · o sistema deveria dizer de onde vêm os originais 3:4 e o que fazer quando a origem é quadrada
- [geral] [Fotografia] "4:5 = recorte do topo da foto 3:4" não diz como recortar 9:16 (topo, centro?) nem a partir de foto 2:3 · recortei no centro · Exportação por canal deveria dar a âncora de cada recorte
- [geral] [R-FILE-01] O pedido mandou nomear <nn>-<canal>-<slug>, o sistema exige MORE_<CANAL>_<peça-slug>_<variante>_<AAAAMMDD>_v<nn> · segui o pedido e o check reprova os 12 arquivos · o sistema não prevê slug para peças sem peça (abertura, bastidores, sobre): só "marca"
- [geral] [R-FILE-01] Não há CANAL para etiqueta (PRINT? VITRINE?) nem para página web além de SITE, nem regra de nome para o HTML-fonte · não apliquei · a lista de canais deveria cobrir etiqueta e fonte HTML
- [geral] [R-LAYOUT-02 / aspect.mjs] O check de proporção mede qualquer PNG, inclusive captura de página inteira, e reprova as 4 capturas web · mantive as capturas · o check deveria valer só para foto de produto, ou a regra deveria isentar capturas
- [geral] [R-COLOR-03 × R-COLOR-04] accent.mjs reprova o campo de cor em qualquer CSS, sem distinguir CSS da loja de CSS de peça social/impressa feita em HTML · mantive os campos (a R-COLOR-04 manda usar no social e no impresso) · o check deveria isentar layouts com data-canvas ou @page
- [geral] [Marca / arquivo oficial] assets/official/more-wordmark.svg vem com fill="black" (#000), proibido pela R-COLOR-02 e fora dos tokens · usei os paths oficiais inline com fill preto #2D211E/branco/off-white · o arquivo oficial deveria vir com currentColor ou #2D211E
- [geral] [R-LOGO-01 × logo_marks × token logo] Cores da marca: R-LOGO-01 só preto/branco/off-white; brand-system e o token logo aceitam cinza-claro no escuro; o rodapé do index usa #c9c2b9 (fora dos tokens) · usei off-white no rodapé cinza-escuro · escolher uma lista
- [geral] [R-LOGO-01 × token logo] Respiro "igual ao O" e S 60px/18mm aparecem como regra no token logo e como proposta no index · não usei como regra; usei S 60px só na barra porque é a medida observada do site · alinhar token e index
- [geral] [R-LOGO-01] M é "1/6 do lado curto" no index e no token, mas "16–25%" no check · usei 1/6 exato · dizer se 1/6 é alvo e 16–25% tolerância
- [geral] [Propostas] O index diz que cada proposta tem uma linha em state/approvals.jsonl, mas o arquivo está vazio · tratei tudo marcado PROPOSED/proposed como utilizável com registro aqui · o arquivo deveria existir com as linhas
- [geral] [tokens/README] O README de tokens diz que só valores oficiais entram nos tokens, mas os tokens têm valores PROPOSED e inventados (petróleo, display, bar-safe) · usei os tokens, evitei petróleo · o README ou os tokens precisam mudar
- [geral] [Cor campo] Dois nomes para o mesmo amarelo (amarelo-igarata e mostarda-igarata) · usei amarelo-igarata · remover o alias do CSS gerado
- [geral] [Cor campo] O sistema não diz qual campo usar para qual assunto · escolhi verde-jamaica para a abertura e amarelo-igaratá para a Cildo · deveria haver um critério (peça/acabamento → campo) ou uma regra de rodízio
- [geral] [Voz] Fatos da abertura: o sistema só traz "05.11", "Abertura 05.11 [Jardins]" e o endereço dentro da imagem do cartaz p28_0 (Alameda Franca, 1332 casa 04, São Paulo, SP); nunca diz em texto que 05.11 é a abertura da loja, nem o ano, horário ou o que acontece · usei só data e endereço; sem horário e sem ano · o brand-system deveria ter um fato "loja física" com endereço, data e horário
- [geral] [Voz] "Loja", "galeria" ou "estúdio": o sistema usa os três (estúdio e galeria no texto Sobre em inglês, loja física na R-COLOR-04) · usei "loja" na abertura e "estúdio e galeria" no Sobre · definir o nome do lugar
- [geral] [R-COPY-01 × crenças] A frase aprovada "Para projetos sem personalidade, a concorrência resolve." (Crença 3, também R-COPY-02) contém "personalidade", palavra proibida pela R-COPY-01 · tirei a frase do Sobre · decidir se a citação é exceção
- [geral] [R-COPY-02] A fórmula de legenda é só para peça; não há fórmula para post sem peça (abertura, bastidores) e o check reprova essas legendas por falta de nome canônico · escrevi no mesmo tom e aceitei a falha · criar fórmula para evento/bastidores
- [geral] [R-COPY-02] "linha seca sem palavra de material" não traz a lista de palavras de material que o check usa · descobri por tentativa que "Pronta entrega." e "Três pinos" contam como linha extra · publicar a lista
- [geral] [Imagens] Instagram não traz legenda completa no index.json (corta em 90 caracteres) · usei só o que aparece · o sistema deveria guardar as 42 legendas
- [geral] [R-COLOR-02 × R-PRINT-01] html/body precisam declarar fundo off-white (R-COLOR-02), mas no PDF off-white não pode ser tinta (R-PRINT-01) · declarei off-white na tela e background:none em @media print · as duas regras deveriam citar esse caso
- [geral] [R-PRINT-01] Não há como exportar PDF/X-4 com Chromium e sem instalar pacotes · exportei PDF RGB com TrimBox/BleedBox de 3 mm (pypdf), sem perfil de saída · o check reprova os 4 PDFs; o sistema deveria dizer qual ferramenta usar ou aceitar PDF com boxes para prova
- [geral] [R-PRINT-01] Perfil de cor CMYK, preto rico (C60 M70 Y70 K80 na tabela × C60 M50 Y50 K100 na tabela × C60 M40 Y40 K100 na regra) — três receitas de preto rico diferentes · não converti para CMYK · escolher uma
- [geral] [R-PRINT-01] 300 dpi é impossível com as fotos disponíveis (máx. 1440 px; A2 a 300 dpi pede 4961×7016) · usei o que havia · o sistema deveria dizer onde ficam os originais
- [geral] [Impressão / grid] Margem de 1/24 do lado curto contra segurança de 5 mm: na etiqueta A6 1/24 = 4,4 mm, menor que a segurança · usei 5 mm na etiqueta e 17,5 mm no A2 · dizer qual vence
- [geral] [Impressão] Texto branco sobre campo no papel: o sistema não diz se é vazado (papel off-white aparecendo) ou tinta branca · usei branco (#FFF = sem tinta, vira papel) · dizer na receita do cartaz
- [geral] [Web] Barra flutuante de vidro (preto 10%) sobre o rodapé cinza-escuro some, e a marca preta da barra fica ilegível · mantive como no site · o componente deveria ter estado "sobre fundo escuro"
- [geral] [Web / captura] As barras fixas aparecem no meio da captura de página inteira · aumentei a janela até a altura do documento antes de capturar, para elas ficarem no pé · o sistema não diz como documentar páginas com barra fixa
- [01] [Fotografia / social] Post de peça leva texto ou marca sobre a foto? O Instagram observado não tem texto (créditos só na legenda) e o index diz que M aparece em "post" · fiz só a foto 4:5 e a legenda em .txt · dizer quando post leva marca
- [01] [Imagem] Foto da Poltrona Leticia: p31_1 é 1440×1440 (não 3:4) e a foto do site é 600×900 · usei p31_1 recortada no centro para 1080×1350 · registrar a foto-mestra de cada peça
- [01] [R-NAME-01] Leticia ou Letícia: canônico "Poltrona Leticia" está como decisão pendente e o Instagram usa "Letícia" · usei Leticia · decidir
- [01] [Voz] O pedido diz "anunciar", mas a peça já foi postada em 09/03/2026 e o sistema não diz se é lançamento · escrevi como post de peça, sem "nova" · dizer se há tom de lançamento
- [01] [R-COPY-02] Linha seca nova: "Deslocada é a sala, não ela." (eco do post p31) · escolhi esta · as linhas aprovadas não cobrem a Leticia
- [02] [Receita do cartaz × graphic_devices] Index: três blocos em Muoto girados, marca M; brand-system: "coluna mono girada, marca XL ou vertical" · usei blocos em Muoto girados e marca XL (convite 05.11) · unificar a receita
- [02] [graphic_devices.barra_impressa × XL] A barra preta no pé ("Abertura 05.11 [Jardins]") e a marca XL encostada embaixo disputam o mesmo lugar · fiquei só com XL · dizer qual vence
- [02] [Colchetes] "Colchetes envolvem ações e datas, nunca nomes", mas o exemplo do próprio sistema é "[Jardins]" (um nome) · não usei colchete em nome de lugar · corrigir o exemplo ou a regra
- [02] [Elipse] A elipse laranja do convite: R-SHAPE-02 foi rejeitada (elipse permitida), mas anti_references.elipse_convite ainda cita a quebra da R-SHAPE-02 · não usei elipse · tirar a citação ou decidir
- [02] [Logo XL] XL "pode sangrar embaixo" (token) × "base a no máximo 5% da base do quadro" (check) × demo do index com bottom:-4% · usei 97% da largura e 16 px da base · dar um número
- [02] [Texto] Tamanho dos blocos girados: no cartaz da TOM.01 o texto tem ~1,2% da largura; não há token · usei label ×2 = 22 px · dar tamanho para os blocos
- [02] [Cor do texto] Texto sobre campo: branco (cartaz TOM.01) ou off-white? R-COLOR-01 aceita branco só como texto · usei branco · dizer na receita
- [02] [R-COPY-02] Linha seca para evento: "Menos do mesmo, agora com endereço." (tagline + endereço) · escolhi · não há linha aprovada para evento
- [03] [R-COLOR-03 × proposta ciano] O index diz "R-COLOR-03: o ciano significa disponível agora"; o YAML diz que isso é só proposta e que ciano é só estado de navegação · não usei ciano no story · alinhar index e YAML
- [03] [R-COMMERCE-01] "Pronta entrega … com prazo": o sistema não dá prazo de entrega para a TOM.01 · escrevi "Pronta entrega" sem prazo · dar o prazo ou dizer que pronta entrega não leva prazo
- [03] [Preço] Preço da TOM.01 é R$ 1 (placeholder) · não pus preço · registrar o preço real
- [03] [Colchetes] "[Pronta entrega]" aparece entre colchetes na etiqueta proposta, mas colchetes são para ações e datas · no story escrevi "Pronta entrega" sem colchetes e "[Comprar]" como ação · decidir se status leva colchete
- [03] [Imagem] A foto com os três miolos ficava sob o texto na área segura de 250 px · troquei pela foto do site com miolo preto (PDT_FIX_TOM_TOM, 1000×1499, ampliada 1,28×) · o sistema não diz onde fica o texto no story nem a resolução mínima
- [03] [Fatos] "Anel de metal" (brand-world: bronze-tone) e "NBR 14136, 20 A" são do brand-world em inglês; a legenda p28 diz "primeira e única tomada no frame do Brasil" (alegação) · usei só medidas e padrão, sem a alegação · marcar se a alegação está liberada
- [03] [R-TYPE-02] Link no story ("[Comprar] mymore.design") não é clicável em PNG · mantive como texto · dizer como tratar CTA em story
- [04] [Fotografia: bastidores × social_behavior] photography.bastidores permite gente no set no Instagram; social_behavior diz "No people" no Instagram · segui bastidores (confiança baixa) · resolver o conflito
- [04] [positioning] "Pessoas podem aparecer, mas não são a narrativa" · não nomeei ninguém nem creditei na imagem · dizer se bastidores credita fotógrafo na legenda (social_behavior.credits)
- [04] [Imagem] O sistema não diz de qual sessão é a foto nem a data · não citei sessão, data nem peça · o pedido "bastidores de uma sessão" ficou genérico por falta de fato
- [04] [Cor do texto] Texto sobre foto clara: o sistema não diz cor de texto sobre foto · usei preto #2D211E no alto, onde a parede é clara · dar regra de texto sobre foto
- [04] [Marca] Story leva marca? Não há regra · não pus · dizer
- [05] [Etiqueta: tamanho] O sistema define etiqueta 50×90 mm; o pedido é A6 105×148 · segui o pedido · dizer se A6 é outro objeto (ficha) ou se a etiqueta muda
- [05] [Etiqueta: sangria] Sangria de 3 mm vale para etiqueta sem cor chapada? · fiz 3 mm (página 111×154) · a receita da etiqueta deveria dizer
- [05] [Etiqueta: conteúdo] O sistema só diz "nome em Muoto, linha em mono"; medidas, materiais, preço, marca, site e verso não são citados · pus marca M no topo, nome, status, medidas, madeiras, acabamentos, "12 opções" de tecido, descrição e mymore.design/@more.mymore · dar o conteúdo mínimo e máximo
- [05] [Etiqueta: tamanho do nome] print-size.ui diz "10 pt: nomes em etiquetas", mas em A6 fica pequeno · usei 20 pt (statement) · dizer para A6
- [05] [Etiqueta: furo/cordão] Não há posição de furo ou cordão · não marquei · incluir
- [05] [Prazo] "~120 dias" (proposta da etiqueta) × "8 a 10 semanas" (exemplo do R-COMMERCE-01) × "~120 days" (business_truth) · usei "[Sob encomenda · ~120 dias]" · dar o prazo por peça
- [05] [Preço] "A partir de R$ 23.990" aparece no index como "como está hoje"; R-COMMERCE-02 é sobre grade, nada sobre etiqueta · não pus preço · dizer se etiqueta leva preço
- [05] [Materiais] Os 12 tecidos estão listados no brand-system, mas não se sabe se valem para a Leticia; o brand-world diz "12 bouclês/veludos/tecidos" · escrevi "12 opções" sem nomes · ligar materiais a cada peça
- [05] [R-COPY-01 / copy.mjs] A tabela de medidas sem ponto final virou uma "frase de 34 palavras" no check · mantive a tabela · o check deveria ignorar dl/tabela
- [05] [Cor do texto pequeno] cinza-medio "rótulos curtos" na tabela de impressão × "use cinza-escuro em texto pequeno" no token · usei cinza-escuro nas medidas · alinhar
- [05] [Fio] Fio de tabela: "vidro vira preto 10%" no papel, mas não há regra para fio · usei preto 10% · dizer espessura e cor de fio impresso
- [06] [business_truth × pedido] O sistema diz que a TOM.01 é o único produto em estoque; o pedido diz Banco Maria pronta entrega (e o Instagram diz Luminária Ngoni "À pronta entrega") · segui o pedido e marquei o Banco Maria como pronta entrega também na landing · atualizar a lista de pronta entrega
- [06] [Ciano no papel] "Ciano só como adesivo quadrado de 10 mm" — adesivo à parte ou impresso na etiqueta? · imprimi um quadrado de 10 mm no canto (o check accent reprova) · dizer
- [06] [Fatos] Não há medidas, madeira, prazo nem preço confirmados do Banco Maria (o "R$ 4.880" do espécime do index não tem fonte) · sem medidas, sem preço; usei a linha da própria More "O João é opcional, mas sempre bem-vindo." · registrar a ficha da peça
- [06] [Ortografia] A legenda original escreve "bem vindo"; o certo é "bem-vindo" · corrigi · o sistema não diz se citações do Instagram podem ser corrigidas
- [07] [Receita do cartaz] A receita fala em "a peça em silhueta"; o cartaz de abertura não tem peça definida · fiz só tipografia + XL, sem peça · dizer se cartaz de evento leva peça
- [07] [Grid de impressão] 12 colunas, linha de base 12 pt: o sistema não mostra um layout de exemplo · usei margem 17,5 mm, data no canto superior direito, blocos girados na margem esquerda · incluir um gabarito
- [07] [Display] "05.11" em display-1 240 pt · usei · o display é proposta "inventada por nós"; usei mesmo assim
- [07] [Texto] Blocos girados em 14 pt (title) — no cartaz da TOM.01 o texto é muito menor; não há token · escolhi 14 pt · dar tamanho
- [08] [R-IMG-01 × receita do cartaz] A receita pede a peça em silhueta preta; R-IMG-01 proíbe peça "alterada por IA" · fiz a silhueta por limiar de luminância e caixas nas pernas (código determinístico, sem modelo), a partir da foto do site · dizer se silhueta é permitida e quem a faz
- [08] [Imagem] A foto da Cildo no site tem 600×899; ampliada para A2 a silhueta perde detalhe (pernas ficaram com canto reto) · aceitei · o sistema deveria ter o original ou o desenho técnico
- [08] [Cor da marca no amarelo] A receita diz marca e texto em branco (cartaz vermelho); no amarelo-igaratá o branco some · usei preto #2D211E · a receita deveria dar a cor de tinta para cada campo
- [08] [Fatos] Não há dado da Mesa de centro Cildo além de "vidro fundido" (legenda cortada p35) · não citei material nem medida; só nome, linha seca e endereço · registrar a ficha
- [08] [R-COPY-02] Linha seca nova: "Feita para ficar no meio do caminho." · escolhi · não há linha aprovada para a Cildo
- [08] [Endereço] O cartaz da TOM.01 tem endereço; usar o mesmo da loja (Alameda Franca) em cartaz de peça? · usei · dizer se o endereço é rodapé fixo de todo cartaz
- [09] [Display na loja] Display "nunca dentro da loja": a landing é página do site — é "loja"? · usei display só no 05.11 do topo · definir "loja"
- [09] [R-LAYOUT-01] Barra de CTA: o sistema descreve "A partir de / Adicionar" com preço à direita; para evento não há CTA · usei "[Como chegar]" à esquerda e "05.11" à direita · dar o CTA de página de evento
- [09] [Link externo] Como chegar abre mapa: o sistema não diz qual serviço · usei busca do Google Maps pelo endereço · dizer
- [09] [Grade] Status na grade ("Sob encomenda"/"Pronta entrega") em cinza 10 px: proposta do index · usei · aprovar
- [09] [Status por peça] Cadeira Maria, Poltrona Eduardo e Mesa de centro Cildo marcadas "Sob encomenda" por dedução de business_truth ("a maioria") · registrar status por peça
- [09] [Rodapé] Conteúdo do rodapé (CNPJ, newsletter, links) não está especificado · pus frase, endereço, Instagram, loja e links internos · dar o rodapé
- [09] [Crenças] As crenças são "inferidas" (confiança média), mas aparecem no index como texto da marca · usei as três · dizer se podem ser publicadas
- [10] [Voz: Sobre] Não existe texto Sobre em português (pendência aberta); o inglês "More is a design studio and gallery..." está cortado · escrevi a partir das crenças e fatos do sistema, sem história de designer nem ateliê (positioning) · o time deveria entregar o texto
- [10] [Fotografia: bastidores] Bastidores "só no Instagram e no livro" — Sobre não é página de peça, mas também não está na lista · não usei bastidores no Sobre · dizer
- [10] [Fatos] "Desenhamos assentos, mesas, luminárias, estantes e peças fixas" deduzido das categorias do site · usei · confirmar
- [10] [Fatos] "Cada peça tem bloco 2D e 3D para baixar" vem do acordeão da PDP da Leticia; não se sabe se vale para todas · mantive "cada peça" · confirmar
- [10] [Layout] Vista Lista (10 colunas, 6 px) usada para imagens do Sobre; o site usa a Lista só no catálogo · usei · dizer qual grade o Sobre usa
- [10] [Componente] Bloco Sobre "cinza-escuro" com texto cinza-claro (3,88:1 abaixo de 24 px) · usei título em off-white e corpo 15 px em cinza-claro · resolver o contraste do bloco

## Checks do sistema (node checks/run-all.mjs pecas/)

```
checks da More em /mnt/project-files/more/teste-cego/pecas (27 arquivos)

regra          script            arquivos  resultado                       
-------------  ----------------  --------  --------------------------------
R-COLOR-01     color-tokens.mjs  11        FALHA (3)                       
R-COLOR-02     ground-ink.mjs    11        PASSA                           
R-COLOR-03     accent.mjs        11        FALHA (6)                       
R-SHAPE-01     radius.mjs        11        PASSA                           
R-TYPE-01      type.mjs          11        PASSA                           
R-TYPE-02      actions.mjs       10        PASSA                           
R-LAYOUT-01    bars.mjs          11        PASSA                           
R-LAYOUT-02    aspect.mjs        19        FALHA (4) + exemplos            
R-IMG-01       no-ai.mjs         8         PASSA                           
R-IMG-02       exemplos          -         revisão visual com o par sim/nao
R-GEN-01       wordmark.mjs      10        PASSA                           
R-COPY-01      copy.mjs          14        FALHA (1)                       
R-COMMERCE-01  commerce.mjs      10        PASSA                           
R-COMMERCE-02  grid-price.mjs    10        PASSA                           
R-MOTION-01    motion.mjs        11        PASSA                           
R-COPY-02      caption.mjs       4         FALHA (2)                       
R-COPY-03      lang.mjs          14        PASSA                           
R-COLOR-04     campo.mjs         8         PASSA                           
R-LOGO-01      logo.mjs          5         PASSA                           
R-SHAPE-02     -                 -         rejeitada (fora do guia)        
R-LAYOUT-03    scroll-safe.mjs   11        PASSA                           
R-NAME-01      names.mjs         14        PASSA                           
R-FILE-01      filename.mjs      12        FALHA (12)                      
R-PRINT-01     print.mjs         4         FALHA (4)                       
R-MOTION-02    cuts.mjs          0         sem arquivo aplicável           

7 regra(s) com falha
```

Leitura das falhas:
- R-COLOR-01: o próprio tokens.css gerado (cores site-sem-token), não as peças.
- R-COLOR-03: campos de cor em CSS de peça social/impressa (02, 07, 08) e o adesivo ciano (06); o check não separa CSS da loja de CSS de layout.
- R-LAYOUT-02: capturas de página inteira (09, 10) medidas como se fossem fotos.
- R-COPY-01: tabela de medidas da etiqueta 05 lida como uma frase de 34 palavras.
- R-COPY-02: legendas de 02 e 04 sem peça; não há fórmula para evento ou bastidores.
- R-FILE-01: nomes <nn>-<canal>-<slug> pedidos no briefing, fora do padrão MORE_.
- R-PRINT-01: os 4 PDFs sem PDF/X-4 (sangria de 3 mm e off-white sem tinta passaram).
- R-IMG-02 e o lado "uma peça por foto" da R-LAYOUT-02: revisão visual, sem script.

## Contagem

Total de entradas: 100

Por regra ou seção:

- Fatos: 5
- R-COPY-02: 5
- Imagem: 4
- R-PRINT-01: 3
- Voz: 3
- Colchetes: 2
- Cor campo: 2
- Cor do texto: 2
- Escala display: 2
- Preço: 2
- R-FILE-01: 2
- Texto: 2
- Tipografia: 2
- Ciano no papel: 1
- Componente: 1
- Cor da marca no amarelo: 1
- Cor do texto pequeno: 1
- Crenças: 1
- Display: 1
- Display na loja: 1
- Elipse: 1
- Endereço: 1
- Escala social: 1
- Etiqueta: conteúdo: 1
- Etiqueta: furo/cordão: 1
- Etiqueta: sangria: 1
- Etiqueta: tamanho: 1
- Etiqueta: tamanho do nome: 1
- Fio: 1
- Fotografia: 1
- Fotografia / R-LAYOUT-02: 1
- Fotografia / social: 1
- Fotografia: bastidores: 1
- Fotografia: bastidores × social_behavior: 1
- Grade: 1
- Grid de impressão: 1
- Imagens: 1
- Impressão: 1
- Impressão / grid: 1
- Layout: 1
- Link externo: 1
- Logo XL: 1
- Marca: 1
- Marca / arquivo oficial: 1
- Materiais: 1
- Ortografia: 1
- Prazo: 1
- Propostas: 1
- R-COLOR-01: 1
- R-COLOR-02 × R-PRINT-01: 1
- R-COLOR-03 × R-COLOR-04: 1
- R-COLOR-03 × proposta ciano: 1
- R-COMMERCE-01: 1
- R-COPY-01 / copy.mjs: 1
- R-COPY-01 × crenças: 1
- R-IMG-01 × receita do cartaz: 1
- R-LAYOUT-01: 1
- R-LAYOUT-02 / aspect.mjs: 1
- R-LOGO-01: 1
- R-LOGO-01 × logo_marks × token logo: 1
- R-LOGO-01 × token logo: 1
- R-NAME-01: 1
- R-TYPE-01 / tokens: 1
- R-TYPE-02: 1
- Receita do cartaz: 1
- Receita do cartaz × graphic_devices: 1
- Rodapé: 1
- Status por peça: 1
- Tipografia impressa: 1
- Voz: Sobre: 1
- Web: 1
- Web / captura: 1
- business_truth × pedido: 1
- graphic_devices.barra_impressa × XL: 1
- positioning: 1
- tokens.css / build: 1
- tokens/README: 1

Por peça:

- 01: 5
- 02: 8
- 03: 7
- 04: 5
- 05: 11
- 06: 4
- 07: 4
- 08: 6
- 09: 7
- 10: 6
- geral: 37
