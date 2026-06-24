## 1. Hero kostičky — vyrovnat paralax

V `src/components/site-hero.tsx` aktuálně modrá (A, vlevo nahoře) má násobič `9`, zelená (B, vpravo dole) `6` — výsledkem je, že modrá reaguje viditelně více. Sjednotím sílu paralaxu na stejnou hodnotu pro obě kostičky, aby modrá nepůsobila „silněji":

- Cube A (modrá): `9` → `7`
- Cube B (zelená): `6` → `7`

(Drobné rozdíly v amplitudě float animace zůstávají, ty fungují dobře.)

## 2. Navbar — větší mezery mezi položkami

V `src/components/site-navbar.tsx` na desktop navu zvětším gap mezi položkami:

- `<nav className="… gap-7 …">` → `gap-9` (~36 px místo 28 px)

## 3. Submenu boxy — in/out stagger animace

V `src/components/site-navbar.tsx` dnes celý box jen fadne + lehce posune. Přidám:

- **Box** zachová fade + jemný translateY (zkrátím na 220 ms in, 160 ms out s `ease-out`/`ease-in`).
- **Jednotlivé položky** dostanou stagger: každá `<li>` `opacity 0 → 1` a `translateY(8px) → 0`, delay `60 ms × index`, duration `260 ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Při zavírání rychlý společný fade-out (`120 ms`, bez staggeru), aby zmizení nepůsobilo líně.
- Respekt k `prefers-reduced-motion` (vypne stagger i transformace).

Realizace: v `src/styles.css` přidám třídy `.nav-submenu`, `.nav-submenu-item` s definicí transitions + stavem `[data-open="true"]`, a v navbaru použiju `data-open={isOpen}` na boxu a `style={{ ["--i" as string]: i }}` na `<li>` pro stagger delay.

## Technické detaily

- Soubory: `src/components/site-hero.tsx`, `src/components/site-navbar.tsx`, `src/styles.css`.
- Žádné nové závislosti.
- Mobilní submenu (grid-rows animace) zůstává beze změny — funguje dobře.
