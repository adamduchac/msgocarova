# Fáze 1 — Základ CMS

## Rozsah

1. **Zapnout Lovable Cloud** (databáze, auth, storage).
2. **Auth setup**
   - Registrace vypnutá (přes nastavení auth).
   - Migrace: `app_role` enum (`admin`), tabulka `user_roles`, security-definer funkce `has_role()`, RLS policies.
   - První admin `adam.duchac@gmail.com` / `Severni723` — vytvořen jednorázově přes admin API v migraci (nebo dedikovaným krokem po zapnutí Cloudu), + řádek v `user_roles` s rolí `admin`.
3. **Storage buckety** (prázdné, připravené pro fázi 2): `staff-photos` (public), `documents` (public).
4. **Admin shell**
   - `/admin/login` — přihlašovací formulář (email + heslo), redirect na `/admin` po úspěchu.
   - `/admin` (a všechny podstránky) pod route gate `_authenticated` + kontrola role `admin` v `beforeLoad`; bez role → redirect na `/admin/login`.
   - Layout se sidebarem vlevo (položky: Top zprávy, Zaměstnanci, Dokumenty, Předškoláček, Zápis) + header s emailem přihlášeného a odhlášením.
   - Každá podstránka zatím jen placeholder „Sekce bude aktivní ve fázi 2".
   - Vizuál: čistý admin styl (světlé pozadí, sidebar bílý s brand accentem), oddělený od veřejného webu — bez hero/navbaru veřejné části.

## Co Fáze 1 neobsahuje

- Žádné CRUD tabulky obsahu (Top zprávy, Zaměstnanci, Dokumenty, Infoboxy) — přijdou ve Fázi 2.
- Žádné napojení veřejných stránek na DB — public web zůstává beze změny.

## Výstup

Po Fázi 1 se budeš moci přihlásit na `/admin/login`, uvidíš sidebar a prázdné sekce. Pak pokračujeme Fází 2 (sekce po sekci — začneme Top zprávami).

---

Pokračovat implementací Fáze 1?
