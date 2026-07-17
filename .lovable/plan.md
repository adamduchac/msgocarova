## Cíl
Na podstránce `/o-skolce` použít v horní galerii dvě dodané fotky a spodní galerii úplně odstranit.

## Kroky

1. **Nahrát obě fotky jako Lovable assety**
   - `user-uploads://oskole_1.webp` → `src/assets/oskolce-1.webp.asset.json` (zahrada s dětmi)
   - `user-uploads://oskole_2.webp` → `src/assets/oskolce-2.webp.asset.json` (tvoření s dýní ve třídě)

2. **`src/routes/o-skolce.tsx` — horní galerie**
   - Nahradit stávající dva bílé placeholdery skutečnými `<img>` s novými assety.
   - Zachovat 4:3 poměr, `rounded-2xl`, plnou šířku kontejneru a mobilní slider (1 viditelná).
   - Alt texty v češtině popisující obsah fotek.

3. **`src/routes/o-skolce.tsx` — spodní galerie**
   - Kompletně odstranit spodní galerijní sekci (pod „Vzdělávání a rozvoj" resp. tam, kde je druhá galerie s placeholdery).
   - Zachovat vertikální rytmus — mezera mezi sousedními sekcemi zůstane konzistentní (`section-y-md`).

## Co se nemění
- Text, ostatní sekce, footer, navigace, ostatní podstránky.
- Styl galerie (rámování, radius, slider chování) zůstává, jen se vymění zdroje.
