#!/usr/bin/env node
// R-IMG-01: foto de peça é fotografia. O arquivo falha se tiver QUALQUER marca de geração/edição por IA:
//   - IPTC DigitalSourceType trainedAlgorithmicMedia / compositeWithTrainedAlgorithmicMedia / algorithmicMedia
//   - manifesto C2PA ou XMP/EXIF que cite um gerador (lista GENERATORS). C2PA só de transporte (c2pa.opened) não falha.
//   - sidecar cstack <arquivo>.lineage.json com operation de geração/edição (generate, edit, inpaint, outpaint, upscale, image-to-*)
// Ausência de marca não prova que é foto: quem exporta tem que preservar metadados (não "salvar para web" sem XMP).
// Uso: node checks/no-ai.mjs <imagem ...>
import fs from 'node:fs';
import { argsOrUsage, finish } from './lib.mjs';

const GENERATORS = ['trainedAlgorithmicMedia', 'compositeWithTrainedAlgorithmicMedia', 'algorithmicMedia', 'Midjourney', 'DALL-E', 'DALL·E', 'OpenAI', 'gpt-image', 'Firefly', 'Stable Diffusion', 'StableDiffusion', 'SDXL', 'Imagen', 'Gemini', 'nano-banana', 'Flux', 'black-forest-labs', 'Ideogram', 'Leonardo.Ai', 'Runway', 'Sora', 'Recraft', 'Krea', 'Magnific', 'Generative Fill'];
const files = argsOrUsage('node checks/no-ai.mjs <imagem ...>');
const failures = [];
for (const f of files) {
  // metadados ficam no começo do arquivo (EXIF/XMP/C2PA); lê os primeiros 512 KB + últimos 64 KB
  const buf = fs.readFileSync(f);
  const head = buf.subarray(0, 512 * 1024).toString('latin1') + buf.subarray(Math.max(0, buf.length - 65536)).toString('latin1');
  for (const g of GENERATORS) if (new RegExp(g.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\-/g, '[- ]?'), 'i').test(head)) failures.push({ file: f, msg: `metadado cita "${g}": peça não pode ser gerada nem alterada por IA` });
  const side = `${f}.lineage.json`;
  if (fs.existsSync(side)) {
    const rec = JSON.parse(fs.readFileSync(side, 'utf8'));
    if (/generat|edit|inpaint|outpaint|upscale|image-to|composite/i.test(`${rec.operation ?? ''} ${rec.kind ?? ''}`))
      failures.push({ file: f, msg: `linhagem cstack registra operation "${rec.operation}": foto de peça não passa por modelo` });
  }
}
finish('R-IMG-01', failures, 'nenhuma marca de geração ou edição por IA');
