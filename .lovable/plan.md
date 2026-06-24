Submenu je dnes vycentrované pod položkou (`left-1/2 -translate-x-1/2`). Zarovnám levý okraj submenu na začátek textu položky.

**Změna v `src/components/site-navbar.tsx`:**
- Box: `absolute left-1/2 -translate-x-1/2` → `absolute left-0`.
- Mírně posunu vnitřní padding tak, aby první položka submenu vizuálně sedla na začátek textu tlačítka — `p-2` zůstává, ale levý padding položek se zarovná díky `left-0` na boxu (text tlačítka začíná na `0`, submenu padding `8px` + položka `px-3` = drobný odsazení doprava; pokud bude vypadat moc odsazené, snížím vnitřní padding na `p-1.5` a položky na `px-2`).

**Změna v `src/styles.css`:**
- `.nav-submenu` transform: `translate(-50%, -6px)` → `translate(0, -6px)`.
- `.nav-submenu[data-open="true"]` transform: `translate(-50%, 0)` → `translate(0, 0)`.

Mobilní menu beze změny.