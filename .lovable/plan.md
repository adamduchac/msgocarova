## Drobné úpravy hero + menu

### 1. Větší zalomení mezi "objevují" a "a rostou"
**`src/components/site-hero.tsx`** – uvnitř gradient `<span>` přidat `<br className="hidden sm:block" />` mezi „objevují," a „a rostou", aby na desktopu vznikl řádkový zlom v původním místě. (Aktuálně je text na jednom řádku po sloučení frází.) Pevnou mezeru tedy řeší zalomení; pokud uživatel chtěl jen širší mezeru ve frázi „a rostou" na konci, použijeme `&nbsp;` pevnou mezeru s malým marginem nelze – proto necháme zalomení.

Alternativně, pokud uživatel chce zalomení **bez** rozdělení gradientu (jeden plynulý gradient přes celý span): ponecháme současný jeden `<span>` a vložíme dovnitř `<br className="hidden sm:block" />` mezi „objevují," a „a rostou".

### 2. Žluté pozadí pod menu
Aktuálně má hero gradient jen uvnitř sekce, takže pod sticky průhledným menu prosvítá `bg-background` (bílá) z `Index` wrapperu.

**`src/components/site-hero.tsx`** – odstranit inline `style={{ background: ... }}` ze `<section>`.

**`src/routes/index.tsx`** – obalit `SiteNavbar` + `SiteHero` do jednoho `<div>` s `style={{ background: 'linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)' }}`. Tím prosvítá krémová žluť i pod skleněným menu a plynule přechází do bílé pod hero.

### 3. Menu na stejnou šířku jako sekce
Sekce používají `container mx-auto px-6` (Tailwind v4 default container = `width: 100%` bez max-width na žádném breakpointu, tj. plná šířka minus `px-6`). Menu má `max-w-7xl mx-auto`, takže je na velkých obrazovkách užší.

**`src/components/site-navbar.tsx`** – v `<header>` wrapper změnit ze `max-w-7xl mx-auto ...` na `container mx-auto`. Vnější `<header>` paddingy upravit tak, aby horizontální paddingy uvnitř boxu odpovídaly `container px-6` (tedy odebrat `lg:px-10` z vnějšího headeru, použít jen `px-6`, a vnitřní box dostane `px-6 lg:px-8` pro vnitřní odsazení obsahu — to zůstává). Konkrétně: header `sticky top-0 z-50 w-full px-6 pt-3 sm:pt-4`, uvnitř `container mx-auto overflow-hidden rounded-2xl border border-white/50 bg-background/80 shadow-... backdrop-blur-lg`.

### Co zůstane
- Layout, slider, kostičky, animace, CTA
- Sticky chování i glass efekt menu
- `prefers-reduced-motion` respekt

Žádné nové závislosti.