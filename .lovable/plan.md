
# Plán: Přestavba stránky „O školce"

Přeměním současný placeholder `/o-skolce` na plnohodnotný onepage s dodaným obsahem, vizuálně oddělenými sekcemi a týmovou galerií využívající nově dodané fotky. Zachovám design systém (tokeny, `rounded-2xl`, reveal animace, brand barvy kostiček, žádné scale hovery).

## Struktura stránky

```text
Navbar
Hero (světle žlutý přechod, H1 + intro)
├─ 1. O školce            — text + galerie 3 fotek (placeholder karty)
├─ 2. Představení a vize  — 5 boxů „na čem nám záleží" (barevné akcenty tříd)
├─ 3. Vzdělávání a rozvoj — lead + 4 oblasti (grid 2×2) + CTA + galerie 3 fotek
├─ 4. Náš tým             — grid 3–4 sl., foto/placeholder + jméno + pozice
├─ 5. Veřejné hřiště      — karta s provozní dobou
└─ 6. Školní jídelna      — pravidla + platby + tabulka výdejů
Footer (žlutý přechod)
```

Sticky in-page TOC (levý sloupec na desktopu, skryté na mobilu) pro rychlou orientaci mezi sekcemi.

## Nahrané fotky týmu (integrace)

Nahrané `.webp` fotky nahraju přes `lovable-assets create` z `/mnt/user-uploads/` a přidám do `src/assets/` jako `.asset.json` pointery:

- `teacher-jitka-kouklikova-v2.webp` → přepíše starou fotku Jitky
- `teacher-nikola-sorfova-v2.webp` → přepíše starou fotku Nikoly
- `teacher-jana-tuharska-v2.webp` → přepíše starou fotku Jany
- `staff-lenka-petrackova.webp` (Lenka Petráčková, provozní)
- `staff-lucie-kostalova.webp` (Lucie Košťálová, provozní)
- `staff-vera-markova.webp` (Věra Marková, provozní)

(Existující fotky Jitky/Nikoly/Jany na HP zůstanou — nové jsou kvalitnější portréty, přepnu na ně jak na HP carouselu tak na nové Tým sekci.)

## Sekce 4: Náš tým — kompletní seznam

Rozdělený do dvou skupin s vizuálním předělem:

**Pedagogický tým** (grid 3 na desktopu / 2 tablet / 1 mobil):
1. Mgr. Jitka Kouklíková — Zástupkyně ředitele pro MŠ · **foto (nové)**
2. Mgr. Nikola Šorfová — Učitelka v Červené kostičce · **foto (nové)**
3. Jana Tuharská — Učitelka v Zelené kostičce · **foto (nové)**
4. Kristýna Vaňátková, DiS. — Učitelka v Zelené kostičce · placeholder (iniciály)
5. Bc. Veronika Kremláčková — Učitelka v Modré kostičce · placeholder
6. Milena Svobodová, DiS. — Učitelka ve Žluté kostičce · placeholder
7. Martina Bartošová — Učitelka · foto (stávající)

**Provozní tým** (grid 3 na desktopu):
8. Lenka Petráčková — Provozní · **foto (nové)**
9. Lucie Košťálová — Provozní · **foto (nové)**
10. Věra Marková — Provozní · **foto (nové)**

Karta: `aspect-[4/5]` foto s `rounded-2xl`, pod ní jméno (`font-display`, tučně) a pozice (menší, v brand barvě dané třídy nebo `text-ink/70` pro provoz/vedení). Placeholder u chybějících fotek: tónované pozadí (světle žlutá) + iniciály v `text-ink/20` (stejný styl jako v `site-teachers.tsx`).

## Detaily sekcí (obsah)

**1. O školce** — dodané dva odstavce („Skládáme svět z kostiček"…). Vedle textu galerie 3 placeholder karet (aspect-square, tónované pozadí ve třech barvách kostiček).

**2. Představení a vize** — dodaný úvodní odstavec + 5 karet:
- Respektující přístup (červená tečka/akcent)
- Podpora přirozené zvídavosti (modrá)
- Zahrada v každém ročním období (zelená)
- Podpora pohybu (žlutá)
- Stravování a pitný režim (ink/70)

Grid 2 sl. na desktopu (poslední karta přes celou šířku nebo 3-2-1 rozložení). Karty: bílé pozadí, `border-border/70`, hover `-translate-y-0.5` + jemný stín, `rounded-2xl`.

**3. Vzdělávání a rozvoj** — lead + 4 oblasti v gridu 2×2:
- Jazyky a komunikace
- Myšlení a příprava na školu
- Moderní technologie
- Pohyb a zážitky

Pod tím CTA odkaz „Podrobnosti na stránce Vzdělávání →". Cíl `/vzdelavani-rozvoj` **zatím neexistuje** → vyrenderuji jako neaktivní chip s popiskem „Připravujeme", až stránku vytvoříme, propojíme. Poté galerie 3 placeholder fotek.

**5. Veřejné hřiště** — jedna široká karta, definiční list se dvěma obdobími (15. 4. – září / do 15. 10.) a časy dopoledne/odpoledne. Poznámka o svátcích.

**6. Školní jídelna** — dvousloupcový layout:
- Levý: pravidla (odhlašování do 10:00, kontakt 495 019 050, strava.cz, zákaz skleněných nádob)
- Pravý: platební údaje (účet 27-320530297/0100, VS = evidenční číslo, KS 0379/0558) + tabulka časů výdeje

## Technická realizace

- **Přepis:** `src/routes/o-skolce.tsx` (hero + složení sekcí + head metadata).
- **Nové komponenty** v `src/components/about/`:
  - `about-intro.tsx`
  - `about-vision.tsx`
  - `about-education.tsx`
  - `about-team.tsx`
  - `about-playground.tsx`
  - `about-canteen.tsx`
  - `about-gallery.tsx` (sdílený placeholder galerie 3 fotek)
  - `about-toc.tsx` (sticky in-page nav)
- **Data:** `src/data/team.ts` — sdílený seznam členů týmu (pro budoucí re-use).
- **Nové assety:** 6 `.asset.json` pointerů (3 přepisy + 3 nové).
- **Aktualizace HP:** `src/components/site-teachers.tsx` — přepnutí importů 3 fotek na v2 verze (jen import, žádná další změna chování).
- Všechny texty přes `fixPrepositions()`.
- Reveal: existující `.reveal-up` / `.reveal-fade` třídy.
- Head metadata: unikátní title, description, og:title, og:description pro `/o-skolce`.

## Co se nemění

- Design tokeny, `styles.css`, animace.
- Chování HP carouselu (jen fotky se aktualizují).
- Ostatní stránky.

## Otevřená otázka

**Fotky galerií (sekce 1 a 3)** — dodáš je později, nebo mám tam nechat elegantní placeholdery s tónovaným pozadím + drobným popiskem („Foto brzy doplníme")? Default: **tónované placeholdery**, hotové vyměníme po dodání.
