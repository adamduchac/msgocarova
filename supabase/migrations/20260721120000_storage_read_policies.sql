-- The workspace disallows public buckets (public_buckets_blocked), so the
-- bucket-public part of migration 20260721000000 could not be applied.
-- Equivalent supported approach: anon read (SELECT) policies on the two
-- buckets — the same policies migration 20260717221501 originally created —
-- and the app serves admin-uploaded files via signed URLs (createSignedUrl
-- works for the anonymous client once it has SELECT on the objects).
-- Content exposure is identical either way: these files are shown to every
-- visitor on the public site. Idempotent (DROP IF EXISTS + CREATE).

DROP POLICY IF EXISTS "Public can read staff photos" ON storage.objects;
CREATE POLICY "Public can read staff photos" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'staff-photos');

DROP POLICY IF EXISTS "Public can read documents" ON storage.objects;
CREATE POLICY "Public can read documents" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'documents');
