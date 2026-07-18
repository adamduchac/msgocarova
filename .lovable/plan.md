
## Cíl
Zpřehlednit editor **Texty na webu** a viditelně oddělit tuto sekci od běžné administrace v levém menu.

## Změny

### 1. Kompaktní layout editoru (`src/routes/admin.texty.$page.tsx`)
- Nahradit velké karty se dvěma tlačítky u každého pole **kompaktním řádkovým vzhledem**: label nahoře, auto-resize textarea, pod ní jednořádkově kurzívou výchozí text (truncate + tooltip / title s plným zněním).
- **Per-pole tlačítka „Uložit" / „Obnovit" pryč.** Nahradí je:
  - Globální sticky lišta nahoře s tlačítky **„Uložit vše"** (počítadlo neuložených změn) a **„Zahodit změny"**.
  - U upravených polí malý badge „upraveno" s ikonou reset (jednoklik = smazat override).
- Vizuální rozlišení: **neupravené pole = jemný rámeček**, **upravené = žlutý levý pruh + jemné žluté podbarvení**. Na první pohled je vidět, co se liší od defaultu.
- **Seskupení podle prefixu klíče** (např. `hero.*`, `vzdelavani.*`, `jidelna.*`) do sbalitelných sekcí. Klíče bez prefixu do skupiny „Ostatní".

### 2. Floating search nad editorem
- Sticky vyhledávací pole nahoře („Najít text na stránce…").
- Fulltext přes `defaultText` i aktuální `draft`; při shodě zvýrazní odpovídající pole a ztlumí ostatní. Přepínač „Jen shody" volitelně skryje nesouvisející.
- Enter / klik na výsledek scrolluje k prvnímu poli a nastaví fokus do textarey.
- Řeší use-case: „vidím text na webu, chci najít místo, kde ho v CMS upravit".

### 3. Oddělení v levém menu (`src/routes/admin.tsx`)
- Rozdělit `NAV_ITEMS` do dvou skupin s vizuálním předělem (`border-t border-white/10` + label „Pokročilé" malým uppercase):
  - **Obsah**: Přehled, Top zprávy, Zaměstnanci, Dokumenty, Předškoláček, Zápis
  - **Pokročilé**: Texty na webu
- U položky „Texty na webu" přidat **žlutou ikonu vykřičníku** (`AlertTriangle` z lucide, `text-brand-yellow`) a title tooltip: „Pokročilé — mění strojové texty na webu. Používejte opatrně."

## Mimo rozsah
- **AI asistent** odložen / zrušen dle upřesnění uživatele.
- Beze změny schématu DB, `registry.ts`, `use-copy.ts` i server functions.

## Technické detaily
- Auto-resize textarea přes CSS `field-sizing: content` s fallbackem na `useLayoutEffect` + `scrollHeight`.
- Sticky search: `sticky top-0 z-10 bg-white/90 backdrop-blur` v mainu, pod ní sticky action bar s „Uložit vše".
- Skupiny: split klíče na první `.`; label skupiny odvodit z registry (nebo použít prefix, pokud nic explicitního není).
- Dirty state: `Set<string>` klíčů, které se liší od aktuálního `overrides`. „Uložit vše" iteruje `upsertSiteCopy` sekvenčně, na konci jeden `invalidateQueries`. „Zahodit změny" resetuje drafty zpět na `overrides`.
- Zvýraznění při vyhledávání: přidat class na kontejner pole podle match stavu, žádná manipulace obsahu textarey.
