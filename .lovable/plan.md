
## 1. Aktuality — zobrazit na home

`SiteNews` existuje a má správný nadpis, ale není zaregistrovaná v `src/routes/index.tsx`. Přidat import a vložit `<SiteNews />` do `main`, mezi `SiteClasses` a `SiteActivities` (uvnitř gradient wrapperu, ať navazuje na krémový přechod).

## 2. `/kontakty` — kompletní redesign do minimalismu

Odstranit veškeré eyebrow labely (`Napište nám`, `Vedení školy`, `Telefony`, `Hlavní kontakt`) napříč stránkou. Sjednotit hierarchii přes velikost/váhu písma a barvu, ne přes malé UPPERCASE popisky.

### Hero (page header)
- Bez eyebrow. Jen `<h1>Kontakty</h1>` centrovaný, stejný font a velikost jako doposud (`text-[42px] md:text-[56px]`). Krátký lead text pod (jedna věta, kterou už máme) — ponechat, ale utlumit na `text-body`.

### Hlavní kontakt (levý sloupec) + mapa (pravý sloupec)
Přesná typografická hierarchie podle přiloženého referenčního screenu:

```text
495 444 421          ← brand-blue, font-display, extrabold, text-[44px] md:text-[56px], ikona Phone stroke brand-blue
kosticky@msjghk.cz   ← ink (černá), font-display, bold, text-[28px] md:text-[32px], ikona Mail ink/60
Mateřská škola Josefa Gočára   ← ink, medium, text-[15px]
Škroupova 693                   ← body (šedá), text-[15px]
500 02 Hradec Králové 2         ← body (šedá), text-[15px]
```

Žádné zelené eyebrow „Hlavní kontakt“. Odstupy: telefon → email `mt-4`, email → adresa `mt-8`.

Mapa vpravo beze změny (rounded, border, iframe mapy.com), jen bez okolního eyebrow.

### Vedení školky (jedna sjednocená sekce)
Titulek sekce jako obyčejný `h2` (`text-[28px] md:text-[32px]`, extrabold, ink, zarovnaný vlevo — konzistentní s dalšími sekcemi níže). Bez eyebrow, bez centrování.

Dvě karty (grid 2 sloupce, `rounded-2xl border bg-card p-6 md:p-8`), každá:
- Role šedě `text-body text-sm`
- Jméno `font-display text-xl font-bold text-ink`
- Telefon `tel:` link `text-brand-blue font-semibold text-[17px]` s ikonou Phone
- E-mail `mailto:` link `text-ink hover:text-brand-blue text-[15px]` s ikonou Mail

Obsah:
- **Ředitel ZŠ a MŠ Josefa Gočára** — Mgr. Petr Sadílek — (bez telefonu / e-mailu, ty jsou na ZŠ; ponechat jen jméno a roli, protože obsah, který uživatel dodal, u ředitele nemá kontakt).
- **Zástupkyně ředitele pro MŠ** — Mgr. Jitka Kouklíková — telefon 495 444 421, e-mail kosticky@msjghk.cz.

### Školní jídelna (nová sekce)
Stejný styl `h2` jako Vedení. Jedna karta se dvěma řádky:
- **Školní jídelna ZŠ** — 495 019 050 — poznámka „odhlašování obědů nejdéle do 10:00 na příští den“ (`text-sm text-body`)
- **Výdejna obědů MŠ** — 495 444 422

### Barevné třídy (nová sekce, přejmenovaný telefonní seznam)
Nadpis `h2` „Barevné třídy“. Grid 2 sloupce, 4 karty (červená, zelená, modrá, žlutá — v tomto pořadí, konzistentně s webem), každá karta:
- barevná tečka
- název třídy `font-display font-semibold text-ink`
- telefon vpravo `tabular-nums`, hover brand-blue

Odstranit z předchozího seznamu položky Mateřská škola / Školní jídelna / Výdejna (přesunuty do sekcí výše).

### Vertikální rytmus
Všechny sekce používají `section-y pt-0` (kromě první), max-width kontejneru zůstává; nadpisy sekcí zarovnané vlevo (ne centrované) — tím vzniká minimalistický, přehledný rytmus.

## 3. Footer na `/kontakty` — bez spodní kostičky

V `SiteFooter` když `cubeVariant="kontakty"`, nerenderovat spodní (pravou) kostičku. Horní modrá zůstává. Realizace: podmíněný render obrázku `bottomCube`, nebo předat `bottomCube = null` a přeskočit `<img>`.

## Soubory
- `src/routes/index.tsx` — import + render `<SiteNews />`
- `src/routes/kontakty.tsx` — přepsat obsah dle výše
- `src/components/site-footer.tsx` — podmínit spodní kostičku dle variantu
