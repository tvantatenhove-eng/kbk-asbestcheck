# KBK AsbestCheck AI

Schoolopdracht voor KBK Bouwgroep (Volendam). De app vergelijkt een asbestinventarisatierapport met de KBK-opname (werkbon) en signaleert waar controle nodig is. De AI zegt nooit dat iets "veilig" is: hij signaleert en verwijst altijd naar een deskundige.

**Live:** https://tvantatenhove-eng.github.io/kbk-asbestcheck/

## Inloggen (demo)

Wachtwoord voor alle accounts: `kbk2026`

| Rol | Gebruikersnaam |
|---|---|
| Projectbegeleider KBK (op locatie) | raphael |
| Werkvoorbereiding (kantoor KBK) | kantoor |
| Asbestinventariseerder (extern bureau) | inventariseerder |
| Asbestdeskundige | deskundige |

Elke rol ziet zijn eigen tabblad. Dit is een demo-login zonder echte beveiliging; de voortgang blijft in je eigen browser.

## Laten zien aan de docent

Klik op het inlogscherm op **Rondleiding starten**. De app zet de demo op de beginstand en leidt je stap voor stap langs alle rollen, met een balk onderin die zegt wat je moet doen.

## Het proces (zo veel mogelijk automatisch)

1. **Projectbegeleider** neemt de werkzaamheden op in het tabblad Opname en deelt met één klik.
2. **Kantoor** vraagt met één klik de inventarisatie aan.
3. **Asbestbureau (extern)** inspecteert de woning en mailt alleen het rapport naar asbest@kbk-bouwgroep.nl (nagebootst Outlook-venster, geen echte mail).
4. **AI-agent** (automatisch) leest de mail en de PDF, zoekt de opname op postcode en koppelt het rapport.
5. **AsbestCheck AI** (automatisch) vergelijkt rapport en werkbon en zet de signalen klaar.
6. **Deskundige** beoordeelt en maakt het besluit definitief.

Een mens komt er alleen tussen bij onduidelijkheid (bijvoorbeeld geen opname gevonden) en voor het definitieve besluit. De AI zegt nooit dat iets veilig is.

## Bestanden

- `index.html`: de complete app (één bestand, geen betaalde backend).
- `werkbonnen/`: 5 voorbeeld-opnames (PDF, fictief) die bij de rapporten horen.
- `flowchart/`: het werkproces als afbeelding.
- `broncode/`: losse bron (`src/`), `build.py` en het script dat de werkbon-PDF's maakt.

Op GitHub Pages werkt de vergelijking met de lokale regels. De extra Claude-AI (chat, onbekende rapporten uitlezen) werkt alleen in de Claude-artifactversie.
