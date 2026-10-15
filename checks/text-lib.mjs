// Listas e funções de texto compartilhadas (R-COPY-01, R-COPY-02, R-NAME-01, R-FILE-01).
import fs from 'node:fs';
import path from 'node:path';
import { CHECKS_DIR } from './lib.mjs';

// Palavras proibidas: adjetivos de luxo (R-COPY-01) + voz "alma" aposentada em dez/2025 (R-COPY-02, anti_references.voz_alma)
export const LUXO = ['exclusiv[oa]s?', 'exclusividade', 'sofisticad[oa]s?', 'sofisticação', 'luxuos[oa]s?', 'luxo', 'requintad[oa]s?', 'requinte', 'premium', 'glamour', 'chique'];
export const ALMA = ['alma', 'almas', 'essência', 'personalidade'];
export const forbiddenRe = new RegExp(`(?<![\\p{L}])(${[...LUXO, ...ALMA].join('|')})(?![\\p{L}])`, 'giu');

export const EMOJI = /\p{Extended_Pictographic}/u;
// Lista publicada em checks/palavras-de-material.json (R-COPY-02)
const MAT = JSON.parse(fs.readFileSync(path.join(CHECKS_DIR, 'palavras-de-material.json'), 'utf8'));
export const MATERIAL = new RegExp(`(?<![\\p{L}])(${[...MAT.materiais, ...MAT.ficha].join('|')})`, 'iu');
export const STATUS = new RegExp(`^(${MAT.status.join('|')})\\b`, 'iu');
// Linhas aprovadas (checks/aprovadas.json): palavra proibida dentro delas é aceita
export const APROVADAS = JSON.parse(fs.readFileSync(path.join(CHECKS_DIR, 'aprovadas.json'), 'utf8')).linhas;
export function semAprovadas(text) {
  let t = text;
  for (const l of APROVADAS) t = t.split(l).join(' ');
  return t;
}

export function sentences(text) {
  return text.split(/(?<=[.?!…])\s+|\n+/).map((s) => s.trim()).filter((s) => /\p{L}/u.test(s));
}
export const words = (s) => (s.match(/[\p{L}\p{N}][\p{L}\p{N}.'-]*/gu) || []);

export function names() {
  return JSON.parse(fs.readFileSync(path.join(CHECKS_DIR, 'nomes-canonicos.json'), 'utf8'));
}
export const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// procura um nome canônico no texto, aceitando a primeira letra minúscula no meio da frase
export function findCanonical(text) {
  return names().pecas.filter((p) => {
    const body = p.nome.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?<![\\p{L}])[${p.nome[0]}${p.nome[0].toLowerCase()}]${body}(?![\\p{L}\\d-])`, 'u').test(text);
  });
}
