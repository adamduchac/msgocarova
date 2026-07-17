Ověřil jsem aktuální stav přímo v preview i ve zdroji: sekce „Zážitky, které si děti odnáší“ se nevykresluje z `site-news.tsx`, ale ze `src/components/site-activities.tsx`. Proto se předchozí úpravy v jiné komponentě na HP neprojevily.

Plán opravy:

1. Upravit správnou komponentu `src/components/site-activities.tsx`
   - 2. karta použije novou bazénovou fotku z assetu `box2-2.webp`.
   - 3. karta použije novou fotku ohniště/rodičů z assetu `box3-2.webp`.
   - 2. karta povede na `/vzdelavani-a-rozvoj`.
   - 3. karta povede na `/akce-s-rodici`.

2. Udělat klikací celou kartu, ne jen skryté CTA dole
   - Karty s interním odkazem obalit přes `Link` z TanStack Routeru.
   - Zachovat stejný vizuál, hover animaci a texty.
   - Přidat `cursor-pointer` na celou kartu.
   - Odstranit stav, kdy hlavní karta je jen `article` a klikatelné je až malé CTA.

3. Opravit první kartu podle současného záměru
   - Pokud má zůstat bez cílové stránky, nechám ji vizuálně stejnou bez pointer cursoru.
   - Pokud chceš, aby i první karta byla celá klikací, nastavím jí bezpečný odkaz na příslušnou sekci `/pro-rodice#krouzky` nebo jiný existující cíl.

4. Ověřit po úpravě v preview
   - Zkontroluji DOM: tagy karet, `href`, `cursor: pointer`, `pointer-events`.
   - Ověřím, že 3. karta skutečně vede na `/akce-s-rodici`.
   - Ověřím, že fotky se načítají z nových assetů.