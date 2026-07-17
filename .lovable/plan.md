## Změny

**1. HP — 1. karta „Klub Předškoláček"** (`src/components/site-activities.tsx`)
- Rozšířit typ `href` o `"/predskolacek"`.
- Změnit odkaz první karty z `href: "/pro-rodice"`, `hash: "krouzky"` na `href: "/predskolacek"` bez hashe.

**2. Navbar — položka „O školce / Vzdělávání a aktivity"** (`src/components/site-navbar.tsx`)
- Řádek 24: změnit `href: "/vzdelavani-a-rozvoj"` na `href: "/o-skolce"`, přidat `hash: "vzdelavani"` (odpovídá `id="vzdelavani"` sekce na /o-skolce).

Ostatní odkazy a stránka `/vzdelavani-a-rozvoj` zůstávají beze změny.
