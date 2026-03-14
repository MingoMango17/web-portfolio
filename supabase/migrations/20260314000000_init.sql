-- ============================================================
-- Portfolio CMS Schema
-- Run this in your Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  github TEXT,
  image TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON projects FOR SELECT USING (true);

-- Experiences table
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  initials TEXT NOT NULL,
  bullets TEXT[] NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON experiences FOR SELECT USING (true);

-- Skills table (progress bars)
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  order_index INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON skills FOR SELECT USING (true);

-- Tools table (icon grid)
CREATE TABLE tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON tools FOR SELECT USING (true);

-- ============================================================
-- Seed Data (your current content)
-- ============================================================

INSERT INTO projects (name, description, link, github, image, tags, order_index) VALUES
(
  'Artefy',
  'A dedicated platform for artists to showcase their work and connect with their audience. Built with Vue.js and Firebase, enabling creative professionals to display portfolios with real-time communication features.',
  'https://artefy-8085f.firebaseapp.com/',
  'https://github.com/MingoMango17/artFiverr',
  '/artefy.png',
  ARRAY['Vue.js', 'Firebase', 'Tailwind CSS'],
  1
),
(
  'Payco',
  'A comprehensive online payment system for university tuition fees. Built for the UNO-R Portal, streamlining financial transactions between students and university administration.',
  'https://payco-uno-r.vercel.app/',
  'https://github.com/MingoMango17/Exam_Permit',
  '/payco.png',
  ARRAY['React', 'MongoDB', 'Tailwind CSS'],
  2
),
(
  'Kahayag',
  'A restaurant website prototype with a focus on clean UI/UX design. Built with React and designed in Figma, showcasing design-to-code workflow.',
  NULL,
  'https://github.com/MingoMango17/KahayagFE',
  '/kahayag.png',
  ARRAY['React', 'Tailwind CSS', 'Figma'],
  3
),
(
  'BiPay Attendance',
  'A facial recognition-based attendance management system with integrated payroll tracking, built with modern web technologies and computer vision.',
  NULL,
  'https://github.com/MingoMango17/face-recognition-attendance-system',
  '/face-recog.png',
  ARRAY['React', 'Django', 'ChromaDB'],
  4
);

INSERT INTO experiences (company, role, period, initials, bullets, order_index) VALUES
(
  'HQZen / BPOseats',
  'Full Stack Developer Intern',
  'July 2023 – Present',
  'HQ',
  ARRAY[
    'Built a full-stack kanban board application using Vue.js and Django, used by internal teams.',
    'Collaborated with senior developers across the entire development lifecycle.',
    'Integrated REST APIs and managed PostgreSQL databases for production features.',
    'Established Git workflows and best practices across the team.'
  ],
  1
),
(
  'University of the Philippines Cebu',
  'BS Computer Science',
  '2020 – Present',
  'UP',
  ARRAY[
    'Pursuing Bachelor of Science in Computer Science.',
    'Developed multiple full-stack projects including facial recognition systems and payment platforms.',
    'Applied machine learning and AI concepts in personal and academic projects.'
  ],
  2
);

INSERT INTO skills (name, level, order_index) VALUES
('JavaScript', 85, 1),
('Python', 78, 2),
('React / Vue', 82, 3),
('Django', 80, 4),
('PostgreSQL / MongoDB', 72, 5),
('Next.js', 70, 6);

INSERT INTO tools (name, icon, order_index) VALUES
('JavaScript', '/icons8-javascript-48.png', 1),
('Django', '/django.png', 2),
('React', '/react.png', 3),
('Vue', '/vue.png', 4),
('Firebase', '/firebase.png', 5),
('PostgreSQL', '/postgres.png', 6),
('MongoDB', '/mongo.png', 7),
('Python', '/python.png', 8),
('Tailwindcss', '/tailwind.png', 9),
('Git', '/git.png', 10),
('Next.js', '/nextjs.png', 11);
