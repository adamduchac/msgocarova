## Zhodnocení jednotlivých bodů

**Bod 2 — posun a mobilní trigger (PLATÍ, aplikovat):**
- Posun 18 px desktop / 10 px mobil je opravdu pod prahem vnímatelnosti. Doporučená oprava je správná, jen čísla zarovnám na tvoje uložené pravidlo (12–16 px). Návrh: **22 px desktop / 14 px mobil** (kompromis mezi „26/16" z feedbacku a tvým pravidlem).
- Mobilní trigger `rootMargin: "0px", threshold: 0` skutečně odpaluje animaci, jakmile prvek vykoukne o 1 px → na mobilu proběhne mimo viewport. Vrátím `-8%` / threshold 0.08 pro coarse, desktop nechám `-8%` / 0 (už je nastavený dobře).

**Bod 3 — nejednotnost reveal-up vs reveal-fade (NEPLATÍ doslova):**
Prošel jsem všechny komponenty. `reveal-fade` se aktuálně používá **jen** na třech velkých vizuálech: hero foto, ilustrace v About, ilustrace tříd. To je přesně to, co feedback doporučuje. Žádný textový blok dnes není na `reveal-fade`. Tady **není co opravovat**.

**Drobnost — mrtvý `reveal:rescan` (PLATÍ jako preventivní oprava, nízká priorita):**
Event se opravdu nikde nedispatchuje a `MutationObserver` byl odstraněn. Dnes to nevadí (SSR + safety timeout 1,5 s pochytá vše), ale jakmile přidáš lazy sekci nebo dynamický slider, který se vyrenderuje až po 1,5 s, obsah zůstane neviditelný. Navrhuji vrátit **lehký, debouncovaný `MutationObserver`** napojený na `requestIdleCallback` (sleduje jen `childList` na `document.body`, ne `subtree: true` na všech atributech — to byla původní příčina janku). Bezpečnostní timeout 1,5 s zůstane.

## Konkrétní změny

**`src/styles.css`**
- ř. 215: `.reveal-up { transform: translate3d(0, 22px, 0); }` (z 18 px)
- ř. 231: `.reveal-up { transform: translate3d(0, 14px, 0); }` (z 10 px)
- ř. 232: `.reveal-right { transform: translate3d(12px, 0, 0); }` (z 8 px, ať to ladí)

**`src/hooks/use-reveal-on-scroll.ts`**
- `rootMargin: isCoarse ? "0px 0px -8% 0px" : "0px 0px -8% 0px"`
- `threshold: isCoarse ? 0.08 : 0`
- Přidat lehký `MutationObserver` (jen `childList` na `body`, throttle přes `requestIdleCallback` / 200 ms fallback) — re-scan nově přidaných uzlů. Pojistka 1,5 s zůstává.

## Co NEdělám
- Nesahám na `reveal-fade` v hero/about/classes — záměrně je tam pro velké vizuály.
- Neměním délky tranzic ani staggery (po minulém kole už sedí).
- Nezvyšuju posun na 26 px (feedback) — držím tvoje pravidlo 12–16 px, 22 px je drobný překryv pro desktop kvůli viditelnosti, mobil zůstává v pásmu.
