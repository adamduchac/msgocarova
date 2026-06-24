## Záměr
Upravit `SiteAnnouncementBar` podle 3 předchozích bodů + nová interakce CTA vpravo.

## Změny v `src/components/site-announcement-bar.tsx`

### 1. Šířka baru jako ostatní sekce
- Vnitřní wrapper použije `container mx-auto px-6` (sjednoceno se `SiteAbout`, `SiteClasses`).

### 2. Ikona novin 2× větší, kroužek bez stínu
- Bílý kroužek `h-[72px] w-[72px] sm:h-20 sm:w-20`, bez `shadow-*`.
- `<img>` uvnitř `h-12 w-12 sm:h-14 sm:w-14`.

### 3. Celý bar klikací
- Kořenový obal změnit z `<div>` na `<a href="#aktuality">` s `block` + `group` + `focus-visible:ring-2 focus-visible:ring-brand-blue`.
- Zachovat `rounded-2xl bg-cream` + jemný stín.
- Žádné `hover:scale-*`.

### 4. CTA vpravo: kroužek se šipkou, který se na hover/focus baru rozbalí vlevo na pill „Podrobnosti →"
Struktura (vpravo, ve flexu s textem uprostřed):

```
<span class="cta-pill group-hover/group-focus-visible variants">
  <span class="label">Podrobnosti</span>   ← skrytý ve výchozím stavu
  <ArrowRight />                            ← vždy viditelná
</span>
```

Mechanika čistě CSS, bez nových závislostí:
- Pill: `inline-flex items-center bg-ink text-white rounded-full overflow-hidden`, výchozí velikost `h-[72px] w-[72px] sm:h-20 sm:w-20` (stejně velký kruh jako levá ikona).
- Šipka: `ArrowRight` `h-5 w-5`, vždy v pravé části, `mr-auto`-aligned přes `justify-end` (uvnitř fixní pravý sloupec šířky `5rem`).
- Label „Podrobnosti": `max-w-0 opacity-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity,padding] duration-300 ease-out`, padding `pl-5 pr-2`.
- Hover/focus celého `<a class="group">`:
  - `group-hover:max-w-[180px] group-hover:opacity-100`
  - `group-focus-visible:max-w-[180px] group-focus-visible:opacity-100`
- Pill se sám nezvětšuje skokem — pravý sloupec (šipková část) drží konstantních `5rem`/`80px`, label se roluje vlevo od něj. Vizuálně to vypadá, že kroužek „vystřelí" text doleva a stane se z něj pill „Podrobnosti →".
- Transition `cubic-bezier(0.22, 1, 0.36, 1)`, ~280–320 ms.
- Respekt k `prefers-reduced-motion`: globální pravidlo v `styles.css` už nastavuje `transition-duration: 0.001ms` — label se objeví/skryje skokem, žádný blikající efekt nepřidáváme.

### 5. Drobnosti
- Sjednotit vertikální mezery (`gap-4 sm:gap-6`).
- Text uprostřed beze změny obsahu: **„Poslední den školky 26. 6. 2026."** + na `sm+` doplnění věty.
- Aria: `<a aria-label="Podrobnosti k poslednímu dni školky 26. 6. 2026">`.

## Soubory
- `src/components/site-announcement-bar.tsx` — jediný upravovaný soubor.
- Žádné nové utility v `styles.css`, žádné nové assety, žádné nové balíčky.