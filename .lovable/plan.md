Databázový zásah dle zadání – žádné změny kódu.

## Kroky
1. **Migrace** `staff_group` + veřejné buckety (obsah shodný se souborem `supabase/migrations/20260721000000_...`, jen s `IF NOT EXISTS` ochranou proti duplicitě):
   ```sql
   DO $$ BEGIN
     CREATE TYPE public.staff_group AS ENUM ('pedagog','provoz');
   EXCEPTION WHEN duplicate_object THEN NULL; END $$;
   ALTER TABLE public.staff
     ADD COLUMN IF NOT EXISTS staff_group public.staff_group NOT NULL DEFAULT 'pedagog';
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('staff-photos','staff-photos',true), ('documents','documents',true)
   ON CONFLICT (id) DO UPDATE SET public = true;
   ```
2. **Seed** – spustím celý `supabase/seed-cms-content.sql` beze změn (idempotentní, `staff` má 10 řádků → přeskočí; `documents` je prázdné → doplní 7 řádků).
3. **Skrytí stávajících 10 řádků staff** (fallback web bude nadále ukazovat vestavěný obsah):
   ```sql
   UPDATE public.staff SET is_active = false;
   ```
4. **Kontroly**:
   - `SELECT count(*) FROM public.staff;` (očekávám 10)
   - `SELECT count(*) FROM public.documents;` (očekávám 7)
   - `SELECT id, public FROM storage.buckets WHERE id IN ('staff-photos','documents');` (obojí `true`)
   - Výpis všech 10 řádků `public.staff`: `first_name, last_name, position, class_color, staff_group, sort_order, photo_path, length(bio)`.

## Poznámka k nástrojům
Krok 1 spustím přes `supabase--migration` (schema změny). Krok 2 a 3 přes `supabase--insert` (data). Kontroly v kroku 4 přes `supabase--read_query`. Přepněte prosím do build módu.