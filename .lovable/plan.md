## Sekce „Proč k nám" — úpravy

**1. Odebrat header**
V `src/components/site-benefits.tsx` smažu celý blok s eyebrow „Proč k nám" + nadpisem „Proč si nás rodiče vybírají?" (řádky 58–65).

**2. Sjednotit mezery (gap = vertikální rytmus sekce)**
Mezera mezi sekcí news a touto sekcí je dána `section-y` paddingem (`clamp(56px, 8vw, 112px)`). Aby gap mezi kartami v 2×2 gridu byl stejný, změním:
- `grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8` → `grid grid-cols-1 md:grid-cols-2`
- přidám inline `style={{ gap: "clamp(56px, 8vw, 112px)" }}`

**3. Karty — bílé pozadí, barevný jen obrázek**
- Karta: nahradit `${b.tint}` za `bg-background`, ponechat border, radius a stín.
- Obrázkový rámeček: nahradit `bg-white` za `${b.tint}` (barevný čtverec za ilustrací).

**4. Výměna ilustrací**
Nahraju 4 nové asset pointery a přepíšu importy v `site-benefits.tsx`:
- `vyhoda1` → `zahrada.webp` (zahrada/hřiště) — mint
- `vyhoda2` → `robot.webp` (robot s vlajkou) — sky
- `vyhoda3` → `komunikace.webp` (bublina se smajlíkem) — cream (zde sundám `flip: true`, ilustrace má smysluplnou orientaci)
- `vyhoda4` → `srdce.webp` (srdce) — blush

Asset CLI:
```
lovable-assets create --file /mnt/user-uploads/zahrada.webp --filename vyhoda-zahrada.webp > src/assets/vyhoda-zahrada.webp.asset.json
# stejně pro robot/komunikace/srdce
```
Staré `vyhoda1–4.webp.asset.json` smažu přes `delete_asset`.

**5. Pozadí sekce — jemně zelené místo modré (offwhite)**
V brand paletě je `--brand-green: #3DA35D` a za hero je krémová `#FEF1D0` (news-pinned). Sjednotím tón — vytvořím jemný zelený gradient kompatibilní s krémovou:
- definuju nový token `--mint-soft: #EAF5EC` (světle zelený, sytě sladěný s mint kartou).
- styl sekce: `linear-gradient(to bottom, #ffffff 0%, #ffffff 10%, var(--mint-soft) 55%, var(--mint-soft) 100%)`.

Soubory:
- `src/components/site-benefits.tsx`
- `src/styles.css` (přidat `--mint-soft` token)
- `src/assets/` (nové asset pointery + delete starých)

Žádné nové npm balíčky.