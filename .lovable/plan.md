# Plán: Paralaxa kostiček v hero
## Cíl
Dát hero kostičkám hloubkový, přirozenější paralaxní efekt: horní kostička se pohybuje opačným směrem než kurzor a rychlost obou kostiček bude rozdílná (poměr cca 2/3).

## Současný stav
V `src/components/site-hero.tsx` jsou obě kostičky posouvány stejným směrem a stejnou rychlostí:

```tsx
const a = cubeAWrapRef.current;
const b = cubeBWrapRef.current;
if (a) a.style.transform = `translate3d(${(-targetX * 7).toFixed(2)}px, ${(-targetY * 7).toFixed(2)}px, 0)`;
if (b) b.style.transform = `translate3d(${(-targetX * 7).toFixed(2)}px, ${(-targetY * 7).toFixed(2)}px, 0)`;
```

## Změna
Upravit funkci `apply` v `useEffect` pro paralaxu takto:

- **Kostička A (horní, top-left)**: pohyb **opačný** směrem k kurzoru (`+targetX`, `+targetY`) a pomalejší rychlostí. Použít ~4.5–5 px (cca 2/3 rychlosti kostičky B).
- **Kostička B (dolní pravá, lower-right)**: ponechat směr **proti** kurzoru (`-targetX`, `-targetY`) a rychlost 7 px, nebo mírně upravit na 8 px pro větší hloubku.

## Konkrétní kód
```tsx
const apply = () => {
  raf = 0;
  const a = cubeAWrapRef.current;
  const b = cubeBWrapRef.current;
  if (a) a.style.transform = `translate3d(${(targetX * 5).toFixed(2)}px, ${(targetY * 5).toFixed(2)}px, 0)`;
  if (b) b.style.transform = `translate3d(${(-targetX * 7).toFixed(2)}px, ${(-targetY * 7).toFixed(2)}px, 0)`;
};
```

## Očekávaný efekt
- Horní kostička bude plynule plout proti pohybu myši, což navodí dojem větší vzdálenosti / odlišné hloubky.
- Dolní kostička zůstane citelnější a rychlejší, takže obě kostičky nebudou působit jako jeden slepený prvek.
- Zachová se respekt k `prefers-reduced-motion` (efekt se již nespouští při zapnuté redukci pohybu).

## Ověření
Po změně zkontrolovat živý náhled — při pohybu myši přes hero by se horní kostička měla pohybovat opačně než kurzor a mírně pomaleji než dolní kostička.