## Cíl
Rozšířit CMS "Texty na webu" o všechny zbývající stránky webu, aby šla přes admin editovat jakákoli hlavní textová část webu.

## Rozsah
Přidat do site-copy registru sekce pro 7 stránek:
- **index** (HP): hero, benefits (4 karty), rhythm nadpis, classes eyebrow/H2/toggle, activities (3 karty), teachers eyebrow/H2
- **barevne-tridy**: H1, lead, popis + specialita + telefon pro 4 třídy, popisky "Paní učitelky" a "Telefon do třídy"
- **vzdelavani-a-rozvoj**: H1, lead, všech 6 oblastí (eyebrow + title + 1–2 aktivity každá)
- **akce-s-rodici**: H1, lead, přehled 8 akcí + "a další…"
- **predskolacek**: eyebrow, H1, lead, výchozí texty status boxu, 3 karty (nadpisy + body/odrážky), přihlášení, kontakt CTA
- **zapis-do-skolky**: obdobně jako predskolacek + prázdninový provoz + "Po přijetí"
- **kontakty**: H1, lead, telefon/email/adresa, nadpisy sekcí a labely rejstříku

Ponecháváme mimo (data/DB):
- Medailonky učitelů (v tabulce `staff` – editovatelné přes admin.zamestnanci)
- Zprávy (`announcements`), dokumenty (`documents`), info-boxy (`info_boxes`)
- Fotografie/alt texty, mikrostringy typu čas plavecké lekce v datech aktivit

## Soubory
1. `src/lib/site-copy/registry.ts` — velké rozšíření o 7 nových stránek (~250 klíčů celkem)
2. `src/routes/admin.texty.index.tsx` — doplnit `PAGE_TITLES` pro všech 9 stránek
3. `src/routes/admin.texty.$page.tsx` — doplnit `PAGE_TITLES` a `GROUP_LABELS` (nové prefixy: hero, benefits, rhythm, activities, classes, teachers, cervena, zelena, modra, zluta, labels, jazyk, priprava, plavani, priroda, lyze, akce, events, status, how, focus, bring, signup, contact, prepare, summer, after, map, index, address)

**Wire useCopy do frontendu (`useCopyPage(page)` + loader `ensureQueryData`):**

4. `src/routes/index.tsx` — přidat loader; SiteHero, SiteBenefits, SiteDailyRhythm, SiteClasses, SiteActivities, SiteTeachers upravit tak, aby přijímaly hodnoty přes `useCopy("index", ...)` nebo přes props z routy
5. `src/components/site-hero.tsx`, `site-benefits.tsx`, `site-daily-rhythm.tsx`, `site-classes.tsx`, `site-activities.tsx`, `site-teachers.tsx` — nahradit hardcoded texty voláním `useCopy("index", "<key>", fallback)`
6. `src/routes/barevne-tridy.tsx` — loader + `useCopyPage("barevne-tridy")` pro hero, jednotlivé třídy (popis, specialita, telefon), a popisky
7. `src/routes/vzdelavani-a-rozvoj.tsx` — loader + hook, plus mapování na eyebrow/title/aktivity per oblast
8. `src/routes/akce-s-rodici.tsx` — loader + hook, mapování na 8 událostí
9. `src/routes/predskolacek.tsx` — loader + hook, plus předání `fallbackTitle`/`fallbackBody` z CMS textu do `CmsStatusBlock`
10. `src/routes/zapis-do-skolky.tsx` — analogicky
11. `src/routes/kontakty.tsx` — loader + hook pro H1, lead, adresu a nadpisy sekcí

## Neměnit
- Datové struktury Supabase, staff/announcements/documents/info_boxes CRUD
- SiteFooter/SiteNavbar (napříč všemi stránkami — mimo scope)
- Layouty, animace, komponenty CmsStatusBlock (jen předávat texty)
- AI (per zadání zrušeno)

## Kontrola
- Typecheck + build musí projít
- Vizuální kontrola provede uživatel ručně
