-- Variant A: make the CMS the source of truth for the team & documents.
--
-- Before running: back up the database (Supabase dashboard → Database → Backups,
-- or pg_dump). This migration is additive (new column + bucket visibility) and the
-- `staff` table is currently empty, so risk is low, but always snapshot first.

-- 1) Split staff into pedagogický / provozní tým.
--    The public "O školce" page renders these as two groups; the DB had no such field.
CREATE TYPE public.staff_group AS ENUM ('pedagog', 'provoz');

ALTER TABLE public.staff
  ADD COLUMN staff_group public.staff_group NOT NULL DEFAULT 'pedagog';

-- 2) Staff photos and documents are shown to every (anonymous) visitor on the public
--    site. Migration 20260718092216 dropped public read on these buckets, but the app
--    reads them with the anonymous client — which can no longer sign URLs. Serve them
--    from public buckets instead; the app now builds URLs via getPublicUrl.
--    Idempotent: creates the buckets if missing, flips existing ones to public.
INSERT INTO storage.buckets (id, name, public)
VALUES ('staff-photos', 'staff-photos', true),
       ('documents', 'documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;
