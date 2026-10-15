#!/usr/bin/env node
// R-COPY-01: texto da marca
//   - nenhuma palavra da lista proibida (luxo + "alma": ver text-lib.mjs), exceto dentro de uma linha aprovada
//     escrita igual (checks/aprovadas.json)
//   - zero "!" / "¡", zero emoji, zero hashtag
//   - nenhuma frase com mais de 16 palavras (máximo observado no feed de 2026). Conteúdo de <table>, <dl> e <li>
//     (fichas, medidas, listas) não conta para o tamanho de frase.
// Uso: node checks/copy.mjs <arquivo.txt|.md|.html ...>
import fs from 'node:fs';
import { argsOrUsage, finish, ext, htmlText } from './lib.mjs';
import { forbiddenRe, EMOJI, sentences, words, semAprovadas } from './text-lib.mjs';

const files = argsOrUsage('node checks/copy.mjs <arquivo.txt|.md|.html ...>');
const MAX_SENT = 16;
const failures = [];
for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const isHtml = ['html', 'htm', 'svg'].includes(ext(f));
  const text = isHtml ? htmlText(raw) : raw;
  const prose = isHtml ? htmlText(raw.replace(/<(table|dl|ul|ol)\b[\s\S]*?<\/\1>/gi, ' ')) : raw.split('\n').filter((l) => !/^\s*([-*|]|\d+\.)\s/.test(l)).join('\n');
  for (const m of semAprovadas(text).matchAll(forbiddenRe)) failures.push({ file: f, msg: `palavra proibida "${m[0]}" (fora de linha aprovada em checks/aprovadas.json)` });
  for (const line of text.split('\n')) {
    if (/[!¡]/.test(line)) failures.push({ file: f, msg: `ponto de exclamação: "${line.slice(0, 60)}"` });
    if (EMOJI.test(line)) failures.push({ file: f, msg: `emoji: "${line.slice(0, 60)}"` });
    if (/(^|\s)#[\p{L}\d_]+/u.test(line)) failures.push({ file: f, msg: `hashtag: "${line.slice(0, 60)}"` });
  }
  for (const s of sentences(prose)) {
    const n = words(s).length;
    if (n > MAX_SENT) failures.push({ file: f, msg: `frase com ${n} palavras (máx. ${MAX_SENT}): "${s.slice(0, 70)}..."` });
  }
}
finish('R-COPY-01', failures, 'texto curto, sem luxo, sem exclamação');
