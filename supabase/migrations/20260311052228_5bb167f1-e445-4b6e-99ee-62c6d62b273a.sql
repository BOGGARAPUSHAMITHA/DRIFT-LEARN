
DROP POLICY "Instructors can read all profiles" ON public.profiles;
CREATE POLICY "Instructors can read all profiles" ON public.profiles FOR SELECT TO authenticated USING (
  public.has_role(auth.uid(), 'instructor')
);
