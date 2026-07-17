## Diagnóza — proč reveal skáče

Reveal má tři problémy, které se sčítají do „skoky místo plynulého nástupu":

### 1. Safety timeout 1500 ms zabíjí všechny animace pod foldem
V `src/hooks/use-reveal-on-scroll.ts` je pojistka:
```ts
const safety = window.setTimeout(() => {
  document.querySelectorAll(SELECTOR).forEach((el) => el.classList.add("is-visible"));
}, 1500);
```
Po 1,5 s od hydratace se **všem** `.reveal-*` prvkům na stránce nastaví `is-visible`, včetně těch daleko pod foldem. Transition proběhne mimo obrazovku (uživatel ji nevidí) a když se ke karta doscrolluje, je už staticky viditelná → „naskočila". Tohle je hlavní důvod, proč to působí jako skok — část sekcí se stihne animovat regulérně přes IO, část už je předem „hotová".

### 2. `rootMargin: "0px 0px -8% 0px"` spouští animaci pozdě
Element se musí dostat 8 % do viewportu, teprve pak se rozjede 720 ms transition. Uživatel tedy vidí, jak prvek nejdřív „doskočí" na místo v layoutu, chvilku tam čeká, a až pak animuje opacity/translate — vzniká vjem trhnutí.

### 3. MutationObserver na `body` s `subtree: true` re-scanuje při každé změně DOMu
Hook obsahuje:
```ts
mo.observe(document.body, { childList: true, subtree: true });
```
Každý React re-render, který přidá/odebere uzel (carousel indikátor, hover state, portál Radixu, dropdown), spouští `scheduleRescan` → `observeAll()`. Idempotentní na již pozorované prvky ano, ale zbytečná práce a v okrajových případech může nový uzel dostat `is-visible` později v jiném frame než sourozenci → mírný desync.

## Plán opravy (jen `src/hooks/use-reveal-on-scroll.ts`, žádné CSS)

### A. Zvýšit safety timeout a omezit ho jen na prvky, které opravdu jsou ve viewportu
Místo brute-force přidání `is-visible` všude po 1,5 s:
- Prodloužit safety na **5 s** (dostatek času, aby IO chytil vše nad foldem i při pomalé hydrataci).
- V safety projít prvky a přidat `is-visible` **jen těm**, jejichž `getBoundingClientRect().top < window.innerHeight * 1.1`. Vše ostatní necháme na IO — dostane šanci animovat, až uživatel doscrolluje.

### B. Zrušit záporný `rootMargin`, aby animace startovala dřív
Změnit:
```ts
rootMargin: "0px 0px -8% 0px"
```
na
```ts
rootMargin: "0px 0px 10% 0px"
```
Tj. spustit animaci, když je element **10 % pod foldem** — než ho uživatel uvidí, opacity/translate už jede. Přechod pak vypadá plynule, ne jako pop-in.

### C. Zúžit MutationObserver
- Vypustit `subtree: true` — sledovat jen přímé děti `body` (route swap, portály se v tomto projektu montují jako přímí potomci body).
- Ponechat throttling přes `requestIdleCallback`.

Tím zmizí zbytečné rescany při běžných re-renderech uvnitř sekcí.

## Co se NEmění
- `src/styles.css` — křivka, doba trvání (720 ms desktop / 380 ms mobil), amplitudy zůstávají. Estetika je OK, problém byl v tom, *kdy* se class přepíná.
- Chování na mobilu (`#bezny-den` slider bez per-card reveal) zůstává.
- `prefers-reduced-motion` větev beze změny.
- Žádné úpravy komponent — hook je centrální.

## Ověření
Po buildu projet stránku pomalu shora dolů, sledovat, že:
1. Sekce nad foldem animují jednou při načtení.
2. Sekce pod foldem animují až při scrollu, ne skokem.
3. Karty v „Jeden den v MŠ" nastupují ve stagger vlně (110 ms), ne najednou.

Otevřená otázka: chceš, abych zároveň zkrátil desktop `transition-duration` z 720 na 560 ms? Aktuálně to na rychlém scrollu působí trochu líně. Default: **nechat 720 ms**, řešíme jen skokovost.