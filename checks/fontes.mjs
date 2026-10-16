#!/usr/bin/env node
// R-FONT-01 (PROPOSTA, fora do run-all.mjs até o time aceitar): nenhum arquivo de fonte no repositório nem no histórico.
// O repositório é público e a licença 205TF proíbe copiar os arquivos (EULA, § Protection). Procura .otf, .ttf, .woff,
// .woff2 e .eot em: arquivos versionados no HEAD, e todo commit alcançável por qualquer ref (branches locais e remotos, tags).
// Fonte que só existe fora do git (node_modules, pasta compartilhada) não conta.
// Uso: node checks/fontes.mjs [pasta-do-repositório]   (padrão: este repositório)
import { execFileSync } from 'node:child_process';
import { finish, REPO } from './lib.mjs';

const dir = process.argv.slice(2).find((a) => !a.startsWith('--')) || REPO;
const FONT = /\.(otf|ttf|woff2?|eot)$/i;
const git = (...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8', maxBuffer: 1 << 28 });
const failures = [];

for (const f of git('ls-files').split('\n').filter((f) => FONT.test(f))) failures.push({ msg: `versionado no HEAD: ${f}` });

const seen = new Map();
let commit = '';
for (const line of git('log', '--all', '--name-only', '--diff-filter=A', '--format=@%h %s').split('\n')) {
  if (line.startsWith('@')) { commit = line.slice(1, 60); continue; }
  if (FONT.test(line) && !seen.has(line)) seen.set(line, commit);
}
for (const [f, c] of seen) {
  const refs = git('branch', '-a', '--contains', c.split(' ')[0]).split('\n').map((s) => s.replace(/^[*\s]+/, '')).filter(Boolean);
  failures.push({ msg: `no histórico: ${f} (entrou em ${c}; alcançável por ${refs.join(', ') || 'nenhum branch'})` });
}
finish('R-FONT-01', failures, 'nenhum arquivo de fonte no repositório nem no histórico');
