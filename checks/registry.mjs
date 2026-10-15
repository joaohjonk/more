// Registro: regra -> script -> que arquivos ele lê -> fixtures de autoteste. Usado por run-all.mjs e self-test.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { ext, IMG_EXT, isLayout } from './lib.mjs';

const is = (...exts) => (f) => exts.includes(ext(f));
const VIDEO = ['mp4', 'mov', 'webm', 'm4v'];
const layoutHtml = (f) => ext(f) === 'html' && /data-canvas\s*=/.test(fs.readFileSync(f, 'utf8'));
const caption = (f) => ext(f) === 'txt' && /legenda|caption/i.test(path.basename(f));
const deliverable = (f) => ([...IMG_EXT, 'pdf', ...VIDEO, 'svg'].includes(ext(f)) || (ext(f) === 'html' && isLayout(f))) && !/^(logo|ok|falha|layout)/.test(path.basename(f));
const igFeed = (f) => ext(f) === 'html' && /(^|[-_])ig[-_]feed|_IG_/i.test(path.basename(f));
const L_OK = 'MORE_FONTE_mesa-de-centro-cildo_cartaz_20261105_v01.html', L_NO = 'MORE_FONTE_mesa-de-centro-cildo_cartaz-falha_20261105_v01.html';

export const CHECKS = [
  { rule: 'R-COLOR-01', script: 'color-tokens.mjs', accepts: is('css', 'html', 'svg'), ok: ['ok.css', 'ok.html'], falha: ['falha.css'] },
  { rule: 'R-COLOR-02', script: 'ground-ink.mjs', accepts: is('css', 'html'), ok: ['ok.css'], falha: ['falha.css'], cases: [{ ok: [L_OK], falha: [L_NO] }] },
  { rule: 'R-COLOR-03', script: 'accent.mjs', accepts: is('css', 'html'), ok: ['ok.css', 'ok.html', L_OK], falha: ['falha.css'], cases: [{ ok: [L_OK], falha: [L_NO] }] },
  { rule: 'R-SHAPE-01', script: 'radius.mjs', accepts: is('css', 'html'), ok: ['ok.css'], falha: ['falha.css'] },
  { rule: 'R-TYPE-01', script: 'type.mjs', accepts: is('css', 'html'), ok: ['ok.css'], falha: ['falha.css'] },
  { rule: 'R-TYPE-02', script: 'actions.mjs', accepts: is('html'), ok: ['ok.html', L_OK], falha: ['falha.html'], cases: [{ ok: [L_OK], falha: [L_NO] }] },
  { rule: 'R-LAYOUT-01', script: 'bars.mjs', accepts: is('css', 'html'), ok: ['ok.css'], falha: ['falha.css'] },
  { rule: 'R-LAYOUT-02', script: 'aspect.mjs', accepts: (f) => is('css', 'html', ...IMG_EXT)(f), ok: ['ok.css', 'MORE_IG_cadeira-maria_4x5_20261105_v01.jpg'], falha: ['falha.css', 'foto final.jpg'], examples: true, cases: [{ ok: ['web-captura-pagina-390.png'], falha: ['foto final.jpg'] }] },
  { rule: 'R-IMG-01', script: 'no-ai.mjs', accepts: is(...IMG_EXT), ok: ['MORE_IG_cadeira-maria_4x5_20261105_v01.jpg'], falha: ['gerada-falha.jpg'] },
  { rule: 'R-IMG-02', examples: true },
  { rule: 'R-GEN-01', script: 'wordmark.mjs', accepts: is('svg', 'html'), ok: ['logo-ok.svg', 'ok.html'], falha: ['logo-falha.svg', 'falha.html'] },
  { rule: 'R-COPY-01', script: 'copy.mjs', accepts: is('txt', 'md', 'html'), ok: ['texto-ok.txt', 'ok.html'], falha: ['texto-falha.txt', 'falha.html'] },
  { rule: 'R-COMMERCE-01', script: 'commerce.mjs', accepts: is('html'), ok: ['ok.html'], falha: ['falha.html'] },
  { rule: 'R-COMMERCE-02', script: 'grid-price.mjs', accepts: is('html'), ok: ['ok.html'], falha: ['falha.html'] },
  { rule: 'R-MOTION-01', script: 'motion.mjs', accepts: is('css', 'html'), ok: ['ok.css'], falha: ['falha.css'] },
  { rule: 'R-COPY-02', script: 'caption.mjs', accepts: caption, ok: ['legenda-ok.txt', 'legenda-evento-ok.txt'], falha: ['legenda-falha.txt'], cases: [{ ok: ['legenda-evento-ok.txt'], falha: ['legenda-evento-falha.txt'] }] },
  { rule: 'R-COPY-03', script: 'lang.mjs', accepts: is('html', 'txt', 'md'), ok: ['ok.html', 'texto-ok.txt'], falha: ['falha.html'] },
  { rule: 'R-COLOR-04', script: 'campo.mjs', accepts: is(...IMG_EXT), ok: ['MORE_PRINT_tomada-tom-01_cartaz_20261105_v01.jpg'], falha: ['MORE_PRINT_tomada-tom-01_degrade-falha_20261105_v01.jpg'] },
  { rule: 'R-LOGO-01', script: 'logo.mjs', accepts: (f) => is('svg')(f) || layoutHtml(f) || igFeed(f), ok: ['logo-ok.svg', L_OK], falha: ['logo-falha.svg'], cases: [{ ok: [L_OK], falha: [L_NO] }] },
  { rule: 'R-SHAPE-02', rejected: true },
  { rule: 'R-LAYOUT-03', script: 'scroll-safe.mjs', accepts: is('css', 'html'), ok: ['ok.css'], falha: ['falha.css'] },
  { rule: 'R-NAME-01', script: 'names.mjs', accepts: is('txt', 'md', 'html', 'csv'), ok: ['texto-ok.txt', 'ok.html'], falha: ['texto-falha.txt', 'falha.html'] },
  { rule: 'R-FILE-01', script: 'filename.mjs', accepts: deliverable, ok: ['MORE_IG_cadeira-maria_4x5_20261105_v01.jpg', 'MORE_PRINT_marca_convite_20261105_v01.pdf'], falha: ['foto final.jpg', 'gerada-falha.jpg'], cases: [{ ok: ['teste-prefixo/01_MORE_IG_evento-20261105_feed_20261015_v01.jpg', L_OK], falha: ['01_MORE_IG_cadeira-maria_4x5_20261105_v01.jpg'] }] },
  { rule: 'R-PRINT-01', script: 'print.mjs', accepts: (f) => ext(f) === 'pdf' || (IMG_EXT.includes(ext(f)) && /MORE_PRINT_/.test(f)), ok: ['MORE_PRINT_marca_convite_20261105_v01.pdf', 'MORE_PRINT_tomada-tom-01_cartaz_20261105_v01.jpg'], falha: ['impressao-falha.pdf', 'gerada-falha.jpg'] },
  { rule: 'R-MOTION-02', script: 'cuts.mjs', accepts: is(...VIDEO), ok: ['MORE_VIDEO_poltrona-eduardo_corte-seco_20261105_v01.mp4'], falha: ['fusao-falha.mp4'], examples: true },
];
