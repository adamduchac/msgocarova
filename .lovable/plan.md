# Doladění hero animací

## 1) Kostičky – skok do hover stavu

**Příčina:** Entrance animace `hero-cube-in` končí na `transform: scale(1)` (rotace 0°). Vzápětí se přepne třída na `is-floating`, kde float keyframe začíná na `rotate(-4deg)` resp. `rotate(5deg)` – browser udělá tvrdý skok z 0° na úvodní rotaci floatu. To vypadá jako „skok do hoveru".

**Oprava v `src/styles.css`:** Přepsat float keyframy tak, aby začínaly i končily na `rotate(0deg)` a rotovaly plynule uvnitř smyčky (žádná diskontinuita s koncem entrance):

```css
@keyframes hero-cube-float-a {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25%      { transform: translateY(-4px) rotate(-3deg); }
  75%      { transform: translateY(-2px) rotate(2deg); }
}
@keyframes hero-cube-float-b {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25%      { transform: translateY(-7px) rotate(4deg); }
  75%      { transform: translateY(-3px) rotate(-2deg); }
}
```

Zároveň prodloužím float-duration (A: 7s, B: 8.5s), ať jsou kostičky každá svým tempem.

## 2) Slider – fotky se mění skokově

**Příčina:** Stávající logika monutuje a odmontovává `SlideLayer` přes `prevIndex` + `useEffect` + `requestAnimationFrame`. Mezi React batchingem, zápisem do DOM a flipem `data-state` browser nestihne spočítat počáteční stav, takže transition na `opacity`/`transform` neproběhne — efektivně se obrázek skokem přehodí.

**Oprava — zjednodušený, deklarativní vzor v `src/components/site-hero.tsx`:**

- Odstranit `prevIndex`, `SlideLayer`, `firstMount`, dvojité `requestAnimationFrame`.
- Vykreslit oba `<img>` pořád, vedle sebe v masce, řízené jen `data-active={i === index}`.
- Aktivní snímek: `opacity:1, translateY(0), z-index:2`. Neaktivní: `opacity:0, translateY(8%), z-index:1`.
- Transition 1400ms `cubic-bezier(0.4, 0, 0.2, 1)` na obou. Tím nový obrázek najede shora-dolů, starý odjede dolů, oba prolnou.
- Interval 6000ms zachován.

CSS (`src/styles.css`) – přepsat sekci hero-slide:
```css
.hero-slide {
  position: absolute; inset: 0; width: 100%; height: 100%;
  opacity: 0; transform: translateY(-8%);
  transition: opacity 1400ms cubic-bezier(0.4,0,0.2,1),
              transform 1400ms cubic-bezier(0.4,0,0.2,1);
  will-change: opacity, transform;
}
.hero-slide[data-active="true"]  { opacity: 1; transform: translateY(0); z-index: 2; }
.hero-slide[data-active="false"] { opacity: 0; transform: translateY(8%); z-index: 1; }
```

Tím se eliminuje montování/odmontování i rAF hack a transition spolehlivě běží na obou prvcích.

## 3) Tlustší řez nadpisu

V `site-hero.tsx` na `<h1>` změnit `font-bold` (700) → `font-extrabold` (800). Urbanist má extrabold k dispozici a zachová českou diakritiku.

## Soubory
- `src/components/site-hero.tsx` – přepis sliderové části, změna váhy nadpisu
- `src/styles.css` – nové float keyframy + zjednodušený `.hero-slide`
