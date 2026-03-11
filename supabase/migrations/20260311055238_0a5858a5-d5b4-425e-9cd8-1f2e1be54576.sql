-- 1. Create the trigger that was missing (function already exists)
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Fix quiz_attempts RLS policy for instructors (avoid querying profiles directly)
DROP POLICY IF EXISTS "Instructors can read all attempts" ON public.quiz_attempts;
CREATE POLICY "Instructors can read all attempts"
  ON public.quiz_attempts
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'instructor'::app_role));

-- 3. Fix profiles RLS policies - change from RESTRICTIVE to PERMISSIVE so they OR together
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Instructors can read all profiles" ON public.profiles;
CREATE POLICY "Instructors can read all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'instructor'::app_role));

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);