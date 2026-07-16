## Tři úpravy

### 1) Desktop: 10 karet, náhodné natočení ±5–8°
V `src/components/site-daily-rhythm.tsx`:
- **Proč se náklon teď neaplikuje:** `md:[transform:var(--tilt)]` je na stejném `<li>` jako `.reveal-up`, a reveal animace přepisuje `transform` (`translateY`). Řešení: přesunout náklon z `<li>` na vnitřní `<article>`, které reveal neanimuje.
- Nahradit stávající pole `desktopTransforms` deterministickým „pseudo-náhodným" polem s úhly z intervalu ±5–8° (10 hodnot, žádný nulový, střídat znaménko tak, aby to nevypadalo pravidelně), např.:
  `[-6.4, 5.8, -7.2, 6.1, -5.3, 7.6, -5.9, 6.8, -7.1, 5.4]` (jen ilustrace — vyberu hodnoty tak, aby dvě sousední karty neměly stejné znaménko a rozsah zůstal 5–8°).
- Malý `translateY` offset (~±4 px) ponechám kvůli přirozenému rozmístění polaroidů.
- Aplikovat přes `style={{ ['--tilt']: 'rotate(Xdeg) translateY(Ypx)' }}` na `<article>` a třídu `md:[transform:var(--tilt)]`. Přidat `transform-origin: center` implicitně (default vyhovuje).
- Na mobilu (`< md`) žádný náklon, na tabletu (`md` až `< lg`) náklon zůstává vypnutý — nebo ponechat jemnější? **Ponechám zapnutý jen od `lg`** (`lg:[transform:var(--tilt)]`), tablet 3×3 tak zůstane rovný a přehledný.

### 2) Mobil: slider „Jeden den" — ořezané spodní stíny
Stín karty je `shadow-[0_18px_40px_-22px_...]` (spread 40 px dolů), ale scroller má `pb-4` (16 px) a `overflow-x-auto` — spodní část stínu se ořízne skryvající se osou Y.
- Zvětšit spodní padding scrolleru na mobilu: `pb-10` (mobile) / ponechat `md:pb-4`.
- Zajistit, že se scrollbar neobjeví: scroller už má `[scrollbar-width:none]` a skrytý `::-webkit-scrollbar`, takže `pb-10` nezpůsobí posun.
- Alternativně přidat `overflow-y-visible` — nelze kombinovat s `overflow-x-auto`, oba směry musí být stejné. Proto řešení = větší padding + případně `-mb-6` na sekci, aby nevznikla dvojitá mezera pod slidem.

### 3) Mobil: slider „Náš tým" — velká mezera pod textem
Problém: všechny slidy jsou v `<div class="flex">` s `w-full shrink-0`, takže výška kontejneru = výška nejdelšího medailonku (Milena Svobodová má rozsáhlý bio). Aktuální medailonek pak má prázdné místo dole.

Řešení: **renderovat jen aktivního učitele** + cross-fade animace, místo horizontálního `translateX` na flex-tracku.
- Odstranit `flex` track a `translateX(-index*100%)`.
- Nahradit jedním kontejnerem, který zobrazuje `teachers[index]`. Přechod: `key={index}` na vnitřním `<div>` s třídou `animate-fade-in` (existuje v projektu, 0.3 s ease-out).
- Layout mřížky (foto vlevo, text vpravo od `md`) zůstává stejný, jen bez wrapperu `flex` na všech položkách.
- Přístupnost: zachovat `role="region"` + `aria-roledescription="carousel"` + `aria-label`. Nechat swipe (touchStart/touchEnd), autoplay, klávesové šipky, tečky.
- Vedlejší přínos: DOM je lehčí (1 slide místo 7), obrázky se dále lazy-loadují jen tehdy, když se stanou aktivními (přidám `loading="eager"` na aktivní, `lazy` je zbytečné — v každém okamžiku jde jen o jeden obrázek).

Aby crossfade vypadal plynule, obal medailonku dostane `min-height` **nesetované** (nechá se řídit obsahem) a `key={index}` na obalu zajistí re-mount → `animate-fade-in`. Bez min-height se skok výšky projeví, ale to je záměr uživatele („real výška").

Pokud by skok byl rušivý, můžu ještě přidat `transition` na `min-height` — ale to bez měření DOMu neuděláme čistě, proto necháváme prostý fade a real-height (přesně jak si přál).

### Soubory
- `src/components/site-daily-rhythm.tsx` — nové úhly, přesun `--tilt` na `<article>`, `pb-10 md:pb-4` na scrolleru, aktivace tiltu až od `lg:`.
- `src/components/site-teachers.tsx` — přepis slideru na single-render + `animate-fade-in`.

### Verifikace
- Playwright screenshoty: desktop (10 nakloněných karet, různé úhly ±5–8°), mobile (slide „Jeden den" bez ořezu stínů), mobile (slide „Náš tým" bez mezery pod textem, přepínání mezi krátkým a dlouhým bio).
- Prefer-reduced-motion — fade se degraduje na okamžité přepnutí (Tailwind `motion-reduce:` vypne animaci).
- Build projde.
