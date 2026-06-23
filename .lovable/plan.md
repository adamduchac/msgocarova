Sjednotit šířku hero se zbytkem stránky.

Technické řešení:
- V souboru `src/components/site-hero.tsx` změnit vnější obal z:
  `mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-5 lg:gap-14 lg:px-10`
  na:
  `container mx-auto grid items-center gap-10 px-6 lg:grid-cols-5 lg:gap-14`

Důvod: ostatní sekce (`SiteBenefits`, `SiteClasses`, `SiteTeam`, `SiteNewsCarousel`, `SiteFooter`) používají třídu `container mx-auto px-6`. Hero je nyní uzavřena v `max-w-7xl` s paddingem `lg:px-10`, což ji činí užší. Sjednocením kontejneru a paddingu bude hero vizuálně stejně široká jako okolní sekce.

Změna je čistě prezentační, nezasahuje do funkcionality ani rout. Po úpravě proběhne kontrola buildu.