#!/usr/bin/env node
// R-COPY-02: legenda de peça (um arquivo .txt por legenda; em .txt com várias legendas, separe por linha "---").
// Estrutura obrigatória, nesta ordem:
//   1. frase com o nome canônico da peça (checks/nomes-canonicos.json)
//   2. UMA linha seca de 3 a 12 palavras, sem palavra de material, antes de qualquer linha de material
//   3. (opcional) linha de material (contém madeira, aço, alumínio, estofada...)
// Mais: 4-145 palavras, zero "!", emoji, hashtag, zero palavra proibida (alma, essência, personalidade, luxo...).
// O tom "discorda da convenção" não é medido: compare com as linhas aprovadas listadas na regra.
// Uso: node checks/caption.mjs <legenda.txt ...>
import { argsOrUsage, finish, textOf } from './lib.mjs';
import { forbiddenRe, EMOJI, MATERIAL, sentences, words, findCanonical } from './text-lib.mjs';

const files = argsOrUsage('node checks/caption.mjs <legenda.txt ...>');
const failures = [];
for (const f of files) {
  const caps = textOf(f).split(/^\s*---\s*$/m).map((c) => c.trim()).filter(Boolean);
  caps.forEach((cap, i) => {
    const tag = caps.length > 1 ? `legenda ${i + 1}: ` : '';
    const fail = (msg) => failures.push({ file: f, msg: tag + msg });
    const n = words(cap).length;
    if (n < 4 || n > 145) fail(`${n} palavras (precisa de 4-145)`);
    for (const m of cap.matchAll(forbiddenRe)) fail(`palavra proibida "${m[0]}"`);
    if (/[!¡]/.test(cap)) fail('ponto de exclamação');
    if (EMOJI.test(cap)) fail('emoji');
    if (/(^|\s)#[\p{L}\d_]+/u.test(cap)) fail('hashtag');
    const ss = sentences(cap);
    const nameIdx = ss.findIndex((s) => findCanonical(s).length);
    if (nameIdx < 0) { fail('nenhum nome canônico de peça (ver checks/nomes-canonicos.json)'); return; }
    const rest = ss.filter((_, k) => k !== nameIdx);
    const dry = rest.map((s, k) => ({ s, k })).filter(({ s }) => !MATERIAL.test(s) && words(s).length >= 3 && words(s).length <= 12);
    const mat = rest.findIndex((s) => MATERIAL.test(s));
    if (dry.length !== 1) fail(dry.length ? `${dry.length} linhas secas; é uma só` : 'falta a linha seca (3-12 palavras, sem material) além do nome');
    else if (mat >= 0 && mat < dry[0].k) fail('a linha seca vem antes da linha de material');
  });
}
finish('R-COPY-02', failures, 'legenda = nome + uma linha seca + material opcional');
