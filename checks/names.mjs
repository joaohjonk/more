#!/usr/bin/env node
// R-NAME-01: um nome canônico por peça, "<Tipo> <complemento em minúscula> <Nome>" (checks/nomes-canonicos.json).
//   - falha toda variante listada (Mesa Cildo, Torre de luz Ngoni, Cadeira 556 sem -A...)
//   - falha tipo com complemento em maiúscula (Mesa de Centro Imi, Mesa de Apoio Carnívora)
// Uso: node checks/names.mjs <arquivo.txt|.md|.html|.csv ...>
import { argsOrUsage, finish, textOf } from './lib.mjs';
import { names } from './text-lib.mjs';

const files = argsOrUsage('node checks/names.mjs <arquivo.txt|.md|.html|.csv ...>');
const { pecas, tipos } = names();
const CAPS = new RegExp(`(?<![\\p{L}])(${tipos.join('|')}) (de |da |do )?(Centro|Apoio|Jantar|Luz|Piso|Parede|Mesa)(?![\\p{L}])[^\\n.,]{0,20}`, 'gu');
const failures = [];
for (const f of files) {
  const text = textOf(f);
  for (const p of pecas) for (const v of p.variantes) {
    const re = new RegExp(`(?<![\\p{L}])[${v[0]}${v[0].toLowerCase()}]${v.slice(1)}(?![\\p{L}])`, 'gu');
    for (const m of text.matchAll(re)) failures.push({ file: f, msg: `"${m[0]}" é variante: o nome canônico é "${p.nome}"` });
  }
  for (const m of text.matchAll(CAPS)) failures.push({ file: f, msg: `"${m[0].trim()}": complemento do tipo vai em minúscula (ex. "Mesa de centro Imi")` });
}
finish('R-NAME-01', failures, 'só nomes canônicos');
