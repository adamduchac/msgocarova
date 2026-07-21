# Naplnění CMS: tým a dokumenty (varianta A)

Web dřív zobrazoval tým („Náš tým" / carousel na úvodu) a dokumenty natvrdo z kódu,
zatímco admin spravoval prázdné tabulky v Supabase. Varianta A přepíná veřejné
stránky na **čtení z databáze** — s fallbackem na původní data, dokud DB nenaplníte.

Render je hotový v kódu. Tento návod je o tom, co spustit **na živé databázi**
(z běhového prostředí to udělat nešlo — soubory nejsou v repu a jde o produkční DB).

## Jak fallback funguje (důležité pro pořadí kroků)

- **Tým:** fallback je **per skupina** (pedagogický / provozní tým zvlášť). Jakmile
  má skupina prvního aktivního člena, přepne se celá na DB. Proto přidejte vždy
  **celou skupinu najednou** (nebo držte členy jako skryté, dokud nebudou zadaní
  všichni), jinak se ve skupině dočasně zobrazí jen ti zadaní.
- **Dokumenty:** fallback je **per kategorie**. Jakmile má kategorie
  („Formuláře a žádosti" nebo „Základní dokumenty") aspoň jeden CMS záznam,
  natvrdo psané dokumenty té kategorie se skryjí. Zadávejte celou kategorii najednou.

## Kroky — POŘADÍ JE DŮLEŽITÉ

Migrace se aplikuje **dřív, než se tento kód dostane na web** (merge do main).
Důvod: nový admin ukládá sloupec `staff_group` a web čte soubory z veřejných
bucketů — obojí vyžaduje migraci. Opačné pořadí je bezpečné pro návštěvníky
(fallback), ale admin by do aplikace migrace hlásil chybu při ukládání
zaměstnanců a nahrané dokumenty by měly nefunkční odkazy. Starému (aktuálnímu)
kódu migrace nevadí — jen přidává sloupec a otevírá čtení bucketů.

### 1. Záloha databáze
Supabase dashboard → **Database → Backups** (nebo `pg_dump`). Migrace je additivní a
tabulky jsou prázdné, ale snapshot udělejte vždy.

### 2. Aplikovat migraci (před mergem!)
`supabase/migrations/20260721000000_staff_group_and_public_buckets.sql`
- přidá sloupec `staff_group` (pedagog/provoz) do `staff`,
- nastaví buckety `staff-photos` a `documents` jako **veřejné** (web je čte přes
  `getPublicUrl`).

Nejjednodušší cesta bez nástrojů: Supabase dashboard → **SQL Editor** → vložit
obsah souboru → Run. (Alternativně `supabase db push` / přes Lovable.)

### 3. Merge větve do main
Teprve po úspěšné migraci mergněte tuto větev — Lovable web automaticky nasadí.

### 4. Zadat obsah přes admin
Přihlaste se do `/admin` (účet s rolí admin).

**Zaměstnanci** — `/admin/zamestnanci` → „Nový medailonek":
- nahrajte fotku, vyplňte jméno, pozici, třídu, **Tým** (pedagogický/provozní),
  pořadí a text (bio).
- Předvyplněný obsah k překopírování je v repu:
  - `src/components/site-teachers.tsx` (dlouhé medailonky pedagogů),
  - `src/data/team.ts` (celý tým včetně provozních, role a zařazení).

**Dokumenty** — `/admin/dokumenty` → nový dokument:
- název, kategorie (Formuláře / Základní dokumenty), nahrát PDF.
- Seznam původních PDF a jejich názvy: `src/routes/pro-rodice.tsx`
  (pole `formulare` a `zakladni`).

### 5. Ověřit
- Úvod → carousel týmu, `/o-skolce` → sekce týmu (pedagog + provoz),
  `/pro-rodice` → dokumenty. Vše musí ukazovat data z DB (fotky/PDF se načtou
  z veřejných bucketů).

### 6. Úklid (volitelně, později)
Až budete jistí, že vše jede z DB, lze odstranit fallback data a asset importy:
- `FALLBACK_TEACHERS` v `src/components/site-teachers.tsx`,
- `src/data/team.ts` a jeho použití v `src/routes/o-skolce.tsx`,
- pole `formulare` / `zakladni` + PDF importy v `src/routes/pro-rodice.tsx`.

Do té doby fallback nic nerozbije — když je DB prázdná, web vypadá jako dřív.
