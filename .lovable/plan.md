## Cíl
Přepsat sekci „Naše třídy" do hero-stylu (text vlevo, obrázek vpravo) a přesunout ji hned za timeline „Běžný den".

## Pořadí sekcí (v `src/routes/index.tsx`)
`SiteBenefits → SiteDailyRhythm → SiteClasses → SiteQuickLinks → SiteAbout → SiteActivities → SiteNews → SiteCtaBanner`

## Asset
Nahrát `user-uploads://kosticky_doma.webp` přes `lovable-assets` jako `src/assets/kosticky-tym.webp.asset.json` (původní `kosticky-herofoto` zůstane, jen ji už nebudeme používat tady).

## Layout sekce `SiteClasses` (přepis)
- `section#tridy` s `section-y`, bílé pozadí (navazuje na bílý spodek timeline).
- Container, `grid md:grid-cols-2 gap-12 items-center`, **vše zarovnané vlevo**.
- **Levý sloupec:**
  - Eyebrow `<p>` šedý: třída shodná s benefits/daily — `font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink/55` — text „Barevné kostičky".
  - `<h1 class="font-display text-4xl md:text-5xl font-extrabold text-ink">Čtyři třídy, jeden <span class="bg-gradient-to-r from-[#2563EB] to-[#38BDF8] bg-clip-text text-transparent">skvělý tým</span></h1>` (h1 váha pro shodu s hero; pokud má zůstat h2, drží extrabold z base).
  - Pod nadpisem: 2×2 grid karet (`grid grid-cols-1 sm:grid-cols-2 gap-4`).
- **Pravý sloupec:** `<img src={kostickyTym.url} alt="Čtyři plastelínové kostičky — modrá, červená, žlutá a zelená" class="w-full h-auto select-none" loading="lazy" />`. Bez rámečku/pozadí.

## Karty tříd (4×, styl shodný s `SiteBenefits`)
- `article` s `rounded-3xl border border-white/60 bg-background p-5 sm:p-6 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)]`, `card-hover reveal-up group relative`.
- Obsah:
  - Malý barevný dot `h-2.5 w-2.5 rounded-full` + eyebrow text barvy třídy (např. `text-brand-blue`, `text-brand-red`, `text-brand-yellow`, `text-brand-green`) — „Modrá kostička" atd.
  - `<h3 font-display text-lg font-bold text-ink mt-2>` — „Pro děti od 3 do 5 let".
  - `<p text-sm leading-relaxed text-body mt-2>` — jména učitelek.
- **Rozbalovací CTA vpravo dole** (replika z `SiteAnnouncementBar`):
  - `<span class="absolute right-4 bottom-4 inline-flex items-center h-11 rounded-full text-white overflow-hidden" style={{ background: <třídní barva> }}>`
  - Uvnitř: text „Vstupte do třídy" s `max-w-0 opacity-0 → group-hover:max-w-[180px] group-hover:opacity-100 group-hover:pl-4 group-hover:pr-1` + `<ArrowRight class="h-4 w-4">` v kruhovém čtverci `h-11 w-11 grid place-items-center`.
  - Transition: `max-width, opacity, padding` 560 ms `cubic-bezier(0.22,1,0.36,1)`.
  - Stejný efekt i pro `group-focus-visible:*`.
- Celá karta = `<a href="#" aria-label="Vstupte do třídy — Modrá kostička">` aby šipka i karta byly klikatelné.

## Data karet
| Pořadí | Barva | Věk | Učitelky |
|---|---|---|---|
| 1 | Modrá kostička (`brand-blue`) | pro děti od 3 do 5 let | Bc. Veronika Kremláčková a Elena Špicarová |
| 2 | Červená kostička (`brand-red`) | pro děti od 5 do 7 let | Mgr. Nikola Šorfová, Mgr. Jitka Kouklíková a Hana Hloušková |
| 3 | Žlutá kostička (`brand-yellow`) | pro děti od 3 do 5 let | Magdaléna Sováková a Milena Svobodová, DiS. |
| 4 | Zelená kostička (`brand-green`) | pro děti od 5 do 7 let | Jana Tuharská a Kristýna Vaňátková, DiS. |

## Technické poznámky
- Bez `hover:scale`, bez bounce — jen plynulé rozbalení pillu a jemné `translateY(-1px)` z `.card-hover` (už existuje).
- `prefers-reduced-motion`: transition na pillu se sám deaktivuje díky existujícím globálním pravidlům; pokud ne, přidat `@media (prefers-reduced-motion: reduce)` blok.
- Karty: stagger přes `--reveal-delay` 0/90/180/270 ms.
- Plně responzivní: na mobilu obrázek pod textem, karty 1 sloupec.