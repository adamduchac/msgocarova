## Plán: reseed staff + obnovení storage read policies

Pouze databázové operace, žádné změny kódu.

### 1) Truncate + reseed (migrace)
Spustím jako jednu migraci:
- `TRUNCATE public.staff;`
- celý obsah `supabase/seed-cms-content.sql` beze změn (idempotentní `WHERE NOT EXISTS` – po TRUNCATE se naplní 10 řádků staff; documents má už 7, přeskočí se)

### 2) Storage read policies (migrace)
```sql
DROP POLICY IF EXISTS "Public can read staff photos" ON storage.objects;
CREATE POLICY "Public can read staff photos" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'staff-photos');

DROP POLICY IF EXISTS "Public can read documents" ON storage.objects;
CREATE POLICY "Public can read documents" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'documents');
```

### 3) Kontroly (read_query)
- `SELECT count(*), count(*) FILTER (WHERE is_active), count(*) FILTER (WHERE staff_group='pedagog'), count(*) FILTER (WHERE staff_group='provoz'), count(*) FILTER (WHERE bio IS NOT NULL AND bio <> ''), count(*) FILTER (WHERE photo_path IS NOT NULL) FROM public.staff;` – očekávám 10 / 10 / 7 / 3 / 7 / 7
- `SELECT count(*) FROM public.documents;` – očekávám 7
- Výpis policies na `storage.objects` filtrovaný na buckety `staff-photos` a `documents`

### Poznámka
Body 1 a 2 jsou DDL/bulk operace → jdou přes migration tool (dva samostatné migrations, protože tool neběží paralelně a čeká na schválení). Bod 3 přes read_query.
