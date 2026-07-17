
-- ENUM types
CREATE TYPE public.class_color AS ENUM ('red', 'green', 'blue', 'yellow', 'none');
CREATE TYPE public.doc_category AS ENUM ('formulare', 'dokumenty');
CREATE TYPE public.info_state AS ENUM ('open', 'upcoming', 'closed');
CREATE TYPE public.info_page AS ENUM ('predskolacek', 'zapis');

-- STAFF
CREATE TABLE public.staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  photo_path text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  title_prefix text DEFAULT '',
  title_suffix text DEFAULT '',
  position text NOT NULL DEFAULT '',
  bio text DEFAULT '',
  class_color public.class_color NOT NULL DEFAULT 'none',
  phone text DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.staff TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.staff TO authenticated;
GRANT ALL ON public.staff TO service_role;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active staff" ON public.staff
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all staff" ON public.staff
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert staff" ON public.staff
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update staff" ON public.staff
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete staff" ON public.staff
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER staff_updated_at BEFORE UPDATE ON public.staff
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- DOCUMENTS
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  file_path text NOT NULL,
  category public.doc_category NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.documents TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active documents" ON public.documents
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all documents" ON public.documents
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert documents" ON public.documents
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update documents" ON public.documents
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete documents" ON public.documents
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER documents_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- INFO BOXES
CREATE TABLE public.info_boxes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key public.info_page NOT NULL UNIQUE,
  state public.info_state NOT NULL DEFAULT 'upcoming',
  heading text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  deadline_label text DEFAULT '',
  capacity_label text DEFAULT '',
  note text DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.info_boxes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.info_boxes TO authenticated;
GRANT ALL ON public.info_boxes TO service_role;
ALTER TABLE public.info_boxes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view info boxes" ON public.info_boxes
  FOR SELECT USING (true);
CREATE POLICY "Admins can insert info boxes" ON public.info_boxes
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update info boxes" ON public.info_boxes
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete info boxes" ON public.info_boxes
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER info_boxes_updated_at BEFORE UPDATE ON public.info_boxes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default info boxes so admin UI has something to edit
INSERT INTO public.info_boxes (page_key, state, heading, body) VALUES
  ('predskolacek', 'upcoming', 'Zápis do Předškoláčka pro rok 2025/2026', 'Aktuální informace budou brzy zveřejněny.'),
  ('zapis', 'upcoming', 'Zápis do MŠ pro školní rok 2025/2026', 'Aktuální informace budou brzy zveřejněny.');
