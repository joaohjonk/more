#!/usr/bin/env node
// R-COLOR-02: fundo da página = off-white #E5E1DB, texto = preto #2D211E. Nada de #FFF como fundo nem #000 opaco.
// Caso impresso (arquivo com @page ou @media print): off-white é o papel. O fundo de html/body na impressão
// (regra dentro de @media print, ou fora de mídia quando não há @media print) é none/transparent; off-white
// ou qualquer cor como fundo impresso falha. Texto branco sobre campo = papel sem tinta (vazado), permitido.
// Passe todos os CSS/HTML da página juntos: a regra vale para o conjunto (o body pode estar em qualquer um).
// Uso: node checks/ground-ink.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars, colorsIn, parseColor, dist, isPrintLayout } from './lib.mjs';

const files = argsOrUsage('node checks/ground-ink.mjs <arquivo.css|.html ...>');
const vars = varMap(files);
const OFF = parseColor('#e5e1db'), PRETO = parseColor('#2d211e');
const failures = [];
const print = files.some(isPrintLayout);
let bodyBg = null, bodyColor = null, printBg = null;

for (const f of files) for (const r of cssOf(f)) {
  const isRoot = r.selector.split(',').some((s) => /^(html|body|:root)$/.test(s.trim()));
  const inPrint = /\bprint\b/.test(r.media);
  for (const d of r.decls) {
    if (d.prop.startsWith('--')) continue;
    const v = resolveVars(d.value, vars);
    for (const { raw, c } of colorsIn(v)) {
      if (c.a >= 0.99 && c.r === 0 && c.g === 0 && c.b === 0)
        failures.push({ file: f, msg: `preto puro ${raw} em ${d.prop} de "${r.selector}": use color.preto #2D211E` });
      if (c.a >= 0.99 && c.r === 255 && c.g === 255 && c.b === 255 && /^background/.test(d.prop) && isRoot)
        failures.push({ file: f, msg: `fundo branco em "${r.selector}": o fundo da página é off-white #E5E1DB` });
    }
    if (isRoot && /^background(-color)?$/.test(d.prop)) { if (inPrint) printBg = { v, f }; else if (!r.media) bodyBg = { v, f }; }
    if (isRoot && d.prop === 'color' && !inPrint) bodyColor = { v, f };
  }
}
const near = (v, ref) => colorsIn(v).some(({ c }) => c.a >= 0.99 && dist(c, ref) < 2);
const clear = (v) => /^(none|transparent)$/i.test(v.trim()) || colorsIn(v).every(({ c }) => c.a === 0) && colorsIn(v).length > 0;
if (print) {
  const pb = printBg || bodyBg;
  if (pb && !clear(pb.v)) failures.push({ file: pb.f, msg: `peça impressa com fundo "${pb.v}" na impressão: off-white é o papel, use background:none em @media print` });
  if (!pb) failures.push({ msg: 'peça impressa sem fundo declarado: declare html,body{background:none} em @media print' });
} else if (!bodyBg) failures.push({ msg: 'nenhum html/body/:root declara background: a página precisa de background: var(--off-white) (#E5E1DB)' });
else if (!near(bodyBg.v, OFF)) failures.push({ file: bodyBg.f, msg: `fundo da página é "${bodyBg.v}", deveria ser off-white #E5E1DB` });
if (!bodyColor) failures.push({ msg: 'nenhum html/body/:root declara color: o texto corrido cai no padrão do navegador (#000). Declare body{color:var(--preto)}' });
else if (!near(bodyColor.v, PRETO)) failures.push({ file: bodyColor.f, msg: `cor do texto da página é "${bodyColor.v}", deveria ser preto #2D211E` });

finish('R-COLOR-02', failures, print ? 'impresso: papel sem tinta de fundo, texto preto' : 'fundo off-white, texto preto, sem #000 nem fundo branco');
