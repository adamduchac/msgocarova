## Cíl
Nová sekce `SiteDailyRhythm` — 5 polaroidů zleva doprava jako „časový pás dne". Animace přehraje den: polaroidy se zjeví postupně zleva (s časem) a nad nimi se kreslí jediná průběžná timeline v gradientu HERO nadpisu. Zařadit mezi `SiteAbout` a `SiteClasses`. Nic jiného neměnit.

## Soubory

- **Nový:** `src/components/site-daily-rhythm.tsx` (export `SiteDailyRhythm`)
- **Upravený:** `src/routes/index.tsx` — přidat import + `<SiteDailyRhythm />` mezi `<SiteAbout />` a `<SiteClasses />`. Žádné další změny.
- **Nové assety** přes `lovable-assets create` z `/mnt/user-uploads/`:
  - `den-rano.webp` ← carousel_1, `den-tvoreni.webp` ← carousel_2, `den-pohyb.webp` ← carousel_3, `den-svacina.webp` ← carousel_4, `den-stezka.webp` ← carousel_5.

## Vizuální koncept

```text
section #bezny-den (section-y, container, px-6)

  header (reveal-up, section-header-gap, max-w-2xl)
    eyebrow: "Jeden den u nás"  ← text-brand-blue, uppercase, tracking
    h2:       "Běžný den v MŠ Gočárova"
    p:        "Klidný rytmus, na který se děti …"

  timeline-row (relative)
    ┌─ progress-track ───────────────────────────────────────┐   ← 2px linka, bg-border, sedí v ÚROVNI ČASOVÝCH ŠTÍTKŮ nad polaroidy
    │  ●━━━━━━━━●━━━━━━━━●━━━━━━━━●━━━━━━━━●                │   ← uzly = malé kruhy s časem nad každým polaroidem
    └────────────────────────────────────────────────────────┘
        nad ní jede „progress" linka v gradientu HERO
        (linear-gradient(105deg, #2563EB 0%, #38BDF8 100%))

    ol grid-cols-5 (md+) / horizontal scroll-snap (mobile)
      li.polaroid × 5
        ├ time-chip (font-display, gradient text, malý)
        ├ figure: bílý rámeček ~10–12px nahoře/po stranách, ~36px dole
        │   img object-cover aspect-[4/5] rounded-sm
        ├ h3 (font-display, font-bold) v patce polaroidu
        └ p  (text-body, text-sm) v patce polaroidu
```

### Polaroid styl
- Bílá karta `bg-card`, lehký okrouhlý roh (`rounded-md`), jemný stín `shadow-[0_18px_40px_-22px_rgba(16,15,16,0.25)]`.
- Vnitřní padding: `pt-3 px-3 pb-5` (větší dolní okraj = klasický polaroid).
- Mírné natočení každé karty (statické, **bez hover scale**): `-2.2°, 1.4°, -0.8°, 2.0°, -1.6°` přes inline `style={{ rotate: '…deg' }}`.
- Mírný vertikální offset: sudé karty `translate-y-2`, liché `-translate-y-2` (jen md+, na mobilu vše zarovnané).
- Hover: stávající `.card-hover-soft` (jen jemný stín + −1px). Žádné `scale`.

### Timeline (jediná linka, v sekvenci s polaroidy)
- Drží stávající estetiku — žádné nové knihovny.
- Realizace: `<div class="reveal-up timeline-progress">` s pseudo-elementem `::after` widthovaným z 0 → 100 % v jednorázové CSS animaci, ovládané přidáním třídy `is-visible` (stejný IntersectionObserver hook `useRevealOnScroll`, který už máme).
- Doba kreslení ≈ 2200 ms, ease-out. Pět uzlů (kruhy `bg-brand-blue` s časem v bílé) se objeví staggerem `--reveal-delay` 0/440/880/1320/1760 ms, tak aby „doháněly" čelo linky.
- Stejným timingem se odhalují polaroidy pod nimi (reveal-up + stejné delay hodnoty). Vznikne dojem, že čas postupuje a polaroidy „padají" do dne.
- Gradient linky: `background-image: linear-gradient(105deg, #2563EB 0%, #38BDF8 100%)` — inline style, žádný nový token.

### Časy + obsah (beze změny)
1. 8:00 — Ranní přivítání — „Přivítáme se a naladíme na to, co nás čeká."
2. 9:00 — Tvoření a hry — „Kreslíme a objevujeme svět vlastním tempem."
3. 10:00 — Pohyb a dobrodružství — „Šplháme, balancujeme a vybíjíme energii."
4. 11:30 — Svačinka — „Ve třídě si dáme něco zdravého a dobrého."
5. 13:00 — Smyslová stezka — „Naboso poznáváme přírodu na naší stezce."

## Mobil
- `grid` se přepne na `flex overflow-x-auto snap-x snap-mandatory`, polaroidy `basis-[78%] shrink-0 snap-start`.
- Timeline (linka + uzly) se na mobilu schová (`hidden md:block`) — uvnitř každého polaroidu zůstává time-chip v záhlaví (gradientový text), takže pořadí dne je čitelné i bez linky.
- Statická rotace polaroidů se na mobilu vypne (`md:rotate-[…]` ve stylu) kvůli čitelnosti a šířce scroll-snap dráhy.

## Pravidla designu (drží stávající systém)
- Pouze existující třídy/tokeny: `section-y`, `section-header-gap`, `container mx-auto px-6`, `font-display`, `text-ink`, `text-body`, `text-brand-blue`, `bg-brand-blue`, `bg-card`, `border-border`, `rounded-md`, `reveal-up` + inline `--reveal-delay`, `card-hover-soft`.
- Žádný `hover:scale-*`, žádné nové keyframes mimo jednu width-animaci progress linky (definovanou inline ve `<style>` uvnitř komponenty není potřeba — postačí transition `width 2200ms ease-out` aplikované přes `.is-visible`).
- Gradient (linka + time-chip text) inline přes `style={{ backgroundImage: 'linear-gradient(105deg,#2563EB 0%,#38BDF8 100%)' }}` + `bg-clip-text text-transparent` u textu.
- `prefers-reduced-motion`: reveal-up se globálně vypíná (už řešeno v `styles.css`); progress linka v reduced-motion má `transition-duration: 0.001ms` díky stejnému globálnímu pravidlu, takže se rovnou zobrazí v plné šířce.
- Obrázky: `loading="lazy"`, `decoding="async"`, `width`/`height` pro CLS, `object-cover aspect-[4/5]`, alt odvozený z názvu momentu.

## Pořadí v build módu
1. Upload 5 fotek → 5 `.asset.json` pointerů.
2. Vytvořit `src/components/site-daily-rhythm.tsx`.
3. Upravit `src/routes/index.tsx` (import + 1 řádek).
4. Vizuální ověření přes Playwright (desktop 1280 + mobile 390), kontrola: gradient linka, stagger uzlů+polaroidů, polaroid rotace, scroll-snap na mobilu, reduced-motion.
