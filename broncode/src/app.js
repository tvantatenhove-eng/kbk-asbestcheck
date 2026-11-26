{
var D = KBK_DATA, E = KBK_ENGINE;
var $ = function (s) { return document.querySelector(s); };
function lc(s) { s = String(s); return s.charAt(0).toLowerCase() + s.slice(1); }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
D.WERKBONNEN.forEach(function (w) { w.fingerprint = [w.nr]; });

var IC = {
  pdf: '<svg width="44" height="50" viewBox="0 0 44 50"><path d="M6 2h22l12 12v32a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff" stroke="#d92d20" stroke-width="2.4"/><path d="M28 2v12h12" fill="none" stroke="#d92d20" stroke-width="2.4"/><rect x="2" y="26" width="32" height="14" rx="2" fill="#d92d20"/><text x="18" y="37" fill="#fff" font-size="10" font-weight="800" text-anchor="middle" font-family="Inter,Arial">PDF</text></svg>',
  wb: '<svg width="44" height="50" viewBox="0 0 44 50"><rect x="4" y="5" width="34" height="42" rx="4" fill="#fff" stroke="#1d4ed8" stroke-width="2.4"/><rect x="13" y="2" width="16" height="7" rx="2" fill="#1d4ed8"/><path d="M11 20h20M11 27h20M11 34h12" stroke="#1d4ed8" stroke-width="2.4" stroke-linecap="round"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#16a34a"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  warn: '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2L1 21h22z" fill="#f59e0b"/><path d="M12 9v5M12 17.2v.3" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>',
  scales: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10M5 7h14M12 5a1 1 0 1 0 0-.01"/><path d="M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/></svg>',
  wrench: '<svg width="28" height="28" viewBox="0 0 24 24" fill="#1d4ed8"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>',
  bot: '<svg width="34" height="34" viewBox="0 0 32 32"><rect x="15" y="2" width="2" height="5" fill="#0f1a2e"/><circle cx="16" cy="3" r="2.2" fill="#0f1a2e"/><rect x="4" y="8" width="24" height="18" rx="7" fill="#0f1a2e"/><rect x="1" y="14" width="3" height="7" rx="1.5" fill="#0f1a2e"/><rect x="28" y="14" width="3" height="7" rx="1.5" fill="#0f1a2e"/><circle cx="11.5" cy="17" r="2.6" fill="#fff"/><circle cx="20.5" cy="17" r="2.6" fill="#fff"/><path d="M12 22.5h8" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
  user: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="8" r="4.5"/><path d="M3 22a9 9 0 0 1 18 0z"/></svg>',
  info: '<svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#1d4ed8"/><path d="M12 11v6M12 7.2v.3" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>',
  up: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v11M15 5.9L14 10h5.8a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 18.4 21H7V10l4-8a3 3 0 0 1 4 3.9z"/><path d="M3 10h4v11H3z"/></svg>',
  down: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V3M9 18.1L10 14H4.2a2 2 0 0 1-2-2.3l1.4-7A2 2 0 0 1 5.6 3H17v11l-4 8a3 3 0 0 1-4-3.9z"/><path d="M21 14h-4V3h4z"/></svg>'
};
var TITLES = {
  analyse: ['Vergelijking &amp; Advies', 'Asbestinventarisatierapport vergelijken met de KBK-opname (werkbon)'],
  opname: ['Opname op locatie', 'De projectbegeleider legt de werkzaamheden vast en deelt de werkbon met kantoor'],
  inspectie: ['Inspectie op locatie', 'De asbestinventariseerder bezoekt de woning, neemt monsters en stuurt het rapport naar KBK'],
  rapporten: ['Inbox rapporten', 'Asbestrapporten die via Outlook binnenkomen en door de AI-agent aan een opname worden gekoppeld'],
  dossiers: ['Dossiers', 'Elke werkbon doorloopt het proces van opname tot besluit van de deskundige'],
  proces: ['Werkproces', 'Van opname op locatie tot beoordeling door de deskundige'],
  account: ['Account', 'Je gegevens binnen KBK AsbestCheck AI'],
  instellingen: ['Instellingen', 'AI-modus en privacy']
};

var S = { rapport: null, werkbon: null, rFile: null, wFile: null, rText: '', busyR: false, busyW: false, turns: [], sample: null, aiMode: 'auto', fb: {}, deskundige: {} };
try { S.aiMode = localStorage.getItem('kbk-ai') || 'auto'; } catch (e) {}
if (window.claude && claude.use) claude.use('sample').then(function (s) { S.sample = s; renderSettings(); }).catch(function () {});
function aiOn() { return S.sample && S.aiMode === 'auto'; }

/* ---------- navigatie ---------- */
function show(v) {
  document.querySelectorAll('.nav button').forEach(function (b) { b.classList.toggle('on', b.dataset.view === v); });
  document.querySelectorAll('.view').forEach(function (s) { s.classList.toggle('on', s.id === 'view-' + v); });
  $('#title').innerHTML = TITLES[v][0]; $('#sub').textContent = TITLES[v][1];
  if (v === 'opname') renderOpname(); if (v === 'rapporten') renderRapporten(); if (v === 'proces') renderProces();
  if (v === 'account') renderAccount(); if (v === 'dossiers') renderDossiers(); if (v === 'instellingen') renderSettings();
  if (v === 'inspectie') renderInspectie();
  renderTour(); window.scrollTo(0, 0);
}
$('#nav').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) show(b.dataset.view); });
function toast(t) { var d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 2600); }

/* ---------- upload-slots ---------- */
function slot(kind) {
  var isR = kind === 'rapport', obj = isR ? S.rapport : S.werkbon, f = isR ? S.rFile : S.wFile, busy = isR ? S.busyR : S.busyW;
  if (!obj && !busy) {
    return '<div class="card file drop" data-drop="' + kind + '">' + (isR ? IC.pdf : IC.wb) + '<b>' + (isR ? 'Asbestinventarisatierapport' : 'KBK-opname / werkbon') + '</b><small>Sleep een PDF hierheen of klik om te kiezen' + (isR ? '' : ', of maak een opname') + '</small></div>';
  }
  var name = f ? f.name : (isR ? obj.bestand : obj.nr + '.pdf');
  var meta = f ? f.meta : '';
  var badge = busy ? '<span class="badge busy">' + esc(busy) + '</span>' : '<span class="badge">' + IC.check + ' Verwerkt</span>';
  return '<div class="card file">' + (isR ? IC.pdf : IC.wb) + '<div class="meta"><span class="lbl">' + (isR ? 'Asbestinventarisatierapport' : 'KBK-opname (werkbon)') + '</span><b>' + esc(name) + '</b><small>' + esc(meta) + '</small></div>' + badge + '<button class="x" data-clear="' + kind + '" title="Verwijderen">×</button></div>';
}
function renderSlots() {
  $('#slot-rapport').innerHTML = slot('rapport'); $('#slot-werkbon').innerHTML = slot('werkbon');
}
document.addEventListener('click', function (e) {
  var c = e.target.closest('[data-clear]');
  if (c) { if (c.dataset.clear === 'rapport') { S.rapport = null; S.rFile = null; S.rText = ''; } else { S.werkbon = null; S.wFile = null; } $('#koppel').classList.add('hidden'); renderAll(); return; }
  var d = e.target.closest('[data-drop]');
  if (d) $(d.dataset.drop === 'rapport' ? '#fileR' : '#fileW').click();
  var cs = e.target.closest('[data-case]');
  if (cs) { S.dossier = null; loadCase(cs.dataset.case); show('analyse'); }
  var ch = e.target.closest('[data-q]');
  if (ch) { $('#q').value = ch.dataset.q; ask(); }
});
['dragover', 'dragleave', 'drop'].forEach(function (ev) {
  document.addEventListener(ev, function (e) {
    var d = e.target.closest && e.target.closest('[data-drop]');
    if (ev !== 'dragleave') e.preventDefault();
    document.querySelectorAll('[data-drop]').forEach(function (x) { x.classList.remove('over'); });
    if (!d) { if (ev === 'drop' && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0], null); return; }
    if (ev === 'dragover') d.classList.add('over');
    if (ev === 'drop' && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0], d.dataset.drop);
  });
});
$('#fileR').onchange = function () { if (this.files[0]) handleFile(this.files[0], 'rapport'); this.value = ''; };
$('#fileW').onchange = function () { if (this.files[0]) handleFile(this.files[0], 'werkbon'); this.value = ''; };
$('#attachFile').onchange = function () { if (this.files[0]) handleFile(this.files[0], null); this.value = ''; };

function vandaag() { return E.fmt(new Date()); }
function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

async function pdfText(file) {
  if (!window.pdfjsLib) throw new Error('PDF-lezer kon niet laden (geen internet?)');
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  var buf = await file.arrayBuffer();
  var doc = await pdfjsLib.getDocument({ data: buf }).promise;
  var out = [];
  for (var p = 1; p <= doc.numPages; p++) {
    var tc = await (await doc.getPage(p)).getTextContent();
    var t = '', prev = null;
    tc.items.forEach(function (i) {
      if (prev) {
        var sameLine = Math.abs(i.transform[5] - prev.transform[5]) < 2;
        var gap = i.transform[4] - (prev.transform[4] + prev.width);
        if (prev.hasEOL || !sameLine) t += '\n'; else if (gap > 1.2 && !/\s$/.test(t) && !/^\s/.test(i.str)) t += ' ';
      }
      t += i.str; prev = i;
    });
    out.push(t);
  }
  return { text: out.join('\n'), pages: doc.numPages };
}

async function handleFile(file, kind) {
  if (!/pdf$/i.test(file.type) && !/\.pdf$/i.test(file.name)) { toast('Kies een PDF-bestand.'); return; }
  var meta = 'Geüpload: ' + vandaag() + ' • ' + (file.size / 1048576).toFixed(1).replace('.', ',') + ' MB';
  var tmpKind = kind || 'rapport';
  if (tmpKind === 'rapport') { S.busyR = 'PDF lezen…'; S.rFile = { name: file.name, meta: meta }; } else { S.busyW = 'PDF lezen…'; S.wFile = { name: file.name, meta: meta }; }
  renderSlots(); show('analyse');
  var res;
  try { res = await pdfText(file); } catch (err) { S.busyR = S.busyW = false; S.rFile = S.wFile = S.rFile && S.rapport ? S.rFile : null; renderAll(); botSay('<p>Dit PDF-bestand kon ik niet lezen: ' + esc(err.message) + '</p>'); return; }
  var text = res.text;
  var isWb = /KBK-?WB-?\d{4}-\d+/.test(text) && /Opname\s*\/\s*werkbon/i.test(text);
  if (!kind) kind = isWb ? 'werkbon' : 'rapport';
  if (kind !== tmpKind) { // verplaats de laadstatus naar het juiste slot
    if (kind === 'werkbon') { S.wFile = S.rFile; S.rFile = S.rapport ? S.rFile : null; S.busyR = false; S.busyW = 'PDF lezen…'; }
    else { S.rFile = S.wFile; S.wFile = S.werkbon ? S.wFile : null; S.busyW = false; S.busyR = 'PDF lezen…'; }
  }
  var fileMeta = meta + ' • ' + res.pages + ' pagina' + (res.pages === 1 ? '' : "'s");
  if (kind === 'werkbon') {
    S.wFile = { name: file.name, meta: fileMeta };
    S.busyW = 'Werkzaamheden herkennen…'; renderSlots(); await sleep(500);
    var wb = E.herken(text, D.WERKBONNEN);
    if (!wb && aiOn()) { S.busyW = 'Claude leest de werkbon…'; renderSlots(); wb = await aiWerkbon(text); }
    S.busyW = false;
    if (!wb) { S.wFile = null; renderAll(); botSay('<p>Deze werkbon herken ik niet als KBK-opname. Gebruik <b>Opname (werkbon)</b> om de werkzaamheden in te voeren, of kies een voorbeeld in <b>Mijn rapporten</b>.</p>'); return; }
    S.werkbon = wb;
    autoKoppel('werkbon');
  } else {
    S.rFile = { name: file.name, meta: fileMeta }; S.rText = text;
    S.busyR = 'Bronnen herkennen…'; renderSlots(); await sleep(400);
    var r = E.herken(text, D.RAPPORTEN), how;
    if (r) { r = JSON.parse(JSON.stringify(r)); r.methode = 'bekend'; how = 'bekend'; }
    else if (aiOn()) {
      S.busyR = 'Claude analyseert het rapport…'; renderSlots();
      try { r = E.normalizeAI(await S.sample.json(E.aiExtractPrompt(text), { modelTier: 'default' }), file.name); r.paginas = res.pages; how = 'claude'; }
      catch (err) { r = null; if (err && err.code === 'not_granted') S.aiMode = 'local'; }
    }
    if (!r) { r = E.heuristiek(text, file.name); r.paginas = res.pages; how = 'lokaal'; }
    S.busyR = 'Koppelen aan werkbon…'; renderSlots(); await sleep(400);
    S.busyR = false; S.rapport = r;
    autoKoppel('rapport');
    if (how === 'lokaal') botSay('<p>Dit rapport is gelezen met de <b>lokale tekstherkenning</b> (zonder internet-AI). De herkende bronnen zijn indicatief: controleer ze in het rapport zelf.</p>');
  }
  S.turns = []; renderAll(); scrollToResult();
}

async function aiWerkbon(text) {
  try {
    var j = await S.sample.json('Lees deze werkbon/opname van een bouwbedrijf en geef ALLEEN JSON: {"nr":str,"adres":str,"postcode":"1234AB"|null,"soort":str,"projectbegeleider":str,"opnamedatum":str,"startGepland":"jjjj-mm-dd"|null,"items":[{"code":str,"ruimte":str,"ruimtes":[one of ' + JSON.stringify(E.VOCAB_R) + '],"werk":str,"raakt":[{"canon":one of ' + JSON.stringify(E.VOCAB_M.concat(['verf'])) + ',"label":str,"pos":"wand"|"vloer"|"plafond"|"kozijn"|"dak"|null}],"destructief":bool}]}. Noem bij "raakt" ook achterliggende lagen (tegellijm, onderlaag). Verzin niets.\n\n' + text.slice(0, 40000), { modelTier: 'default' });
    if (!j || !j.items || !j.items.length) return null;
    j.key = 'upload'; j.nr = String(j.nr || 'Werkbon'); j.object = j.object || '-'; j.opdrachtgever = j.opdrachtgever || '-'; j.bewoond = j.bewoond || '-';
    j.items.forEach(function (i, n) { i.code = String(i.code || ('0' + (n + 1)).slice(-2)); i.ruimtes = i.ruimtes && i.ruimtes.length ? i.ruimtes : ['*']; i.raakt = (i.raakt || []).map(function (t) { return { canon: String(t.canon || 'overig'), label: String(t.label || t.canon), pos: t.pos || null }; }); i.destructief = i.destructief !== false; });
    if (j.postcode) j.postcode = String(j.postcode).replace(/\s/g, '').toUpperCase();
    return j;
  } catch (e) { return null; }
}

function straat(a) { return String(a || '').split(',')[0].trim().toLowerCase(); }
function autoKoppel(nieuw) {
  var k = $('#koppel');
  if (nieuw === 'rapport' && S.rapport) {
    var w = D.WERKBONNEN.filter(function (x) { return (S.rapport.postcode && x.postcode === S.rapport.postcode) || straat(x.adres) === straat(S.rapport.adres); })[0];
    if (w && (!S.werkbon || S.werkbon.postcode !== S.rapport.postcode)) {
      S.werkbon = w; S.wFile = { name: w.nr + '_opname.pdf', meta: 'Opname ' + w.opnamedatum + ' • ' + w.projectbegeleider };
      k.innerHTML = '<span class="dot"></span>Rapport automatisch gekoppeld aan werkbon <b>' + esc(w.nr) + '</b> op basis van adres en postcode (' + esc(w.adres) + ').';
      k.classList.remove('hidden'); return;
    }
  }
  if (nieuw === 'werkbon' && S.werkbon && !S.rapport) {
    var r = D.RAPPORTEN.filter(function (x) { return x.postcode && x.postcode === S.werkbon.postcode; })[0];
    if (r) {
      S.rapport = JSON.parse(JSON.stringify(r)); S.rapport.methode = 'bekend'; S.rFile = { name: r.bestand, meta: 'Ontvangen via Outlook • ' + r.paginas + " pagina's" };
      k.innerHTML = '<span class="dot"></span>Bijbehorend rapport gevonden in de inbox en automatisch gekoppeld (' + esc(r.adres) + ').'; k.classList.remove('hidden'); return;
    }
  }
  if (S.rapport && S.werkbon && S.rapport.postcode && S.werkbon.postcode && S.rapport.postcode === S.werkbon.postcode) {
    k.innerHTML = '<span class="dot"></span>Rapport en werkbon horen bij hetzelfde adres (' + esc(S.werkbon.adres) + ').'; k.classList.remove('hidden');
  } else k.classList.add('hidden');
}

function loadCase(key) {
  var r = D.RAPPORTEN.filter(function (x) { return x.key === key; })[0], w = D.WERKBONNEN.filter(function (x) { return x.key === key; })[0];
  S.rapport = JSON.parse(JSON.stringify(r)); S.rapport.methode = 'bekend';
  S.rFile = { name: r.bestand, meta: 'Ontvangen via Outlook • ' + r.mb + ' MB • ' + r.paginas + " pagina's" };
  S.werkbon = w; S.wFile = { name: w.nr + '_opname.pdf', meta: 'Opname ' + w.opnamedatum + ' • ' + w.projectbegeleider };
  S.rText = ''; S.turns = [];
  var k = $('#koppel'); k.innerHTML = '<span class="dot"></span>Rapport automatisch gekoppeld aan werkbon <b>' + esc(w.nr) + '</b> op basis van adres en postcode (' + esc(w.adres) + ').'; k.classList.remove('hidden');
  $('#chat').innerHTML = '';
  renderAll();
}

/* ---------- resultaat ---------- */
function pill(cls, t) { return '<span class="pill ' + cls + '">' + esc(t) + '</span>'; }
function stPill(st) { var s = E.STATUS[st]; return pill(s.cls, s.label); }
function sigPill(sg) { var s = E.SIGNAAL[sg]; return pill(s.cls, s.label); }

function renderResult() {
  var el = $('#result');
  if (!S.rapport || !S.werkbon) {
    el.innerHTML = '<div class="card empty"><h2>' + (S.rapport || S.werkbon ? 'Nog één document nodig' : 'Start een vergelijking') + '</h2><p class="muted">Upload een asbestinventarisatierapport en een KBK-opname, of open een voorbeeldcasus.</p><div class="cases" style="margin-top:14px;text-align:left">' +
      D.RAPPORTEN.map(function (r) { return '<button class="card case" data-case="' + r.key + '" style="cursor:pointer;text-align:left"><h3>' + esc(r.adres.split(',')[0]) + '</h3><small>' + esc(r.bestand) + '</small><div class="row">' + (r.fictief ? pill('grey', 'Fictief') : pill('blue', 'Echt rapport')) + '</div></button>'; }).join('') + '</div></div>';
    return;
  }
  var v = E.vergelijk(S.rapport, S.werkbon); S.v = v;
  var r = S.rapport, w = S.werkbon, t = v.tel, rt = v.rapportTel, n = v.regels.length;
  var bronLabel = { bekend: 'Herkend rapport (gecontroleerde extractie)', inspectie: 'Rapport opgesteld via de virtuele inspectie op locatie', claude: 'Geanalyseerd door Claude', lokaal: 'Lokale tekstherkenning (indicatief)' }[r.methode] || '';
  var samen = t.asbest + ' van de ' + n + ' werkzaamheden raken asbesthoudend materiaal, ' + t.controle + ' vragen controle omdat het rapport ze niet (volledig) afdekt' + (t.geen ? ', en bij ' + t.geen + ' is in het onderzochte materiaal geen asbest aangetoond' : '') + '. Een deskundige beoordeelt de vervolgstap.';
  var topSig = [];
  v.regels.filter(function (x) { return x.signaal === 'asbest'; }).forEach(function (x) { topSig.push(['red', x.item.ruimte + ': ' + lc(x.item.werk) + ' raakt asbest.']); });
  v.regels.filter(function (x) { return x.signaal === 'controle'; }).forEach(function (x) { topSig.push(['orange', x.item.ruimte + ': ' + lc(x.item.werk) + ' is niet (volledig) onderzocht.']); });
  var shown = topSig.slice(0, 4), meer = topSig.length - shown.length;
  var niveauCls = { Hoog: 'red', Midden: 'amber', Laag: 'green' }[v.niveau];
  var ruimtes = []; w.items.forEach(function (i) { if (ruimtes.indexOf(i.ruimte) < 0) ruimtes.push(i.ruimte); });

  var h = '<div class="summary">' + IC.scales + '<div><b>Samenvatting:</b> ' + esc(samen) + '</div></div>';
  h += '<div class="cols3">';
  h += '<div class="card box"><h3>Rapport – Hoofdpunten</h3><ul>' +
    li('Asbestbronnen: ' + rt.asbest + ' gevonden') + li('Niet-asbesthoudend: ' + rt.geen) + li('Uitgesloten of onvolledig: ' + (rt.uitgesloten + rt.onvolledig)) +
    li('Bureau: ' + r.bureau) + li('Geldig tot: ' + (r.geldigTot ? E.fmt(E.parseNL(r.geldigTot)) : 'niet vermeld')) +
    '<li>' + IC.check + '<span>Signaleringsniveau: ' + pill(niveauCls, v.niveau) + '</span></li>' + (bronLabel ? '<li class="sub">' + esc(bronLabel) + '</li>' : '') + '</ul></div>';
  h += '<div class="card box"><h3>Opname – Hoofdpunten</h3><ul>' + li('Werkbon: ' + w.nr + ' (' + w.soort.toLowerCase() + ')') + li('Geplande werkzaamheden: ' + n) +
    '<li>' + IC.check + '<b>Ruimtes:</b></li>' + ruimtes.slice(0, 5).map(function (x) { return '<li class="sub">- ' + esc(x) + '</li>'; }).join('') + (ruimtes.length > 5 ? '<li class="sub">+ ' + (ruimtes.length - 5) + ' meer</li>' : '') +
    li('Start gepland: ' + (w.startGepland ? E.fmt(E.parseNL(w.startGepland)) : '-')) + '</ul></div>';
  h += '<div class="card box"><h3>' + IC.warn + ' Belangrijkste signaleringen</h3><ul>' + shown.map(function (s) { return '<li><span class="dotli ' + s[0] + '"></span><span>' + esc(s[1]) + '</span></li>'; }).join('') + (meer > 0 ? '<li class="sub">+ ' + meer + ' andere werkzaamheden met een signaal</li>' : '') + (topSig.length ? '' : '<li><span class="dotli grey"></span><span>Geen werkzaamheden met een rood of oranje signaal. Laat de deskundige dit bevestigen.</span></li>') + '</ul></div>';
  h += '</div>';

  // 1. vergelijking per werkzaamheid
  h += '<div class="card sec"><h2>1. Vergelijking per werkzaamheid <small>werkbon ' + esc(w.nr) + ' tegen rapport</small></h2><div class="scroll"><table class="stack"><thead><tr><th>Werkzaamheid</th><th>Ruimte</th><th>Geraakte materialen en lagen</th><th>Wat zegt het rapport?</th><th>Signaal</th></tr></thead><tbody>' +
    v.regels.map(function (x) {
      return '<tr><td data-l="Werkzaamheid"><div><b>' + esc(x.item.code) + '</b> ' + esc(x.item.werk) + '</div></td><td data-l="Ruimte"><div>' + esc(x.item.ruimte) + '</div></td><td data-l="Raakt"><div>' +
        x.hits.map(function (hh) { return esc(hh.raakt.label); }).join('<br>') + '</div></td><td data-l="Rapport"><div>' +
        x.hits.map(function (hh) { return '<span class="hitl">' + stPill(hh.status) + (hh.bron ? ' <small>' + esc(hh.bron.id) + '</small>' : '') + '</span>'; }).join('') +
        '<span class="why">' + x.reden.map(esc).join(' ') + '</span></div></td><td data-l="Signaal"><div>' + sigPill(x.signaal) + '</div></td></tr>';
    }).join('') + '</tbody></table></div></div>';

  // 2. rapportoverzicht
  h += '<div class="card sec"><h2>2. Wat staat er in het rapport? <small>' + esc(r.adres) + '</small></h2><div class="tiles">' +
    tile('', rt.asbest + rt.geen + rt.onvolledig, 'onderdelen onderzocht') + tile('red', rt.asbest, 'asbesthoudend') + tile('blue', rt.geen, 'niet-asbesthoudend') + tile('orange', rt.uitgesloten + rt.onvolledig, 'uitgesloten of onvolledig') + '</div>' +
    '<div class="scroll"><table class="stack"><thead><tr><th>Bron</th><th>Materiaal / laag</th><th>Locatie</th><th>Status</th><th>Uitslag</th><th>Hoeveelheid</th><th>Risicoklasse</th></tr></thead><tbody>' +
    r.items.map(function (i) {
      return '<tr><td data-l="Bron"><div>' + esc(i.id) + '</div></td><td data-l="Materiaal"><div>' + esc(i.materiaal) + (i.laag ? '<span class="lyr">achterliggende laag: ' + esc(i.laag) + '</span>' : '') + '</div></td><td data-l="Locatie"><div>' + esc(i.locatie) + '</div></td><td data-l="Status"><div>' + stPill(i.status) + '</div></td><td data-l="Uitslag"><div>' + esc(i.soort) + (i.detail ? '<span class="why">' + esc(i.detail) + '</span>' : '') + '</div></td><td data-l="Hoeveelheid"><div>' + esc(i.hoeveelheid) + '</div></td><td data-l="Risicoklasse"><div>' + esc(i.rk) + '</div></td></tr>';
    }).join('') + '</tbody></table></div></div>';

  // 3. ontbrekende info
  h += '<div class="card sec"><h2>3. Ontbrekende informatie en controlepunten</h2><ul style="list-style:none;margin:0;padding:0">' +
    v.signaleringen.map(function (s) { return '<li style="display:flex;gap:10px;padding:3px 0"><span class="dotli ' + s.lvl + '"></span><span>' + esc(s.t) + '</span></li>'; }).join('') + '</ul>' +
    '<div class="duo"><div class="concl">' + IC.check + '<div><b>Conclusie</b><p>' + esc(conclusie(v)) + '</p></div></div><div class="letop">' + IC.warn + '<div><b>Let op</b><p>AsbestCheck AI geeft geen oordeel of werk veilig is. Ook bij "geen asbest aangetoond" geldt dat alleen het onderzochte materiaal is beoordeeld. De deskundige beslist over de vervolgstap.</p></div></div></div></div>';

  // advies + stappenplan
  var adv = advies(v);
  h += '<div class="advies"><div><h2>' + IC.check + ' Advies voor de projectbegeleider</h2><p>Op basis van het rapport en de opname adviseren wij de volgende acties:</p><ol class="num">' + adv.map(function (a) { return '<li><span><b>' + esc(a[0]) + ':</b> ' + esc(a[1]) + '</span></li>'; }).join('') + '</ol></div>' +
    '<div class="belangrijk"><b>' + IC.check + ' Belangrijk</b>Neem bij twijfel altijd contact op met een deskundige (DIA/DAV of asbestdeskundige). AI signaleert, de deskundige beslist.</div></div>';
  h += '<div class="plan"><div><h2>' + IC.wrench + ' Wat moet de projectbegeleider doen? (Stappenplan)</h2><ol class="num">' + stappen(v).map(function (s) { return '<li><span>' + esc(s) + '</span></li>'; }).join('') + '</ol></div>' +
    '<div class="letop"><b>' + IC.warn + ' Let op</b><p>Werk nooit zelf aan asbesthoudende of niet-onderzochte materialen. Asbest mag alleen door een gecertificeerd saneringsbedrijf worden verwijderd.</p></div></div>';
  var dp = dossierPanel(w);
  h += dp || '<div class="actions"><button class="btn" data-q="Welke informatie ontbreekt in het rapport?">Wat ontbreekt er?</button><span class="muted" style="align-self:center">Losse vergelijking zonder dossier. Via Dossiers loopt het proces door naar de deskundige.</span></div>';
  h += '<div class="feedback">Was dit een nuttig advies? <button data-fb="up" class="' + (S.fb[w.nr] === 'up' ? 'on' : '') + '" title="Ja">' + IC.up + '</button><button data-fb="down" class="' + (S.fb[w.nr] === 'down' ? 'on' : '') + '" title="Nee">' + IC.down + '</button></div>';
  el.innerHTML = h;
  el.querySelectorAll('[data-fb]').forEach(function (b) { b.onclick = function () { S.fb[w.nr] = b.dataset.fb; renderResult(); toast('Bedankt voor je feedback.'); }; });
}
function li(t) { return '<li>' + IC.check + '<span>' + esc(t) + '</span></li>'; }
function tile(c, n, l) { return '<div class="tile ' + c + '"><b>' + n + '</b><span>' + esc(l) + '</span></div>'; }
function conclusie(v) {
  var t = v.tel;
  if (t.asbest + t.controle === 0) return 'Alle werkzaamheden op de werkbon worden in het rapport genoemd en daarin is geen asbest aangetoond. De werkbon gaat ter bevestiging naar de deskundige; dit is geen vrijgave.';
  return 'Het rapport dekt de werkbon niet volledig af: ' + t.asbest + ' werkzaamhe' + (t.asbest === 1 ? 'id raakt' : 'den raken') + ' asbest en ' + t.controle + ' vragen aanvullende controle. De werkbon kan pas worden vrijgegeven na beoordeling door een deskundige.';
}
function advies(v) {
  var a = [], t = v.tel;
  if (t.asbest) a.push(['Sanering eerst', 'Laat de asbesthoudende bronnen bij ' + v.regels.filter(function (x) { return x.signaal === 'asbest'; }).map(function (x) { return 'werkzaamheid ' + x.item.code; }).join(', ') + ' verwijderen door een gecertificeerd bedrijf vóór de start.']);
  if (t.controle) a.push(['Aanvullend onderzoek', 'Vraag aanvullende inventarisatie aan voor ' + v.regels.filter(function (x) { return x.signaal === 'controle'; }).map(function (x) { return x.item.code; }).join(', ') + ': deze werkzaamheden zijn niet (volledig) door het rapport afgedekt.']);
  if (v.regels.some(function (x) { return x.hits.some(function (h) { return h.bron && h.bron.laag; }); })) a.push(['Achterliggende lagen', 'Let op lagen die je niet direct ziet, zoals de onderlaag onder vloerzeil of de lijmlaag achter tegels.']);
  if (v.regels.some(function (x) { return x.hits.some(function (h) { return h.bron && h.bron.urgent; }); })) a.push(['Ruimtes afsluiten', 'Het rapport adviseert betrokken ruimtes gesloten te houden tot de sanering.']);
  a.push(['Planning controleren', 'Houd rekening met de doorlooptijd van sanering en aanvullend onderzoek voordat de werkbon wordt vrijgegeven.']);
  return a.slice(0, 5);
}
function stappen(v) {
  return [
    'Controleer of de werkbon precies beschrijft wat er wordt gesloopt, verwijderd of doorgeboord.',
    'Bekijk per werkzaamheid welke materialen en achterliggende lagen worden geraakt (tabel 1).',
    'Stuur de vergelijking door naar de deskundige en wacht op diens beoordeling.',
    'Laat asbesthoudende materialen verwijderen door een gecertificeerd saneringsbedrijf; start pas na de eindcontrole.',
    'Meld twijfel of onverwachte materialen tijdens het werk direct bij de uitvoerder of deskundige en stop het werk.'
  ];
}

/* ---------- chat ---------- */
var CHIPS = ['Welke geplande werkzaamheden raken asbest?', 'Welke onderdelen zijn uitgesloten of niet onderzocht?', 'Welke achterliggende lagen worden geraakt?', 'Welke informatie ontbreekt in het rapport?', 'Is de badkamer veilig?'];
function renderChips() { $('#chips').innerHTML = (S.rapport && S.werkbon) ? CHIPS.map(function (c) { return '<button type="button" class="chip" data-q="' + esc(c) + '">' + esc(c) + '</button>'; }).join('') : ''; }
function userSay(t) { var d = document.createElement('div'); d.className = 'msg-u'; d.innerHTML = '<div class="bub">' + esc(t) + '</div><div class="ua">' + IC.user + '</div>'; $('#chat').appendChild(d); }
function botSay(html, noNote) {
  var d = document.createElement('div'); d.className = 'msg-a';
  d.innerHTML = '<div class="bot">' + IC.bot + '</div><div style="flex:1"><div class="card"><b>KBK AsbestCheck AI</b><div class="ans">' + html + '</div>' + (noNote ? '' : '<div class="note">' + IC.info + '<span><b>Let op:</b> dit antwoord is gebaseerd op de informatie uit het rapport en de opname. Er worden geen extra aannames gedaan. Een deskundige bepaalt de vervolgstap.</span></div>') + '</div><div class="feedback">Was dit antwoord behulpzaam? <button title="Ja">' + IC.up + '</button><button title="Nee">' + IC.down + '</button></div></div>';
  d.querySelectorAll('.feedback button').forEach(function (b, i) { b.onclick = function () { d.querySelectorAll('.feedback button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on'); }; });
  $('#chat').appendChild(d); return d.querySelector('.ans');
}
$('#ask').addEventListener('submit', function (e) { e.preventDefault(); ask(); });
async function ask() {
  var q = $('#q').value.trim(); if (!q) return; $('#q').value = '';
  userSay(q);
  if (!S.rapport || !S.werkbon) { botSay('<p>Voeg eerst een asbestinventarisatierapport en een werkbon toe (of open een voorbeeld in <b>Mijn rapporten</b>). Daarna kan ik vragen over de vergelijking beantwoorden.</p>', true); return; }
  var v = S.v || E.vergelijk(S.rapport, S.werkbon);
  if (aiOn()) {
    var ans = botSay('<p class="thinking">KBK AsbestCheck AI denkt na…</p>');
    $('#sendBtn').disabled = true;
    try {
      var turns = [{ role: 'user', content: chatContext(v) }, { role: 'assistant', content: 'Begrepen. Ik baseer me alleen op deze gegevens, geef nooit een oordeel dat iets veilig is en verwijs naar een deskundige.' }].concat(S.turns.slice(-6)).concat([{ role: 'user', content: q }]);
      var res = await S.sample(turns, { cache: false, modelTier: 'default', onText: function (o) { ans.innerHTML = md(o.text); } });
      ans.innerHTML = md(res.text);
      S.turns.push({ role: 'user', content: q }, { role: 'assistant', content: res.text });
    } catch (err) {
      if (err && err.code === 'not_granted') S.aiMode = 'local';
      ans.innerHTML = localAnswer(q, v) + '<p class="muted">(Claude was niet beschikbaar; dit antwoord komt van de lokale analyse.)</p>';
    }
    $('#sendBtn').disabled = false;
  } else {
    var a = botSay('<p class="thinking">KBK AsbestCheck AI denkt na…</p>');
    await sleep(450); a.innerHTML = localAnswer(q, v);
  }
  a = null; window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
function chatContext(v) {
  var compact = {
    rapport: { adres: S.rapport.adres, rapportnr: S.rapport.rapportnr, bureau: S.rapport.bureau, datum: S.rapport.rapportdatum, geldigTot: S.rapport.geldigTot, bouwjaar: S.rapport.bouwjaar, reikwijdte: S.rapport.reikwijdte, geschiktheid: S.rapport.geschiktheid, fictief: S.rapport.fictief, bronnen: S.rapport.items, ontbrekend: S.rapport.gaps, geplandInRapport: S.rapport.geplandRapport },
    werkbon: { nr: S.werkbon.nr, adres: S.werkbon.adres, soort: S.werkbon.soort, start: S.werkbon.startGepland, items: S.werkbon.items },
    vergelijking: v.regels.map(function (x) { return { code: x.item.code, werk: x.item.werk, ruimte: x.item.ruimte, signaal: E.SIGNAAL[x.signaal].label, toelichting: x.reden }; }),
    signaleringen: v.signaleringen.map(function (s) { return s.t; })
  };
  return 'Je bent KBK AsbestCheck AI, assistent van projectbegeleiders van KBK Bouwgroep (Volendam). Je vergelijkt een asbestinventarisatierapport met de KBK-opname (werkbon).\n' +
    'REGELS: antwoord in het Nederlands, kort en zakelijk, gebruik een markdown-tabel waar dat helpt. Gebruik ALLEEN de gegevens hieronder (en de rapporttekst als die er is); verzin niets. Zeg NOOIT dat iets veilig is, dat er geen risico is of dat werk zonder maatregelen kan. ' +
    'Gebruik de termen asbesthoudend, niet-asbesthoudend, uitgesloten/niet onderzocht en onvolledig. Benoem geraakte achterliggende lagen. Geef waarschuwingen waar controle nodig is en verwijs voor de beslissing naar een deskundige (DIA/DAV of asbestdeskundige). Als iemand vraagt of iets veilig is: leg uit dat je dat oordeel niet geeft en noem wat je wel ziet.\n\n' +
    'GEGEVENS (JSON):\n' + JSON.stringify(compact) + (S.rText ? '\n\nRAPPORTTEKST (uittreksel):\n' + S.rText.slice(0, 40000) : '');
}
function tbl(head, rows) { return '<div class="scroll"><table class="stack"><thead><tr>' + head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td data-l="' + esc(head[i]) + '"><div>' + c + '</div></td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>'; }
function localAnswer(q, v) {
  var s = q.toLowerCase(), r = S.rapport;
  var room = E.roomsIn(s);
  var regels = room.length ? v.regels.filter(function (x) { return x.item.ruimtes.some(function (z) { return room.indexOf(z) > -1; }); }) : v.regels;
  if (/veilig|gevaarlijk|mag ik|kan ik (gewoon )?(beginnen|starten)|risico ?loos/.test(s)) {
    return '<p>Ik geef geen oordeel of iets <b>veilig</b> is. Dat beslist een deskundige. Wel zie ik het volgende' + (room.length ? ' voor ' + esc(room.join(', ')) : '') + ':</p>' +
      tbl(['Werkzaamheid', 'Rapport', 'Signaal'], (regels.length ? regels : v.regels).map(function (x) { return [esc(x.item.code + ' ' + x.item.werk), esc(x.reden[0] || ''), sigPill(x.signaal)]; })) +
      '<p>Laat de deskundige deze punten beoordelen voordat het werk start.</p>';
  }
  if (/uitgesloten|niet onderzocht|beperking|niet ge(ï|i)nspecteerd|scope/.test(s)) {
    var u = r.items.filter(function (i) { return i.status === 'uitgesloten' || i.status === 'onvolledig'; });
    if (!u.length) return '<p>Het rapport bevat geen aparte lijst met uitgesloten onderdelen.' + (r.key === 'meidoorn' ? ' Wel staat erin dat niet-genoemde of niet-onderzochte onderdelen niet als asbestvrij mogen worden beschouwd.' : '') + ' Alles wat op de werkbon staat maar niet in het rapport, krijgt daarom het signaal "Controle noodzakelijk".</p>' +
      tbl(['Werkzaamheid', 'Niet in rapport'], v.regels.filter(function (x) { return x.signaal === 'controle'; }).map(function (x) { return [esc(x.item.code + ' ' + x.item.werk), esc(x.hits.filter(function (h) { return h.status !== 'asbest' && h.status !== 'geen'; }).map(function (h) { return h.raakt.label; }).join(', '))]; }));
    return '<p>Deze onderdelen zijn in het rapport uitgesloten of onvolledig onderzocht:</p>' + tbl(['Onderdeel', 'Locatie', 'Reden', 'Raakt werkbon?'], u.map(function (i) {
      var raakt = v.regels.filter(function (x) { return x.hits.some(function (h) { return h.bron === i || (h.matches && h.matches.indexOf(i) > -1); }); }).map(function (x) { return x.item.code; });
      return [esc(i.materiaal), esc(i.locatie), esc(i.methode + (i.detail ? '. ' + i.detail : '')), raakt.length ? pill('orange', 'Ja: ' + raakt.join(', ')) : pill('grey', 'Nee')];
    })) + '<p>Raakt een werkzaamheid een uitgesloten onderdeel, dan is aanvullend onderzoek nodig vóór de start.</p>';
  }
  if (/laag|lagen|achterliggend|onderlaag|lijm/.test(s)) {
    var rows = [];
    regels.forEach(function (x) { x.hits.forEach(function (h) { if (/lijm|onderlaag|backing|achter|onder|ruimte boven|koof|schacht/i.test(h.raakt.label + ' ' + (h.bron && h.bron.laag || ''))) rows.push([esc(x.item.code + ' ' + x.item.ruimte), esc(h.raakt.label), stPill(h.status), esc(h.bron ? h.bron.id + (h.bron.laag ? ' (' + h.bron.laag + ')' : '') : 'Niet in rapport')]); }); });
    return '<p>Deze werkzaamheden raken lagen die je niet direct ziet:</p>' + (rows.length ? tbl(['Werkzaamheid', 'Achterliggende laag', 'Status rapport', 'Bron'], rows) : '<p>Geen achterliggende lagen herkend op de werkbon.</p>') + '<p>Een laag die niet in het rapport staat, is daarmee niet onderzocht. Laat dit controleren.</p>';
  }
  if (/ontbre|mist|volledig|tegenstrijd|klopt|fout/.test(s)) {
    return '<p>Bij het controleren van het rapport vallen deze punten op:</p><ul>' + v.signaleringen.map(function (x) { return '<li>' + esc(x.t) + '</li>'; }).join('') + '</ul><p>Laat de deskundige deze punten nagaan bij het inventarisatiebureau.</p>';
  }
  if (/advies|wat moet|stappen|doen|vervolg/.test(s)) {
    return '<p>Advies op basis van rapport en opname:</p><ol>' + advies(v).map(function (a) { return '<li><b>' + esc(a[0]) + ':</b> ' + esc(a[1]) + '</li>'; }).join('') + '</ol>';
  }
  if (/asbesthoudend|asbestbron|bronnen|asbest/.test(s) && !/werkzaamhe|gepland/.test(s)) {
    var a = r.items.filter(function (i) { return i.status === 'asbest'; });
    return '<p>Het rapport noemt ' + a.length + ' asbesthoudende bron' + (a.length === 1 ? '' : 'nen') + ':</p>' + tbl(['Bron', 'Materiaal', 'Locatie', 'Asbestsoort', 'Hoeveelheid', 'Risicoklasse'], a.map(function (i) { return [esc(i.id), esc(i.materiaal), esc(i.locatie), esc(i.soort), esc(i.hoeveelheid), esc(i.rk)]; }));
  }
  // standaard: geplande werkzaamheden en relevante bronnen (zoals scherm 1)
  return '<p>' + (room.length ? 'Voor ' + esc(room.join(', ')) + ' staan' : 'Op de werkbon staan') + ' de volgende geplande werkzaamheden, met de bijbehorende asbestbronnen uit het rapport:</p>' +
    tbl(['Werkzaamheid', 'Locatie', 'Geplande periode', 'Relevante asbestbronnen', 'Signaal'], regels.map(function (x) {
      var b = x.hits.filter(function (h) { return h.bron; }).map(function (h) { return esc(h.bron.id + ': ' + h.bron.materiaal) + ' <small>(' + esc(E.STATUS[h.status].label.toLowerCase()) + ')</small>'; });
      return [esc(x.item.werk), esc(x.item.ruimte), esc(x.item.planning || '-'), b.length ? b.join('<br>') : '<i>Niet in rapport</i>', sigPill(x.signaal)];
    })) +
    '<h4>Toelichting:</h4><ul>' + regels.filter(function (x) { return x.signaal === 'asbest' || x.signaal === 'controle'; }).slice(0, 4).map(function (x) { return '<li>' + esc(x.item.ruimte + ': ' + x.reden[0]) + '</li>'; }).join('') + '</ul>';
}
function md(t) {
  var lines = esc(t).split('\n'), out = '', inList = null, tableRows = [];
  function inline(s) { return s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>').replace(/`(.+?)`/g, '<code>$1</code>'); }
  function flushT() { if (!tableRows.length) return; var rows = tableRows.filter(function (r) { return !/^\|?\s*:?-{2,}/.test(r); }).map(function (r) { return r.replace(/^\||\|$/g, '').split('|').map(function (c) { return inline(c.trim()); }); }); out += '<div class="scroll"><table><thead><tr>' + rows[0].map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.slice(1).map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>'; tableRows = []; }
  function flushL() { if (inList) { out += '</' + inList + '>'; inList = null; } }
  lines.forEach(function (l) {
    if (/^\s*\|/.test(l)) { flushL(); tableRows.push(l.trim()); return; } flushT();
    var m;
    if ((m = /^#{1,4}\s+(.*)/.exec(l))) { flushL(); out += '<h4>' + inline(m[1]) + '</h4>'; }
    else if ((m = /^\s*[-*•]\s+(.*)/.exec(l))) { if (inList !== 'ul') { flushL(); out += '<ul>'; inList = 'ul'; } out += '<li>' + inline(m[1]) + '</li>'; }
    else if ((m = /^\s*\d+[.)]\s+(.*)/.exec(l))) { if (inList !== 'ol') { flushL(); out += '<ol>'; inList = 'ol'; } out += '<li>' + inline(m[1]) + '</li>'; }
    else if (l.trim()) { flushL(); out += '<p>' + inline(l) + '</p>'; }
    else flushL();
  });
  flushT(); flushL(); return out;
}

/* ---------- opname (werkbon-editor) ---------- */
var MATS = [['vloerzeil', 'vloer', 'Vloerzeil/vinyl + onderlaag'], ['tegellijm', 'wand', 'Tegellijm achter wandtegels'], ['tegellijm', 'vloer', 'Tegellijm onder vloertegels'], ['plafond', 'plafond', 'Plafond / ruimte erboven'], ['koof', null, 'Leidingkoof / schacht'], ['ventilatie', 'wand', 'Ventilatiekanaal'], ['kit', 'kozijn', 'Kit rond kozijnen'], ['beglazingskit', 'kozijn', 'Beglazingskit / stopverf'], ['vensterbank', 'kozijn', 'Vensterbank'], ['kozijn', 'kozijn', 'Kozijnaansluiting'], ['plaat', 'wand', 'Plaat / beplating'], ['leidingisolatie', null, 'Leidingisolatie'], ['dakplaten', 'dak', 'Dak- of golfplaten'], ['keukenblok', null, 'Keukenblok'], ['radiator', null, 'Radiatoren/pakkingen'], ['spouw', 'wand', 'Spouw'], ['kruipruimte', 'vloer', 'Kruipruimte'], ['wand', 'wand', 'Binnenwand (bouwkundig)'], ['verf', 'wand', 'Alleen schilderwerk']];
var ROOMS = E.VOCAB_R.filter(function (r) { return r !== '*'; });
var OP = null;
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function newOpname() {
  return { key: 'eigen', nr: 'KBK-WB-2026-' + (200 + Math.floor(Math.random() * 700)), soort: 'Mutatie', object: 'Woning', adres: '', postcode: '', opdrachtgever: '', projectbegeleider: 'R. Veerman', opnamedatum: vandaag(), startGepland: '', bouwjaar: null, bewoond: 'Leeg (mutatie)', items: [{ code: '01', ruimte: 'Badkamer', ruimtes: ['badkamer'], werk: '', raakt: [], destructief: true, planning: '' }], opmerkingen: '' };
}
function renderOpname() {
  if (!OP) { var open0 = P.dossiers.filter(function (d) { return d.stap === 0; })[0]; OP = JSON.parse(JSON.stringify(open0 ? open0.werkbon : (S.werkbon || D.WERKBONNEN[0]))); }
  var el = $('#view-opname');
  var h = '<div class="actions" style="margin:0 0 12px"><label class="muted" style="display:flex;gap:8px;align-items:center">Werkbon <select id="opPick" class="btn sm">' + P.dossiers.map(function (d) { return d.werkbon; }).map(function (w) { return '<option value="' + esc(w.nr) + '"' + (OP.nr === w.nr ? ' selected' : '') + '>' + esc(w.nr + ' – ' + w.adres.split(',')[0]) + '</option>'; }).join('') + '</select></label><button class="btn sm" id="opNew">Nieuwe lege opname</button></div>';
  h += '<div class="card"><div class="form">' +
    fld('nr', 'Werkbonnummer') + fld('adres', 'Adres (straat, postcode, plaats)') + fld('postcode', 'Postcode') + fld('soort', 'Soort werk') + fld('projectbegeleider', 'Projectbegeleider') + fld('opnamedatum', 'Opnamedatum') + fld('startGepland', 'Start gepland (jjjj-mm-dd)') + fld('bouwjaar', 'Bouwjaar') + '</div></div>';
  h += '<div class="card sec"><h2>Werkzaamheden <small>per ruimte, met de materialen en lagen die geraakt worden</small></h2><div class="scroll"><table class="op stack"><thead><tr><th>#</th><th>Ruimte</th><th>Werkzaamheid</th><th>Raakt materialen / lagen</th><th>Destructief</th><th></th></tr></thead><tbody>' +
    OP.items.map(function (it, i) {
      return '<tr><td data-l="#"><div>' + esc(it.code) + '</div></td><td data-l="Ruimte"><div><select data-i="' + i + '" data-f="ruimte">' + ROOMS.map(function (r) { return '<option value="' + r + '"' + (it.ruimtes[0] === r ? ' selected' : '') + '>' + cap(r) + '</option>'; }).join('') + '</select>' + (it.ruimtes.length > 1 ? '<small class="muted"> + ' + esc(it.ruimtes.slice(1).join(', ')) + '</small>' : '') + '</div></td>' +
        '<td data-l="Werkzaamheid" style="min-width:220px"><textarea data-i="' + i + '" data-f="werk">' + esc(it.werk) + '</textarea></td>' +
        '<td data-l="Raakt" style="min-width:300px"><div class="mats">' + MATS.map(function (m, k) { var on = it.raakt.some(function (t) { return t.canon === m[0] && (t.pos || null) === m[1]; }) || (m[0] === 'tegellijm' && it.raakt.some(function (t) { return t.canon === 'tegellijm' && !t.pos; })); return '<label class="' + (on ? 'on' : '') + '"><input type="checkbox" data-i="' + i + '" data-m="' + k + '"' + (on ? ' checked' : '') + '>' + esc(m[2]) + '</label>'; }).join('') + '</div></td>' +
        '<td data-l="Destructief"><div><input type="checkbox" data-i="' + i + '" data-f="destructief"' + (it.destructief ? ' checked' : '') + '></div></td><td><button class="x" data-del="' + i + '" title="Regel verwijderen">×</button></td></tr>';
    }).join('') + '</tbody></table></div><div class="actions"><button class="btn" id="opAdd">+ Werkzaamheid toevoegen</button><button class="btn pri" id="opShare">Deel met kantoor</button></div></div>';
  h += '<p class="muted" style="margin:12px 2px 24px">Tip: de projectbegeleider vult dit op locatie in (tablet of telefoon). Bij "Deel met kantoor" komt de werkbon in het dossieroverzicht bij de werkvoorbereiding.</p>';
  el.innerHTML = h;
  el.querySelectorAll('[data-k]').forEach(function (inp) { inp.oninput = function () { OP[inp.dataset.k] = inp.dataset.k === 'bouwjaar' ? (+inp.value || null) : inp.value; if (inp.dataset.k === 'postcode') OP.postcode = inp.value.replace(/\s/g, '').toUpperCase(); }; });
  el.querySelectorAll('[data-f]').forEach(function (inp) {
    inp.onchange = inp.oninput = function () {
      var it = OP.items[+inp.dataset.i];
      if (inp.dataset.f === 'ruimte') { it.ruimtes = [inp.value]; it.ruimte = cap(inp.value); }
      else if (inp.dataset.f === 'destructief') it.destructief = inp.checked; else it.werk = inp.value;
    };
  });
  el.querySelectorAll('[data-m]').forEach(function (cb) {
    cb.onchange = function () {
      var it = OP.items[+cb.dataset.i], m = MATS[+cb.dataset.m];
      it.raakt = it.raakt.filter(function (t) { return !(t.canon === m[0] && ((t.pos || null) === m[1] || !t.pos)); });
      if (cb.checked) it.raakt.push({ canon: m[0], label: m[2], pos: m[1] });
      cb.parentNode.classList.toggle('on', cb.checked);
    };
  });
  el.querySelectorAll('[data-del]').forEach(function (b) { b.onclick = function () { OP.items.splice(+b.dataset.del, 1); renum(); renderOpname(); }; });
  $('#opAdd').onclick = function () { OP.items.push({ code: '', ruimte: 'Keuken', ruimtes: ['keuken'], werk: '', raakt: [], destructief: true, planning: '' }); renum(); renderOpname(); };
  $('#opNew').onclick = function () { OP = newOpname(); renderOpname(); };
  $('#opPick').onchange = function () { OP = JSON.parse(JSON.stringify(dos($('#opPick').value).werkbon)); renderOpname(); };
  $('#opShare').onclick = function () {
    var w = JSON.parse(JSON.stringify(OP));
    w.items = w.items.filter(function (i) { return i.werk.trim(); });
    if (!w.items.length) { toast('Vul minstens één werkzaamheid in.'); return; }
    if (!w.adres.trim()) { toast('Vul het adres in.'); return; }
    w.items.forEach(function (i) { if (!i.raakt.length) i.raakt = [{ canon: 'overig', label: 'Niet opgegeven', pos: null }]; i.ruimte = i.ruimte || cap(i.ruimtes[0]); });
    if (!w.postcode) { var pc = /(\d{4})\s?([A-Z]{2})/i.exec(w.adres); if (pc) w.postcode = (pc[1] + pc[2]).toUpperCase(); }
    var d = dos(w.nr);
    if (!d) { d = { nr: w.nr, werkbon: w, stap: 0, rapportKey: null, rapport: null, besluit: null, opmerking: '', log: [{ t: nu(), wie: ROLES[USER || 'pb'].wie, wat: 'Opname gemaakt op locatie' }] }; P.dossiers.unshift(d); }
    d.werkbon = w;
    if (d.stap === 0) { d.stap = 1; logD(d, 'Werkbon gedeeld met kantoor'); toast('Werkbon ' + w.nr + ' gedeeld met kantoor.'); }
    else { logD(d, 'Werkbon bijgewerkt'); toast('Werkbon bijgewerkt.'); }
    saveP(); show('dossiers');
  };
}
function renum() { OP.items.forEach(function (it, i) { it.code = ('0' + (i + 1)).slice(-2); }); }
function fld(k, l) { return '<label>' + esc(l) + '<input data-k="' + k + '" value="' + esc(OP[k] == null ? '' : OP[k]) + '"></label>'; }

/* ---------- inloggen, rollen en dossiers (procesflow) ---------- */
var ROLES = {
  pb: { naam: 'Projectbegeleider', user: 'raphael', email: 'raphael@example.com', wie: 'R. Veerman (projectbegeleider)', taak: 'Opname maken op locatie en delen met kantoor' },
  kantoor: { naam: 'Werkvoorbereiding (kantoor)', user: 'kantoor', email: 'kantoor@example.com', wie: 'Werkvoorbereiding KBK', taak: 'Inventarisatie aanvragen, rapport koppelen en AI-vergelijking starten' },
  inv: { naam: 'Asbestinventariseerder (extern)', user: 'inventariseerder', email: 'inventariseerder@example.com', wie: 'M. de Boer (Noord-Holland Inspecties, extern)', taak: 'Extern bureau: inspecteert de woning in het eigen systeem en mailt alleen het rapport naar KBK' },
  desk: { naam: 'Asbestdeskundige', user: 'deskundige', email: 'deskundige@example.com', wie: 'Asbestdeskundige', taak: 'Signalen beoordelen en besluiten' }
};
var DEMO_PW = 'kbk2026';
var STAPPEN = ['Opname', 'Gedeeld', 'Inspectie op locatie', 'Rapport ontvangen', 'Gekoppeld', 'AI-vergelijking', 'Bij deskundige', 'Besluit'];
var AAN_ZET = ['pb', 'kantoor', 'inv', 'kantoor', 'kantoor', 'kantoor', 'desk', null];
var BESLUIT = { akkoord: ['green', 'Akkoord: werkbon vrijgegeven'], sanering: ['red', 'Eerst sanering, daarna uitvoering'], aanvullend: ['orange', 'Aanvullend onderzoek nodig'] };
var USER = null, P = null;
function nu() { var d = new Date(); return E.fmt(d) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
function bureauVan(key) { return { meidoorn: 'Noord-Holland Inspecties (fictief)', teststraat: 'J. Voorbeeld (fictief)', valerius: 'Van Santen Advies', smalthof: 'SGI Compliance Consultancy', struisgras: 'SSBA B.V.' }[key] || 'Inventarisatiebureau'; }
function seed() {
  var stap = { meidoorn: 0, teststraat: 6, valerius: 6, smalthof: 7, struisgras: 7 };
  var p = { v: 2, dossiers: [], mails: [] };
  D.WERKBONNEN.forEach(function (w) {
    var s = stap[w.key], log = [{ t: w.opnamedatum, wie: w.projectbegeleider + ' (projectbegeleider)', wat: 'Opname gemaakt op locatie' }];
    if (s >= 1) log.push({ t: w.opnamedatum, wie: w.projectbegeleider + ' (projectbegeleider)', wat: 'Werkbon gedeeld met kantoor' });
    if (s >= 2) log.push({ t: w.opnamedatum, wie: 'Werkvoorbereiding KBK', wat: 'Asbestinventarisatie aangevraagd bij ' + bureauVan(w.key) });
    var r = D.RAPPORTEN.filter(function (x) { return x.key === w.key; })[0];
    if (s >= 3) log.push({ t: r.onderzoeksdatum || r.rapportdatum, wie: ROLES.inv.wie, wat: 'Inspectie op locatie uitgevoerd en rapport verstuurd' });
    if (s >= 3) { log.push({ t: r.rapportdatum, wie: 'Outlook', wat: 'Rapport ontvangen: ' + r.bestand }); p.mails.push({ id: 'm-' + w.key, van: bureauVan(w.key), tijd: r.rapportdatum, bestand: r.bestand, adres: r.adres, rapportKey: r.key, nr: s >= 4 ? w.nr : null }); }
    if (s >= 4) log.push({ t: r.rapportdatum, wie: 'AI-agent', wat: 'Rapport gelezen en gekoppeld aan de opname op postcode ' + r.postcode });
    if (s >= 5) log.push({ t: r.rapportdatum, wie: 'KBK AsbestCheck AI', wat: 'Automatisch: vergelijking rapport en werkbon gemaakt' });
    if (s >= 6) log.push({ t: r.rapportdatum, wie: 'KBK AsbestCheck AI', wat: 'Automatisch doorgestuurd naar de deskundige' });
    var d = { nr: w.nr, werkbon: w, stap: s, rapportKey: s >= 4 ? r.key : null, rapport: null, besluit: null, opmerking: '', log: log };
    if (w.key === 'smalthof') { d.besluit = 'sanering'; d.opmerking = 'Lijmlagen achter de tegels en vensterbanken eerst laten saneren (RK1/RK2). Doorbraak woonkamer: aanvullend onderzoek, rapport is daar niet geschikt voor bouwkundige ingrepen.'; log.push({ t: '29-01-2026', wie: 'Asbestdeskundige', wat: 'Besluit: eerst sanering' }); }
    if (w.key === 'struisgras') { d.besluit = 'aanvullend'; d.opmerking = 'Aanvullend destructief onderzoek: wandtegels keuken, tegelwerk badkamer, beplating onder deuren en kruipruimte. Monsternummer B3528 laten verklaren door het bureau.'; log.push({ t: '14-02-2025', wie: 'Asbestdeskundige', wat: 'Besluit: aanvullend onderzoek nodig' }); }
    p.dossiers.push(d);
  });
  return p;
}
function saveP() { renderTour(); try { localStorage.setItem('kbk-proces', JSON.stringify(P)); } catch (e) {} }
function loadP() { try { P = JSON.parse(localStorage.getItem('kbk-proces')); } catch (e) { P = null; } if (!P || !P.dossiers || P.v !== 2) { P = seed(); saveP(); } }
function dos(nr) { return P.dossiers.filter(function (d) { return d.nr === nr; })[0]; }
function logD(d, wat) { d.log.push({ t: nu(), wie: USER ? ROLES[USER].wie : '-', wat: wat }); }
function rapportVan(d) { if (d.rapport) return d.rapport; var r = D.RAPPORTEN.filter(function (x) { return x.key === d.rapportKey; })[0]; if (!r) return null; r = JSON.parse(JSON.stringify(r)); r.methode = 'bekend'; return r; }
function mijnBeurt(d) { return USER && AAN_ZET[d.stap] === USER; }

function stepper(d) {
  return '<div class="stepper">' + STAPPEN.map(function (s, i) { var c = i < d.stap ? 'done' : i === d.stap ? (d.stap === 7 ? 'done' : 'now') : ''; return '<span class="st ' + c + '"><i>' + (i < d.stap || (i === 7 && d.stap === 7) ? '✓' : i + 1) + '</i>' + esc(s) + '</span>'; }).join('') + '</div>';
}
function actiesVoor(d) {
  var a = [];
  if (USER === 'pb' && d.stap === 0) a.push('<button class="btn pri sm" data-act="open-opname" data-nr="' + esc(d.nr) + '">Opname afronden en delen</button>');
  if (USER === 'kantoor' && d.stap === 1) a.push('<button class="btn pri sm" data-act="aanvragen" data-nr="' + esc(d.nr) + '">Inventarisatie aanvragen</button>');
  if (USER === 'inv' && d.stap === 2) a.push('<button class="btn pri sm" data-act="inspectie" data-nr="' + esc(d.nr) + '">Start inspectie op locatie</button>');
  if (USER === 'kantoor' && d.stap === 3) a.push('<button class="btn pri sm" data-act="go-inbox">Naar inbox: handmatig koppelen</button>');
  if (USER === 'kantoor' && d.stap === 4) a.push('<button class="btn pri sm" data-act="vergelijk" data-nr="' + esc(d.nr) + '">Start AI-vergelijking</button>');
  if (d.stap >= 5) a.push('<button class="btn ' + (mijnBeurt(d) ? 'pri ' : '') + 'sm" data-act="vergelijk" data-nr="' + esc(d.nr) + '">' + (USER === 'desk' && d.stap === 6 ? 'Beoordelen' : 'Bekijk vergelijking') + '</button>');
  return a.join('');
}
function renderDossiers() {
  var el = $('#view-dossiers'); if (!el) return;
  var mine = P.dossiers.filter(mijnBeurt).length;
  var h = '<div class="summary">' + IC.scales + '<div><b>Ingelogd als ' + esc(ROLES[USER].naam) + '.</b> ' + esc(ROLES[USER].taak) + '. ' + (mine ? 'Er ' + (mine === 1 ? 'staat 1 dossier' : 'staan ' + mine + ' dossiers') + ' op jou te wachten.' : 'Er wacht nu niets op jou.') + '</div></div>';
  h += '<div class="dbar"><span class="muted">' + P.dossiers.length + ' dossiers</span><button class="btn pri sm" id="nieuwTest">+ Nieuw testdossier</button></div>';
  h += P.dossiers.map(function (d) {
    var w = d.werkbon, b = d.besluit ? BESLUIT[d.besluit] : null, wacht = AAN_ZET[d.stap];
    return '<div class="card dossier' + (mijnBeurt(d) ? ' mine' : '') + '"><div class="dhead"><div><b>' + esc(w.adres) + '</b><small>' + esc(w.nr) + ' • ' + esc(w.soort) + ' • projectbegeleider ' + esc(w.projectbegeleider) + '</small></div><div class="row">' +
      (b ? pill(b[0], b[1]) : pill(mijnBeurt(d) ? 'blue' : 'grey', mijnBeurt(d) ? 'Jij bent aan zet' : 'Wacht op ' + ROLES[wacht].naam.toLowerCase())) + '</div></div>' + procesVisueel(d) + stepper(d) +
      (d.opmerking ? '<p class="dnote"><b>Deskundige:</b> ' + esc(d.opmerking) + '</p>' : '') +
      '<div class="actions" style="margin-top:8px">' + actiesVoor(d) + '</div><details><summary>Logboek (' + d.log.length + ')</summary><ul class="log">' + d.log.map(function (l) { return '<li><span>' + esc(l.t) + '</span> <b>' + esc(l.wie) + '</b>: ' + esc(l.wat) + '</li>'; }).join('') + '</ul></details></div>';
  }).join('');
  h += '<p class="muted" style="margin:14px 2px 24px">Tip voor de presentatie: start de rondleiding (inlogscherm of Instellingen), dan word je stap voor stap langs alle rollen geleid. Wissel van rol via je naam rechtsboven. De voortgang blijft bewaard in deze browser; terugzetten kan bij Instellingen.</p>';
  el.innerHTML = h;
  $('#nieuwTest').onclick = nieuwTestdossier;
}
function nieuwTestdossier() {
  P.teller = (P.teller || 0) + 1;
  var bron = D.WERKBONNEN[(P.teller - 1) % D.WERKBONNEN.length], w = JSON.parse(JSON.stringify(bron));
  w.nr = 'KBK-WB-2026-' + (200 + P.teller); w.opnamedatum = E.fmt(new Date());
  P.dossiers.unshift({ nr: w.nr, werkbon: w, stap: 0, rapportKey: null, rapport: null, besluit: null, opmerking: '', log: [{ t: nu(), wie: w.projectbegeleider + ' (projectbegeleider)', wat: 'Opname gemaakt op locatie (testdossier)' }] });
  if (P.tour) P.tour = w.nr;
  saveP(); renderDossiers(); toast('Testdossier ' + w.nr + ' (' + w.adres.split(',')[0] + ') staat klaar bij de projectbegeleider.');
}
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-act]'); if (!b) return;
  var d = b.dataset.nr ? dos(b.dataset.nr) : null, act = b.dataset.act;
  if (act === 'open-opname') { OP = JSON.parse(JSON.stringify(d.werkbon)); show('opname'); return; }
  if (act === 'aanvragen') { d.stap = 2; logD(d, 'Asbestinventarisatie aangevraagd'); saveP(); renderDossiers(); toast('Aanvraag verstuurd naar het inventarisatiebureau.'); return; }
  if (act === 'ontvang') {
    var r = D.RAPPORTEN.filter(function (x) { return x.postcode === d.werkbon.postcode; })[0];
    if (!r) { toast('Geen voorbeeldrapport voor dit adres. Sleep de PDF in de inbox.'); show('rapporten'); return; }
    P.mails.unshift({ id: 'm-' + Date.now(), van: bureauVan(r.key), tijd: nu(), bestand: r.bestand, adres: r.adres, rapportKey: r.key, nr: null });
    d.stap = 3; d.log.push({ t: nu(), wie: 'Outlook', wat: 'Rapport ontvangen: ' + r.bestand }); saveP(); show('rapporten'); toast('Nieuwe mail met rapport in de inbox.'); return;
  }
  if (act === 'go-inbox') { show('rapporten'); return; }
  if (act === 'inspectie') { startInspectie(d.nr); return; }
  if (act === 'koppel') { koppelMail(b.dataset.id, b.dataset.to || null); return; }
  if (act === 'vergelijk') { openDossier(d.nr); return; }
  if (act === 'besluit') {
    var dd = dos(b.dataset.nr); dd.besluit = b.dataset.b; dd.opmerking = ($('#deskNote') || {}).value || ''; dd.stap = 7;
    logD(dd, 'Besluit: ' + BESLUIT[dd.besluit][1].toLowerCase()); saveP(); renderResult(); toast('Besluit vastgelegd. De projectbegeleider ziet dit in het dossier.'); return;
  }
  if (act === 'naar-desk') { var d2 = dos(b.dataset.nr); d2.stap = 6; logD(d2, 'Doorgestuurd naar de deskundige'); saveP(); renderResult(); toast('Doorgestuurd naar de deskundige.'); return; }
});
var AUTO_BUSY = {};
function autoVerwerk(nr, mid) {
  var d = dos(nr); if (!d || d.stap < 3 || d.stap > 5 || AUTO_BUSY[nr]) return;
  AUTO_BUSY[nr] = 1;
  var m = (mid && P.mails.filter(function (x) { return x.id === mid; })[0]) || P.mails.filter(function (x) { return x.nr === nr; })[0] || P.mails.filter(function (x) { return !x.nr && !x.geenMatch; })[0];
  var r = m ? (m.rapport || D.RAPPORTEN.filter(function (x) { return x.key === m.rapportKey; })[0]) : rapportVan(d);
  var ol = agentBox(), t0 = Date.now();
  var tel = { asbest: 0, geen: 0, uitgesloten: 0, onvolledig: 0 }; (r && r.items || []).forEach(function (i) { if (tel[i.status] != null) tel[i.status]++; });
  var stappen = [];
  if (d.stap === 3) stappen.push(
    ['mail', 'Nieuwe mail van ' + (m ? m.van : 'asbestbureau') + ': "' + (m && m.onderwerp ? m.onderwerp : 'Asbestinventarisatie ' + (r ? r.adres.split(',')[0] : '')) + '"'],
    ['pdf', 'Bijlage geopend: ' + (r ? r.bestand : '') + (r && r.paginas ? ' (' + r.paginas + " pagina's)" : '')],
    ['lees', 'Gelezen: adres ' + (r ? r.adres : '-') + (r && r.rapportnr ? ', rapport ' + r.rapportnr : '')],
    ['zoek', 'Opnames in de KBK-app doorzocht op postcode ' + (r ? r.postcode : '')],
    ['koppel', 'Gekoppeld aan opname ' + d.nr + ' van ' + d.werkbon.projectbegeleider + ' (' + d.werkbon.opnamedatum + ')', function () { if (m && !m.nr) koppelMail(m.id, d.nr, true, true); else if (d.stap === 3) { d.stap = 4; saveP(); } }]
  );
  if (d.stap <= 4) stappen.push(
    ['bron', (r ? r.items.length : 0) + ' bronnen herkend: ' + tel.asbest + ' asbesthoudend, ' + tel.geen + ' niet-asbesthoudend, ' + (tel.uitgesloten + tel.onvolledig) + ' uitgesloten of onvolledig'],
    ['ai', 'Vergeleken met ' + d.werkbon.items.length + ' werkzaamheden en de geraakte lagen', function () {
      var v = null; try { v = E.vergelijk(rapportVan(d), d.werkbon); } catch (e) {}
      var n = v ? v.regels.filter(function (x) { return x.signaal === 'asbest' || x.signaal === 'controle'; }).length : 0;
      d.stap = 5; d.log.push({ t: nu(), wie: 'KBK AsbestCheck AI', wat: 'Automatisch: vergelijking gemaakt, ' + n + ' werkzaamheden met een signaal' }); saveP();
      return n + ' werkzaamheden met een signaal (asbest of controle nodig)';
    }]
  );
  stappen.push(['desk', 'Dossier met signalen doorgestuurd naar de deskundige', function () { d.stap = 6; d.log.push({ t: nu(), wie: 'AI-agent', wat: 'Automatisch doorgestuurd naar de deskundige' }); saveP(); }]);
  var i = 0;
  (function volgende() {
    if (i >= stappen.length) {
      AUTO_BUSY[nr] = 0;
      var li = document.createElement('li'); li.className = 'ag-ok'; li.innerHTML = '<b>Klaar in ' + Math.max(1, Math.round((Date.now() - t0) / 1000)) + ' seconden.</b> KBK hoefde niets te doen.'; ol.appendChild(li);
      verversView(); setTimeout(function () { var bx = $('#agent'); if (bx && bx.contains(ol)) bx.hidden = true; }, 9000); return;
    }
    var st = stappen[i++], li = document.createElement('li'); li.className = 'busy'; li.textContent = st[1]; ol.appendChild(li);
    setTimeout(function () {
      var extra = st[2] ? st[2]() : null; li.className = 'done';
      if (typeof extra === 'string') { var sm = document.createElement('small'); sm.textContent = extra; li.appendChild(sm); }
      verversView(); volgende();
    }, 1000);
  })();
}
function zoekDossier(r) { return P.dossiers.filter(function (x) { return x.stap >= 1 && x.stap <= 3 && ((r.postcode && x.werkbon.postcode === r.postcode) || straat(x.werkbon.adres) === straat(r.adres)); })[0] || null; }
function agentBox() {
  var box = $('#agent');
  if (!box) { box = document.createElement('div'); box.id = 'agent'; box.className = 'agent'; document.body.appendChild(box); }
  box.innerHTML = '<div class="ag-h"><span class="ag-dot"></span><b>AI-agent KBK</b><small>bewaakt asbest@kbk-bouwgroep.nl</small><button class="ag-x" aria-label="Sluiten">×</button></div><ol class="ag-l"></ol>';
  box.hidden = false; box.querySelector('.ag-x').onclick = function () { box.hidden = true; };
  return box.querySelector('.ag-l');
}
/* mail komt binnen bij KBK: de agent neemt het over */
function mailBinnen(m, r) {
  P.mails.unshift(m);
  var d = zoekDossier(r);
  if (d) { d.stap = 3; d.log.push({ t: nu(), wie: 'Outlook', wat: 'Mail met rapport ontvangen: ' + m.bestand }); saveP(); autoVerwerk(d.nr, m.id); return; }
  saveP();
  var ol = agentBox(), lines = [['Nieuwe mail van ' + m.van + ': "' + m.onderwerp + '"'], ['Bijlage geopend: ' + m.bestand], ['Gelezen: adres ' + (r.adres || 'niet gevonden') + (r.postcode ? ', postcode ' + r.postcode : '')], ['Opnames in de KBK-app doorzocht']], i = 0;
  (function volgende() {
    if (i >= lines.length) {
      m.geenMatch = true; saveP();
      var li = document.createElement('li'); li.className = 'ag-q'; li.innerHTML = '<b>Vraag aan kantoor:</b> geen open opname gevonden voor dit adres. Een medewerker koppelt het rapport handmatig in de inbox. Verder doet de agent alles zelf.'; ol.appendChild(li);
      verversView(); return;
    }
    var li = document.createElement('li'); li.className = 'busy'; li.textContent = lines[i++][0]; ol.appendChild(li);
    setTimeout(function () { li.className = 'done'; volgende(); }, 1000);
  })();
}
/* nagebootst Outlook-venster */
function openMailer(o) {
  o = o || {};
  var r = o.r || null, w = o.d ? o.d.werkbon : null;
  var el = $('#mailer'); if (!el) { el = document.createElement('div'); el.id = 'mailer'; el.className = 'mailer'; document.body.appendChild(el); }
  var adres = r ? r.adres : w ? w.adres : '';
  el.innerHTML = '<div class="ml-win"><div class="ml-bar"><b>Outlook</b><span>Nieuw bericht</span><button class="ag-x" id="mlX" aria-label="Sluiten">×</button></div>' +
    '<label>Van<input id="mlVan" value="m.deboer@nh-inspecties.example"></label><label>Aan<input id="mlAan" value="asbest@kbk-bouwgroep.nl"></label>' +
    '<label>Onderwerp<input id="mlOnd" value="' + esc('Asbestinventarisatie ' + (adres ? adres.split(',')[0] : '')) + '"></label>' +
    '<textarea id="mlBody">' + esc('Beste KBK,\n\nIn de bijlage het asbestinventarisatierapport' + (adres ? ' voor ' + adres : '') + '.\n\nMet vriendelijke groet,\nM. de Boer\nNoord-Holland Inspecties (fictief)') + '</textarea>' +
    '<div class="ml-att" id="mlAtt">' + (r ? '<span class="chip">📎 ' + esc(r.bestand) + '</span>' : '<span class="muted">Nog geen bijlage</span>') + '<label class="btn sm">Andere PDF bijvoegen<input type="file" id="mlFile" accept="application/pdf" hidden></label></div>' +
    '<p class="muted ml-note">Dit is een nagebootst Outlook-venster: de mail gaat niet echt over internet, maar komt direct binnen bij de AI-agent van KBK.</p>' +
    '<p id="mlErr" class="lg-err"></p><div class="actions"><button class="btn" id="mlCancel">Annuleren</button><button class="btn pri" id="mlSend">Verzenden</button></div></div>';
  el.hidden = false;
  var eigen = null;
  function dicht() { el.hidden = true; }
  $('#mlX').onclick = dicht; $('#mlCancel').onclick = dicht;
  $('#mlFile').onchange = function () { eigen = this.files[0] || null; if (eigen) $('#mlAtt').querySelector('span').outerHTML = '<span class="chip">📎 ' + esc(eigen.name) + '</span>'; };
  $('#mlSend').onclick = async function () {
    var rr = r, bestand = r ? r.bestand : null, key = null;
    if (eigen) {
      $('#mlErr').textContent = ''; this.disabled = true; this.textContent = 'Verzenden…';
      try {
        var res = await pdfText(eigen), k = E.herken(res.text, D.RAPPORTEN);
        if (k) { rr = k; key = k.key; }
        else { rr = null; if (aiOn()) { try { rr = E.normalizeAI(await S.sample.json(E.aiExtractPrompt(res.text), { modelTier: 'default' }), eigen.name); rr.methode = 'claude'; } catch (er) { rr = null; } } if (!rr) rr = E.heuristiek(res.text, eigen.name); rr.paginas = res.pages; }
        bestand = eigen.name;
      } catch (err) { $('#mlErr').textContent = 'Kon de PDF niet lezen: ' + err.message; this.disabled = false; this.textContent = 'Verzenden'; return; }
    }
    if (!rr) { $('#mlErr').textContent = 'Voeg eerst een rapport (PDF) toe.'; return; }
    var m = { id: 'm-' + Date.now(), van: $('#mlVan').value, onderwerp: $('#mlOnd').value, tijd: nu(), bestand: bestand, adres: rr.adres, nr: null };
    if (key) m.rapportKey = key; else if (eigen) m.rapport = rr; else if (o.m) { m.rapportKey = o.m.rapportKey; m.rapport = o.m.rapport; }
    else m.rapportKey = rr.key;
    if (o.d && o.info) logD(o.d, o.info);
    INS = null; dicht(); toast('Verzonden naar asbest@kbk-bouwgroep.nl'); show('dossiers'); mailBinnen(m, rr);
  };
}
function verversView() { var on = document.querySelector('.view.on'); if (!on) return; if (on.id === 'view-dossiers') renderDossiers(); if (on.id === 'view-rapporten') renderRapporten(); }
function koppelMail(id, handmatig, stil, agent) {
  var m = P.mails.filter(function (x) { return x.id === id; })[0]; if (!m) return;
  var r = m.rapport || D.RAPPORTEN.filter(function (x) { return x.key === m.rapportKey; })[0];
  var d = handmatig ? dos(handmatig) : P.dossiers.filter(function (x) { return x.stap >= 1 && x.stap <= 4 && ((r.postcode && x.werkbon.postcode === r.postcode) || straat(x.werkbon.adres) === straat(r.adres)); })[0];
  if (!d) { m.geenMatch = true; saveP(); renderRapporten(); toast('De AI-agent vond geen opname. Kantoor krijgt een taak om handmatig te koppelen.'); return; }
  m.nr = d.nr; m.geenMatch = false; d.rapportKey = m.rapportKey || null; d.rapport = m.rapport || null; if (d.stap < 4) d.stap = 4;
  if (agent) handmatig = null;
  d.log.push({ t: nu(), wie: handmatig ? ROLES[USER].wie : 'AI-agent', wat: handmatig ? 'Handmatig gekoppeld aan rapport ' + m.bestand : 'Rapport gelezen en gekoppeld aan de opname op ' + (r.postcode ? 'postcode ' + r.postcode : 'adres') });
  saveP(); renderRapporten(); if (!stil) { toast('Rapport gekoppeld aan ' + d.nr + '. AI-vergelijking start automatisch.'); autoVerwerk(d.nr); }
}
function openDossier(nr) {
  var d = dos(nr), r = rapportVan(d);
  S.dossier = nr; S.rapport = r; S.werkbon = d.werkbon; S.rText = ''; S.turns = [];
  S.rFile = { name: r.bestand, meta: 'Ontvangen via Outlook' + (r.paginas ? ' • ' + r.paginas + " pagina's" : '') };
  S.wFile = { name: d.werkbon.nr + '_opname.pdf', meta: 'Opname ' + d.werkbon.opnamedatum + ' • ' + d.werkbon.projectbegeleider };
  if (d.stap === 4 && USER === 'kantoor') { d.stap = 5; d.log.push({ t: nu(), wie: 'KBK AsbestCheck AI', wat: 'Vergelijking rapport en werkbon gemaakt' }); saveP(); }
  var k = $('#koppel'); k.innerHTML = '<span class="dot"></span>Dossier ' + esc(nr) + ': rapport gekoppeld aan de werkbon op adres ' + esc(d.werkbon.adres) + '.'; k.classList.remove('hidden');
  $('#chat').innerHTML = ''; renderAll(); show('analyse');
}
function dossierPanel(w) {
  var d = S.dossier && dos(S.dossier);
  if (!d || d.werkbon.nr !== w.nr) return null;
  var h = '<div class="card sec dpanel"><h2>Dossier ' + esc(d.nr) + ' <small>' + esc(STAPPEN[d.stap]) + '</small></h2>' + procesVisueel(d) + stepper(d);
  if (d.stap === 5 && USER !== 'desk') h += '<div class="actions"><button class="btn pri" data-act="naar-desk" data-nr="' + esc(d.nr) + '">Doorsturen naar deskundige</button><button class="btn" data-q="Welke informatie ontbreekt in het rapport?">Wat ontbreekt er?</button></div>';
  else if (d.stap === 6 && USER === 'desk') h += '<p style="margin:10px 0 6px"><b>Jouw beoordeling</b> (AI heeft gesignaleerd, jij beslist):</p><textarea id="deskNote" class="deskNote" placeholder="Toelichting voor de projectbegeleider, bijv. welke bronnen eerst gesaneerd worden of welk aanvullend onderzoek nodig is"></textarea><div class="actions"><button class="btn" data-act="besluit" data-b="aanvullend" data-nr="' + esc(d.nr) + '">Aanvullend onderzoek nodig</button><button class="btn" data-act="besluit" data-b="sanering" data-nr="' + esc(d.nr) + '">Eerst sanering</button><button class="btn pri" data-act="besluit" data-b="akkoord" data-nr="' + esc(d.nr) + '">Akkoord, werkbon vrijgeven</button></div>';
  else if (d.stap === 6) h += '<p class="status">' + IC.check + ' Ligt ter beoordeling bij de deskundige.</p>';
  else if (d.stap === 7) h += '<p style="margin:10px 0 0">' + pill(BESLUIT[d.besluit][0], BESLUIT[d.besluit][1]) + (d.opmerking ? ' <span>' + esc(d.opmerking) + '</span>' : '') + '</p>';
  return h + '</div>';
}

/* ---------- inbox (Outlook) ---------- */
function renderRapporten() {
  var el = $('#view-rapporten');
  var h = '<div class="card" style="margin-bottom:14px"><div style="padding:12px 16px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><b>Inbox asbest@kbk-bouwgroep.nl (Outlook)</b><span class="muted">De AI-agent leest elke PDF-bijlage en koppelt hem aan de opname <button class="btn pri sm" id="testMail">Stuur een mail als asbestbureau</button></span></div>' +
    P.mails.map(function (m) {
      var st;
      if (m.nr) st = IC.check + ' <small>Gekoppeld aan <b>' + esc(m.nr) + '</b></small>';
      else if (m.geenMatch) st = '<small style="color:var(--orange)"><b>Geen werkbon gevonden.</b> Handmatig koppelen:</small> <select class="btn sm" data-man="' + esc(m.id) + '"><option value="">Kies werkbon…</option>' + P.dossiers.filter(function (d) { return d.stap >= 1 && d.stap <= 3; }).map(function (d) { return '<option value="' + esc(d.nr) + '">' + esc(d.nr + ' – ' + d.werkbon.adres.split(',')[0]) + '</option>'; }).join('') + '</select>';
      else st = '<small style="color:var(--orange)">Nog niet gekoppeld</small>';
      var btn = m.nr ? '<button class="btn sm" data-act="vergelijk" data-nr="' + esc(m.nr) + '">Open dossier</button>' : (USER === 'kantoor' ? '<button class="btn pri sm" data-act="koppel" data-id="' + esc(m.id) + '">Koppeltool uitvoeren</button>' : '');
      return '<div class="mail"><span class="ic">PDF</span><div><b>Asbestinventarisatie ' + esc(m.adres) + '</b><small>Van: ' + esc(m.van) + ' • ' + esc(m.tijd) + ' • bijlage ' + esc(m.bestand) + '</small><br>' + st + '</div>' + btn + '</div>';
    }).join('') +
    (USER === 'kantoor' ? '<label class="mail drop" style="cursor:pointer;display:flex;justify-content:center;border:2px dashed #b9c6dd;margin:10px;border-radius:12px"><input type="file" id="inboxFile" accept="application/pdf" hidden><span><b>+ Binnengekomen rapport toevoegen</b><br><small>Sleep of kies een PDF uit Outlook; de koppeltool zoekt de werkbon erbij</small></span></label><p id="inboxBusy" class="muted" style="margin:0 16px 12px"></p>' : '') + '</div>';
  h += '<p class="muted" style="margin:6px 2px 24px">Losse vergelijking zonder dossier? Gebruik Nieuwe analyse en sleep het rapport in het linkervak.</p>';
  el.innerHTML = h;
  var tm = $('#testMail'); if (tm) tm.onclick = function () { var d = P.dossiers.filter(function (x) { return x.stap >= 1 && x.stap <= 2; })[0]; openMailer(d ? { d: d, r: rapportBijAdres(d.werkbon) } : {}); };
  el.querySelectorAll('[data-man]').forEach(function (s) { s.onchange = function () { if (s.value) koppelMail(s.dataset.man, s.value); }; });
  var f = $('#inboxFile'); if (f) f.onchange = async function () {
    var file = f.files[0]; if (!file) return; $('#inboxBusy').textContent = 'PDF lezen en bronnen herkennen…';
    try {
      var res = await pdfText(file), r = E.herken(res.text, D.RAPPORTEN), m = { id: 'm-' + Date.now(), van: 'Inventarisatiebureau', tijd: nu(), bestand: file.name, nr: null };
      if (r) { m.rapportKey = r.key; m.adres = r.adres; m.van = bureauVan(r.key); }
      else {
        var rr = null;
        if (aiOn()) { $('#inboxBusy').textContent = 'Claude analyseert het rapport…'; try { rr = E.normalizeAI(await S.sample.json(E.aiExtractPrompt(res.text), { modelTier: 'default' }), file.name); rr.methode = 'claude'; } catch (er) { rr = null; } }
        if (!rr) rr = E.heuristiek(res.text, file.name);
        rr.paginas = res.pages; m.rapport = rr; m.adres = rr.adres;
      }
      m.onderwerp = 'Asbestinventarisatie ' + (m.adres || file.name); mailBinnen(m, r || m.rapport);
    } catch (err) { $('#inboxBusy').textContent = 'Kon de PDF niet lezen: ' + err.message; }
  };
}

/* ---------- login ---------- */
function renderLogin() {
  var l = $('#login');
  l.innerHTML = '<div class="lg-l"><div class="logo">' + document.querySelector('.side .logo').innerHTML + '</div><h2>Asbestrapporten sneller en zorgvuldiger controleren</h2><p>Van opname op locatie tot besluit van de deskundige, in één dossier.</p></div>' +
    '<form class="lg-r" id="lgForm"><h1>Inloggen</h1><label>Gebruikersnaam<input id="lgMail" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required></label><label>Wachtwoord<input id="lgPw" type="password" autocomplete="current-password" required></label><p id="lgErr" class="lg-err"></p><button class="btn pri" type="submit">Inloggen</button>' +
    '<div class="lg-demo"><b>Demo-accounts</b> (wachtwoord <code>' + DEMO_PW + '</code>)' + Object.keys(ROLES).map(function (k) { return '<button type="button" class="chip" data-role="' + k + '">' + esc(ROLES[k].naam) + '<br><small>gebruiker: ' + esc(ROLES[k].user) + '</small></button>'; }).join('') + '</div><div class="lg-tour"><b>Presenteren aan de docent?</b><p class="muted">De rondleiding zet de demo op de beginstand en neemt je stap voor stap mee langs alle rollen.</p><button type="button" class="btn" id="lgTour">Rondleiding starten</button></div><p class="muted" style="font-size:12.5px">Demo-inlog voor de schoolopdracht: zonder server, dus niet bedoeld als echte beveiliging.</p></form>';
  l.hidden = false;
  l.querySelectorAll('[data-role]').forEach(function (b) { b.onclick = function () { $('#lgMail').value = ROLES[b.dataset.role].user; $('#lgPw').value = DEMO_PW; $('#lgPw').focus(); }; });
  $('#lgForm').onsubmit = function (e) {
    e.preventDefault();
    var mail = $('#lgMail').value.trim().toLowerCase(), k = Object.keys(ROLES).filter(function (x) { return ROLES[x].user === mail || ROLES[x].email === mail; })[0];
    if (!k || $('#lgPw').value !== DEMO_PW) { $('#lgErr').textContent = 'Onbekende gebruikersnaam of verkeerd wachtwoord.'; return; }
    login(k);
  };
  $('#lgTour').onclick = startTour;
}
function login(k) {
  USER = k; try { sessionStorage.setItem('kbk-user', k); } catch (e) {}
  $('#login').hidden = true; $('.mail-t').textContent = ROLES[k].email; $('#roleT').textContent = ROLES[k].naam;
  document.querySelectorAll('.nav button[data-roles]').forEach(function (b) { b.hidden = b.dataset.roles.split(',').indexOf(k) < 0; });
  show('dossiers');
}
function logout() { USER = null; try { sessionStorage.removeItem('kbk-user'); } catch (e) {} renderLogin(); }

/* ---------- visueel proces per dossier ---------- */
var STATIONS = [
  ['pb', 'Projectbegeleider', 'opname op locatie'],
  ['kantoor', 'Kantoor KBK', 'deelt en vraagt aan'],
  ['inv', 'Inventariseerder (extern)', 'inspecteert en mailt rapport'],
  ['mail', 'AI-agent', 'leest mail en koppelt'],
  ['ai', 'AsbestCheck AI', 'vergelijken en signaleren'],
  ['desk', 'Deskundige', 'beoordelen en besluiten']
];
var STAP_STATION = [0, 1, 2, 3, 4, 4, 5, 5];
var ST_IC = {
  pb: '<path d="M4 20v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2"/><circle cx="12" cy="7" r="3.5"/><path d="M7 4.5h10"/>',
  kantoor: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M11 21v-3h2v3"/>',
  inv: '<circle cx="12" cy="6.5" r="3"/><path d="M6 20v-3a6 6 0 0 1 12 0v3"/><rect x="9" y="12.5" width="6" height="3" rx="1"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  ai: '<rect x="5" y="7" width="14" height="11" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9.5 15h5"/>',
  desk: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>'
};
function procesVisueel(d) {
  var cur = STAP_STATION[d.stap], klaar = d.stap === 7;
  return '<div class="pv">' + STATIONS.map(function (st, i) {
    var c = i < cur || klaar ? 'done' : i === cur ? 'now' : '';
    return (i ? '<span class="pv-ar' + (i <= cur || klaar ? ' done' : '') + '"></span>' : '') + '<div class="pv-st ' + c + '"><span class="pv-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + ST_IC[st[0]] + '</svg></span><b>' + esc(st[1]) + '</b><small>' + esc(st[2]) + '</small>' + (st[0] === 'mail' || st[0] === 'ai' ? '<span class="auto">automatisch</span>' : '') + '</div>';
  }).join('') + '</div>';
}

/* ---------- inspectie op locatie (asbestinventariseerder) ---------- */
var INS = null;
function rapportBijAdres(w) { return D.RAPPORTEN.filter(function (x) { return w.postcode && x.postcode === w.postcode; })[0] || null; }
function kandidaten(d) {
  var w = d.werkbon, r = rapportBijAdres(w), kk = [];
  if (r) r.items.forEach(function (it) {
    kk.push({ id: it.id, materiaal: it.materiaal, locatie: it.locatie, ruimte: it.ruimtes[0], bron: 'rapport', item: it, keuze: it.status === 'uitgesloten' ? 'nt' : (/monster/i.test(it.methode) ? 'monster' : 'visueel') });
  });
  w.items.forEach(function (wi) {
    wi.raakt.forEach(function (t, n) {
      var gedekt = r && r.items.some(function (it) { return it.canon === t.canon && (it.ruimtes.indexOf('*') > -1 || it.ruimtes.some(function (x) { return wi.ruimtes.indexOf(x) > -1; })); });
      if (gedekt) return;
      kk.push({ id: 'W' + wi.code + '-' + n, materiaal: t.label, locatie: wi.ruimte, ruimte: wi.ruimtes[0], bron: r ? 'buiten' : 'eigen', wi: wi, t: t, keuze: r ? 'no' : 'monster' });
    });
  });
  return { r: r, kk: kk };
}
function startInspectie(nr) { var d = dos(nr), k = kandidaten(d); INS = { nr: nr, fase: 0, ri: 0, r: k.r, kk: k.kk, foto: {}, uitslag: {}, check: {} }; show('inspectie'); }
function insRuimtes() {
  var d = dos(INS.nr), order = [];
  d.werkbon.items.forEach(function (wi) { wi.ruimtes.forEach(function (x) { if (order.indexOf(x) < 0) order.push(x); }); });
  INS.kk.forEach(function (c) { if (order.indexOf(c.ruimte) < 0) order.push(c.ruimte); });
  return order;
}
function insUitslag(c) {
  if (c.keuze === 'nt') return 'uitgesloten';
  if (c.keuze === 'no') return 'nietonderzocht';
  if (c.bron === 'rapport') return c.item.status;
  return INS.uitslag[c.id] || null;
}
function renderInspectie() {
  var el = $('#view-inspectie'); if (!el) return;
  if (!INS || !dos(INS.nr) || dos(INS.nr).stap !== 2) {
    var open = P.dossiers.filter(function (d) { return d.stap === 2; });
    el.innerHTML = '<div class="summary">' + IC.scales + '<div><b>Inspecties op locatie.</b> ' + (open.length ? 'Kies een adres om de woning te inspecteren.' : 'Er staan nu geen inspecties open. Een inspectie verschijnt hier zodra kantoor de asbestinventarisatie heeft aangevraagd.') + '</div></div>' +
      open.map(function (d) { return '<div class="card dossier' + (USER === 'inv' ? ' mine' : '') + '"><div class="dhead"><div><b>' + esc(d.werkbon.adres) + '</b><small>' + esc(d.nr) + ' • ' + esc(d.werkbon.object) + '</small></div><button class="btn pri sm" data-act="inspectie" data-nr="' + esc(d.nr) + '">Start inspectie</button></div></div>'; }).join('');
    return;
  }
  var d = dos(INS.nr), w = d.werkbon, F = ['Voorbereiding', 'Rondgang per ruimte', 'Laboratorium', 'Rapport versturen'];
  var h = '<div class="card sec"><div class="dhead"><div><b>' + esc(w.adres) + '</b><small>' + esc(d.nr) + ' • aanvraag van KBK Bouwgroep • inventariseerder ' + esc(ROLES.inv.wie) + '</small></div>' + pill('blue', 'Op locatie') + '</div>' +
    '<div class="stepper">' + F.map(function (f, i) { return '<span class="st ' + (i < INS.fase ? 'done' : i === INS.fase ? 'now' : '') + '"><i>' + (i < INS.fase ? '✓' : i + 1) + '</i>' + f + '</span>'; }).join('') + '</div></div>';
  h += '<div class="summary">' + IC.info + '<div><b>Extern bureau, zo min mogelijk werk.</b> De inventariseerder werkt voor een ander bedrijf en gebruikt zijn eigen systeem. Voor KBK hoeft hij alleen het rapport te mailen naar <b>asbest@kbk-bouwgroep.nl</b>. De AI-agent van KBK doet de rest. De stappen hieronder laten zien wat er op locatie gebeurt.</div></div>';
  if (INS.fase === 0 && INS.r) h += '<div class="card sec quick"><div><b>Snelle route (normale praktijk)</b><br><span class="muted">Rapport ' + esc(INS.r.rapportnr) + ' is klaar. Eén klik: mailen naar KBK.</span></div><button class="btn pri" data-ins="send">Rapport mailen naar KBK</button></div>';
  if (INS.fase === 0) {
    var chk = ['Werkbon van KBK doorgenomen (' + w.items.length + ' werkzaamheden)', 'Bouwjaar gecontroleerd: ' + (w.bouwjaar || 'onbekend') + (w.bouwjaar && w.bouwjaar < 1994 ? ' (vóór 1994, asbest mogelijk)' : ''), 'Sleutel en toegang geregeld (' + (w.bewoond || 'onbekend') + ')', 'Persoonlijke beschermingsmiddelen mee (P3-masker, wegwerpoverall)', 'Monsterzakjes, labels en camera mee'];
    h += '<div class="card sec"><h2>Voorbereiding</h2><p class="muted">Wat moet er onderzocht worden? De inventariseerder kijkt naar de werkzaamheden die KBK op de werkbon heeft gezet.</p><ul class="ins-check">' + chk.map(function (c, i) { return '<li><label><input type="checkbox" data-chk="' + i + '"' + (INS.check[i] ? ' checked' : '') + '> ' + esc(c) + '</label></li>'; }).join('') + '</ul>' +
      '<table class="tbl"><thead><tr><th>#</th><th>Ruimte</th><th>Werkzaamheid</th><th>Raakt</th></tr></thead><tbody>' + w.items.map(function (i) { return '<tr><td>' + esc(i.code) + '</td><td>' + esc(i.ruimte) + '</td><td>' + esc(i.werk) + '</td><td>' + esc(i.raakt.map(function (t) { return t.label; }).join('; ')) + '</td></tr>'; }).join('') + '</tbody></table>' +
      '<div class="actions"><button class="btn' + (INS.r ? '' : ' pri') + '" data-ins="next">Bekijk de rondgang op locatie</button></div></div>';
  }
  if (INS.fase === 1) {
    var rs = insRuimtes(), ri = Math.min(INS.ri, rs.length - 1), rm = rs[ri];
    var werk = w.items.filter(function (i) { return i.ruimtes.indexOf(rm) > -1; }), cs = INS.kk.filter(function (c) { return c.ruimte === rm; });
    h += '<div class="ins-rooms">' + rs.map(function (x, i) { var n = INS.kk.filter(function (c) { return c.ruimte === x; }).length; return '<button class="chip' + (i === ri ? ' on' : '') + (i < ri ? ' done' : '') + '" data-ri="' + i + '">' + (i < ri ? '✓ ' : '') + esc(cap(x)) + (n ? ' (' + n + ')' : '') + '</button>'; }).join('') + '</div>';
    h += '<div class="card sec"><h2>' + esc(cap(rm)) + ' <small>ruimte ' + (ri + 1) + ' van ' + rs.length + '</small></h2>';
    h += werk.length ? '<p><b>KBK gaat hier:</b></p><ul class="ins-werk">' + werk.map(function (i) { return '<li>' + esc(i.werk) + '</li>'; }).join('') + '</ul>' : '<p class="muted">Geen werkzaamheden van KBK in deze ruimte; bron staat in de opdracht van het bureau.</p>';
    h += cs.length ? '<p><b>Materialen beoordelen</b></p>' + cs.map(function (c) {
      var keuzes = c.bron === 'buiten' ? '<span class="pill orange">Niet in de aanvraag: wordt niet onderzocht</span>' :
        '<div class="seg">' + [['monster', 'Monster nemen'], ['visueel', 'Visueel beoordelen'], ['nt', 'Niet bereikbaar']].map(function (k) { return '<button class="' + (c.keuze === k[0] ? 'on' : '') + '" data-kz="' + k[0] + '" data-id="' + esc(c.id) + '">' + k[1] + '</button>'; }).join('') + '</div>';
      return '<div class="ins-mat"><div><b>' + esc(c.materiaal) + '</b><small>' + esc(c.locatie) + '</small></div>' + keuzes + (c.bron !== 'buiten' ? '<button class="btn sm' + (INS.foto[c.id] ? ' ok' : '') + '" data-foto="' + esc(c.id) + '">' + (INS.foto[c.id] ? '✓ Foto gemaakt' : 'Foto maken') + '</button>' : '') + '</div>';
    }).join('') : '<p class="muted">Geen materialen om te beoordelen in deze ruimte.</p>';
    h += '<div class="actions"><button class="btn" data-ins="' + (ri ? 'prevr' : 'prev') + '">Terug</button><button class="btn pri" data-ins="' + (ri < rs.length - 1 ? 'nextr' : 'next') + '">' + (ri < rs.length - 1 ? 'Volgende ruimte: ' + esc(cap(rs[ri + 1])) : 'Rondgang klaar: monsters naar het lab') + '</button></div></div>';
  }
  if (INS.fase === 2) {
    var lab = INS.kk.filter(function (c) { return c.keuze === 'monster' || c.keuze === 'visueel'; });
    h += '<div class="card sec"><h2>Laboratorium <small>' + lab.filter(function (c) { return c.keuze === 'monster'; }).length + ' monsters</small></h2><p class="muted">' + (INS.r ? 'De uitslagen komen uit het bijbehorende rapport ' + esc(INS.r.rapportnr) + '.' : 'Gesimuleerd: vul zelf de uitslag in. In het echt bepaalt het laboratorium dit.') + '</p>' +
      '<table class="tbl"><thead><tr><th>Materiaal</th><th>Ruimte</th><th>Methode</th><th>Uitslag</th></tr></thead><tbody>' + lab.map(function (c) {
        var u = insUitslag(c), cel;
        if (c.bron === 'rapport') cel = u === 'asbest' ? pill('red', 'Asbest aangetoond: ' + c.item.soort) : pill('green', 'Geen asbest aangetoond');
        else cel = '<div class="seg"><button class="' + (u === 'asbest' ? 'on' : '') + '" data-ux="asbest" data-id="' + esc(c.id) + '">Asbest aangetoond</button><button class="' + (u === 'geen' ? 'on' : '') + '" data-ux="geen" data-id="' + esc(c.id) + '">Niet aangetoond</button></div>';
        return '<tr><td>' + esc(c.materiaal) + '</td><td>' + esc(cap(c.ruimte)) + '</td><td>' + (c.keuze === 'monster' ? 'Monster' : 'Visueel') + '</td><td>' + cel + '</td></tr>';
      }).join('') + '</tbody></table><p id="insErr" class="lg-err"></p><div class="actions"><button class="btn" data-ins="prev">Terug</button><button class="btn pri" data-ins="next">Rapport opstellen</button></div></div>';
  }
  if (INS.fase === 3) {
    var tel = { asbest: 0, geen: 0, uitgesloten: 0, nietonderzocht: 0 };
    INS.kk.forEach(function (c) { var u = insUitslag(c); if (tel[u] != null) tel[u]++; });
    h += '<div class="card sec"><h2>Rapport versturen</h2><div class="ins-tel"><div><b>' + tel.asbest + '</b><span>asbesthoudend</span></div><div><b>' + tel.geen + '</b><span>niet-asbesthoudend</span></div><div><b>' + tel.uitgesloten + '</b><span>niet bereikbaar (uitgesloten)</span></div><div><b>' + tel.nietonderzocht + '</b><span>niet in de aanvraag</span></div></div>' +
      '<p class="muted">Het rapport gaat per e-mail naar KBK (Outlook). Daar pakt de AI-agent het rapport op en koppelt het automatisch aan werkbon ' + esc(d.nr) + '.</p><div class="actions"><button class="btn" data-ins="prev">Terug</button><button class="btn pri" data-ins="send">Rapport mailen naar KBK</button></div></div>';
  }
  el.innerHTML = h;
}
function insVerstuur() {
  var d = dos(INS.nr), w = d.werkbon, r = INS.r, rapport = null, nm = 0;
  var gewijzigd = r && INS.kk.some(function (c) { return c.bron === 'rapport' && (c.keuze === 'nt') !== (c.item.status === 'uitgesloten'); });
  if (r && gewijzigd) {
    rapport = JSON.parse(JSON.stringify(r)); rapport.methode = 'inspectie';
    INS.kk.forEach(function (c) { if (c.bron === 'rapport' && c.keuze === 'nt') { var it = rapport.items.filter(function (x) { return x.id === c.id; })[0]; it.status = 'uitgesloten'; it.soort = '-'; it.detail = 'Niet bereikbaar tijdens de inspectie; niet onderzocht.'; } });
  } else if (!r) {
    var vandaag = E.fmt(new Date());
    rapport = { key: 'insp-' + d.nr, bestand: 'Asbestinventarisatie_' + straat(w.adres).replace(/\s+/g, '_') + '.pdf', paginas: 1, fictief: true, titel: 'Asbestinventarisatie ' + w.adres, adres: w.adres, postcode: w.postcode, rapportnr: 'INV-' + d.nr.replace(/^KBK-WB-/, ''), bureau: 'Noord-Holland Inspecties (fictief)', opdrachtgever: w.opdrachtgever, onderzoeksdatum: vandaag, rapportdatum: vandaag, geldigTot: null, bouwjaar: w.bouwjaar, type: 'Inventarisatie voorafgaand aan ' + (w.soort || 'renovatie').toLowerCase() + ' (virtuele inspectie)', reikwijdte: 'De materialen die op de werkbon van KBK genoemd zijn.', geschiktheid: 'Niet vermeld.', methode: 'inspectie',
      gaps: ['Gesimuleerde inspectie voor de schoolopdracht: de uitslagen zijn in de app ingevuld en niet door een laboratorium bepaald.'], geplandRapport: [], items: [] };
    INS.kk.forEach(function (c, i) {
      var u = insUitslag(c);
      if (c.keuze === 'monster') nm++;
      rapport.items.push({ id: 'B' + (i + 1), materiaal: c.materiaal, canon: c.t.canon, locatie: c.locatie, ruimtes: c.wi.ruimtes.slice(), pos: c.t.pos, status: u === 'asbest' ? 'asbest' : u === 'geen' ? 'geen' : 'uitgesloten', soort: u === 'asbest' ? 'Chrysotiel (gesimuleerd)' : u === 'geen' ? 'Niet aangetoond' : '-', hoeveelheid: '-', rk: 'Niet vermeld', methode: c.keuze === 'monster' ? 'Monster M-' + (i + 1) : c.keuze === 'visueel' ? 'Visuele inspectie' : 'Niet bereikbaar', detail: '' });
    });
  }
  var m = { id: 'm-' + Date.now(), van: r ? bureauVan(r.key) : 'Noord-Holland Inspecties (fictief)', tijd: nu(), bestand: rapport ? rapport.bestand : r.bestand, adres: rapport ? rapport.adres : r.adres, nr: null };
  if (rapport) m.rapport = rapport; else m.rapportKey = r.key;
  var info = 'Inspectie op locatie uitgevoerd (' + insRuimtes().length + ' ruimtes, ' + INS.kk.filter(function (c) { return c.keuze === 'monster'; }).length + ' monsters)';
  openMailer({ m: m, r: rapport || r, d: d, info: info });
}
document.addEventListener('click', function (e) {
  if (!INS) return;
  var b = e.target.closest('[data-ins],[data-ri],[data-kz],[data-foto],[data-ux]'); if (!b || !b.closest('#view-inspectie')) return;
  var c = b.dataset.id ? INS.kk.filter(function (x) { return x.id === b.dataset.id; })[0] : null;
  if (b.dataset.kz) c.keuze = b.dataset.kz;
  else if (b.dataset.ux) INS.uitslag[c.id] = b.dataset.ux;
  else if (b.dataset.foto) INS.foto[b.dataset.foto] = !INS.foto[b.dataset.foto];
  else if (b.dataset.ri) INS.ri = +b.dataset.ri;
  else {
    var a = b.dataset.ins;
    if (a === 'nextr') INS.ri++;
    else if (a === 'prevr') INS.ri--;
    else if (a === 'prev') { INS.fase--; if (INS.fase === 1) INS.ri = insRuimtes().length - 1; }
    else if (a === 'next') {
      if (INS.fase === 2 && INS.kk.some(function (x) { return (x.keuze === 'monster' || x.keuze === 'visueel') && !insUitslag(x); })) { $('#insErr').textContent = 'Vul bij elk materiaal de uitslag in.'; return; }
      INS.fase++; INS.ri = 0;
    }
    else if (a === 'send') { insVerstuur(); return; }
    window.scrollTo(0, 0);
  }
  renderInspectie();
});
document.addEventListener('change', function (e) { var t = e.target; if (INS && t.dataset && t.dataset.chk != null) INS.check[t.dataset.chk] = t.checked; });

/* ---------- rondleiding voor de docent ---------- */
var TOUR_NR = 'KBK-WB-2026-118';
var TOUR_TXT = [
  ['pb', 'De projectbegeleider van KBK is op locatie en neemt de werkzaamheden op in zijn eigen tabblad Opname. Controleer de werkbon en klik onderaan op "Delen met kantoor".', 'Open de opname', 'open-opname'],
  ['kantoor', 'Kantoor (werkvoorbereiding) krijgt de werkbon binnen. Bouwjaar 1978, dus asbestinventarisatie nodig: klik op "Inventarisatie aanvragen".', 'Naar dossiers', 'dossiers'],
  ['inv', 'De asbestinventariseerder is van een ander bedrijf. Hij inspecteert de woning (de rondgang kun je bekijken) en mailt alleen het rapport naar KBK. Meer hoeft hij niet te doen.', 'Open de inspectie', 'inspectie'],
  ['auto', 'Automatisch: de AI-agent pakt de mail op, leest het rapport en zoekt de opname van KBK erbij. Kijk mee in het venster rechts. KBK hoeft niets te doen.', null, null],
  ['auto', 'Automatisch: de AI vergelijkt rapport en werkbon en signaleert wat asbesthoudend, niet onderzocht of uitgesloten is.', null, null],
  ['auto', 'Automatisch: de signalen gaan door naar de deskundige. De AI zegt nooit dat iets veilig is.', null, null],
  ['desk', 'De deskundige beoordeelt de signalen en neemt het besluit. Typ een toelichting en kies een besluit.', 'Beoordelen', 'vergelijk'],
  [null, 'Klaar! Het hele proces is doorlopen: van opname op locatie tot besluit van de deskundige. De projectbegeleider ziet het besluit in het dossier.', null, null]
];
function startTour() { P = seed(); P.tour = TOUR_NR; OP = null; INS = null; saveP(); login('pb'); }
function renderTour() {
  var t = $('#tour');
  if (!t) { t = document.createElement('div'); t.id = 'tour'; t.className = 'tour'; document.body.appendChild(t); }
  var d = P && P.tour && dos(P.tour);
  if (!d || !USER) { t.hidden = true; return; }
  var x = TOUR_TXT[d.stap], rol = x[0], auto = rol === 'auto';
  var h = '<div class="tour-l"><b>Rondleiding • stap ' + (d.stap + 1) + ' van 8' + (auto ? ' • <span class="tour-auto">automatisch</span>' : rol ? ' • ' + esc(ROLES[rol].naam) : '') + '</b><p>' + esc(x[1]) + '</p></div><div class="tour-r">';
  if (auto) h += '<span class="tour-spin"></span>';
  else if (rol && rol !== USER) h += '<button class="btn pri" data-tour="login" data-rol="' + rol + '">Log in als ' + esc(ROLES[rol].naam.toLowerCase()) + '</button>';
  else if (x[2]) h += '<button class="btn pri" data-tour="go">' + esc(x[2]) + '</button>';
  h += '<button class="btn" data-tour="stop">' + (rol ? 'Stoppen' : 'Sluiten') + '</button></div>';
  if (auto) autoVerwerk(d.nr);
  t.innerHTML = h; t.hidden = false;
}
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-tour]'); if (!b) return;
  var d = dos(P.tour), a = b.dataset.tour;
  if (a === 'stop') { P.tour = null; saveP(); return; }
  if (a === 'login') { login(b.dataset.rol); }
  var go = TOUR_TXT[d.stap][3];
  if (go === 'open-opname') { OP = JSON.parse(JSON.stringify(d.werkbon)); show('opname'); }
  else if (go === 'inspectie') startInspectie(d.nr);
  else if (go === 'vergelijk') openDossier(d.nr);
  else if (go) show(go);
});

$('#userBtn').onclick = function () { $('#userMenu').hidden = !$('#userMenu').hidden; };
$('#logoutBtn').onclick = function () { $('#userMenu').hidden = true; logout(); };

/* ---------- werkproces (flowchart) ---------- */
function renderProces() {
  var el = $('#view-proces');
  if (el.dataset.done) return; el.dataset.done = 1;
  var T = { kbk: ['#1d4ed8', '#e8f0fe', 'KBK'], ext: ['#64748b', '#f1f5f9', 'Extern'], auto: ['#b45309', '#fef3c7', 'Automatisch'], desk: ['#b91c1c', '#fde4e4', 'Deskundige'] };
  var lanes = [['Projectbegeleider', 'KBK, op locatie', '#eef4ff'], ['Kantoor KBK', 'werkvoorbereiding', '#f3f6fb'], ['Asbestbureau', 'extern bedrijf', '#f6f7f9'], ['Automatisch', 'AI-agent en AsbestCheck AI', '#fffaeb'], ['Deskundige', 'DIA / asbestdeskundige', '#fff1f1']];
  var LX = 175, LH = 104, TOP = 8, W = 1520, H = TOP + lanes.length * LH + 34;
  function cy(l) { return TOP + l * LH + (LH - 8) / 2; }
  var BW = 168, BH = 62;
  // [lane, x, titel, sub, type, tag]
  var N = [
    [0, 280, 'Opname op locatie', 'eigen tabblad, per ruimte', 'kbk', 'werk op locatie'],
    [0, 480, 'Werkbon delen', 'met kantoor', 'kbk', '1 klik'],
    [1, 480, 'Inventarisatie', 'aanvragen bij bureau', 'kbk', '1 klik'],
    [2, 680, 'Inspectie op locatie', 'monsters en foto\'s', 'ext', 'eigen systeem'],
    [2, 880, 'Rapport mailen', 'PDF naar KBK', 'ext', '1 mail'],
    [3, 880, 'AI-agent', 'leest mail, koppelt opname', 'auto', '0 klikken'],
    [3, 1080, 'AI vergelijkt', 'rapport ↔ werkbon', 'auto', '0 klikken'],
    [3, 1280, 'Signalen klaarzetten', 'naar deskundige', 'auto', '0 klikken'],
    [4, 1280, 'Deskundige besluit', 'akkoord, sanering, onderzoek', 'desk', '1 besluit'],
    [0, 1430, 'Uitvoering', 'pas na akkoord', 'kbk', 'start werk']
  ];
  var s = '<svg id="flowSvg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Werkproces van opname tot besluit van de deskundige"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#334155"/></marker><marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>';
  lanes.forEach(function (l, i) { var y = TOP + i * LH; s += '<rect x="0" y="' + y + '" width="' + W + '" height="' + (LH - 8) + '" rx="12" fill="' + l[2] + '"/><text x="18" y="' + (y + 44) + '" font-size="15.5" font-weight="700" fill="#0f172a">' + l[0] + '</text><text x="18" y="' + (y + 64) + '" font-size="12.5" fill="#475569">' + l[1] + '</text>'; });
  function edge(i) { return { x: N[i][1], y: cy(N[i][0]) }; }
  function ln(d, grey) { return '<path d="' + d + '" fill="none" stroke="' + (grey ? '#94a3b8' : '#334155') + '" stroke-width="2"' + (grey ? ' stroke-dasharray="6 5"' : '') + ' marker-end="url(#' + (grey ? 'ar2' : 'ar') + ')"/>'; }
  var hb = BW / 2, hv = BH / 2;
  s += ln('M' + (N[0][1] + hb) + ' ' + cy(0) + 'H' + (N[1][1] - hb - 2));
  s += ln('M' + N[1][1] + ' ' + (cy(0) + hv) + 'V' + (cy(1) - hv - 2));
  s += ln('M' + (N[2][1] + hb) + ' ' + cy(1) + 'H' + N[3][1] + 'V' + (cy(2) - hv - 2));
  s += ln('M' + (N[3][1] + hb) + ' ' + cy(2) + 'H' + (N[4][1] - hb - 2));
  s += ln('M' + N[4][1] + ' ' + (cy(2) + hv) + 'V' + (cy(3) - hv - 2));
  s += ln('M' + (N[5][1] + hb) + ' ' + cy(3) + 'H' + (N[6][1] - hb - 2));
  s += ln('M' + (N[6][1] + hb) + ' ' + cy(3) + 'H' + (N[7][1] - hb - 2));
  s += ln('M' + N[7][1] + ' ' + (cy(3) + hv) + 'V' + (cy(4) - hv - 2));
  s += ln('M' + (N[8][1] + hb) + ' ' + cy(4) + 'H' + N[9][1] + 'V' + (cy(0) + hv + 2));
  s += '<text x="' + (N[9][1] + 8) + '" y="' + (cy(3) + 4) + '" font-size="12.5" font-weight="700" fill="#16a34a">akkoord</text>';
  // uitzonderingen (stippellijn)
  s += ln('M' + (N[5][1] - 30) + ' ' + (cy(3) - hv) + 'V' + (cy(1) + 20), true);
  s += '<text x="' + (N[5][1] - 22) + '" y="' + (cy(1) + 8) + '" font-size="12" fill="#64748b">geen match → taak voor kantoor</text>';
  s += ln('M' + (N[8][1] - hb) + ' ' + (cy(4) + 14) + 'H' + (N[3][1] + 20) + 'V' + (cy(2) + hv + 2), true);
  s += '<text x="' + (N[3][1] + 30) + '" y="' + (cy(4) + 30) + '" font-size="12" fill="#64748b">aanvullend onderzoek nodig → terug naar het bureau</text>';
  N.forEach(function (n, i) {
    var t = T[n[4]], x = n[1] - hb, y = cy(n[0]) - hv;
    s += '<g class="fb" data-i="' + i + '"><rect x="' + x + '" y="' + y + '" width="' + BW + '" height="' + BH + '" rx="12" fill="#fff" stroke="' + t[0] + '" stroke-width="2.2"/>' +
      '<text x="' + n[1] + '" y="' + (y + 22) + '" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">' + esc(n[2]) + '</text>' +
      '<text x="' + n[1] + '" y="' + (y + 38) + '" text-anchor="middle" font-size="11" fill="#475569">' + esc(n[3]) + '</text>' +
      '<rect x="' + (n[1] - 44) + '" y="' + (y + 44) + '" width="88" height="15" rx="7.5" fill="' + t[1] + '"/><text x="' + n[1] + '" y="' + (y + 55) + '" text-anchor="middle" font-size="10" font-weight="700" fill="' + t[0] + '">' + esc(n[5]) + '</text></g>';
  });
  s += '<g font-size="12.5" fill="#334155">' + [['kbk', 'Handeling KBK'], ['ext', 'Extern bureau (eigen werk)'], ['auto', 'Automatisch, niemand hoeft iets te doen'], ['desk', 'Beoordeling deskundige']].map(function (l, i) { var x = 18 + i * 300, y = H - 14; return '<rect x="' + x + '" y="' + (y - 11) + '" width="14" height="14" rx="3" fill="#fff" stroke="' + T[l[0]][0] + '" stroke-width="2.2"/><text x="' + (x + 22) + '" y="' + y + '">' + l[1] + '</text>'; }).join('') + '</g>';
  s += '</svg>';
  var kpi = [['2', 'klikken voor KBK-kantoor en projectbegeleider', 'na de opname: delen en aanvragen'], ['1', 'mail van het asbestbureau', 'geen extra systeem of account nodig'], ['3', 'stappen gaan automatisch', 'koppelen, vergelijken, doorsturen'], ['1', 'besluit door de deskundige', 'de AI zegt nooit dat iets veilig is']];
  var steps = [
    ['kbk', 'Opname op locatie', 'De projectbegeleider werkt in zijn eigen tabblad Opname. Per ruimte legt hij vast wat er gesloopt, vervangen of doorgeboord wordt en welke lagen erachter zitten.'],
    ['kbk', 'Delen en aanvragen', 'Eén klik deelt de werkbon met kantoor. Kantoor vraagt met één klik de inventarisatie aan bij het vaste bureau.'],
    ['ext', 'Inspectie en rapport', 'Het asbestbureau is een ander bedrijf. Het inspecteert de woning in zijn eigen systeem en mailt alleen het rapport naar asbest@kbk-bouwgroep.nl.'],
    ['auto', 'AI-agent koppelt', 'Een AI-agent bewaakt de mailbox, haalt de PDF uit de mail, leest adres, postcode en rapportnummer en koppelt het rapport aan de opname van de projectbegeleider in de KBK-app. Alleen zonder match krijgt kantoor een taak.'],
    ['auto', 'Automatisch vergelijken', 'KBK AsbestCheck AI zet rapport en werkbon naast elkaar: onderzocht, asbesthoudend, niet-asbesthoudend, uitgesloten, en welke geraakte materialen en lagen ontbreken.'],
    ['auto', 'Automatisch doorsturen', 'De signalen gaan direct naar de deskundige. Niemand bij KBK hoeft het rapport van 35 pagina\'s door te lezen.'],
    ['desk', 'Deskundige besluit', 'De deskundige kiest: akkoord, eerst sanering of aanvullend onderzoek. De projectbegeleider ziet het besluit meteen in het dossier.']
  ];
  el.innerHTML = '<div class="kpis">' + kpi.map(function (k) { return '<div class="card kpi"><b>' + k[0] + '</b><span>' + esc(k[1]) + '</span><small>' + esc(k[2]) + '</small></div>'; }).join('') + '</div>' +
    '<div class="card flow scroll"><div class="flow-h"><b>Werkproces KBK AsbestCheck AI</b><button class="btn pri sm" id="flowPlay">▶ Speel het proces af</button></div>' + s + '</div>' +
    '<div class="steps">' + steps.map(function (x, i) { return '<div class="card step t-' + x[0] + '"><b><i>' + (i + 1) + '</i>' + esc(x[1]) + '</b><span class="tag">' + T[x[0]][2] + '</span><p>' + esc(x[2]) + '</p></div>'; }).join('') + '</div>' +
    '<p class="muted" style="margin:14px 2px 24px">Wil je het in de app zien? Start de rondleiding bij Instellingen of op het inlogscherm.</p>';
  var timer = null;
  $('#flowPlay').onclick = function () {
    var svg = $('#flowSvg'), gs = svg.querySelectorAll('.fb'), i = 0;
    clearInterval(timer); svg.classList.add('play'); gs.forEach(function (g) { g.classList.remove('on', 'was'); });
    timer = setInterval(function () {
      if (i > 0) { gs[i - 1].classList.remove('on'); gs[i - 1].classList.add('was'); }
      if (i >= gs.length) { clearInterval(timer); setTimeout(function () { svg.classList.remove('play'); }, 1200); return; }
      gs[i].classList.add('on'); i++;
    }, 900);
  };
}

/* ---------- account & instellingen ---------- */
function renderAccount() {
  var r = ROLES[USER || 'pb'];
  $('#view-account').innerHTML = '<div class="card set"><h2>' + esc(r.naam) + '</h2><p>' + esc(r.email) + '<br><span class="muted">KBK Bouwgroep, Volendam • ' + esc(r.taak) + ' (demo-account)</span></p><button class="btn" id="accOut">Uitloggen / andere rol</button></div><div class="card set"><h2>Privacy</h2><p class="muted">Vergelijkingen worden in je browser gemaakt. De dossiervoortgang wordt alleen in deze browser bewaard.</p></div>';
  $('#accOut').onclick = logout;
}
function renderSettings() {
  var el = $('#view-instellingen'); if (!el) return;
  var av = S.sample ? 'Claude is beschikbaar in deze weergave.' : 'Claude is hier niet beschikbaar (bijv. offline bestand). De lokale analyse wordt gebruikt.';
  el.innerHTML = '<div class="card set"><h2>AI-modus</h2><label><input type="radio" name="ai" value="auto"' + (S.aiMode === 'auto' ? ' checked' : '') + '><span><b>Automatisch</b><br><span class="muted">Claude leest onbekende rapporten en beantwoordt vragen. Zonder Claude valt de app terug op de lokale analyse.</span></span></label><label><input type="radio" name="ai" value="local"' + (S.aiMode === 'local' ? ' checked' : '') + '><span><b>Alleen lokaal</b><br><span class="muted">Er gaat niets naar buiten. Bekende rapporten en de vergelijking werken volledig; onbekende rapporten worden met tekstherkenning gelezen.</span></span></label><p class="muted">' + esc(av) + '</p></div>' +
    '<div class="card set"><h2>Privacy</h2><p class="muted">PDF\'s worden in de browser gelezen en niet opgeslagen. In de modus Automatisch wordt de tekst van een onbekend rapport naar Claude gestuurd om te analyseren.</p></div><div class="card set"><h2>Demo terugzetten</h2><p class="muted">Zet alle dossiers en de inbox terug naar de beginstand, bijvoorbeeld vóór de presentatie.</p><button class="btn" id="resetDemo">Demo terugzetten</button> <span id="resetOk" class="status"></span></div><div class="card set"><h2>Rondleiding voor de docent</h2><p class="muted">Zet de demo terug en loop het hele proces door met Meidoornstraat 24: projectbegeleider, kantoor, inventariseerder, koppeltool, AI en deskundige.</p><button class="btn pri" id="setTour">Rondleiding starten</button></div><div class="card set"><h2>Uitgangspunt</h2><p class="muted">KBK AsbestCheck AI signaleert en verwijst door. Het geeft nooit een oordeel dat iets veilig is. De deskundige bepaalt de vervolgstap.</p></div>';
  $('#setTour').onclick = startTour;
  var rd = $('#resetDemo'); if (rd) rd.onclick = function () { P = seed(); saveP(); OP = null; INS = null; $('#resetOk').textContent = 'Teruggezet.'; };
  el.querySelectorAll('input[name=ai]').forEach(function (r) { r.onchange = function () { S.aiMode = r.value; try { localStorage.setItem('kbk-ai', r.value); } catch (e) {} renderSettings(); }; });
}

function renderAll() { renderSlots(); renderResult(); renderChips(); }
function scrollToResult() { var r = $('#result'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' }); }

/* ---------- start ---------- */
loadP();
loadCase('meidoorn');
userSay('Welke geplande werkzaamheden staan er op de werkbon, en welke asbestbronnen zijn daarbij relevant?');
botSay(localAnswer('Welke geplande werkzaamheden staan er op de werkbon', S.v));
var saved = null; try { saved = sessionStorage.getItem('kbk-user'); } catch (e) {}
if (saved && ROLES[saved]) login(saved); else renderLogin();
}
