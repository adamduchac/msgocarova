## Plán úprav

### 1. Footer — červená kostička
V `src/components/site-footer.tsx` posunout červenou kostičku o ~15 px níže (více schovanou pod horní okraj tmavé karty / footeru):
- Mobil: `bottom-[calc(100%-35px)]` (z původních -20px)
- Desktop (`sm:`): `bottom-[calc(100%-25px)]` (z původních -10px)

### 2. Footer — žlutá kostička (desktop only)
V `src/components/site-footer.tsx` posunout žlutou kostičku pryč z footeru:
- `sm:bottom-[-30px]` (z -10px) — o 20px níže
- `sm:right-[-30px]` (z -10px) — o 20px doprava
- Mobil zůstává skrytá (`hidden`)

### 3. Favicon
- Nahrát `user-uploads://FAV_msgocarova.png` jako Lovable Asset (`lovable-assets create`)
- Zapsat nový `.asset.json` pointer do `src/assets/favicon-cube.png.asset.json`
- V `src/routes/__root.tsx` aktualizovat import `faviconAsset` — bude se načítat ze stejné cesty, takže stačí přepsat pointer soubor
- (Případně pokud bude potřeba jiné rozlišení nebo formát, vygenerovat variantu ~180–512 px)

---

**Technické poznámky:** Žádné nové závislosti, žádné schema změny. Build by měl projít okamžitě po úpravě CSS tříd a přepsání asset pointeru.