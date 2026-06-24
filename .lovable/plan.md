## 1. Box za sekcí „Barevné kostičky" — sjednotit border

V `src/components/site-classes.tsx` u vnějšího boxu vyměnit `border border-white/60` za stejnou linku jako mají rychlé rozcestníky:

`border border-border/70` (viz `site-quick-links.tsx`).

Stín i radius zůstávají, jen border se sjednotí.

## 2. Menu — opravit pozadí a zrušit sticky

V `src/components/site-navbar.tsx`:

- **Zrušit sticky:** `sticky top-0 z-50` → `relative z-50`. Menu pojede s obsahem nahoru, na scrollu zmizí.
- **Krémové pozadí za menu:** ponechat `bg-offwhite` na `<header>` (to je krémový pruh nahoře stránky za navbarem).
- **Vnitřní karta navbaru** má aktuálně `bg-background/95` (bílá průhledná) — vypadá to jako bílý obdélník na krémovém podkladu. Sjednotit tón: změnit `bg-background/95` na `bg-offwhite` (případně úplně zprůhlednit, ať navbar splývá s krémovým horním pruhem) a odebrat `backdrop-blur-lg` (už není sticky, blur netřeba).
  - Zachovat `border border-white/60` + jemný stín? → spíš odebrat border a stín, ať je menu čistě „na krémovém podkladě" bez bílé karty. Nech mi vědět, pokud preferuješ ponechat jemný rámeček.

Výsledek: horní pruh stránky bude celý v krémové, menu v něm bez bílé karty, a při scrollu odjede pryč (není sticky).
