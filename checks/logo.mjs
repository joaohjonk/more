#!/usr/bin/env node
// R-LOGO-01: tamanho, cor e forma da marca num layout (SVG com viewBox, ou HTML com data-canvas="LxA" em px).
// A marca é <image>/<use>/<img>/<svg>/<g> com href more-wordmark*.svg ou class/id com wordmark/logo/marca.
//   SVG: x, y, width, height do elemento. HTML: style width/height e left/top/bottom em px.
//   rotate de 90/270 troca largura e altura.
//   - M: lado maior da marca / lado menor do quadro; alvo 1/6 (16,7%), tolerância 16-25%
//   - XL: largura da marca / largura do quadro 95-100%, base da marca 0-5% acima da base do quadro, sem sangrar
//     (marca inteira dentro do quadro)
//   - outro tamanho falha
//   - cor só preto #2D211E, branco #FFFFFF ou off-white #E5E1DB (fill/color). Sobre campo: amarelo-igarata => preto;
//     vermelho-jambo, verde-jamaica, berinjela => branco. Fundo = <rect> do tamanho do quadro (SVG) ou background do
//     elemento data-canvas (HTML)
//   - stroke (contorno), scale negativo (espelho), escala não uniforme e fill="url(...)" (padrão) falham
// Quando leva marca (tipo lido do nome MORE_<CANAL>_<slug>_<variante>_...; MORE_FONTE_ usa a variante):
//   obrigatória: post de evento (IG com slug evento-* ou variante evento/abertura) e cartaz, convite, vitrine, livro
//   proibida: post de peça no feed (IG com slug de peça; também sem texto sobre a foto, 76% do feed) e story (IGS /
//             variante ig-story, story)
//   opcional: etiqueta (ETIQUETA / variante etiqueta) e qualquer outro tipo
// XL pode passar por cima da margem do grid de impressão (1/24 do lado menor); só não sangra para fora do quadro.
// Uso: node checks/logo.mjs <layout.svg|layout.html ...>
import fs from 'node:fs';
import path from 'node:path';
import { argsOrUsage, finish, parseColor, dist, colorTokens, cssOf, varMap, resolveVars, colorsIn, htmlText } from './lib.mjs';

const files = argsOrUsage('node checks/logo.mjs <layout.svg|.html ...>');
const ALLOWED = ['#2d211e', '#ffffff', '#e5e1db'].map(parseColor);
const PRETO = ALLOWED[0], BRANCO = ALLOWED[1];
const toks = colorTokens();
const CAMPO = { 'amarelo-igarata': PRETO, 'vermelho-jambo': BRANCO, 'verde-jamaica': BRANCO, berinjela: BRANCO };
const MARK = /more-wordmark|\b(wordmark|logo|marca)\b/i;
const failures = [];
const num = (s, k) => { const m = s.match(new RegExp(`(?:^|\\s)${k}\\s*=\\s*"(-?[\\d.]+)`)); return m ? parseFloat(m[1]) : null; };
const css = (s, k) => { const m = s.match(new RegExp(`(?:^|;|\\s)${k}\\s*:\\s*(-?[\\d.]+)px`)); return m ? parseFloat(m[1]) : null; };
function kind(f) {
  const b = path.basename(f).replace(/\.[^.]+$/, '');
  const m = b.match(/^(?:\d+[-_])?MORE_([A-Z]+)_([a-z0-9-]+)_([a-z0-9-]+)_/);
  let canal, slug, variante;
  if (m) [, canal, slug, variante] = m; else { canal = ''; slug = ''; variante = b.toLowerCase(); }
  const v = variante.toLowerCase();
  if (canal === 'FONTE' || !m) {
    if (/ig-story|story/.test(v)) canal = 'IGS';
    else if (/ig-feed|feed/.test(v)) canal = 'IG';
    else if (/etiqueta/.test(v)) canal = 'ETIQUETA';
    else if (/cartaz|convite|vitrine|livro/.test(v)) canal = 'CARTAZ';
  }
  if (['CARTAZ', 'CONVITE', 'VITRINE', 'LIVRO'].includes(canal) || /cartaz|convite|vitrine|livro/.test(v)) return 'obrigatoria';
  const evento = /^evento-/.test(slug) || /evento|abertura/.test(v);
  if (canal === 'IGS') return 'proibida';
  if (canal === 'IG') return evento ? 'obrigatoria' : slug === 'marca' || /bastidor|marca|sobre/.test(v) ? 'opcional' : 'proibida-feed';
  return 'opcional';
}
const igProductPost = (f) => kind(f) === 'proibida-feed';

function campoOf(color) {
  if (!color) return null;
  const c = parseColor(color);
  if (!c) return null;
  const hit = Object.keys(CAMPO).find((n) => toks[`campo-${n}`] && dist(toks[`campo-${n}`], c) < 3);
  return hit || null;
}

function judge(f, W, H, box, attrs, inner, bg) {
  const { x, w, h, bottomGap } = box;
  const short = Math.min(W, H), long = Math.max(w, h);
  const m = long / short, xl = w / W;
  const isM = m >= 0.16 && m <= 0.25;
  const isXL = xl >= 0.95 && xl <= 1.0001 && bottomGap !== null && bottomGap >= -0.5 && bottomGap / H <= 0.05;
  if (!isM && !isXL) failures.push({ file: f, msg: `marca com ${Math.round(long)}px = ${(m * 100).toFixed(1)}% do lado menor e ${(xl * 100).toFixed(1)}% da largura${bottomGap !== null ? `, base ${(bottomGap / H * 100).toFixed(1)}% acima do pé` : ''}: só M (alvo 16,7%, 16-25% do lado menor) ou XL (95-100% da largura, base 0-5% acima do pé)` });
  if (xl >= 0.95 && x !== null && (x < -0.5 || x + w > W + 0.5)) failures.push({ file: f, msg: 'marca XL sangra para fora do quadro: fica inteira dentro' });
  const all = attrs + ' ' + inner;
  if (/stroke\s*=\s*"(?!none)[^"]+"|stroke\s*:\s*(?!none)[#\w]/i.test(all)) failures.push({ file: f, msg: 'marca com contorno (stroke): nunca contornada' });
  if (/scale\(\s*-|scaleX\(\s*-|matrix\(\s*-/i.test(all)) failures.push({ file: f, msg: 'marca espelhada (scale negativo)' });
  const sc = all.match(/scale\(\s*([\d.]+)[\s,]+([\d.]+)\s*\)/);
  if (sc && Math.abs(+sc[1] - +sc[2]) > 0.001) failures.push({ file: f, msg: `marca esticada (scale ${sc[1]} x ${sc[2]})` });
  if (/fill\s*=\s*"url\(|fill\s*:\s*url\(/i.test(all)) failures.push({ file: f, msg: 'marca preenchida com padrão/degradê (fill url)' });
  const cols = [...all.matchAll(/(?:fill|color)\s*[=:]\s*"?\s*(#[0-9a-f]{3,8}|rgba?\([^)]*\)|white|black)/gi)].map((x) => parseColor(x[1])).filter(Boolean).filter((c) => c.a > 0);
  for (const p of cols) if (!ALLOWED.some((a) => dist(a, p) < 2)) failures.push({ file: f, msg: `marca na cor rgb(${p.r},${p.g},${p.b}): só preto #2D211E, branco #FFF ou off-white #E5E1DB` });
  const camp = campoOf(bg);
  if (camp && cols.length && !cols.every((p) => dist(p, CAMPO[camp]) < 2)) failures.push({ file: f, msg: `marca sobre ${camp}: use ${CAMPO[camp] === PRETO ? 'preto #2D211E' : 'branco #FFF'}` });
}

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  let found = 0;
  const ig = igProductPost(f);
  if (/\.svg$/i.test(f)) {
    const vb = (src.match(/<svg\b[^>]*viewBox\s*=\s*"([^"]+)"/i) || [])[1];
    if (!vb) { failures.push({ file: f, msg: 'SVG sem viewBox: não dá para medir o quadro' }); continue; }
    const [, , W, H] = vb.split(/[\s,]+/).map(Number);
    const body = src.replace(/^[\s\S]*?<svg\b[^>]*>/i, '');
    const bgRect = [...body.matchAll(/<rect\b([^>]*)>/gi)].find((m) => num(m[1], 'width') === W && num(m[1], 'height') === H);
    const bg = bgRect ? (bgRect[1].match(/fill\s*=\s*"([^"]+)"/) || [])[1] : null;
    for (const m of body.matchAll(/<(image|use|svg|g)\b([^>]*)>(?:([\s\S]*?)<\/\1>)?/gi)) {
      if (!MARK.test(m[2])) continue;
      let [x, y, w, h] = ['x', 'y', 'width', 'height'].map((k) => num(m[2], k));
      if (w === null || h === null) { failures.push({ file: f, msg: `<${m[1]}> de marca sem width/height: não dá para medir` }); continue; }
      const rot = (m[2].match(/rotate\(\s*(-?\d+)/) || [])[1];
      if (rot && Math.abs(+rot) % 180 === 90) [w, h] = [h, w];
      found++;
      if (ig) { failures.push({ file: f, msg: 'post de peça no feed não leva marca' }); continue; }
      if (kind(f) === 'proibida') { failures.push({ file: f, msg: 'story não leva marca' }); continue; }
      judge(f, W, H, { x, w, h, bottomGap: y === null ? null : H - (y + h) }, m[2], m[3] || '', bg);
    }
    if (ig && /<text\b/i.test(body)) failures.push({ file: f, msg: 'post de peça no feed não leva texto sobre a foto' });
  } else {
    const body = src.replace(/^[\s\S]*?<body[^>]*>/i, '');
    if (kind(f) === 'proibida') { if (/<(svg|img)\b[^>]*(more-wordmark|\b(wordmark|logo|marca)\b)/i.test(body)) failures.push({ file: f, msg: 'story não leva marca' }); continue; }
    if (ig) {
      if (MARK.test(body.replace(/<img\b[^>]*class="photo"[^>]*>/gi, ''))) failures.push({ file: f, msg: 'post de peça no feed não leva marca' });
      if (htmlText(body).trim()) failures.push({ file: f, msg: `post de peça no feed não leva texto sobre a foto ("${htmlText(body).trim().slice(0, 40)}"): o texto vai na legenda` });
      continue;
    }
    const cv = src.match(/<(\w+)([^>]*)data-canvas\s*=\s*"(\d+)x(\d+)"([^>]*)>/i);
    if (!cv) { if (kind(f) === 'obrigatoria' || MARK.test(body)) failures.push({ file: f, msg: 'HTML sem data-canvas="LxA": não dá para medir o quadro' }); continue; }
    const W = +cv[3], H = +cv[4];
    const cattrs = cv[2] + cv[5];
    const cls = ((cattrs.match(/class\s*=\s*"([^"]*)"/i) || [, ''])[1].split(/\s+/)[0]);
    const vars = varMap([f]);
    let bg = (cattrs.match(/background(?:-color)?\s*:\s*([^;"]+)/i) || [])[1] || null;
    if (!bg && cls) for (const r of cssOf(f)) if (!/print/.test(r.media) && r.selector.split(',').some((s) => s.trim() === '.' + cls)) for (const d of r.decls) if (/^background(-color)?$/.test(d.prop)) bg = d.value;
    if (bg) bg = (colorsIn(resolveVars(bg, vars))[0] || {}).raw || null;
    for (const m of src.matchAll(/<(img|svg)\b([^>]*)>/gi)) {
      if (!MARK.test(m[2])) continue;
      const st = (m[2].match(/style\s*=\s*"([^"]*)"/i) || [, ''])[1];
      let w = css(st, 'width'), h = css(st, 'height');
      if (w === null || h === null) { failures.push({ file: f, msg: 'marca sem width/height em px no style' }); continue; }
      const rot = /rotate\(\s*-?(90|270)deg/.test(st);
      const top = css(st, 'top'), bottom = css(st, 'bottom'), left = css(st, 'left');
      const bottomGap = rot ? null : bottom !== null ? bottom : top !== null ? H - (top + h) : null;
      if (rot) [w, h] = [h, w];
      found++;
      judge(f, W, H, { x: rot ? null : left, w, h, bottomGap }, m[2], '', bg);
    }
  }
  if (!found && kind(f) === 'obrigatoria' && !failures.some((x) => x.file === f)) failures.push({ file: f, msg: 'cartaz/convite/vitrine/livro ou post de evento sem marca: leva M ou XL' });
}
finish('R-LOGO-01', failures, 'marca onde é obrigatória, em M ou XL, cor e forma corretas; post de peça e story sem marca');
