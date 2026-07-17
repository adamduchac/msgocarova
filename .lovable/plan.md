Úpravy v `src/routes/o-skolce.tsx` a `src/components/site-footer.tsx`.

## 1. Hero — odebrat obsah (TOC menu)
V hero blocku odeberu pravý sloupec `<nav aria-label="Obsah stránky">` (TOC karta) a zjednoduším grid — hero bude jednosloupcový (jen eyebrow + H1 + úvodní odstavec, na plnou šířku kontejneru).

## 2. Blok „Školka, kde má hra…" hned pod úvod
Sekci „Skládáme svět z kostiček" (dnes samostatná sekce pod galerií) přesunu **do hero bloku** — dva odstavce a nadpis se objeví přímo pod úvodním odstavcem (uvnitř stejného `max-w-3xl` textového sloupce). Původní samostatná sekce zmizí.

## 3. Galerie na plnou šířku
Sekci s první galerií (`AboutGallery startTint={0}`) upravím tak, aby nebyla omezená na `max-w-4xl` — obtékající wrapper `max-w-4xl` odeberu, galerie zabere celou šířku containeru. Grid v `AboutGallery` je už `md:grid-cols-3`, takže 3 karty vedle sebe se roztáhnou. Druhá galerie pod „Vzděláváním" zůstává v `max-w-4xl` sloupci (je součástí toho bloku), pokud si nepřejete i tu na plno — zeptám se dole.

## 4. Představení a vize — zarovnat vlevo
Wrapper `mx-auto max-w-3xl text-center` v hlavičce sekce změním na `max-w-4xl` bez `text-center` (levé zarovnání, stejná šířka jako O školce). Eyebrow, H2 i úvodní odstavec budou vlevo. Grid karet zůstává beze změny.

## 5. Boxy Veřejné hřiště a Školní jídelna — plná šířka
- Veřejné hřiště: wrapper `max-w-4xl` obepínající úvodní text i tabulku otevíracích dob rozdělím — text hlavičky zůstane v `max-w-4xl`, ale grid tabulky (`grid md:grid-cols-2`) vyjmu ven a nechám na plnou šířku kontejneru.
- Školní jídelna: stejně — hlavička (eyebrow, H2) v `max-w-4xl` vlevo, ale karty s pravidly / platbou / výdejem budou na plnou šířku.

## 6. Školní jídelna — rozdělit na tři boxy
Dnes máme dva boxy (jeden kombinuje platbu + výdej). Rozdělím box „Platba stravného + Výdej stravy" na dva samostatné:
1. **Odhlašování a přihlašování stravy** (beze změny)
2. **Platba stravného** (jen účet, VS, KS)
3. **Výdej stravy** (jen tabulka časů)

Layout: na desktopu 3 boxy vedle sebe (`md:grid-cols-3`) nebo 2+1 — použiju `md:grid-cols-3` s vyrovnanou výškou. Na mobilu pod sebou.

## 7. Zápatí — žlutá kostička dole
V `src/components/site-footer.tsx` v použití na této stránce předám `showBottomCube={false}` (props už existuje). Změním volání `<SiteFooter topCubeColor="blue" topCubePosition="right" />` v `o-skolce.tsx` na `<SiteFooter topCubeColor="blue" topCubePosition="right" showBottomCube={false} />`. Žádná úprava komponenty footer není potřeba.

## 8. Sjednocení mezer mezi sekcemi
Všechny sekce v `<main>` používají `section-y` (56–112px). Přepnu je na `section-y-sm` (28–56px) — stejné jako kontakty. Poslední sekce (Školní jídelna) si zachová prostor k footeru díky vlastnímu gradientnímu pozadí a paddingu footeru — nechám ji na `section-y-sm` a mezera k footeru zůstane pohodová z paddingu footeru (`pt-24 md:pt-32`).

Konkrétně přepnu:
- Sekce galerie (pt-4 pb-12 → sjednotím dovnitř section-y-sm nebo ponechám menší; přepnu na `section-y-sm`)
- Skládáme svět (odstraní se, obsah je v hero)
- Představení a vize — `section-y-sm`
- Vzdělávání — `section-y-sm`
- Náš tým — `section-y-sm`
- Veřejné hřiště — `section-y-sm`
- Školní jídelna — `section-y-sm`

## Co se nemění

- Texty, assety, komponenta `AboutGallery`, tým a data.
- Ostatní stránky.
- Hero pozadí (žlutý gradient).
