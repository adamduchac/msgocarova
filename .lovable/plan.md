Cíl: Zajistit, aby všechny výskyty jmen učitelek a učitelů na webu používaly stejné tituly jako na úvodní stránce v boxech jednotlivých tříd pod sekci „Barevné kostičky“.

Výchozí stav (zjištěno z kódu):
- HP boxy (`src/components/site-classes.tsx`) uvádějí tyto tituly:
  - Červená kostička: Mgr. Nikola Šorfová, Mgr. Jitka Kouklíková, Hana Hloušková
  - Zelená kostička: Jana Tuharská, Kristýna Vaňátková, DiS.
  - Modrá kostička: Bc. Veronika Kremláčková, Elena Špicarová
  - Žlutá kostička: Magdaléna Sováková, Milena Svobodová, DiS.

Soubory ke kontrole a případné úpravě:
1. `src/components/site-classes.tsx` — zdrojový kanonický seznam, ověřit správnost.
2. `src/routes/barevne-tridy.tsx` — jména učitelek v jednotlivých třídách; srovnat s HP boxy.
3. `src/routes/kontakty.tsx` — rejstřík tříd s učitelkami; srovnat s HP boxy.
4. `src/components/site-teachers.tsx` — carousel „Náš tým“ na úvodní stránce; srovnat jména a tituly s HP boxy.
5. `src/data/team.ts` — datový zdroj pro týmovou sekci na stránce „O školce“; srovnat s HP boxy.

Technické provedení:
- Pro každý soubor projít všechny řetězce obsahující jména učitelek/učitelů.
- Doplnit nebo opravit tituly tak, aby odpovídaly kanonickému seznamu z HP boxů.
- Udržet stávající formátování a `fixPrepositions()` tam, kde je použito.
- Po úpravách spustit build (`bun run build`) a ověřit, že nedošlo k chybám.

Očekávaný výsledek:
- Na všech dotčených stránkách budou jména pedagogického týmu uváděna jednotně včetně titulů podle vzoru z HP boxů.