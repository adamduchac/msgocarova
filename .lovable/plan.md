# Úpravy webu MŠ Josefa Gočára

## 1. Odstranit sekci Rychlý rozcestník
- `src/routes/index.tsx`: odstranit `<SiteQuickLinks />` a import.
- Smazat `src/components/site-quick-links.tsx`.

## 2. Aktuality (`site-news.tsx`)
- Odebrat eyebrow „Aktuálně".
- Nadpis: **„Zážitky, které si děti odnáší"** — jednobarevně (bez žlutého akcentu).

## 3. Sjednocení názvu školky
- Grep celého projektu; kdekoli je „MŠ Gočárova", „MŠ Gočára" apod. → **„Mateřská škola Josefa Gočára"**.
- Zkratku „MŠ Josefa Gočára" ponechat jen v `alt` loga a copyrightu ve footeru (prostorové důvody).

## 4. Třídy — přeuspořádat
Pořadí: **červená, zelená, modrá, žlutá**.
- `src/components/site-classes.tsx` — pole tříd.
- `src/components/site-navbar.tsx` — submenu „Barevné třídy".
- `src/components/site-footer.tsx` — seznam tříd v pravém sloupci ve stejném pořadí.

## 5. Menu (`site-navbar.tsx`)
- Submenu „Pro rodiče":
  - „Organizace a Platby" → **„Platby"**
  - „Program a aktivity" → **„Program dne"**
- Přidat top-level položku **„Kontakty"** (interní, za „ZŠ Josefa Gočára"). Použít `<Link to="/kontakty">` z `@tanstack/react-router` v desktop i mobil nav.
- Logo desktop: `md:h-10` → `md:h-11` (+10 %). Mobil beze změny.
- CTA button „Naše školka" → **„Aplikace Naše MŠ"** (desktop i mobil), href `#nase-ms`.

## 6. Nová stránka `/kontakty`
Soubor `src/routes/kontakty.tsx` — `createFileRoute("/kontakty")` + vlastní `head()` (title, description, og:title, og:description).

### Layout stránky
Struktura ve stylu webu (navbar → hero-lite hlavička → obsah → footer).

**Hlavička** (podobná ostatním section headerům):
- eyebrow: `Napište nám`
- h1: `Kontakty` (font-display, extrabold)
- krátký lead pod nadpisem (1 věta, klidně: „Rádi vás uvítáme osobně, nebo se ozvěte telefonem či e-mailem.")

**Hlavní blok — kontaktní karta + mapa (2-sloupcový grid na desktopu)**

Levý sloupec (velký kontakt):
- **Telefon** (velký, klikací `tel:+420495444421`) — font-display, ~34–40px, brand-blue
- **E-mail** (velký, klikací `mailto:kosticky@msjghk.cz`) — font-display, ~28–34px
- Pod tím adresa v `<address>`:
  Mateřská škola Josefa Gočára / Škroupova 693 / 500 02 Hradec Králové 2

Pravý sloupec:
- Mapa v iframe s kulatými rohy (`rounded-2xl`, `overflow-hidden`, jemný stín):
  ```html
  <iframe src="https://mapy.com/s/kovocenope" title="Mapa — Mateřská škola Josefa Gočára" class="w-full h-[360px] md:h-[420px] block" loading="lazy" style="border:0" />
  ```

**Vedení školy** (samostatná menší sekce, dvě karty vedle sebe):
- Karta 1: „Ředitel ZŠ a MŠ Josefa Gočára" — **Mgr. Petr Sadílek**
- Karta 2: „Zástupce ředitele pro MŠ" — **Mgr. Jitka Kouklíková**
- Styl: `rounded-2xl border bg-card` karty s eyebrow labelem a jménem.

**Telefonní seznam** (grid karet, `rounded-2xl border`, každá s ikonou/tečkou barvy třídy kde relevantní):
- Mateřská škola (zástupce ředitele) — 495 444 421
- Školní jídelna ZŠ — odhlašování obědů — 495 019 050 *(malý popisek: „nejdéle do 10:00 na příští den")*
- Výdejna obědů MŠ — 495 444 422
- Modrá kostička — 495 444 423 (modrá tečka)
- Žlutá kostička — 495 444 424 (žlutá tečka)
- Červená kostička — 495 444 425 (červená tečka)
- Zelená kostička — 495 444 426 (zelená tečka)

Grid: 1 sloupec mobile → 2 sloupce md → případně 2 sloupce lg (pro čitelnost radši 2, ne 3).
Čísla klikací (`tel:`), s tabular-nums.

**Placeholder pro fotku školky**:
- Nad nebo mezi bloky široký `rounded-[36px]` blok s `aspect-[16/7]`, `bg-offwhite` (nebo jemný gradient), uprostřed textem „Fotka školky (placeholder)". Až user dodá foto, jen swap.

### Footer na /kontakty — prohozené kostičky
- Rozšířit `SiteFooter` o prop `cubeVariant?: "default" | "kontakty"`.
- Import `cubeBlue` a `cubeGreen` navíc; podle variantu:
  - default: současné (červená nahoře, žlutá dole vpravo).
  - kontakty: **zelená dole vpravo** (na místě žluté) a **modrá nahoře vlevo** (na místě červené).
- Ostatní layout zachovat.

### Reveal a styl
- Použít stejné `reveal-up` třídy jako ostatní sekce, stejný vertikální rytmus (`section-y`).
- Karty `rounded-2xl border border-border/60 bg-card`, hover jen jemná změna barvy (dle Core memory — žádný scale).

## Technické poznámky
- `Link` z `@tanstack/react-router` pro položku „Kontakty" v navbaru — kvůli SPA navigaci a prefetchi.
- `routeTree.gen.ts` se přegeneruje automaticky, needitovat.
- Head metadata `/kontakty`: title „Kontakty — Mateřská škola Josefa Gočára", description shrnutí adresy a hlavních kontaktů.
- Ověření: build musí projít, ručně projít `/` i `/kontakty`, ověřit že submenu má nové položky a že footer na /kontakty má modrou nahoře + zelenou dole.
