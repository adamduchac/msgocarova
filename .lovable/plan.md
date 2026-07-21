Prohodit ikony oka v administraci oznámení (`src/components/admin/announcements-admin.tsx`).

Aktuální stav:
- Aktivní zpráva zobrazuje tlačítko s ikonou EyeOff (přeškrtnuté oko) a title „Deaktivovat".
- Skrytá zpráva zobrazuje tlačítko s ikonou Eye (plné oko) a title „Aktivovat".

Cílový stav:
- Aktivní zpráva = plné oko (Eye) – reprezentuje, že je viditelná na webu.
- Skrytá zpráva = přeškrtnuté oko (EyeOff) – reprezentuje, že je skrytá.

Změna se týká pouze prohození importovaných ikon `<Eye />` a `<EyeOff />` uvnitř podmínky `a.is_active ? … : …`. Title tlačítek a akce (toggle) zůstávají stejné.