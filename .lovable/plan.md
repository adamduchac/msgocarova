Cílem je odstranit sekci/odstavec o barevných kostičkách ze stránky /o-skolce a použít tento text jako první odstavec pod H1 na stránce /barevne-tridy.

Nalezený stav:
- Na stránce `/o-skolce` (řádky ~205–217) je pod nadpisem „Školka, kde má hra a přirozený rozvoj hlavní slovo“ odstavec:
  `„Naše třídy nesou názvy barevných kostiček — symbolu dětské hry, té nejpřirozenější a nejdůležitější činnosti předškoláka. Cílem je podnětné prostředí plné hraček a zajímavých aktivit, kam se děti každý den těší.“`
- Na stránce `/barevne-tridy` (řádky ~393–400) je pod H1 „Barevné třídy“ aktuálně kratší odstavec:
  `„Naše třídy nesou názvy barevných kostiček — symbolu dětské hry. Poznejte je jednu po druhé.“`

Plán úpravy:
1. V souboru `src/routes/o-skolce.tsx` odstranit odstavec o barevných kostičkách (řádky 208–212) a případně upravit vertikální mezery, aby zbylý obsah plynule navazoval.
2. V souboru `src/routes/barevne-tridy.tsx` nahradit aktuální text pod H1 plnějším textem z `/o-skolce`, zabaleným do `fixPrepositions` pro správné předložky.
3. Ověřit v náhledu, že stránka `/o-skolce` nemá chybějící obsah ani rušivou mezeru a stránka `/barevne-tridy` má nový úvodní odstavec hned pod hlavním nadpisem.