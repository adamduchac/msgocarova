## Cíl
Při otevření/zavření modalu TOP zpráv (klik na box na HP) přidat jednoduchý, k webu ladící fade-in / fade-out přechod.

## Změny
Soubor: `src/components/site-announcements.tsx` — komponenta `AnnouncementModal` + její použití v `SiteAnnouncements`.

1. Řídit viditelnost lokálním stavem `visible` (mount/unmount kontrola):
   - Otevření: mount → další frame nastaví `visible = true` (spustí fade-in).
   - Zavření: `visible = false`, po ~200 ms zavolat `onClose` (unmount).
2. Použít Tailwind třídy `transition-opacity duration-200 ease-out` + `opacity-0` / `opacity-100` na:
   - backdrop (`bg-cream/95 backdrop-blur-sm`)
   - vnitřní panel (`rounded-2xl bg-white ...`) — kombinace opacity + jemné `translate-y-1` → `translate-y-0` pro decentní pocit.
3. `respect prefers-reduced-motion`: když je zapnuto, přechod přeskočit (bez trvání) — v souladu s core pravidly projektu.
4. `Escape` a klik na backdrop zavolají "měkké zavření" (fade-out, pak unmount) místo přímého `onClose`.

## Co se nemění
- Žádné hover scale efekty.
- Žádná změna obsahu, layoutu, API, dat nebo dalších komponent.
- Trvání 200 ms drží konzistenci s ostatními mikrointerakcemi.
