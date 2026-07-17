
## Fáze 2 – Editace obsahu

Postavíme 5 modulů. Každý má admin UI v `/admin/*` a napojení na veřejnou část webu. Tabulka `announcements` už existuje z fáze 1.

### 1) Top zprávy → `/admin/zpravy`
- Tabulka `announcements` (existuje). Admin UI: seznam, přidat/upravit/smazat, přepínač aktivní, drag pořadí (max 3 aktivní zprávy současně; při 4. aktivní se zobrazí varování).
- Na HP pod hero: proužek se seznamem aktivních zpráv (titulek + krátký náhled). Kliknutí otevře modál s plným obsahem přes krémový overlay a tlačítkem zavřít.
- Obsah = plain text s podporou odstavců (žádný rich text v této fázi).

### 2) Zaměstnanci → `/admin/zamestnanci`
- Nová tabulka `staff`: `photo_path`, `first_name`, `last_name`, `title_prefix` (např. „Mgr."), `title_suffix`, `position` (pozice/role text), `bio` (medailonek), `class_color` enum (`red`/`green`/`blue`/`yellow`/`none`), `phone` (volitelné), `sort_order`, `is_active`.
- Storage bucket `staff-photos` (veřejný pro čtení, admin pro zápis).
- Admin UI: grid karet, dialog na úpravu s uploadem fotky, náhled, řazení.
- Napojení na web: `site-teachers.tsx` (HP karusel), `barevne-tridy.tsx` (podle `class_color`), `team.ts` nahradíme čtením z DB. Statická data zůstanou jako fallback pro prerender.

### 3) Dokumenty → `/admin/dokumenty`
- Nová tabulka `documents`: `title`, `file_path`, `category` enum (`formulare` / `dokumenty`), `sort_order`, `is_active`.
- Storage bucket `documents` (veřejný pro čtení).
- Admin UI: dvě záložky podle kategorie, tlačítko „Nahrát dokument" (drag&drop), přejmenování, mazání.
- Napojení: sekce Dokumenty na `/pro-rodice` – dva sloupce podle kategorie, veřejný odkaz na soubor.

### 4) Infobox Předškoláček → `/admin/predskolacek`
- Nová tabulka `info_boxes` s klíčem (`page_key` unique: `predskolacek` | `zapis`) a poli: `state` (`open`/`upcoming`/`closed`), `heading`, `body`, `deadline_label`, `capacity_label`, `note`.
- Admin UI: jeden formulář, náhled stavu (barevný accent podle `state` – zelená/oranžová/šedá – shodně s existujícím `StatusBlock`).
- Napojení: `StatusBlock` na `/predskolacek` čte řádek `predskolacek`.

### 5) Infobox Zápis → `/admin/zapis`
- Stejná tabulka `info_boxes`, klíč `zapis`. Stejný formulář jako u Předškoláčka.
- Napojení: `StatusBlock` na `/zapis-do-skolky`.

---

### Technická poznámka (pro tebe, ne k odsouhlasení)

- Data se čtou ze serveru přes TanStack Query + `createServerFn` (veřejná čtení publishable klíčem; admin zápisy přes `requireSupabaseAuth` + role check `has_role`). Router loader primuje cache pomocí `ensureQueryData`.
- Fallback: pokud DB řádek chybí, veřejná stránka použije stávající hardcoded text (žádná prázdná stránka).
- Všechny nové tabulky: RLS zapnuté, GRANT dle vzoru, admin má full přístup přes `has_role`, veřejné čtení jen kde dává smysl (announcements, staff `is_active`, documents `is_active`, info_boxes).
- Fáze 2 se týká **jen dat**. Vizuální podoba stránek zůstává stejná, jen se zdroj obsahu přesune do CMS.

---

### Otázky před spuštěním

1. **Rozsah**: Uděláme všech 5 modulů najednou, nebo chceš začít třeba jen Top zprávami + Zaměstnanci a zbytek pak?
2. **Zprávy – limit**: 3 aktivní zprávy jsem stanovil já dle původní specifikace. Potvrzuješ, nebo chceš flexibilnější limit (např. bez limitu, jen řazení)?
3. **Statická data staff a stránek**: Necháme stávající data v kódu jako fallback (bezpečnější), nebo je po importu smažeme (čistší, ale rozbije se web, když admin smaže všechno)?

Pokud odpovíš „jedeme vše, 3 zprávy OK, fallback ponechat", pustím fázi 2 v jednom průchodu.
