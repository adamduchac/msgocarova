# Naplnění CMS: tým a dokumenty (varianta A)

Web dřív zobrazoval tým („Náš tým" / carousel na úvodu) a dokumenty natvrdo z kódu,
zatímco admin spravoval prázdné tabulky v Supabase. Varianta A přepíná veřejné
stránky na **čtení z databáze** — s fallbackem na původní data, dokud DB nenaplníte.

Obsah není potřeba zadávat ručně: `supabase/seed-cms-content.sql` naplní databázi
původním obsahem webu automaticky (10 členů týmu vč. medailonků, 7 PDF). Fotky a
PDF se nikam nekopírují — databáze odkazuje na soubory, které web už hostuje;
nové soubory nahrané později přes admin se ukládají normálně do Supabase Storage.

## Kroky — POŘADÍ JE DŮLEŽITÉ

### 1. Záloha databáze
Supabase dashboard → **Database → Backups** (nebo `pg_dump`). Změny jsou additivní
a tabulky prázdné, ale snapshot udělejte vždy.

### 2. Aplikovat migraci (před mergem!)
`supabase/migrations/20260721000000_staff_group_and_public_buckets.sql`
- přidá sloupec `staff_group` (pedagog/provoz) do `staff`,
- nastaví buckety `staff-photos` a `documents` jako **veřejné**.

Nejjednodušší cesta bez nástrojů: Supabase dashboard → **SQL Editor** → vložit
obsah souboru → Run. (Alternativně `supabase db push` / přes Lovable.)

Proč před mergem: nový admin ukládá sloupec `staff_group` a web čte soubory
z veřejných bucketů — obojí vyžaduje migraci. Starému (aktuálnímu) kódu migrace
nevadí.

### 3. Merge větve do main
Teprve po úspěšné migraci mergněte PR — Lovable web automaticky nasadí.

### 4. Naplnit obsah (po merge!)
Supabase dashboard → **SQL Editor** → vložit obsah `supabase/seed-cms-content.sql`
→ Run. Poslední řádek vypíše počty: `staff_rows = 10`, `document_rows = 7`.

Skript je bezpečný proti dvojímu spuštění (vkládá jen do prázdných tabulek).
Proč až po merge: starý kód zobrazoval CMS dokumenty *navíc* k vestavěným —
seed před mergem by na webu krátkodobě ukázal každý dokument dvakrát.

### 5. Ověřit
- Úvod → carousel týmu, `/o-skolce` → sekce týmu (pedagogický + provozní),
  `/pro-rodice` → dokumenty.
- `/admin/zamestnanci` a `/admin/dokumenty` → obsah je vidět a dá se upravovat.
- Od této chvíle web zobrazuje to, co je v adminu; úpravy děláte tam.

## Jak funguje fallback (pro pozdější ruční úpravy)

Když je databáze (částečně) prázdná, web ukáže původní vestavěný obsah:

- **Tým:** per skupina (pedagogický / provozní zvlášť) — skupina se přepne na DB,
  jakmile má prvního aktivního člena. Po seedu jsou obě skupiny plné, takže to
  řešíte jen kdybyste někdy všechny členy skupiny smazali.
- **Dokumenty:** per kategorie (Formuláře / Základní dokumenty) — stejný princip.

Smazání všeho v adminu tedy nic nerozbije — web se vrátí k původnímu obsahu.

## Úklid (volitelně, mnohem později)

Fallback data v kódu (`FALLBACK_TEACHERS`, `src/data/team.ts`, pole
`formulare`/`zakladni` v `pro-rodice.tsx`) lze časem odstranit.

**POZOR:** seedované řádky odkazují na soubory hostované webem (cesty
`/__l5e/...`), které patří k asset souborům v `src/assets/`. Ty **nemazat**,
dokud v adminu nenahrajete vlastní verze fotek a PDF (tím se odkazy přepnou na
Supabase Storage a na vestavěných souborech přestanou záviset).
