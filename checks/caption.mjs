#!/usr/bin/env node
// R-COPY-02: legenda (um .txt por legenda; várias no mesmo .txt separadas por linha "---").
// Duas fórmulas. A fórmula vem de uma primeira linha "tipo: peca|evento|bastidores|marca" (removida antes do teste)
// ou, sem ela, do nome do arquivo (evento, abertura, bastidores, marca, sobre => fato; senão peca).
//   peca: 1. frase com o nome canônico (checks/nomes-canonicos.json)
//         2. UMA linha seca de 3 a 12 palavras, antes de qualquer linha de material
//         3. (opcional) linha de material/ficha
//   fato (evento, bastidores, marca): 1. primeira frase diz o fato (o quê; e para evento: quando = data dd.mm ou
//         "dd de mês"); 2. (opcional) no máximo UMA linha seca de 3 a 12 palavras; o resto são linhas de fato
//         (endereço, horário). Nome de peça não é exigido.
// Linha seca = frase sem palavra de material/ficha (checks/palavras-de-material.json) e que não é status
// ("Pronta entrega", "Sob encomenda...").
// Em todas: 4-145 palavras, zero "!", emoji, hashtag e palavra proibida (fora de checks/aprovadas.json).
// O tom "discorda da convenção" não é medido: compare com as linhas aprovadas da regra.
// Unidade: frase na fórmula peca; linha na fórmula fato.
// Uso: node checks/caption.mjs <legenda.txt ...>
import path from 'node:path';
import { argsOrUsage, finish, textOf } from './lib.mjs';
import { forbiddenRe, EMOJI, MATERIAL, STATUS, sentences, words, findCanonical, semAprovadas } from './text-lib.mjs';

const files = argsOrUsage('node checks/caption.mjs <legenda.txt ...>');
const FATO_NOME = /evento|abertura|bastidor|marca|sobre/i;
const DATA = /\b\d{1,2}[./]\d{1,2}\b|\b\d{1,2} de (janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/i;
const failures = [];
for (const f of files) {
  const caps = textOf(f).split(/^\s*---\s*$/m).map((c) => c.trim()).filter(Boolean);
  caps.forEach((cap0, i) => {
    let cap = cap0, tipo = null;
    const t = cap.match(/^tipo:\s*(\S+)\s*\n/i);
    if (t) { tipo = t[1].toLowerCase(); cap = cap.slice(t[0].length); }
    if (!tipo) tipo = FATO_NOME.test(path.basename(f)) ? 'fato' : 'peca';
    if (['evento', 'bastidores', 'marca'].includes(tipo)) tipo = tipo === 'evento' ? 'evento' : 'fato';
    const tag = (caps.length > 1 ? `legenda ${i + 1} ` : '') + `[${tipo}]: `;
    const fail = (msg) => failures.push({ file: f, msg: tag + msg });
    const n = words(cap).length;
    if (n < 4 || n > 145) fail(`${n} palavras (precisa de 4-145)`);
    for (const m of semAprovadas(cap).matchAll(forbiddenRe)) fail(`palavra proibida "${m[0]}"`);
    if (/[!¡]/.test(cap)) fail('ponto de exclamação');
    if (EMOJI.test(cap)) fail('emoji');
    if (/(^|\s)#[\p{L}\d_]+/u.test(cap)) fail('hashtag');
    // unidade: frase na fórmula peca; linha na fórmula fato (legenda de uma linha só é dividida em frases)
    const lines = cap.split('\n').map((l) => l.trim()).filter(Boolean);
    const ss = tipo !== 'peca' && lines.length > 1 ? lines : sentences(cap);
    const isDry = (s) => !MATERIAL.test(s) && !STATUS.test(s) && !findCanonical(s).length && words(s).length >= 3 && words(s).length <= 12;
    const isFact = (s) => /\d/.test(s) || DATA.test(s);
    if (tipo === 'peca') {
      const nameIdx = ss.findIndex((s) => findCanonical(s).length);
      if (nameIdx < 0) { fail('nenhum nome canônico de peça (ver checks/nomes-canonicos.json); post sem peça usa "tipo: evento|bastidores|marca"'); return; }
      const rest = ss.map((s, k) => ({ s, k })).filter(({ k }) => k !== nameIdx);
      const dry = rest.filter(({ s }) => isDry(s));
      const mat = rest.find(({ s }) => MATERIAL.test(s));
      if (dry.length !== 1) fail(dry.length ? `${dry.length} linhas secas; é uma só` : 'falta a linha seca (3-12 palavras, sem material nem status) além do nome');
      else if (mat && mat.k < dry[0].k) fail('a linha seca vem antes da linha de material');
    } else {
      if (!ss.length) { fail('vazia'); return; }
      if (tipo === 'evento' && !DATA.test(ss[0])) fail(`a primeira frase diz o fato com data (dd.mm ou "dd de mês"): "${ss[0].slice(0, 50)}"`);
      const dry = ss.slice(1).filter((s) => isDry(s) && !isFact(s));
      if (dry.length > 1) fail(`${dry.length} linhas secas; no máximo uma`);
    }
  });
}
finish('R-COPY-02', failures, 'legenda dentro da fórmula (peça ou fato)');
