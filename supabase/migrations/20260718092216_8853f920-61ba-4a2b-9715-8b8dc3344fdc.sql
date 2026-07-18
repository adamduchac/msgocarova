
-- Switch has_role to SECURITY INVOKER; callers already query only their own row (auth.uid()),
-- and user_roles has an RLS policy allowing users to view their own roles.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Remove overly permissive anon/authenticated public-read policies on private buckets.
-- The app fetches these files via createSignedUrl, so public read is unnecessary.
DROP POLICY IF EXISTS "Public can read staff photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can read documents" ON storage.objects;
