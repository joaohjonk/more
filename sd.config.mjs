// Style Dictionary v5 — build dos tokens da More.
// Rodar: npm run tokens:build
// Entrada: brand/tokens/*.tokens.json (DTCG). Saída: brand/build/{css,figma}.
// Não toca em brand/generated/tokens.css (gerado pelo cstack).
import fs from 'node:fs';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';

const TOKENS_DIR = 'brand/tokens';
const BUILD = 'brand/build/';

// ---------------------------------------------------------------------------
// Propostas: status PROPOSED (herdado do grupo) ou origin "inventada por nós".
// SD não herda $extensions de grupo, então lemos os arquivos brutos.
// ---------------------------------------------------------------------------
const proposals = new Set();
for (const f of fs.readdirSync(TOKENS_DIR).filter((n) => n.endsWith('.tokens.json'))) {
  const raw = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, f), 'utf8'));
  const walk = (node, p, inherited) => {
    const ext = node.$extensions?.cstack ?? {};
    const status = ext.status ?? inherited.status;
    const origin = ext.origin ?? inherited.origin;
    if ('$value' in node) {
      if (status === 'PROPOSED' || /inventad/i.test(origin ?? '')) proposals.add(p.join('.'));
      return;
    }
    for (const k of Object.keys(node)) {
      if (!k.startsWith('$') && node[k] && typeof node[k] === 'object') walk(node[k], [...p, k], { status, origin });
    }
  };
  walk(raw, [], {});
}
const isProposal = (token) => proposals.has(token.path.join('.'));

// ---------------------------------------------------------------------------
// Helpers de valor
// ---------------------------------------------------------------------------
const hex6 = (c) => (c.hex ?? '').slice(0, 7).toLowerCase();
const rgbFromHex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const roundN = (n, d = 4) => Math.round(n * 10 ** d) / 10 ** d;

function colorToCss(c) {
  if (typeof c === 'string') return c;
  let h = hex6(c);
  if (!h) {
    const [r, g, b] = c.components.map((x) => Math.round(x * 255));
    h = '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  }
  const a = c.alpha ?? 1;
  if (a >= 1) return h;
  const [r, g, b] = rgbFromHex(h);
  return `rgba(${r}, ${g}, ${b}, ${roundN(a, 3)})`;
}
const dimToCss = (v) => (v && typeof v === 'object' && 'value' in v ? `${v.value}${v.unit ?? ''}` : String(v));
const familyToCss = (v) =>
  typeof v === 'string' && v.includes(',') ? v : (Array.isArray(v) ? v : [v]).map((f) => (/[\s'"]/.test(f) && !/^["']/.test(f) ? `"${f}"` : f)).join(', ');

// ---------------------------------------------------------------------------
// Transforms
// ---------------------------------------------------------------------------
// O SD tenta resolver "{...}" também dentro de $description (ex.: "body { color: var(--preto) }"
// em color.text.primary). Trocamos as chaves por marcadores antes e devolvemos na saída.
const LB = '\u0001', RB = '\u0002';
const decode = (s) => s.replaceAll(LB, '{').replaceAll(RB, '}');
StyleDictionary.registerPreprocessor({
  name: 'more/escape-description-braces',
  preprocessor: (dict) => {
    const walk = (n) => {
      if (!n || typeof n !== 'object') return;
      for (const k of Object.keys(n)) {
        if (k === '$description' && typeof n[k] === 'string') n[k] = n[k].replaceAll('{', LB).replaceAll('}', RB);
        else walk(n[k]);
      }
    };
    walk(dict);
    return dict;
  },
});
StyleDictionary.registerFormat({
  name: 'more/css-variables',
  format: async (args) => decode(await StyleDictionary.hooks.formats['css/variables'](args)),
});

const tokType = (t) => t.$type ?? t.type;
const tokValue = (t) => t.$value ?? t.value;

StyleDictionary.registerTransform({
  name: 'more/color/css',
  type: 'value',
  filter: (t) => tokType(t) === 'color',
  transform: (t) => colorToCss(tokValue(t)),
});
StyleDictionary.registerTransform({
  name: 'more/dimension/css',
  type: 'value',
  filter: (t) => ['dimension', 'duration'].includes(tokType(t)),
  transform: (t) => dimToCss(tokValue(t)),
});
StyleDictionary.registerTransform({
  name: 'more/cubicBezier/css',
  type: 'value',
  filter: (t) => tokType(t) === 'cubicBezier' && Array.isArray(tokValue(t)),
  transform: (t) => `cubic-bezier(${tokValue(t).join(', ')})`,
});
StyleDictionary.registerTransform({
  name: 'more/fontFamily/css',
  type: 'value',
  filter: (t) => tokType(t) === 'fontFamily',
  transform: (t) => familyToCss(tokValue(t)),
});
// Composto de tipografia -> shorthand `font` (letterSpacing fica de fora; é 0 em todos).
StyleDictionary.registerTransform({
  name: 'more/typography/css',
  type: 'value',
  transitive: true,
  filter: (t) => tokType(t) === 'typography',
  transform: (t) => {
    const v = tokValue(t);
    if (typeof v !== 'object') return v;
    return `${v.fontWeight} ${dimToCss(v.fontSize)}/${v.lineHeight} ${familyToCss(v.fontFamily)}`;
  },
});

const cssTransforms = [
  'attribute/cti',
  'name/kebab',
  'more/color/css',
  'more/dimension/css',
  'more/cubicBezier/css',
  'more/fontFamily/css',
  'more/typography/css',
];

// ---------------------------------------------------------------------------
// Figma: DTCG por coleção (Import variables nativo do Figma)
// ---------------------------------------------------------------------------
const COLLECTIONS = {
  Cor: { roots: ['color'], strip: 1 },
  'Espaço': { roots: ['space', 'layout', 'radius', 'breakpoint'], strip: 0 },
  Tipo: { roots: ['font'], strip: 1 },
};
const figmaSkipped = [];

function figmaEntry(token, collection) {
  const type = tokType(token);
  const orig = token.original.$value ?? token.original.value;
  const strip = COLLECTIONS[collection].strip;
  const rewriteRef = (ref) => {
    const p = ref.slice(1, -1).split('.');
    return `{${p.slice(strip).join('.')}}`;
  };
  let $type;
  let $value;
  if (type === 'color') {
    $type = 'color';
    if (typeof orig === 'string' && orig.startsWith('{')) $value = rewriteRef(orig);
    else {
      const h = hex6(orig);
      const comps = h ? rgbFromHex(h).map((x) => roundN(x / 255, 6)) : orig.components;
      $value = { colorSpace: 'srgb', components: comps, alpha: orig.alpha ?? 1, hex: h.toUpperCase() };
    }
  } else if (type === 'fontFamily') {
    $type = 'string';
    $value = Array.isArray(orig) ? orig[0] : String(orig);
  } else if (type === 'dimension' || type === 'number' || type === 'fontWeight') {
    if (orig && typeof orig === 'object' && 'value' in orig) {
      if (orig.unit !== 'px') return figmaSkipped.push(`${token.path.join('.')} (${dimToCss(orig)}: unidade sem equivalente em px)`), null;
      $value = orig.value;
    } else if (typeof orig === 'number') $value = orig;
    else return figmaSkipped.push(`${token.path.join('.')} ("${orig}": texto, não é número)`), null;
    $type = 'number';
  } else {
    return null;
  }
  let desc = decode(token.$description ?? token.comment ?? '');
  if (type === 'fontFamily' && Array.isArray(orig)) desc = `${desc} Pilha CSS: ${familyToCss(orig)}.`.trim();
  if (token.path[1] === 'line-height') desc = `${desc}${desc && !/[.!?]$/.test(desc) ? '.' : ''} Multiplicador (sem unidade): no Figma use ${roundN($value * 100, 0)}%.`.trim();
  const refsProposal = typeof orig === 'string' && proposals.has(orig.replace(/[{}]/g, ''));
  if (isProposal(token) || refsProposal) desc = `[proposta] ${desc}`.trim();
  const out = { $type, $value };
  if (desc) out.$description = desc;
  return out;
}

StyleDictionary.registerFormat({
  name: 'more/figma-dtcg',
  format: ({ dictionary, options }) => {
    const { collection } = options;
    const { strip } = COLLECTIONS[collection];
    const root = {};
    for (const token of dictionary.allTokens) {
      const entry = figmaEntry(token, collection);
      if (!entry) continue;
      const p = token.path.slice(strip);
      let node = root;
      for (const k of p.slice(0, -1)) node = node[k] ??= {};
      node[p.at(-1)] = entry;
    }
    return JSON.stringify(root, null, 2) + '\n';
  },
});

const figmaFiles = Object.entries(COLLECTIONS).map(([collection, { roots }]) => ({
  destination: `${collection}.tokens.json`,
  format: 'more/figma-dtcg',
  options: { collection },
  filter: (t) =>
    roots.includes(t.path[0]) &&
    tokType(t) !== 'typography',
}));

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
const sd = new StyleDictionary({
  source: [`${TOKENS_DIR}/*.tokens.json`],
  usesDtcg: true,
  preprocessors: ['more/escape-description-braces'],
  log: { verbosity: 'default', warnings: 'warn' },
  platforms: {
    css: {
      transforms: cssTransforms,
      buildPath: `${BUILD}css/`,
      files: [
        {
          destination: 'more-tokens.css',
          format: 'more/css-variables',
          options: { selector: ':root', outputReferences: false },
        },
      ],
    },
    figma: {
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: `${BUILD}figma/`,
      files: figmaFiles,
    },
  },
});

await sd.buildAllPlatforms();
if (figmaSkipped.length) {
  console.log('\nFigma: tokens fora da exportação (sem tipo equivalente):');
  for (const s of [...new Set(figmaSkipped)]) console.log('  - ' + s);
}
console.log(`\nPropostas marcadas com [proposta]: ${[...proposals].join(', ')}`);
