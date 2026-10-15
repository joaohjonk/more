#!/usr/bin/env node
// Autoteste: cada script tem que passar (exit 0) nos fixtures "ok" e falhar (exit 1) nos fixtures "falha".
// Uso: node checks/self-test.mjs
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CHECKS_DIR } from './lib.mjs';
import { CHECKS } from './registry.mjs';

const fx = (f) => path.join(CHECKS_DIR, 'fixtures', f);
let bad = 0;
for (const c of CHECKS.filter((x) => x.script)) {
  const run = (files) => spawnSync('node', [path.join(CHECKS_DIR, c.script), ...files.map(fx)], { encoding: 'utf8' });
  const ok = run(c.ok), no = run(c.falha);
  const pass = ok.status === 0 && no.status === 1;
  if (!pass) bad++;
  console.log(`${pass ? 'ok   ' : 'ERRO '} ${c.rule.padEnd(14)} ${c.script.padEnd(17)} ok=${ok.status} falha=${no.status}`);
  if (!pass) console.log((ok.status !== 0 ? ok.stdout + ok.stderr : no.stdout + no.stderr).replace(/^/gm, '        '));
}
console.log(bad ? `\n${bad} script(s) com autoteste quebrado` : '\ntodos os scripts passam no ok e falham no falha');
process.exit(bad ? 1 : 0);
