
## Úpravy

### 1) `/akce-s-rodici` — nahradit 3. fotku
- Nahrát `user-uploads://rodice3-2.webp` přes `lovable-assets create` a přepsat pointer `src/assets/akce/rodice3.webp.asset.json` (nebo vytvořit nový `rodice3-2.webp.asset.json` a upravit import v `src/routes/akce-s-rodici.tsx`). Preferuji přepsat existující `rodice3.webp.asset.json` novým asset_id, aby import zůstal beze změny.

### 2) `/akce-s-rodici` — „Přehled akcí" zarovnat vlevo
V `src/routes/akce-s-rodici.tsx` odstranit `mx-auto` z wrapperu sekce „Přehled akcí" (`<div className="reveal-up mx-auto max-w-3xl">` → `<div className="reveal-up max-w-3xl">`). Ponechat `max-w-3xl`, výsledek bude zarovnaný vlevo v containeru.

### 3) HP — kurzor pointer na kartách aktualit
V `src/components/site-news.tsx` přidat `cursor-pointer` do `commonClass` (aplikuje se na `<a>` i `<article>`, ať se chová konzistentně u všech tří karet).

### 4) HP — vyměnit fotky u 2. a 3. karty aktualit
- 2. karta („Nový kroužek – Malý umělec"): nahradit obrázek za `user-uploads://box2.webp` (bazén). Nahrát přes `lovable-assets` a přepsat pointer `src/assets/news-art.jpg.asset.json` novým asset_id.
- 3. karta („Akce s rodiči"): nahradit obrázek za `user-uploads://box3.webp` (opékání buřtů). Přepsat pointer `src/assets/news-openday.jpg.asset.json`.

Alt texty aktualizovat, aby odpovídaly novým fotkám. Texty a badge zůstávají.

## Technické detaily
- Použít `lovable-assets create --file /mnt/user-uploads/<file> --filename <name>.webp > src/assets/<pointer>.asset.json` pro přepsání pointeru. Importy v komponentách zůstanou beze změny.
- Nic jiného na těchto stránkách neměnit.
