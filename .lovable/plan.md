Plán úpravy stránky `/vzdelavani-a-rozvoj`:

1. **Změna layoutu na grid 3+2**
   - Spojit dosavadní sekce Vzdělávání (2 karty) a Aktivity (3 karty) do jednoho gridu.
   - Použít Tailwind třídy `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` s mezerami dle stávajícího rytmu.
   - Poslední pozice druhého řádku zůstane prázdná (přiznaná), tj. 5 karet celkem.

2. **Odstranění hlavních nadpisů skupin**
   - Odstranit komponentu `GroupHeader` pro "Vzdělávání" a "Aktivity".
   - Sekce se sloučí do jedné hlavní oblasti pod společným úvodním textem.

3. **Přidání eyebrow labelů nad každou kartu**
   - Nad každý nadpis karty přidat eyebrow s textem "Vzdělávání" (2×) nebo "Aktivity" (3×).
   - Styling eyebrow: `font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55`, tedy stejný jako na homepage (SiteClasses, SiteTeachers).

4. **Jednotná karta**
   - Všechny 5 karet použijí stejný formát `AreaCard` (foto 4:5, eyebrow, nadpis, odrážky aktivit).
   - Upravit data/cykly tak, aby se 5 karet vykreslilo jako jeden flat array v předepsaném pořadí: jazyk, příprava/technologie, plavání, škola v přírodě, lyžařský kurz.

5. **Kontrola responzivity**
   - Na mobilech 1 sloupec, na tabletu 2 sloupce, na desktopu 3 sloupce.
   - Druhý řádek na desktopu bude mít 2 karty a 1 prázdnou pozici.

6. **Build a validace**
   - Po editaci spustit build a ověřit, že stránka prochází bez chyb.
   - V případě potřeby upravit typ `Area` o volitelné pole `eyebrow: "Vzdělávání" | "Aktivity"`.