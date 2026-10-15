#!/usr/bin/env node
// R-MOTION-04: a interação orienta, não encena.
//   CSS: scroll-snap-type mandatory em html/body/main (sequestro de rolagem) falha; cursor: url()/none (cursor
//        personalizado) falha; animation infinite falha fora de contador/progresso/ticker/marquee (loader teatral);
//        o que aparece só em :hover (opacity, visibility, display, transform, height, max-height, clip-path num
//        descendente) precisa do mesmo seletor com :focus-within, :focus-visible ou :focus (caminho por teclado/toque)
//   HTML: carrossel (class carousel, slider, swiper, slideshow) com autoplay/data-autoplay que não seja "false" falha;
//        script com addEventListener('wheel'...) e preventDefault falha (rolagem sequestrada)
// Uso: node checks/interacao.mjs <arquivo.css|.html ...>
import fs from 'node:fs';
import { argsOrUsage, finish, cssOf, ext } from './lib.mjs';

const files = argsOrUsage('node checks/interacao.mjs <arquivo.css|.html ...>');
const failures = [];
const REVEAL = new Set(['opacity', 'visibility', 'display', 'transform', 'height', 'max-height', 'clip-path']);
const COUNTER = /counter|count|contador|ticker|marquee|progress/i;
const ROOT = /^(html|body|main|#main|\.page|:root)\b/i;

for (const f of files) {
  const rules = cssOf(f).filter((r) => !r.atRule);
  const selectors = new Set(rules.flatMap((r) => r.selector.split(',').map((s) => s.trim().replace(/\s+/g, ' '))));
  for (const r of rules) {
    const sels = r.selector.split(',').map((s) => s.trim().replace(/\s+/g, ' '));
    for (const d of r.decls) {
      if (d.prop === 'scroll-snap-type' && /mandatory/.test(d.value) && sels.some((s) => ROOT.test(s))) failures.push({ file: f, msg: `"${r.selector}": scroll-snap-type mandatory na página inteira sequestra a rolagem` });
      if (d.prop === 'cursor' && /url\(|^none$/.test(d.value.trim())) failures.push({ file: f, msg: `"${r.selector}": cursor personalizado (${d.value}); o cursor é o do sistema` });
      if (/^(animation|animation-iteration-count)$/.test(d.prop) && /\binfinite\b/.test(d.value) && !COUNTER.test(r.selector + ' ' + d.value)) failures.push({ file: f, msg: `"${r.selector}": animação infinita (${d.value}); nada gira nem pulsa para sempre fora de contador ou progresso` });
    }
    if (!r.decls.some((d) => REVEAL.has(d.prop))) continue;
    for (const s of sels) {
      if (!/:hover\b/.test(s) || !/:hover\S*\s+\S/.test(s)) continue; // só revelações num descendente
      const twins = [':focus-within', ':focus-visible', ':focus'].map((k) => s.replace(/:hover\b/g, k));
      if (!twins.some((t) => selectors.has(t))) failures.push({ file: f, msg: `"${s}": revela algo só no hover; declare também "${twins[0]}" (teclado e toque)` });
    }
  }
  if (ext(f) === 'html') {
    const html = fs.readFileSync(f, 'utf8');
    for (const m of html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)) {
      const attrs = m[2];
      if (!/class\s*=\s*"[^"]*(carousel|slider|swiper|slideshow)[^"]*"/i.test(attrs)) continue;
      const ap = attrs.match(/\b(?:data-)?autoplay(?:\s*=\s*"([^"]*)")?/i);
      if (ap && !/^(false|0|off)$/i.test(ap[1] || 'true')) failures.push({ file: f, msg: `<${m[1]}> carrossel com autoplay; quem decide o próximo slide é a pessoa` });
    }
    for (const m of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)) if (/addEventListener\(\s*['"]wheel['"]/.test(m[1]) && /preventDefault/.test(m[1])) failures.push({ file: f, msg: 'script captura a roda do mouse com preventDefault: rolagem sequestrada' });
  }
}
finish('R-MOTION-04', failures, 'nada sequestra a rolagem, nenhum loader nem cursor próprio; o que o hover revela também abre por foco');
