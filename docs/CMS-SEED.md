# Naplnění CMS: tým a dokumenty (varianta A)

Web dřív zobrazoval tým („Náš tým" / carousel na úvodu) a dokumenty natvrdo z kódu,
zatímco admin spravoval prázdné tabulky v Supabase. Varianta A přepíná veřejné
stránky na **čtení z databáze** — s fallbackem na původní data, dokud DB nenaplníte.

Obsah není potřeba zadávat ručně: `supabase/seed-cms-content.sql` naplní databázi
původním obsahem webu automaticky (10 členů týmu vč. medailonků, 7 PDF). Fotky a
PDF se nikam nekopírují — databáze odkazuje na soubory, které web už hostuje;
nové soubory nahrané později přes admin se ukládají normálně do Supabase Storage.

## Záznam nasazení (červenec 2026)

Provedeno přes Lovable (DB jede na Lovable Cloud, bez přímého přístupu do
Supabase):

1. Záloha DB ✅
2. Migrace `20260721000000` (sloupec `staff_group`) ✅ — **až na buckety**:
   workspace nepovoluje veřejné buckety (`public_buckets_blocked`), takže část
   `public = true` nebyla aplikována.
3. Náhradní řešení úložiště: anon **čtecí RLS politiky** na bucketech
   (`20260721120000_storage_read_policies.sql`) + kód servíruje admin-nahrané
   soubory přes **podepsané URL**. Expozice obsahu je stejná — soubory jsou
   určené veřejnému webu.
4. Tabulka `staff` obsahovala 10 starých prázdných řádků (bez bio/fotek) →
   `TRUNCATE public.staff` a nové spuštění seedu.
5. Seed `supabase/seed-cms-content.sql`: `staff = 10` (7 pedagog + 3 provoz,
   bio + fotky), `documents = 7` ✅

### Ověření po nasazení
- Úvod → carousel týmu, `/o-skolce` → sekce týmu (pedagogický + provozní),
  `/pro-rodice` → dokumenty.
- `/admin/zamestnanci` a `/admin/dokumenty` → obsah je vidět a dá se upravovat.
- Od této chvíle web zobrazuje to, co je v adminu; úpravy se dělají tam.

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
