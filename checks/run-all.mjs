#!/usr/bin/env node
// Roda todos os checks contra uma pasta (recursiva) e imprime a tabela regra / script / arquivos / resultado,
// seguida do detalhe de cada falha. Cada script recebe, de uma vez, todos os arquivos da pasta que ele sabe ler.
// Uso: node checks/run-all.mjs <pasta|arquivo ...> [--sem-detalhe]
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CHECKS_DIR } from './lib.mjs';
import { CHECKS } from './registry.mjs';

const dirs = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (!dirs.length || dirs.some((d) => !fs.existsSync(d))) { console.error('uso: node checks/run-all.mjs <pasta|arquivo ...> [--sem-detalhe]'); process.exit(2); }
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.name.startsWith('.') || e.name === 'node_modules' ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const all = dirs.flatMap((d) => (fs.statSync(d).isDirectory() ? walk(d) : [d]));

const rows = [], details = [];
let failed = 0;
for (const c of CHECKS) {
  if (c.rejected) { rows.push([c.rule, '-', '-', 'rejeitada (fora do guia)']); continue; }
  if (!c.script) { rows.push([c.rule, 'exemplos', '-', 'revisão visual com o par sim/nao']); continue; }
  const files = all.filter((f) => { try { return c.accepts(f); } catch { return false; } });
  if (!files.length) { rows.push([c.rule, c.script, '0', 'sem arquivo aplicável']); continue; }
  const r = spawnSync('node', [path.join(CHECKS_DIR, c.script), ...files], { encoding: 'utf8', maxBuffer: 64 << 20 });
  const n = (r.stdout.match(/FALHA \((\d+)\)/) || [])[1];
  const status = r.status === 0 ? 'PASSA' : r.status === 1 ? `FALHA (${n})` : `ERRO (exit ${r.status})`;
  if (r.status !== 0) { failed++; details.push((r.stdout + r.stderr).trim()); }
  rows.push([c.rule, c.script, String(files.length), status + (c.examples ? ' + exemplos' : '')]);
}
const head = ['regra', 'script', 'arquivos', 'resultado'];
const w = head.map((h, i) => Math.max(h.length, ...rows.map((r) => r[i].length)));
const line = (r) => r.map((x, i) => x.padEnd(w[i])).join('  ');
console.log(`checks da More em ${dirs.join(' + ')} (${all.length} arquivos)\n`);
console.log(line(head));
console.log(w.map((n) => '-'.repeat(n)).join('  '));
for (const r of rows) console.log(line(r));
console.log(`\n${failed} regra(s) com falha`);
if (!process.argv.includes('--sem-detalhe') && details.length) console.log('\n' + details.join('\n\n'));
process.exit(failed ? 1 : 0);
