## Drobné úpravy: přepínač, subfooter, animace karet

### 1. `site-classes.tsx` — větší přepínač vpravo vedle obrázku
- Wrapper ilustrace přidat `lg:pr-40` (a `md:pr-32`), aby vpravo zbylo místo na svislý přepínač.
- Přepínač přesunout z `absolute right-0 top-0` na `absolute top-1/2 -translate-y-1/2 right-[-1rem] md:right-0 lg:right-2` — vertikálně centrovaný vedle pravé hrany obrázku.
- Layout přepínače změnit z horizontálního pillu (toggle + text vedle sebe) na **vertikální stack**:
  - kontejner `flex flex-col items-center gap-3 cursor-pointer`
  - samotný toggle větší: track `h-9 w-16`, knob `h-7 w-7`, posun knobu `translate-x-[28px]` v "on" stavu
  - ikonky uvnitř knobu zvětšit na `h-4 w-4`
  - text **pod přepínačem**, `text-[14px] font-semibold text-ink`, `text-center`, min šířka `min-w-[10rem]` aby se label neměnil skokově
- `<button>` doplnit o `cursor-pointer` (interaktivní hand cursor; sjednocení s ostatními tlačítky/kartami).
- Drobnost: kontejner přepínače dál `pointer-events-auto`.

### 2. `site-footer.tsx` — subfooter zarovnat doleva
- Bottom bar (řádek 115): `text-center` → `text-left`. Vše ostatní (separátory, odkaz na ADDU) zůstává.

### 3. `site-activities.tsx` — rychlejší stagger karet "Zážitky, které si děti odnesou do školy"
- Stagger karet: `i * 110ms` → `i * 60ms` (řádek 56). Snižuje celkové čekání mezi kartami z 220 ms (2. karta) a 330 ms (3. karta) na 60/120 ms — nástup působí svižněji a synchronněji.
- Sama doba reveal animace (`600ms`) zůstává — definovaná globálně v `src/styles.css` a používaná i ostatními sekcemi.