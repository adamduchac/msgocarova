## Úpravy `/pro-rodice` + navbar

### 1) Navbar — přidat "Kroužky a aktivity"
V `src/components/site-navbar.tsx` do children pro "Pro rodiče" přidat novou položku hned za "Program dne":
- `{ label: "Kroužky a aktivity", href: "/pro-rodice", hash: "krouzky", internal: true }`

Sekci kroužků v `pro-rodice.tsx` opatřit `id="krouzky"` a `scroll-mt-28`.

### 2) Kroužky a aktivity — samostatná sekce
V `src/routes/pro-rodice.tsx` vytáhnout blok "Kroužky a aktivity" ze sekce `#program-dne` a udělat z něj samostatnou `<section id="krouzky" className="section-y-md scroll-mt-28">` na stejné úrovni jako Platby / Program dne / Výbava. Nadpis `h2` v jednotném stylu (`text-[32px] md:text-[40px]`, `font-extrabold`, `text-ink`), pod ním úvodní odstavec, pak grid 3 karet (beze změny).

### 3) Program dne — jedna karta o dvou sloupcích
Místo dvou vedle sebe `ScheduleCard` (po 4 řádcích) udělat jednu bílou kartu (`rounded-2xl`, stejný border/stín), uvnitř `grid md:grid-cols-2 md:divide-x divide-black/5`. Každý sloupec obsahuje 4 řádky rozvrhu s `divide-y divide-black/5`. Čas `w-28 shrink-0 font-display font-bold text-ink tabular-nums`, aktivita `text-[15px] text-body`. Padding sloupců `px-6 py-2` na řádek, karta bez vnějšího paddingu.

### 4) Platby — tři sloupce
Nyní `md:grid-cols-2` (dva účty) + samostatný VS callout dole. Předělat na `md:grid-cols-3` tři bílé karty stejného stylu (border, stín, `rounded-2xl`, `p-6`):
1. **Školné + kurzovné plavání** — ikona `Wallet` (modrý badge), číslo účtu `35-5744160237/0100`.
2. **Stravné** — ikona `CreditCard` (zelený badge), číslo účtu `27-320530297/0100`.
3. **Variabilní symbol** — ikona `Info` (žlutý badge, `bg-brand-yellow/15 text-ink`), text „Variabilní symbol dítěte je pro všechny platby stejný."

Žlutý callout box zcela odstranit.

## Poznámky
- Ostatní sekce beze změny.
- Zachovat `t()` pro texty s neděliteľnými mezerami.
