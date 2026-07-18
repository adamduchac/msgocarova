Plán úprav stránky `/kontakty` (jediný soubor: `src/routes/kontakty.tsx`).

## 1. Hero — kontaktní údaje s eyebrow a většími mezerami

- Obalit telefon, e-mail a adresu do samostatných skupin (např. `<div>`) s větší vertikální mezerou mezi nimi (`gap-6` místo `gap-2`).
- Nad každou skupinu přidat eyebrow text `Telefon`, `E-mail`, `Adresa` pomocí existující třídy `eyebrowClass`.
- Zachovat typografii velkých kontaktních údajů a jejich hover stavy.
- Adresu ponechat jako tři řádky (název školy, ulice, město) ve stejné velikosti jako telefon/e-mail.

## 2. Rejstřík — strukturovaný layout s boxy

- Ponechat vnější bílý box (stín, zaoblení, padding) jako obal celé sekce.
- Uvnitř vnějšího boxu vytvořit dvousloupcový layout:
  - **Levý sloupec:** Vedení školky + Školní jídelna — každá podskupina ve vlastním vnitřním boxu (`boxClass`).
  - **Pravý sloupec:** Barevné třídy — každá třída ve vlastním vnitřním boxu (`boxClass`), řazeny pod sebou.
- Upravit `sectionLabelClass` nadpisy, aby fungovaly jako nadpisy uvnitř boxů (bez `col-span-full`).
- Zachovat obsah, telefonní odkazy, barevné tečky tříd a učitelky.

## Ověření

- Po editaci spustit build (`bun run build` / `bunx vite build`), zkontrolovat, že stránka `/kontakty` kompiluje bez chyb.
- Volitelně screenshot preview na desktopu pro kontrolu struktury.

Žádné jiné stránky ani logika se nemění.