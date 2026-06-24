## Barevné kostičky — border, nový obrázek + přepínač ven/dovnitř

### Změny v `src/components/site-classes.tsx`

1. **Border boxu**: změnit `border-white/60` na `border-border/70` (stejný jako 4 rychlá tlačítka v site-quick-links). Případně mírně sjednotit shadow.

2. **Nahrazení obrázku**: 
   - Smazat starý asset `src/assets/kosticky-doma.webp.asset.json` (delete_asset).
   - Nahrát `kosticky_tridyA.webp` a `kosticky_tridyB.webp` jako Lovable assets přes CLI z `/mnt/user-uploads/`.
   - Importovat oba pointery do `site-classes.tsx`.

3. **Přepínač "Vem kostičky ven / dovnitř"**:
   - Stav `const [outside, setOutside] = useState(false)`.
   - Umístění: nad obrázkem, zarovnaný doprava (`flex justify-end`), mírně překrývá pravý horní roh obrázku.
   - Vizuál: pill button v glass stylu (`rounded-full border border-border/70 bg-background/80 backdrop-blur shadow-…`), uvnitř text + animovaný switch (track 44×24, knob 18×18). Track barva přepíná mezi `bg-mint` (dovnitř) a `bg-sky` (ven). Knob s drobnou ikonkou (🏠 ↔ 🌳) – použijeme lucide `Home` / `TreePine`.
   - `aria-pressed`, `role="switch"`, fokus ring.

4. **Crossfade + lehký scale obrázků**:
   - Wrapper s `position: relative`, oba obrázky absolutně přes sebe, řízené `data-active`.
   - Přechod `opacity 600ms` + `transform: scale(0.98) → 1` `cubic-bezier(0.22,1,0.36,1)`.
   - Druhý obrázek `loading="lazy"` ale předem v DOM, aby nebylo flicker.
   - Respekt `prefers-reduced-motion` (jen swap bez animace).
   - Alt texty: A = „Plastelínové kostičky doma — červená, modrá, zelená a žlutá"; B = „Plastelínové kostičky venku na zahradě se skluzavkou a stromem".

5. **Drobnosti**:
   - Wrapper obrázku zachovat `w-[70%] max-w-3xl mx-auto`, výška dle aspect-ratio (~4:3) přes `aspect-[4/3]`.
   - Přepínač má `whitespace-nowrap` a min šířku, aby se text neměnil skokově při přepnutí — buď fixed width na nejdelší variantu, nebo plynulá šířka přes `transition: width`.

### Bez zásahu do dat / textů tříd
Karty 4 tříd zůstávají beze změny.