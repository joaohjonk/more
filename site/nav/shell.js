/* Shell de navegação More.
   Uso: <script src="/nav/shell.js" data-section="sistema" data-into=".page" defer></script>
   Insere no fluxo, nunca fixa, a faixa "onde você está".
   No fim do contêiner, antes do rodapé, entra o bloco "Próximo".
   data-section: guia, sistema, colecao, loja-3d, abertura, stack, catalogo ou negocio.
   data-into: seletor do contêiner de rolagem (padrão body).
   data-foot="off" desliga o bloco Próximo.
   data-mode="bar" põe a faixa como linha de vidro dentro das barras (loja 3D). */
(function(){
  var S=[
    {id:'guia',n:'1',s:'Guia',href:'/guia/',
     t:'Guia para o time',
     d:'Três sugestões para antes da abertura, dez prioridades e o que só a More responde.'},
    {id:'sistema',n:'2',s:'Sistema',href:'/sistema/',
     t:'Sistema de design',
     d:'Cor, tipo, voz e movimento, medidos no site que já existe. Cada regra tem um script.'},
    {id:'colecao',n:'3',s:'Coleção',href:'/colecao/',
     t:'Coleção e página da Leticia',
     d:'Vinte e quatro peças em grade, lista e ambientes. A Leticia por inteiro.'},
    {id:'loja-3d',n:'4',s:'Loja 3D',href:'/loja-3d/',
     t:'Loja em 3D',
     d:'A loja da Alameda Franca, três semanas antes de existir. Arraste, clique, entre.'},
    {id:'abertura',n:'5',s:'Abertura',href:'/abertura/',
     t:'Abertura 05.11 e livro',
     d:'Nove peças, do convite à vitrine. O time escolhe, se quiser.'},
    {id:'stack',n:'6',s:'Stack',href:'/stack/',
     t:'Stack e automações',
     d:'O que roda hoje, o que fazer até 05.11 e seis perguntas para o time. Cinco minutos.'},
    {id:'catalogo',n:'7',s:'Catálogo',href:'/catalogo/',
     t:'Catálogo associativo',
     d:'As 24 peças por tipo, por ambiente, por material e por história. Uma direção para conversar.'},
    {id:'negocio',n:'8',s:'Casos',href:'/negocio/',
     t:'Estudos de caso',
     d:'Nove casas parecidas com a More, desmontadas do anúncio à entrega, e o playbook de lançamento do Nik Sharma.'}
  ];
  var me=document.currentScript||document.querySelector('script[data-section]');
  if(me===null)return;
  var id=me.getAttribute('data-section');
  var into=me.getAttribute('data-into')||'body';
  var foot=(me.getAttribute('data-foot')||'on')==='on';
  var mode=me.getAttribute('data-mode')||'strip';
  var i=-1;
  S.forEach(function(s,k){if(s.id===id)i=k});
  try{
    var v=JSON.parse(localStorage.getItem('more-visto')||'[]');
    if(i>=0&&v.indexOf(id)<0){v.push(id);localStorage.setItem('more-visto',JSON.stringify(v))}
  }catch(e){}
  function link(href,label){return '<a href="'+href+'">'+label+'</a>'}
  function run(){
    var root=(into==='body')?document.body:document.querySelector(into);
    if(root===null||root===undefined)return;
    if(document.querySelector('link[href="/nav/shell.css"]')===null){
      var l=document.createElement('link');l.rel='stylesheet';l.href='/nav/shell.css';document.head.appendChild(l)
    }
    var cur=S[i],prev=S[i-1],next=S[i+1];
    var here=cur?cur.n+' de '+S.length+' · '+cur.t:'';
    var aPrev=prev?link(prev.href,'[Anterior: '+prev.s+']'):'';
    var aNext=next?link(next.href,'[Próximo: '+next.s+']'):'';
    if(mode==='bar'){
      var row=document.createElement('div');
      row.className='bar-row';
      row.innerHTML='<div class="glass more-shell--bar" role="navigation" aria-label="Onde você está">'
        +link('/','[Índice]')+'<span class="more-shell__here">'+here+'</span>'+aPrev+aNext+'</div>';
      root.insertBefore(row,root.firstChild);
      return
    }
    var nav=document.createElement('nav');
    nav.className='more-shell';
    nav.setAttribute('aria-label','Onde você está');
    nav.innerHTML='<div class="more-shell__in">'+link('/','[Índice]')
      +(cur?'<span class="more-shell__here">'+cur.n+' de '+S.length+' · <b>'+cur.t+'</b></span>':'')
      +'<span class="more-shell__spacer"></span>'
      +aPrev.replace('<a ','<a class="more-shell__prev" ')+aNext+'</div>';
    root.insertBefore(nav,root.firstChild);
    if(foot&&next){
      var f=document.createElement('aside');
      f.className='more-shell__next';
      f.setAttribute('aria-label','Próxima página');
      f.innerHTML='<a class="im" href="'+next.href+'" tabindex="-1" aria-hidden="true">'
        +'<img src="/nav/img/'+next.id+'.jpg" alt=""></a>'
        +'<div class="tx"><span class="k">Próximo · '+next.n+' de '+S.length+'</span>'
        +'<p class="t">'+link(next.href,next.t)+'</p>'
        +'<p class="d">'+next.d+'</p>'
        +'<a class="a" href="'+next.href+'">[Abrir]</a></div>';
      var ft=root.querySelector('footer');
      while(ft&&ft.parentNode&&(ft.parentNode===root)===false)ft=ft.parentNode;
      if(ft)root.insertBefore(f,ft);else root.appendChild(f)
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
