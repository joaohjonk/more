#!/usr/bin/env node
// R-COMMERCE-02 (proposta): preço só na página de produto. Em HTML, nenhum card de grade
// (elemento com classe que contém "product-card" ou "card-product") pode conter preço (R$ + número).
// Uso: node checks/grid-price.mjs <pagina.html ...>
import fs from 'node:fs';
import { argsOrUsage, finish, htmlText } from './lib.mjs';

const files = argsOrUsage('node checks/grid-price.mjs <pagina.html ...>');
const failures = [];
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8').replace(/<(script|style|template)[\s\S]*?<\/\1>/gi, '');
  const starts = [...raw.matchAll(/<\w+[^>]*class\s*=\s*"(?:[^"]*\s)?(product-card[\w-]*|card-product[\w-]*)(?=[\s"])[^"]*"/gi)]
    .filter((m) => !/__/.test(m[1])).map((m) => m.index);
  let n = 0;
  starts.forEach((s, i) => {
    const chunk = raw.slice(s, starts[i + 1] ?? s + 4000);
    const price = htmlText(chunk).match(/R\$\s?\d[\d.,]*/);
    if (price) n++;
  });
  if (n) failures.push({ file: f, msg: `${n} de ${starts.length} cards de grade mostram preço (R$): preço fica só na página de produto` });
}
finish('R-COMMERCE-02', failures, 'nenhum preço na grade');
