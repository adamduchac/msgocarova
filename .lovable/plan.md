## Co se děje
Karty v sekci „Jeden den v MŠ Josefa Gočára" mají scroll-reveal (`.reveal-up`) se stagger `i * 70ms`. Aktuální nastavení ale sekci na desktopu spouští, až když už je 8 % v obrazu — přechod tak působí jako skok, protože jsou karty v momentě odhalení už (skoro) na svém místě a stagger je zároveň příliš rychlý (70 ms × malá amplituda 22 px, 600 ms trvání).

## Změny (jen CSS/tokeny, žádná logika)

### `src/styles.css`
1. **Předsunout trigger** — aby karty začaly animovat dřív, než se dostanou do zorného pole:
   - v `useRevealOnScroll` je `rootMargin: "0px 0px -8% 0px"` — necháme, ALE
   - přidáme delší úvodní offset amplitudy: `.reveal-up { transform: translate3d(0, 32px, 0); }` (z 22 px).
2. **Plynulejší křivka + delší trvání** pro reveal:
   - `transition-duration: 720ms` (z 600 ms)
   - ponechat `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out)
3. **Jemný opacity fade i pro polaroidy s tiltem** — když `<li>` fade-innuje, article už má finální `rotate + translateY` tilt, takže žádný konflikt.

### `src/components/site-daily-rhythm.tsx`
1. **Zvětšit stagger mezi kartami** ze `70ms` na `110ms` — tím vznikne zřetelnější, plynulejší „vlnkový" nástup místo skoku.
2. **Volitelně** přidat `--reveal-delay` i podle řady (na `lg` grid 5×2): druhá řada startuje `+150 ms` po první — vytvoří kaskádu shora dolů.

## Technicky
```css
/* styles.css */
:where(.reveal-up, .reveal-right, .reveal-fade, .reveal-scale) {
  transition-duration: 720ms; /* z 600ms */
}
.reveal-up { transform: translate3d(0, 32px, 0); } /* z 22px */
```

```tsx
// site-daily-rhythm.tsx — v <li> style
["--reveal-delay" as string]: `${i * 110}ms`, // z 70
```

Mobile media query (`max-width: 767px`) která karty rovnou zobrazuje bez animace zůstává — na mobilu jsou karty horizontálně mimo viewport, IO by fungoval blbě.

## Otevřená otázka
Chceš i lehký scale-in efekt (0.96 → 1) navrch, nebo jen fade + posun? Default: **jen fade + posun** (drží se současné estetiky).
