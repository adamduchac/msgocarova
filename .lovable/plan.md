## Cíl
Timeline „Běžný den": jemnější linka, menší body sladěné s gradientem, časy nad nimi ve stejné barvě.

## Změny v `src/components/site-daily-rhythm.tsx`

### 1) Tenčí linka
- Oba `<path>` (base i progress): `strokeWidth="5"` → `strokeWidth="2.5"`.
- Base track barva zůstane `#9CC8A6` (zelená pod gradientem).

### 2) Menší body sladěné s gradientem
- Třída teček: `h-3.5 w-3.5` → `h-[7px] w-[7px]` (50 %).
- Odstranit `bg-brand-blue`, místo toho inline `style={{ backgroundColor: dotColors[i] }}`.
- Předpočítané barvy = lineární interpolace gradientu `#2563EB → #38BDF8` v bodech 10/30/50/70/90 %:
  - `#276CEC`, `#2B7EEF`, `#2F90F2`, `#32A2F4`, `#36B4F7`

### 3) Časy ve stejné barvě
- `<span>` s časem: nahradit `text-brand-blue` za inline `style={{ color: dotColors[i] }}`.
- Stejné pole barev jako u teček (zarovnání 1:1 podle sloupců).

## Bez vedlejších efektů
- Vlnovka, animace, polaroidy beze změny.
- Mobil beze změn (čip s časem v polaroidu drží svůj gradient).