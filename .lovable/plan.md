## Úpravy karet a kostiček

### 1. Karty "Přijďte se podívat" (`site-benefits.tsx`)
Zvětšit obě řádky nadpisu v každé ze 4 karet o jeden řád:
- **Hlavní část** (např. "Velká zahrada") → `text-3xl md:text-[40px]` (blízko H2)
- **Podnadpis** (např. "s dopravním hřištěm") → `text-lg` (blízko stávajícímu H3, 18 px)

### 2. Barevné kostičky v boxech (`site-classes.tsx`)
- Zmenšit nadpisy kostiček (např. "Modrá kostička") na `text-sm` nebo `text-base`.
- Odebrat puntík (`<span>` s `h-2.5 w-2.5 rounded-full`) před nadpisem.
- Odebrat třídu `card-hover` z karet — ponechat jen rozbalovací efekt tlačítka při `group-hover`.

### Technické detaily
- Jedná se pouze o změny Tailwind tříd, žádná logika.
- Oba soubory: `src/components/site-benefits.tsx` a `src/components/site-classes.tsx`.