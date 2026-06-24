## Modrá kostička jako favicon

### 1. Vygenerovat čtvercový favicon
- Použít `imagegen--edit_image` se zdrojem `src/assets/cube-blue.png.asset.json` (URL).
- Prompt: "Center the blue clay cube character with the big white eyes and smiling mouth in the middle of the frame, square 1:1 composition, transparent background, generous padding around the cube so the whole shape is visible at small sizes."
- `transparent_background: true`, `aspect_ratio: 1:1`, target `src/assets/favicon-cube.png` (PNG kvůli průhlednosti).
- Nahrát do CDN přes `lovable-assets create`, výstup do `src/assets/favicon-cube.png.asset.json`. Lokální `favicon-cube.png` poté smazat.

### 2. Zapojit do `src/routes/__root.tsx`
V `links` (kolem řádku 93–104) přidat:
```tsx
{ rel: "icon", type: "image/png", sizes: "any", href: favicon.url },
{ rel: "apple-touch-icon", href: favicon.url },
{ rel: "shortcut icon", href: favicon.url },
```
Importovat: `import favicon from "@/assets/favicon-cube.png.asset.json";`

### 3. Co zůstává beze změny
- `og:image` a `twitter:image` (velké share previews 1200×630) — uživatel mluvil o malém náhledu (favicon / záložka). Nezasahujeme.
- Loga uvnitř webu (`src/assets/logo.svg`) zůstávají.

### 4. Poznámka uživateli
Prohlížeč si favicon agresivně cachuje — po deployi může být potřeba hard reload, aby se nová ikona projevila v záložce.