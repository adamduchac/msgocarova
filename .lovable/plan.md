Nahradím tři placeholder sekce na `/pro-rodice` reálným obsahem ve stejném stylu jako `/o-skolce` (max-w-4xl, bílé karty s jemným stínem, `section-y-md` mezery, střídání bílé/krémové mezi sekcemi).

## Sekce

**#platby — Platby**
- Úvodní odstavec s výší školného (600 Kč / 300 Kč v létě, do 15. dne, předškoláci neplatí).
- Dvě bílé karty vedle sebe (na mobilu pod sebou):
  - Účet školné + plavání: `35-5744160237/0100`
  - Účet stravné: `27-320530297/0100`
- Poznámka pod kartami: „Variabilní symbol dítěte je pro všechny platby stejný."

**#program-dne — Program dne**
- Nadpis + tabulka časů a činností v bílé kartě (2 sloupce: Čas / Činnost, dělené řádky, stejný styl jako tabulka otevírací doby hřiště na /o-skolce).
- Podnadpis „Kroužky a aktivity" + tři bílé karty pod sebou (Šachy, Bystrohlavička, Stolní hry), každá s názvem a popiskem.

**#vybava — Co dítě potřebuje do školky**
- Nadpis + úvodní řádek.
- Odrážkový seznam v bílé kartě s ikonou check u každé položky (8 položek dle zadání).

## Technické detaily
- Pouze úprava `src/routes/pro-rodice.tsx` — nahradit `placeholderSections.map(...)` třemi explicitními sekcemi.
- Střídání pozadí: Platby (bílá) → Program dne (jemný modrý gradient jako na /o-skolce „Představení a vize") → Výbava (bílá) → Dokumenty (krémová, už existuje).
- Ikony z `lucide-react` (Wallet, Clock, CheckCircle2, Puzzle, apod.).
- Vše přes `fixPrepositions()` kvůli české typografii.
- Žádné hover scale efekty, karty `rounded-2xl`.
