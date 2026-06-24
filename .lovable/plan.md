## 1. Footer — prohození sloupců

V `src/components/site-footer.tsx` přehodit pořadí sloupců v gridu:
**Vedení školky → Kontakt → Jednotlivé třídy** (tj. velký mail/telefon vlevo, adresa uprostřed, třídy vpravo).

## 2. Sub-footer (copyright bar)

Místo aktuálního rozdělení (text vlevo, ADDU odkaz vpravo) jeden centrovaný řádek s pipe separátory:

`© 2026 MŠ Josefa Gočára. Všechna práva vyhrazena. | Používáme pouze technické cookies | Design a realizace ADDU.cz`

„ADDU.cz" zůstane jako odkaz (`target="_blank"`, `rel="noopener noreferrer"`) na https://www.addu.cz. Na mobilu se text zalomí přirozeně; na desktopu jeden řádek.

## 3. Menu — větší mezery mezi položkami (desktop)

V `src/components/site-navbar.tsx` u desktopové navigace zvětšit mezeru mezi top-level položkami:
- `<nav className="hidden items-center gap-9 lg:flex">` → `gap-9 xl:gap-12` (na lg ponecháme `gap-9`, na xl+ `gap-12`).
- Mezera mezi nav blokem a CTA „Naše školka": vnější `gap-8` → `gap-8 xl:gap-10`.

Mobilní menu beze změny.

## 4. Krémové pozadí za menu (top stránky)

Navbar je `sticky` s průhledným paddingem nad ním (`px-6 pt-3 sm:pt-4`) — pod ním prosvítá bílé pozadí stránky. Přidám za navbar (resp. nad něj a po jeho stranách v rámci sticky paddingu) krémový (`bg-offwhite`) tón, aby horní pruh stránky ladil se zbytkem brandu:

- V `src/routes/__root.tsx` (nebo v layoutu kde se body renderuje) změnit globální `background` celé stránky na `bg-offwhite` **pouze pro horní zónu** — nejjednodušší: dát `body`/wrapper `bg-offwhite` a sekce, které mají být bílé, ponechat s `bg-background`. Aby to bylo cílené, navrhuji menší krok:
  - Obalit navbar do divu s `bg-offwhite` (rozšířeným přes celou šíři) tak, aby krémová byla viditelná v pruhu nad/za navbar boxem a hladce navazovala na hero (které už má jiný podklad).

Pokud preferuješ globálně krémové pozadí celé stránky (a sekce si pozadí řeší samy), řekni — udělám to v jednom kroku v `src/styles.css` (`body { background: var(--offwhite) }`).

## 5. Sekce „Barevné kostičky" — vrátit box

V `src/components/site-classes.tsx` vrátit vnější box ve stylu rychlých rozcestníků (linka + jemný stín), ale na **šířku normálních sekcí** (tj. uvnitř `container`, bez vlastního `max-w-6xl`):

```tsx
<div className="container mx-auto px-6">
  <div className="rounded-3xl border border-white/60 bg-background shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)] px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
    {/* eyebrow + nadpis + ilustrace + 4×1 grid */}
  </div>
</div>
```

Vnitřní padding: `px-6 py-12` na mobilu, `md:px-12 md:py-16`, `lg:px-16 lg:py-20` — vzdušné, sedí k velikosti ilustrace a 4 karet.

---

## Drobná otázka k bodu 4

Krémové pozadí má být:
- **(a)** pouze v horním pruhu za menu (cca do konce hero), nebo
- **(b)** globálně přes celou stránku (a bílé jen tam, kde je to potřeba)?

Pokud neodpovíš, jdu cestou **(a)** — bezpečnější, nezasahuje do ostatních sekcí.
