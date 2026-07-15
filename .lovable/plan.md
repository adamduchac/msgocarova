## Cíl
Základní položky menu s podmenu ("O školce", "Barevné třídy", "Pro rodiče") mají fungovat jako odkazy na svoje podstránky — ne jen jako přepínač submenu.

## Chování

**Desktop:**
- Kliknutí na název položky navigujte na `/o-skolce`, `/barevne-tridy`, `/pro-rodice` (přes `<Link>`).
- Submenu se stále otevírá při hoveru a při klávesovém focusu (beze změny).
- `aria-haspopup="true"` a `aria-expanded` zachovat na odkazu.

**Mobil:**
- Kliknutí na text položky navigujte na podstránku a zavře menu.
- Vpravo od textu bude samostatné tlačítko (šipka/chevron) pro rozbalení submenu — tak, aby uživatel mohl jít na hlavní stránku _nebo_ rozbalit sekce.
- `chevron` ikona z `lucide-react` (`ChevronDown`), otočí se při `aria-expanded=true`.

## Implementace (`src/components/site-navbar.tsx`)

- V desktopové větvi větve `if (item.children)` nahradit `<button>` za `<Link to={item.href}>` (položky s dětmi mají `internal: true` a `href` — už jsou v datovém modelu). Zachovat `onFocus={openNow}` a `onMouseEnter` na wrapper `<div>`. `onClick` neexistuje pro toggle — submenu je hover/focus only na desktopu; kliknutí navádí.
- V mobilní větvi rozdělit řádek na `<Link>` (text) + `<button>` (chevron toggle) v `flex` s `justify-between`. Klik na Link zavře menu (`setOpen(false)`), klik na chevron přepne `mobileSubmenu`.
- Import `ChevronDown` z `lucide-react`.

## Soubory
- `src/components/site-navbar.tsx`

## Ověření
- Klik na "O školce" v navbaru vede na `/o-skolce`; hover ukáže submenu; klik na položku submenu vede na kotvu.
- Na mobilu: klik na "O školce" zavře menu a naviguje; klik na chevron vpravo pouze rozbalí submenu.
- TypeScript build projde.