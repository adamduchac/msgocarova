## Diagnóza — proč to není smooth a jednotné

Po projití reveal systému jsem našel **4 konkrétní příčiny**, hlavně u daily-rhythm sekce:

### 1. Daily-rhythm má brutální stagger delays (hlavní viník)
`src/components/site-daily-rhythm.tsx` ř. 61:
```
const delays = ["0ms", "440ms", "880ms", "1320ms", "1760ms"];
```
Poslední karta čeká **1,76 s** než vůbec začne animaci. Na mobilu (×0.5) = 880 ms. Mezitím už uživatel je dávno níž → vypadá to, že se karty „načítají bez efektu".

### 2. Mobilní horizontální slider — reveal triggeruje mimo viewport
Na mobilu jsou polaroidy v `overflow-x-auto`. IntersectionObserver kontroluje jen vertikální průnik s viewportem → revealne **všech 5 karet najednou** v okamžiku, kdy je sekce ve viewportu, ale uživatel vidí jen kartu 1 (ostatní jsou horizontálně mimo). Když pak swipuje, vidí už hotovou kartu = žádný efekt.

### 3. Stagger inkrementy jsou napříč webem různé
- activities: `i*60ms` ✓
- quick-links: `i*80ms` ✓
- classes: `i*90ms` ✓
- benefits / news: `i*110ms` (lehce pomalejší)
- daily-rhythm: `i*440ms` (4× větší)

Nejednotnost se projeví hlavně mezi sousedními sekcemi.

### 4. IntersectionObserver trigger trochu pozdě (desktop)
`threshold: 0.12` + `rootMargin: -18%` znamená: prvek musí být minimálně 12 % viditelný **a** zároveň aspoň 18 % od spodní hrany viewportu. Na rychlém scrollu se to triggeruje pozdě → animace doběhne, když už je karta dávno na obrazovce, nebo začne dřív, než ji vidíš.

## Chirurgický plán

### A. Daily-rhythm delays — nejdůležitější jeden řádek
`src/components/site-daily-rhythm.tsx` ř. 61:
```ts
const delays = ["0ms", "80ms", "160ms", "240ms", "320ms"];
```
Celý stagger doběhne za 920 ms místo 2,36 s. Zachová pocit „kaskády" bez čekání.

### B. Daily-rhythm mobile — vypnout per-card reveal
Karty v horizontálním slideru nesmí mít reveal (uživatel je beztak nevidí v moment triggeru). V `src/styles.css` přidat:
```css
@media (max-width: 767px) {
  #bezny-den ol .reveal-up {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```
Header `<header className="reveal-up">` si animaci ponechá.

### C. Sjednotit stagger inkrement na 80 ms
- `site-benefits.tsx` ř. 76: `i * 110` → `i * 80`
- `site-news.tsx` ř. 61: `i * 110` → `i * 80`
- activities (60), classes (90), quick-links (80) → ponechat, jsou v rozmezí ±20 ms a působí konzistentně.

### D. IntersectionObserver — citlivější trigger
`src/hooks/use-reveal-on-scroll.ts` ř. 36–39:
```ts
rootMargin: isCoarse ? "0px" : "0px 0px -8% 0px",
threshold: 0,
```
- `threshold: 0` — spustí, jakmile **1px** prvku vstoupí do oblasti (deterministické).
- `rootMargin -8%` místo `-18%` — animace začne dřív, doběhne přesně když je prvek čitelný.

### E. Bezpečnostní fallback proti „flash of invisible content"
Kdyby z jakéhokoliv důvodu (slow hydrate, route transition) hook nestihnul observe, prvek by zůstal `opacity: 0` napořád. V hooku přidat 1500 ms timeout, který odemkne všechny zbylé:
```ts
const safety = setTimeout(() => {
  document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-visible"));
}, 1500);
```
A vyčistit v cleanup.

## Soubory k úpravě
- `src/components/site-daily-rhythm.tsx` — delays array
- `src/components/site-benefits.tsx` — stagger 110→80
- `src/components/site-news.tsx` — stagger 110→80
- `src/styles.css` — mobile override pro #bezny-den slider
- `src/hooks/use-reveal-on-scroll.ts` — threshold/rootMargin + safety timeout

## Co plán **neřeší**
- Žádný redesign animací, žádná migrace na Framer Motion.
- Nezasahuje do hero, navbaru, classes — fungují dobře po předchozím kole.
- Polaroidní rotace/translate Tailwind utility na kartách (`md:rotate-*`, `md:-translate-y-*`) se nemění — ty používají separátní CSS vlastnosti `rotate`/`translate` a s reveal `transform`em si nekonkurují.