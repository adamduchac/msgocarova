# Naplnění CMS: tým a dokumenty (varianta A)

Web dřív zobrazoval tým („Náš tým" / carousel na úvodu) a dokumenty natvrdo z kódu,
zatímco admin spravoval prázdné tabulky v Supabase. Varianta A přepíná veřejné
stránky na **čtení z databáze** — s fallbackem na původní data, dokud DB nenaplníte.

Render je hotový v kódu. Tento návod je o tom, co spustit **na živé databázi**
(z běhového prostředí to udělat nešlo — soubory nejsou v repu a jde o produkční DB).

## Jak fallback funguje (důležité pro pořadí kroků)

- **Tým:** jakmile existuje **první aktivní pedagog**, carousel i sekce týmu se
  přepnou celé na DB. Proto přidejte **všechny** zaměstnance najednou (nebo je držte
  jako skryté, dokud nebudou zadaní všichni), jinak se dočasně zobrazí jen ti zadaní.
- **Dokumenty:** fallback je **per kategorie**. Jakmile má kategorie
  („Formuláře a žádosti" nebo „Základní dokumenty") aspoň jeden CMS záznam,
  natvrdo psané dokumenty té kategorie se skryjí. Zadávejte celou kategorii najednou.

## Kroky

### 1. Záloha databáze
Supabase dashboard → **Database → Backups** (nebo `pg_dump`). Migrace je additivní a
tabulky jsou prázdné, ale snapshot udělejte vždy.

### 2. Aplikovat migraci
`supabase/migrations/20260721000000_staff_group_and_public_buckets.sql`
- přidá sloupec `staff_group` (pedagog/provoz) do `staff`,
- nastaví buckety `staff-photos` a `documents` jako **veřejné** (web je čte přes
  `getPublicUrl`).

Aplikuje se přes Lovable / Supabase (push migrace nebo `supabase db push`).

### 3. Zadat obsah přes admin
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

### 4. Ověřit
- Úvod → carousel týmu, `/o-skolce` → sekce týmu (pedagog + provoz),
  `/pro-rodice` → dokumenty. Vše musí ukazovat data z DB (fotky/PDF se načtou
  z veřejných bucketů).

### 5. Úklid (volitelně, později)
Až budete jistí, že vše jede z DB, lze odstranit fallback data a asset importy:
- `FALLBACK_TEACHERS` v `src/components/site-teachers.tsx`,
- `src/data/team.ts` a jeho použití v `src/routes/o-skolce.tsx`,
- pole `formulare` / `zakladni` + PDF importy v `src/routes/pro-rodice.tsx`.

Do té doby fallback nic nerozbije — když je DB prázdná, web vypadá jako dřív.
