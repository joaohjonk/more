# Diário do teste cego 2 · 10 peças só com o sistema

Formato: `- [peça nn] [regra ou seção · tipo] o que precisei decidir · o que escolhi · onde o sistema deveria ter dito`.
Tipos: **contradição** (duas partes do sistema discordam), **falta-info** (regra ausente ou ambígua), **falta-fato** (fato da marca/peça que não está no sistema).
Peças: 01 feed Leticia · 02 feed abertura · 03 story TOM.01 · 04 story bastidores · 05 etiqueta Leticia · 06 etiqueta Banco Maria · 07 cartaz abertura · 08 cartaz Cildo · 09 landing abertura · 10 página Sobre.

## Entradas

- [peça todas] [R-FILE-01 · falta-info] qual data entra no nome (criação, publicação ou evento); o exemplo usa 20261105 · usei 20261015 (dia da criação) · R-FILE-01 deveria dizer "data de criação" ou "data de publicação"
- [peça todas] [R-FILE-01 · contradição] lista de canais: o index.html (Propostas) não tem ETIQUETA nem FONTE; o yaml e o filename.mjs têm · segui o yaml (ETIQUETA, FONTE) · index.html seção Propostas deve copiar a lista do yaml
- [peça todas] [R-FILE-01 · falta-info] HTML-fonte vai como FONTE, mas a página web também é HTML entregue · página web como MORE_SITE_..., fonte das peças estáticas como MORE_FONTE_... · R-FILE-01 deveria dizer qual canal leva o HTML de uma página web
- [peça todas] [R-FILE-01 · falta-info] slug de story/feed sem peça: "marca" serve para bastidores e Sobre? · usei "marca" para bastidores e Sobre, "evento-20261105" para a abertura · R-FILE-01 deveria listar quando usar marca vs evento
- [peça 03] [R-FILE-01 · falta-info] slug de "Tomada TOM.01" (o ponto vira hífen?) · tomada-tom-01 (igual ao fixture) · nomes-canonicos.json deveria trazer o slug pronto
- [peça 01] [R-LOGO-01 / R-FILE-01 · contradição] o HTML-fonte do post de peça se chama MORE_FONTE_..., mas o logo.mjs só reconhece post de feed sem marca por "_IG_" ou "ig-feed" no nome; com FONTE ele exige marca · pus a variante "ig-feed" no nome da fonte · R-FILE-01 e logo.mjs deveriam combinar a convenção
- [peça 01 02] [Exportação por canal · contradição] a tabela diz feed em JPG; o pedido diz PNG · entreguei PNG (pedido) · tabela deveria aceitar PNG ou o brief seguir o JPG
- [peça 01 02 03 04] [R-IMG-01 · falta-info] "quem exporta preserva os metadados", mas a captura do navegador apaga o EXIF da foto original · aceitei a perda (as fotos do Instagram já vêm sem EXIF) · R-IMG-01 deveria dizer como exportar layout com foto sem perder linhagem
- [peça 01] [Receitas por canal · Post de peça · contradição] "foto quadrada: recorte no centro" corta os dois braços da Poltrona Leticia (p31_1), mas a seção Fotografia pede "peça inteira, sombra inteira" · segui o recorte no centro e registrei o corte · a receita deveria dizer o que vence quando o recorte corta a peça
- [peça 01] [Fotografia · Corte · falta-info] "15% de ar acima" medido sobre a foto original ou sobre o recorte 4:5 · medi no recorte (fica perto de 12%) · Corte deveria dizer em qual quadro se mede
- [peça 01] [Fotografia · falta-fato] qual foto da Leticia é a "foto-mestra" para o feed · usei p31_1 do Instagram (1440 px), não a do site (600×900) · faltam as fotos-mestras em alta (está em Próximos passos)
- [peça 01 10] [R-LAYOUT-02 · contradição] o sistema diz que toda foto de produto é 3:4, mas as fotos do site em references/gold/site são 600×900 (2:3) · recortei para 3:4 no CSS · o tamanho real das fotos do site deveria estar registrado
- [peça 01] [R-COPY-02 · falta-info] a única legenda da marca sobre a Leticia usa a grafia "Letícia" (proibida) · reescrevi a ideia com a grafia Leticia: "Se parecer deslocada na sua sala, o problema é a sala." · aprovadas.json deveria ter uma linha seca da Leticia ou dizer se posso adaptar legenda antiga
- [peça 01] [R-NAME-01 · falta-fato] Leticia/Letícia está marcada decisao_pendente · usei Leticia (forma do site) · a equipe precisa decidir a grafia
- [peça 01] [R-COPY-02 · contradição] tamanho mínimo da legenda: yaml diz 2-145 palavras, index.html diz 4-145 · a minha tem 15, passa nas duas · unificar o número
- [peça 01] [Voz · falta-info] a linha de material da Leticia: "Estofada, com estrutura de madeira maciça." aparece no acordeão do index, mas não está marcada como fato da página da peça · usei · Fatos deveria listar a descrição de cada peça
- [peça 02 07 09] [Receitas por canal · Post de evento · falta-fato] qual tom campo usar na abertura (a cor do convite 05.11 não está no sistema) · berinjela · o convite 05.11 deveria estar em references/ com a cor registrada
- [peça 02 07] [Receitas por canal · falta-info] "três blocos girados" na peça sem peça: o que vai em cada bloco (a receita só define para cartaz de peça: nome, frase, endereço) · "Abertura da loja", uma linha seca, endereço · a receita do cartaz de evento deveria listar os três blocos
- [peça 07] [graphic_devices.cartaz vs Receitas por canal · contradição] brand-system diz que cartaz de evento é "só campo, data em display e marca XL"; a tabela de receitas acrescenta "três blocos girados" · segui a tabela (inclui o endereço) · uma das duas descrições precisa mudar
- [peça 02] [Escala display · falta-info] tamanho da data num post 1080 px: display-1 é 240 pt impresso; na tela "clamp(96px, 20vw, 240px)", mas post não é tela com vw · usei 240 px · a receita do post de evento deveria dar o px
- [peça 02] [Grid de impressão · falta-info] margem do post social: o grid de 1/24 do lado curto só é definido para impresso · usei 45 px (1/24 de 1080) · definir margem do quadro social
- [peça 02 07] [R-LOGO-01 vs Grid de impressão · contradição] a marca XL ocupa 95-100% da largura, mas a margem do grid é 1/24 do lado curto (4,2% de cada lado = 91,7% livre) · segui R-LOGO-01 (96%) e a marca invade a margem · dizer se XL ignora a margem do grid
- [peça 02 07] [Receitas por canal · falta-info] posição e ordem dos blocos girados (de cima para baixo ou de baixo para cima, sentido do giro, distância da marca) · girei −90° (lê de baixo para cima), empilhados entre a data e a marca · receita deveria trazer um diagrama com medidas
- [peça 02] [R-COPY-02 · falta-info] a linha seca de evento "Menos do mesmo, agora com endereço." só existe no fixture legenda-evento-ok.txt, não em aprovadas.json · usei mesmo assim · dizer se fixture vale como linha aprovada
- [peça 02 07 09] [Fatos · falta-fato] horário, se o convite é aberto ou fechado, o que acontece na abertura · deixei sem horário, como manda Fatos · está em Próximos passos, ainda sem resposta
- [peça 03 04] [R-LOGO-01 vs Receitas por canal · contradição] a receita do story diz "Marca: não leva"; R-LOGO-01 diz que story "pode levar M ou XL"; o logo.mjs falha todo layout sem marca · segui a receita (sem marca) e o check falha · logo.mjs deveria isentar story ou a receita mudar
- [peça 03 04] [Marca · seção 04 · contradição] "M ou XL nas peças" contra post de peça, story e etiqueta sem marca · segui as receitas por canal · seção 04 deveria listar as exceções
- [peça 03] [R-COLOR-03 · falta-info] em social o ciano só aparece como "adesivo de 10 mm de pronta entrega"; num PNG de story 10 mm não tem tamanho físico · usei 10mm do CSS (37,8 px) ao lado de "Pronta entrega" · dizer o tamanho em px do adesivo em tela, ou se ele entra em story
- [peça 03] [R-COLOR-03 · falta-info] o adesivo ciano em story é obrigatório, opcional ou proibido · usei, porque é o único sinal de pronta entrega previsto · a receita do story deveria dizer
- [peça 03] [Receitas por canal · Story · falta-info] "foto 9:16 recortada no centro" de foto 2:3 (TOM.01 do site, 1000×1500) pede ampliação de 1,28× · ampliei · exigir resolução mínima da foto-fonte para story
- [peça 03] [Receitas por canal · Texto sobre foto · falta-info] a foto das três cores (TOM.01_02) põe a tomada branca dentro do terço de cima, onde vai o texto · troquei pela foto de uma tomada só (miolo preto) · a receita deveria dizer qual foto da TOM.01 usar em story
- [peça 03] [R-TYPE-02 · falta-info] link da loja no story vai "no adesivo de link", que não existe no PNG · não pus link · a receita deveria pedir o texto do adesivo de link na entrega
- [peça 03] [Fatos · falta-fato] preço da TOM.01 é R$ 1 provisório e não entra · sem preço · confirmar o preço
- [peça 03] [Receitas por canal · Story · falta-info] posição horizontal e largura do bloco de texto no terço de cima · margem esquerda 60 px, 600 px de largura · receita deveria dar margem lateral
- [peça 04] [Fotografia · Bastidores · contradição] brand-system diz bastidores "no Instagram e no livro, nunca na página da peça"; o index diz "só no Instagram e no livro" · story é Instagram, então vale nos dois; para a página Sobre (peça 10) não usei · unificar "nunca na PDP" vs "só IG e livro"
- [peça 04] [Fatos · falta-fato] qual sessão de fotos, onde, quando, quem fotografou (crédito vai na legenda) · não afirmei nada da sessão; texto de método ("Uma luz, uma sombra, uma peça por vez.") · Fatos deveria ter os dados da sessão e o crédito do fotógrafo
- [peça 04] [Receitas por canal · Texto sobre foto · falta-info] foto de bastidores não tem "fundo liso"; o terço de cima tem luz e tripé · pus o texto à esquerda, na parede clara, sem cobrir a peça · a receita deveria dizer o que fazer quando não há fundo liso
- [peça 04] [Receitas por canal · Story · falta-info] o que escrever em mono 26 px num story sem peça · "Bastidores" · a receita deveria dar a função de cada linha
- [peça 04] [Fotografia · falta-info] foto p10 tem 1440×1631 e vira 9:16 com ampliação de 1,18× · usei · mínimo de resolução
- [peça 05 06] [Fora da tela · Etiqueta · contradição] status com ou sem colchetes: o index (Peças da loja) e brand-system dizem "[Sob encomenda · ~120 dias]"; a receita e R-TYPE-02 dizem "sem colchetes" · sem colchetes (R-TYPE-02 + receita) · corrigir o texto de Peças da loja e packaging_rules
- [peça 05 06] [Fora da tela · Etiqueta · falta-info] orientação do cartão 50×90 mm (em pé ou deitado) · em pé (50 de largura) · dizer a orientação
- [peça 05 06] [R-PRINT-01 · falta-info] etiqueta também leva sangria de 3 mm? · sim, PDF 56×96 mm com TrimBox 50×90 · R-PRINT-01 deveria dizer que vale para etiqueta
- [peça 05 06] [Fora da tela · Etiqueta · falta-info] o furo de 5 mm é faca, não tinta; como entregar · desenhei como guia só na tela (some no PDF) · pedir arquivo de faca separado
- [peça 05 06] [R-LOGO-01 vs Etiqueta · contradição] a receita da etiqueta não tem marca, só "mymore.design"; logo.mjs falha layout sem marca e a seção 04 diz "M ou XL nas peças" · sem marca · decidir se etiqueta leva marca M (8,3 mm, abaixo do S de 18 mm proposto)
- [peça 05 06] [Escala de impressão · falta-info] tamanhos e posições na etiqueta (só existe a escala geral) · nome 10 pt, status e ficha 7 pt mono, margem 5 mm, texto a partir de 20 mm do topo (abaixo do furo) · dar um layout de etiqueta com medidas
- [peça 05 06] [R-PRINT-01 · contradição] preto rico: R-PRINT-01 diz C60 M40 Y40 K100; a tabela Para imprimir diz C60 M50 Y50 K100 · não se aplica (não há área preta ≥ 10 mm), registrei · unificar o valor
- [peça 05 06] [R-COLOR-02 · falta-info] off-white é o papel, então o PDF não tem fundo e a prévia aparece branca · deixei sem tinta · dizer como mostrar a prova de tela
- [peça 05] [Fatos · falta-fato] medidas: brand-world diz "81x71x89 cm" sem dizer qual é altura/largura/profundidade; o acordeão do index diz Altura 81, Largura 71, Profundidade 89 · usei o index · brand-world deveria nomear os eixos
- [peça 05] [Fatos · falta-fato] qual madeira e tecido tem a poltrona que leva a etiqueta · listei as quatro madeiras de brand-world ("Ipê, Sucupira, Tauari ou Angelim Pedra") · a ficha da peça (está em Próximos passos)
- [peça 05] [brand-world · falta-fato] altura do assento 39 cm existe em brand-world mas não no index · não pus (receita pede só "medidas") · dizer quais medidas a etiqueta mostra
- [peça 06] [Fatos · falta-fato] medidas e madeira do Banco Maria não estão no sistema (nem em brand-world) · etiqueta só com nome, status e site · ficha do Banco Maria
- [peça 06] [Fatos · falta-fato] status do Banco Maria: "todas as outras peças" são sob encomenda, mas a Luminária Ngoni aparece "À pronta entrega" no Instagram, então a regra geral pode não valer · usei Sob encomenda · ~120 dias · status por peça
- [peça 06 10] [Fotografia · falta-fato] qual foto é o Banco Maria (p38 mostra dois bancos; nenhum arquivo do sistema identifica) · deduzi p38_2 (o claro) pela legenda · nomear as fotos por peça
- [peça 07 08] [R-PRINT-01 · falta-info] PDF/X-4 não sai do Chromium e não há ferramenta no ambiente para gerar · não declarei PDF/X-4 (seria falso sem perfil de saída) e o check falha · o sistema deveria dizer qual ferramenta exporta X-4 a partir do HTML
- [peça 07 08] [R-PRINT-01 vs pedido · contradição] "tamanho exato" A2 420×594 contra sangria de 3 mm · página de 426×600 mm com TrimBox 420×594 e BleedBox (pypdf) · dizer se o PDF entregue é o tamanho com sangria
- [peça 07 08] [R-PRINT-01 · falta-info] perfil de cor e CMYK: o HTML só tem cores de tela; a conversão para CMYK (tabela Para imprimir) não tem caminho · ficou RGB · gráfica e perfil estão em Próximos passos
- [peça 07 08] [Para imprimir · falta-fato] CMYK/Pantone só para off-white, preto, cinzas e ciano; os tons campo (berinjela, amarelo-igaratá) não têm valor de impressão · RGB do token · tabela Para imprimir deveria ter os campos
- [peça 07 08] [R-LOGO-01 · falta-info] medidas da marca no A2 só existem em px (data-canvas a 96 dpi); a peça é em mm · converti 1 mm = 3,7795 px · data-canvas deveria aceitar mm
- [peça 07] [Grid de impressão · falta-info] grid de 12 colunas e linha de base de 12 pt: nenhuma receita diz em que coluna vai a data ou os blocos · data na margem de 1/24, blocos na margem esquerda · receita com posição em colunas
- [peça 07] [Escala display · falta-info] "05.11" em display-1 240 pt ocupa ~60% da largura do A2; não diz se pode crescer para encher · mantive 240 pt · dizer se display é tamanho fixo ou mínimo
- [peça 08] [Receita do cartaz · falta-info] qual tom campo para a Cildo · amarelo-igaratá · a receita deveria dizer como escolher o campo por peça
- [peça 08] [Receita do cartaz · contradição] silhueta "em preto" sobre berinjela ou verde-jamaica (quase pretos) some; a receita permite os quatro campos · só vermelho-jambo e amarelo-igaratá funcionam, escolhi amarelo · a receita deveria restringir o campo do cartaz de peça
- [peça 08] [Receita do cartaz · falta-info] valor do limiar de luminância e limpeza da silhueta · limiar 120 em 0-255, ampliação 6×, fechamento morfológico · dar o procedimento ou o script
- [peça 08] [Receita do cartaz · falta-info] "sombra borrada de lado": raio, direção, opacidade · desfoque 40 px, 55%, deslocada para a direita e para baixo · medir o cartaz TOM.01 e registrar
- [peça 08] [R-PRINT-01 · falta-fato] a única foto de estúdio da Cildo é 600×899; a silhueta no A2 fica com ~215 dpi efetivos (< 300) · usei, ampliada e suavizada · foto-mestra em alta (Próximos passos)
- [peça 08] [Receita do cartaz · falta-info] o limiar pega a mesa e a sombra no chão juntas (vidro âmbar é translúcido) · aceitei a forma que o limiar dá · dizer o que fazer com peça transparente
- [peça 08] [Voz · falta-info] a "frase" do cartaz de peça é a mesma linha seca da legenda? · escrevi "No centro da sala, sem pedir licença." · dizer a função da frase
- [peça 08] [Fatos · falta-fato] material da Cildo (vidro fundido aparece em legenda antiga e em Crença 2, não na ficha) · não pus material no cartaz (a receita não pede) · ficha da Cildo
- [peça 08] [R-LOGO-01 · falta-info] sentido do giro da marca M (90° ou −90°) e distância da borda · −90° (lê de baixo para cima), canto de baixo à esquerda dentro da margem · registrar a medida do cartaz TOM.01
- [peça 09] [Escala display · contradição] display "nunca dentro da loja" e "só impresso e telas grandes", mas o token diz "on screen use clamp(96px, 20vw, 240px)" e a landing é site · usei o clamp numa landing de evento, não na UI da loja · dizer se landing de evento é "loja"
- [peça 09 10] [R-COLOR-04 · falta-info] landing de evento pode ter campo de cor? R-COLOR-04 proíbe campo no CSS do site · off-white, sem campo · dizer se landing de campanha é exceção
- [peça 09] [Receitas por canal · Página nova · falta-info] ordem das barras: a de ação "6px acima do menu" (componentes), a de evento "[Como chegar]" — com ou sem preto-80 · ação em preto-80 acima do menu, 6 px · receita deveria mostrar o par
- [peça 09] [Receitas por canal · Página nova · falta-info] formato do link do Google Maps (place ID, busca, encurtado) · link de busca com o endereço · pôr o link oficial nos Fatos
- [peça 09 10] [R-GEN-01 · contradição] R-GEN-01 manda usar o currentcolor.svg por <img>, mas currentColor não passa para dentro de <img> e a marca sai #000 (o próprio fixture faz isso), o que quebra R-COLOR-02 · usei SVG inline com os paths oficiais · R-GEN-01 deveria mandar inline quando a cor vem do CSS
- [peça 09 10] [R-GEN-01 · contradição] o index (seção Regras) cita só more-wordmark.svg e small; o yaml inclui o currentcolor · segui o yaml · atualizar o index
- [peça 09 10] [Componentes · falta-info] o que acontece ao abrir Menu [+] numa página nova (itens do menu) · botão sem menu aberto · listar os itens do menu
- [peça 09 10] [Cor · falta-info] texto pequeno no rodapé cinza-escuro: cinza-claro só ≥ 24 px, branco abaixo · branco nas linhas pequenas, cinza-claro na frase de 32 px · ok, mas o footer do index usa cinza-claro em tudo; alinhar o exemplo
- [peça 09 10] [Espaço · falta-info] topo da página nova: só há grid-top (catálogo, 180/140) · usei 180/140 · dizer o topo de página editorial
- [peça 09] [Fatos · falta-fato] o que haverá na loja (quais peças, se há venda no local) · não afirmei · Fatos da loja
- [peça 10] [Voz · falta-fato] não existe texto Sobre em português (o do site é placeholder em inglês; decisão pendente) · escrevi um texto curto só com fatos e crenças do sistema · o texto Sobre aprovado
- [peça 10] [brand_beliefs · falta-info] as crenças estão marcadas "inferred, geradas por modelo, não assinadas por ninguém", mas o index as mostra como "O que a More acha" · usei duas na Sobre · dizer se crença inferida pode ir para texto público
- [peça 10] [positioning · falta-info] "não atrelar a origem ao ateliê" e "marca como instituição": pode citar fundadores, ano, cidade? · só cidade · dizer o que pode entrar na origem
- [peça 10] [Fatos · contradição] "estúdio e galeria" (Fatos) vs "Estúdio em São Paulo." (amostra de tipo) vs "design studio and gallery" (Sobre em inglês) · "estúdio e galeria de móveis em São Paulo" · a frase-nome da More deveria estar escrita igual em um lugar
- [peça 10] [business_truth · falta-info] "a maioria esmagadora" é sob encomenda: escrevi "Quase todas as peças" · ok? · dizer como formular
- [peça 10] [Fatos · contradição] prazo: Fatos e yaml dizem "~120 dias"; o index (R-COMMERCE-01 na seção Regras) dá o exemplo "Sob encomenda, 8 a 10 semanas" · usei ~120 dias · corrigir o exemplo do index
- [peça 10] [R-COMMERCE-02 · falta-info] imagens com nome na página Sobre são "card de grade"? Sem preço por precaução; sem status · dizer se Sobre mostra status
- [peça 10] [R-LAYOUT-02 · falta-info] grid 4 colunas com vão de 7vw é do catálogo; serve para Sobre? · usei · dizer o grid da página editorial
- [peça 10] [Fotografia · contradição] Banco Maria (p38_2) e TOM.01 do site não têm a sombra de janela do estúdio (R-IMG-02), mas são fotos da marca · usei · dizer se toda foto própria passa em R-IMG-02 automaticamente
- [peça todas] [checks/README · falta-info] o README cita checks/teste-cego.txt, que não existe no repositório · ignorei · remover a linha ou incluir o arquivo
- [peça todas] [R-COLOR-03 · falta-info] o modo como o accent.mjs reconhece "layout social" (nome com IG/IGS) não reconhece FONTE + data-canvas por nome; funcionou por data-canvas · ok, mas o yaml deveria dizer que data-canvas é obrigatório no HTML-fonte
- [peça todas] [approvals · falta-info] quase tudo é "provisório até aprovação" e não sei o que já foi aceito; não li state/approvals.jsonl porque a leitura foi bloqueada no ambiente · tratei tudo como vigente · a tabela de aceite deveria mostrar a decisão já preenchida

## Resultado dos checks (node checks/run-all.mjs pecas/)

```
checks da More em /mnt/project-files/more/teste-cego-2/pecas (24 arquivos)

regra          script            arquivos  resultado                       
-------------  ----------------  --------  --------------------------------
R-COLOR-01     color-tokens.mjs  10        PASSA                           
R-COLOR-02     ground-ink.mjs    10        PASSA                           
R-COLOR-03     accent.mjs        10        PASSA                           
R-SHAPE-01     radius.mjs        10        PASSA                           
R-TYPE-01      type.mjs          10        PASSA                           
R-TYPE-02      actions.mjs       10        PASSA                           
R-LAYOUT-01    bars.mjs          10        PASSA                           
R-LAYOUT-02    aspect.mjs        18        PASSA + exemplos                
R-IMG-01       no-ai.mjs         8         PASSA                           
R-IMG-02       exemplos          -         revisão visual com o par sim/nao
R-GEN-01       wordmark.mjs      10        PASSA                           
R-COPY-01      copy.mjs          12        PASSA                           
R-COMMERCE-01  commerce.mjs      10        PASSA                           
R-COMMERCE-02  grid-price.mjs    10        PASSA                           
R-MOTION-01    motion.mjs        10        PASSA                           
R-COPY-02      caption.mjs       2         PASSA                           
R-COPY-03      lang.mjs          12        PASSA                           
R-COLOR-04     campo.mjs         8         PASSA                           
R-LOGO-01      logo.mjs          8         FALHA (4)                       
R-SHAPE-02     -                 -         rejeitada (fora do guia)        
R-LAYOUT-03    scroll-safe.mjs   10        PASSA                           
R-NAME-01      names.mjs         12        PASSA                           
R-FILE-01      filename.mjs      20        PASSA                           
R-PRINT-01     print.mjs         4         FALHA (4)                       
R-MOTION-02    cuts.mjs          0         sem arquivo aplicável           

2 regra(s) com falha

R-LOGO-01 FALHA (4):
  - MORE_FONTE_banco-maria_etiqueta-50x90_20261015_v01.html: nenhuma marca encontrada (href more-wordmark*.svg ou class/id wordmark/logo/marca)
  - MORE_FONTE_marca_ig-story-bastidores_20261015_v01.html: nenhuma marca encontrada (href more-wordmark*.svg ou class/id wordmark/logo/marca)
  - MORE_FONTE_poltrona-leticia_etiqueta-50x90_20261015_v01.html: nenhuma marca encontrada (href more-wordmark*.svg ou class/id wordmark/logo/marca)
  - MORE_FONTE_tomada-tom-01_ig-story_20261015_v01.html: nenhuma marca encontrada (href more-wordmark*.svg ou class/id wordmark/logo/marca)

R-PRINT-01 FALHA (4):
  - MORE_ETIQUETA_banco-maria_50x90_20261015_v01.pdf: não declara PDF/X-4 (exporte com o preset PDF/X-4:2008)
  - MORE_ETIQUETA_poltrona-leticia_50x90_20261015_v01.pdf: não declara PDF/X-4 (exporte com o preset PDF/X-4:2008)
  - MORE_PRINT_evento-20261105_cartaz-a2_20261015_v01.pdf: não declara PDF/X-4 (exporte com o preset PDF/X-4:2008)
  - MORE_PRINT_mesa-de-centro-cildo_cartaz-a2_20261015_v01.pdf: não declara PDF/X-4 (exporte com o preset PDF/X-4:2008)
```

Notas: R-LOGO-01 falha nas duas etiquetas e nos dois stories porque as receitas mandam não ter marca e o logo.mjs exige marca em todo layout com data-canvas. R-PRINT-01 falha nos quatro PDFs porque nenhum declara PDF/X-4 (o Chromium não gera e não declarei sem perfil de saída); a sangria de 3 mm (TrimBox/BleedBox) passa.

## Contagem

Total de entradas: 91

- contradição entre duas partes do sistema: 22
- informação faltando (regra ausente ou ambígua): 52
- fato faltando: 17

Por regra ou seção (primeira citada):

- Fatos: 11
- Receitas por canal: 11
- Fotografia: 6
- R-LOGO-01: 6
- R-PRINT-01: 6
- R-FILE-01: 5
- Receita do cartaz: 5
- Escala display: 3
- Fora da tela: 3
- R-COLOR-03: 3
- R-COPY-02: 3
- Voz: 3
- Grid de impressão: 2
- R-GEN-01: 2
- R-LAYOUT-02: 2
- Componentes: 1
- Cor: 1
- Escala de impressão: 1
- Espaço: 1
- Exportação por canal: 1
- Marca: 1
- Para imprimir: 1
- R-COLOR-02: 1
- R-COLOR-04: 1
- R-COMMERCE-02: 1
- R-IMG-01: 1
- R-NAME-01: 1
- R-TYPE-02: 1
- approvals: 1
- brand-world: 1
- brand_beliefs: 1
- business_truth: 1
- checks/README: 1
- graphic_devices.cartaz: 1
- positioning: 1
