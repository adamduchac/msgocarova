## Úpravy napříč webem

### 1) Slider učitelů na HP — cursor pointer
V `src/components/site-teachers.tsx` přidat `cursor-pointer` na prev/next tlačítka a na tečky (dot buttons).

### 2) Sekce „Zážitky, které si děti odnáší" na HP — celý box klikací
V `src/components/site-news.tsx` obalit celou `<article>` odkazem `<a href>` s třídou `card-hover` a stávajícím vizuálem. Vnitřní řádek „Číst více" nechat jako neinteraktivní span uvnitř karty — barvu textu i posun šipky ovládat přes `group-hover` z rodičovského `<a class="group ...">`. Bez `hover:scale`.

**Třetí karta** — změnit název z „Den otevřených dveří" (nebo aktuálního třetího itemu) na **„Akce s rodiči"** s odkazem `href="/akce-s-rodici"`. Ostatní dvě karty ponechat s `href="#"` (nebo neaktivním stavem — zachovat současné chování). Popisek třetí karty upravit tak, aby dával smysl v kontextu akcí s rodiči, badge nechat vhodně („Rodiče" / „Akce").

### 3) Nová podstránka `/akce-s-rodici`
Nový soubor `src/routes/akce-s-rodici.tsx`. Layout obdobný jako `/vzdelavani-a-rozvoj`:
- SiteNavbar + hero (žluto-bílý gradient, `pt-28 sm:pt-32`, `section-y-sm`) s H1 „Akce s rodiči" a úvodním odstavcem: „Během roku se ve školce potkávají nejen děti s učitelkami, ale i celé rodiny — od podzimního dlabání dýní přes vánoční posezení až po květnové Slavnosti školy na zahradě. Některé akce se opakují každý rok, jiné vznikají i z nápadů a nabídek samotných rodičů. Aktuální termíny najdete v aplikaci Naše MŠ."
- Sekce s **3 fotkami vedle sebe** (grid `md:grid-cols-3`, `aspect-[4/5]`, `rounded-2xl`, border). Fotky: `rodice1.webp`, `rodice2.webp`, `rodice3.webp` — nahrát přes `lovable-assets create --file /mnt/user-uploads/<name>.webp --filename <name>.webp > src/assets/akce/<name>.webp.asset.json`.
- Pod fotkami **seznam akcí** — jednoduchý seznam **bez ikon**, každá položka má tučný název a popisek za pomlčkou. Vertikálně pod sebou v jednom sloupci s max šířkou (např. `max-w-3xl`) a `divide-y divide-black/5` pro jemné oddělení. Položky:
  - **Tvoření dýňáčků** — dlabání dýní s rodiči a sourozenci.
  - **Podvečer se strašidly** — večer plný světýlek a fantazie.
  - **Vánoční posezení** — společné naladění na advent s krátkým vystoupením dětí.
  - **Den rodin** — odpoledne s programem a opékáním buřtů.
  - **Slavnosti školy** — květnové setkání na školní zahradě s divadlem.
  - **Loučení s předškoláky** — slavnostní rozloučení s dětmi odcházejícími do ZŠ.
  - **Péče o zahradu** — společně zvelebujeme venkovní prostředí pro děti.
  - **Nabídky rodičů** — vítáme exkurze, materiály i další podněty, které obohatí program školky.
  - a další…
- SiteFooter, `head()` s vlastním title/description/og.
- **Menu neupravovat** — do navbaru se nic nepřidává, stránka je dostupná z 3. karty na HP.

### 4) `/vzdelavani-a-rozvoj` — 6. box „Tradiční akce"
V `src/routes/vzdelavani-a-rozvoj.tsx` přidat do pole `allAreas` šestou položku (2×3 grid):
- `id: "tradicni-akce"`, `eyebrow: "Aktivity"`, `title: "Tradiční akce"`.
- Foto: `karneval.webp` — nahrát přes `lovable-assets` do `src/assets/vzdelavani/karneval.webp.asset.json`.
- Jedna aktivita (ikona např. `PartyPopper` z lucide-react, červená paleta pro odlišení):
  - „Oblíbené akce během roku" — „Během školního roku se děti účastní řady oblíbených aktivit. Patří sem podzimní a jarní výlety do přírody, Čertí rej, karneval, návštěvy Divadla Drak, poznávací exkurze a další společné akce."

## Poznámky
- Žádné hover scale efekty, dodržet vertikální rytmus a stíny podle stávajících sekcí.
- U 3. karty aktualit zachovat vizuální rozvržení (obrázek + badge + titulek + popisek + „Číst více" se šipkou).
