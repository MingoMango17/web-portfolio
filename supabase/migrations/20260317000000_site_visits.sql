-- Site Visits tracking table

CREATE TABLE site_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visited_at TIMESTAMPTZ DEFAULT NOW(),
  page TEXT NOT NULL DEFAULT '/',
  country TEXT,
  country_code TEXT,
  city TEXT,
  region TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT
);

ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (needed for anonymous visit tracking)
CREATE POLICY "Anon insert" ON site_visits FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated users (admin) can read
CREATE POLICY "Auth read" ON site_visits FOR SELECT TO authenticated USING (true);
