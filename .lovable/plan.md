**1. Sekce „Proč k nám" — vrátit titulek a zmenšit gap**
V `src/components/site-benefits.tsx`:
- Vrátit jen titulek (bez eyebrow, bez podnadpisu): `<h2>To pravé místo pro vaše děti</h2>`, použít existující `section-header-gap` wrapper, zarovnání na střed.
- Gap mezi kartami: vrátit na `gap-6 lg:gap-8` (jako původně).
- Titulky karet (`<h3>`) zvětšit: `text-xl sm:text-[22px]` → `text-[22px] sm:text-2xl` (24px → ~26px).

**2. Přesun sekce „Běžný den" hned za Benefits**
V `src/routes/index.tsx` přesunout `<SiteDailyRhythm />` z aktuální pozice (po `SiteAbout`) hned za `<SiteBenefits />`. Nové pořadí: Hero → Benefits → DailyRhythm → QuickLinks → About → Classes → Activities → News → CTA.

**3. Sekce „Běžný den" — úprava headeru a pozadí**
V `src/components/site-daily-rhythm.tsx`:
- Header: odstranit eyebrow „Jeden den u nás" i podnadpis. Ponechat jen titulek `Běžný den v MŠ Gočárova`, centrovaný (stejný styling jako titulek Benefits).
- Pozadí sekce: zelený gradient z `--mint-soft` (kde Benefits končí) plynule do bílé dolů:
  `background: linear-gradient(to bottom, var(--mint-soft) 0%, var(--mint-soft) 12%, #ffffff 70%, #ffffff 100%)`.

Soubory: `src/components/site-benefits.tsx`, `src/components/site-daily-rhythm.tsx`, `src/routes/index.tsx`.