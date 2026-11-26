/* KBK AsbestCheck AI – vergelijkingsmotor (draait volledig in de browser)
   Kernregel: de motor geeft NOOIT een oordeel 'veilig'. Hij signaleert en verwijst naar een deskundige. */
var KBK_ENGINE = (function () {
  var STATUS = {
    asbest: { label: 'Asbesthoudend', cls: 'red' },
    geen: { label: 'Niet-asbesthoudend', cls: 'blue' },
    uitgesloten: { label: 'Uitgesloten / niet onderzocht', cls: 'orange' },
    onvolledig: { label: 'Onvolledig onderzocht', cls: 'orange' },
    nietgenoemd: { label: 'Niet in rapport', cls: 'orange' }
  };
  var SIGNAAL = {
    asbest: { label: 'Asbest aangetroffen', cls: 'red', rank: 4 },
    controle: { label: 'Controle noodzakelijk', cls: 'orange', rank: 3 },
    info: { label: 'Afstemmen', cls: 'grey', rank: 1 },
    geen: { label: 'Geen asbest aangetoond', cls: 'blue', rank: 2 }
  };

  var REL = {
    vloerzeil: ['vloerzeil', 'vloerbedekking'], vloerbedekking: ['vloerzeil', 'vloerbedekking'],
    kit: ['kit', 'beglazingskit'], beglazingskit: ['beglazingskit', 'kit'],
    leidingisolatie: ['leidingisolatie', 'leidingen'], leidingen: ['leidingisolatie', 'leidingen'],
    dakplaten: ['dakplaten', 'dak'], plaat: ['plaat', 'beplating'], beplating: ['beplating', 'plaat']
  };
  function canonMatch(a, b) { if (a === b) return true; var r = REL[a]; return !!(r && r.indexOf(b) > -1); }
  function posMatch(a, b) { return !a || !b || a === b; }
  function roomMatch(rep, wb) {
    if (rep.indexOf('*') > -1) return true;
    for (var i = 0; i < wb.length; i++) if (rep.indexOf(wb[i]) > -1) return true;
    return false;
  }
  var ORDER = { asbest: 4, onvolledig: 3, uitgesloten: 2, geen: 1 };

  function parseNL(d) { // 'dd-mm-jjjj' of 'jjjj-mm-dd'
    if (!d) return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d); if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(d); if (m) return new Date(+m[3], +m[2] - 1, +m[1]);
    return null;
  }
  function fmt(d) { if (!d) return '-'; return ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear(); }

  function vergelijk(rapport, werkbon) {
    var regels = werkbon.items.map(function (it) {
      var hits = it.raakt.map(function (t) {
        var m = rapport.items.filter(function (ri) {
          return canonMatch(t.canon, ri.canon) && posMatch(t.pos, ri.pos) && roomMatch(ri.ruimtes, it.ruimtes);
        });
        var worst = m.reduce(function (w, ri) { return (!w || ORDER[ri.status] > ORDER[w.status]) ? ri : w; }, null);
        return { raakt: t, matches: m, status: worst ? worst.status : 'nietgenoemd', bron: worst };
      });
      var sig, reden = [];
      var st = hits.map(function (h) { return h.status; });
      hits.forEach(function (h) {
        var b = h.bron;
        if (h.status === 'asbest') {
          reden.push(h.raakt.label + ': ' + b.id + ' ' + b.materiaal.toLowerCase() + ' (' + b.soort + (b.rk && b.rk !== '-' ? ', risicoklasse ' + b.rk : '') + ').');
          if (b.urgent) reden.push('Rapport: ruimtes gesloten houden tot sanering.');
          if (/niet vermeld/i.test(b.rk || '')) reden.push('Risicoklasse ontbreekt in het rapport.');
        } else if (h.status === 'uitgesloten') reden.push(h.raakt.label + ': uitgesloten in rapport (' + b.materiaal.toLowerCase() + ', ' + b.methode.toLowerCase() + '). Aanvullend onderzoek nodig.');
        else if (h.status === 'onvolledig') reden.push(h.raakt.label + ': ' + b.materiaal.toLowerCase() + ' onvolledig onderzocht (' + b.soort.toLowerCase() + ').');
        else if (h.status === 'nietgenoemd') { if (it.destructief) reden.push(h.raakt.label + ': niet in het rapport beschreven. Onbekend of dit is onderzocht.'); }
        else reden.push(h.raakt.label + ': ' + b.id + ', ' + b.soort.toLowerCase() + ' (' + b.methode.toLowerCase() + ').');
      });
      if (st.indexOf('asbest') > -1) {
        sig = 'asbest';
        reden.push('Niet starten vóór sanering door een gecertificeerd bedrijf en akkoord van de deskundige.');
      } else if (st.some(function (s) { return s === 'uitgesloten' || s === 'onvolledig'; }) || (it.destructief && st.indexOf('nietgenoemd') > -1)) {
        sig = 'controle';
      } else if (st.every(function (s) { return s === 'geen'; })) {
        sig = 'geen';
        reden.push('Geldt alleen voor het onderzochte materiaal; dit is geen vrijgave.');
      } else {
        sig = 'info';
        reden.push('Niet-destructief werk; niet als bron in het rapport genoemd. Afstemmen met werkvoorbereiding.');
      }
      if (it.bouwkundig && rapport.scopeRenovatie && !it.ruimtes.some(function (r) { return rapport.scopeRenovatie.indexOf(r) > -1; })) {
        if (sig !== 'asbest') sig = 'controle';
        reden.push('Rapport is in deze ruimte niet geschikt voor bouwkundige ingrepen (alleen ' + rapport.scopeRenovatie.join(', ') + ').');
      }
      return { item: it, hits: hits, signaal: sig, reden: reden };
    });

    // Signaleringen op rapportniveau
    var sign = [];
    if (rapport.postcode && werkbon.postcode && rapport.postcode !== werkbon.postcode)
      sign.push({ lvl: 'red', t: 'Adres van rapport (' + rapport.adres + ') en werkbon (' + werkbon.adres + ') komen niet overeen. Controleer de koppeling.' });
    if (rapport.fictief) sign.push({ lvl: 'grey', t: 'Dit is een fictief testdocument; niet gebruiken voor echte werkzaamheden.' });
    var gt = parseNL(rapport.geldigTot), start = parseNL(werkbon.startGepland);
    if (gt && start && start > gt) sign.push({ lvl: 'orange', t: 'Rapport is geldig tot ' + fmt(gt) + ', maar de start is ' + fmt(start) + '. Rapport laten toetsen op actualiteit.' });
    if (!rapport.geldigTot) sign.push({ lvl: 'orange', t: 'Geen geldigheidsdatum in het rapport gevonden.' });
    var bj = rapport.bouwjaar || werkbon.bouwjaar;
    if (bj && bj < 1994) sign.push({ lvl: 'orange', t: 'Bouwjaar ' + bj + ' (vóór 1994): verborgen asbesthoudende toepassingen blijven mogelijk.' });
    (rapport.gaps || []).forEach(function (g) { sign.push({ lvl: 'orange', t: g }); });
    (rapport.geplandRapport || []).forEach(function (g) {
      var gedekt = werkbon.items.some(function (it) { return it.ruimtes.some(function (r) { return g.ruimtes.indexOf(r) > -1; }); });
      if (!gedekt) sign.push({ lvl: 'grey', t: 'Het rapport noemt ' + g.id + ' (' + g.werk.toLowerCase() + '), maar dit staat niet op de werkbon.' });
    });

    var tel = { asbest: 0, controle: 0, geen: 0, info: 0 };
    regels.forEach(function (r) { tel[r.signaal]++; });
    var rt = { asbest: 0, geen: 0, uitgesloten: 0, onvolledig: 0 };
    rapport.items.forEach(function (i) { rt[i.status]++; });
    var niveau = tel.asbest > 0 && tel.controle > 0 ? 'Hoog' : (tel.asbest + tel.controle > 0 ? 'Midden' : 'Laag');
    return { rapport: rapport, werkbon: werkbon, regels: regels, signaleringen: sign, tel: tel, rapportTel: rt, niveau: niveau };
  }

  /* ---------- Lokale tekstherkenning voor onbekende rapporten (indicatief) ---------- */
  var MAT = [
    ['vloerzeil', /vloerzeil|vinyl|onderlaag|backing|linoleum|vloerbedekking/i],
    ['tegellijm', /tegellijm|lijmlaag|tegelwerk/i],
    ['beglazingskit', /beglazingskit|stopverf/i],
    ['kit', /\bkit\b|kozijnkit|kitvoeg/i],
    ['vensterbank', /vensterbank/i],
    ['ventilatie', /ventilatie|ontluchting|rookgasafvoer/i],
    ['leidingisolatie', /leidingisolatie|isolatie.{0,15}leiding|bochtisolatie/i],
    ['dakplaten', /golfplaat|golfplaten|dakplaten|leien/i],
    ['beplating', /beplating|board|plaatmateriaal|vlakke plaat|\bplaat\b/i],
    ['plafond', /plafond/i],
    ['koof', /koof|koven|schacht/i],
    ['spouw', /spouw/i],
    ['kruipruimte', /kruipruimte/i]
  ];
  var ROOM = [
    ['badkamer', /badkamer|douche/i], ['keuken', /keuken/i], ['toilet', /toilet|\bwc\b/i], ['meterkast', /meterkast/i],
    ['hal', /\bhal\b|hallen|gang|overloop/i], ['woonkamer', /woonkamer/i], ['slaapkamer', /slaapkamer/i], ['zolder', /zolder/i],
    ['berging', /berging|schuur/i], ['kelder', /kelder/i], ['dak', /\bdak\b/i], ['kruipruimte', /kruipruimte/i],
    ['trappenhuis', /trappenhuis/i], ['gevel', /gevel/i], ['balkon', /balkon/i], ['trapkast', /trapkast/i], ['technische ruimte', /technische ruimte/i], ['lokaal', /lokaal/i]
  ];
  function roomsIn(s) { var r = []; ROOM.forEach(function (x) { if (x[1].test(s)) r.push(x[0]); }); return r; }

  function heuristiek(text, bestand) {
    var lines = text.split(/\n/).map(function (l) { return l.replace(/\s+/g, ' ').trim(); }).filter(Boolean);
    var flat = lines.join(' ');
    var pc = /(\d{4})\s?([A-Z]{2})\b/.exec(flat);
    var adr = /([A-Z][a-zé'\.]+(?:\s[A-Za-zé'\.]+){0,3}\s\d{1,4}[a-zA-Z]?)\s*,?\s*(\d{4}\s?[A-Z]{2})\s*(?:te\s)?([A-Z][a-zA-Z\s\-]+?)(?=\s{1}|$|[,.])/.exec(flat);
    var bj = /bouwjaar[^0-9]{0,60}(1[89]\d\d|20[0-2]\d)/i.exec(flat) || /periode[^0-9]{0,80}(19\d\d)/i.exec(flat);
    var nr = /(rapportnummer|projectnummer)\s*:?\s*([A-Z0-9][A-Z0-9.\-\/]{3,})/i.exec(flat);
    var geldig = /geldig tot\s*:?\s*(\d{1,2}-\d{1,2}-\d{4})/i.exec(flat);
    var items = [], seen = {}, mode = null;
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i], ctx = l + ' ' + (lines[i + 1] || '');
      if (l.length < 90) {
        if (/niet[- ]?asbesthoudend|asbestvrij|geen asbest aangetroffen/i.test(l)) mode = 'geen';
        else if (/uitsluit|beperking|niet ge(ï|i)nspecteerd|niet onderzocht|buiten (de )?scope/i.test(l)) mode = 'uitgesloten';
        else if (/asbesthoudend/i.test(l)) mode = 'asbest';
      }
      var mat = null; for (var k = 0; k < MAT.length; k++) if (MAT[k][1].test(l)) { mat = MAT[k]; break; }
      if (!mat) continue;
      var st = null;
      if (/(chrysotiel|amosiet|crocidoliet)/i.test(ctx) && /\d\s?%|aangetoond/i.test(ctx) && !/niet aangetoond|geen asbest|<\s?0,1/i.test(ctx)) st = 'asbest';
      else if (/<\s?0,1|geen asbest|niet aantoonbaar|niet aangetoond/i.test(ctx)) st = 'geen';
      else if (/geen inspectie|niet ge(ï|i)nspecteerd|buiten scope|uitgesloten|niet onderzocht/i.test(ctx)) st = 'uitgesloten';
      else if (/geen monster|niet bemonsterd|onbekend/i.test(ctx)) st = 'onvolledig';
      else if (mode && l.length < 160) st = mode;
      if (!st) continue;
      var rooms = roomsIn(ctx);
      var key = mat[0] + '|' + st + '|' + rooms.join(',');
      if (seen[key]) continue; seen[key] = 1;
      var soort = (/(\d+[\-–,]?\d*\s?%[^.;]{0,25}(chrysotiel|amosiet|crocidoliet))/i.exec(ctx) || /(chrysotiel[^.;]{0,20}|amosiet)/i.exec(ctx) || [])[0];
      items.push({
        id: 'T' + (items.length + 1), materiaal: l.length > 70 ? l.slice(0, 70) + '…' : l, canon: mat[0],
        locatie: rooms.length ? rooms.join(', ') : 'Niet eenduidig herkend', ruimtes: rooms.length ? rooms : ['*'],
        pos: /wand|achter de (wand)?tegels/i.test(ctx) ? 'wand' : (/vloer|onder de (vloer)?tegels|plavuizen/i.test(ctx) ? 'vloer' : null),
        status: st, soort: soort || (st === 'asbest' ? 'Asbest aangetoond' : st === 'geen' ? 'Geen asbest aangetoond' : '-'),
        hoeveelheid: ((/(\d+[,.]?\d*\s?(m²|m2|st|stuks|m1|m)\b)/i.exec(ctx) || [])[0]) || '-', rk: ((/risicoklasse\s*:?\s*(\d[A-Za-z]?)/i.exec(ctx) || [])[1]) || 'Niet herkend',
        methode: 'Tekstherkenning', detail: 'Automatisch herkend, controleer in het rapport.'
      });
      if (items.length > 40) break;
    }
    var gaps = ['Dit rapport is met lokale tekstherkenning gelezen (indicatief). Laat de deskundige de bronnen en uitsluitingen in het rapport zelf controleren.'];
    if (!items.some(function (x) { return x.status === 'uitgesloten'; })) gaps.push('Geen uitsluitingen of beperkingen herkend. Controleer of het rapport een hoofdstuk beperkingen heeft.');
    if (/gestaakt/i.test(flat)) gaps.push('Het rapport vermeldt dat het onderzoek (deels) is gestaakt.');
    return {
      key: 'upload', fingerprint: [], bestand: bestand, paginas: null, fictief: /fictief/i.test(flat),
      titel: 'Geüpload rapport', adres: adr ? (adr[1] + ', ' + adr[2] + ' ' + adr[3]).trim() : 'Niet herkend', postcode: pc ? pc[1] + pc[2] : null,
      rapportnr: nr ? nr[2] : 'Niet herkend', bureau: 'Niet herkend', opdrachtgever: '-', onderzoeksdatum: '-', rapportdatum: '-',
      geldigTot: geldig ? geldig[1] : null, bouwjaar: bj ? +bj[1] : null, type: 'Onbekend', reikwijdte: 'Niet herkend', geschiktheid: 'Niet herkend',
      items: items, gaps: gaps, geplandRapport: [], methode: 'lokaal'
    };
  }

  function herken(text, lijst, veld) {
    var t = text.replace(/\s+/g, ' ');
    for (var i = 0; i < lijst.length; i++) {
      var fp = lijst[i][veld || 'fingerprint'] || [];
      for (var j = 0; j < fp.length; j++) if (t.indexOf(fp[j]) > -1) return lijst[i];
    }
    return null;
  }

  var VOCAB_M = ['vloerzeil', 'tegellijm', 'kit', 'beglazingskit', 'vensterbank', 'ventilatie', 'leidingisolatie', 'dakplaten', 'plaat', 'beplating', 'plafond', 'koof', 'spouw', 'kozijn', 'kruipruimte', 'keukenblok', 'radiator', 'cv', 'gevel', 'stof', 'wand', 'overig'];
  var VOCAB_R = ['badkamer', 'keuken', 'toilet', 'meterkast', 'hal', 'woonkamer', 'slaapkamer', 'zolder', 'berging', 'kelder', 'dak', 'kruipruimte', 'trappenhuis', 'gevel', 'balkon', 'trapkast', 'technische ruimte', 'lokaal', 'gang', '*'];

  function aiExtractPrompt(text) {
    return 'Je bent een extractie-assistent voor KBK Bouwgroep. Lees dit Nederlandse asbestinventarisatierapport en geef UITSLUITEND JSON terug (geen uitleg). Verzin niets: wat niet in de tekst staat wordt "Niet vermeld".\n' +
      'Schema: {"titel":str,"adres":str,"postcode":"1234AB"|null,"rapportnr":str,"bureau":str,"opdrachtgever":str,"onderzoeksdatum":str,"rapportdatum":str,"geldigTot":"jjjj-mm-dd"|null,"bouwjaar":int|null,"type":str,"reikwijdte":str,"geschiktheid":str,"fictief":bool,' +
      '"scopeRenovatie":[ruimte]|null,"items":[{"id":str,"materiaal":str,"canon":one of ' + JSON.stringify(VOCAB_M) + ',"locatie":str,"ruimtes":[one of ' + JSON.stringify(VOCAB_R) + '],"pos":"wand"|"vloer"|"plafond"|"kozijn"|"dak"|null,"status":"asbest"|"geen"|"uitgesloten"|"onvolledig","soort":str,"hoeveelheid":str,"rk":str,"methode":str,"detail":str,"laag":str|null}],' +
      '"gaps":[str],"geplandRapport":[{"id":str,"werk":str,"locatie":str,"planning":str,"bronnen":[str],"ruimtes":[ruimte]}]}\n' +
      'Regels: elke asbesthoudende bron, elke niet-asbesthoudende bron, elke visueel niet-verdachte waarneming (status "geen", methode "Visuele inspectie") en elke uitsluiting/beperking/niet-geïnspecteerde plek (status "uitgesloten") wordt een item. Asbestverdacht maar niet bemonsterd of zonder labuitslag = "onvolledig". "*" bij ruimtes = geldt voor de hele woning. Achterliggende lagen (onderlaag, backing, lijmlaag achter/onder tegels) noem je in "laag". ' +
      '"gaps" = ontbrekende informatie, tegenstrijdigheden en punten die een deskundige moet controleren (kort, Nederlands).\n\nRAPPORTTEKST:\n' + text.slice(0, 90000);
  }
  function normalizeAI(j, bestand) {
    j = j || {};
    j.key = 'upload'; j.bestand = bestand; j.methode = 'claude';
    j.items = (j.items || []).map(function (x, i) {
      return { id: String(x.id || 'B' + (i + 1)), materiaal: String(x.materiaal || '-'), canon: VOCAB_M.indexOf(x.canon) > -1 ? x.canon : 'overig', locatie: String(x.locatie || '-'),
        ruimtes: (x.ruimtes && x.ruimtes.length ? x.ruimtes : ['*']).map(String), pos: x.pos || null, status: ['asbest', 'geen', 'uitgesloten', 'onvolledig'].indexOf(x.status) > -1 ? x.status : 'onvolledig',
        soort: String(x.soort || '-'), hoeveelheid: String(x.hoeveelheid || '-'), rk: String(x.rk || 'Niet vermeld'), methode: String(x.methode || '-'), detail: String(x.detail || ''), laag: x.laag || null };
    });
    j.gaps = (j.gaps || []).map(String); j.geplandRapport = j.geplandRapport || [];
    if (j.postcode) j.postcode = String(j.postcode).replace(/\s/g, '').toUpperCase();
    return j;
  }

  function werkbonTekst(text, lijst) { return herken(text, lijst, 'nrFp'); }

  return { vergelijk: vergelijk, heuristiek: heuristiek, herken: herken, aiExtractPrompt: aiExtractPrompt, normalizeAI: normalizeAI, STATUS: STATUS, SIGNAAL: SIGNAAL, roomsIn: roomsIn, VOCAB_M: VOCAB_M, VOCAB_R: VOCAB_R, parseNL: parseNL, fmt: fmt };
})();
if (typeof module !== 'undefined') module.exports = KBK_ENGINE;
