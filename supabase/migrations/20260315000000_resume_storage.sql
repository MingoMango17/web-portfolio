-- Create public resume storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('resume', 'resume', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
CREATE POLICY "Public read resume"
ON storage.objects FOR SELECT
USING (bucket_id = 'resume');

-- Authenticated upload/update/delete
CREATE POLICY "Auth upload resume"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resume');

CREATE POLICY "Auth update resume"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'resume');

CREATE POLICY "Auth delete resume"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resume');
