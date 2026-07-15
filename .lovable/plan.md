Doladění stránky `/kontakty` podle zpětné vazby — všechny změny jsou v `src/routes/kontakty.tsx`.

## Co se mění

### 1. Hero sekce (levý sloupec)

- **Odeberu eyebrow** „Zavolejte nám“ a „Napište nám“.
- Zůstane tam pouze H1 „Kontakty“, krátký perex a pod ním přímo:
  - Telefon `495 444 421` jako `tel:` odkaz
  - Email `kosticky@msjghk.cz` jako `mailto:` odkaz
- **Velikost písma telefonu/emailu zmenším o ~1/3**:
  - z `text-[40px] md:text-[52px]` → na `text-[28px] md:text-[36px]` (nebo ekvivalentně blízké menšímu písnu).
- **Barva telefonu/emailu změním z brand-blue na černou** (`text-ink`).
- **Zmenším mezeru** mezi telefonem a emailem z `mt-10` na `mt-4` nebo `mt-5`.
- **Adresa** zůstane pod emailem s menší mezerou, bez ikon.
- V pravém sloupci zůstane 1:1 placeholder fotky.

### 2. Prohození sekcí pod herem

Aktuální pořadí:
1. Sekce „Kontakty na tým a třídy“
2. Sekce „Kudy k nám“ (mapa)

Nové pořadí:
1. Sekce **„Kudy k nám“** (mapa) — hned pod hero
2. Sekce **„Rejstřík“** (přejmenováno z „Kontakty na tým a třídy“) — až pod mapou

### 3. Přejmenování rejstříku

- Nadpis sekce z `h2` „Kontakty na tým a třídy“ → **„Rejstřík“**.
- Nadpis zachová stejný typografický styl (`text-[28px] md:text-[32px] font-extrabold text-ink`).

### 4. Struktura rejstříku zůstává

- Jednotné boxy `rounded-2xl border border-border/60 bg-card p-5 md:p-6`.
- Grid `grid-cols-1 md:grid-cols-2 gap-3`.
- Sekční labely jako `col-span-full` bez rámečku.
- Vedení školky, školní jídelna, barevné třídy s učitelkami.

### 5. Souvislosti

- Mapa a rejstřík si vymění pořadí v JSX, ale zachovají své třídy `section-y`.
- Sekce s mapou už nebude mít `pt-0`, pokud bude první pod hero; místo toho použije standardní `section-y`.
- Footer zůstává `cubeVariant="kontakty"` (horní modrá kostička, bez spodní).

## Soubory

- `src/routes/kontakty.tsx` — aplikování všech výše uvedených změn.