// Menu, filtros, números na foto e "visto em". Sem rastreamento: o contexto vem só do link que a pessoa clicou (?de=).
(function () {
  var menu = document.getElementById('menu'), btn = document.getElementById('menuBtn'), fechar = document.getElementById('menuFechar');
  function abrir(o) {
    if (!menu) return;
    menu.hidden = !o; menu.setAttribute('data-open', String(o)); btn.setAttribute('aria-expanded', String(o)); btn.textContent = o ? 'Fechar [-]' : 'Menu [+]';
    if (o) { var f = menu.querySelector('.v a'); if (f) f.focus(); } else btn.focus();
  }
  if (btn) btn.addEventListener('click', function () { abrir(menu.hidden); });
  if (fechar) fechar.addEventListener('click', function () { abrir(false); });
  if (menu) menu.addEventListener('click', function (e) { if (e.target === menu) abrir(false); });
  document.addEventListener('keydown', function (e) {
    if (!menu || menu.hidden) return;
    if (e.key === 'Escape') { abrir(false); return; }
    if (e.key === 'Tab') {
      var f = menu.querySelectorAll('a[href], button'); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // filtros por tipo (grade de peças e tabela do controle A)
  var filtros = document.querySelector('.filtros');
  var itens = document.querySelectorAll('[data-col].card-produto, tr[data-col]');
  var q = document.getElementById('q'), vazio = document.getElementById('vazio'), contagem = document.getElementById('contagem');
  var col = 'todas';
  function aplicar() {
    var termo = q ? q.value.trim().toLowerCase() : '';
    var n = 0;
    itens.forEach(function (el) {
      var ok = (col === 'todas' || el.getAttribute('data-col') === col) && (!termo || (el.getAttribute('data-termos') || '').indexOf(termo) >= 0);
      el.hidden = !ok; if (ok) n++;
    });
    if (filtros) filtros.querySelectorAll('a').forEach(function (a) { var on = a.getAttribute('data-col') === col; if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (vazio) vazio.hidden = n > 0;
    if (contagem) contagem.textContent = n + (n === 1 ? ' peça' : ' peças');
  }
  if (filtros) {
    filtros.addEventListener('click', function (e) { var a = e.target.closest('a'); if (!a) return; e.preventDefault(); col = a.getAttribute('data-col'); history.replaceState(null, '', '#' + col); aplicar(); });
    var h = location.hash.replace('#', '');
    if (h && filtros.querySelector('[data-col="' + h + '"]')) col = h;
    window.addEventListener('hashchange', function () { var h2 = location.hash.replace('#', ''); if (filtros.querySelector('[data-col="' + h2 + '"]')) { col = h2; aplicar(); } });
    aplicar();
  }
  if (q) q.addEventListener('input', aplicar);

  // ambiente: números na foto (sempre visíveis no toque; no desktop, no hover ou por botão)
  var cena = document.getElementById('cena'), numeros = document.getElementById('numeros');
  if (cena && numeros) numeros.addEventListener('click', function () {
    var on = cena.getAttribute('data-numeros') === '1';
    cena.setAttribute('data-numeros', on ? '0' : '1'); numeros.setAttribute('aria-pressed', String(!on));
    numeros.textContent = on ? '[Mostrar os números na foto]' : '[Esconder os números]';
  });
  if (cena) {
    var liga = function (i, on) { var li = cena.querySelector('.pecas li[data-i="' + i + '"]'); if (li) li.classList.toggle('on', on); };
    cena.querySelectorAll('.hot').forEach(function (h) {
      var i = h.getAttribute('data-i');
      h.addEventListener('mouseenter', function () { liga(i, true); }); h.addEventListener('mouseleave', function () { liga(i, false); });
      h.addEventListener('focus', function () { liga(i, true); }); h.addEventListener('blur', function () { liga(i, false); });
    });
  }

  // peça: "visto em", a partir do link que trouxe a pessoa (?de=ambiente:leitura)
  var visto = document.getElementById('visto');
  if (visto) {
    var de = new URLSearchParams(location.search).get('de');
    var ctx = {};
    try { ctx = JSON.parse(visto.getAttribute('data-contextos') || '{}'); } catch (e) {}
    if (de && ctx[de]) {
      visto.innerHTML = ctx[de].rotulo ? ctx[de].rotulo + ' <a href="' + ctx[de].href + '">' + ctx[de].nome + '</a>' : '<a href="' + ctx[de].href + '">[Voltar para ' + ctx[de].nome + ']</a>';
      visto.setAttribute('data-on', '1');
      var origem = document.querySelector('.rel[data-ctx="' + de + '"]'); if (origem) origem.setAttribute('data-origem', '1');
    }
  }
})();
