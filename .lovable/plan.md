## Cíl
Ponechat současný obsah adminu (Top zprávy, Zaměstnanci, Dokumenty, Předškoláček, Zápis) a graficky ho sladit s frontendem webu.

## Změny

**1. Layout `src/routes/admin.tsx`**
- Pozadí hlavní plochy: jemný vertikální gradient ze skorobílé do krémové (stejný `cream` token jako na webu), místo současné ploché barvy.
- Levý sidebar: tmavé pozadí ve stylu footeru (tmavý ink token), světlý text, aktivní položka jemně zvýrazněná (světlejší overlay + levý akcentní proužek v barvě primární).
- Logo / hlavička sidebaru sladěná s footerem (stejný font, stejné odsazení).
- Sign-out button přebarvený pro tmavé pozadí.

**2. Karty a nadpisy uvnitř modulů**
- Sjednotit `rounded-2xl`, jemný stín (`shadow-[0_2px_10px_rgba(0,0,0,0.03)]`) a `border-black/5` — už z větší části je, jen doladit tam, kde chybí (`AdminHeader`, editor modály).
- Nadpisy sekcí (`AdminHeader`) používat display font jako na webu.

**3. Bez zásahu do funkčnosti**
- Žádné změny v CRUD logice, DB, RLS ani ve veřejných stránkách.
- Placeholder stránky (Dashboard `/admin`) zůstává, jen se přebarví do nového stylu.

## Technické detaily
- Barvy brát z existujících tokenů v `src/styles.css` (`--cream`, `--ink`, `--primary`), nezavádět nové.
- Sidebar: `bg-ink text-cream/90`, aktivní `bg-white/[0.06]` + `border-l-2 border-brand-yellow` (nebo jiný akcent z footeru — sladím podle footeru).
- Main: `bg-gradient-to-b from-white to-cream`.
