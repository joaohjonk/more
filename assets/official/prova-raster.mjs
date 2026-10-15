#!/usr/bin/env node
// Prova da troca do wordmark: rasteriza um SVG no tamanho do PNG oficial (2881×735) e conta quantos
// pixels de tinta (alfa > 127) coincidem. Aceite: acima de 98%.
// Uso: PW=/caminho/playwright-core/index.mjs CHROME=/caminho/chrome node assets/official/prova-raster.mjs [svg] [png]
// Precisa de python3 + Pillow. Sem argumentos compara more-wordmark.svg com more-wordmark.png.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const svgFile = process.argv[2] || path.join(DIR, 'more-wordmark.svg');
const pngFile = process.argv[3] || path.join(DIR, 'more-wordmark.png');
const { chromium } = await import(process.env.PW || 'playwright-core');
const W = 2881, H = 735;
const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'raster-')), 'svg.png');
const b = await chromium.launch({ executablePath: process.env.CHROME, args: ['--headless=new'] });
const p = await b.newPage({ viewport: { width: W, height: H } });
const svg = fs.readFileSync(svgFile, 'utf8').replace(/<svg /, `<svg preserveAspectRatio="none" style="width:${W}px;height:${H}px;display:block" `);
await p.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
await p.screenshot({ path: out, omitBackground: true, clip: { x: 0, y: 0, width: W, height: H } });
await b.close();
const py = `
import sys
from PIL import Image
a=Image.open(sys.argv[1]).convert('RGBA').split()[3].load()
b=Image.open(sys.argv[2]).convert('RGBA').resize((${W},${H})).split()[3].load()
ink=same=0
for y in range(${H}):
  for x in range(${W}):
    ia=a[x,y]>127; ib=b[x,y]>127
    if ia or ib:
      ink+=1; same+= (ia==ib)
print(f"{same/ink*100:.2f}")`;
const pct = parseFloat(execFileSync('python3', ['-I', '-c', py, out, pngFile]).toString());
console.log(`${path.basename(svgFile)} × ${path.basename(pngFile)}: ${pct}% dos pixels de tinta coincidem`);
process.exit(pct > 98 ? 0 : 1);
