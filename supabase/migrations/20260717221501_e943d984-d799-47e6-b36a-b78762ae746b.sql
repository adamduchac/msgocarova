
CREATE POLICY "Public can read staff photos"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'staff-photos');

CREATE POLICY "Public can read documents"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'documents');
