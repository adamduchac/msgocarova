## Diagnóza — proč to na mobilu trhá

Po projití kódu + tvojí analýzy jsou hlavní viníci jasní. Skutečný **největší** zdroj jank jsi identifikoval ty (sticky `backdrop-blur` na navbaru) — to bude nejspíš to, co samo o sobě "spraví" pocit z mobilu.

### Hlavní viníci (řazeno podle dopadu)

1. **Sticky navbar `backdrop-blur-lg`** (`site-navbar.tsx` ř. 86). Sticky + velký blur = re-rasterizace každý snímek scrollu na celou šířku lišty. Na mobilním GPU sráží FPS celé stránky → všechny reveal animace, které během scrollu běží, zdědí ten poklesnutý framerate a vypadají trhaně. Pozadí už je `bg-background/95`, takže blur skoro nic vizuálně nepřidává.
2. **Hero crossfade slidů uvnitř `mask-image` + `drop-shadow` boxu** (`styles.css` 395–416). Maska + filtr ruší GPU kompozici → každé prolnutí 1400 ms znovu rastruje velkou plochu = periodické cuknutí každých 4,5 s.
3. **Hero cubes — 2× infinite float keyframes** běžící non-stop spolu s crossfade slidů → trvalý composite tlak.
4. **`MutationObserver` na `document.body` + `subtree: true`** v `use-reveal-on-scroll` — re-skenuje DOM při každé změně. Drahé na mobilu.
5. **Mobile nav** používá `transition: max-height` a `transition: grid-template-rows` — nejdou GPU-akcelerovat.
6. **`transition-[gap]` na "Číst více"** odkazu (`site-news.tsx` ř. 82) — animovat `gap` = layout per frame. Navíc `<a>` nemá `group`, takže `group-hover:translate-x-0.5` na šipce ani nefunguje.
7. **`will-change: opacity, transform` natrvalo na všech `.reveal-*`** (`styles.css` ~210) — desítky promovaných vrstev = tlak na paměť a mikro-záseky.
8. **`MutationObserver` na `body`**, krátký `rootMargin: -18%` na mobilu → reveal se spouští pozdě.

## Plán oprav

### A. Navbar (P0 — největší dopad)
- `site-navbar.tsx` ř. 86: `backdrop-blur-lg` → `lg:backdrop-blur-md` (jen desktop). Mobil bez blur.
- Současně mírně dorazit pozadí na `bg-background/98` na mobilu, aby byl text čitelný i bez blur.

### B. Hero crossfade
- `styles.css` `.hero-slide`: odstranit `transform: translateY(...)` z obou stavů, odstranit `will-change`. Zkrátit přechod na `opacity 1200ms`.
- Ponechat masku + drop-shadow vizuálně, ale díky čistě-opacity přechodu už nepůjde o per-frame rasterizaci dvou animovaných vlastností.
- (Volitelné — pokud po této úpravě stále cuká na slabších mobilech, vypnout slider na `(pointer: coarse)` a nechat jednu statickou fotku. Připravím v samostatném kroku po review.)

### C. Hero cubes
- Na `@media (pointer: coarse)` vypnout `is-floating` animaci (entry zůstane). Float složený s crossfade slidů je hlavní složený composite zdroj.

### D. "Číst více" a podobné mikrointerakce
- `site-news.tsx` ř. 82: `<a>` přidat třídu `group`, smazat `transition-[gap] duration-200 hover:gap-2.5`, ponechat `gap-1.5`. Pohyb dělá šipka přes `transform` (`group-hover:translate-x-0.5`).
- Projet celý projekt na `transition-[gap]` a stejný vzor opravit všude.

### E. Reveal-hook a CSS reveal pravidla
- `use-reveal-on-scroll.ts`: zrušit `MutationObserver` na `body`. Re-observe jednorázově po mountu + na `requestAnimationFrame` po route change. Karusely/dynamický obsah dostanou explicitní re-init přes `window.dispatchEvent(new Event('reveal:rescan'))` který hook poslouchá.
- `threshold: 0`, `rootMargin: 0px` na mobilu (krátký viewport → trigger dřív).
- `styles.css` `.reveal-*` základní pravidlo: **odstranit `will-change: opacity, transform`** úplně. Nechat ho jen v `.is-visible` přechodu? Ne — odstranit komplet, animace funguje i bez něj.

### F. Mobile-first tlumení (`@media (max-width: 640px), (pointer: coarse)`)
- Reveal duration **600ms → 380ms**, translate **18px → 10px**, vypnout `reveal-scale`.
- Stagger delays × 0.5.

### G. Composite hygiena (lehké, ale citelné)
- `contain: layout paint` na `.card-hover`, `.hero-slide`.
- `content-visibility: auto` + `contain-intrinsic-size` na dlouhé sekce mimo viewport (`#aktivity`, `#vyhody`, `#den`).

### H. LCP a CLS
- Hero kids fotka: `fetchpriority="high"`, explicitní `width`/`height`.
- Daily-rhythm slider: `loading="lazy"` pro karty mimo první 2.

### I. Měření po implementaci
- Playwright na mobilním viewportu (375×812), scroll celé stránky, log `performance.getEntriesByType('longtask')`. Cíl: žádný long task > 50 ms.

## Soubory k úpravě

- `src/components/site-navbar.tsx` — `backdrop-blur` jen desktop
- `src/styles.css` — `.hero-slide` zjednodušení, `.reveal-*` bez `will-change`, mobile media query, `contain`, `content-visibility`, `@media (pointer: coarse)` vypnutí float
- `src/hooks/use-reveal-on-scroll.ts` — bez MutationObserveru, mobile threshold/rootMargin
- `src/components/site-news.tsx` — `<a>` `group` + odstranit `transition-[gap]`
- `src/components/site-hero.tsx` — `fetchpriority`, explicitní rozměry
- `src/components/site-daily-rhythm.tsx` — `loading="lazy"` pro pozdější obrázky
- Globální grep `transition-\[gap\]` — opravit všechny výskyty

## Co plán **neřeší** (záměrně)

- Žádná migrace na Framer Motion / GSAP.
- Žádný redesign animací na desktopu — tam jedou v pohodě.
- Hero slider zatím **neruším**; pokud po E+B bude na slabých mobilech stále cuknutí, doplníme v navazujícím kroku.