#!/usr/bin/env node
// R-FILE-01: MORE_<CANAL>_<peça-slug>_<variante>_<AAAAMMDD>_v<nn>.<ext>
//   CANAL: IG, IGS (story), SITE, PRINT, LIVRO, CONVITE, VITRINE, EMAIL, VIDEO
//   peça-slug: slug de um nome canônico (checks/nomes-canonicos.json) ou "marca"
//   variante: [a-z0-9-] (ex. 4x5, 9x16, preto, ipe-natural); data real; versão com 2 dígitos; extensão minúscula
// Aceita caminhos de qualquer arquivo (só o nome é lido).
// Uso: node checks/filename.mjs <arquivo ...>
import path from 'node:path';
import { argsOrUsage, finish } from './lib.mjs';
import { names, slug } from './text-lib.mjs';

const files = argsOrUsage('node checks/filename.mjs <arquivo ...>');
const CANAIS = ['IG', 'IGS', 'SITE', 'PRINT', 'LIVRO', 'CONVITE', 'VITRINE', 'EMAIL', 'VIDEO'];
const SLUGS = new Set([...names().pecas.map((p) => slug(p.nome)), 'marca']);
const RE = /^MORE_([A-Z]+)_([a-z0-9-]+)_([a-z0-9-]+)_(\d{4})(\d{2})(\d{2})_v(\d{2})\.([a-z0-9]+)$/;
const failures = [];
for (const f of files) {
  const b = path.basename(f);
  const m = b.match(RE);
  if (!m) { failures.push({ file: f, msg: 'fora do padrão MORE_<CANAL>_<peça-slug>_<variante>_<AAAAMMDD>_v<nn>.<ext> (ex. MORE_IG_mesa-de-centro-cildo_4x5_20261105_v02.jpg)' }); continue; }
  const [, canal, peca, , y, mo, d] = m;
  if (!CANAIS.includes(canal)) failures.push({ file: f, msg: `canal "${canal}" fora da lista ${CANAIS.join(', ')}` });
  if (!SLUGS.has(peca)) failures.push({ file: f, msg: `"${peca}" não é slug de nome canônico nem "marca"` });
  const dt = new Date(`${y}-${mo}-${d}T00:00:00Z`);
  if (isNaN(dt) || dt.getUTCDate() !== +d || dt.getUTCMonth() + 1 !== +mo) failures.push({ file: f, msg: `data ${y}${mo}${d} inválida` });
}
finish('R-FILE-01', failures, 'nomes de arquivo no padrão');
