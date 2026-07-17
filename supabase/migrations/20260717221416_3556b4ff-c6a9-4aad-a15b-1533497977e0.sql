
-- Admin can manage staff photos
CREATE POLICY "Admins can insert staff photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'staff-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update staff photos"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'staff-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete staff photos"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'staff-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can select staff photos"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'staff-photos' AND public.has_role(auth.uid(), 'admin'));

-- Admin can manage documents
CREATE POLICY "Admins can insert documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update documents"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete documents"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can select documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));
