## Cíl

Přidat do CMS modul **„Texty na webu"** — možnost přepsat libovolný textový blok na stránce. Pilot, plain text, bez AI. V každém editačním boxu bude nad textareou vidět **současný výchozí text** (šedá kurzíva) jako reference.

## Rozsah pilotu

Dvě stránky:
- `/o-skolce`
- `/pro-rodice`

Ostatní stránky přidáme až po odzkoušení. Registry je navržen tak, aby přidat další stránku znamenalo jen doplnit další soubor s klíči a fallbacky.

## Jak to funguje

1. Zdrojový text zůstává v `.tsx` jako **fallback** (nic nezmizí, když je CMS prázdný).
2. V CMS je pro každý identifikovaný textový blok jedno pole s klíčem `(page, key)` — např. `("o-skolce", "hero.h1")`.
3. Hook `useCopy("o-skolce", "hero.h1", "O školce")` vrátí přepis z databáze, nebo fallback z třetího argumentu.
4. Prázdné pole v CMS = smazání přepisu = návrat k výchozímu textu.

## CMS UI

- Nová položka **„Texty na webu"** v levém menu admina (dole, ikona pero).
- Rozcestník s dvěma dlaždicemi: **O školce** a **Pro rodiče**.
- Na detailu stránky **žlutý warning banner** nahoře:
  > „Pokročilá funkce. Změny se projeví na webu okamžitě. Prosím zachovejte původní strukturu (délku, formátování) — texty jsou navržené pro konkrétní layout. Prázdné pole = návrat k výchozímu textu."
- Pod ním seznam bloků (nadpis, odstavce, popisky karet, položky odrážek). Každý blok:
  - **Label** vlevo nahoře (např. „Hero — nadpis" nebo „Vzdělávání — 3. odrážka").
  - **Šedá kurzíva** s výchozím textem (`text-body/60 italic text-sm`) — viditelný fallback jako reference.
  - **Textarea** pod tím, prázdná dokud není přepis; když existuje přepis, předvyplněná jím.
  - Tlačítko **„Vrátit výchozí"** vedle textarey (smaže řádek v DB, pole se vyprázdní).
- Dole **„Uložit změny"** — pošle jen změněné klíče.

## Technicky (pro dev)

### Databáze
Migrace `site_copy`:
- `page` (text, not null), `key` (text, not null), `value` (text, not null)
- `unique (page, key)`, index na `page`
- RLS: SELECT pro `anon` + `authenticated` (texty jsou veřejné), INSERT/UPDATE/DELETE jen pro `admin` přes `has_role(auth.uid(), 'admin')`
- GRANT: SELECT to anon + authenticated; ALL to service_role

### Frontend
- `src/lib/site-copy/registry.ts` — objekt `{ [page]: { [key]: { label, defaultText } } }`. V pilotu jen `o-skolce` a `pro-rodice`.
- `src/lib/site-copy.functions.ts` — server functions:
  - `getSiteCopy({ page })` — veřejná, čte přes server publishable client (žádné `requireSupabaseAuth`, aby to fungovalo v SSR loaderu).
  - `upsertSiteCopy({ page, key, value })` a `deleteSiteCopy({ page, key })` — `requireSupabaseAuth` + kontrola `has_role`.
- `src/lib/use-copy.ts` — hook `useCopy(page, key, fallback)` — čte z React Query cache (`queryKey: ["site-copy", page]`), vrací fallback pokud přepis chybí.
- Loader stránek `/o-skolce` a `/pro-rodice` zavolá `ensureQueryData` na `getSiteCopy` — obsah je předrenderovaný v SSR.
- Postupně nahradím literály na obou stránkách voláním `useCopy(...)`. Původní český text jde jako `fallback` argument — stránka funguje i bez DB.

### Admin
- `src/routes/admin.texty.tsx` — rozcestník (2 dlaždice).
- `src/routes/admin.texty.$page.tsx` — editor jedné stránky. Ověří, že `$page` je v registry, jinak `notFound()`.
- Menu link v `src/routes/admin.tsx` sidebar.
- Reuse `src/components/admin/ui.tsx` styly.

### Extrakce klíčů (nejpracnější část)
Projdu `src/routes/o-skolce.tsx` a `src/routes/pro-rodice.tsx` a pro každý viditelný textový string vytvořím záznam v registry (`hero.h1`, `hero.lead`, `vision.card1.title`, `vision.card1.body`, `education.bullet.1`, …). U dlouhých seznamů (např. odrážky) jeden klíč = jeden řádek, aby se dalo editovat každý zvlášť.

Vynechávám: navbar, footer, ikony, texty spravované jinými CMS moduly (top zprávy, medailonky, dokumenty, infoboxy).

## Co bude potřeba doplnit později (mimo pilot)

- Zbývajících 7 stránek (`/`, `/barevne-tridy`, `/vzdelavani-a-rozvoj`, `/akce-s-rodici`, `/predskolacek`, `/zapis-do-skolky`, `/kontakty`) — stejným postupem.
- Případně bulk „Export/Import JSON" pro rychlé zálohy.
