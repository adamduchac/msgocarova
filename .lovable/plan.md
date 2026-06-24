Mobilní doladění napříč sekcemi. Všechny změny jsou mobile-only (override `md:`/`lg:` ponechá desktop).

## 1) Navbar — menší logo na mobilu
`src/components/site-navbar.tsx`
- `img.h-10` → `h-[1.875rem] md:h-10` (≈ -25 % na mobilu).

## 2) Hero — větší mezera mezi tlačítky a obrázkem; kostičky více ven
`src/components/site-hero.tsx`
- Grid gap zvětšit na mobilu: `gap-12` → `gap-16 lg:gap-10`.
- Cube A (vlevo nahoře): mobilní pozice `left-[-3%] top-[-2%] sm:left-[4%] sm:top-[2%]` (víc vlevo nahoře, méně překrývá fotku).
- Cube B (vpravo dole): mobilní pozice `right-[-8%] bottom-[2%] sm:right-[-3%] sm:bottom-[6%]`.
- Velikosti kostek na mobilu zachovat (nevadí, jen posun).

## 3) Newsbar (announcement) — na mobilu ikona / text / button každé na svém řádku
`src/components/site-announcement-bar.tsx`
- Přepnout layout: na mobilu vertikální stack (`flex flex-col items-center text-center gap-3 px-4 py-4`), absolutní pozicování ikony a CTA jen od `sm:` (`sm:absolute sm:left-5 sm:top-1/2 sm:-translate-y-1/2` atd.).
- Text `min-h` a horizontální paddingy `px-[92px]` zapnout také jen od `sm:`.
- CTA pill na mobilu zobrazit rozbalený („Podrobnosti" viditelné, ne jen ikona) — od `sm:` zase chování s rozbalením na hover.

## 4) H2 nadpisy větší na mobilu
Všechny `text-3xl md:text-[40px]` → `text-[34px] md:text-[40px]`. Soubory:
- `site-benefits.tsx`
- `site-daily-rhythm.tsx`
- `site-classes.tsx`
- `site-activities.tsx`
- `site-news.tsx`
- `site-quick-links.tsx`
- `site-cta-banner.tsx`
- `site-about.tsx`
(Procházím všechny H2 a sjednotím.)

## 5) Sekce „Jeden den" — slider s šipkami v kroužku (mobile)
`src/components/site-daily-rhythm.tsx`
- Přidat `ref` na scroll `ol`.
- Pod scrollerem (jen `md:hidden`) přidat řádek s dvěma kruhovými tlačítky (prev / next, `ChevronLeft`/`ChevronRight` z lucide), 44×44 px, `rounded-full bg-background border border-border/70 shadow-sm`, hover jen jemná barva, aria-labels („Předchozí / Další moment dne").
- Klik volá `scrollBy({ left: ±cardWidth, behavior: 'smooth' })`, kde `cardWidth = ol.firstChild.clientWidth + gap (20px)`.

## 6) Barevné kostičky — přepínač menší a na mobilu pod obrázek
`src/components/site-classes.tsx`
- Wrapper přepínače: na mobilu `static`, vystředit pod obrázek (`mt-4 flex justify-center`); od `md:` zpět `absolute right-… top-1/2 -translate-y-1/2`.
- Mobilní velikost: track `h-7 w-12`, knob `h-5 w-5`, posun `translate-x-[22px]`/`translate-x-[3px]`, vnější `px-3 py-2.5`, font `text-[13px]`. Od `md:` zachovat současné větší rozměry.
- Vrátit `pr-0 md:pr-32 lg:pr-44` na image wrapperu (už je) — ok.

## 7) Footer — kostičky vůči hraně tmavé karty
`src/components/site-footer.tsx`
- Červenou kostičku přesunout dovnitř relativního wrapperu tmavé karty (`div.relative.rounded-2xl.bg-ink`) a pozicovat tak, aby spodních ~10 px bylo schované za horním okrajem karty: `absolute left-[6%] sm:left-[4%] bottom-[calc(100%-10px)] z-0` (karta má z-10, takže překryje). Velikost ponechat responzivní `w-[6.3rem] sm:w-[7.35rem] lg:w-[10.5rem]`.
- Žlutou kostičku: změnit `bottom-[-1.5rem] right-[-1.5rem]` → `bottom-[-10px] right-[-10px]` (max 10 px přesah).
- Footer dostane víc spodního prostoru: `pb-10 md:pb-14` → `pb-16 md:pb-20`, aby žlutá kostička nekolidovala s okrajem stránky.

## Ověření (Playwright, viewport 390×844)
1. Screenshot navbar — logo viditelně menší.
2. Screenshot hero — větší vzdušná mezera nad obrázkem, kostičky více v rohu, méně překrývají fotku.
3. Screenshot newsbar — tři řádky pod sebou (ikona, text, button).
4. Screenshot „Jeden den" — pod scrollerem dvě kulaté šipky; po kliknutí pravé screenshot ukáže posun.
5. Screenshot „Barevné kostičky" — přepínač pod obrázkem, vystředěný, menší.
6. Screenshot footer — červená kostička sedí na horní hraně tmavé karty s ~10 px zanořením, žlutá přečnívá max 10 px pod.
7. Desktop (1280) — žádná regrese.
