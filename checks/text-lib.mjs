// Listas e funções de texto compartilhadas (R-COPY-01, R-COPY-02, R-NAME-01, R-FILE-01).
import fs from 'node:fs';
import path from 'node:path';
import { CHECKS_DIR } from './lib.mjs';

// Palavras proibidas: adjetivos de luxo (R-COPY-01) + voz "alma" aposentada em dez/2025 (R-COPY-02, anti_references.voz_alma)
export const LUXO = ['exclusiv[oa]s?', 'exclusividade', 'sofisticad[oa]s?', 'sofisticação', 'luxuos[oa]s?', 'luxo', 'requintad[oa]s?', 'requinte', 'premium', 'glamour', 'chique'];
export const ALMA = ['alma', 'almas', 'essência', 'personalidade'];
export const forbiddenRe = new RegExp(`(?<![\\p{L}])(${[...LUXO, ...ALMA].join('|')})(?![\\p{L}])`, 'giu');

export const EMOJI = /\p{Extended_Pictographic}/u;
export const MATERIAL = /(madeira|maciç|aço|alumínio|latão|vidro|fibra|tecido|estofad|bouclê|veludo|papel|algodão|mármore|madrepérola|fundid|laminad|talagarça|aramad|metal|couro|pedra|ipê|sucupira|tauari|angelim)/i;

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
