## Úpravy `/barevne-tridy`

1. **Odebrat tónované pozadí u sekcí tříd** — v `src/routes/barevne-tridy.tsx` odstranit `bgTint` z `ClassData` i z `<section style={{ backgroundColor: data.bgTint }}>`. Sekce budou na bílém pozadí.

2. **Poslední sekce (Žlutá) přechází do krémové** — po vzoru ostatních podstránek. Obalit poslední sekci + footer wrapper gradientem `linear-gradient(to bottom, #FFFFFF 0%, #FEF8E7 40%, #FEF8E7 100%)` (footer už tento gradient používá — sjednotit tak, aby přechod začínal ještě uvnitř poslední třídy).

3. **Nezávislé rozbalení vizitek učitelek** — nahradit `openIndex: number | null` sadou `openIds: Set<string>`. Klik na kartu přepíná její stav samostatně; může být rozbaleno libovolně mnoho karet zároveň.

4. **Karty se ve dvousloupcovém gridu neprotahují na výšku souseda** — přidat `items-start` na grid, aby zavřená karta zůstala kompaktní i když sousední rozbalená karta roste.
