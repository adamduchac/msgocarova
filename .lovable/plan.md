## Tři úpravy hero + typografie

### 1. Hanken Grotesk 800 pro nadpisy
**`src/routes/__root.tsx`** – Google Fonts link rozšířit na:
`family=Hanken+Grotesk:wght@400;500;600;700;800`

**`src/styles.css`** – v `@theme inline` nastavit:
`--font-display: "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;`

V `@layer base` u `h1, h2, h3, h4` ponechat `font-weight: 700;`.

### 2. Hero H1 – jedna barva + gradient na slovech
**`src/components/site-hero.tsx`** – přepsat H1 takto:
- celý nadpis v `text-ink` s `font-extrabold`
- odebrat jednotlivé `text-brand-blue` / `text-brand-green` / `text-brand-yellow` třídy
- fráze „hrají, objevují a rostou" obalit do jednoho `<span>` s třídami `bg-clip-text text-transparent` a inline style:
  `style={{ backgroundImage: 'linear-gradient(105deg, #2E7DF4 0%, #2FA39B 48%, #3DA35D 100%)' }}`
- interpunkce a zbytek textu zůstává v `text-ink`

### 3. Hero cube B – fix skoku do floatu
**`src/components/site-hero.tsx`** – z druhé kostičky (cube B) odstranit řádek:
`animationDelay: cubesFloating ? "-2s" : undefined,`

### 4. Hero pozadí – krémový gradient do bílé
**`src/components/site-hero.tsx`** – kořenovému `<section>` doplnit inline style:
`style={{ background: 'linear-gradient(to bottom, #FEF8E7 0%, #FFFFFF 100%)' }}`

### Co zůstane beze změny
- Layout hero, slider, kostičky pozic
- Ostatní animace, CTA
- `prefers-reduced-motion` respekt

Žádné nové závislosti.