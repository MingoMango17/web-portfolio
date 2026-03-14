-- Allow authenticated users to INSERT / UPDATE / DELETE on all content tables

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['projects','experiences','skills','tools'] LOOP
    EXECUTE format('CREATE POLICY "Auth insert" ON %I FOR INSERT TO authenticated WITH CHECK (true)', t);
    EXECUTE format('CREATE POLICY "Auth update" ON %I FOR UPDATE TO authenticated USING (true)', t);
    EXECUTE format('CREATE POLICY "Auth delete" ON %I FOR DELETE TO authenticated USING (true)', t);
  END LOOP;
END $$;
