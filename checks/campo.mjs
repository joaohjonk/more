#!/usr/bin/env node
// R-COLOR-04 (parte de imagem): cartaz, convite, livro, vitrine ou post com fundo campo.
//   - cada pixel conta para o tom campo mais próximo se estiver a até ΔE 10 (CIELAB, distância euclidiana) dele
//   - um tom campo "aparece" quando >= 5% dos pixels contam para ele
//   - no máximo UM tom campo por quadro
//   - petróleo é só proposta: não pode ser fundo (>= 20%)
//   - peça gráfica (nome MORE_PRINT_/CONVITE_/LIVRO_/VITRINE_ ou --grafica): o tom que ocupa >= 20% é fundo chapado:
//     dos pixels a até ΔE 25 do tom, >= 85% estão a até ΔE 10 (degradê e textura espalham o tom e falham).
//     Foto de fundo colorido (post social) não tem esse teste.
// A parte de CSS (campo nunca na interface da loja) é checada por checks/accent.mjs.
// Uso: node checks/campo.mjs <imagem ...>
import { argsOrUsage, finish, colorTokens, hex6, py } from './lib.mjs';

const files = argsOrUsage('node checks/campo.mjs <imagem ...> [--grafica]');
const grafica = (f) => process.argv.includes('--grafica') || /MORE_(PRINT|CONVITE|LIVRO|VITRINE)_/.test(f);
const seen = new Map();
for (const [n, c] of Object.entries(colorTokens())) if (n.startsWith('campo-') && !seen.has(hex6(c))) seen.set(hex6(c), n.slice(6));
const tones = [...seen].map(([hex, name]) => ({ hex, name }));
const FLAT_MIN = 0.85;
const failures = [];
const CODE = `import sys,json
from PIL import Image, ImageCms
tr=ImageCms.buildTransform(ImageCms.createProfile('sRGB'),ImageCms.createProfile('LAB'),'RGB','LAB')
def lab(im): return [(l*100/255,a-128,b-128) for l,a,b in (lambda x: x.get_flattened_data() if hasattr(x,'get_flattened_data') else x.getdata())(ImageCms.applyTransform(im,tr))]
im=Image.open(sys.argv[1]).convert('RGB'); im.thumbnail((160,160)); px=lab(im)
tones=json.loads(sys.argv[2])
cs=[lab(Image.new('RGB',(1,1),tuple(int(t['hex'][i:i+2],16) for i in (1,3,5))))[0] for t in tones]
near=[0]*len(tones); wide=[0]*len(tones)
for p in px:
    d=[sum((p[k]-c[k])**2 for k in range(3))**.5 for c in cs]
    j=min(range(len(cs)),key=lambda i:d[i])
    if d[j]<=10: near[j]+=1
    if d[j]<=25: wide[j]+=1
out={t['name']:[near[i]/len(px), near[i]/wide[i] if wide[i] else 1] for i,t in enumerate(tones)}
print(json.dumps(out))`;
for (const f of files) {
  const stats = JSON.parse(py(CODE, f, JSON.stringify(tones)));
  const present = Object.entries(stats).filter(([, [fr]]) => fr >= 0.05);
  if (present.length > 1) failures.push({ file: f, msg: `${present.length} tons campo no mesmo quadro (${present.map(([n, [fr]]) => `${n} ${Math.round(fr * 100)}%`).join(', ')}): um por peça` });
  for (const [n, [fr, flat]] of present) {
    if (n === 'petroleo' && fr >= 0.2) failures.push({ file: f, msg: `fundo petróleo (${Math.round(fr * 100)}%): tom só proposto, não aprovado` });
    if (grafica(f) && fr >= 0.2 && flat < FLAT_MIN) failures.push({ file: f, msg: `fundo ${n} (${Math.round(fr * 100)}%) não é chapado: só ${Math.round(flat * 100)}% do tom está a até ΔE 10 (mín. 85%): degradê ou textura` });
  }
}
finish('R-COLOR-04', failures, 'no máximo um tom campo, chapado');
