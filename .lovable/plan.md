## Cíl
Upravit sekci `SiteDailyRhythm` na homepage: 10 momentů dne s novými fotkami a texty, responzivní mřížka, alternující náklon polaroidů, svižnější scroll-reveal stagger.

## Nahrání obrázků
Nahrát 10 uživatelských fotek jako Lovable Assets (přes `lovable-assets create --file /mnt/user-uploads/N.webp`) do `src/assets/den-01.webp.asset.json` … `den-10.webp.asset.json`. Mapování podle popisků:

1. `1.webp` → Vítáme se hrou
2. `2.webp` → Hra na kuchaře
3. `3.webp` → Ranní kruh
4. `4.webp` → Spolupracujeme
5. `5.webp` → Pečujeme o zahradu
6. `6.webp` → Objevujeme přírodu
7. `7.webp` → Obědváme
8. `8.webp` → Klidové chvíle
9. `9.webp` → Odpolední hry
10. `10.webp` → Společně tvoříme

Staré `den-rano/tvoreni/pohyb/svacina/stezka` pointery nechat být (mohou být použité jinde nebo v historii).

## Úprava `src/components/site-daily-rhythm.tsx`

**Data:** pole `moments` rozšířit na 10 položek s tituly a popisky přesně podle zadání (bez čísel), přes `fixPrepositions`. `alt` texty odvodit z fotek. `rotate`/`offset` odstranit z dat — místo per-položkových tříd použít výpočet z indexu (řada 1 vs. řada 2 na desktopu).

**Náklon polaroidů (desktop, 2 řady po 5):**
- Řada 1 (index 0–4): jemné úhly `-2°, +1°, -1°, +2°, -1.5°`, offset `translateY(-6px, +6px, -4px, +8px, -2px)`
- Řada 2 (index 5–9): výrazněji naopak `+2.5°, -3°, +1.5°, -2.5°, +3°`, offset `translateY(+8px, -6px, +4px, -8px, +2px)`

Implementace přes inline `style={{ transform: 'rotate(...) translateY(...)' }}` na `<li>` uvnitř `md:` breakpointu (mobil/tablet slider bez rotace, resp. rotace jen na `md:` třídou nebo `md:[transform:...]`). Nejjednodušší: vypočítat pole `desktopTransforms[10]` a aplikovat přes CSS proměnnou + utilitu, např. `md:[transform:var(--tilt)]` a `style={{ ['--tilt' as any]: transforms[i] }}`.

**Responzivní grid:**
- Mobil (`< md`): stávající horizontální snap-slider, zobrazí všech 10.
- Tablet (`md` až `< lg`): grid 3 sloupce, 3 řady, zobrazí **prvních 9** (10. skrytá přes `max-lg:[&:nth-child(10)]:hidden` nebo `hidden lg:block` na 10. položce).
- Desktop (`lg+`): grid 5 sloupců, 2 řady, všech 10.

Třídy: `md:grid md:grid-cols-3 md:gap-6 lg:grid-cols-5`, na 10. `<li>` přidat `max-lg:md:hidden` (skryje jen na md, na mobilu ve slideru zůstane — mobil není grid).

**Stagger:**
Nahradit pevné pole `delays` výpočtem `i * 70` ms (70 ms krok). Celková délka posledního: 630 ms + 400–500 ms animace ≈ hotovo do ~1,1 s.

**Šipky slideru:** beze změny, jen aria-labely zůstávají.

## Verifikace
- Vizuální kontrola na desktopu (2×5, střídavý náklon), tabletu (3×3, karta 10 skrytá), mobilu (slider 10 karet).
- Reveal doběhne svižně (poslední karta ≤ ~1 s).
- `prefers-reduced-motion` respektováno (řeší stávající `.reveal-up`).
- Build projde.

## Soubory
- `src/assets/den-01.webp.asset.json` … `den-10.webp.asset.json` (nové, přes CLI)
- `src/components/site-daily-rhythm.tsx` (přepis dat, transformy, grid, delay)
