## Cíl

Kompaktnější layout obou stránek: status + hlavní 3sloupcový grid jako jedna sekce, samostatný spodní box pod tím, poloviční mezera před CTA.

## Šířky

Mimo H1/perex zůstává **vše na plnou šířku kontejneru** — odstranit `max-w-4xl` u status bloku, gridu, spodního infoboxu i CTA nadpisu na obou stránkách.

## Rozestupy

- Status blok a hlavní grid = **jedna sekce** s malou mezerou (např. jeden wrapper se `section-y-md`, uvnitř status + `mt-6`/`mt-8` grid). Odstranit samostatnou sekci pro status.
- Mezi hlavní gridem a samostatným spodním boxem: normální `section-y-md`.
- Mezi spodním boxem a CTA „Máte dotaz": **poloviční** — `section-y-sm` (dnes `section-y-md`).

## /predskolacek — obsah gridu

3 sloupce (`md:grid-cols-3`), stejný styl karet jako dnes:
1. Jak Předškoláček probíhá (beze změny)
2. Na co se zaměřujeme (beze změny)
3. **Co si přinést** — přesunout ze spodního infoboxu, přepsat jako checklist se stejnými zelenými odrážkami:
   - trojhranná tužka (silnější)
   - pastelky
   - ořezávátko
   - desky na úkoly
   - 30 kancelářských papírů
   
   Ikona: `Backpack` (lucide), stejný tón jako sousední zelený box (nebo červený — sladit s brand-red hero).

Samostatně níže, na plnou šířku (bez `md:grid-cols-2`): **Přihlášení** — stávající text jako jeden nadpis + odstavec.

## /zapis-do-skolky — obsah gridu

3 sloupce (`md:grid-cols-3`):
1. Jak zápis probíhá (beze změny)
2. Co si k zápisu připravit (beze změny)
3. **Prázdninový provoz (červenec–srpen)** — přesunout ze spodního infoboxu, ponechat jako odstavec (ne checklist), zachovat odkaz „Pravidla přijímání".
   
   Ikona: `Sun` nebo `CalendarDays` (lucide).

Samostatně níže, na plnou šířku: **Po přijetí** — stávající text.

## Technické poznámky

- Grid: `grid gap-6 md:grid-cols-3` bez `max-w-4xl`; kontejner `container mx-auto px-6` zůstává.
- Nový 3. sloupec = kopie stávající `article` karty (bílá, `rounded-2xl`, kruhová ikonka, stín).
- Samostatný spodní box zachovává styl `bg-[#FEF8E7]/60` kartu, ale bez `md:grid-cols-2` (jeden nadpis + jeden odstavec).
- CTA sekce: uvnitř odstranit `max-w-4xl`, tlačítka zůstávají.

Beze změn: hero, gradienty, footer, texty (mimo výše uvedené přesuny).
