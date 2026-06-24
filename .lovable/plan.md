## Provedené šetření
Navbar technicky zůstává na vrcholu stránky (`sticky top-0` funguje správně). Problém je vizuální — na bílém pozadí se skleněný efekt `bg-background/80` + `backdrop-blur-lg` téměř ztrácí, protože působí, že menu „mizí“.

## Plán úprav

### 1. Změnit gradient hero nadpisu
**Soubor:** `src/components/site-hero.tsx`
- Upravit `backgroundImage` uvnitř H1 gradient span na:  
  `linear-gradient(105deg, #2563EB 0%, #38BDF8 100%)`

### 2. Zvýšit viditelnost navbaru na bílém pozadí
**Soubor:** `src/components/site-navbar.tsx`
- Změnit vnitřní wrapper z `bg-background/80` na `bg-background/95` (nebo plné `bg-background`), aby menu bylo viditelné i nad bílými sekcemi.
- Ponechat `backdrop-blur-lg` pro jemný efekt.
- Ponechat `sticky top-0 z-50` a všechny ostatní styly beze změny.

---

Žádné nové závislosti. Žádné změny struktury stránky. Pouze drobné úpravy hodnot v CSS/JSX.