## Cíl

Kompletní vizuální i strukturální předělávka homepage pro mateřskou školu v duchu nahraného nástřelu (`magnific_...png`) — moderní, přátelská, ale čistá. Rytmus „3D clay brand ↔ reálná fotka“ pro důvěryhodnost.

## Nové brand assety (Lovable Assets)

Nahrát z `/mnt/user-uploads/` přes `lovable-assets`:
- `vyhoda1.webp` (strom + skluzavka), `vyhoda2.webp` (robot s vlajkou), `vyhoda3.webp` (bublina se smajlíkem), `vyhoda4.webp` (srdce)
- `kosticky_herofoto.webp` (parta 4 kostiček)

Stávající `cube-*` assety zůstávají pro malé kostičky v Heru. Reálné fotky dětí, vnitrobloku, sportu, akcí s rodiči a aktualit vygenerovat přes `imagegen` (premium, warm/natural light, žádné stock-AI vzhledy).

## Struktura nové homepage

1. **Hero (fúze fotky a 3D)** — vlevo velký claim „Místo, kde si děti **hrají**, **objevují** a **rostou**“ (akcentová slova v brand barvách), podtext + 2 CTA (`Vítejte u nás` smooth scroll na O školce, `Prohlédnout třídy` na Třídy). Vpravo squircle/blob foto dětí, ze spodní hrany prolamují 4 barevné kostičky (red/blue/green/yellow), kolem decentní hand-drawn doodly.
2. **Rychlý rozcestník** — 4 čisté pilulkové karty: Omluvenky · Jídelníček · Platby a účty · Aplikace Naše MŠ. Bez ilustrací, jen ikona + label, jemný hover (barva + posun šipky).
3. **O školce** — split 50/50. Vlevo text („Školka, která si z každého přístupu bere to nejlepší“ + odstavec o vnitrobloku/Labi/Montessori/Začít spolu). Vpravo velká reálná fotka vnitrobloku/dětí u stolečků v zaobleném rámu.
4. **4 hlavní výhody — „Proč si nás rodiče vybírají?“** — grid 2×2 (desktop 4 sloupce). Každá karta: velká 3D clay ilustrace nahoře (vyhoda1–4), nadpis, krátký text. Karty `rounded-2xl`, tónované pozadí dle barvy ilustrace, hover jen `translateY(-2px)` + měkčí stín.
5. **Třídy — „Čtyři třídy, jeden skvělý tým“** — nahoře přes celou šířku dominantní `kosticky_herofoto.webp` (s lehkým paralax/fade-in). Pod tím 4 karty (červená/modrá/zelená/žlutá) s barevným akcentem nahoře, věkové rozpětí, krátký popis, link `Detail třídy →`.
6. **Aktivity a život — „Zážitky, které si děti odnesou do školy“** — 3 sloupce s reálnou reportážní fotkou v hlavičce: Klub Předškoláček · Sport a příroda · Akce s rodiči.
7. **Aktuality** — 3 karty (Výlet do přírody · Nový kroužek Malý umělec · Den otevřených dveří) s badge (Akce/Novinky/Oznámení), pod nimi centrální CTA `Všechny aktuality →`.
8. **Před-patička (konverzní banner)** — široký zaoblený zelený blok: vlevo nadpis „Přijďte nás navštívit!“ + podtext, uprostřed ikona kalendáře + telefon, vpravo CTA `Kontaktovat nás →`.
9. **Footer** — stávající (lehká revize odkazů: Školka / Pro rodiče / Informace / Kontakt).

Navbar: logo MŠ + odkazy (O školce, Třídy, Pro rodiče, Aktuality, Kontakt) + primární CTA `Přihlásit dítě`. Sticky, na scrollu jemný backdrop blur.

## Interakce a motion

- Scroll-reveal: fade-in + 12–16 px zdola, stagger, ease-out 400–500 ms, jednou. Respektovat `prefers-reduced-motion`.
- Hover karet: jen `translateY(-1 až -2 px)` + měkčí stín. Žádné scale/bounce.
- CTA hover: posun šipky o pár px, plynulé podtržení / barva.
- Smooth scroll mezi sekcemi (id anchors: `o-skolce`, `tridy`, `vyhody`, `aktivity`, `aktuality`, `kontakt`).
- Viditelný keyboard focus všude.

## Technické provedení

- Refactor stávajících komponent v `src/components/`:
  - rewrite: `site-hero.tsx`, `site-benefits.tsx`, `site-classes.tsx`, `site-news-carousel.tsx`, `site-navbar.tsx`, `site-footer.tsx`
  - new: `site-quick-links.tsx` (rozcestník), `site-about.tsx`, `site-activities.tsx`, `site-cta-banner.tsx`
  - remove: `site-team.tsx` (nahrazeno Aktivitami)
- `src/routes/index.tsx`: nová skladba sekcí + meta zůstává.
- `src/styles.css`: doplnit/uvolnit brand tokeny (red/blue/green/yellow kostičky, soft tinted backgrounds, shadow tokens), zachovat existující paletu z `mem://design/brand-tokens`.
- Plně responzivní (mobile-first), konzistentní vertikální rytmus mezi sekcemi (`py-20 md:py-28`).
- Žádný hardcoded `bg-white`/`text-black` — všechno přes semantic tokens.

## Co plán NEpokrývá (zeptám se až po schválení / později)

- Reálné fotky: vygeneruji AI v premium kvalitě s konzistentním stylem (warm daylight, dokument-style, žádné generické stock). Pokud máte vlastní fotky, můžete je dodat místo nich.
- Podstránky (Detail třídy, Všechny aktuality, Kontakt) — homepage je první krok, podstránky případně v dalším kole.
