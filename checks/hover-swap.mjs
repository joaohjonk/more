#!/usr/bin/env node
// R-MOTION-03: a segunda foto do card (troca no hover) entra por fusão no quadro de hoje (75%, centrada).
//   - vale para regras de foto de card em estado hover/focus e para a própria "segunda foto"
//     (seletor com hover-image, hover-img, --alternate, --secondary, img.alt, img.b, img.detalhe, .foto-2)
//   - a segunda foto não escala nem se desloca: transform só none ou translate(-50%, -50%); scale() diferente de 1 falha
//   - tamanho, posição e o 60% da primeira foto ficam como estão: a regra não mede width nem opacity de repouso
//   - duração da fusão: 300ms (motion.role.hover-swap) ou 0 (troca seca); curva ease, ease-out ou o token standard; snap falha
//   - blocos sob um seletor que começa com .comparacao são comparações (demo) e não contam
// Uso: node checks/hover-swap.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars } from './lib.mjs';

const files = argsOrUsage('node checks/hover-swap.mjs <arquivo.css|.html ...>');
const vars = varMap(files);
const SECOND = /hover-image|hover-img|--alternate|--secondary|img\.(alt|b|detalhe|secondary|hover)\b|\.foto-2\b|\.detalhe\b/i;
const PHOTO = /img|image|foto|photo|media/i;
const HOVER = /:hover|:focus-within|:focus-visible|\.on\b|\.is-hover/i;
const CARD = /card|produto|product|tile|grid/i;
const ms = (t) => Math.round(t.endsWith('ms') ? parseFloat(t) : parseFloat(t) * 1000);
const failures = [];
let seen = 0;

for (const f of files) for (const r of cssOf(f)) {
  if (r.atRule || /prefers-reduced-motion\s*:\s*reduce/.test(r.media)) continue;
  for (const sel of r.selector.split(',').map((s) => s.trim())) {
    if (/^\.comparacao\b/.test(sel)) continue;
    const isSecond = SECOND.test(sel);
    const isHoverPhoto = HOVER.test(sel) && PHOTO.test(sel) && CARD.test(sel);
    if (!isSecond && !isHoverPhoto) continue;
    seen++;
    const d = Object.fromEntries(r.decls.map((x) => [x.prop, resolveVars(x.value, vars)]));
    const where = `"${sel}"`;
    if (d.transform && !/^none$/.test(d.transform.trim())) {
      const sc = d.transform.match(/scale[XY]?\(\s*([\d.]+)/i);
      if (sc && Number(sc[1]) !== 1) failures.push({ file: f, msg: `${where}: a segunda foto escala (${d.transform}); só opacity muda` });
      if (/translate/.test(d.transform) && !/translate\(\s*-50%\s*,\s*-50%\s*\)/.test(d.transform)) failures.push({ file: f, msg: `${where}: a foto se desloca (${d.transform}); distância é motion.distance.none` });
    }
    for (const p of ['transition', 'transition-duration', 'transition-timing-function']) {
      if (!d[p] || /^(none|initial|inherit|unset)$/.test(d[p])) continue;
      for (const item of d[p].split(/,(?![^(]*\))/).map((s) => s.trim())) {
        const t = item.match(/(?<![\w.-])\d*\.?\d+m?s\b/);
        if (t) { const dur = ms(t[0]); if (![0, 300].includes(dur)) failures.push({ file: f, msg: `${where}: fusão de ${dur}ms; a troca de foto usa 300ms (motion.role.hover-swap) ou 0` }); }
        const e = (item.match(/cubic-bezier\([^)]*\)|\b(ease-in-out|ease-out|ease-in|ease|linear)\b/) || [])[0];
        if (e && !(['ease', 'ease-out'].includes(e) || /cubic-bezier\(\s*0?\.25\s*,\s*0?\.1\s*,\s*0?\.25\s*,\s*1\s*\)/.test(e))) failures.push({ file: f, msg: `${where}: curva ${e}; a fusão usa ease (motion.easing.standard) ou ease-out, nunca snap` });
      }
    }
  }
}
finish('R-MOTION-03', failures, seen ? 'a segunda foto entra por fusão, sem escala' : 'sem card com troca de foto');
