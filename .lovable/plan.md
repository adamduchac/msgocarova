## Cíl
Nahradit všechny výskyty em-dash `—` (U+2014) za en-dash `–` (U+2013) napříč webem — jak ve zdrojácích, tak v obsahu uloženém v databázi (CMS).

## Rozsah

### 1) Zdrojové soubory (`src/`)
Hromadný `sed` přes všechny `.ts/.tsx/.css/.md` soubory pod `src/`. Postiženo cca 32 souborů, viz například:
- `src/routes/*.tsx` (index, o-skolce, barevne-tridy, pro-rodice, kontakty, predskolacek, zapis-do-skolky, vzdelavani-a-rozvoj, akce-s-rodici, admin.*)
- `src/components/*.tsx` (site-hero, site-navbar, site-footer, site-classes, site-teachers, site-news, site-benefits, site-daily-rhythm, site-announcements, status-block, admin/*)
- `src/lib/site-copy/registry.ts` (default hodnoty pro CMS klíče — 299 výskytů)
- `src/lib/typography.ts`, `src/server.ts`, `src/hooks/use-reveal-on-scroll.ts`, `src/styles.css`

Komentáře v kódu se také přepíšou, což je neškodné (jen typografický znak).

### 2) Databáze (CMS obsah)
Uživatel v CMS mohl přepsat texty, které pak overridují defaulty z registry. Provést UPDATE nad tabulkami:
- `site_copy` — sloupec s hodnotou textu: `REPLACE(value, '—', '–')`
- `announcements` — pole `title`, `body` (rich text): `REPLACE(..., '—', '–')`

## Postup
1. `sed -i 's/—/–/g'` přes všechny relevantní soubory v `src/`.
2. Migrace / SQL update nad `site_copy` a `announcements`.
3. Ověřit build a rychlý vizuální kontrolní pohled na HP + 1 podstránku.

## Poznámka
Funkce `fixPrepositions` v `src/lib/typography.ts` se týká pevných mezer u jednopísmenných předložek — pomlček se netýká, není třeba měnit logiku.