# KBK AsbestCheck AI

Schoolopdracht voor KBK Bouwgroep (Volendam). De app vergelijkt een asbestinventarisatierapport met de KBK-opname (werkbon) en signaleert waar controle nodig is. De AI zegt nooit dat iets "veilig" is: hij signaleert en verwijst altijd naar een deskundige.

**Live:** https://tvantatenhove-eng.github.io/kbk-asbestcheck/

## Inloggen (demo)

| Rol | E-mail | Wachtwoord |
|---|---|---|
| Projectbegeleider | raphael@example.com | kbk2026 |
| Kantoor / werkvoorbereiding | kantoor@example.com | kbk2026 |
| Asbestdeskundige | deskundige@example.com | kbk2026 |

Dit is een demo-login zonder echte beveiliging. De gegevens blijven in je eigen browser (localStorage). Onder Instellingen zet "Demo terugzetten" alles weer op de beginstand.

## Het proces doorlopen

1. **Projectbegeleider** maakt de opname op locatie en deelt hem met kantoor.
2. **Kantoor** vraagt de asbestinventarisatie aan.
3. Het rapport komt binnen via Outlook (in de app: *Inbox rapporten*).
4. De koppeltool koppelt het rapport automatisch aan de werkbon (op postcode of adres).
5. De AI vergelijkt rapport en werkbon: asbesthoudend, niet-asbesthoudend, uitgesloten, niet onderzocht, geraakte materialen en achterliggende lagen.
6. **Deskundige** beoordeelt en neemt een besluit (akkoord, sanering of aanvullend onderzoek).

## Bestanden

- `index.html`: de complete app (één bestand, geen betaalde backend).
- `werkbonnen/`: 5 voorbeeld-opnames (PDF, fictief) die bij de rapporten horen.
- `flowchart/`: het werkproces als afbeelding.
- `broncode/`: losse bron (`src/`), `build.py` en het script dat de werkbon-PDF's maakt.

Op GitHub Pages werkt de vergelijking met de lokale regels. De extra Claude-AI (chat, onbekende rapporten uitlezen) werkt alleen in de Claude-artifactversie.
