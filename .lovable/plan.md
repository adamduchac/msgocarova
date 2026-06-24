## Cíl
Doladit dva detaily na aktuální oznamovací liště pod hero:
1. Hlavní sdělení bude vizuálně přesně ve středu celého boxu (nikoli jen ve středu prostředního sloupce gridu).
2. Animované rozbalení tlačítka "Podrobnosti →" bude plynulejší.

## Změny

### 1. Přesné vycentrování textu
Aktuálně je vnitřek boxu 3-sloupcový grid (`auto | 1fr | 12rem`). Střed prostředního sloupce není shodný se středem celé lišty, protože levá ikona a pravý CTA mají různou šířku.

**Řešení:** Přepnu vnitřní rozvržení z gridu na `relative flex items-center justify-center`. Ikona a CTA se umístí absolutně vlevo/vpravo, hlavní `<p>` zabere celou šířku s `text-center` a bezpečnými horizontálními paddingy, aby nedocházelo k překrývání.

| breakpoint | levý padding | pravý padding |
|------------|--------------|---------------|
| mobile     | ~92 px       | ~160 px       |
| desktop    | ~104 px      | ~200 px       |

Hodnoty doladím přesně po nasazení, aby text seděl na střed bez ohledu na stav rozbalení CTA.

### 2. Plynulejší vyjetí "Podrobnosti"
Délku přechodu zvednu z `300 ms` na `500 ms` (případně `550 ms`). Easing zůstane `cubic-bezier(0.22, 1, 0.36, 1)` — jen delší čas dá pohybu luxusnější, méně uspěchaný dojem.

## Soubor
- `src/components/site-announcement-bar.tsx` — jediný upravovaný soubor. Žádné nové závislosti, žádné nové tokeny, žádné keyframes.