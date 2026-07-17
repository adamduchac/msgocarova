Cíl: Sekce Přihlášení na /predskolacek a Po přijetí na /zapis-do-skolky se mají stát součástí stejného obsahového bloku jako StatusBlock a třísloupcový grid — se stejnou mezerou jako mezi StatusBlockem a gridem (mt-8), nikoli jako samostatné sekce s větším spacingem.

Změny:

1. /predskolacek
   - Přesunout box "Přihlášení" dovnitř sekce s StatusBlock a 3 sloupci.
   - Box zůstane plná šířka, zachová žlutý podtón a stín jako nyní.
   - Mezera nad boxem bude mt-8 (stejná jako mezi StatusBlock a grid).
   - Odstranit samostatnou `<section className="section-y-md">` kolem Přihlášení.
   - Ponechat CTA sekci s polovičním spacingem (section-y-sm) a footer žlutý.

2. /zapis-do-skolky
   - Přesunout box "Po přijetí" dovnitř sekce s StatusBlock a 3 sloupci.
   - Box zůstane plná šířka, zachová žlutý podtón a stín jako nyní.
   - Mezera nad boxem bude mt-8 (stejná jako mezi StatusBlock a grid).
   - Odstranit samostatnou `<section className="section-y-md">` kolem Po přijetí.
   - Ponechat CTA sekci s polovičním spacingem (section-y-sm) a footer žlutý.

Očekávaný výsledek: Obě stránky budou mít H1 + úvod, a pod ním jeden kompaktní plný blok (status → 3 karty → plná šířka accent box) se sjednocenými mezerami, až pak následuje CTA a footer.