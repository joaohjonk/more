#!/usr/bin/env node
// R-MOTION-01: transições e animações (padrão do site é a regra)
//   - duração (a primeira medida de cada item; atraso não conta) é um token motion.duration:
//     80, 140, 200, 300, 450, 500, 700, 800 ou 1000ms; 0s = troca instantânea, permitido. Qualquer outro valor falha
//   - curva: ease (padrão do site), ease-out, ease-in-out, cubic-bezier dos tokens snap (0.63,0.01,0,1.01),
//     out-expo (0.22,1,0.36,1) ou out-quint (0.23,1,0.32,1); linear só em contador (seletor/animação com counter, count,
//     contador, ticker, marquee, progress) ou com duração 0. ease-in e qualquer outro cubic-bezier falham
//   - "transition: all" falha
//   - todo seletor animado tem fallback em @media (prefers-reduced-motion: reduce): regra "*" ou o mesmo seletor
// Passe todos os CSS da página juntos.
// Uso: node checks/motion.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars } from './lib.mjs';

const files = argsOrUsage('node checks/motion.mjs <arquivo.css|.html ...>');
const vars = varMap(files);
const DURATIONS = [0, 80, 140, 200, 300, 450, 500, 700, 800, 1000];
const COUNTER = /counter|count|contador|ticker|marquee|progress/i;
const failures = [];
const animated = new Map(); // seletor -> arquivo
const reducedSel = new Set();

const ms = (t) => Math.round(t.endsWith('ms') ? parseFloat(t) : parseFloat(t) * 1000);
function splitTop(v) { const out = []; let d = 0, cur = ''; for (const ch of v) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { out.push(cur.trim()); cur = ''; } else cur += ch; } out.push(cur.trim()); return out.filter(Boolean); }
function easingOk(e, ctx) {
  if (['ease', 'ease-out', 'ease-in-out'].includes(e)) return true;
  if (e === 'linear') return COUNTER.test(ctx);
  const m = e.match(/cubic-bezier\(([^)]*)\)/);
  if (!m) return false;
  const k = m[1].split(',').map((n) => +Number(n).toFixed(2)).join(',');
  return ['0.22,1,0.36,1', '0.23,1,0.32,1', '0.63,0.01,0,1.01'].includes(k);
}
for (const f of files) for (const r of cssOf(f)) {
  const reduced = /prefers-reduced-motion\s*:\s*reduce/.test(r.media);
  for (const d of r.decls) {
    if (!/^(-webkit-)?(transition|animation)(-duration)?$/.test(d.prop)) continue;
    const v = resolveVars(d.value, vars);
    if (reduced) { for (const sel of r.selector.split(',')) reducedSel.add(sel.trim()); continue; }
    if (/^(none|initial|inherit|unset)$/.test(v.trim())) continue;
    for (const item of splitTop(v)) {
      const times = item.match(/(?<![\w.-])-?\d*\.?\d+m?s\b/g) || [];
      const dur = times.length ? ms(times[0]) : 0;
      const where = `${d.prop} "${item}" em "${r.selector}"`;
      if (!DURATIONS.includes(dur)) failures.push({ file: f, msg: `${where}: duração ${dur}ms fora da escala motion.duration (80, 140, 200, 300, 450, 500, 700, 800, 1000ms)` });
      if (/^all\b/.test(item) && !d.prop.includes('animation')) failures.push({ file: f, msg: `${where}: "transition: all"; nomeie as propriedades` });
      if (dur > 0) for (const sel of r.selector.split(',')) if (!animated.has(sel.trim())) animated.set(sel.trim(), f);
      if (d.prop.endsWith('-duration') || dur === 0) continue;
      const easing = (item.match(/cubic-bezier\([^)]*\)|steps\([^)]*\)|\b(ease-in-out|ease-out|ease-in|ease|linear|step-start|step-end)\b/) || [])[0] || 'ease';
      if (!easingOk(easing, r.selector + ' ' + item)) failures.push({ file: f, msg: `${where}: curva "${easing}" fora da lista (ease, ease-out, ease-in-out, tokens snap/out-expo/out-quint; linear só em contador)` });
    }
  }
}
if (!reducedSel.has('*')) {
  const miss = [...animated.keys()].filter((s) => !reducedSel.has(s));
  if (miss.length) failures.push({ msg: `${miss.length} de ${animated.size} seletores animados sem fallback em @media (prefers-reduced-motion: reduce) (ex. ${miss.slice(0, 3).map((x) => `"${x}"`).join(', ')}); a saída simples é *{transition:none;animation:none}` });
}
finish('R-MOTION-01', failures, 'durações e curvas da escala, com fallback de reduced-motion');
