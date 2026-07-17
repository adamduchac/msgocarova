## Cíl
Nahradit placeholdery fotek na `/vzdelavani-a-rozvoj` skutečnými fotkami dodanými uživatelem.

## Mapování fotek na sekce

| Sekce (id) | Fotka |
|---|---|
| `jazyk` — Jazyk a komunikace | `anglictina.webp` (děti s maňásky) |
| `priprava-a-technologie` — Příprava na školu a moderní technologie | `robot-2.webp` (děti s Bee-Bot robotem) |
| `plavani` — Plavecká výuka | `plavani.webp` |
| `skola-v-prirode` — Škola v přírodě | `skolavprirode.webp` |
| `lyzarsky-kurz` — Lyžařský kurz | `lyze.webp` |

## Kroky

1. **Nahrát 5 fotek jako Lovable assety** do `src/assets/vzdelavani/`:
   - `anglictina.webp.asset.json`
   - `robot-2.webp.asset.json`
   - `plavani.webp.asset.json`
   - `skolavprirode.webp.asset.json`
   - `lyze.webp.asset.json`

2. **`src/routes/vzdelavani-a-rozvoj.tsx`**
   - Rozšířit typ `Area` o pole `image` (url) + `imageAlt`.
   - Naplnit `image`/`imageAlt` u všech pěti oblastí (české alt texty).
   - Upravit `AreaPhoto` — pokud má oblast `image`, renderovat `<img>` s `object-cover` v poměru 4:5 (`aspect-[4/5]`) resp. tom, který dostane komponenta; jinak zachovat stávající barevný placeholder (fallback).
   - Zachovat `rounded-2xl`, `border-border/60` a odstranit vnitřní label „Foto brzy doplníme" v případě, že je fotka k dispozici.

## Co se nemění
- Struktura stránky (2+2+1 grid), texty, ikony, hover chování, spacing, navigace, ostatní stránky.
