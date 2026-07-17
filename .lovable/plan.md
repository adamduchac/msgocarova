## Úpravy sekce a stínů na /o-skolce

### 1. Pozadí sekcí

**Vzdělávání a rozvoj** (`#vzdelavani`, řádek 284)
- Přidat gradient shora dolů: nahoře `var(--blue-soft)` → dole `#FFFFFF`.

**Náš tým** (`#tym`, řádek 327)
- Odstranit `backgroundColor: "#F8FAFC"` — sekce bude bez pozadí (bílá).

**Žlutý gradient přes hřiště → jídelna**
- **Veřejné hřiště** (`#hriste`, řádek 348): přidat gradient `#FFFFFF` → `#FDFAF6`.
- **Školní jídelna** (`#jidelna`, řádek 412): upravit gradient na `#FDFAF6` → `#FEF8E7`, aby plynule navazoval a končil v krémové/žluté před footerem (který už je `#FEF8E7`).

### 2. Stín na kartách (jako na HP)

Přidat základní stín `shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)]` na všechny bílé karty na stránce. Fotografie (galerie, portréty týmu) zůstávají bez stínu.

Konkrétně:
- 5 karet ve „Vize" (řádek 259).
- Info karta u hřiště s otevírací dobou (řádek 365).
- 3 karty v jídelně: Odhlašování (429), Platba (480), Výdej (508).

Karty už mají `.card-hover`, což řeší jen hover přírůstek — přidáním základního stínu získáme stejný klidový vzhled jako na HP.

### Technické detaily

Všechny změny jsou v jediném souboru `src/routes/o-skolce.tsx` — úpravy inline `style` gradientů u čtyř `<section>` prvků a přidání jedné shadow utility třídy do `className` každé z osmi karet. Ostatní obsah, layout ani komponenty se nemění.