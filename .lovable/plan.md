# Úpravy stránky „O školce"

Přepracuju `src/routes/o-skolce.tsx` — sjednotím šířku sekcí, přidám fotogalerie s mobilním sliderem, zjednoduším pár sekcí. Žádné nové assety, jen kód.

## Sjednocená šířka obsahu

Zavedu společný wrapper `max-w-4xl` pro všechny sekce (O školce, Skládáme svět, Vzdělávání, Veřejné hřiště, Školní jídelna). „Představení a vize" a „Náš tým" zůstávají široké (celý kontejner) jako dosud.

## Nová komponenta: `AboutGallery` (nahrazuje `GalleryPlaceholder`)

- Desktop/tablet (`md+`): grid 3 sloupce, poměr **4:3**, `rounded-2xl`, tónované placeholdery.
- Mobil: horizontální snap slider (1 karta viditelná, `basis-[88%]`), pod ním šipky ←/→ (převzato ze vzoru `site-daily-rhythm.tsx`).
- Použití: pod sekcí „O školce" a pod sekcí „Vzdělávání a rozvoj".

## Sekce po sekcích

### 1. O školce (hero už existuje)
- Beze změny hero bloku.

### 2. Galerie po heru
- Nová `AboutGallery` (3 fotky 4:3, mobil = slider). Vloží se mezi hero a sekci „Skládáme svět z kostiček".

### 3. Skládáme svět z kostiček
- **Odeberu zelený eyebrow** „Skládáme svět z kostiček".
- Sekce zúžena na `max-w-4xl`, zarovnaná vlevo.
- Odeberu boční sloupec s galerií (galerie je teď samostatně nad sekcí).
- Zůstávají 2 odstavce.

### 4. Představení a vize
- Beze změny obsahu, ale grid upravím tak, aby se poslední karta („Stravování a pitný režim") **rozprostřela přes 2 sloupce a byla zarovnaná vpravo** (klasické 3-sloupcové rozložení s dvouslotovou kartou).
- Desktop: `grid-cols-3`, karty 1–4 zabírají 1 sloupec, karta „Stravování" má `md:col-span-2` a je poslední → grid se vyrovná (2+2+2 → 2+2+2 s poslední 2-wide vpravo). Použiju `lg:grid-cols-3` a poslední kartu `lg:col-span-2 lg:col-start-2`… Přesně: první 3 karty v horní řadě (1-1-1), 4. karta 1 sloupec, 5. karta 2 sloupce vpravo. Řešení: `lg:grid-cols-3`, karty 1–3 default, karta 4 default (levý slot spodní řady), karta 5 `lg:col-span-2`.

### 5. Vzdělávání a rozvoj
- Sekce `max-w-4xl`.
- Zůstává eyebrow („Vzdělávání a rozvoj"), nadpis, úvodní odstavec.
- **Odeberu 4 boxy** (educationAreas).
- Místo boxů: **`<ul>` odrážky** se 4 body (Jazyky a komunikace, Myšlení a příprava na školu, Moderní technologie, Pohyb a zážitky) — každá s krátkým popisem.
- Pod odrážkami: **normální primární CTA button** „Více o vzdělávání →" (link `to="/vzdelavani-rozvoj"`, i když stránka zatím neexistuje — po vytvoření naváže; teď button vede na neexistující route → alternativa: nechat button jako `<a href="#"` s `aria-disabled` — **navrhuju použít `Link to="/vzdelavani-rozvoj"`** a stránku vytvořit v dalším kroku, nebo dočasně button vede na `#`. Použiju `#` jako placeholder pro rychlé propojení později).
- Pod tím druhá `AboutGallery` (3 fotky 4:3, mobil slider).

### 6. Náš tým
- **Odeberu eyebrow** „Náš tým".
- Nadpis změním z „Lidé, kteří se starají o vaše děti" na **„Náš tým"**.
- Zbytek (rozdělení pedagog/provoz) beze změny.

### 7. Veřejné hřiště
- Sekce `max-w-4xl`, ale **zarovnaná vlevo** (`mx-0` místo `mx-auto`, nebo wrapper `max-w-4xl` bez centrování). Vlastně stejná šířka jako O školce → `max-w-4xl` a zarovnaná vlevo v kontejneru.
- Obsah (2sloupcová karta s termíny) zůstává.

### 8. Školní jídelna
- Eyebrow („Školní jídelna") + titulek **zarovnané vlevo** (dnes je `text-center`).
- Sekce `max-w-4xl` zarovnaná vlevo.
- **Dva boxy (pravidla + platby/výdej) dám pod sebe** místo vedle sebe — plná šířka, jeden pod druhým.
- Pozadí sekce: gradient **z bílé nahoře do krémové (`#FDFAF6`) dole** místo současné plné barvy.

## Technické detaily

- Vše v `src/routes/o-skolce.tsx`.
- `AboutGallery` bude vnitřní komponenta v tom samém souboru (jako dnes `GalleryPlaceholder`), s `useRef` sliderem podle vzoru `site-daily-rhythm.tsx` (šipky ChevronLeft/ChevronRight, `scrollByCard`).
- Poměr karet: `aspect-[4/3]`.
- Placeholder styl zůstává (tónované pozadí + „Foto brzy doplníme").
- `educationAreas` konstanta se přepíše na jednodušší pole `{ title, text }` pro odrážky.
- Import `Link` z `@tanstack/react-router` pro CTA button (styl = existující primární button, např. jako v `site-cta-banner.tsx`).
- Respektuji reveal třídy, `fixPrepositions`, tokeny, žádné hover-scale.

## Co se nemění

- Assety, `team.ts`, `site-teachers.tsx`, ostatní stránky.
- Hero blok stránky (jen sekce pod ním).
