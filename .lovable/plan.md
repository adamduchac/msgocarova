# Hero – doladění kostiček + slideru

## 1) Vyměnit zelenou kostičku
- Nahrát novou `kosticky_hero_B.png` přes `lovable-assets` a přepsat `src/assets/cube-hero-b.png.asset.json` (nová verze – usměvavá, bez obrysu pusy).

## 2) Větší + asymetrické umístění kostiček
V `site-hero.tsx`:
- Zvětšit obě kostičky o ~20 %:
  - A (modrá): `w-24 sm:w-28 lg:w-40` (bylo w-20/24/32)
  - B (zelená): `w-28 sm:w-32 lg:w-44` (bylo w-24/28/36)
- Posunout blíž středu fotky a rozbít symetrii:
  - A vlevo nahoře: z `-left-[6%] -top-[6%]` → `left-[4%] top-[2%]`
  - B vpravo dole: z `-bottom-[8%] -right-[4%]` → `bottom-[6%] right-[10%]` (víc doleva, dál od rohu)

## 3) Zviditelnit animaci slideru
Současný stav: `transform/opacity` přechod 1100 ms se nestihne uplatnit, protože `SlideLayer` se mountuje s počátečním `resolvedState`, který už je často `active` → vypadá to jako problikávání.
- V `SlideLayer` při mountu vždy inicializovat `resolvedState` na `"entering"` (když `state === "active"` a jde o první render nového slidu), pak rAF→`active`. Pro úplně první mount (initial slide 0) nechat rovnou `active`, aby nepřejížděl po loadu stránky → použít `useRef`/`useState(() => isInitialMount ? state : 'entering')`.
- Prodloužit přechod na **1600 ms**, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Zvětšit posun pro lepší viditelnost: `translateY ±10%` (z 6 %).
- Slide interval ponechat 6 s, ale snížit prevIndex cleanup na 1700 ms (po dokončení přechodu).

## 4) Zviditelnit entrance animaci kostiček
- Prodloužit `hero-cube-in` ze **720 ms → 1100 ms**, ponechat back-out easing s overshoot.
- Větší kontrast: start `scale(0.3)` (bylo 0.4), overshoot peak `scale(1.12)` v 65 %.
- Zvětšit prodlevy:
  - A startuje 500 ms po mountu (bylo 300)
  - B startuje 1100 ms po mountu (A + 600 ms odstup)
- `cubesFloating` zapnout až `A_start + B_delay + duration + 100 ms` = ~2200 ms.

## Soubory
- upravit: `src/assets/cube-hero-b.png.asset.json` (nový upload), `src/components/site-hero.tsx`, `src/styles.css`
