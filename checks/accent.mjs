#!/usr/bin/env node
// R-COLOR-03 (+ parte de UI da R-COLOR-04): na interface, cor cromática (saturação HSL >= 0,25) só pode ser
//   - ciano-destaque #8BC0D0 como estado de navegação: seletor de navegação (NAV) com estado ativo/hover (STATE),
//     como no site (a#collection-fixos.active e :hover); nunca como texto sobre off-white (contraste 1,53:1),
//     medido quando a mesma regra declara fundo off-white
//   - erro #E07A5F em seletor de erro (lista ERROR abaixo)
// Qualquer outra cor cromática (incluindo os tons color.campo) em CSS de interface falha.
// Layout de peça impressa/social (@page, data-canvas, ou nome com PRINT/IG/IGS/CONVITE/LIVRO/VITRINE/ETIQUETA/CARTAZ):
//   tons campo são permitidos (R-COLOR-04); ciano só como o adesivo quadrado de 10 mm de "pronta entrega"
//   (regra com width e height de 10mm / 37,8px), proposta.
// Uso: node checks/accent.mjs <arquivo.css|.html ...>
import { argsOrUsage, finish, cssOf, varMap, resolveVars, colorsIn, parseColor, dist, hsl, colorTokens, isLayout } from './lib.mjs';

const NAV = /(nav|menu|filter|filtro|collection|categor|tab|breadcrumb|(^|[\s>+~])a(?=[#.:\[]|$))/i;
const STATE = /(:hover|\.active|\.is-active|:focus|\[aria-current|\[aria-selected|\.current|\.selected|:checked)/i;
const OFF = parseColor('#e5e1db');
const ERROR = /(erro|error|invalid|alert|warning)/i;
const files = argsOrUsage('node checks/accent.mjs <arquivo.css|.html ...>');
const vars = varMap(files);
const CIANO = parseColor('#8bc0d0'), ERRO = parseColor('#e07a5f');
const campo = Object.entries(colorTokens()).filter(([n]) => n.startsWith('campo-'));
const failures = [];

const mm10 = (v) => v && (/^10mm$/.test(v.trim()) || Math.abs(parseFloat(v) - 37.8) <= 0.6 && /px$/.test(v.trim()));
for (const f of files) for (const r of cssOf(f)) {
  if (r.atRule) continue;
  const layout = isLayout(f);
  const dd = Object.fromEntries(r.decls.map((x) => [x.prop, resolveVars(x.value, vars)]));
  for (const d of r.decls) {
    if (d.prop.startsWith('--')) continue; // definição de variável não é uso
    for (const { raw, c } of colorsIn(resolveVars(d.value, vars))) {
      if (c.a === 0 || hsl(c).s < 0.25) continue;
      const where = `${d.prop} de "${r.selector}"`;
      const camp = campo.find(([, t]) => dist(t, c) < 3);
      if (layout) {
        if (camp) continue;
        if (dist(c, CIANO) < 3) { if (!(mm10(dd.width) && mm10(dd.height))) failures.push({ file: f, msg: `ciano em ${where} num layout: ciano só como adesivo quadrado de 10 mm de "pronta entrega"` }); continue; }
      }
      if (camp) failures.push({ file: f, msg: `${raw} (color.${camp[0]}) em ${where}: tons campo são só para fundo de cartaz/convite/livro/vitrine/social, nunca na interface da loja` });
      else if (dist(c, CIANO) < 3) {
        const sels = r.selector.split(',');
        if (!sels.every((x) => NAV.test(x) && STATE.test(x))) failures.push({ file: f, msg: `ciano-destaque em ${where}: ciano só como estado ativo/hover de navegação (ex. a#collection-fixos.active), nunca decorativo` });
        const bg = r.decls.find((x) => /^background(-color)?$/.test(x.prop));
        if (d.prop === 'color' && bg && colorsIn(resolveVars(bg.value, vars)).some(({ c: b }) => dist(b, OFF) < 3)) failures.push({ file: f, msg: `ciano como texto sobre off-white em "${r.selector}": contraste 1,53:1` });
      }
      else if (dist(c, ERRO) < 3) { if (!ERROR.test(r.selector)) failures.push({ file: f, msg: `erro #E07A5F em ${where}: cor de erro só em seletor de erro` }); }
      else failures.push({ file: f, msg: `cor cromática ${raw} em ${where}: a única cor cromática da interface é ciano-destaque (e erro em mensagens de erro)` });
    }
  }
}
finish('R-COLOR-03', failures, 'ciano só como estado de navegação, nenhuma outra cor cromática na interface');
