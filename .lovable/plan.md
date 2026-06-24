## Úprava sekce Barevné kostičky

Odebrat vnitřní `max-w-6xl` box se stínem a borderem. Sekce bude mít stejnou šířku jako všechny ostatní — `container mx-auto px-6`. Nadpis, ilustrace i grid tříd zůstanou, jen bez ohraničujícího boxu.

```
section (full-width, bg-background)
  container mx-auto px-6
    eyebrow + nadpis (centered, max-w-2xl)
    ilustrace (70 % šířky, centered)
    4×1 grid tříd (stejný styl karet)
```

## Redesign footeru

Současný 5-sloupcý layout se kompletně nahradí čistým 2-sloupcým uspořádáním na desktopu:

**Levý sloupec — Kontakt**
- Nadpis: "Kontakt"
- Adresa:
  Mateřská škola Josefa Gočára
  Škroupova 693, 50002 Hradec Králové 2
- Vedení školky (zvýrazněno jako hlavní kontakt):
  kosticky@msjghk.cz
  495 444 421

**Pravý sloupec — Jednotlivé třídy**
- Nadpis: "Jednotlivé třídy"
- 4 řádky s názvem třídy, telefonem a proklikem (např. `#tridy` nebo kotva na konkrétní třídu):
  Modrá kostička — 495 444 423
  Červená kostička — 495 444 425
  Žlutá kostička — 495 444 424
  Zelená kostička — 495 444 426

**Vizuální zpracování**
- Ponechat tmavé pozadí (`bg-ink`) a dekorativní kostičky.
- Kontaktní telefon a e-mail vedení školky zvětšit pro lepší čitelnost.
- Třídy stylizovat jako přehledný seznam s barevným prvkem (tečka nebo linka v barvě třídy) a šipkou pro proklik.
- Zachovat spodní copyright bar.
