#!/usr/bin/env node
// R-TYPE-01: só duas famílias (Muoto, MuotoMono). Pesos: 400; 300 só em seletor .muoto (o site pede 300 mas só o arquivo
// Regular é carregado, então renderiza 400); 600 só em seletor de filtro ativo; 700 e qualquer outro falham.
// Uso: node checks/type.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars } from './lib.mjs';

const files = argsOrUsage('node checks/type.mjs <arquivo.css|.html ...>');
const vars = varMap(files);
const PRIMARY = new Set(['muoto', 'muotomono', 'muoto mono condensed', 'inherit', 'initial', 'unset']);
const FALLBACK = new Set([...PRIMARY, 'dm sans', 'martian mono', 'helvetica neue', 'arial', 'sans-serif', 'ui-monospace', 'menlo', 'monospace']);
const ACTIVE = /(active|ativo|selected|current|checked|is-on)/i;
const failures = [];

for (const f of files) for (const r of cssOf(f)) for (const d of r.decls) {
  const v = resolveVars(d.value, vars);
  if (d.prop === 'font-family') {
    const fams = v.split(',').map((x) => x.trim().replace(/^["']|["']$/g, '').toLowerCase()).filter(Boolean);
    if (!PRIMARY.has(fams[0])) failures.push({ file: f, msg: `font-family "${d.value}" em "${r.selector}": a primeira família tem que ser Muoto ou MuotoMono` });
    else if (fams.some((x) => !FALLBACK.has(x))) failures.push({ file: f, msg: `font-family "${d.value}" em "${r.selector}": fallback fora da lista dos tokens (DM Sans, Martian Mono, Helvetica Neue, Arial, sans-serif, ui-monospace, Menlo, monospace)` });
  }
  let w = d.prop === 'font-weight' ? v.trim() : d.prop === 'font' ? (v.match(/\b([1-9]00|bold|bolder|lighter)\b/) || [])[1] : null;
  if (!w || /^(inherit|initial|unset)$/.test(w)) continue;
  if (w === 'normal') w = '400';
  if (w === 'bold') w = '700';
  if (r.selector.startsWith('@font-face')) continue;
  if (w === '400') continue;
  if (w === '600' && ACTIVE.test(r.selector)) continue;
  if (w === '300' && /\.muoto\b/i.test(r.selector)) continue;
  failures.push({ file: f, msg: `font-weight ${d.value} em "${r.selector}": 400; 300 só em .muoto; 600 só em filtro ativo (active/ativo/selected/current)` });
}
finish('R-TYPE-01', failures, 'Muoto + MuotoMono, pesos 400 / 300 em .muoto / 600 em ativo');
