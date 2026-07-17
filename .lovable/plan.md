## Cíl

Přestavět jednosetránku `/barevne-tridy` do 4 samostatných sekcí (Červená, Zelená, Modrá, Žlutá kostička) v editoriálním stylu `/o-skolce` a `/vzdelavani-a-rozvoj`. Každá sekce má hero fotku, název, popis, specialitu, telefon a rozklikávací vizitky učitelek.

## Podklady

- **Hero fotky:** upload `cervena.webp`, `zelena.webp`, `modra.webp`, `zluta.webp` přes `lovable-assets` → `src/assets/trida-{barva}.webp.asset.json`.
- **Telefony (z footeru):** Červená 495 444 425 · Zelená 495 444 426 · Modrá 495 444 423 · Žlutá 495 444 424.
- **Bio texty učitelek:** přenést z `site-teachers.tsx` do sdíleného zdroje. Vytvořit `src/data/teachers.ts` s polem `teachers` (name, role, roleColor, photo, alt, bio) a klíčem `classSlug` (`cervena|zelena|modra|zluta|vedeni`). `site-teachers.tsx` bude importovat data odtud (bez změny UI). Do dat doplnit chybějící učitelky bez bia (Hana Hloušková, Elena Špicarová, Magdaléna Sováková) — `photo: null`, `bio: null`.

## Struktura stránky `/barevne-tridy`

Krátký hero (jako dosud): H1 „Barevné třídy" + úvodní věta „Naše třídy nesou názvy barevných kostiček — symbolu dětské hry."

Pro každou třídu jedna sekce (`section-y-sm`, `scroll-mt-28`, `id="cervena|zelena|modra|zluta"`):

```text
┌─────────────────────────────────────────────────────┐
│  Hero foto 16:10 (rounded-2xl, plná šířka sekce)   │
├─────────────────────────────────────────────────────┤
│  H2 "Červená kostička"   [chip: 4–7 let]            │
│  Popisek (1–2 věty)                                 │
│  ▸ Specialita: MIU pro předškoláky …  (jen tam,   │
│    kde existuje — Č a Z)                            │
│  📞 Telefon do třídy: 495 444 425 (tel: odkaz)      │
│                                                     │
│  H3 "Paní učitelky"                                 │
│  Grid vizitek 1/2/3 sloupce (accordion):            │
│  [foto 1:1 / iniciály] Jméno · Role · [+]           │
│    → rozbalí bio text (chevron rotace, klid.        │
│    animace max-height/opacity, respekt reduce-motion│
└─────────────────────────────────────────────────────┘
```

Barevný akcent sekce podle třídy (chip věku, ikona telefonu, chevron u vizitky) — `text-brand-red|green|blue|yellow`. Sekce se rytmicky střídají neutrální/tónované pozadí (jemné, plyne se zbytkem webu).

## Komponenty

Vše lokálně v `src/routes/barevne-tridy.tsx` (žádné nové sdílené komponenty kromě `src/data/teachers.ts`):

1. `ClassSection` — přijímá `{ id, color, name, ageRange, description, specialty?, phone, phoneHref, heroPhoto, alt, teacherNames[] }`. Renderuje hero foto + hlavičku + učitelky.
2. `TeacherCard` — accordion tlačítko, `aria-expanded`, `aria-controls`. Rozbaluje se ovládané stavem uvnitř `ClassSection` (`openIndex`). Když učitelka nemá bio, tlačítko není clickable (jen vizitka bez chevronu).

Data tříd:
- Červená: 4–7 let, specialita MIU, učitelky [Nikola Šorfová, Jitka Kouklíková, Hana Hloušková].
- Zelená: 4–7 let, specialita Jazykové hrátky, učitelky [Jana Tuharská, Kristýna Vaňátková].
- Modrá: 3–5 let, bez speciality, učitelky [Veronika Kremláčková, Elena Špicarová].
- Žlutá: 3–5 let, poznámka „ráno se zde scházejí děti z celé školky", učitelky [Magdaléna Sováková, Milena Svobodová].

## Konzistence a chování

- Rounded-2xl, focus ring, žádné `hover:scale-*`, jemný `translateY(-1px)` na kartě učitelky při hover.
- Accordion: `prefers-reduced-motion` → okamžité přepnutí.
- `Route.head()` beze změny textů (title zůstává „Barevné třídy — MŠ Josefa Gočára"), jen upravit description na aktuální obsah.
- Ve `site-navbar` a jinde je odkaz `#cervena/#zelena/...` už funkční díky `scroll-mt-28`.

## Meta / SEO

- H1 zůstává „Barevné třídy". Description update: „Poznejte naše čtyři třídy — Červená, Zelená, Modrá a Žlutá kostička. Paní učitelky, věkové skupiny a kontaktní telefony."

## Ověření

`bun run build`.
