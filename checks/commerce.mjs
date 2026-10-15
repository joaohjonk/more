#!/usr/bin/env node
// R-COMMERCE-01: página de produto (HTML com og:type=product, schema.org/Product ou data-page="product") mostra exatamente um dos sinais:
//   - "Pronta entrega" (peça pronta para comprar) ou
//   - "Sob encomenda" + prazo ("30 dias", "8 a 10 semanas"...)
// Checa o texto, não a cor.
// Uso: node checks/commerce.mjs <produto.html ...>
import fs from 'node:fs';
import { argsOrUsage, finish, ext, htmlText } from './lib.mjs';

const files = argsOrUsage('node checks/commerce.mjs <produto.html ...>');
const failures = [];
const LEAD = /sob encomenda[^\n]{0,80}?\b\d+\s*(a\s*\d+\s*)?(dias|semanas|meses)\b|\b\d+\s*(a\s*\d+\s*)?(dias|semanas|meses)\b[^\n]{0,80}?sob encomenda/i;
let pages = 0;
for (const f of files.filter((x) => ['html', 'htm'].includes(ext(x)))) {
  const raw = fs.readFileSync(f, 'utf8');
  if (!/og:type"\s+content="product"|itemtype="[^"]*schema\.org\/Product"|data-page="product"/i.test(raw)) continue; // não é página de produto
  pages++;
  const t = htmlText(raw);
  const pronta = /pronta entrega/i.test(t), enc = /sob encomenda/i.test(t);
  if (!pronta && !enc) failures.push({ file: f, msg: 'página de produto sem "Pronta entrega" nem "Sob encomenda"' });
  if (pronta && enc) failures.push({ file: f, msg: 'mostra "Pronta entrega" e "Sob encomenda" ao mesmo tempo' });
  if (enc && !LEAD.test(t)) failures.push({ file: f, msg: '"Sob encomenda" sem prazo (ex. "Sob encomenda, 8 a 10 semanas")' });
}
finish('R-COMMERCE-01', failures, `${pages} página(s) de produto com sinal de disponibilidade`);
