-- Lock down SECURITY DEFINER functions: remove PUBLIC/anon execute; keep authenticated (needed for RLS policies and client role checks)
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_my_roles() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_my_roles() TO authenticated, service_role;