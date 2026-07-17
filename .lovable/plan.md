# Dokumenty ke stažení — sekce na /pro-rodice

## Rozsah
Přidat 4. sekci `#dokumenty` na konec stránky `/pro-rodice`, ve stylu ostatních sekcí (max-w-4xl, zarovnáno vlevo, `section-y-md`). Poslední sekce dostane gradient bílá → krémová k patičce (jako jinde na webu). Submenu odkaz `/pro-rodice#dokumenty` zůstává beze změny.

## Obsah — dvě podskupiny, 7 položek

**Formuláře a žádosti**
- Žádost o přijetí k předškolnímu vzdělávání
- Žádost o přijetí — prázdninový provoz
- Žádost o uvolnění dítěte z povinného předškolního vzdělávání
- Pravidla přijímání dětí — prázdninový provoz 2026

**Základní dokumenty**
- Školní řád mateřské školy
- Vnitřní řád školní výdejny
- Školní vzdělávací program — Skládáme svět z kostiček

## Vizuální řešení
Řádkový seznam v boxu (bílá karta, `rounded-2xl`, jemný border/stín jako ostatní karty na webu). Každá položka:
- ikona PDF (Lucide `FileText`) v barevném kroužku
- název dokumentu (tučný)
- pod ním malým písmem „PDF" + velikost souboru
- šipka `Download` vpravo, hover = jemný posun (v souladu s pravidly, žádný scale)

Celý řádek je `<a href="…" target="_blank" rel="noopener noreferrer">` s viditelným focus stavem. Dva boxy pod sebou (Formuláře / Základní dokumenty), každý s vlastním malým nadpisem `h3`.

## Technika
1. Nahrát 7 PDF přes `lovable-assets create` z `/mnt/user-uploads/…` → `src/assets/dokumenty/{slug}.pdf.asset.json` pointery. Původní binárky nekopírovat do repa.
2. V `src/routes/pro-rodice.tsx` naimportovat pointery, přidat sekci s `id="dokumenty"` za `#vybava`.
3. Přesunout gradient na poslední (novou) sekci; ze současné poslední sekce gradient odebrat, aby přechod na footer navazoval jen jednou.
4. Ověřit build.

Poznámka: pokud PDF s prázdninovým provozem 2026 v budoucnu zestárne, půjde nahradit novou verzí přes `lovable-assets` beze změny kódu.