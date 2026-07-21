Prohodit status ikony oka v administraci medailonků zaměstnanců (`src/components/admin/staff-admin.tsx`).

Aktuální stav:
- Aktivní zaměstnanec zobrazuje tlačítko s ikonou EyeOff (přeškrtnuté oko) a title „Skrýt".
- Skrytý zaměstnanec zobrazuje tlačítko s ikonou Eye (plné oko) a title „Zobrazit".

Cílový stav:
- Aktivní zaměstnanec = plné oko (Eye) – reprezentuje, že je viditelný na webu.
- Skrytý zaměstnanec = přeškrtnuté oko (EyeOff) – reprezentuje, že je skrytý.

Změna se týká pouze prohození ikon `<Eye />` a `<EyeOff />` uvnitř podmínky `s.is_active ? … : …` na řádku 122. Title tlačítek a akce (toggle) zůstávají stejné.