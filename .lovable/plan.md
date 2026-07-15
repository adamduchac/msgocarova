
Přepsat `/kontakty` (`src/routes/kontakty.tsx`) do jednotného, striktně strukturovaného layoutu. Žádné míchání velikostí, sjednocená hierarchie.

## Sekce 1 — Hero (2 sloupce)

Grid `lg:grid-cols-2`, `items-start`, gap 14. Vlevo textový blok, vpravo čtvercová fotka.

### Levý sloupec

Vertikálně, konzistentní typografická stupnice:

```text
H1 „Kontakty“                    font-display text-[42px] md:text-[56px] extrabold text-ink
Subtitle (perex)                 text-lg text-body            (jedna věta)
                                 mt-4

--- mt-10 ---

Eyebrow „Zavolejte nám“          text-sm font-semibold uppercase tracking-[0.18em] text-ink/55
Telefon 495 444 421              font-display text-[40px] md:text-[52px] extrabold text-brand-blue, tabular-nums
                                 mt-3

--- mt-10 ---

Eyebrow „Napište nám“            stejný styl jako eyebrow výše
kosticky@msjghk.cz               font-display text-[40px] md:text-[52px] extrabold text-brand-blue
                                 mt-3

--- mt-10 ---

Eyebrow „Adresa“                 stejný styl eyebrow
Mateřská škola Josefa Gočára     text-ink font-medium
Škroupova 693                    text-body
500 02 Hradec Králové 2          text-body
                                 mt-3, řádky uvnitř leading-relaxed
```

Bez ikon (Phone/Mail/MapPin — odstranit). H1 zarovnaný vlevo (ne centrovaný). Telefon i email jsou stejná velikost a stejná modrá barva, oba jako klikatelné `tel:` / `mailto:` odkazy.

### Pravý sloupec — fotka 1:1

Placeholder box: `aspect-square w-full rounded-[28px] border border-border/60 bg-muted overflow-hidden`, uvnitř centrovaná ikona `ImageIcon` z lucide (velikost `h-12 w-12`, `text-ink/25`) a jemný text „Fotka školky“ pod ní (`text-sm text-ink/40`). Žádný stín, žádná další dekorace. Sticky není — jen běžné umístění, `lg:mt-2` pro optické zarovnání s H1.

Odstranit mapu z hero — mapa je vhodná níže, viz sekce 3.

## Sekce 2 — Sjednocený rejstřík kontaktů

Nadpis `h2` „Kontakty na tým a třídy“ (`font-display text-[28px] md:text-[32px] extrabold text-ink`, zarovnaný vlevo, `mb-6`).

Pod ním jednotná mřížka boxů — VŠECHNY boxy stejné vizuální třídy:

```
rounded-2xl border border-border/60 bg-card p-5 md:p-6
```

Grid `grid-cols-1 md:grid-cols-2 gap-3` (jednotné mezery — už žádné `section-y pt-0` s velkými mezerami mezi třemi bloky). Kategorie oddělené jen malým hlavičkovým řádkem uvnitř gridu (viz níže).

Struktura obsahu (v tomto pořadí, každá kategorie začíná řádkem, který zabírá celou šířku gridu jako `col-span-full`):

### Vedení školky (col-span-full label)
Malý label `text-xs font-semibold uppercase tracking-[0.16em] text-ink/50` — bez rámečku, jen jako sekční separátor s `mt-4` (u prvního bez top marginu).

Dva boxy vedle sebe:
1. **Mgr. Petr Sadílek** — role `Ředitel ZŠ a MŠ Josefa Gočára` (`text-sm text-body`), jméno (`font-display text-lg font-bold text-ink mt-1`). Bez kontaktu.
2. **Mgr. Jitka Kouklíková** — role `Zástupkyně ředitele pro MŠ`, jméno; pod tím telefon 495 444 421 (brand-blue, semibold, tabular-nums, `tel:` link, `text-[15px]`, `mt-3`) a email `kosticky@msjghk.cz` (`text-ink hover:text-brand-blue`, `text-[15px]`).

### Školní jídelna (col-span-full label)
Dva boxy vedle sebe, stejná struktura:
1. **Školní jídelna ZŠ** (`font-display text-lg font-bold text-ink`), pod tím poznámka „Odhlašování obědů nejdéle do 10:00 na příští den.“ (`text-sm text-body mt-1`), pak telefon `495 019 050` (`brand-blue text-[15px] font-semibold mt-3`).
2. **Výdejna obědů MŠ**, telefon `495 444 422`.

### Barevné třídy (col-span-full label)
4 boxy — pořadí Červená, Zelená, Modrá, Žlutá. Každý box:
- Header řádek: barevná tečka (`h-2.5 w-2.5 rounded-full bg-brand-{color}`) + název třídy (`font-display text-lg font-bold text-ink`) + vpravo telefon (`ml-auto text-[15px] font-semibold tabular-nums text-brand-blue`, klikací `tel:` — celý box neni klikací, jen telefon, aby jména učitelek zůstala čitelná).
- Pod headerem: `text-sm text-body mt-2 leading-relaxed` s jmény učitelek (převzato z `site-classes.tsx`):
  - Červená: „paní učitelka Mgr. Nikola Šorfová, Mgr. Jitka Kouklíková a Hana Hloušková“
  - Zelená: „paní učitelka Jana Tuharská a Kristýna Vaňátková, DiS.“
  - Modrá: „paní učitelka Bc. Veronika Kremláčková a Elena Špicarová“
  - Žlutá: „paní učitelka Magdaléna Sováková a Milena Svobodová, DiS.“
- Telefony: 425 / 426 / 423 / 424.

Sekce používá jen `section-y` bez opakovaných `pt-0` bloků — jedna sekce, jedny mezery.

## Sekce 3 — Mapa

Vlastní sekce `section-y pt-0` s `h2` „Kudy k nám“ (stejný styl jako výše), pod tím iframe mapy.com v `rounded-[28px] border overflow-hidden`, `h-[420px] md:h-[480px]`, plná šířka kontejneru.

## Footer

Zůstává `SiteFooter cubeVariant="kontakty"` (horní modrá kostička, spodní žádná — už hotové).

## Import cleanup

V `kontakty.tsx` odstranit nepoužité importy (`MapPin`, `Mail`, `Phone` → nahradit jen `ImageIcon` z lucide-react tam, kde je třeba placeholder).

## Soubory
- `src/routes/kontakty.tsx` — kompletní přepis dle výše.
