## Cíl
Na `/barevne-tridy` obalit každou třídu do jednoho velkého bílého boxu (rounded-2xl, jemný border a měkký stín). Vzniknou 4 boxy — Červená, Zelená, Modrá, Žlutá. Vnější obal se roztahuje do plné šířky sekce (stejná šířka jako boxy tříd na homepage), ne jen do úzkého `max-w-5xl`.

## Změny v `src/routes/barevne-tridy.tsx` (`ClassSection`)

1. **Vnější obal třídy** — box obklopuje celý obsah třídy a jde do plné šířky kontejneru (stejný rytmus jako boxy tříd na HP):
   - `rounded-2xl border border-border/60 bg-background`
   - jemný stín `shadow-[0_10px_30px_-20px_rgba(15,23,42,0.18)]`
   - vnitřní padding `p-6 md:p-10`
   - box umístit přímo do `container mx-auto px-6` (odstranit stávající `mx-auto max-w-5xl` wrapper), aby šířka odpovídala HP kartám

2. **Hero ilustrace bez rámečku** — z hero fota odstranit `border`, `rounded-2xl` i `overflow-hidden`; obrázek leží přímo na bílém pozadí boxu (`aspect-[16/10] w-full object-cover`, bez zaobleného rámu).

3. **Věková značka „X–X let" — inverzní** — místo bílého pillu s barevným textem: plné barevné pozadí v barvě třídy, text bílý, bez borderu. Doplnit do `ClassData`:
   - `bgColor`: `bg-brand-red / bg-brand-green / bg-brand-blue / bg-brand-yellow`
   - `pillText`: `text-white` (u žluté `text-ink` kvůli kontrastu)

4. **Vertikální rytmus** — sekce si ponechají `section-y-sm`; poslední sekce si ponechá gradient do žluté na pozadí, box zůstane bílý navrchu.

5. **Karty učitelek** uvnitř zůstávají beze změny; po náhledu případně jemně snížit stín, aby se nebily s vnějším boxem.

## Co se nemění
- Data, telefony, medailonky, chování rozbalování učitelek.
- Header, footer, hash navigace `#cervena / #zelena / #modra / #zluta`.

## Ověření
- `bun run build`
- Playwright screenshot `/barevne-tridy` (desktop 1280 a mobile 390) — 4 boxy plné šířky sekce, hero foto bez rámečku, barevné pilulky.
