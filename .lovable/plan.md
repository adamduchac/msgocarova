## 1. Krémová zóna pokračující za footer

- V `src/routes/index.tsx` zabal `<SiteActivities />` + `<SiteFooter />` do společného wrapperu s krémovou (cream pokračuje plynule i pod footerem):
  ```
  <div style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)" }}>
    <SiteActivities />
    <SiteFooter />
  </div>
  ```
- V `src/components/site-activities.tsx` odstranit vlastní inline `background` (gradient řeší rodič) — sekce bude transparentní, aby na ní seděl společný gradient bílá → krémová (cca stejný odstín jako hero `#FEF8E7`).
- `SiteFooter` zůstává — vnější `<footer>` přepnu z `bg-background` na `bg-transparent`, aby krémová prosvítala; tmavý box uvnitř (`bg-ink`) zůstává.

## 2. Červená kostička vykukující zpoza footeru

- V `SiteFooter` přidat `relative` na vnější `<footer>` a vložit dekorativní `<img>` s `src = cube-red.png` (existuje v `src/assets/`).
- Pozicování: `absolute`, vlevo (cca `left-[4%]` nebo `left-[6%]`), vertikálně tak, aby horní polovina kostky koukala nad horní hranu tmavého boxu a spodní část mizela za boxem (`z-0`, tmavý box je `relative z-10`).
- Velikost odpovídá modré hero kostce: `w-[6.3rem] sm:w-[7.35rem] lg:w-[10.5rem]`.
- `aria-hidden`, `pointer-events-none`, lazy loading.
- Žádný hover scale (dle core), jen volitelně jemný floating efekt v souladu s hero kostkami — pro jednoduchost teď statická (nebo reuse existující `.hero-cube-wrap` animace, pokud je dostupná globálně; jinak statická).

## 3. Žlutá kostička vpravo dole ve footeru

- Druhý dekorativní `<img>` se `src = cube-yellow.png` uvnitř tmavého boxu (`bg-ink`), který bude `relative overflow-hidden`.
- Pozicování: `absolute bottom-0 right-0` s mírným posunem (např. `right-[-1.5rem] bottom-[-1rem]`), aby seděla v rohu boxu a část mohla přesahovat za hranu.
- Velikost menší než červená — cca `w-[5rem] sm:w-[6rem] lg:w-[7.5rem]` (aby nepřebíjela obsah patičky).
- `aria-hidden`, `pointer-events-none`, `z-0`; obsah footeru zvednu na `relative z-10`.

## 4. Záměna zelených gradientů uprostřed stránky za světlou brandovou modrou

- Cílem je nahradit zelený mint v sekcích, kde gradient přechází bílá → mint a mint → bílá, jemnou brandovou modrou laděnou na krémovou.
- Soubor `src/styles.css` — přidat nový token `--blue-soft` (analogie k `--mint-soft`), např. `#E3EEFB` (světlá, tlumená verze brandové modré `#2563EB`, optický soulad s krémovou `#FEF8E7`).
- `src/components/site-benefits.tsx` ř. 57: nahradit `var(--mint-soft)` za `var(--blue-soft)` v obou stopech.
- `src/components/site-daily-rhythm.tsx` ř. 78: stejná náhrada `var(--mint-soft)` → `var(--blue-soft)`.
- Žádné jiné použití `--mint-soft` nebo zelených ploch se nemění (zelené akcenty, dot v Classes apod. zůstávají).

## Co se NEMĚNÍ

- Sekce Activities sama (kromě odstranění vlastního gradientu) — eyebrow, nadpis, hover „Číst dále" zůstávají.
- Tmavý box footeru, jeho obsah, sloupce.
- Hero gradient, hero kostky.
- Žádné nové komponenty ani routy.

## Technické poznámky

- Cube assety: `cube-red.png.asset.json` a `cube-yellow.png.asset.json` už existují, jen je naimportovat.
- Pořadí stackingu ve footeru: footer wrapper `relative` (z červené `z-0`), tmavý box `relative z-10 overflow-hidden` (kvůli ořezu žluté), uvnitř žlutá `absolute z-0` a obsah `relative z-10`. Tím červená kouká za boxem a žlutá sedí v rohu uvnitř.
