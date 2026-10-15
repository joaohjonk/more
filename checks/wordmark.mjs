#!/usr/bin/env node
// R-GEN-01: a marca MORE só entra com os paths oficiais, inline. Em SVG/HTML:
//   - <svg>/<g> inline de marca (class/id com logo, wordmark, marca) tem exatamente os mesmos paths de
//     assets/official/more-wordmark.svg, more-wordmark-currentcolor.svg ou more-wordmark-small.svg (coordenadas a 0,1)
//   - os paths usam fill="currentColor" (ou nenhum fill): a cor vem do CSS/atributo do elemento, a partir dos tokens
//   - <img>/<image>/<use> de marca falha, mesmo apontando para o arquivo oficial: <img> não herda currentColor e o
//     more-wordmark.svg sai #000 (quebra R-COLOR-02)
//   - "MORE" escrito como texto (<text>, ou texto dentro de elemento de marca) falha: é marca redesenhada com fonte
// Imagem raster gerada não é lida aqui: o wordmark entra por composição (skill image-edit) do SVG oficial, nunca pelo prompt.
// Uso: node checks/wordmark.mjs <arquivo.svg|.html ...>
import fs from 'node:fs';
import path from 'node:path';
import { argsOrUsage, finish, REPO } from './lib.mjs';

const files = argsOrUsage('node checks/wordmark.mjs <arquivo.svg|.html ...>');
const OFFICIAL = ['more-wordmark.svg', 'more-wordmark-currentcolor.svg', 'more-wordmark-small.svg'];
const norm = (d) => d.replace(/-?\d*\.?\d+(e-?\d+)?/gi, (n) => (Math.round(parseFloat(n) * 10) / 10).toString()).replace(/\s+/g, ' ').trim();
const pathsOf = (svg) => [...svg.matchAll(/<path\b[^>]*\sd\s*=\s*"([^"]+)"/gi)].map((m) => norm(m[1])).sort().join('|');
const official = OFFICIAL.map((f) => pathsOf(fs.readFileSync(path.join(REPO, 'assets/official', f), 'utf8')));
const MARK = /\b(logo|wordmark|marca|more-mark)\b/i;
const failures = [];

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  if (OFFICIAL.includes(path.basename(f))) continue;
  for (const m of src.matchAll(/<(img|image|use)\b([^>]*)>/gi)) {
    const href = (m[2].match(/(?:xlink:)?(?:href|src)\s*=\s*"([^"]*)"/i) || [, ''])[1];
    const isMark = MARK.test(m[2]) || /wordmark|logo/i.test(href);
    if (isMark) failures.push({ file: f, msg: `<${m[1]}> de marca ("${href.slice(0, 50)}"): use os paths oficiais inline com fill="currentColor" e a cor pelo CSS` });
  }
  for (const m of src.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/gi))
    if (/\bM\s*O\s*R\s*E\b/i.test(m[1].replace(/<[^>]+>/g, ''))) failures.push({ file: f, msg: '"MORE" escrito como <text>: a marca é o SVG oficial, nunca digitada' });
  // blocos inline de marca: <svg ...logo...> ... </svg> ou <g ...wordmark...> ... </g>
  for (const m of src.matchAll(/<(svg|g)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    if (!MARK.test(m[2])) continue;
    if (/<(image|use|img)\b/i.test(m[3])) continue; // já checado acima
    const p = pathsOf(m[3]);
    if (!p) { if (/\bMORE\b/i.test(m[3].replace(/<[^>]+>/g, ''))) failures.push({ file: f, msg: 'bloco de marca com "MORE" em texto: use o SVG oficial' }); continue; }
    if (!official.includes(p)) failures.push({ file: f, msg: `<${m[1]}> de marca com paths diferentes do arquivo oficial: marca redesenhada ou aproximada` });
    for (const fm of m[3].matchAll(/<path\b[^>]*\sfill\s*=\s*"([^"]+)"/gi)) if (!/^(currentColor|none)$/i.test(fm[1])) { failures.push({ file: f, msg: `path da marca com fill="${fm[1]}": use fill="currentColor" e dê a cor no elemento` }); break; }
  }
  if (path.extname(f) === '.html') {
    for (const m of src.matchAll(/<(div|span|a|h1|p)\b([^>]*)>([^<]*)<\/\1>/gi))
      if (MARK.test(m[2]) && /\bMORE\b/i.test(m[3])) failures.push({ file: f, msg: `<${m[1]}> de marca com "MORE" em texto: use o SVG oficial` });
  }
}
finish('R-GEN-01', failures, 'marca sempre com os paths oficiais, inline, em currentColor');
