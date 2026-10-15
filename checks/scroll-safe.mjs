#!/usr/bin/env node
// R-LAYOUT-03: todo contêiner com rolagem vertical (overflow / overflow-y: auto|scroll) termina com padding-bottom >= 106px
// (layout.bar-safe) no mesmo seletor. Rolagem só horizontal (overflow-x) não conta.
// Uso: node checks/scroll-safe.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars } from './lib.mjs';

const files = argsOrUsage('node checks/scroll-safe.mjs <arquivo.css|.html ...>');
const vars = { ...varMap(files), '--layout-bar-safe': '106px', '--bar-safe': '106px' };
const SAFE = 106;
const failures = [];
// avalia px simples e calc() com somas de px
function px(v) {
  v = v.trim();
  const c = v.match(/^calc\((.*)\)$/);
  const expr = c ? c[1] : v;
  if (!/^[\d.\spx+()-]+$/.test(expr)) return null;
  try { return Function(`return (${expr.replace(/px/g, '')})`)(); } catch { return null; }
}
for (const f of files) for (const r of cssOf(f)) {
  const d = Object.fromEntries(r.decls.map((x) => [x.prop, resolveVars(x.value, vars)]));
  const ov = (d.overflow || '').split(/\s+/);
  const y = d['overflow-y'] || ov[1] || ov[0];
  if (!/^(auto|scroll)$/.test(y || '')) continue;
  let pb = d['padding-bottom'] ?? d['padding-block-end'];
  if (pb === undefined && d.padding) { const p = d.padding.split(/\s+(?![^(]*\))/); pb = p[p.length === 1 ? 0 : 2] ?? p[0]; }
  const v = pb === undefined ? null : px(pb);
  if (v === null || v < SAFE) failures.push({ file: f, msg: `"${r.selector}" rola na vertical e termina com padding-bottom ${pb ?? 'não declarado'}; precisa de >= ${SAFE}px (var(--layout-bar-safe))` });
}
finish('R-LAYOUT-03', failures, `todo contêiner com rolagem termina com >= ${SAFE}px`);
