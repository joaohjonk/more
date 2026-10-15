#!/usr/bin/env node
// R-LAYOUT-02 (parte medível): proporção e cantos de imagem.
// Imagem: só foto de produto e exportação de foto para canal são medidas - arquivo dentro de uma pasta fotos/, ou nome
// com foto, photo, PDT_, ig-feed/ig-story, story, feed, _IG_ ou _IGS_. Nunca mede captura de página ou render de
// layout: nome com web, captura ou folha, ou imagem mais alta que 2,5x a largura.
// A foto medida tem largura/altura 2:3 (fonte: original da câmera, ex. MORE_0800 4379x6568), 3:4, 4:5, 9:16 ou 3:2 (tolerância 1%). Nome com _4x5_ => 1080x1350; _9x16_ => 1080x1920.
// CSS: em seletor de imagem (img, image, photo, foto, picture, media, gallery, thumbnail, video) aspect-ratio só 2/3, 3/4, 4/5, 9/16, 3/2
//      e border-radius 0 (foto de produto reta). Miniatura/amostra de material (thumb, swatch, material, sample) pode ter 2px
//      (radius.thumb). Valor fora da escala de raios não é contado aqui: R-SHAPE-01 já falha.
// Uso: node checks/aspect.mjs <imagem.jpg|.png|.webp|arquivo.css ...>
import path from 'node:path';
import { argsOrUsage, finish, cssOf, varMap, resolveVars, ext, IMG_EXT, imageInfo } from './lib.mjs';

const files = argsOrUsage('node checks/aspect.mjs <imagem|arquivo.css ...>');
const RATIOS = { '2:3': 2 / 3, '3:4': 3 / 4, '4:5': 4 / 5, '9:16': 9 / 16, '3:2': 3 / 2 };
const EXPORTS = { '4x5': [1080, 1350], '9x16': [1080, 1920] };
const IMG_SEL = /(^|[^\w-])img\b|image|photo|foto|picture|media|gallery|thumbnail|video/i;
const failures = [];
const cssFiles = files.filter((f) => ['css', 'html'].includes(ext(f)));
const vars = varMap(cssFiles);

for (const f of files) {
  if (IMG_EXT.includes(ext(f))) {
    const b = path.basename(f);
    const isPhoto = /(^|[\\/])fotos[\\/]/i.test(f) || /foto|photo|PDT_|(^|[-_])ig[-_](feed|story)|story|feed|_IGS?_/i.test(b);
    if (!isPhoto || /web|captura|folha/i.test(b)) continue;
    const { w, h } = imageInfo(f);
    if (h > 2.5 * w) continue; // captura de página inteira
    const r = w / h;
    const hit = Object.entries(RATIOS).find(([, v]) => Math.abs(r - v) / v <= 0.01);
    if (!hit) failures.push({ file: f, msg: `${w}x${h} (${r.toFixed(3)}) não é 2:3, 3:4, 4:5, 9:16 nem 3:2` });
    const tag = (path.basename(f).match(/_(4x5|9x16)_/) || [])[1];
    if (tag && (w !== EXPORTS[tag][0] || h !== EXPORTS[tag][1])) failures.push({ file: f, msg: `arquivo marcado ${tag} tem ${w}x${h}; exportação ${tag} é ${EXPORTS[tag].join('x')}` });
    continue;
  }
  if (!cssFiles.includes(f)) continue;
  for (const r of cssOf(f)) {
    const target = r.selector.split(',').map((s) => s.trim().split(/[\s>+~]+/).pop()).join(',');
    if (!IMG_SEL.test(target) || /button|label|icon|logo/i.test(target)) continue;
    for (const d of r.decls) {
      const v = resolveVars(d.value, vars).replace(/\s+/g, '');
      if (d.prop === 'aspect-ratio' && !['2/3', '3/4', '4/5', '9/16', '3/2', '.75', '0.75', '1.5', '.8', '0.8', 'auto'].includes(v))
        failures.push({ file: f, msg: `aspect-ratio ${d.value} em "${r.selector}": imagem é 2/3, 3/4, 4/5, 9/16 ou 3/2` });
      const small = /thumb|swatch|material|sample/i.test(r.selector);
      const onScale = /^(2px|8px|10px|50%)$/.test(v);
      if (/border-radius$/.test(d.prop) && onScale && !(small && v === '2px'))
        failures.push({ file: f, msg: `border-radius ${d.value} em imagem "${r.selector}": foto de produto é reta (2px só em miniatura/amostra)` });
    }
  }
}
finish('R-LAYOUT-02', failures, 'proporções 3:4 / 4:5 / 9:16 / 3:2 e fotos retas');
