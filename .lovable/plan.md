
## 1) Mezera mezi poslední sekcí a footerem na podstránkách

Na HP je poslední sekce (`SiteActivities`) v `section-y` = `clamp(56px, 8vw, 112px)`, na `/kontakty` je poslední `section-y-sm` = `clamp(28px, 4vw, 56px)` → před footerem je viditelně menší mezera a kostička na footeru „sedí" blíž.

**Řešení:** nová utilita v `src/styles.css`:

```text
@utility pb-section {
  padding-bottom: clamp(56px, 8vw, 112px);
}
```

Aplikace v `src/routes/kontakty.tsx` na poslední sekci (Rejstřík) — přidat `pb-section` k `section-y-sm`. Stejný pattern použiju u všech budoucích podstránek (poslední sekce před footerem dostane `pb-section`).

## 2) Nahradit "Zážitky, které si děti odnáší" (`SiteNews`) medailonky učitelů

Nová komponenta `src/components/site-teachers.tsx`:

- **Box** ve stylu `SiteClasses`: `rounded-3xl border bg-background shadow-…`, uvnitř container s paddingem.
- **Eyebrow** „Náš tým" + **H2** „Lidé, kteří se o vaše děti starají" (finální wording potvrdíme, ale ne infantilní).
- **Slider** — 1 medailonek naráz, horizontální přechod (slide + crossfade, respektuje `prefers-reduced-motion`).
  - Layout medailonku: 2 sloupce — vlevo **foto** (rounded-2xl, aspect-[4/5] nebo 1:1), vpravo **text** (jméno + role + medailonek).
  - Na mobilu foto nahoře, text pod ní.
- **Ovládání:** šipky vlevo/vpravo (kruhové buttony), pod nimi tečkový indikátor. Klávesnice (←/→), swipe na mobilu, autoplay ~7 s s pauzou na hover/focus.
- **Data** (seed — 1 učitelka podle podkladů, ostatní jako placeholder pro pozdější doplnění):

```ts
{
  name: "Jana Tuharská",
  role: "Učitelka v Zelené kostičce",
  roleColor: "text-brand-green",
  photo: "@/assets/teacher-jana-tuharska.webp.asset.json",
  bio: "Jmenuji se Jana Tuharská a v této mateřské škole pracuji už 30 let. Zaměřuji se na rozvoj grafomotoriky a dovedností, které dětem usnadňují vstup do základní školy. Děti vedu ke kamarádství. Ráda s dětmi dělám legraci. Hraji na kytaru a baví mě s nimi zpívat i tancovat. Zaměřuji se také na pracovní činnosti a tvoření z různých materiálů, které podporují jejich zručnost a kreativitu. Ve volném čase ráda cestuji a mám vztah k přírodě a ke zvířatům."
}
```

- **Foto:** uploaded `Jana_Tuharská.webp` → `lovable-assets create` do `src/assets/teacher-jana-tuharska.webp.asset.json`.
- Design: šampionem je 1 medailonek, prostor vzdušný, jméno velké `font-display`, role menší barevný label třídy, text jako body.

## 3) Prohození pořadí na HP

V `src/routes/index.tsx` současné pořadí:
```
SiteNews → SiteActivities
```
Nové:
```
SiteActivities (Klub Předškoláček…) → SiteTeachers
```

`SiteNews` z HP odstraníme (import + použití). Soubor komponenty ponechám v repu pro případ pozdějšího návratu (nebo smazat — dej vědět).

## Soubory

- `src/styles.css` — nová utilita `pb-section`
- `src/routes/kontakty.tsx` — přidat `pb-section` k sekci Rejstřík
- `src/assets/teacher-jana-tuharska.webp.asset.json` — nový asset (upload z user-uploads)
- `src/components/site-teachers.tsx` — nová komponenta se sliderem
- `src/routes/index.tsx` — vyměnit `SiteNews` za `SiteTeachers`, prohodit pořadí
