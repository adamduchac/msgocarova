
## Úpravy hero slideru

### 1) Nahradit 2. a 3. fotku
- Nahrát `user-uploads://hero_1.webp` a `user-uploads://hero2.webp` přes `lovable-assets create` a přepsat pointery `src/assets/hero-kids-2.webp.asset.json` a `src/assets/hero-kids-3.webp.asset.json` novými asset_id. Importy v `src/components/site-hero.tsx` zůstanou beze změny.
- Aktualizovat `alt` texty ve `SLIDES` pole: 2. slide → „Děti si hrají s barevnými plastovými kostkami ve třídě", 3. slide → „Chlapec drží duhového draka na podzimní procházce".

### 2) Náhodné pořadí slidů při načtení
V `src/components/site-hero.tsx`:
- Přidat `useMemo` na zamíchání pořadí `SLIDES` (Fisher–Yates) — proběhne jednou při mountu, nulový runtime overhead (jen 4 prvky). Autoplay a existující stavy zůstávají beze změny.
- Alternativně jednorázový `useState(() => shuffle(SLIDES))`. Použiji `useState` initializer, aby se pořadí ustanovilo před prvním renderem a bylo konzistentní (SSR-safe: první render může vrátit pole v původním pořadí a shufflovat až v `useEffect` — jinak nastane hydration mismatch).

Konkrétně:
```
const [slides, setSlides] = useState(SLIDES);
useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return; // ponechat pořadí
  setSlides((prev) => {
    const a = [...prev];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  });
}, []);
```
Ve `SLIDES.map` použít `slides` místo `SLIDES`. Výkon = zanedbatelný (jednorázový shuffle 4 položek po hydrataci).

## Poznámky
- Preload/priority zůstává na `i === 0` v renderovaném pořadí — po zamíchání se první fotka může lišit, ale první frame ukáže původní pořadí (před shuffle v effectu), takže LCP fotka `hero-kids.jpg` se stále načte s `fetchPriority="high"`.
- Žádné jiné změny.
