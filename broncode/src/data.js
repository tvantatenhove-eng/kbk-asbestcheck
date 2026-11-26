/* KBK AsbestCheck AI – demodata
   RAPPORTEN: gestructureerde extractie van de 5 meegeleverde rapporten
   WERKBONNEN: voorbeeld-opnames (fictief) van KBK Bouwgroep, Volendam */
var KBK_DATA = (function () {
  var RAPPORTEN = [
    {
      key: 'meidoorn',
      fingerprint: ['AI-2026-1048', 'Meidoornstraat 24'],
      bestand: 'fictief_asbestinventarisatierapport_geplande_werkzaamheden.pdf',
      paginas: 3, mb: '0,1',
      fictief: true,
      titel: 'Renovatie woongebouw De Meidoorn',
      adres: 'Meidoornstraat 24, 1441 AB Purmerend',
      postcode: '1441AB',
      rapportnr: 'AI-2026-1048',
      bureau: 'Noord-Holland Inspecties BV (fictief)',
      opdrachtgever: 'Woningbeheer Noord BV',
      onderzoeksdatum: '14-10-2026',
      rapportdatum: '20-10-2026',
      geldigTot: null,
      bouwjaar: 1978,
      type: 'Inventarisatie voorafgaand aan renovatie',
      reikwijdte: 'Alleen de in het rapport beschreven bronnen en monsters (geen volledige ruimtebeschrijving).',
      geschiktheid: 'Niet expliciet vermeld.',
      items: [
        { id: 'A-01', materiaal: 'Leidingisolatie', canon: 'leidingisolatie', locatie: 'Kelder, leidinggang noordzijde', ruimtes: ['kelder'], pos: null, status: 'asbest', soort: 'Chrysotiel + amosiet', hoeveelheid: 'ca. 32 m', rk: 'Niet vermeld', methode: 'Monster M-1048-01', detail: 'Plaatselijk beschadigd.' },
        { id: 'A-02', materiaal: 'Plaat achter installatie', canon: 'plaat', locatie: 'Begane grond, meterkast', ruimtes: ['meterkast'], pos: 'wand', status: 'asbest', soort: 'Chrysotiel', hoeveelheid: '1 plaat', rk: 'Niet vermeld', methode: 'Monster M-1048-02', detail: 'Visueel intact.' },
        { id: 'A-03', materiaal: 'Vinylvloer met backing', canon: 'vloerzeil', locatie: 'Appartement 2B, badkamer (2e verdieping)', ruimtes: ['badkamer'], pos: 'vloer', status: 'asbest', soort: 'Chrysotiel (in de backing)', hoeveelheid: 'ca. 8 m²', rk: 'Niet vermeld', methode: 'Monster M-1048-03', detail: 'Asbest zit in de achterliggende laag (backing). Plaatselijk slijtage.', laag: 'backing / onderlaag' },
        { id: 'A-04', materiaal: 'Asbestcement golfplaten', canon: 'dakplaten', locatie: 'Dak berging achter gebouw', ruimtes: ['berging', 'dak'], pos: 'dak', status: 'asbest', soort: 'Chrysotiel', hoeveelheid: 'ca. 46 m²', rk: 'Niet vermeld', methode: 'Monster M-1048-04', detail: 'Verweerd, enkele beschadigingen zichtbaar.' },
        { id: 'A-05', materiaal: 'Kozijnkit', canon: 'kit', locatie: 'Trappenhuis, verdieping 1', ruimtes: ['trappenhuis'], pos: 'kozijn', status: 'geen', soort: 'Niet aangetoond', hoeveelheid: 'ca. 12 m', rk: '-', methode: 'Monster M-1048-05', detail: 'Geen asbest aangetoond in het onderzochte monster. Volgens het rapport geen garantie voor andere, niet onderzochte materialen.' }
      ],
      gaps: [
        'Er staat geen risicoklasse (SMA-rt) bij de asbesthoudende bronnen.',
        'Er zijn geen laboratoriumcertificaten of analysepercentages opgenomen.',
        'Er is geen tabel met uitgesloten of niet-onderzochte ruimtes; het rapport zegt alleen dat niet-genoemde onderdelen niet als asbestvrij mogen worden beschouwd.'
      ],
      geplandRapport: [
        { id: 'W-01', werk: 'Renovatie technische installaties en vervanging delen leidingwerk', locatie: 'Kelder, leidinggang', planning: 'December 2026', bronnen: ['A-01'], ruimtes: ['kelder'] },
        { id: 'W-02', werk: 'Aanpassen en vernieuwen elektrische meterkast', locatie: 'Begane grond', planning: 'Januari 2027', bronnen: ['A-02'], ruimtes: ['meterkast'] },
        { id: 'W-03', werk: 'Badkamerrenovatie inclusief vervangen vloerafwerking', locatie: 'Appartement 2B', planning: 'Februari 2027', bronnen: ['A-03'], ruimtes: ['badkamer'] },
        { id: 'W-04', werk: 'Vervangen dakbedekking van de berging', locatie: 'Berging achter gebouw', planning: 'Maart 2027', bronnen: ['A-04'], ruimtes: ['berging', 'dak'] },
        { id: 'W-05', werk: 'Schilder- en herstelwerk trappenhuis en kozijnen', locatie: 'Trappenhuis, verdieping 1', planning: 'April 2027', bronnen: ['A-05'], ruimtes: ['trappenhuis'] }
      ]
    },
    {
      key: 'teststraat',
      fingerprint: ['KBK-TEST-2026-014', 'Teststraat 12'],
      bestand: 'FICTIEF_KBK_Asbestinventarisatierapport_Test.pdf',
      paginas: 2, mb: '0,1',
      fictief: true,
      titel: 'Renovatie oefengebouw De Voorbeeldschool',
      adres: 'Teststraat 12, 1234 AB Voorbeeldstad',
      postcode: '1234AB',
      rapportnr: 'KBK-TEST-2026-014',
      bureau: 'Onderzoeker J. Voorbeeld (fictief, certificering niet gecontroleerd)',
      opdrachtgever: 'Stichting Fictief Vastgoed',
      onderzoeksdatum: '14-10-2026',
      rapportdatum: '14-10-2026',
      geldigTot: null,
      bouwjaar: null,
      type: 'Fictieve visuele inventarisatie',
      reikwijdte: 'Geen volledige beschrijving van de onderzochte ruimtes.',
      geschiktheid: 'Niet vermeld.',
      items: [
        { id: 'Locatie A', materiaal: 'Vlakke plaat', canon: 'plaat', locatie: 'Technische ruimte', ruimtes: ['technische ruimte'], pos: 'wand', status: 'asbest', soort: 'Chrysotiel aangetoond (percentage en methode ontbreken)', hoeveelheid: 'ca. 12 m²', rk: 'Niet vermeld', methode: 'Monster M-001', detail: 'Geschroefd. Beschadigd volgens notitie. Geen laboratoriumrapport als bijlage.' },
        { id: 'Locatie B', materiaal: 'Vloerbedekking', canon: 'vloerzeil', locatie: 'Lokaal 1.04', ruimtes: ['lokaal'], pos: 'vloer', status: 'onvolledig', soort: 'Niet beschikbaar (geen monster)', hoeveelheid: 'Niet vastgesteld', rk: 'Niet vermeld', methode: 'Geen monster genomen', detail: 'Hechtingswijze onbekend, conditie niet beschreven.' }
      ],
      gaps: [
        'Tegenstrijdig advies: "Materiaal op Locatie A hoeft niet te worden verwijderd" (zonder onderbouwing), terwijl ook staat dat bij beschadiging eerst een deskundige moet beoordelen. Locatie A is volgens de notitie beschadigd.',
        'Voor Locatie B ontbreken monstername en laboratoriumuitslag.',
        'Voor beide locaties ontbreekt een onderbouwde risicoklasse.',
        'De omvang van Locatie B is niet vastgesteld.',
        'Geen plattegrond of foto\'s toegevoegd.',
        'Geen volledige beschrijving van de onderzochte ruimtes.',
        'Bevoegdheid en certificering van de onderzoeker zijn niet gecontroleerd.',
        'Percentage en analysemethode van monster M-001 ontbreken; geen laboratoriumrapport als bijlage.'
      ],
      geplandRapport: []
    },
    {
      key: 'valerius',
      fingerprint: ['262.7014', 'Valeriusrondeel 242'],
      bestand: 'Asbestin_Valeriusrondeel_242_Capelle_aan_den_IJssel.pdf',
      paginas: 46, mb: '5,8',
      fictief: false,
      titel: 'Woning en berging',
      adres: 'Valeriusrondeel 242, 2902 CG Capelle aan den IJssel',
      postcode: '2902CG',
      rapportnr: 'Project 262.7014 (versie 1.0, definitief)',
      bureau: 'Van Santen Advies B.V.',
      opdrachtgever: 'Steenbruggen Milieutechniek bv',
      onderzoeksdatum: '01-09-2026 en 02-09-2026',
      rapportdatum: '03-09-2026',
      geldigTot: '2029-09-03',
      bouwjaar: null,
      type: 'Asbestinventarisatie t.b.v. mutatie en renovatie',
      reikwijdte: 'Woning en berging.',
      geschiktheid: 'Verwijderen van het genoemde asbest; mutatieonderhoud; renovatie badkamer, keuken en toilet zonder de bouwkundige integriteit aan te tasten (m.u.v. beperkingen).',
      scopeRenovatie: ['badkamer', 'keuken', 'toilet'],
      items: [
        { id: 'Bron 1', materiaal: 'Onderlaag vloerzeil', canon: 'vloerzeil', locatie: 'Woonkamer, hallen, slaapkamer naast keuken, meterkast, kasten', ruimtes: ['woonkamer', 'hal', 'slaapkamer', 'meterkast'], pos: 'vloer', status: 'asbest', soort: '30-60% chrysotiel', hoeveelheid: '62 m²', rk: '2', methode: 'Monster M1', detail: 'Niet-hechtgebonden, ernstig beschadigd. Saneren op korte termijn (containment). Ruimtes gesloten houden en alleen betreden met asbest-PBM tot sanering.', laag: 'onderlaag', urgent: true },
        { id: 'Bron 2', materiaal: 'Stof (kleefmonsters K1-K19)', canon: 'stof', locatie: 'Diverse ruimtes', ruimtes: ['*'], pos: null, status: 'geen', soort: '0 vs/cm²', hoeveelheid: '-', rk: '-', methode: '18 kleefmonsters', detail: 'Genomen rond bron 1; geen asbestvezels aangetoond.' },
        { id: 'Bron 3', materiaal: 'Tegellijm', canon: 'tegellijm', locatie: 'Achter wandtegels keuken; onder en achter tegelwerk badkamer en toilet', ruimtes: ['keuken', 'badkamer', 'toilet'], pos: null, status: 'geen', soort: '<0,1% (niet aantoonbaar)', hoeveelheid: '-', rk: '-', methode: 'Monsters M2 t/m M11', detail: 'Destructief onderzocht.' },
        { id: 'Bron 4', materiaal: 'Stof balkon', canon: 'stof', locatie: 'Balkon', ruimtes: ['balkon'], pos: null, status: 'geen', soort: '<0,1%', hoeveelheid: '-', rk: '-', methode: 'Kleefmonster K5', detail: '' },
        { id: 'Visueel', materiaal: 'Keukenblok (onderzijde)', canon: 'keukenblok', locatie: 'Keuken', ruimtes: ['keuken'], pos: null, status: 'geen', soort: 'Geen verdacht materiaal waargenomen', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: 'Onder het keukenblok geen asbestverdacht materiaal.' },
        { id: 'Visueel', materiaal: 'Vloeren overige ruimtes', canon: 'vloerzeil', locatie: 'Overige slaapkamers, inpandige berging', ruimtes: ['berging'], pos: 'vloer', status: 'geen', soort: 'Geen verdacht materiaal waargenomen', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: 'Op de vloer geen asbestverdachte materialen aangetroffen.' },
        { id: 'Visueel', materiaal: 'Ventilatiekanalen', canon: 'ventilatie', locatie: 'Keuken, toilet, badkamer', ruimtes: ['keuken', 'toilet', 'badkamer'], pos: null, status: 'geen', soort: 'Metaal (niet verdacht)', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Spouwbladen', canon: 'spouw', locatie: 'In de spouw', ruimtes: ['*'], pos: 'wand', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Niet geïnspecteerd', detail: 'Destructief onderzoek hoorde niet bij de opdracht.' },
        { id: 'Uitsluiting', materiaal: 'Diverse toepassingen boven vaste plafonds', canon: 'plafond', locatie: 'Boven de vaste plafonds', ruimtes: ['*'], pos: 'plafond', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Niet geïnspecteerd', detail: 'Destructief onderzoek hoorde niet bij de opdracht.' },
        { id: 'Uitsluiting', materiaal: 'Buismateriaal in koven/schachten', canon: 'koof', locatie: 'In koven en schachten', ruimtes: ['*'], pos: null, status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Niet geïnspecteerd', detail: 'Destructief onderzoek hoorde niet bij de opdracht.' },
        { id: 'Uitsluiting', materiaal: 'Beglazingskit', canon: 'beglazingskit', locatie: 'Enkel- en dubbelglas', ruimtes: ['*'], pos: 'kozijn', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Niet geïnspecteerd', detail: 'Niet onderzocht vanwege kans op glasbreuk.' }
      ],
      gaps: [
        'Het onderzoek is op 1-9-2026 gestaakt en op 2-9-2026 aanvullend uitgevoerd: controleer of de rapportage beide delen volledig dekt.',
        'Bron 1 is ernstig beschadigd en niet-hechtgebonden: de betrokken ruimtes moeten volgens het rapport gesloten blijven tot de sanering.',
        'Uitgesloten (spouw, boven plafonds, koven/schachten, beglazingskit): aanvullend onderzoek nodig zodra werkzaamheden deze onderdelen raken.'
      ],
      geplandRapport: [
        { id: 'Aanleiding', werk: 'Mutatie woning en berging + renovatie badkamer, keuken en toilet', locatie: 'Gehele woning', planning: 'Niet vermeld', bronnen: ['Bron 1', 'Bron 3'], ruimtes: ['badkamer', 'keuken', 'toilet'] }
      ]
    },
    {
      key: 'struisgras',
      fingerprint: ['250139', 'Struisgras 8'],
      bestand: 'Asbestin_Struisgras_8_Rotterdam.pdf',
      paginas: 32, mb: '3,2',
      fictief: false,
      titel: 'Woonhuis (eengezinswoning) en berging',
      adres: 'Struisgras 8, 3068 CW Rotterdam',
      postcode: '3068CW',
      rapportnr: 'Project 250139 (versie 1.0)',
      bureau: 'SSBA B.V.',
      opdrachtgever: 'Steenbruggen Milieutechniek',
      onderzoeksdatum: '10-02-2025',
      rapportdatum: '11-02-2025',
      geldigTot: '2028-02-11',
      bouwjaar: 1969,
      type: 'Asbestinventarisatie gehele woning',
      reikwijdte: 'Het gehele bouwwerk: woning en berging.',
      geschiktheid: 'Verwijderen van het genoemde asbest; renovatie zonder de bouwkundige integriteit aan te tasten.',
      items: [
        { id: '250139.4', materiaal: 'Onderlaag vloerzeil (onder de plavuizen)', canon: 'vloerzeil', locatie: 'Keuken', ruimtes: ['keuken'], pos: 'vloer', status: 'asbest', soort: '30-60% chrysotiel', hoeveelheid: '10 m²', rk: '2', methode: 'Monster B3528', detail: 'Niet-hechtgebonden, licht beschadigd. Achterliggende laag onder de vloertegels.', laag: 'onder de vloertegels' },
        { id: '250139.1', materiaal: 'Ontluchtingsbuis / ventilatiekanaal', canon: 'ventilatie', locatie: 'Keuken, toilet', ruimtes: ['keuken', 'toilet'], pos: 'wand', status: 'asbest', soort: '10-15% chrysotiel', hoeveelheid: '2 st', rk: '2', methode: 'Monster A1473 (verwijst naar Blauwgras 54)', detail: 'Ingemetseld, hechtgebonden, slecht bereikbaar.' },
        { id: '250139.2', materiaal: 'Tegellijm grijs', canon: 'tegellijm', locatie: 'Onder de vloertegels keuken', ruimtes: ['keuken'], pos: 'vloer', status: 'geen', soort: '<0,1%, geen asbest', hoeveelheid: '-', rk: '-', methode: 'Monsters B3528, B4554', detail: '' },
        { id: '250139.3', materiaal: 'Tegellijm wit', canon: 'tegellijm', locatie: 'Onder de vloertegels keuken', ruimtes: ['keuken'], pos: 'vloer', status: 'geen', soort: '<0,1%, geen asbest', hoeveelheid: '-', rk: '-', methode: 'Monsters B7271, B7324', detail: '' },
        { id: 'Visueel', materiaal: 'Golfplaten dak berging', canon: 'dakplaten', locatie: 'Berging', ruimtes: ['berging', 'dak'], pos: 'dak', status: 'geen', soort: 'Niet asbestverdacht (visueel, NT)', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: 'Niet bemonsterd; visueel als niet-asbestverdacht beoordeeld.' },
        { id: 'Visueel', materiaal: 'Ventilatiekanaal badkamer', canon: 'ventilatie', locatie: 'Badkamer', ruimtes: ['badkamer'], pos: 'wand', status: 'geen', soort: 'Metaal', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: '' },
        { id: 'Visueel', materiaal: 'Cv-ketel', canon: 'cv', locatie: 'Woning', ruimtes: ['*'], pos: null, status: 'geen', soort: 'Niet asbestverdacht', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: '' },
        { id: 'Verdacht', materiaal: 'Beplating onder voor- en tuindeur', canon: 'beplating', locatie: 'Voordeur en tuindeur', ruimtes: ['hal', 'gevel', 'woonkamer'], pos: 'kozijn', status: 'onvolledig', soort: 'Asbestverdacht, niet bemonsterd', hoeveelheid: '-', rk: '-', methode: 'Visueel verdacht', detail: 'Met de eigenaar is afgesproken hier geen handelingen te verrichten; niet onderzocht.' },
        { id: 'Uitsluiting', materiaal: 'Koven, schachten en spouwen', canon: 'koof', locatie: 'Gehele woning', ruimtes: ['*'], pos: null, status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Valt buiten scope', detail: 'Bij werkzaamheden aan dit onderdeel adviseert het rapport aanvullende inventarisatie.' },
        { id: 'Uitsluiting', materiaal: 'Spouwen', canon: 'spouw', locatie: 'Gehele woning', ruimtes: ['*'], pos: 'wand', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Valt buiten scope', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Kozijnaansluitingen met muren/vloeren/kolommen', canon: 'kozijn', locatie: 'Gehele woning', ruimtes: ['*'], pos: 'kozijn', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Valt buiten scope', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Onder/achter tegelwerk badkamer en toilet', canon: 'tegellijm', locatie: 'Badkamer, toilet', ruimtes: ['badkamer', 'toilet'], pos: null, status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Valt buiten scope', detail: 'Achter de wandtegels en onder de vloertegels heeft geen inspectie plaatsgevonden.' },
        { id: 'Uitsluiting', materiaal: 'Achter de wandtegels keuken', canon: 'tegellijm', locatie: 'Keuken', ruimtes: ['keuken'], pos: 'wand', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Valt buiten scope', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Onder de vloertegels meterkast en trapkast', canon: 'tegellijm', locatie: 'Meterkast, trapkast', ruimtes: ['meterkast', 'trapkast'], pos: 'vloer', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Valt buiten scope', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Achter rabatdelen buitengevel', canon: 'gevel', locatie: 'Buitengevel', ruimtes: ['gevel'], pos: 'wand', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Valt buiten scope', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Kruipruimte onder isolatiekorrels', canon: 'kruipruimte', locatie: 'Kruipruimte', ruimtes: ['kruipruimte'], pos: 'vloer', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Alleen vanaf het luik bekeken', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Boven de gipsplafonds', canon: 'plafond', locatie: 'Gehele woning', ruimtes: ['*'], pos: 'plafond', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Geen inspectie', detail: '' }
      ],
      gaps: [
        'Monsternummer B3528 staat zowel bij de asbesthoudende onderlaag vloerzeil (30-60% chrysotiel) als bij de grijze tegellijm (geen asbest). Laat de deskundige nagaan welke uitslag bij welk materiaal hoort.',
        'De beplating onder voor- en tuindeur is asbestverdacht maar niet onderzocht.',
        'Bron 250139.1 verwijst naar een monster van een ander adres (Blauwgras 54).'
      ],
      geplandRapport: []
    },
    {
      key: 'smalthof',
      fingerprint: ['103472-005', 'Willem Smalthof 13', 'R-2557025711'],
      bestand: 'Asbestin_Willem_Smalthof_13_Rotterdam.pdf',
      paginas: 28, mb: '4,1',
      fictief: false,
      titel: 'MO (mutatie-object), 3e verdieping',
      adres: 'Willem Smalthof 13, 3031 NL Rotterdam',
      postcode: '3031NL',
      rapportnr: 'R-2557025711 (project 103472-005)',
      bureau: 'SGI Compliance Consultancy',
      opdrachtgever: 'Stichting Havensteder',
      onderzoeksdatum: '21-01-2026',
      rapportdatum: '26-01-2026',
      geldigTot: '2029-01-26',
      bouwjaar: 1978,
      type: 'Asbestinventarisatie gedeelte bouwwerk',
      reikwijdte: 'Een gedeelte van het bouwwerk (woning, 3e verdieping).',
      geschiktheid: 'Badkamer, keuken en toilet: renovatie zonder bouwkundige integriteit aan te tasten. Overige ruimtes: uitsluitend verwijdering van het genoemde asbest.',
      scopeRenovatie: ['badkamer', 'keuken', 'toilet'],
      items: [
        { id: 'Toepassing 1', materiaal: 'Lijmlaag achter de tegels', canon: 'tegellijm', locatie: 'Keuken', ruimtes: ['keuken'], pos: 'wand', status: 'asbest', soort: 'Chrysotiel 0,1-2%', hoeveelheid: '6 m²', rk: '2 (containment)', methode: 'Monsters MM01, MM02', detail: 'Achterliggende laag achter de wandtegels. Hechtgebonden, niet beschadigd.', laag: 'lijmlaag achter tegels' },
        { id: 'Toepassing 2', materiaal: 'Lijmlaag achter de tegels', canon: 'tegellijm', locatie: 'Toilet', ruimtes: ['toilet'], pos: 'wand', status: 'asbest', soort: 'Chrysotiel 0,1-2%', hoeveelheid: '3,5 m²', rk: '2 (containment)', methode: 'Monsters MM03, MM04', detail: 'Achterliggende laag achter de wandtegels.', laag: 'lijmlaag achter tegels' },
        { id: 'Toepassing 4', materiaal: 'Lijmlaag achter de tegels', canon: 'tegellijm', locatie: 'Badkamer', ruimtes: ['badkamer'], pos: 'wand', status: 'asbest', soort: 'Chrysotiel 0,1-2%', hoeveelheid: '12 m²', rk: '2 (containment)', methode: 'Monsters MM07, MM08', detail: 'Achterliggende laag achter de wandtegels.', laag: 'lijmlaag achter tegels' },
        { id: 'Toepassing 6', materiaal: 'Vensterbank', canon: 'vensterbank', locatie: 'Keuken, woonkamer en slaapkamers', ruimtes: ['keuken', 'woonkamer', 'slaapkamer'], pos: 'kozijn', status: 'asbest', soort: 'Chrysotiel 10-15%', hoeveelheid: '6 stuks', rk: '1 (demonteren)', methode: 'Monster MM11', detail: 'Geschroefd, hechtgebonden. Achter de vensterbanken is niet geïnspecteerd.' },
        { id: 'Toepassing 3', materiaal: 'Lijmlaag onder de tegels', canon: 'tegellijm', locatie: 'Toilet (vloer)', ruimtes: ['toilet'], pos: 'vloer', status: 'geen', soort: '<0,1% (geen)', hoeveelheid: '-', rk: '-', methode: 'Monsters MM05, MM06', detail: '' },
        { id: 'Toepassing 5', materiaal: 'Lijmlaag onder de tegels', canon: 'tegellijm', locatie: 'Badkamer (vloer); in tabel vermeld als toilet', ruimtes: ['badkamer'], pos: 'vloer', status: 'geen', soort: '<0,1% (geen)', hoeveelheid: '-', rk: '-', methode: 'Monsters MM09, MM10', detail: 'Locatie in de tabel ("toilet") wijkt af van de omschrijving ("badkamer").' },
        { id: 'Visueel', materiaal: 'Vloeren (lijm/vloerbedekking)', canon: 'vloerzeil', locatie: 'Gehele woning', ruimtes: ['woonkamer', 'slaapkamer', 'hal', 'keuken', 'badkamer', 'toilet'], pos: 'vloer', status: 'geen', soort: 'Geen verdachte toepassingen waargenomen', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: '' },
        { id: 'Visueel', materiaal: 'Radiatorpakkingen', canon: 'radiator', locatie: 'Gehele woning', ruimtes: ['*'], pos: null, status: 'geen', soort: 'Geen verdachte pakkingen', hoeveelheid: '-', rk: '-', methode: 'Visuele inspectie', detail: '' },
        { id: 'Visueel', materiaal: 'Keukenblok (onderzijde)', canon: 'keukenblok', locatie: 'Keuken', ruimtes: ['keuken'], pos: null, status: 'geen', soort: 'Geen verdacht materiaal', hoeveelheid: '-', rk: '-', methode: 'Destructief onderzocht', detail: '' },
        { id: 'Uitsluiting', materiaal: 'Achter asbestverdachte toepassingen (o.a. vensterbanken)', canon: 'kozijn', locatie: 'Keuken, woonkamer, slaapkamers', ruimtes: ['keuken', 'woonkamer', 'slaapkamer'], pos: 'kozijn', status: 'uitgesloten', soort: '-', hoeveelheid: '-', rk: '-', methode: 'Niet geïnspecteerd', detail: 'Kon niet zonder aanvullende maatregelen worden gedemonteerd.' }
      ],
      gaps: [
        'Toepassing 5: de locatie in de tabel ("toilet") wijkt af van de omschrijving ("badkamer").',
        'Het rapport is buiten badkamer, keuken en toilet alleen geschikt voor het verwijderen van het genoemde asbest, niet voor andere (bouwkundige) werkzaamheden.',
        'Achter de asbesthoudende vensterbanken is niet geïnspecteerd.'
      ],
      geplandRapport: [
        { id: 'Interview', werk: 'Renovatie badkamer, toilet en keuken (mutatie)', locatie: '3e verdieping', planning: 'Niet vermeld', bronnen: ['Toepassing 1', 'Toepassing 2', 'Toepassing 4'], ruimtes: ['badkamer', 'keuken', 'toilet'] }
      ]
    }
  ];

  var KBK = { naam: 'KBK Bouwgroep', plaats: 'Volendam' };

  var WERKBONNEN = [
    {
      key: 'meidoorn',
      nr: 'KBK-WB-2026-118',
      soort: 'Mutatie + renovatie',
      object: 'Appartement 2B (2e verdieping) met bijbehorende meterkast, kelder en trappenhuis',
      adres: 'Meidoornstraat 24, 1441 AB Purmerend',
      postcode: '1441AB',
      opdrachtgever: 'Woningbeheer Noord BV',
      projectbegeleider: 'R. Veerman',
      opnamedatum: '06-10-2026',
      startGepland: '2027-01-11',
      bouwjaar: 1978,
      bewoond: 'Leeg (mutatie)',
      items: [
        { code: '01', ruimte: 'Badkamer', ruimtes: ['badkamer'], werk: 'Vloerafwerking verwijderen incl. ondervloer, nieuwe tegelvloer leggen', raakt: [{ canon: 'vloerzeil', label: 'Vinylvloer + backing/onderlaag', pos: 'vloer' }], destructief: true, planning: 'Wk 3' },
        { code: '02', ruimte: 'Badkamer', ruimtes: ['badkamer'], werk: 'Wandtegels verwijderen en opnieuw betegelen', raakt: [{ canon: 'tegellijm', label: 'Tegellijm achter wandtegels', pos: 'wand' }], destructief: true, planning: 'Wk 3' },
        { code: '03', ruimte: 'Badkamer', ruimtes: ['badkamer'], werk: 'Nieuw plafond en mechanische ventilatie aansluiten', raakt: [{ canon: 'plafond', label: 'Bestaand plafond + ruimte erboven', pos: 'plafond' }, { canon: 'ventilatie', label: 'Ventilatiekanaal', pos: 'wand' }], destructief: true, planning: 'Wk 4' },
        { code: '04', ruimte: 'Keuken', ruimtes: ['keuken'], werk: 'Keukenblok vervangen, tegelwerk achterwand vernieuwen', raakt: [{ canon: 'keukenblok', label: 'Keukenblok (onderzijde)', pos: null }, { canon: 'tegellijm', label: 'Tegellijm achterwand', pos: 'wand' }], destructief: true, planning: 'Wk 4' },
        { code: '05', ruimte: 'Toilet', ruimtes: ['toilet'], werk: 'Toiletpot en fontein vervangen, afvoer in leidingschacht aanpassen', raakt: [{ canon: 'koof', label: 'Leidingschacht / koof', pos: null }], destructief: true, planning: 'Wk 4' },
        { code: '06', ruimte: 'Woonkamer, slaapkamers', ruimtes: ['woonkamer', 'slaapkamer', 'hal'], werk: 'Vloerbedekking verwijderen en lijmresten schuren (mutatie)', raakt: [{ canon: 'vloerzeil', label: 'Vloerbedekking + lijmlaag', pos: 'vloer' }], destructief: true, planning: 'Wk 2' },
        { code: '07', ruimte: 'Meterkast (begane grond)', ruimtes: ['meterkast'], werk: 'Groepenkast vervangen inclusief achterplaat', raakt: [{ canon: 'plaat', label: 'Achterplaat meterkast', pos: 'wand' }], destructief: true, planning: 'Wk 2' },
        { code: '08', ruimte: 'Kelder, leidinggang', ruimtes: ['kelder'], werk: 'Cv- en waterleiding naar appartement 2B omleggen', raakt: [{ canon: 'leidingisolatie', label: 'Leidingen + isolatie', pos: null }], destructief: true, planning: 'Wk 2' },
        { code: '09', ruimte: 'Trappenhuis, verdieping 1', ruimtes: ['trappenhuis'], werk: 'Kit rond kozijnen vervangen en kozijnen schilderen', raakt: [{ canon: 'kit', label: 'Kozijnkit', pos: 'kozijn' }], destructief: true, planning: 'Wk 5' }
      ],
      opmerkingen: 'Bewoner vertrokken, sleutel bij beheerder. Dakbedekking berging valt niet onder deze opdracht.'
    },
    {
      key: 'teststraat',
      nr: 'KBK-WB-2026-099',
      soort: 'Renovatie',
      object: 'Oefengebouw De Voorbeeldschool (fictief)',
      adres: 'Teststraat 12, 1234 AB Voorbeeldstad',
      postcode: '1234AB',
      opdrachtgever: 'Stichting Fictief Vastgoed',
      projectbegeleider: 'R. Veerman',
      opnamedatum: '07-10-2026',
      startGepland: '2027-02-01',
      bouwjaar: null,
      bewoond: 'In gebruik',
      items: [
        { code: '01', ruimte: 'Technische ruimte', ruimtes: ['technische ruimte'], werk: 'Vlakke plaat demonteren voor nieuwe installatie', raakt: [{ canon: 'plaat', label: 'Vlakke plaat (geschroefd)', pos: 'wand' }], destructief: true, planning: 'Wk 6' },
        { code: '02', ruimte: 'Lokaal 1.04', ruimtes: ['lokaal'], werk: 'Vloerbedekking vervangen', raakt: [{ canon: 'vloerzeil', label: 'Vloerbedekking + onderlaag/lijm', pos: 'vloer' }], destructief: true, planning: 'Wk 6' },
        { code: '03', ruimte: 'Lokaal 1.04', ruimtes: ['lokaal'], werk: 'Systeemplafond vervangen', raakt: [{ canon: 'plafond', label: 'Plafondplaten + ruimte erboven', pos: 'plafond' }], destructief: true, planning: 'Wk 7' },
        { code: '04', ruimte: 'Gang', ruimtes: ['gang'], werk: 'Wanden schilderen (niet-destructief)', raakt: [{ canon: 'verf', label: 'Wandafwerking', pos: 'wand' }], destructief: false, planning: 'Wk 7' }
      ],
      opmerkingen: 'Fictieve testcasus.'
    },
    {
      key: 'valerius',
      nr: 'KBK-WB-2026-131',
      soort: 'Mutatie + renovatie badkamer, keuken, toilet',
      object: 'Woning met berging',
      adres: 'Valeriusrondeel 242, 2902 CG Capelle aan den IJssel',
      postcode: '2902CG',
      opdrachtgever: 'Woningcorporatie (voorbeeld)',
      projectbegeleider: 'S. Kwakman',
      opnamedatum: '25-08-2026',
      startGepland: '2026-10-05',
      bouwjaar: null,
      bewoond: 'Leeg (mutatie)',
      items: [
        { code: '01', ruimte: 'Hal, woonkamer, slaapkamer, meterkast', ruimtes: ['hal', 'woonkamer', 'slaapkamer', 'meterkast'], werk: 'Vloerzeil inclusief onderlaag verwijderen (mutatie)', raakt: [{ canon: 'vloerzeil', label: 'Vloerzeil + onderlaag', pos: 'vloer' }], destructief: true, planning: 'Wk 1' },
        { code: '02', ruimte: 'Keuken', ruimtes: ['keuken'], werk: 'Keukenblok vervangen, wandtegels en tegellijm verwijderen', raakt: [{ canon: 'keukenblok', label: 'Keukenblok', pos: null }, { canon: 'tegellijm', label: 'Tegellijm achter wandtegels', pos: 'wand' }], destructief: true, planning: 'Wk 2' },
        { code: '03', ruimte: 'Badkamer', ruimtes: ['badkamer'], werk: 'Wand- en vloertegels slopen incl. tegellijm', raakt: [{ canon: 'tegellijm', label: 'Tegellijm wand', pos: 'wand' }, { canon: 'tegellijm', label: 'Tegellijm vloer', pos: 'vloer' }], destructief: true, planning: 'Wk 2' },
        { code: '04', ruimte: 'Toilet', ruimtes: ['toilet'], werk: 'Tegelwerk en toiletpot vervangen', raakt: [{ canon: 'tegellijm', label: 'Tegellijm wand en vloer', pos: null }], destructief: true, planning: 'Wk 3' },
        { code: '05', ruimte: 'Badkamer, toilet', ruimtes: ['badkamer', 'toilet'], werk: 'Nieuwe afvoer en leidingen door bestaande leidingkoof', raakt: [{ canon: 'koof', label: 'Leidingkoof / schacht', pos: null }], destructief: true, planning: 'Wk 3' },
        { code: '06', ruimte: 'Keuken', ruimtes: ['keuken'], werk: 'Nieuw plafond met inbouwspots', raakt: [{ canon: 'plafond', label: 'Ruimte boven vast plafond', pos: 'plafond' }], destructief: true, planning: 'Wk 3' },
        { code: '07', ruimte: 'Woonkamer', ruimtes: ['woonkamer'], werk: 'Enkel glas vervangen door HR++ glas', raakt: [{ canon: 'beglazingskit', label: 'Beglazingskit / stopverf', pos: 'kozijn' }], destructief: true, planning: 'Wk 4' },
        { code: '08', ruimte: 'Berging', ruimtes: ['berging'], werk: 'Opruimen en schilderwerk (niet-destructief)', raakt: [{ canon: 'verf', label: 'Wandafwerking', pos: 'wand' }], destructief: false, planning: 'Wk 4' }
      ],
      opmerkingen: 'Woning leeg opgeleverd. Vloerzeil in hal is beschadigd, ruimte niet betreden zonder overleg.'
    },
    {
      key: 'struisgras',
      nr: 'KBK-WB-2025-022',
      soort: 'Renovatie keuken en badkamer',
      object: 'Eengezinswoning met berging',
      adres: 'Struisgras 8, 3068 CW Rotterdam',
      postcode: '3068CW',
      opdrachtgever: 'Woningcorporatie (voorbeeld)',
      projectbegeleider: 'S. Kwakman',
      opnamedatum: '03-02-2025',
      startGepland: '2025-04-07',
      bouwjaar: 1969,
      bewoond: 'Bewoond',
      items: [
        { code: '01', ruimte: 'Keuken', ruimtes: ['keuken'], werk: 'Vloertegels en alle onderliggende lagen verwijderen', raakt: [{ canon: 'vloerzeil', label: 'Onderlaag onder de plavuizen', pos: 'vloer' }, { canon: 'tegellijm', label: 'Tegellijm vloer', pos: 'vloer' }], destructief: true, planning: 'Wk 1' },
        { code: '02', ruimte: 'Keuken', ruimtes: ['keuken'], werk: 'Wandtegels keuken verwijderen', raakt: [{ canon: 'tegellijm', label: 'Tegellijm achter wandtegels', pos: 'wand' }], destructief: true, planning: 'Wk 1' },
        { code: '03', ruimte: 'Keuken, toilet', ruimtes: ['keuken', 'toilet'], werk: 'Ventilatiekanalen vervangen door nieuwe MV-kanalen', raakt: [{ canon: 'ventilatie', label: 'Ontluchtingsbuis (ingemetseld)', pos: 'wand' }], destructief: true, planning: 'Wk 2' },
        { code: '04', ruimte: 'Badkamer', ruimtes: ['badkamer'], werk: 'Wand- en vloertegels slopen', raakt: [{ canon: 'tegellijm', label: 'Tegellijm wand en vloer', pos: null }], destructief: true, planning: 'Wk 2' },
        { code: '05', ruimte: 'Hal (voordeur), woonkamer (tuindeur)', ruimtes: ['hal', 'woonkamer', 'gevel'], werk: 'Voordeur en tuindeur vervangen incl. beplating onder de deur', raakt: [{ canon: 'beplating', label: 'Beplating onder deur', pos: 'kozijn' }, { canon: 'kozijn', label: 'Kozijnaansluiting', pos: 'kozijn' }], destructief: true, planning: 'Wk 3' },
        { code: '06', ruimte: 'Kruipruimte', ruimtes: ['kruipruimte'], werk: 'Waterleidingen in kruipruimte vervangen', raakt: [{ canon: 'kruipruimte', label: 'Kruipruimte onder isolatiekorrels', pos: 'vloer' }], destructief: true, planning: 'Wk 3' },
        { code: '07', ruimte: 'Berging', ruimtes: ['berging', 'dak'], werk: 'Golfplaten dak berging vervangen', raakt: [{ canon: 'dakplaten', label: 'Golfplaten', pos: 'dak' }], destructief: true, planning: 'Wk 4' }
      ],
      opmerkingen: 'Bewoner blijft in de woning; afspraken over bereikbaarheid keuken.'
    },
    {
      key: 'smalthof',
      nr: 'KBK-WB-2026-007',
      soort: 'Mutatie + renovatie badkamer, keuken, toilet',
      object: 'Woning 3e verdieping (mutatie-object)',
      adres: 'Willem Smalthof 13, 3031 NL Rotterdam',
      postcode: '3031NL',
      opdrachtgever: 'Woningcorporatie (voorbeeld)',
      projectbegeleider: 'R. Veerman',
      opnamedatum: '14-01-2026',
      startGepland: '2026-03-02',
      bouwjaar: 1978,
      bewoond: 'Leeg (mutatie)',
      items: [
        { code: '01', ruimte: 'Keuken', ruimtes: ['keuken'], werk: 'Wandtegels verwijderen, nieuwe keuken plaatsen', raakt: [{ canon: 'tegellijm', label: 'Lijmlaag achter wandtegels', pos: 'wand' }, { canon: 'keukenblok', label: 'Keukenblok', pos: null }], destructief: true, planning: 'Wk 10' },
        { code: '02', ruimte: 'Toilet', ruimtes: ['toilet'], werk: 'Wand- en vloertegels vervangen', raakt: [{ canon: 'tegellijm', label: 'Lijmlaag achter wandtegels', pos: 'wand' }, { canon: 'tegellijm', label: 'Lijmlaag onder vloertegels', pos: 'vloer' }], destructief: true, planning: 'Wk 10' },
        { code: '03', ruimte: 'Badkamer', ruimtes: ['badkamer'], werk: 'Badkamer volledig strippen (wand en vloer)', raakt: [{ canon: 'tegellijm', label: 'Lijmlaag achter wandtegels', pos: 'wand' }, { canon: 'tegellijm', label: 'Lijmlaag onder vloertegels', pos: 'vloer' }], destructief: true, planning: 'Wk 11' },
        { code: '04', ruimte: 'Keuken, woonkamer, slaapkamers', ruimtes: ['keuken', 'woonkamer', 'slaapkamer'], werk: 'Vensterbanken vervangen', raakt: [{ canon: 'vensterbank', label: 'Vensterbank', pos: 'kozijn' }, { canon: 'kozijn', label: 'Ruimte achter vensterbank', pos: 'kozijn' }], destructief: true, planning: 'Wk 11' },
        { code: '05', ruimte: 'Woonkamer', ruimtes: ['woonkamer'], werk: 'Wand tussen keuken en woonkamer deels doorbreken', raakt: [{ canon: 'wand', label: 'Binnenwand (bouwkundig)', pos: 'wand' }], destructief: true, bouwkundig: true, planning: 'Wk 12' },
        { code: '06', ruimte: 'Gehele woning', ruimtes: ['woonkamer', 'slaapkamer', 'hal'], werk: 'Radiatoren vervangen', raakt: [{ canon: 'radiator', label: 'Radiatoren + pakkingen', pos: null }], destructief: true, planning: 'Wk 12' }
      ],
      opmerkingen: 'Leeg mutatie-object. Doorbraak keuken-woonkamer op verzoek van de corporatie.'
    }
  ];

  return { RAPPORTEN: RAPPORTEN, WERKBONNEN: WERKBONNEN, KBK: KBK };
})();
if (typeof module !== 'undefined') module.exports = KBK_DATA;
