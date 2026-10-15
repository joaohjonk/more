#!/usr/bin/env node
// R-SHAPE-01: border-radius só pode ser 0, 2px, 8px, 10px ou 50%, ou as formas de tooltip "8px 8px 0" / "0 8px 8px".
// Uso: node checks/radius.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars } from './lib.mjs';

const files = argsOrUsage('node checks/radius.mjs <arquivo.css|.html ...>');
const vars = varMap(files);
const norm = (v) => (/^0(px|rem|em|%)?$/.test(v) ? '0' : v);
const ALLOWED = new Set(['0', '2px', '8px', '10px', '50%']);
const TOOLTIP = new Set(['8px 8px 0', '0 8px 8px']);
const failures = [];

for (const f of files) for (const r of cssOf(f)) for (const d of r.decls) {
  if (!/^(-webkit-|-moz-)?border(-(top|bottom|start|end)-(left|right|start|end))?-radius$/.test(d.prop)) continue;
  const raw = resolveVars(d.value, vars).trim();
  if (/^(inherit|initial|unset|revert)$/.test(raw)) continue;
  const parts = raw.split(/\s+/).map(norm);
  const v = parts.join(' ');
  const ok = parts.length === 1 ? ALLOWED.has(v)
    : TOOLTIP.has(v) || (parts.every((p) => p === parts[0]) && ALLOWED.has(parts[0]) && d.prop.endsWith('border-radius'));
  if (!ok) failures.push({ file: f, msg: `${d.prop}: ${d.value} em "${r.selector}" está fora da escala (0, 2px, 8px, 10px, 50%, "8px 8px 0", "0 8px 8px")` });
}
finish('R-SHAPE-01', failures, 'todos os raios dentro da escala');
