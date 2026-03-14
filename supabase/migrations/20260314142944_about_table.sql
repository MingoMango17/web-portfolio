-- About table (singleton row, id = 1)
CREATE TABLE about (
  id INTEGER PRIMARY KEY,
  paragraph1 TEXT NOT NULL,
  paragraph2 TEXT NOT NULL
);

ALTER TABLE about ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON about FOR SELECT USING (true);

-- Seed with current content
INSERT INTO about (id, paragraph1, paragraph2) VALUES (
  1,
  'I''m a passionate Full Stack Developer currently pursuing my Bachelor''s in Computer Science at the University of the Philippines Cebu. I combine academic knowledge with hands-on industry experience to build efficient, user-centered applications.',
  'My journey began as an intern at HQZen/BPOseats building a full-stack kanban board with Vue.js and Django. Outside of work, I''m always exploring the latest in AI, machine learning, and automotive engineering — interests that shape how I approach every project I build.'
);
