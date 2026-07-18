## Plán úpravy stránky `/kontakty`

Cíl: vycentrovat textový sloupec vlevo s mapou vpravo a změnit poměr stran mapy na 4:3.

### 1. Změna poměru stran mapy
- V hero pravém sloupci najít kontejner mapy (aktuálně `aspect-square`) a změnit na `aspect-[4/3]`.
- Zachovat `w-full`, zaoblení `rounded-[28px]`, stín a border.

### 2. Vertikální centrování levého sloupce
- V gridu hero sekce (aktuálně `lg:grid-cols-2 lg:items-start lg:gap-14`) změnit `lg:items-start` na `lg:items-center`.
- Tím se levý textový blok (nadpis, lead, kontakty) vertikálně vycentruje s mapou vpravo.

### 3. Ověření
- Spustit build (`bunx vite build` / `bun run build`) a zkontrolovat, že stránka `/kontakty` kompiluje bez chyb.
- Volitelně screenshot preview na desktopu pro kontrolu vertikálního zarovnání a poměru stran mapy.

Žádné jiné stránky ani logika se nemění.