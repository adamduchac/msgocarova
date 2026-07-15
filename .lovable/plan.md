## Cíl
Sjednotit vizuální styl 3 karet v sekci **Zážitky** (SiteActivities) s kartami jednotlivých tříd výše (SiteClasses) — konkrétně přidat stejný border a stín.

## Současný stav
- **Karty tříd** (`SiteClasses`): `rounded-3xl border border-border/70 bg-background p-5 pb-16 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)]`
- **Karty zážitků** (`SiteActivities`): `rounded-2xl bg-card` — bez borderu a bez explicitního stínu

## Úprava
V `src/components/site-activities.tsx` doplnit na každý `<article>` v gridu:
- `border border-border/70`
- `shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)]`

Ponechat stávající `rounded-2xl` a `bg-card` (projektová pravidla karet rounded-2xl). `card-hover` zůstává zachováno pro hover efekt.

## Soubor
- `src/components/site-activities.tsx` — úprava tříd u 3 karet v gridu

## Ověření
- Vizuální kontrola: karty v sekci Zážitky budou mít stejný jemný border a stín jako karty tříd.
- TypeScript build projde bez chyby.