// Passo depois do build: acrescenta `font-synthesis: none` aos CSS gerados.
// A licença da More cobre só Muoto e Muoto Mono Condensed em Regular e Italic (400). Sem esta linha o
// navegador inventa negrito e itálico quando um estilo pede 300, 600 ou 700; com ela, sai a Regular.
// Rodar: node brand/tokens/font-synthesis.mjs (o npm run tokens:build já chama).
import fs from 'node:fs';

const FILES = ['brand/generated/tokens.css', 'brand/build/css/more-tokens.css'];
const MARK = '/* more: font-synthesis */';
const BLOCK = `\n${MARK}\n/* Sem peso nem itálico sintético: a licença 205TF da More só tem Regular e Italic (type.tokens.json, $extensions.more.licenca). */\n:root { font-synthesis: none; }\n`;

for (const f of FILES) {
  if (!fs.existsSync(f)) continue;
  const css = fs.readFileSync(f, 'utf8');
  if (css.includes(MARK)) continue;
  fs.writeFileSync(f, css.replace(/\s*$/, '\n') + BLOCK);
  console.log(`font-synthesis: none -> ${f}`);
}
