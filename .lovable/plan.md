## Cíl
Přidat 4 ručně kreslené doodles kolem nadpisu sekce výhod ve 4 brand barvách (tónované — mint/sky/cream/blush stejné jako pozadí karet). Doodles žijí v dekorační vrstvě sekce, nikdy nepřekrývají text/nadpis, mohou jemně přesahovat za karty.

## Výběr 4 doodles (z 10 nahraných)
1. **Datový_zdroj_31** (srdce) — vlevo nahoře nad gridem, barva **blush/coral**
2. **Datový_zdroj_32** (hvězda/sparkle) — vpravo od nadpisu, barva **cream/yellow**
3. **Datový_zdroj_36** (fajfka/blesk) — vlevo od nadpisu, barva **mint/green**
4. **Datový_zdroj_40** (klikatá šipka) — vpravo nahoře nad gridem, barva **sky/blue**

(Pokud bude vypadat řídce, přidám jako 5. **Datový_zdroj_35** vlny dole pod nadpisem uprostřed v sky.)

## Rozmístění (desktop)
```
        [36 mint]                      [32 cream]
                 ┌─ NADPIS ─┐
   [31 blush]                          [40 sky]
   ┌─────────────┐   ┌─────────────┐
   │   karta 1   │   │   karta 2   │
   └─────────────┘   └─────────────┘
   ┌─────────────┐   ┌─────────────┐
   │   karta 3   │   │   karta 4   │
   └─────────────┘   └─────────────┘
```
- Doodles `position: absolute` v sekci (která dostane `relative overflow-hidden`).
- Pozice v `%` vůči container — drží se v horní třetině sekce (nad gridem + lehce po stranách prvního řádku karet), aby přesahy šly **za karty**, ne přes text.
- `z-index`: doodles `0`, karty/nadpis `10`, sekce `relative`.
- Velikost: ~clamp(72px, 9vw, 140px). Opacity 0.55–0.7.
- Rotace mírná (-12° až +14°) pro živost.

## Mobil
Skrýt 2 ze 4 (`hidden sm:block`), zbylé zmenšit na ~64px a posunout blíž k okrajům, aby nezmačkaly nadpis.

## Implementace
1. **Asseti**: nahrát 4 vybrané SVG jako `src/assets/doodle-{srdce,hvezda,fajfka,sipka}.svg.asset.json` přes `lovable-assets create`.
2. **Komponenta `src/components/site-benefits.tsx`**:
   - `<section>` dostane `relative overflow-hidden`.
   - Přidat `<div className="pointer-events-none absolute inset-0 z-0">` s 4× `<img>` doodle, každý absolutně pozicovaný, s inline `style` (top/left/right v %, rotate, width clamp, opacity, `filter` pro obarvení).
   - Container nadpisu/gridu dostane `relative z-10`.
3. **Obarvení**: SVG mají `fill:#1d1d1b`. Obarvíme přes CSS `filter` (drop-shadow trik je špatný) → lepší cesta: použít `mask-image: url(...)` + `background-color: var(--coral)` na `<span>` blocích, takže každá barva je čistě brand token. Tím držíme semantické barvy a nepoužíváme hardcoded hex.

## Mimo scope
- Žádné změny v ostatních sekcích, žádná animace doodles (respekt `prefers-reduced-motion` automaticky, protože jsou statické).
- Hover efekty nepřidávám.

Po schválení rovnou implementuji a pošlu screenshot pro kontrolu rozmístění.