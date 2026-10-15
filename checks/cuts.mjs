#!/usr/bin/env node
// R-MOTION-02 (parte medível: Hard cut): vídeo troca de foto por corte seco, sem fusão (dissolve) nem fade.
// Fusão detectada = janela de 6, 12 ou 24 quadros em que
//   - início e fim diferem >= 20 (média |dif| em cinza 0-255, quadro reduzido a 64x36)
//   - nenhum salto isolado dentro da janela passa de 60% dessa diferença (não é corte)
//   - o quadro do meio é a média dos extremos: |meio - (início+fim)/2| <= 25% da diferença
// Movimento de sombra (Shadow sweep) não é média dos extremos e passa. A sombra em si: ver brand/examples/R-MOTION-02-*.
// Precisa de ffmpeg.
// Uso: node checks/cuts.mjs <video.mp4|.mov ...>
import { execFileSync } from 'node:child_process';
import { argsOrUsage, finish } from './lib.mjs';

const files = argsOrUsage('node checks/cuts.mjs <video ...>');
const W = 64, H = 36, N = W * H;
const failures = [];
for (const f of files) {
  const fps = (() => { try { const r = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', f], { encoding: 'utf8' }).trim().split('/'); return +r[0] / (+r[1] || 1); } catch { return 30; } })();
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', f, '-vf', `scale=${W}:${H},format=gray`, '-f', 'rawvideo', '-'], { maxBuffer: 1 << 30 });
  const frames = [];
  for (let i = 0; i + N <= raw.length; i += N) frames.push(raw.subarray(i, i + N));
  const diff = (a, b) => { let s = 0; for (let k = 0; k < N; k++) s += Math.abs(a[k] - b[k]); return s / N; };
  const step = frames.slice(1).map((fr, i) => diff(frames[i], fr));
  const hits = [];
  for (const L of [6, 12, 24]) for (let s = 0; s + L < frames.length; s += Math.max(1, L >> 2)) {
    const e = s + L, D = diff(frames[s], frames[e]);
    if (D < 20) continue;
    if (Math.max(...step.slice(s, e)) > 0.6 * D) continue;
    const mid = frames[s + (L >> 1)];
    let lin = 0; for (let k = 0; k < N; k++) lin += Math.abs(mid[k] - (frames[s][k] + frames[e][k]) / 2); lin /= N;
    if (lin <= 0.25 * D) hits.push(s / fps);
  }
  const uniq = [];
  for (const t of hits.sort((a, b) => a - b)) if (!uniq.length || t - uniq.at(-1) > 0.5) uniq.push(t);
  if (uniq.length) failures.push({ file: f, msg: `fusão/fade em ${uniq.map((t) => t.toFixed(1) + 's').join(', ')}: troca de foto é corte seco` });
}
finish('R-MOTION-02', failures, 'só cortes secos');
