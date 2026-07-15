## 1) Prohodit pozadí sekcí `SiteActivities` a `SiteTeachers`

Aktuálně jsou obě sekce uvnitř béžového gradient wrapperu na HP, ale `SiteTeachers` má vlastní `bg-background` (bílé), takže Aktivity vidí béžovou a Tým bílou — přechod k footeru pak nesedí.

**Řešení v `src/routes/index.tsx`:** vytáhnout `SiteActivities` ven z béžového wrapperu (do bílé části nad ním) a nechat `SiteTeachers` uvnitř wrapperu. Zároveň v `src/components/site-teachers.tsx` odstranit `bg-background` na `<section>` (nechat průhledné, ať prosvítá béžová z wrapperu). Vnitřní box medailonku ale zůstane bílý (`bg-background`) — kontrast proti béžovému okolí, stejně jako `SiteClasses` na HP.

Výsledná posloupnost pozadí na HP:
```text
Hero (béžová) → Benefits → DailyRhythm → Classes → Activities (bílá) → Teachers (béžová) → Footer (béžová)
```

## 2) Doplnit medailonky učitelů do `src/components/site-teachers.tsx`

Do pole `teachers` přidat 6 nových položek (celkem 7). Pořadí navrhuji podle role a barvy třídy:

1. **Mgr. Jitka Kouklíková** — Zástupkyně ředitele pro MŠ (role bez barvy, tj. `text-ink/70`) — foto ✓
2. **Mgr. Nikola Šorfová** — Učitelka v Červené kostičce (`text-brand-red`) — foto ✓
3. **Jana Tuharská** — Učitelka v Zelené kostičce (`text-brand-green`) — foto ✓ (stávající)
4. **Kristýna Vaňátková** — Učitelka v Zelené kostičce (`text-brand-green`) — bez foto
5. **Bc. Veronika Kremláčková** — Učitelka v Modré kostičce (`text-brand-blue`) — bez foto
6. **Milena Svobodová, DiS.** — Učitelka ve Žluté kostičce (`text-brand-yellow`) — bez foto
7. **Martina Bartošová** — Učitelka mateřské školy (`text-ink/70`) — foto ✓

Texty medailonků převzít 1:1 z uživatelské zprávy.

## 3) Fotky — nové assety

Nahrát 3 fotky přes `lovable-assets create`:

- `user-uploads://Jitka_Kouklíková.webp` → `src/assets/teacher-jitka-kouklikova.webp.asset.json`
- `user-uploads://Mgr._Nikola_Šorfová.webp` → `src/assets/teacher-nikola-sorfova.webp.asset.json`
- `user-uploads://Martina_Bartošová.webp` → `src/assets/teacher-martina-bartosova.webp.asset.json`

## 4) Placeholder pro chybějící fotky

V šabloně slidu podmínit vykreslení `<img>`: když `photo` chybí, místo obrázku ukázat `aspect-[4/5]` box s béžovým pozadím `#FEF8E7` (stejné jako gradient sekce), `rounded-2xl`, `border-border/60`, uvnitř jen jemná ikona/monogram iniciál v `text-ink/25` (font-display, velké). Žádný text „Fotka chybí" — jen elegantní placeholder navazující na paletu.

Typ `Teacher.photo` změním na `string | null`, `alt` zůstane povinný pro čtečky obrazovky.

## Soubory

- `src/routes/index.tsx` — přesun `SiteActivities` z béžového wrapperu do bílé části
- `src/components/site-teachers.tsx` — odstranit `bg-background` na `<section>`, rozšířit `teachers[]`, přidat větev placeholder pro chybějící foto
- `src/assets/teacher-jitka-kouklikova.webp.asset.json` — nový
- `src/assets/teacher-nikola-sorfova.webp.asset.json` — nový
- `src/assets/teacher-martina-bartosova.webp.asset.json` — nový
