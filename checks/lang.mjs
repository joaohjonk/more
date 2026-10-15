#!/usr/bin/env node
// R-COPY-03: português primeiro.
//   - HTML: <html lang="pt-BR"> (ou "pt"); todo bloco de texto com 6+ palavras em inglês precisa estar dentro de
//     elemento marcado lang="en" (versão secundária)
//   - texto: o primeiro parágrafo com 6+ palavras tem que ser português
// Inglês = mais palavras-função inglesas que portuguesas no bloco (listas abaixo).
// Uso: node checks/lang.mjs <arquivo.html|.txt|.md ...>
import fs from 'node:fs';
import { argsOrUsage, finish, ext, htmlText } from './lib.mjs';
import { words } from './text-lib.mjs';

const EN = new Set('the and is are of to in for with a an this that our we you your it on at by from be as or'.split(' '));
const PT = new Set('o a os as de do da dos das e é são um uma para com no na nos nas em por que não se ao seu sua mais'.split(' '));
const isEnglish = (t) => { const w = words(t.toLowerCase()); if (w.length < 6) return false; const en = w.filter((x) => EN.has(x)).length, pt = w.filter((x) => PT.has(x)).length; return en > pt; };

const files = argsOrUsage('node checks/lang.mjs <arquivo.html|.txt|.md ...>');
const failures = [];
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  if (['html', 'htm'].includes(ext(f))) {
    const lang = (raw.match(/<html[^>]*\blang\s*=\s*"([^"]*)"/i) || [])[1];
    if (!lang || !/^pt(-BR)?$/i.test(lang)) failures.push({ file: f, msg: `<html lang="${lang ?? ''}">: a página é lang="pt-BR"` });
    // remove trechos marcados lang="en" antes de procurar inglês solto
    const unmarked = raw.replace(/<(?!html\b)(\w+)[^>]*\blang\s*=\s*"en[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, ' ');
    const seen = new Set();
    for (const block of htmlText(unmarked).split('\n')) if (isEnglish(block) && !seen.has(block)) { seen.add(block); failures.push({ file: f, msg: `texto em inglês fora de elemento lang="en": "${block.slice(0, 70)}"` }); }
  } else {
    const first = raw.split(/\n\s*\n/).map((p) => p.trim()).find((p) => words(p).length >= 6);
    if (first && isEnglish(first)) failures.push({ file: f, msg: `o primeiro parágrafo está em inglês: "${first.slice(0, 70)}"` });
  }
}
finish('R-COPY-03', failures, 'português primeiro');
