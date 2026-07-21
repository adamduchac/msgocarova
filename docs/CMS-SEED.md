# Naplnění CMS: tým a dokumenty (varianta A)

Web dřív zobrazoval tým („Náš tým" / carousel na úvodu) a dokumenty natvrdo z kódu,
zatímco admin spravoval prázdné tabulky v Supabase. Varianta A přepíná veřejné
stránky na **čtení z databáze** — s fallbackem na původní data, dokud DB nenaplníte.

Obsah není potřeba zadávat ručně: `supabase/seed-cms-content.sql` naplní databázi
původním obsahem webu automaticky (10 členů týmu vč. medailonků, 7 PDF). Fotky a
PDF se nikam nekopírují — databáze odkazuje na soubory, které web už hostuje;
nové soubory nahrané později přes admin se ukládají normálně do Supabase Storage.

## Kroky — POŘADÍ JE DŮLEŽITÉ

Dvě cesty podle toho, jaký máte přístup k databázi:

- **A) Lovable Cloud** (nemáte přímý přístup do Supabase) → postup níže.
- **B) Přímý přístup do Supabase SQL Editoru** → viz „Cesta B" na konci sekce.

### 1. Záloha databáze
Zálohu databáze si ověřte/pořiďte (Lovable Cloud ji spravuje; při přímém
přístupu Supabase → Database → Backups). Změny jsou additivní a tabulky prázdné,
ale snapshot mějte vždy.

### 2. Merge větve do main
Mergněte PR — Lovable web automaticky nasadí a uvidí oba SQL soubory v repu.
(Do provedení kroku 3 jede web dál postaru díky fallbacku; jen ukládání
zaměstnanců v adminu by hlásilo chybu — proto krok 3 proveďte hned po merge.)

### 3. Jeden prompt do Lovable (migrace + naplnění)
Do chatu v Lovable vložte doslova tento příkaz:

> Potřebuji pouze zásah do databáze, žádné změny kódu. V repu jsou dva SQL
> soubory:
>
> 1. Pokud tabulka `public.staff` ještě nemá sloupec `staff_group`, aplikuj
>    migraci `supabase/migrations/20260721000000_staff_group_and_public_buckets.sql`.
> 2. Potom spusť celý obsah souboru `supabase/seed-cms-content.sql` beze změn
>    (je idempotentní, plní jen prázdné tabulky).
>
> Na závěr vypiš kontrolu: počet řádků v `public.staff` (očekávám 10) a
> `public.documents` (očekávám 7) a potvrď, že buckety `staff-photos` a
> `documents` mají `public = true`. Neupravuj žádný kód ani jiné části databáze.

### Cesta B (přímý přístup do Supabase)
Stejné SQL ručně: 1) záloha, 2) SQL Editor → obsah migrace → Run, 3) merge PR,
4) SQL Editor → obsah `seed-cms-content.sql` → Run (vypíše `staff_rows = 10`,
`document_rows = 7`).

### 4. Ověřit
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
