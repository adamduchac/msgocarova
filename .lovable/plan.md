Převedu 4 barevné boxy na HP z nefunkčních `<a href="#">` na odkazy vedoucí na stránku `/barevne-tridy` s přesným hashem na konkrétní třídu.

## Co se změní

1. **Úprava `src/components/site-classes.tsx`**
   - Rozšířit data každé třídy o `id` (`cervena`, `zelena`, `modra`, `zluta`) a `hash` (`#cervena`, `#zelena`, `#modra`, `#zluta`).
   - Nahradit aktuální `<a href="#">` za TanStack `<Link>` s `to="/barevne-tridy" hash={c.id}`.
   - Aktualizovat `aria-label` z "Vstupte do třídy — Červená kostička" na smysluplný popis odkazu (např. "Přejít na detail Červené kostičky").
   - Ponechat vizuální styl (rounded-3xl, hover/focus efekty, CTA pill) a animace; odkaz nesmí změnit estetiku.

2. **Stránka `/barevne-tridy` je již připravená**
   - Sekce jednotlivých tříd mají správná ID (`cervena`, `zelena`, `modra`, `zluta`) a `scroll-mt-28`, takže hash navigace dopadne na správné místo.

3. **Detaily implementace**
   - Import `<Link>` z `@tanstack/react-router`.
   - Změna se netýká žádných serverových funkcí, databáze ani env proměnných.
   - Zachová se zakázaný hover scale dle project memory — karta zůstane jen posunutím/spuštěním CTA pill, bez `hover:scale-*`.

4. **Ověření**
   - Provedu kontrolu buildu přes `bun run build`.
   - Zkontroluji, že každý box odkazuje na správný hash a že se stránka správně posune na příslušnou třídu.

## Výsledek
Na homepage kliknutí na libovolný barevný box povede na `/barevne-tridy#cervena` (resp. #zelena, #modra, #zluta) a prohlížeč automaticky scrolluje na začátek dané třídy.