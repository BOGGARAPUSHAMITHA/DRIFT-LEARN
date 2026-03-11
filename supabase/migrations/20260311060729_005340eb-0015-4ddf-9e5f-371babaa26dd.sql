
-- Fix profiles RLS: change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Instructors can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Instructors can read all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'instructor'));

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Fix quiz_attempts RLS: change from RESTRICTIVE to PERMISSIVE
DROP POLICY IF EXISTS "Students can read own attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Instructors can read all attempts" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Students can insert own attempts" ON public.quiz_attempts;

CREATE POLICY "Students can read own attempts" ON public.quiz_attempts
  FOR SELECT TO authenticated USING (auth.uid() = student_id);

CREATE POLICY "Instructors can read all attempts" ON public.quiz_attempts
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'instructor'));

CREATE POLICY "Students can insert own attempts" ON public.quiz_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = student_id);
