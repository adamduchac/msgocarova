## Úpravy hero sekce

**1) Přidat 2 fotky do slideru (celkem 4)**
- Nahrát `user-uploads://hero_C.webp` a `hero_D.webp` přes `lovable-assets` → `src/assets/hero-kids-3.webp.asset.json`, `hero-kids-4.webp.asset.json`
- V `src/components/site-hero.tsx` rozšířit pole `SLIDES` o tyto 2 slidy s českými alt texty (pískoviště, malování prsty)

**2) Zrychlit slider na 4,5 s**
- V `site-hero.tsx`: interval `6000` → `4500` ms
- Animace přechodu (1400 ms fade/translate v `styles.css`) zůstává — bezpečně se vejde

**3) Zelená kostička k pravému okraji (vykukuje ze shape)**
- V `site-hero.tsx` cube B: `right-[15%]` → `right-[-3%]` (kostička je `position:absolute` v rodiči se shape maskou na child `<img>`, takže přesah ven funguje a část kostičky bude vykukovat)
- Velikost, vertikální pozice a animace beze změny

Nic jiného se nemění (textový blok, modrá kostička, animace).
