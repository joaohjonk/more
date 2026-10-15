#!/usr/bin/env node
// R-TYPE-02: toda ação de interface (<button>, <input type=submit|button>, <a class="...btn|button...">, [role=button])
// tem texto visível com uma palavra entre colchetes: "[Voltar]", "Menu [+]". Ação só com ícone ou sem colchete falha.
// Vale para ações de texto. Controles isentos (padrão de e-commerce, sem palavra):
//   - miniatura: conteúdo é <img>
//   - quantidade: class/name/aria com quantity, qty, stepper, ou texto só "+" / "-" / "−"
//   - fechar só com ícone: class/aria-label com close/fechar e sem texto
//   - amostra: class com swatch, material, color-option, ou input radio/checkbox
// Colchete envolve só ação ([Comprar], [Como chegar], Menu [+]). Status e lugar nunca levam colchete:
//   "[Pronta entrega]", "[Sob encomenda ...]", "[Jardins]", "[São Paulo]", "[Alameda ...]", "[Rua ...]" falham.
// Peça estática (layout: @page, data-canvas, ou nome com PRINT/IG/IGS/CONVITE/LIVRO/VITRINE/ETIQUETA/CARTAZ) não tem
//   ação: nenhum colchete; o link vai na legenda ou no sticker de link do story.
// Uso: node checks/actions.mjs <arquivo.html ...>
import fs from 'node:fs';
import { argsOrUsage, finish, htmlText, isLayout } from './lib.mjs';

const files = argsOrUsage('node checks/actions.mjs <arquivo.html ...>');
const failures = [];
const BRACKET = /\[[^\]\s][^\]]*\]/;

const NOT_ACTION = /^\[\s*(pronta entrega|à pronta entrega|sob encomenda[^\]]*|jardins|são paulo|sao paulo|alameda[^\]]*|rua[^\]]*|avenida[^\]]*|av\.[^\]]*)\s*\]$/i;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8').replace(/<(script|style|template)[\s\S]*?<\/\1>/gi, '');
  const bodyText = htmlText(html.replace(/^[\s\S]*?<body[^>]*>/i, ''));
  const brackets = [...new Set(bodyText.match(/\[[^\]\n]{1,40}\]/g) || [])];
  if (isLayout(f)) {
    for (const b of brackets) failures.push({ file: f, msg: NOT_ACTION.test(b) ? `"${b}" é status ou lugar: sem colchete` : `"${b}" numa peça estática: não há ação, então não há colchete; o link vai na legenda ou no sticker de link` });
    continue;
  }
  for (const b of brackets) if (NOT_ACTION.test(b)) failures.push({ file: f, msg: `"${b}" é status ou lugar, não ação: escreva sem colchete` });
  const found = [];
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) found.push({ attrs: m[1], inner: m[2], tag: 'button' });
  for (const m of html.matchAll(/<a\b([^>]*(?:class\s*=\s*"[^"]*\b(?:btn|button)\b[^"]*"|role\s*=\s*"button")[^>]*)>([\s\S]*?)<\/a>/gi)) found.push({ attrs: m[1], inner: m[2], tag: 'a' });
  for (const m of html.matchAll(/<input\b([^>]*type\s*=\s*"(?:submit|button)"[^>]*)>/gi)) found.push({ attrs: m[1], inner: (m[1].match(/value\s*=\s*"([^"]*)"/i) || [, ''])[1], tag: 'input' });
  for (const b of found) {
    if (/\bhidden\b|aria-hidden\s*=\s*"true"/i.test(b.attrs)) continue;
    if (/<img\b/i.test(b.inner)) continue; // miniatura
    const text = htmlText(b.inner).replace(/\n/g, ' ').trim();
    if (/quantity|qty|stepper/i.test(b.attrs) || /^[+\-−]$/.test(text)) continue; // quantidade
    if (!text && /close|fechar/i.test(b.attrs)) continue; // fechar só com ícone
    if (/swatch|material|color-option/i.test(b.attrs)) continue; // amostra
    const cls = (b.attrs.match(/class\s*=\s*"([^"]*)"/i) || [, ''])[1].split(/\s+/)[0];
    const id = `<${b.tag}${cls ? '.' + cls : ''}>`;
    if (!text) failures.push({ file: f, msg: `${id} sem texto visível (só ícone): escreva a ação em mono entre colchetes, ex. [Fechar]` });
    else if (!BRACKET.test(text)) failures.push({ file: f, msg: `${id} "${text.slice(0, 40)}" sem palavra entre colchetes: escreva a ação como "[${(text.replace(/a partir de/i, 'Adicionar').match(/[A-Za-zÀ-ú]{3,}/) || ['Ação'])[0]}]"` });
  }
}
finish('R-TYPE-02', failures, 'todas as ações são palavras entre colchetes');
