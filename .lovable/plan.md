## Změna navbaru: zaoblený glass box v šířce sekcí

### Cíl
Přestavět horní menu z full-width pruhu na zaoblený glass box, který bude zarovnaný se sekcemi pod ním (container `max-w-7xl`) a zůstane sticky.

### Co se změní
**Soubor: `src/components/site-navbar.tsx`**
- `<header>` přejde z `w-full border-b` na `sticky top-0 z-50 w-full pt-4 px-6 lg:px-10` (bez vlastního pozadí a okraje)
- Uvnitř přibude wrapper `max-w-7xl mx-auto rounded-2xl border border-white/50 bg-background/85 backdrop-blur-lg shadow-lg overflow-hidden`
- Původní vnitřní obsah (logo, nav, CTA, mobilní toggle) se vnoří do tohoto boxu s původními horizontálními paddingy
- Mobilní menu panel zůstane uvnitř boxu – rozbalí se pomocí `max-height` + `opacity` transition, takže box "roste" dolů
- Odstraní se mobilnímu panelu jeho vlastní `border-t` a `bg-background`, protože má pozadí rodiče
- Upraví se `max-h-[calc(100dvh-5rem)]` tak, aby respektovalo výšku boxu (přibližně `calc(100dvh-5rem-1rem)` kvůli top paddingu headeru), nebo se přepne na relativní jednotky

### Co zůstane
- Barvy, fonty, odkazy, CTA tlačítko, mobilní hamburger animace
- Desktop hover efekty (podtržení) i mobilní stagger reveal
- Sticky chování a z-index

### Žádné nové závislosti.