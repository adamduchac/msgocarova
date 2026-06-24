## Plovoucí menu nad hero

### Cíl
Menu bude plovoucí nad stránkou. Hero sekce sahe až k samotnému vršku viewportu. Menu zůstane v současném boxu s mírně průhledným pozadím a blurem – nemění se jeho vzhled, jen jeho pozice na stránce.

### Změny

1. **site-navbar.tsx**
   - `<header>`: změnit `sticky top-0` → `fixed top-0 left-0 right-0 z-50`.
   - Odstranit `bg-offwhite` z `<header>` (pozadí menu je už ve vnitřním boxu).
   - Ponechat `px-6` pro odsazení od okrajů.
   - Přidat `mt-3 sm:mt-4` na vnitřní `.container` box, aby box s menu „plaval“ a nelepil se k hornímu okraji.
   - Ponechat všechny ostatní styly vnitřního boxu beze změny (`bg-background/95`, `backdrop-blur-lg`, `shadow-[…]`, `border-white/60`, `rounded-2xl`).

2. **index.tsx**
   - Na `<div className="min-h-screen bg-background">` nebo na samotný `<SiteHero />` přidat horní padding, který vykompenzuje výšku plovoucího menu (`h-20` + horní mezera `mt-3/4`).
   - Přidat např. `pt-28` (≈ 112 px), aby obsah hero začínal pod menu a nebyl překrytý.
   - Gradient wrapper `#FEF8E7 → #FFFFFF` zůstává; díky fixed headeru začíná gradient už na samém vršku viewportu a menu plave nad ním.

3. **site-hero.tsx**
   - Upravit/přizpůsobit horní padding (`hero-y` utility) tak, aby celkový prostor nad textem hero odpovídal: výška menu + mezera nad menu + mezera pod menu + stávající hero padding.
   - Alternativně řídit celé odsazení přes `index.tsx` (bod 2) a v hero ponechat současný padding.

### Výsledek
- Hero gradient začíná přímo na vršku stránky (žádný krémový pruh nad ním).
- Menu je plovoucí box s glass efektem, který viditelně plave nad hero obsahem.
- Při scrollu se chová stejně – zůstává přilepené nahoře jako plovoucí panel.
- Žádné řešení pozadí podle scrollu; menu má své vlastní pozadí pořád.