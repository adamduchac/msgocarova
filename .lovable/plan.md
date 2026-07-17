## Plán: stránky `/zapis-do-skolky` a `/predskolacek`

Obě stránky sdílejí stejnou strukturu i vizuální styl (držíme se rytmu `/pro-rodice` a `/o-skolce`, `max-w-4xl`, stíny karet jako na HP, rounded-2xl, `reveal-up`).

### Sdílená struktura (v tomto pořadí)

1. **Hero** — eyebrow „Pro rodiče" (malé caps s barevnou tečkou jako na jiných podstránkách), H1, úvodní odstavec. Krémový gradient nahoře (stejný jako `/zapis-do-skolky` teď).
2. **Stavový blok** (viz níže) — hned pod hero, výrazný, ale decentní.
3. **Dva boxy 1/2 + 1/2** — bílé karty, stín jako HP, rounded-2xl, ikona nebo malý eyebrow v každé kartě.
4. **Infobox 1/1** — širší karta v jemně tónovaném odstínu (světle krémová/béžová), pro doplňkové informace.
5. **Kontakt / CTA** — jednoduchý pruh na konci se dvěma odkazy (mail + tel), zarovnáno vlevo, styl konzistentní s ostatními podstránkami.
6. **Footer** — přechod bílá → krémová, stejně jako u ostatních podstránek.

### Stavový blok — návrh podoby

Nejvýraznější prvek stránky. Cílem je, aby uživatel na první pohled poznal „aktuální stav".

- Karta na plnou šířku obsahu (`max-w-4xl`), rounded-2xl, silnější stín než běžné karty.
- Levý barevný pruh (4–6 px) — barva podle stavu:
  - **„neběží / uzavřeno"** → tlumená brand-yellow / písková (aktuální stav obou stránek)
  - **„běží"** → brand-green (pro CMS budoucnost, jen připraveno v kódu, ne přepínač v UI)
- Malý štítek nahoře („Aktuální stav" / eyebrow s tečkou v barvě stavu).
- Nadpis (např. „Zápis 2026/2027 je uzavřen"), pod ním odstavec s textem od uživatele.
- Jemný podklad karty (odstín krémové), aby ladil, ale odlišoval se od bílých karet níže.
- Ve stavu „běží" bude uvnitř místo pro termín, místo, odkaz na přihlášku a datum schůzky (v kódu připraveno jako varianta, teď se nerenderuje — CMS zatím není řešené, jen struktura).

### Obsah `/zapis-do-skolky`

Přepis stávajícího placeholderu na plnou stránku:
- Hero: eyebrow „Pro rodiče", H1 „Zápis do mateřské školy", úvodní odstavec od uživatele.
- Stavový blok: text „Zápis pro školní rok 2026/2027 je uzavřen…"
- Dva boxy: „Jak zápis probíhá" + „Co si k zápisu připravit" (odrážky, odkaz „Dokumenty ke stažení" míří na `/pro-rodice#dokumenty`).
- Infobox 1/1 se dvěma pododdíly: „Po přijetí" a „Prázdninový provoz". Odkaz na pravidla míří na `/pro-rodice#dokumenty` (kotva sekce Dokumenty).
- Kontakt: `kostičky@msjghk.cz`, `495 444 421`.
- Head: title, description, og:*.

### Obsah `/predskolacek`

- Nový route file `src/routes/predskolacek.tsx`.
- Stejný layout jako výše, obsah od uživatele.
- Dva boxy: „Jak Předškoláček probíhá" + „Na co se zaměřujeme" (odrážky).
- Infobox 1/1 se dvěma pododdíly: „Co si přinést" a „Přihlášení". Datum uzávěrky zatím jako `[DOPLNIT]` v textu (uživatel doplní později).
- Kontakt stejný.
- Head: title, description, og:*.

### Napojení do navigace a odkazů

- `src/components/site-navbar.tsx` — doplnit odkazy na `/zapis-do-skolky` a `/predskolacek` na správné místo (v sekci „Pro rodiče" resp. hlavní menu, konzistentně s tím, kam ukazuje aktuální menu).
- Zkontrolovat, kde je v projektu odkazováno na „Klub Předškoláček" (HP karta v `site-activities.tsx` teď míří na `/pro-rodice#krouzky`) — pokud si to přeješ přesměrovat na novou stránku `/predskolacek`, upravím i to. Pokud ne, nechám beze změny. → **otázka níže**.
- Footer necháváme beze změny (žádnou kostičku neupravuji).

### Technická poznámka (skryto před běžným čtenářem)

- Nová route: `src/routes/predskolacek.tsx` s `createFileRoute("/predskolacek")`. `routeTree.gen.ts` se přegeneruje pluginem, needituji ho.
- Přepisuji `src/routes/zapis-do-skolky.tsx` (nahrazuji placeholder).
- Vytvořím sdílený komponent `src/components/status-block.tsx` s propy `variant: "closed" | "open"`, `title`, `children`. Použije se na obou stránkách.
- Všechny texty přes `fixPrepositions` (české jednohláskové předložky).
- Použijeme existující tokeny (`bg-card`, `text-ink`, `text-body`, `border-border`, brand barvy z `styles.css`), žádné hardcoded barvy v komponentech.

### Otevřená otázka

Karta „Klub Předškoláček" na HP (`site-activities.tsx`) teď vede na `/pro-rodice#krouzky`. Mám ji přesměrovat na novou `/predskolacek`?
