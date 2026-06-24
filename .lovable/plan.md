## Oprava layoutu karet "Proč k nám" — horizontální karty

### Souhrn
Předchozí implementace má karty ve vertikálním layoutu (obrázek nahoře, text dole). Uživatel chce horizontální karty — ilustrace vlevo (~40 % šířky karty), text vpravo, v 2×2 gridu na plné šířce sekce.

### Změny

1. **Grid na plnou šířku sekce**
   - Soubor: `src/components/site-benefits.tsx`
   - Odebrat `max-w-5xl` z wrapperu gridu — grid bude využívat plnou šířku kontejneru (`container mx-auto px-6`).

2. **Horizontální layout jedné karty**
   - Každá karta bude mít `flex-row` místo `flex-col`.
   - **Ilustrační box vlevo**: `w-[40%]` (cca), bílé pozadí, zaoblený (`rounded-2xl`), stín/jemný ring. Ilustrace uvnitř zachová `object-contain` a cca 70–80 % výplně boxu.
   - **Textový sloupec vpravo**: `flex-1`, nadpis + odstavec. Odstavec si ponechá stejný styl.
   - Karta zůstane `rounded-3xl`, ponechá svou tónovanou barvu pozadí (`bg-mint`, `bg-sky`, `bg-cream`, `bg-blush`), jemný border `border-white/60` a hover `translateY(-2px)`.

3. **Responzivita**
   - Na mobilu (`< md`) se karta přepne zpět na `flex-col` — ilustrace nahoře, text dole — protože na úzké obrazovce by horizontální layout byl příliš stlačený.
   - Grid zůstává `grid-cols-1 md:grid-cols-2`.

4. **Zachované prvky**
   - Gradient pozadí sekce (bílá → offwhite).
   - Černý titulek bez barevného zvýraznění.
   - Scroll-reveal stagger (`--reveal-delay`).
   - `prefers-reduced-motion` respektováno.

### Technické detaily
- Žádné nové závislosti.
- Žádné změny mimo `src/components/site-benefits.tsx`.