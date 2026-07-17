Úpravy v `src/routes/o-skolce.tsx` a `src/styles.css`.

## 1. Zvětšit mezery o třetinu
V `src/styles.css` přidám novou utilitu `section-y-md`:
```
@utility section-y-md {
  padding-block: clamp(37px, 5.3vw, 75px);
}
```
(≈ o třetinu víc než `section-y-sm`: 28→37, 4vw→5.3vw, 56→75). Všechny `section-y-sm` v `o-skolce.tsx` přepnu na `section-y-md`. Hero blok necháme na `section-y-sm` (padding ke stránce vč. horního `pt-28` už dost).

## 2. Modrý gradient na „Představení a vize"
Změním `style={{ backgroundColor: "#FDFAF6" }}` na modrý gradient jako na HP (site-benefits): `linear-gradient(to bottom, #ffffff 0%, #ffffff 10%, var(--blue-soft) 55%, var(--blue-soft) 100%)`.

## 3. Galerie — 2 fotky místo 3
V komponentě `AboutGallery`:
- pole tiles: `[0, 1]` místo `[0, 1, 2]`
- desktop grid: `md:grid-cols-2` místo `md:grid-cols-3`

## 4. Otevírací doba hřiště — tabulka podle screenu
Nahradím současný dvousloupcový grid tabulkou 3 sloupců (období / dopoledne / odpoledne) se dvěma řádky:
- **od 15. dubna, květen, červen, září** — 10:00 – 12:00 / 13:00 – 17:00
- **do 15. října** — 10:00 – 12:00 / 13:00 – 16:00

Nad tabulkou drobný nadpis „Sobota, neděle". Layout: karta `rounded-2xl border`, uvnitř sémantická `<table>` (nebo `<dl>`/grid) — použiju grid `grid-cols-[1fr_auto_auto]` s hlavičkou (dopolední/odpolední) a dvěma řádky. Na mobilu ponechám čitelné (case: menší text, případně 2-sloupcové rozložení). Poznámka „Ve státní svátky je hřiště uzavřeno." zůstává pod.

## Co se nemění
Texty ostatních sekcí, footer, assety, ostatní stránky.
