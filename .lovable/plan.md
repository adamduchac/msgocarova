Cíl: upravit podstránku `/pro-rodice` podle zadaných požadavků a sladit footer.

## 1. Program dne — odstranit čísla a boxy
- Současný 4×2 grid bílých karet s čísly nahradit čistou časovou osou.
- **Návrh:** vertikální časová osa s jemnou spojnicí a tečkami/body. Každý bod obsahuje:
  - časový rozsah (bold, tabular-nums, brand-blue),
  - popis činnosti pod ním.
- Na desktopu 2 sloupce vedle sebe (každý se 4 body a vlastní spojnicí), na mobilu 1 sloupec.
- Sekce zůstane na modrém gradientním pozadí jako doposud; žádné bílé boxy, žádná čísla.

## 2. Dokumenty ke stažení — dva sloupce
- Místo dvou samostatných seznamů pod sebou udělat jeden grid `md:grid-cols-2`:
  - **levý sloupec:** nadpis „Formuláře a žádosti“ + 4 DocCards pod sebou,
  - **pravý sloupec:** nadpis „Základní dokumenty“ + 3 DocCards pod sebou.
- Zachovat stávající DocCard komponentu, jen se přeskupí layout.

## 3. Footer — žlutá horní kostička, odstranit spodní žlutou kostičku
- V `src/routes/pro-rodice.tsx` změnit volání `<SiteFooter>` na `topCubeColor="yellow"` + `showBottomCube={false}`.
- Rozšířit `SiteFooter` komponentu v `src/components/site-footer.tsx`, aby `topCubeColor` akceptovalo i `"yellow"` (aktuálně podporuje jen red/blue).
- Spodní žlutá kostička se vynechá, aby vizuální dno zůstalo stejné jako dosud s modrou kostičkou.

## Dotčené soubory
- `src/routes/pro-rodice.tsx` — timeline, layout dokumentů, footer props.
- `src/components/site-footer.tsx` — přidat barvu `yellow` pro horní kostičku.

## Vizuální principy
- Žádné `hover:scale-*`, max jemné `translateY(-1px až -2px)` na kartách.
- Zachovat `rounded-2xl`, `fixPrepositions`, přístupnost (focus-visible) a responzivitu.
- Nezmění se obsah, odkazy, PDF assety ani metadata stránky.