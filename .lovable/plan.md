## Cíl
Hero fotka bude oříznutá organickým "blob" tvarem z `hero_shape.svg` místo zaoblených rohů.

## Kroky
1. **Nahrát assety** přes lovable-assets:
   - `user-uploads://hero_shape.svg` → `src/assets/hero-shape.svg.asset.json` (pro CSS `mask-image: url(...)`)
   - `user-uploads://hero_A.webp` → `src/assets/hero-kids.jpg.asset.json` (přepsat — nová fotka venkovní hry s kostkami; lépe ladí s tématem)

2. **`src/components/site-hero.tsx`** — wrapper s fotkou:
   - Odstranit `rounded-[36px]` + `overflow-hidden` + box-shadow z `<div>` kolem `<img>`.
   - Aplikovat CSS masku přes inline style nebo utility třídu:
     ```
     style={{
       WebkitMaskImage: `url(${heroShape.url})`,
       maskImage: `url(${heroShape.url})`,
       WebkitMaskSize: "100% 100%",
       maskSize: "100% 100%",
       WebkitMaskRepeat: "no-repeat",
       maskRepeat: "no-repeat",
     }}
     ```
   - `<img>` zůstane `object-cover`, aspect ratio přizpůsobit SVG (1000×979 ≈ 1:0.98) přes `aspect-[1000/979]`.
   - Drop-shadow se na maskovaný prvek aplikuje přes wrapper s `filter: drop-shadow(...)` (box-shadow nefunguje na masce).

3. **Kostičky** zůstávají jak jsou — vystupují z dolního okraje blob tvaru přirozeněji než z obdélníku.

4. **Ověření**: Playwright screenshot hero sekce na 1280×1800 viewport, zkontrolovat tvar masky, že fotka není oříznutá špatně, a že drop-shadow funguje.

## Poznámka
SVG je 1000×979, fotka 1:1 (1024×1024). Maska se roztáhne na `100% 100%` wrapperu, takže poměr stran wrapperu musí kopírovat SVG (1000/979), jinak se tvar deformuje. Použiju `aspect-[1000/979]`.
