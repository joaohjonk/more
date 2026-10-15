#!/usr/bin/env node
// R-COLOR-01: toda cor literal precisa ser o valor de um token aprovado; branco opaco só em propriedade de texto.
// Uso: node checks/color-tokens.mjs <arquivo.css|.html|.svg ...>
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { argsOrUsage, finish, cssOf, colorsIn, colorTokens, colorKey, varMap, resolveVars, REPO } from './lib.mjs';

const files = argsOrUsage('node checks/color-tokens.mjs <arquivo.css|.html|.svg ...>');
const failures = [];

// 1) cstack tokens lint (se instalado): cor literal que não é valor de token
const cstack = path.join(os.homedir(), 'cstack/bin/cstack.mjs');
if (fs.existsSync(cstack)) {
  const r = spawnSync('node', [cstack, 'tokens', 'lint', ...files, '--ws', REPO, '--allow', '#fff'], { encoding: 'utf8' });
  for (const line of (r.stdout || '').split('\n')) {
    const m = line.match(/^(.*?):(\d+) (\S+) raw/);
    if (m) failures.push({ file: m[1], msg: `linha ${m[2]}: ${m[3]} não é valor de nenhum token de cor (cstack tokens lint)` });
  }
}

// 2) regra estrita: token "site-sem-token-*" não conta como aprovado; branco opaco só em color/fill/stroke
const toks = colorTokens();
const approved = new Map(), pending = new Map();
for (const [name, c] of Object.entries(toks)) (name.startsWith('site-sem-token') ? pending : approved).set(colorKey(c), name);
const TEXT_PROPS = new Set(['color', 'fill', 'stroke', 'caret-color', '-webkit-text-fill-color', 'text-decoration-color']);

const vars = varMap(files);
for (const f of files) {
  const seen = new Set();
  for (const r of cssOf(f)) for (const d of r.decls) for (const { raw, c } of colorsIn(d.value)) {
    const k = colorKey(c);
    if (pending.has(k) && !approved.has(k) && !seen.has(k)) {
      seen.add(k);
      failures.push({ file: f, msg: `${raw} em "${r.selector}" só existe como color.${pending.get(k)} (cor do site sem token aprovado): troque por um token da paleta` });
    }
  }
  for (const r of cssOf(f)) for (const d of r.decls) for (const { c } of colorsIn(resolveVars(d.value, vars))) {
    if (colorKey(c) === '#ffffff' && !TEXT_PROPS.has(d.prop) && !d.prop.startsWith('--'))
      failures.push({ file: f, msg: `branco opaco em ${d.prop} de "${r.selector}": branco só pode ser cor de texto sobre fundo escuro` });
  }
}
finish('R-COLOR-01', failures, `${files.length} arquivo(s) usam só cores de token aprovado`);
