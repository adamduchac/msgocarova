
Úpravy v `src/routes/pro-rodice.tsx`:

## 1) Úvodní odstavec
Nahradit text pod H1 „Pro rodiče":
> „Platby, denní program, co s sebou i kroužky – praktické informace, které budete během roku potřebovat nejčastěji. Dokumenty a formuláře najdete dole ke stažení."

Zvětšit `max-w-2xl` → `max-w-3xl`, aby se text pěkně vešel.

## 2) Program dne — rozvrh místo timeline
- Odstranit komponentu `TimelineColumn` (tečky, svislá čára, modré časy).
- Nahradit dvousloupcovým rozvrhem: bílé řádky v jedné kartě (`rounded-2xl` + stín jako ostatní karty), rozdělené jemnou linkou `divide-y divide-black/5`.
- Každý řádek: čas vlevo (`font-display font-bold text-ink tabular-nums`, **bez modré barvy**, tj. tmavá inková), aktivita vpravo (`text-body`).
- Layout: `grid md:grid-cols-2 gap-6`, každý sloupec = jedna karta se 4 řádky. Časy dostanou pevnou šířku (`w-28 shrink-0`), aby popisy začínaly zarovnané.
- Odstranit čísla / kolečka úplně.

## 3) Kroužky jako checklist + odstranit modré pozadí
- Ze sekce `#program-dne` odstranit inline `style` s modrým gradientem — sekce zůstane na bílém pozadí (stejně jako Platby a Výbava).
- Kroužky přestylovat z 3 velkých kartiček s obrázkem 4:3 na kompaktní horizontální checklist podobný sekci Výbava:
  - `grid gap-4 md:grid-cols-3`
  - Každá karta: bílá, `rounded-2xl`, jemný border + stín, `p-5`, `flex items-start gap-4`.
  - Ilustrace vlevo v malém čtverci `h-14 w-14` (`object-contain`, bílé pozadí, bez rámečku) — výrazně menší než dosud.
  - Vpravo nadpis (`font-display font-bold text-ink`) a pod ním popis (`text-sm text-body`).
- Zachovat obsah (Šachy / Bystrohlavička / Stolní hry) beze změny textů.

## 4) Rytmus sekcí
Po odstranění modrého pozadí bude celá stránka na bílé až po žlutý gradient v Dokumentech — to je záměr (kompaktnější, klidnější dojem, jak si přeje uživatel). Krémový gradient nad footerem u Dokumentů zůstává.

## Poznámky
- Ikony `Wallet`, `CreditCard`, `Check`, `Info`, `FileText`, `Download` zůstávají.
- Import `programDne` a `krouzky` beze změny.
- Ostatní sekce (Platby, Výbava, Dokumenty, footer se žlutou kostičkou) beze změny.
