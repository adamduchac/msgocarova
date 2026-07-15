## Úpravy menu (site-navbar.tsx)

1. **Opacity kontejneru na tabletu/mobilu** — třída `bg-background/95` na obalu navigace se aplikuje pod `lg`, na desktopu pak `lg:bg-background/70`. Sjednotit tak, aby mobil/tablet byl plně krycí: změnit `bg-background/95` na `bg-background`. Desktop zůstane `lg:bg-background/70 lg:backdrop-blur-md`.
2. **Text tlačítka** — všude (desktop i mobil) změnit z "Aplikace Naše MŠ" na "Naše MŠ".
3. **Logo desktop -10 %** — `md:h-11` (44 px) → `md:h-10` (40 px). Mobilní `h-[1.875rem]` beze změny.
4. **Nové odkazy v menu** (submenu položky odkazují na sekce nových onepage podstránek přes `to` + `hash`):
   - "O školce" (button → `/o-skolce`) submenu:
     - Představení a vize → `/o-skolce#vize`
     - Vzdělávání → `/o-skolce#vzdelavani`
     - Náš tým → `/o-skolce#tym`
     - Veřejné hřiště → `/o-skolce#hriste`
     - Školní jídelna → `/o-skolce#jidelna`
   - "Barevné třídy" submenu:
     - Červená → `/barevne-tridy#cervena`
     - Zelená → `/barevne-tridy#zelena`
     - Modrá → `/barevne-tridy#modra`
     - Žlutá → `/barevne-tridy#zluta`
   - "Pro rodiče" submenu:
     - Zápis do MŠ → `/zapis-do-skolky` (samostatná stránka)
     - Platby → `/pro-rodice#platby`
     - Program dne → `/pro-rodice#program-dne`
     - Výbava do školky → `/pro-rodice#vybava` (nová položka)
     - Dokumenty ke stažení → `/pro-rodice#dokumenty`
   - "Kontakty" a "ZŠ Josefa Gočára" beze změny.
   - Datový model `NavChild` rozšířit o volitelný `internal?: boolean` a v desktopovém i mobilním renderu přepnout na `<Link to hash=...>` když je položka interní.

## Nové podstránky

Vytvořit 4 route soubory jako "blank" stránky se stejným layoutem jako `kontakty.tsx`:

- `src/routes/o-skolce.tsx`
- `src/routes/barevne-tridy.tsx`
- `src/routes/pro-rodice.tsx`
- `src/routes/zapis-do-skolky.tsx`

Každá stránka:
- `SiteNavbar` nahoře
- Horní gradientní wrapper `linear-gradient(#FEF8E7 → #FFFFFF)` + `pt-28 sm:pt-32` (jako HP a /kontakty)
- Hero H1 s názvem stránky + krátká podnadpis věta
- Prázdné placeholder sekce s `id` odpovídajícími kotvám z menu (např. `/o-skolce`: `<section id="vize">`, `#vzdelavani`, `#tym`, `#hriste`, `#jidelna`; každá jen s H2 nadpisem a placeholder textem — obsah doplní později)
- Střední/prostřední sekce **bez modrého gradientu** — celý střed jen na bílém `bg-background`
- Spodní gradient wrapper `linear-gradient(#FFFFFF → #FEF8E7)` obalující `SiteFooter`
- `head()` s vlastním title/description/og pro každou podstránku
- Sekce mají `scroll-mt-28` (offset pod fixed navbar)

## Kostičky v patičce — střídání

Rozšířit `SiteFooter` props tak, aby řídily barvu a stranu horní kostičky:
- `topCubeColor?: "red" | "blue"`
- `topCubePosition?: "left" | "right"`
- `showBottomCube?: boolean` (nahradí stávající `cubeVariant` chování — na /kontakty spodní žlutá vypnutá)

Přiřazení variant:
- `/` (HP): červená vlevo (stávající) — beze změny
- `/o-skolce`: modrá vpravo
- `/barevne-tridy`: červená vpravo
- `/pro-rodice`: modrá vlevo
- `/zapis-do-skolky`: červená vlevo
- `/kontakty`: modrá vpravo, bez spodní žluté (stávající)

## Technická poznámka

- Navigace přes `<Link to="/o-skolce" hash="vize">` — TanStack Router zvládne skok na `#vize`.
- Žádná byznys logika, jen prezentační vrstva.
- Po změnách zkontrolovat TypeScript build.