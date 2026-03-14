-- Add write policies for authenticated users on about table
CREATE POLICY "Auth insert" ON about FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update" ON about FOR UPDATE TO authenticated USING (true);
