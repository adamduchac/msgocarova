## Změny v `src/components/site-news.tsx`

1. **Nahradit fotky** (nahrát přes `lovable-assets` z `/mnt/user-uploads/`):
   - `box2-2.webp` → nová 2. karta (bazén)
   - `box3-2.webp` → nová 3. karta (opékání)
   - Vytvořit `.asset.json` pointery v `src/assets/`, staré `art` a `openday` importy odstranit.

2. **Odkazy na celé karty:**
   - 2. karta: `href="/vzdelavani-a-rozvoj"`
   - 3. karta: `href="/akce-s-rodici"` (už existuje)
   - 1. karta zůstává bez odkazu (`<article>`).

3. **Klikatelnost celé plochy + cursor pointer:**
   - Karty s `href` renderovat jako `<a>` s `block` layoutem — potvrzeno v kódu (řádky 91–99), třída `commonClass` už obsahuje `cursor-pointer` a `flex flex-col`. Funguje správně; uživatel hlásí, že to nefunguje — pravděpodobně proto, že 2. karta zatím nemá `href`, takže se renderuje jako `<article>` bez odkazu. Přidáním `href` na 2. kartu se problém vyřeší.
   - Ověřím, že žádný vnitřní element neblokuje klik (aktuálně žádný `<a>` uvnitr není).

## Výsledek
- Všechny tři karty (kromě 1., která zůstává statická) budou plně klikací s cursor pointer.
- Aktualizované obrázky a alt texty odpovídající novým fotkám.
