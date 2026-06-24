# Hero – úpravy

## 1) Vyčistit
- Odstranit oba dekorativní SVG doodly (zelený oblouk, červené kolečko) nad fotkou.
- Odstranit celý spodní pás čtyř kostiček (modrá/červená/zelená/žlutá) i spacer pod ním (pokud bude prázdný, zmenšit).

## 2) Slider pro hero fotku
- Nahrát druhou fotku `hero_B.webp` přes `lovable-assets` jako `src/assets/hero-kids-2.jpg.asset.json`.
- Uvnitř masky (drop-shadow zůstává na wrapperu) vytvořit crossfade+slide slider:
  - Dvě absolutně pozicované `<img>` vrstvy přes sebe, obě `object-cover h-full w-full`.
  - Stav `index` (0/1), `setInterval` ~6000 ms, čistí se v `useEffect` cleanup.
  - Přechod ~1100 ms, easing `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out).
  - Odcházející slide: `translateY(0 → 6%)` + `opacity 1 → 0`.
  - Přicházející slide: `translateY(-6% → 0)` + `opacity 0 → 1`.
  - `will-change: transform, opacity`, GPU friendly, funguje i na mobilu.
  - Respektovat `prefers-reduced-motion`: vypnout autoplay i animaci (statická první fotka).
- Pod sliderem skrytý alt text se neztratí – `alt` na aktivní vrstvě, druhá `aria-hidden`.

## 3) Plovoucí kostičky A (modrá) a B (zelená)
- Nahrát `kosticky_hero_A.png` → `src/assets/cube-hero-a.png.asset.json`, `kosticky_hero_B.png` → `src/assets/cube-hero-b.png.asset.json`.
- Umístění (absolute vůči photo wrapperu, mimo masku, takže přesahují přes okraj):
  - A (modrá): vlevo nahoře, cca `top: -6%`, `left: -6%`, mírně přesahuje ven.
  - B (zelená): vpravo dole, cca `bottom: -8%`, `right: -4%`, mírně přesahuje ven.
  - Velikost responzivní: ~`w-20` mobile → `w-28/32` desktop pro A, B o něco větší (`w-24` → `w-36`) protože je vyšší.
- Vstupní animace (jednou, při mountu, synchronizovaná s prvním reveal):
  - Z `opacity:0; scale:0.4` → `opacity:1; scale:1` s lehkým overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)` – back-out).
  - Trvání ~700 ms, A startuje ~300 ms po hero reveal, B o 500 ms později.
- Idle „float“ animace po skončení vstupu (loop, různá fáze a amplituda pro každou):
  - A: `translateY ±6px`, `rotate -4° ↔ 3°`, perioda ~6 s.
  - B: `translateY ±8px`, `rotate 5° ↔ -3°`, perioda ~7.5 s, offset start.
  - Implementováno přes CSS keyframes (definice v `src/styles.css`, dvě varianty `cube-float-a`, `cube-float-b`).
  - Spouští se až po vstupní animaci (přidat třídu `.is-floating` přes `setTimeout` nebo `onAnimationEnd`).
- `prefers-reduced-motion`: kostičky se zobrazí staticky bez vstupu i bez floatu.

## Technické poznámky
- Vstupní animaci kostiček i slider stavy řešit v `site-hero.tsx` (`useState`, `useEffect`).
- Keyframes a utility (`@keyframes cube-float-a/b`, `.hero-slide-enter/leave`, easing tokens) přidat do `src/styles.css`.
- Žádné nové závislosti.

## Soubory
- nové: `src/assets/hero-kids-2.jpg.asset.json`, `src/assets/cube-hero-a.png.asset.json`, `src/assets/cube-hero-b.png.asset.json`
- upravit: `src/components/site-hero.tsx`, `src/styles.css`
