## Cíl

Přenést stávající obsah frontendu do CMS tabulek, aby administrace ukazovala reálná data (ne prázdné stavy). Frontend zůstane beze změny — má už dnes fallbacky, takže nic „nezmizí".

## Co se vloží do databáze

### 1) Top zprávy (`announcements`) — 1 záznam
- **Titulek:** „Poslední den školky 26. 6. 2026."
- **Obsah:** „Těšíme se na viděnou v novém školním roce. Užijte si prázdniny!"
- aktivní, pozice 0

### 2) Infoboxy (`info_boxes`) — 2 záznamy (placeholdery)
Vloženo přesně to, co dnes ukazuje fallback:

- **`predskolacek`** — stav `closed`, titulek „Termíny Předškoláčka pro rok 2027 zatím nebyly vyhlášeny", tělo z fallbacku.
- **`zapis`** — stav `closed`, titulek „Zápis pro školní rok 2026/2027 je uzavřen", tělo z fallbacku.

### 3) Zaměstnanci (`staff`) — 10 záznamů podle `src/data/team.ts`
Jméno, tituly, role a barva třídy (červená / zelená / modrá / žlutá / none). **Bez fotografií** — foto sloupec zůstane prázdný, protože aktuální fotky jsou bundlované assety, ne soubory v Storage. V administraci se u každého zaměstnance objeví „nahrát fotku" a paní ředitelka postupně nahraje.

Seznam osob (rozdělení pedagog/provoz + přiřazená třída):
- Mgr. Jitka Kouklíková — Zástupkyně ředitele pro MŠ (bez třídy)
- Mgr. Nikola Šorfová — Červená
- Jana Tuharská — Zelená
- Kristýna Vaňátková, DiS. — Zelená
- Bc. Veronika Kremláčková — Modrá
- Milena Svobodová, DiS. — Žlutá
- Martina Bartošová — bez třídy
- Lenka Petráčková, Lucie Košťálová, Věra Marková — Provozní

### 4) Dokumenty (`documents`) — vynecháno
7 PDF je dnes bundlovaných v `src/assets/dokumenty/`. Vložit je do CMS by znamenalo nahrát binárky do Storage bucketu — což nedokážu udělat čistě z SQL. Frontend přitom už zobrazuje bundlované PDF *i* dokumenty z CMS naráz, takže admin sekce zůstane prázdná dokud tam někdo první dokument nenahraje. Alternativu (viz níže) můžeš schválit.

## Technický postup
Jedna Supabase migrace (INSERT statements pro announcements, info_boxes, staff). Žádné změny schématu, žádné změny frontendu.

## Otevřená otázka (volitelné rozšíření)
Chceš, abych zároveň:
- **A)** nic navíc — dokumenty necháme prázdné, admin je bude nahrávat postupně,
- **B)** přidal 7 „stub" záznamů v `documents` s názvy stávajících PDF a poznámkou, aby paní ředitelka věděla, co má nahradit reálným souborem? (Vyžadovalo by dočasně vypnout `NOT NULL` na `file_path`, což je zbytečná úlitba — proto A doporučuji.)

Pokud plán potvrdíš, spustím migraci s variantou A.
