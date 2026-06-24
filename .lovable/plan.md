## Cíl
Vyhladit hover na velkých kartách v sekci „To pravé místo pro vaše děti" (Přijďte se podívat). Jinde stejná třída `.card-hover` funguje plynule — problém je velikost karet + animace `box-shadow` (blur + spread na velké ploše = drahý paint každý frame).

## Řešení
Nechat globální `.card-hover` chování, ale přepnout způsob, jak se animuje stín:

1. **`src/styles.css` — `.card-hover` / `.card-hover-soft`**
   - Přestat tranzitovat `box-shadow` přímo. Místo toho:
     - Základní (klidový) stín nechat na elementu.
     - Hover stín přidat přes `::after` pseudo-element (absolutně přes celou kartu, `border-radius: inherit`, `pointer-events: none`, `box-shadow: …`, `opacity: 0`).
     - Tranzitovat jen `opacity` pseudo-elementu + `translate` na kartě.
   - Přidat `will-change: transform` na `.card-hover` (jen na desktopu / když není `prefers-reduced-motion`), aby browser kartu povýšil do vlastní vrstvy a hover šel po GPU.
   - Zachovat existující duration 220ms a easing `cubic-bezier(0.22, 1, 0.36, 1)`.

2. **Žádné změny v `site-benefits.tsx`** — vizuálně i API identické, jen výkonnější.

3. **Ověření**
   - Vizuálně: hover na kartě v sekci „To pravé místo pro vaše děti" musí být plynulý, stín se objeví měkce, posun -2px.
   - Ostatní karty (`site-classes`, `site-quick-links`, `site-activities`, `site-news`) musí vypadat a chovat se stejně jako teď.
   - `prefers-reduced-motion`: hover translate vypnutý, opacity stínu rovnou na cílové hodnotě bez animace (přes stávající media query).

## Co se NEMĚNÍ
- Reveal animace, stagger, mobilní chování, struktura komponent.
- Vizuální výsledek hoveru (vzhled stínu, posun).
