
Cíl: `/pro-rodice` teď má všechen obsah nalevo v `max-w-4xl`, čímž stránka působí monotónně. Vylepšíme rytmus (střídání šířek a pozadí), přidáme ilustrace ke kroužkům a rozbijeme dlouhé seznamy do gridů — vše ve stylu `/o-skolce`.

## Sekce po sekci

**Hero** — beze změny (krémový gradient, nadpis + perex vlevo).

**#platby — Platby** (bílá)
- Text zůstává vlevo (`max-w-3xl`), ale obě karty s účty roztáhneme na plnou šířku kontejneru (2 sloupce na desktopu). Přidáme třetí menší kartu vpravo s poznámkou o variabilním symbolu, aby grid dýchal (3 sloupce → md:3). Alternativa: 2 velké karty účtů + samostatný info-callout pod nimi na plnou šířku s ikonou Info.
- Rozhodnutí: **2 karty účtů na plnou šířku (md:grid-cols-2), pod nimi jemný info callout na plnou šířku** s piktogramem a poznámkou o VS.

**#program-dne — Program dne** (modrý gradient jako "Představení a vize" na /o-skolce)
- Nadpis + krátký perex vlevo (`max-w-3xl`).
- Nahradím tabulku **timeline gridem 4×2** (na desktopu 4 sloupce × 2 řádky, na tabletu 2×4, na mobilu 1 sloupec). Každá dlaždice = bílá karta `rounded-2xl` s:
  - velkým časovým rozsahem nahoře (`font-display`, tabular-nums, brand-blue),
  - tenkou dělící linkou,
  - popiskem činnosti.
  - Vlevo nahoře malý číselný badge (01–08) v jemném modrém kroužku pro pocit „kroků dne".
- **Kroužky a aktivity** — pod timeline, nadpis vlevo (`max-w-3xl`), pak grid `md:grid-cols-3` na plnou šířku kontejneru:
  - 3 bílé karty vedle sebe, každá bez ikony, místo toho **ilustrace nahoře** (`aspect-square` nebo `4/3`, `object-contain`, bílé pozadí, bez rámečku).
  - Šachy → `user-uploads://sachy.webp`
  - Bystrohlavička → `user-uploads://pamet.webp`
  - Stolní hry → `user-uploads://pexeso.webp`
  - Pod ilustrací nadpis kroužku + popisek.
  - Ilustrace nahraji přes `lovable-assets create` do `src/assets/krouzky/*.webp.asset.json`.

**#vybava — Co dítě potřebuje** (bílá)
- Nadpis + perex vlevo (`max-w-3xl`).
- Místo jednoho dlouhého sloupce s odrážkami udělám **grid checklist 2×4** (`md:grid-cols-2 lg:grid-cols-4`) na plnou šířku:
  - 8 malých bílých karet s jemným borderem, každá obsahuje check-ikonu v zeleném kroužku vlevo a text položky.
  - Karty stejné výšky, `items-start`, hover jen jemné zvednutí o 1–2 px (dle memory).

**#dokumenty — Dokumenty ke stažení** (krémová jako teď)
- Nadpis + perex vlevo (`max-w-3xl`).
- Dvě skupiny (Formuláře a žádosti / Základní dokumenty) — momentálně stackované seznamy. Změním na:
  - Každý dokument = **samostatná bílá karta** s FileText ikonou vlevo, názvem, řádkem "PDF · velikost" a Download ikonou vpravo.
  - Karty v gridu `md:grid-cols-2` na plnou šířku (2 sloupce), sekce oddělené podnadpisem.
  - Formuláře (4 položky) → grid 2×2. Základní dokumenty (3 položky) → grid 2 sloupce, poslední karta zůstane sama v řádku (nebo použiji `lg:grid-cols-3` pro plný řádek).
  - Rozhodnutí: **oba gridy `md:grid-cols-2`** pro konzistenci; 3. karta v základních dokumentech přirozeně zabere levou pozici v druhém řádku.

## Technické poznámky
- Pouze `src/routes/pro-rodice.tsx` (přepis obsahu sekcí; hlavička, imports a doc data zůstávají) + 3 nové `.asset.json` pointery pro ilustrace kroužků.
- Zachovat `fixPrepositions` na všech řetězcích, `rounded-2xl`, žádné `hover:scale-*`, respektovat `reveal-fade` třídy jako na /o-skolce (přidat kolem sekcí/gridů).
- Šířky: nadpisy sekcí a perex ve všech sekcích drží `max-w-3xl` vlevo; gridy karet (platby, timeline, kroužky, checklist, dokumenty) jdou na **plnou šířku kontejneru** — tím vznikne rytmus úzký text ↔ široký grid, který stránku rozbije.
- Střídání pozadí zůstává: Platby (bílá) → Program dne (modrý gradient) → Výbava (bílá) → Dokumenty (bílá → krémová) — konzistentní s /o-skolce.
