Na stránce `/o-skolce` je mezi sekcí Školní jídelna a footerem viditelný přechod, protože footer je obalený divem s gradientem, který začíná jinou barvou, než kterou sekce jídelny končí.

Nalezený stav:
- Sekce Školní jídelna: `background: linear-gradient(to bottom, #FDFAF6 0%, #FEF8E7 100%)` — končí na `#FEF8E7`.
- Wrapper kolem `<SiteFooter>` na `/o-skolce`: `background: linear-gradient(to bottom, #FDFAF6 0%, #FEF8E7 40%, #FEF8E7 100%)` — začíná na `#FDFAF6`, takže vzniká barevný krok na hranici sekcí.

Plán úpravy:
1. V souboru `src/routes/o-skolce.tsx` změnit pozadí wrapperu kolem footeru tak, aby začínalo i končilo na `#FEF8E7` — tedy jednolitá barva nebo gradient `#FEF8E7` → `#FEF8E7`.
2. Ponechat gradient sekce Školní jídelna beze změny, protože už končí na `#FEF8E7` a bude tak navazovat na footer bez viditelného přechodu.
3. Ověřit v náhledu, že hranice mezi jídelnou a footerem zmizela a horní modrá kostička footeru zůstává na původní pozici.