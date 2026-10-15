#!/usr/bin/env node
// R-LAYOUT-01: menu, carrinho e adicionar-ao-carrinho ficam em barras flutuantes embaixo.
// Barra = seletor com position fixed/sticky que contém menu, add_to_cart/add-to-cart, in-cart, cart-button ou checkout:
//   - ancorada embaixo (bottom, sem top), centralizada (left:50% + translate(-50%), ou left 0 + right 0)
//   - se declara height: 35px (var(--menu-button-size) / var(--cart-button-size)) ou 0
//   - se declara background(-color): cor com alfa < 1 (vidro)
// Cabeçalho = seletor fixed/sticky com header, cabecalho, topbar, navbar, nav ou toolbar e top: falha (sem cabeçalho fixo).
// Isentos (padrão do site): o filtro da coleção (.collection-list__filter, sticky no topo) e o botão flutuante
// de voltar (.floating-back-button, topo, 30px).
// Uso: node checks/bars.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars, colorsIn } from './lib.mjs';

const BAR = /(menu|add_to_cart|add-to-cart|in-cart|cart-button|checkout)/i;
const HEADER = /(header|cabecalho|topbar|navbar|(^|[^\w-])nav\b|toolbar)/i;
const EXEMPT = /collection-list__filter|floating-back-button/i;
const files = argsOrUsage('node checks/bars.mjs <arquivo.css|.html ...>');
const vars = varMap(files);
const failures = [];

for (const f of files) for (const r of cssOf(f)) {
  const d = Object.fromEntries(r.decls.map((x) => [x.prop, resolveVars(x.value, vars).trim()]));
  if (!/^(fixed|sticky)$/.test(d.position || '')) continue;
  // o seletor final (depois do último espaço/combinador) é o que está sendo posicionado
  const target = r.selector.split(',').map((s) => s.trim().split(/[\s>+~]+/).pop()).join(',');
  if (EXEMPT.test(target) || /overlay|sample/i.test(target)) continue;
  const name = `"${r.selector}"`;
  if (HEADER.test(target) && !BAR.test(target)) { if (d.top !== undefined) failures.push({ file: f, msg: `${name} é cabeçalho fixo no topo (top: ${d.top}): navegação fica nas barras flutuantes embaixo` }); continue; }
  if (!BAR.test(target)) continue;
  if (d.top !== undefined) failures.push({ file: f, msg: `${name} é barra de menu/carrinho no topo (top: ${d.top}): essas barras ficam embaixo` });
  else if (d.bottom === undefined) failures.push({ file: f, msg: `${name} fixo sem bottom: ancore a barra embaixo` });
  const centred = (d.left === '50%' && /translate(X)?\(\s*-50%/.test(d.transform || '')) || (/^0(px)?$/.test(d.left || '') && /^0(px)?$/.test(d.right || ''));
  if (d.top === undefined && !centred) failures.push({ file: f, msg: `${name} não está centralizado (use left:50% + transform:translate(-50%))` });
  if (d.height !== undefined && !/^(35px|0|0px)$/.test(d.height)) failures.push({ file: f, msg: `${name} com height ${d.height}: barra tem 35px` });
  const bg = d['background-color'] ?? d.background;
  if (bg !== undefined && colorsIn(bg).some(({ c }) => c.a >= 1)) failures.push({ file: f, msg: `${name} com fundo opaco ${bg}: barra é vidro (preto-10 + blur)` });
}
finish('R-LAYOUT-01', failures, 'menu e carrinho em barras embaixo, centralizadas, 35px, vidro; sem cabeçalho fixo');
