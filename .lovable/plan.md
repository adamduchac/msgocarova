## 1) H2 stejně tlusté jako H1

`src/styles.css` — v base bloku `h1, h2, h3, h4` změnit `font-weight: 700` → `font-weight: 800` (H1 v hero používá `font-extrabold`/800). Současně v komponentách odstranit lokální `font-semibold` u H2, aby se neoverridovala:

- `site-benefits.tsx` (h2 "To pravé místo…") — odebrat `font-semibold`
- `site-daily-rhythm.tsx` (h2 "Běžný den…") — odebrat `font-semibold`
- a stejně v dalších sekcích, které H2 mají (`site-about`, `site-activities`, `site-classes`, `site-news`, `site-cta-banner`) — projít a sjednotit, ať vše dědí 800 z base.

## 2) Eyebrow (šedá) nad třemi sekcemi

Sjednocený styl (matchuje existující rytmus eyebrowů, jen v šedé místo brand barev):

```
<p class="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55">…</p>
```

- **Hero** (`site-hero.tsx`) — nad H1 přidat eyebrow `MŠ Gočárova`. Použít `reveal-up` se zápornějším delay než H1, mb cca 14–16px.
- **Benefits** (`site-benefits.tsx`) — nad H2 "To pravé místo…" přidat eyebrow `Přijďte se podívat`.
- **Daily rhythm** (`site-daily-rhythm.tsx`) — nad H2 "Běžný den…" přidat eyebrow `Zažijte to s námi`.

## 3) Timeline „Běžný den" — vlnovka + časy nad linkou

V `site-daily-rhythm.tsx` přepracovat desktopovou timeline (`hidden md:block` blok):

- Nahradit rovnou `div` linku za inline **SVG vlnovku** přes celou šířku (od 10% do 90%):
  - `stroke-width: 4px`, `stroke-linecap: round`, `stroke-linejoin: round`
  - barva = `var(--mint-soft)` tmavší varianta / `currentColor` na zeleno-šedé (≈ `#9CC8A6`); zachovat gradient progress přes `clip-path`/druhé SVG s `pathLength` + `stroke-dasharray` reveal animací (nahradí `daily-progress scaleX`).
  - Cesta: jemná nepravidelná sinusoida, např. `M0,20 C80,8 160,32 240,20 S400,8 480,20 S640,32 720,20 S880,8 960,20 S1120,32 1200,20` (viewBox `0 0 1200 40`, `preserveAspectRatio="none"`, výška ~32px). Amplituda malá (±10–12px), různé délky vln, aby působila ručně kreslená, ne pravidelná.
- Na linii ponechat jen **malé tečky** v místech časů: `width/height 8px`, `rounded-full`, barva `brand-blue` (resp. `currentColor` v modré). Žádné velké pill chipy na lince.
- **Časy** přesunout **nad** linku jako prostý text:
  - `font-display text-sm font-bold text-brand-blue` (modrá, ne gradient), zarovnané nad odpovídající tečkou (`grid grid-cols-5`, text-center, `mb-2`).
- Layout sekce: nahoře `ol` s časy → uprostřed SVG vlnovka s tečkami → dole stávající polaroidový grid bez úprav.
- Mobil (`md:hidden` chip nad titulkem karty) zůstává beze změny.
- Reveal: SVG progress path animovat `stroke-dashoffset` z `length` na `0` přes ~2200ms cubic-bezier, respektovat `prefers-reduced-motion` (okamžitě viditelná).

## Technické poznámky

- Žádné nové závislosti, žádné nové assety.
- Žádný hover scale, žádné nové animace mimo popsané (v souladu s core pravidly).
- Šedá pro eyebrow: `text-ink/55` (využívá existující `--ink` token); pokud bude vizuálně moc tmavá, snížit na `/45`.
- Soubory dotčené: `src/styles.css`, `src/components/site-hero.tsx`, `src/components/site-benefits.tsx`, `src/components/site-daily-rhythm.tsx`, `src/components/site-about.tsx`, `src/components/site-activities.tsx`, `src/components/site-classes.tsx`, `src/components/site-news.tsx`, `src/components/site-cta-banner.tsx` (jen odstranění `font-semibold` u H2 tam, kde je).
