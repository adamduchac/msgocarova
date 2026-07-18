## Úpravy stránky /kontakty

**Soubor:** `src/routes/kontakty.tsx`

### 1. Hero — mapa místo fotky
- V pravém sloupci nahradit `ImageIcon` placeholder `<iframe>` mapou (stejný `src` jako sekce „Kudy k nám": `https://mapy.com/s/kovocenope`).
- Zachovat čtvercový poměr (`aspect-square`), zaoblený rámeček `rounded-[28px]` a stejný stín jako mají boxy na HP (`shadow-[0_20px_60px_-22px_rgba(16,15,16,0.25)]`).

### 2. Odstranit sekci „Kudy k nám"
- Kompletně smazat `<section>` s druhou mapou (řádky 146–162).

### 3. Adresa velikostí sjednocená s telefonem/e-mailem
- Odstranit eyebrow „Adresa".
- Adresu vysázet stejnou typografií jako telefon a e-mail (`font-display text-[28px]/[36px] font-extrabold`), tři řádky pod sebou (název školy, ulice, město).
- Sjednotit vertikální odstupy: telefon, e-mail i adresa budou v jednom `flex flex-col` bloku s konzistentní mezerou (např. `gap-2`) místo současného mixu `mt-1` / `mt-6`.

### 4. Rejstřík v jednom bílém boxu
- Obalit celý obsah sekce „Rejstřík" (nadskupiny Vedení / Jídelna / Barevné třídy) do jednoho vnějšího bílého boxu ve stylu HP karet „barevné kostičky": `rounded-[28px] border border-border/60 bg-card p-6 md:p-10 shadow-[0_20px_60px_-22px_rgba(16,15,16,0.25)]`.
- Vnitřní jednotlivé položky (dosavadní `boxClass` karty) převést na plain řádky bez vlastního rámečku a pozadí — oddělené jen jemným `divide-y border-border/60` nebo mezerami, aby vnější box působil čistě. Podskupiny „Vedení školky", „Školní jídelna", „Barevné třídy" zůstávají jako `sectionLabelClass` nadpisy uvnitř tohoto boxu.

Žádné jiné stránky ani logika se nemění.
