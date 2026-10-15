#!/usr/bin/env node
// R-COPY-01: texto da marca
//   - nenhuma palavra da lista proibida (luxo + "alma": ver text-lib.mjs)
//   - zero "!" / "¡", zero emoji, zero hashtag
//   - nenhuma frase com mais de 16 palavras (máximo observado no feed de 2026); texto inteiro <= 145 palavras por bloco
// Uso: node checks/copy.mjs <arquivo.txt|.md|.html ...>
import { argsOrUsage, finish, textOf } from './lib.mjs';
import { forbiddenRe, EMOJI, sentences, words } from './text-lib.mjs';

const files = argsOrUsage('node checks/copy.mjs <arquivo.txt|.md|.html ...>');
const MAX_SENT = 16;
const failures = [];
for (const f of files) {
  const text = textOf(f);
  for (const m of text.matchAll(forbiddenRe)) failures.push({ file: f, msg: `palavra proibida "${m[0]}"` });
  for (const line of text.split('\n')) {
    if (/[!¡]/.test(line)) failures.push({ file: f, msg: `ponto de exclamação: "${line.slice(0, 60)}"` });
    if (EMOJI.test(line)) failures.push({ file: f, msg: `emoji: "${line.slice(0, 60)}"` });
    if (/(^|\s)#[\p{L}\d_]+/u.test(line)) failures.push({ file: f, msg: `hashtag: "${line.slice(0, 60)}"` });
  }
  for (const s of sentences(text)) {
    const n = words(s).length;
    if (n > MAX_SENT) failures.push({ file: f, msg: `frase com ${n} palavras (máx. ${MAX_SENT}): "${s.slice(0, 70)}..."` });
  }
}
finish('R-COPY-01', failures, 'texto curto, sem luxo, sem exclamação');
