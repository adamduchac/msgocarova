Cíl: Na podstránce `/barevne-tridy` skrýt žlutou dekorativní kostičku v patičce (dolní pravý roh), zatímco horní červená kostička zůstane.

Technické řešení:
- Komponenta `SiteFooter` v `src/components/site-footer.tsx` vykresluje žlutou kostičku jako `bottomCube` na základě prop `showBottomCube` (default `true`).
- V `src/routes/barevne-tridy.tsx` je patička volána s `topCubeColor="red" topCubePosition="right"`.
- Stačí přidat prop `showBottomCube={false}`, aby se žlutá kostička na této stránce nezobrazila.

Změněné soubory:
- `src/routes/barevne-tridy.tsx` — přidání `showBottomCube={false}` do volání `SiteFooter`.

Žádné další vizuální ani strukturální změny nejsou potřeba.