## Plán — živější kostičky v hero sekci

### 1. Výraznější a rychlejší float animace
- Upravit `@keyframes hero-cube-float-a` a `@keyframes hero-cube-float-b` v `src/styles.css`:
  - Zvětšit amplitudu pohybu (`translateY` a `rotate`) o ~30–50 %.
  - Zkrátit dobu trvání cyklu z 7 s / 8,5 s na cca 5 s / 6,5 s.
- Upravit vstupní animaci `hero-cube-in` — mírně zrychlit overshoot bounce (např. `scale(1.14)` místo `1.12` a rychlejší settle).

### 2. Parallax reakce na kurzor v hero sekci
- V `src/components/site-hero.tsx` přidat `useEffect` pro sledování `mousemove` nad hero sekcí.
- Vypočítat relativní offset myši ke středu hero a aplikovat jemný `translate` na kostičky (opačný směr než myš, aby vytvořily hloubku):
  - Kostička A: ~6–10 px posunu na ose X i Y.
  - Kostička B: ~4–8 px posunu (slabší, aby působila dál).
- Při opuštění hero sekce se kostičky vrátí do výchozí pozice.
- Respektovat `prefers-reduced-motion` — parallax se vypne.

### 3. Zvětšení kostiček o 5 %
- Upravit šířky v `site-hero.tsx`:
  - Kostička A: `w-24 sm:w-28 lg:w-40` → `w-[6.3rem] sm:w-[7.35rem] lg:w-[10.5rem]` (cca +5 %).
  - Kostička B: `w-[6.3rem] sm:w-[7.2rem] lg:w-[9.9rem]` → `w-[6.6rem] sm:w-[7.55rem] lg:w-[10.4rem]` (cca +5 %).

### Soubory ke změně
- `src/styles.css` — keyframes
- `src/components/site-hero.tsx` — velikosti + parallax logika

Žádné nové závislosti. CSS transformace + nativní React hooky.