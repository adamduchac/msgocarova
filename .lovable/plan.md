## Co opravit

### 1) Mobilní menu zabírá místo a neroluje

V `src/components/site-navbar.tsx` má panel `.mobile-nav-panel` jen `opacity-0` + `-translate-y-1` + `pointer-events-none`, ale **žádný height collapse** — proto v zavřeném stavu pořád zabírá vertikální prostor pod headerem. Navíc nemá `max-height` ani `overflow-y-auto`, takže při hodně položkách (nebo malé výšce zařízení) nejde scrollovat.

**Fix:**
- Přidat `max-h-0` v zavřeném stavu, `max-h-[calc(100dvh-5rem)]` v otevřeném (5rem = výška headeru `h-20`).
- Přidat `overflow-y-auto` (přebije současný `overflow-hidden`, který je tam jen kvůli collapse).
- Rozšířit transition o `max-height` (stejný 300ms ease).
- Drobné: zavřít panel taky na Escape a při změně viewportu na ≥lg (nice-to-have, můžu vynechat).

### 2) Hovery na kartách nejsou smooth

Karty (`site-quick-links`, `site-benefits`, `site-classes`, `site-news`, `site-activities`) mají třídu `reveal-up`, která v `src/styles.css` nastaví base:
```
transition: opacity 720ms ..., transform 720ms ...;
will-change: opacity, transform;
```
Tailwind utilita `transition-[box-shadow,transform] duration-[280ms]` to sice přebije po dobu hoveru, ale kombinace `will-change: opacity, transform` zůstává trvale + různé timing funkce mezi kartami → vizuálně skáče zejména na shadow (která má jen `0_22px_45px_-22px` — velký rozdíl vůči žádné stínu se projeví schodovitě, pokud transition shorthand z base pravidla `:where(...)` zasáhne shadow přes default `all`).

Skutečný problém: `transition-[box-shadow,transform]` v Tailwindu v4 nastaví jen `transition-property`, ale **timing-function a duration převezme z base reveal-up pravidla** (720ms cubic-bezier ease-out) protože tam je `transition` shorthand → vlastnost `transition-duration` je 720ms dokud Tailwind utilita nepřidá `duration-[280ms]`. Tailwind `duration-*` to opraví, ale **timing-function zůstane z reveal-up shorthand** = ease-out 0.22,1,0.36,1, což pro 280ms hover vypadá pomalé/lepkavé na začátku.

**Fix (jediné místo, `src/styles.css`):**
- Po dokončení reveal animace (na `.is-visible`) resetovat `will-change: auto` a **nepřenášet `transition` shorthand** dál — nahradit pravidlo tak, aby ovlivňovalo jen `opacity` a `transform` přes `transition-property` (ne shorthand), takže Tailwind utilita `transition-[...] duration-[200ms]` převezme všechno čistě.
- Sjednotit timing na cards: zkrátit hover duration na **200ms** a použít `ease-out` (stejné jako mikrointerakce v core memory 150–250ms). Upravit ve všech 5 komponentách: `duration-[280ms]` → `duration-200`, přidat `ease-out` (nebo přejít na utility `transition-shadow transition-transform`).
- Přidat `transform-gpu` (jen kde chybí) pro plynulý translateY na mobilu.

### Technické změny

1. `src/components/site-navbar.tsx` — panel `<div id="mobile-nav">`:
   - třídy: `transition-[opacity,transform,max-height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto overscroll-contain`
   - stavové: open → `opacity-100 translate-y-0 max-h-[calc(100dvh-5rem)] pointer-events-auto`, closed → `opacity-0 -translate-y-1 max-h-0 pointer-events-none`

2. `src/styles.css` — reveal pravidla:
   - base: změnit `transition: opacity ..., transform ...;` shorthand na samostatné `transition-property: opacity, transform; transition-duration: 720ms; transition-timing-function: cubic-bezier(0.22,1,0.36,1);` aby šly hover utility čistě přebít.
   - `.is-visible`: přidat `will-change: auto;`

3. Karty — `site-quick-links.tsx`, `site-benefits.tsx`, `site-classes.tsx`, `site-news.tsx`, `site-activities.tsx`:
   - `duration-[280ms] ease-out` → `duration-200 ease-out`
   - přidat `transform-gpu` kde chybí

Žádné změny v business logice, jen prezentační vrstva.