Sjednocené zmenšení vertikálních mezer na celém webu podle zpětné vazby.

## 1. Homepage hero — zmenšení mezer mezi bloky o ~1/3

V `src/components/site-hero.tsx` upravím vnitřní mezery mezi textovými bloky a spodním odsazením:

- Eyebrow „Mateřská škola Josefa Gočára“: `mb-4` → `mb-3`
- Perex pod H1: `mt-7` → `mt-5`
- Tlačítka pod perexem: `mt-8` → `mt-6`
- Spodní mezera pod obsahem: `h-6 lg:h-10` → `h-4 lg:h-7`

Celkově to hero zatáhne a bude působit kompaktněji, aniž by se ztratila čitelnost.

## 2. Podstránky — zmenšení mezer mezi sekcemi o ~1/2

V `src/styles.css` vytvořím novou utilitku `section-y-sm` (kompaktní varianta `section-y`) a použiju ji na `/kontakty` i všech budoucích podstránkách.

```text
@utility section-y-sm {
  padding-block: clamp(28px, 4vw, 56px);
}
```

Porovnání s aktuální `section-y`:
- Aktuální: `clamp(56px, 8vw, 112px)`
- Nová kompaktní: `clamp(28px, 4vw, 56px)` — přesně o polovinu menší

## 3. Aplikace na /kontakty

V `src/routes/kontakty.tsx` nahradím `section-y` za `section-y-sm` u všech sekcí pod hlavním hero (mapa, rejstřík). Hero sekce samotná zůstane beze změny, protože má vlastní layout a padding.

## 4. Budoucí podstránky

Když přibudou další routy pod `src/routes/`, budou používat `section-y-sm` pro informativní obsah, zatímco homepage zůstane na `section-y` (nebo případně upraveném `hero-y`).

## Soubory

- `src/components/site-hero.tsx` — zmenšení vnitřních mezer v hero
- `src/styles.css` — nová utilitka `section-y-sm`
- `src/routes/kontakty.tsx` — použití `section-y-sm` na podstránkových sekcích