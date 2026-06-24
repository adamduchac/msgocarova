## Úpravy sekce "Proč k nám"

### 1) Přesun pod hero
V `src/routes/index.tsx` přesunout `<SiteBenefits />` hned pod `<SiteHero />` (před `SiteQuickLinks`, `SiteAbout`).

Nové pořadí: Hero → Benefits → QuickLinks → About → Classes → Activities → News → CTA.

### 2) Pozadí s gradientem (bílá → offwhite)
V `src/components/site-benefits.tsx` nahradit `bg-offwhite` za vlastní gradient. Bílá nahoře, ve ~66 % přejde do plné barvy `--offwhite` a tou sekce končí dole.

```
background: linear-gradient(to bottom, #ffffff 0%, var(--offwhite) 66%, var(--offwhite) 100%);
```

### 3) Titulek — celý černý
Odstranit `<span class="text-brand-green">vybírají?</span>`, ponechat plain text v `text-ink`. Eyebrow "Proč k nám" zůstává v brand-blue.

### 4) Grid 2×2 + moderní karty s většími ilustracemi 1:1

Změny v `site-benefits.tsx`:

- Grid: `grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8 max-w-5xl mx-auto` (vždy 2×2, ne 4 sloupce).
- **Inverze barev karty**: karta (box) má pozadí v dnešním tintu ilustrace (mint / sky / cream / blush), čtverec s ilustrací má bílé pozadí.
- **Ilustrace v 1:1 zaobleném čtverci**, výrazně větší — `aspect-square w-full` bílé pozadí `rounded-2xl`, ilustrace uvnitř ~70 % plochy.
- **Modern layout uvnitř karty**: ilustrační čtverec nahoře přes celou šířku, text pod ním. Karta `rounded-3xl p-5 sm:p-6`.
- **Moderní efekty (v souladu s core pravidly)**:
  - jemný stín, na hover `translateY(-2px)` + měkčí stín (žádné scale)
  - jemný vnitřní border `border border-white/40`
  - tonální variace per karta podle `b.tint`
  - scroll-reveal stagger (zachovat)
  - respektovat `prefers-reduced-motion`

Schéma karty:

```
┌───────────────────────────┐  ← bg = tint (mint/sky/cream/blush)
│ ┌───────────────────────┐ │
│ │                       │ │
│ │     ILUSTRACE         │ │  ← bílý čtverec 1:1, rounded-2xl
│ │     (velká)           │ │
│ │                       │ │
│ └───────────────────────┘ │
│ Nadpis karty              │
│ Popisek…                  │
└───────────────────────────┘
```

### Co se NEMĚNÍ
- Obsah textů, ikony/ilustrace, počet karet (4).
- Ostatní sekce, hero, navbar, footer.
- Globální tokeny v `styles.css` (jen utility třídy v komponentě).
