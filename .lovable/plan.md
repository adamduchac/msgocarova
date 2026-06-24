## Změny na homepage (`src/routes/index.tsx`)

1. **Odebrat z homepage:**
   - `<SiteAbout />` (sekce „O školce") — komponenta `site-about.tsx` zůstane v repu (připravená pro budoucí `/o-skolce`), jen ji odstraníme z indexu. Žádná nová routa se teď nevytváří, žádné napojení na menu.
   - `<SiteCtaBanner />` („Přijďte nás navštívit!").
   - `<SiteNews />` („Aktuálně").

2. Výsledné pořadí na `/`: Hero → AnnouncementBar → Benefits → DailyRhythm → Classes → QuickLinks → **Activities (nově „Aktuality")** → Footer.

## Sekce „Aktivity a život" → „Aktuality" (`src/components/site-activities.tsx`)

- Eyebrow: `Aktivity a život` → **`Aktuality`**.
- Nadpis: ponechat text, ale celý černý (`text-ink`) — odstranit zelený span na slově „do školy".
- **Pozadí sekce:** vertikální gradient z bílé (nahoře) do měkčí brandové červené (dole) tak, aby ladil s krémovou v hero a zelenými akcenty. Použijeme tlumený, světlý odstín existující brandové červené (cca 10–14% sytosti) — žádná sytá červená, žádný hard cut. Nahrazuje současné `bg-offwhite`.
- **Karty — hover interakce:**
  - Karta má fixní výšku (zarovnaná podle nejvyšší v gridu).
  - Vnitřní obsah (obrázek + titulek + text) tvoří jeden „content" blok, který se při hoveru plynule posune nahoru (`translateY` ~ -56px, ease-out 320–380ms).
  - Zespodu se zároveň plynule odhalí (fade + slight rise) tlačítko **„Číst dále →"** (text link styl, brand barva, šipka se posune o pár px při hoveru samotného odkazu — v souladu s core pravidly, žádný scale).
  - V klidovém stavu je tlačítko skryté (`opacity-0`, `translate-y-2`, `pointer-events-none`); při `group-hover` a `group-focus-within` se objeví.
  - Karta samotná zachová stávající jemný `translateY(-1–2px)` + měkčí stín z `card-hover`.
  - Plně respektuje `prefers-reduced-motion` (vypnout transformy, tlačítko bude trvale viditelné nebo statické).
  - Klávesnice: focus uvnitř karty (tab na „Číst dále") také odhalí tlačítko a má viditelný focus ring.

## Footer do boxu (`src/components/site-footer.tsx`)

- Patička přestává být přes celou šířku barevná. Místo toho:
  - Vnější `<footer>` má průhledné / bílé pozadí stránky, s vertikálním paddingem (např. `py-10 md:py-14`).
  - Uvnitř `container mx-auto px-6` vložíme **box** s `bg-ink` (almost-black, stejně jako barva textu `text-ink`), `rounded-2xl`, vnitřním paddingem a obsahem patičky včetně bottom baru (oddělovač zůstane uvnitř boxu).
- Pozadí změníme z napevno zadaného `#1B2B4D` na `bg-ink` (sjednocení s tokenem barvy textu).
- Bottom bar („© 2026…") zůstává uvnitř téhož boxu, oddělený `border-t border-white/10`.

## Co se NEMĚNÍ

- `site-about.tsx`, `site-cta-banner.tsx`, `site-news.tsx` — soubory zůstávají, jen se neimportují/nepoužívají na `/`.
- Navigace, ostatní sekce, design tokeny, animační core pravidla (žádný scale, reveal-on-scroll beze změny).
- Žádná nová routa `/o-skolce` se teď nevytváří.

## Technické detaily

- Gradient v Activities: inline `style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, <měkčí brand červená> 100%)" }}` analogicky k hero wrapperu; přesný odstín odvodíme z `--brand-red` z `styles.css` (sníženou sytost / vyšší světlost, cca 12% opacity vůči bílé) tak, aby přechod byl jemný.
- Hover content shift: `<div className="transition-transform duration-300 ease-out group-hover:-translate-y-14 motion-reduce:transform-none">` obalí obrázek + textový blok; tlačítko bude absolutně pozicované u spodního okraje karty s `transition-all duration-300`.
- Footer box: zachovat semantiku `<footer>`; box je `<div className="rounded-2xl bg-ink text-white">…</div>` uvnitř kontejneru.
