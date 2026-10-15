// Utilitários compartilhados pelos checks da More. Sem dependências: Node 18+ (e python3 + Pillow para pixels).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const CHECKS_DIR = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(CHECKS_DIR, '..');

export const ext = (f) => path.extname(f).toLowerCase().slice(1);
export const IMG_EXT = ['jpg', 'jpeg', 'png', 'webp', 'tif', 'tiff'];
export const TEXT_EXT = ['txt', 'md', 'csv'];

// ---------- saída ----------
// Cada script chama finish(ruleId, falhas, okMsg). Falhas = [{file, msg}]. Sai com 1 se houver falha.
export function finish(ruleId, failures, okMsg = 'tudo dentro da regra') {
  if (!failures.length) {
    console.log(`${ruleId} OK: ${okMsg}`);
    process.exit(0);
  }
  const lines = new Map();
  for (const f of failures) { const l = `${f.file ? path.basename(f.file) + ': ' : ''}${f.msg}`; lines.set(l, (lines.get(l) || 0) + 1); }
  console.log(`${ruleId} FALHA (${failures.length}):`);
  for (const [l, n] of lines) console.log(`  - ${l}${n > 1 ? ` (${n}x)` : ''}`);
  process.exit(1);
}

export function argsOrUsage(usage) {
  const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  if (!args.length) {
    console.error(`uso: ${usage}`);
    process.exit(2);
  }
  for (const a of args) if (!fs.existsSync(a)) { console.error(`arquivo não encontrado: ${a}`); process.exit(2); }
  return args;
}
export const flag = (name) => {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=').slice(1).join('=') : null;
};

// ---------- CSS ----------
function stripComments(css) { return css.replace(/\/\*[\s\S]*?\*\//g, ''); }

// Parser mínimo: devolve [{selector, media, decls:[{prop, value}]}] (achata @media/@supports).
export function parseCSS(css, media = '') {
  css = stripComments(css);
  const out = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf('{', i);
    if (open < 0) break;
    const head = css.slice(i, open).trim();
    // acha a chave que fecha
    let depth = 1, j = open + 1;
    while (j < css.length && depth) { if (css[j] === '{') depth++; else if (css[j] === '}') depth--; j++; }
    const body = css.slice(open + 1, j - 1);
    // cabeçalho pode ter declarações soltas antes (ex.: '@import x;') - pega só o último pedaço
    const sel = head.split(';').pop().trim();
    if (/^@(media|supports|layer|container|document)/i.test(sel)) {
      out.push(...parseCSS(body, (media ? media + ' and ' : '') + sel));
    } else if (/^@(keyframes|-webkit-keyframes|font-face|page)/i.test(sel)) {
      out.push({ selector: sel, media, decls: parseDecls(body.includes('{') ? '' : body), atRule: true });
    } else if (body.includes('{')) {
      // CSS aninhado: trata como bloco
      out.push(...parseCSS(body, media).map((r) => ({ ...r, selector: sel + ' ' + r.selector })));
    } else {
      out.push({ selector: sel, media, decls: parseDecls(body) });
    }
    i = j;
  }
  return out;
}

export function parseDecls(body) {
  const decls = [];
  // separa por ';' fora de parênteses
  let depth = 0, cur = '';
  for (const ch of body) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { push(cur); cur = ''; } else cur += ch;
  }
  push(cur);
  function push(s) {
    const k = s.indexOf(':');
    if (k < 0) return;
    const prop = s.slice(0, k).trim().toLowerCase();
    const value = s.slice(k + 1).trim().replace(/\s*!important\s*$/i, '');
    if (prop) decls.push({ prop, value });
  }
  return decls;
}

// CSS de um arquivo: .css direto; .html/.svg -> blocos <style> + atributos style="" (seletor = tag.classe)
export function cssOf(file) {
  const txt = fs.readFileSync(file, 'utf8');
  if (ext(file) === 'css') return parseCSS(txt);
  const rules = [];
  for (const m of txt.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) rules.push(...parseCSS(m[1]));
  for (const m of txt.matchAll(/<([a-z][\w-]*)([^>]*?)\sstyle\s*=\s*"([^"]*)"/gi)) {
    const cls = (m[2].match(/class\s*=\s*"([^"]*)"/i) || [])[1];
    const sel = m[1].toLowerCase() + (cls ? '.' + cls.trim().split(/\s+/).join('.') : '') + '[style]';
    rules.push({ selector: sel, media: '', decls: parseDecls(m[3]), inline: true });
  }
  return rules;
}

// ---------- variáveis ----------
// Mapa --nome -> valor: tokens gerados + :root de todos os arquivos passados.
export function varMap(files = []) {
  const map = {};
  const tokFile = path.join(REPO, 'brand/generated/tokens.css');
  const sources = fs.existsSync(tokFile) ? [parseCSS(fs.readFileSync(tokFile, 'utf8'))] : [];
  for (const f of files) if (['css', 'html', 'svg'].includes(ext(f))) sources.push(cssOf(f));
  for (const rules of sources)
    for (const r of rules) for (const d of r.decls) if (d.prop.startsWith('--')) map[d.prop] = d.value;
  return map;
}

export function resolveVars(value, map, depth = 0) {
  if (depth > 10 || !value.includes('var(')) return value;
  const out = value.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*((?:[^()]|\([^()]*\))*))?\)/g, (all, name, fb) =>
    map[name] !== undefined ? map[name] : fb !== undefined ? fb : all);
  return out === value ? value : resolveVars(out, map, depth + 1);
}

// ---------- cor ----------
const NAMED = { white: '#ffffff', black: '#000000', transparent: '#00000000', red: '#ff0000', blue: '#0000ff', green: '#008000' };
export const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|(?<![-\w])(?:white|black|red|blue|green)(?![-\w])/g;

export function parseColor(s) {
  s = s.trim().toLowerCase();
  if (NAMED[s]) s = NAMED[s];
  let m;
  if ((m = s.match(/^#([0-9a-f]{3,8})$/))) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    const n = (k) => parseInt(h.slice(k, k + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? +(n(6) / 255).toFixed(3) : 1 };
  }
  if ((m = s.match(/^rgba?\(([^)]*)\)$/))) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean);
    const v = (x, max) => (x.endsWith('%') ? (parseFloat(x) / 100) * max : parseFloat(x));
    return { r: v(p[0], 255), g: v(p[1], 255), b: v(p[2], 255), a: p[3] !== undefined ? v(p[3], 1) : 1 };
  }
  if ((m = s.match(/^hsla?\(([^)]*)\)$/))) {
    const p = m[1].split(/[\s,/]+/).filter(Boolean);
    const h = parseFloat(p[0]) / 360, sa = parseFloat(p[1]) / 100, l = parseFloat(p[2]) / 100;
    const f = (n) => { const k = (n + h * 12) % 12; return 255 * (l - sa * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1))); };
    return { r: f(0), g: f(8), b: f(4), a: p[3] !== undefined ? parseFloat(p[3]) : 1 };
  }
  return null;
}
export const hex6 = (c) => '#' + [c.r, c.g, c.b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
export const colorKey = (c) => hex6(c) + (c.a < 1 ? '@' + Math.round(c.a * 100) : '');
export function hsl(c) {
  const r = c.r / 255, g = c.g / 255, b = c.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  const s = max === min ? 0 : l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
  return { s, l };
}
export function luminance(c) {
  const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
export const contrast = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
export const dist = (a, b) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);

// cores de um valor CSS já resolvido
export function colorsIn(value) { return (value.match(COLOR_RE) || []).map((s) => ({ raw: s, c: parseColor(s) })).filter((x) => x.c); }

// Tokens de cor: {nome: cor}
export function colorTokens() {
  const out = {};
  const f = path.join(REPO, 'brand/generated/tokens.css');
  for (const r of parseCSS(fs.readFileSync(f, 'utf8')))
    for (const d of r.decls) if (d.prop.startsWith('--color-')) { const c = parseColor(d.value); if (c) out[d.prop.slice(8)] = c; }
  return out;
}

// ---------- HTML ----------
export function htmlText(html) {
  return html.replace(/<(script|style|svg|noscript|template)[\s\S]*?<\/\1>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|h\d|li|section|article|header|footer|span|a|button)>/gi, '$&\n')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"')
    .split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
}
export function textOf(file) {
  const t = fs.readFileSync(file, 'utf8');
  return ['html', 'htm', 'svg'].includes(ext(file)) ? htmlText(t) : t;
}

// ---------- imagem (via python3 + Pillow) ----------
export function py(code, ...args) {
  return execFileSync('python3', ['-I', '-c', code, ...args], { encoding: 'utf8', maxBuffer: 64 << 20 });
}
export function imageInfo(file) {
  const out = py(`import sys,json
from PIL import Image
im=Image.open(sys.argv[1]); info=im.info
dpi=info.get('dpi') or (info.get('jfif_density') if info.get('jfif_unit')==1 else None)
print(json.dumps({'w':im.size[0],'h':im.size[1],'mode':im.mode,'dpi':[float(x) for x in dpi] if dpi else None}))`, file);
  return JSON.parse(out);
}
