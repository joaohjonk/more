#!/usr/bin/env node
// R-LOGO-01: tamanho, cor e forma da marca num layout SVG (viewBox = quadro da peça).
// A marca é o elemento <image>/<use>/<svg>/<g> com href more-wordmark*.svg ou class/id com wordmark/logo/marca,
// com x, y, width, height (rotate de 90/270 troca largura e altura).
//   - M: lado maior da marca / lado menor do quadro entre 0,16 e 0,25
//   - XL: largura da marca / largura do quadro entre 0,95 e 1,00 e base da marca a no máx. 5% da base do quadro
//   - qualquer outro tamanho falha
//   - cor (fill/color) só preto #2D211E, branco #FFFFFF, off-white #E5E1DB (ou o arquivo oficial sem recolorir)
//   - stroke (contorno), scale negativo (espelho), escala não uniforme (esticada) e fill="url(...)" (padrão) falham
// Em HTML: o quadro é o elemento com data-canvas="LxA" (px) e a marca é <img> com style width/height/bottom em px.
// Uso: node checks/logo.mjs <layout.svg|layout.html ...>
import fs from 'node:fs';
import { argsOrUsage, finish, parseColor, dist } from './lib.mjs';

const files = argsOrUsage('node checks/logo.mjs <layout.svg|.html ...>');
const ALLOWED = ['#2d211e', '#ffffff', '#e5e1db'].map(parseColor);
const MARK = /more-wordmark|\b(wordmark|logo|marca)\b/i;
const failures = [];
const num = (s, k) => { const m = s.match(new RegExp(`\\b${k}\\s*=\\s*"(-?[\\d.]+)`)); return m ? parseFloat(m[1]) : null; };
const css = (s, k) => { const m = s.match(new RegExp(`(?:^|;|")\\s*${k}\\s*:\\s*(-?[\\d.]+)px`)); return m ? parseFloat(m[1]) : null; };

function judge(f, W, H, w, h, bottomGap, attrs, inner) {
  const short = Math.min(W, H), long = Math.max(w, h);
  const m = long / short, xl = w / W;
  const isM = m >= 0.16 && m <= 0.25;
  const isXL = xl >= 0.95 && xl <= 1.0001 && bottomGap !== null && bottomGap / H <= 0.05;
  if (!isM && !isXL) failures.push({ file: f, msg: `marca com ${Math.round(long)}px = ${(m * 100).toFixed(1)}% do lado menor e ${(xl * 100).toFixed(1)}% da largura: só M (16-25% do lado menor) ou XL (95-100% da largura, na base)` });
  const all = attrs + ' ' + inner;
  if (/stroke\s*=\s*"(?!none)[^"]+"|stroke\s*:\s*(?!none)[#\w]/i.test(all)) failures.push({ file: f, msg: 'marca com contorno (stroke): nunca contornada' });
  if (/scale\(\s*-|scaleX\(\s*-|matrix\(\s*-/i.test(all)) failures.push({ file: f, msg: 'marca espelhada (scale negativo)' });
  const sc = all.match(/scale\(\s*([\d.]+)[\s,]+([\d.]+)\s*\)/);
  if (sc && Math.abs(+sc[1] - +sc[2]) > 0.001) failures.push({ file: f, msg: `marca esticada (scale ${sc[1]} x ${sc[2]})` });
  if (/fill\s*=\s*"url\(|fill\s*:\s*url\(/i.test(all)) failures.push({ file: f, msg: 'marca preenchida com padrão/degradê (fill url)' });
  for (const c of [...all.matchAll(/(?:fill|color)\s*[=:]\s*"?\s*(#[0-9a-f]{3,8}|rgba?\([^)]*\)|white|black)/gi)].map((x) => x[1])) {
    const p = parseColor(c);
    if (p && !ALLOWED.some((a) => dist(a, p) < 2)) failures.push({ file: f, msg: `marca na cor ${c}: só preto #2D211E, branco ou off-white #E5E1DB` });
  }
}

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  let found = 0;
  if (/\.svg$/i.test(f)) {
    const vb = (src.match(/<svg\b[^>]*viewBox\s*=\s*"([^"]+)"/i) || [])[1];
    if (!vb) { failures.push({ file: f, msg: 'SVG sem viewBox: não dá para medir o quadro' }); continue; }
    const [, , W, H] = vb.split(/[\s,]+/).map(Number);
    const body = src.replace(/^[\s\S]*?<svg\b[^>]*>/i, '');
    for (const m of body.matchAll(/<(image|use|svg|g)\b([^>]*)>(?:([\s\S]*?)<\/\1>)?/gi)) {
      if (!MARK.test(m[2])) continue;
      let [x, y, w, h] = ['x', 'y', 'width', 'height'].map((k) => num(m[2], k));
      if (w === null || h === null) { failures.push({ file: f, msg: `<${m[1]}> de marca sem width/height: não dá para medir` }); continue; }
      const rot = (m[2].match(/rotate\(\s*(-?\d+)/) || [])[1];
      if (rot && Math.abs(+rot) % 180 === 90) [w, h] = [h, w];
      found++;
      judge(f, W, H, w, h, y === null ? null : H - (y + h), m[2], m[3] || '');
    }
  } else {
    const cv = src.match(/data-canvas\s*=\s*"(\d+)x(\d+)"/i);
    if (!cv) { failures.push({ file: f, msg: 'HTML sem data-canvas="LxA": não dá para medir o quadro' }); continue; }
    for (const m of src.matchAll(/<(img|svg)\b([^>]*)>/gi)) {
      if (!MARK.test(m[2])) continue;
      const st = (m[2].match(/style\s*=\s*"([^"]*)"/i) || [, ''])[1];
      const w = css(st, 'width'), h = css(st, 'height');
      if (w === null || h === null) { failures.push({ file: f, msg: 'marca sem width/height em px no style' }); continue; }
      found++;
      judge(f, +cv[1], +cv[2], w, h, css(st, 'bottom'), m[2], '');
    }
  }
  if (!found && !failures.some((x) => x.file === f)) failures.push({ file: f, msg: 'nenhuma marca encontrada (href more-wordmark*.svg ou class/id wordmark/logo/marca)' });
}
finish('R-LOGO-01', failures, 'marca em M ou XL, cor e forma corretas');
