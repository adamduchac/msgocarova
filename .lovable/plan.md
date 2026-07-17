## Změny

### 1. Přejmenování stránky na „Vzdělávání a aktivity"
- `src/routes/vzdelavani-a-rozvoj.tsx`: H1, meta title, og:title, description → „Vzdělávání a aktivity".
- `src/components/site-navbar.tsx` (řádek 24): label `Vzdělávání a rozvoj` → `Vzdělávání a aktivity` (URL beze změny).

### 2. Nové rozložení — 2 skupiny, karetní grid místo alternace foto vlevo/vpravo

Místo dosavadního `AreaBlock` s 1/2 fotkou vedle 1/2 textu vytvořit nový kompaktnější `AreaCard` (foto nahoře 4:5, nadpis + aktivity pod ním) a rozložit takto:

**Sekce „Vzdělávání"** — 2 karty vedle sebe (grid `md:grid-cols-2`)
- Jazyk a komunikace (Angličtina + Zelená kostička)
- Příprava na školu a moderní technologie
  - 1) MIU — předškoláci (Červená kostička)
  - 2) Digitální gramotnost *(přesunutá z původního bloku „Moderní technologie")*

**Sekce „Aktivity"** — grid 2 + 2 + 1:
- Řádek 1 (`md:grid-cols-2`): Plavecká výuka | Škola v přírodě
- Řádek 2 (`md:grid-cols-2` s prázdným místem? ne — místo toho jeden blok na plnou šířku): Lyžařský kurz jako celo­šířková karta pod nimi (foto vlevo 4:5, text vpravo, nebo širší hero-styl).

Poznámka: v zadání máme 2 (vzdělávání) + 3 (aktivity). Layout tedy vyjde jako **2 + 2 + 1** — dvě karty vzdělávání, dvě karty aktivit, poslední aktivita (Lyžařský kurz) na celou šířku.

`AreaCard` (kompaktní, pro grid):
- Foto 4:5 nahoře (placeholder box s `photoBg`, popiskou „Foto brzy doplníme").
- Pod fotkou nadpis (`font-display`, o něco menší než dosud) a `ul` s ikonou + tučný název + text (stejný styl jako dnes).
- Rounded-2xl, žádný hover scale, drží se editoriálního stylu `/o-skolce`.

Celo­šířková varianta pro Lyžařský kurz:
- 2sloupcový grid uvnitř karty: foto 4:5 vlevo, text vpravo, stejné komponentové primitivy.

Sekční nadpisy „Vzdělávání" a „Aktivity" před každou skupinou (`font-display`, konzistentní s ostatními H2 na webu, vzdušný margin).

### 3. CTA na `/o-skolce`
`src/routes/o-skolce.tsx` řádky 316–322:
- `to="/"` → `to="/vzdelavani-a-rozvoj"`
- text „Více o vzdělávání" → „Více o vzdělávání a aktivitách"

### 4. Prostřední karta na HP
`src/components/site-activities.tsx` (řádek 25–33):
- `title`: „Sport a příroda" → „Vzdělávání a aktivity"
- `href`: `#sport` → `/vzdelavani-a-rozvoj`
- Text a obrázek beze změny.
- Ověřit v komponentě, že `href` proklikne cross-route (pokud používá jen `<a href>`, přepnout na TanStack `<Link>` pro tuto kartu, případně detekovat interní cestu začínající `/`).

## Ověření
`bun run build`.
