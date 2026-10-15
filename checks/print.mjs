#!/usr/bin/env node
// R-PRINT-01: arquivo de impressão.
//   PDF: declara PDF/X-4 (GTS_PDFXVersion), toda página tem TrimBox e BleedBox com sangria de 3 mm (8,50 pt +/- 0,3) em cada lado,
//        e nenhum conteúdo pinta off-white (0,898 0,882 0,859 rg / #E5E1DB): off-white é o papel, não tinta.
//   Raster (jpg/png/tif): resolução declarada >= 300 dpi.
// Não automatizado (conferir no preflight do Acrobat, valores fixos): margem de segurança 5 mm; preto rico C60 M40 Y40 K100
// só em áreas >= 10 mm de altura, texto < 10 pt em K100 puro; papel natural sem revestimento 90-150 g/m².
// Uso: node checks/print.mjs <arquivo.pdf|imagem ...>
import fs from 'node:fs';
import zlib from 'node:zlib';
import { argsOrUsage, finish, ext, IMG_EXT, imageInfo } from './lib.mjs';

const files = argsOrUsage('node checks/print.mjs <arquivo.pdf|imagem ...>');
const BLEED = 8.504, TOL = 0.3;
const failures = [];

function pdfText(buf) {
  // texto cru + todos os streams FlateDecode descomprimidos
  const raw = buf.toString('latin1');
  let out = raw;
  const re = /stream\r?\n/g;
  let m;
  while ((m = re.exec(raw))) {
    const start = m.index + m[0].length;
    const end = raw.indexOf('endstream', start);
    if (end < 0) break;
    try { out += '\n' + zlib.inflateSync(buf.subarray(start, end)).toString('latin1'); } catch { /* não é flate */ }
    re.lastIndex = end;
  }
  return out;
}
const box = (s, name) => { const m = s.match(new RegExp(`/${name}\\s*\\[\\s*([-\\d.\\s]+)\\]`)); return m ? m[1].trim().split(/\s+/).map(Number) : null; };

for (const f of files) {
  if (IMG_EXT.includes(ext(f))) {
    const { dpi } = imageInfo(f);
    if (!dpi || Math.min(...dpi) < 299.5) failures.push({ file: f, msg: `resolução ${dpi ? Math.round(Math.min(...dpi)) : 'não declarada'} dpi: impressão pede >= 300 dpi` });
    continue;
  }
  if (ext(f) !== 'pdf') continue;
  const t = pdfText(fs.readFileSync(f));
  if (!/GTS_PDFXVersion[^\n]{0,40}PDF\/X-4|pdfxid:GTS_PDFXVersion>\s*PDF\/X-4/.test(t)) failures.push({ file: f, msg: 'não declara PDF/X-4 (exporte com o preset PDF/X-4:2008)' });
  const pages = t.split(/\/Type\s*\/Page(?!s)/).slice(1);
  if (!pages.length) failures.push({ file: f, msg: 'nenhuma página encontrada' });
  pages.forEach((p, i) => {
    const seg = p.slice(0, 1500);
    const trim = box(seg, 'TrimBox'), bleed = box(seg, 'BleedBox');
    if (!trim || !bleed) { failures.push({ file: f, msg: `página ${i + 1} sem ${!trim ? 'TrimBox' : 'BleedBox'}` }); return; }
    const sides = [trim[0] - bleed[0], trim[1] - bleed[1], bleed[2] - trim[2], bleed[3] - trim[3]];
    if (sides.some((s) => Math.abs(s - BLEED) > TOL)) failures.push({ file: f, msg: `página ${i + 1}: sangria ${sides.map((s) => (s / 2.8346).toFixed(1)).join('/')} mm; precisa de 3 mm em cada lado` });
  });
  const ow = /\b0?\.89[78]\d*\s+0?\.88[12]\d*\s+0?\.85[89]\d*\s+(rg|sc|scn)\b/;
  if (ow.test(t)) failures.push({ file: f, msg: 'off-white impresso como cor (0.898 0.882 0.859 rg): off-white é o papel, deixe sem tinta' });
}
finish('R-PRINT-01', failures, 'PDF/X-4, sangria 3 mm, off-white sem tinta, >= 300 dpi');
