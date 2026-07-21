DO $$ BEGIN
  CREATE TYPE public.staff_group AS ENUM ('pedagog','provoz');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.staff
  ADD COLUMN IF NOT EXISTS staff_group public.staff_group NOT NULL DEFAULT 'pedagog';