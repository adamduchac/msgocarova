Zjistil jsem konkrétní příčinu: karty mají na stejném elementu `reveal-up` i hover utility. V prohlížeči se u karet pořád počítá `transition-property: opacity, transform` a `duration: 0.72s` z reveal animace, ne očekávaný `box-shadow/transform` hover. Navíc Tailwind v4 pro `hover:-translate-y-0.5` používá CSS vlastnost `translate`, ale aktuální transition animuje jen `transform`, takže posun na hover skáče. V Inflow akcenta je to řešené samostatnou třídou pro kartu (`card-white-hover`) s explicitním CSS přechodem stínu a bez konfliktu s reveal transformací.

Plán opravy:

1. Přidám globální utility pro hover karet ve `src/styles.css`
   - např. `interactive-card` / `interactive-card-link`
   - explicitně nastaví `transition: box-shadow ..., border-color ..., background-color ...` a případně jemný `transform: translate3d(0, -1px až -2px, 0)` přes CSS, ne přes Tailwind `translate`
   - bude respektovat `prefers-reduced-motion`
   - žádný scale/zoom ani bouncy efekt

2. Oddělím reveal animaci od hover animace tam, kde je potřeba
   - u karet, kde se má hýbat celý box, buď nechám hover jen na stínu jako v Inflow, nebo použiju stabilní CSS třídu s transformem až po `is-visible`
   - odstraním konfliktní kombinace `transition-[box-shadow,transform]`, `hover:-translate-y-0.5` a podobné z karet

3. Aplikuji opravu na všechny problematické karty
   - rychlé odkazy
   - výhody
   - třídy
   - aktivity
   - aktuality

4. Ověřím v prohlížeči na živém preview
   - zkontroluji computed styles: hover transition musí obsahovat `box-shadow` a/nebo stabilní CSS transform, ne jen reveal `opacity, transform`
   - vizuálně ověřím, že hover je plynulý a že reveal animace zůstává zachovaná