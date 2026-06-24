# Plán: drobné úpravy menu + hero + oznamovací box

## 1) Menu — odebrat ikony

V `src/components/site-navbar.tsx`:
- Odstranit `ChevronDown` u submenu triggerů (desktop i mobil).
- Odstranit `ExternalLink` u odkazu na ZŠ Josefa Gočára (desktop i mobil) — chování `target="_blank"` zůstává.
- Odstranit `ArrowRight` u CTA „Naše školka" (desktop i mobil).
- Import `ChevronDown, ExternalLink, ArrowRight` z `lucide-react` odstranit (zůstane jen `Menu, X`).
- Submenu se nadále otvírá na hover/focus/click; rotace caretu jen odpadá (caret tam není).

## 2) Hero nadpis — bez pevných zalomení

V `src/components/site-hero.tsx`:
- Odstranit `<br className="hidden sm:block" />`.
- Místo mezery mezi „a" a „rostou" vložit pevnou mezeru (`\u00A0`) v textu, aby se „a rostou" nikdy nerozdělilo.
- Výsledek: `Místo, kde si děti hrají, objevují a\u00A0rostou` — řádky se zalomí dle šířky, jen „a rostou" drží spolu.

## 3) Oznamovací box — bez hover efektu karty, kulatý arrow

V `src/components/site-announcement-bar.tsx`:
- Odstranit třídu `card-hover-soft` z `<a>` (zůstane stín + focus ring; rozjetí šipky „Podrobnosti" beze změny).
- Arrow pill v default stavu má být **dokonalý kruh**:
  - `inline-flex items-center h-11 sm:h-12 rounded-full bg-ink` zůstává.
  - Vnitřní text span: výchozí `px-0` (nikoli pevné `padding-left:1rem; padding-right:0.25rem`), na hover/focus `group-hover:pl-4 group-hover:pr-1 group-focus-visible:pl-4 group-focus-visible:pr-1`. Padding doplnit do `transitionProperty` (už tam je).
  - Tím při zavřeném stavu vidíme jen čtvereček 44×44 / 48×48 px se `rounded-full` = kruh, plně dle reference.

Žádné jiné změny, žádné nové závislosti.
