## Úprava sekce „Barevné kostičky"

Přerovnat `src/components/site-classes.tsx` z dvousloupcového layoutu (text vlevo, ilustrace vpravo) do centrovaného obsahu uvnitř jednoho ohraničeného boxu — vizuálně sladěného s kartami v rychlém rozcestníku, jen ve velkém formátu.

### Layout boxu (zhora dolů, vše na střed)

1. **Eyebrow** — „Barevné kostičky" (uppercase, tracking, malý font), centrováno.
2. **Nadpis H2** — „Čtyři třídy, jeden skvělý tým" s modrým gradientem na „skvělý tým", centrovaný, max-w-2xl.
3. **Ilustrace** — `kosticky_doma.webp` (nahraji jako asset), šířka ~70 % šířky boxu (max-w cca `48rem`, `w-[70%]`), centrovaná, `loading="lazy"`, bez hover efektů.
4. **Grid tříd** — 4×1 na desktopu (`lg:grid-cols-4`), 2×2 na tabletu (`sm:grid-cols-2`), 1 sloupec na mobilu. Karty zůstávají ve stávajícím stylu (barevný nadpis třídy, věk, učitelky, rozbalovací CTA pill se šipkou v rohu) — žádné změny v obsahu ani interakci jednotlivých karet.

### Styl boxu

- `rounded-3xl border border-border/70 bg-card`
- Měkký stín: `shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)]` (silnější než u malých rozcestníků, aby box „nesl" obsah)
- Vnitřní padding: `p-6 sm:p-10 lg:p-14`
- Šířka: `container mx-auto px-6`, uvnitř `max-w-6xl`

### Vertikální rytmus uvnitř boxu

- Eyebrow → H2: `mt-3`
- H2 → ilustrace: `mt-8 lg:mt-10`
- Ilustrace → grid: `mt-10 lg:mt-12`

### Drobnosti

- Žádný hover scale, žádný bouncy efekt (per Core memory).
- Scroll-reveal: eyebrow, H2, ilustrace a karty s jemným staggerem (`--reveal-delay`).
- Karty v 4×1 gridu mohou mít vyšší/menší padding podle potřeby, aby se vešly do řady bez přetečení (`p-5` místo `p-6`, pill stejně velký).

### Technické kroky

1. `lovable-assets create --file /mnt/user-uploads/kosticky_doma.webp > src/assets/kosticky-doma.webp.asset.json`
2. Přepsat `src/components/site-classes.tsx`:
   - Odstranit dvousloupcový grid.
   - Obalit obsah do `<div class="mx-auto max-w-6xl rounded-3xl border border-border/70 bg-card shadow-[...] p-6 sm:p-10 lg:p-14">`.
   - Centrovat eyebrow + H2.
   - Vložit `<img>` s `kosticky_doma`, `w-[70%] max-w-3xl mx-auto`.
   - Grid tříd: `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4`.
3. Build check.
