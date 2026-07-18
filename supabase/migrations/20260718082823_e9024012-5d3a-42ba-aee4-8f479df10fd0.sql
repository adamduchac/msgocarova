CREATE TABLE public.site_copy (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (page, key)
);

GRANT SELECT ON public.site_copy TO anon;
GRANT SELECT ON public.site_copy TO authenticated;
GRANT ALL ON public.site_copy TO service_role;

ALTER TABLE public.site_copy ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site copy" ON public.site_copy FOR SELECT USING (true);

CREATE POLICY "Admins can insert site copy" ON public.site_copy FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update site copy" ON public.site_copy FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site copy" ON public.site_copy FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_site_copy_page ON public.site_copy (page);

CREATE TRIGGER update_site_copy_updated_at
BEFORE UPDATE ON public.site_copy
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();