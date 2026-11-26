const { chromium } = require('playwright');
const D = require('./src/data.js');
const fs = require('fs');
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = d => { if (!d) return '-'; const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d); return m ? `${m[3]}-${m[2]}-${m[1]}` : d; };
const logo = `<svg width="58" height="52" viewBox="0 0 72 64"><path d="M8 30 L34 8 L60 30" fill="none" stroke="#2f6bf2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 12 v-5 h8 v13" fill="none" stroke="#2f6bf2" stroke-width="5" stroke-linejoin="round"/><path d="M14 27 v28 h22" fill="none" stroke="#2f6bf2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 44 l9 9 l19 -21" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function html(w) {
  const lagen = w.items.map(i => i.raakt.map(t => t.label).join('; '));
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>
@page{size:A4;margin:16mm 14mm 18mm}
body{font:10pt/1.45 "DejaVu Sans",Arial,sans-serif;color:#0f172a;margin:0}
.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #0f1a2e;padding-bottom:10px}
.hd .l{display:flex;gap:12px;align-items:center}
.hd b{font-size:20pt;display:block;line-height:1}
.hd small{color:#475569}
.doc{text-align:right}
.doc b{font-size:15pt}
.vb{background:#fff4d6;border:1px solid #fbd88a;border-radius:6px;padding:6px 10px;margin:10px 0;font-size:9.5pt}
h2{font-size:12pt;margin:16px 0 6px;color:#0f1a2e}
table{width:100%;border-collapse:collapse;font-size:9.5pt}
th{background:#0f1a2e;color:#fff;text-align:left;padding:6px 7px;font-weight:600}
td{border-bottom:1px solid #d7dde8;padding:6px 7px;vertical-align:top}
.kv td:first-child{width:34%;color:#475569;font-weight:600}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ck{list-style:none;padding:0;margin:0}
.ck li{padding:3px 0}
.ck li::before{content:"☐ ";font-size:11pt}
.ck li.on::before{content:"☑ ";color:#16a34a}
.sig{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:22px}
.sig div{border-top:1px solid #94a3b8;padding-top:4px;color:#475569;font-size:9pt;height:40px}
.ft{position:fixed;bottom:-10mm;left:0;right:0;font-size:8pt;color:#64748b;display:flex;justify-content:space-between}
.yes{color:#b91c1c;font-weight:700}
</style></head><body>
<div class="hd"><div class="l">${logo}<div><b>KBK Bouwgroep</b><small>Volendam • onderhoud, renovatie en verduurzaming</small></div></div>
<div class="doc"><small>Opname / werkbon</small><br><b>${esc(w.nr)}</b><br><small>Opnamedatum ${esc(w.opnamedatum)}</small></div></div>
<div class="vb"><b>VOORBEELD</b> – fictieve opname gemaakt voor een schoolopdracht (KBK AsbestCheck AI). Namen, nummers en planning zijn verzonnen; het adres sluit aan bij het bijbehorende asbestinventarisatierapport.</div>
<div class="grid"><div><h2>Projectgegevens</h2><table class="kv">
<tr><td>Adres</td><td>${esc(w.adres)}</td></tr>
<tr><td>Object</td><td>${esc(w.object)}</td></tr>
<tr><td>Soort werk</td><td>${esc(w.soort)}</td></tr>
<tr><td>Opdrachtgever</td><td>${esc(w.opdrachtgever)}</td></tr>
<tr><td>Status woning</td><td>${esc(w.bewoond)}</td></tr></table></div>
<div><h2>Planning en verantwoordelijke</h2><table class="kv">
<tr><td>Projectbegeleider</td><td>${esc(w.projectbegeleider)} (op locatie)</td></tr>
<tr><td>Gedeeld met</td><td>Werkvoorbereiding KBK, kantoor Volendam</td></tr>
<tr><td>Start gepland</td><td>${esc(fmt(w.startGepland))}</td></tr>
<tr><td>Bouwjaar</td><td>${w.bouwjaar ? w.bouwjaar + (w.bouwjaar < 1994 ? ' <span class="yes">(vóór 1994)</span>' : '') : 'Onbekend'}</td></tr>
<tr><td>Asbestinventarisatie</td><td><span class="yes">Nodig</span> – aangevraagd door kantoor</td></tr></table></div></div>
<h2>Geplande werkzaamheden</h2>
<table><thead><tr><th style="width:5%">#</th><th style="width:17%">Ruimte</th><th style="width:31%">Werkzaamheid</th><th style="width:29%">Geraakte materialen en achterliggende lagen</th><th style="width:9%">Destructief</th><th style="width:9%">Planning</th></tr></thead><tbody>
${w.items.map((i, n) => `<tr><td>${esc(i.code)}</td><td>${esc(i.ruimte)}</td><td>${esc(i.werk)}</td><td>${esc(lagen[n])}</td><td>${i.destructief ? 'Ja' : 'Nee'}</td><td>${esc(i.planning || '-')}</td></tr>`).join('')}
</tbody></table>
<div class="grid"><div><h2>Controle op locatie</h2><ul class="ck">
<li class="on">Alle ruimtes waar gewerkt wordt bezocht</li>
<li class="on">Per werkzaamheid vastgelegd wat gesloopt, verwijderd of doorgeboord wordt</li>
<li class="on">Achterliggende lagen benoemd (tegellijm, onderlaag, koven, plafondruimte)</li>
<li class="on">Foto's gemaakt per ruimte (in de app, niet in deze PDF)</li>
<li>Asbestinventarisatierapport ontvangen en gekoppeld</li>
<li>Vergelijking rapport ↔ werkbon beoordeeld door deskundige</li>
<li>Werkbon vrijgegeven voor uitvoering</li></ul></div>
<div><h2>Opmerkingen projectbegeleider</h2><p>${esc(w.opmerkingen || '-')}</p>
<p style="color:#b91c1c"><b>Let op:</b> geen werkzaamheden starten aan materialen die in het rapport asbesthoudend, uitgesloten of niet genoemd zijn, voordat de deskundige akkoord heeft gegeven.</p></div></div>
<div class="sig"><div>Projectbegeleider: ${esc(w.projectbegeleider)}</div><div>Akkoord deskundige (na vergelijking)</div></div>
<div class="ft"><span>KBK Bouwgroep • Volendam • ${esc(w.nr)}</span><span>Fictief voorbeeld – schoolopdracht</span></div>
</body></html>`;
}

(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  fs.mkdirSync('/home/user/kbk/dist/werkbonnen', { recursive: true });
  for (const w of D.WERKBONNEN) {
    await p.setContent(html(w), { waitUntil: 'load' });
    const short = w.adres.split(',')[0].replace(/\s+/g, '_');
    await p.pdf({ path: `/home/user/kbk/dist/werkbonnen/KBK_Opname_${w.nr}_${short}.pdf`, format: 'A4', printBackground: true, margin: { top: '16mm', bottom: '18mm', left: '14mm', right: '14mm' } });
  }
  await b.close();
})();
