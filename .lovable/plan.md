# Plán: Menu se submenu

Upravím **pouze** `src/components/site-navbar.tsx`. Žádné nové routy ani sekce – odkazy povedou zatím na hash kotvy (skutečné stránky doplníme později).

## Nová struktura menu

1. **O školce** (submenu)
   - Představení a vize → `#predstaveni`
   - Náš tým → `#tym`
   - Veřejné hřiště → `#hriste`
   - Školní jídelna → `#jidelna`
2. **Barevné třídy** (submenu)
   - Modrá kostička → `#trida-modra`
   - Červená kostička → `#trida-cervena`
   - Zelená kostička → `#trida-zelena`
   - Žlutá kostička → `#trida-zluta`
3. **Pro rodiče** (submenu)
   - Zápis do MŠ → `#zapis`
   - Organizace a Platby → `#organizace`
   - Program a aktivity → `#program`
   - Dokumenty ke stažení → `#dokumenty`
4. **ZŠ Josefa Gočára** → externí link `https://zsgocarova.cz/` (`target="_blank" rel="noopener noreferrer"`)
5. **Naše školka** (button, primární CTA) → `#zapis` – nahradí stávající „Přihlásit dítě"

## Desktop chování (≥ lg)

- Položka se submenu = `<button>` s caret ikonou (lucide `ChevronDown`); otevírá panel na **hover i focus** (klávesnice).
- Panel: absolutně pozicovaný pod položkou, `rounded-2xl`, `border`, `bg-background`, jemný stín, padding ~`p-2`, šířka `min-w-56`.
- Sub-položky: vertikální seznam, `text-[15px]`, `rounded-lg`, hover = `bg-offwhite text-brand-blue` (bez scale, dle core rules).
- **Animace vyjetí** (smooth, v duchu existujícího kódu):
  - `transition: opacity 220ms, transform 280ms cubic-bezier(0.22,1,0.36,1)`
  - Stav zavřeno: `opacity-0 translate-y-1 scale-[0.98] pointer-events-none`
  - Stav otevřeno: `opacity-100 translate-y-0 scale-100`
  - `transform-origin: top`
  - Otevřený stav drží i když kurzor přejede z triggeru na panel (společný hover wrapper s `group` / state s krátkým close delay ~120 ms, aby nezavřelo cestou).
- Šipka caret rotuje 180° při otevření (`transition-transform 200ms`).
- Respektuje `prefers-reduced-motion` (vypne transformace, jen opacity).
- Zavření na: pointer leave celé skupiny, Escape, focus mimo, klik mimo.
- Klávesnice: Enter/Space otevírá, ↓ první položka, ↑/↓ navigace, Esc zavře a vrátí focus na trigger.

## Mobil (< lg)

- Položky se submenu v rozbalovacím panelu fungují jako **accordion**: tap rozbalí seznam pod sebou (`max-height` transition 280ms, stejná `cubic-bezier(0.22,1,0.36,1)`, caret rotace).
- Sub-položky odsazené `pl-6`, menší `py-2`, stejný styl jako stávající `mobile-nav-item`.
- ZŠ Josefa Gočára jako běžný odkaz s malou external ikonou.
- „Naše školka" button beze změny umístění (na konci panelu).

## Technické detaily

- Datová struktura:
  ```ts
  type NavItem =
    | { label: string; href: string; external?: boolean }
    | { label: string; children: { label: string; href: string }[] };
  ```
- Stav otevřeného desktop submenu: `const [openMenu, setOpenMenu] = useState<string | null>(null)` + `useRef` na timeout pro hover-out delay.
- Zachovám sticky header, logo, mobilní toggle, brand-blue CTA styling, focus-visible ringy.
- Žádné nové závislosti, žádné změny tokenů ani `styles.css`.

## Mimo rozsah

- Skutečné podstránky / routy pro nové položky (zatím jen kotvy).
- Změny v ostatních komponentách (hero, oznamovací bar, footer atd.).
