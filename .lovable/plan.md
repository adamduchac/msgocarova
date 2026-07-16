## Cíl
Vypnout autoplay na všech slideri­ch a přidat plynulou přechodovou animaci mezi slidy — na všech velikostech obrazovek.

## Změny

### 1) `src/components/site-teachers.tsx` (slider „Náš tým")
- **Vypnout autoplay** — odstranit `useEffect` s `setInterval`, `AUTOPLAY_MS`, stavovou proměnnou `paused` a související `onMouseEnter/Leave/Focus/Blur` handlery (svipe/klávesnice zůstávají).
- **Přechod mezi slidy** — nahradit stávající `animate-fade-in` na `key={index}` skutečnou slide-přechodovou animací:
  - Track s `flex` a `transform: translateX(-index * 100%)`, `transition: transform 500ms ease-out`.
  - Každý slide `w-full shrink-0`.
  - Respektovat `prefers-reduced-motion`: při `reduce` nastavit `transition: none` (skok bez animace).

### 2) `src/components/site-daily-rhythm.tsx` (slider „Jeden den")
- Mobilní varianta je nativní scroll-snap `overflow-x-auto` — plynulý přechod už řeší `scroll-behavior: smooth` přes `scrollBy({ behavior: "smooth" })`. Autoplay tu nikdy nebyl, není co vypínat.
- **Desktop/tablet zůstává gridem** (uživatel to dříve schválil), nemění se — polaroidy s náklonem.
- Pokud uživatel chtěl i tady přechodovou animaci, potřebuji potvrzení (viz sekce níže). Default: neměnit.

## Technicky
- Track pattern:
  ```tsx
  <div className="overflow-hidden">
    <div
      className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
      style={{ transform: `translateX(-${index * 100}%)` }}
    >
      {teachers.map((t) => (
        <div key={t.name} className="w-full shrink-0">{/* slide */}</div>
      ))}
    </div>
  </div>
  ```
- Odstranit: `AUTOPLAY_MS`, `paused`, autoplay `useEffect`, `onMouseEnter/Leave/Focus/Blur`. Ponechat: šipky, tečky, klávesy ←/→, swipe.

## Otevřená otázka
Slider „Jeden den" na desktopu je grid (10 polaroidů najednou) — tam žádný přechod mezi slidy neexistuje. Předpokládám, že se to nemění. Pokud chceš i tam skutečný slider s přechody, řekni a upravím plán.
