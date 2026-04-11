
/*
  # Black History Causal Platform — Initial Schema

  ## Summary
  This migration creates the core data model for a digital history platform that
  connects Black history to present-day America through causal chains linking
  people, policies, places, events, and modern outcomes.

  ## New Tables

  ### 1. threads
  The central "causal thread" — a structured argument linking historical cause to modern effect.
  - id, slug, title, subtitle, summary, period_start, period_end, theme, difficulty, status

  ### 2. thread_nodes
  Individual nodes within a causal thread (events, policies, outcomes).
  - id, thread_id, sequence_order, node_type (event|policy|person|place|outcome), title, body, year

  ### 3. people
  Historical and contemporary figures referenced across the platform.
  - id, slug, name, birth_year, death_year, role, summary, image_url

  ### 4. places
  Geographic locations with historical significance.
  - id, slug, name, state, city, lat, lng, significance, period

  ### 5. events
  Discrete historical events.
  - id, slug, title, year, date_label, summary, theme, significance_level

  ### 6. policies
  Laws, executive orders, court decisions, agency rules.
  - id, slug, title, year, type (law|executive_order|court_decision|regulation), summary, effect

  ### 7. sources
  Primary and secondary source references.
  - id, title, author, year, type, url, description

  ### 8. modern_outcomes
  Present-day documented disparities or outcomes linked to historical causes.
  - id, slug, title, summary, data_point, source_citation, category

  ## Security
  - RLS enabled on all tables with public read access (platform is public-facing)
  - No unauthenticated writes allowed
*/

-- THREADS
CREATE TABLE IF NOT EXISTS threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text DEFAULT '',
  summary text DEFAULT '',
  period_start integer,
  period_end integer,
  theme text DEFAULT '',
  difficulty text DEFAULT 'general',
  status text DEFAULT 'published',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published threads"
  ON threads FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- THREAD NODES
CREATE TABLE IF NOT EXISTS thread_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid REFERENCES threads(id) ON DELETE CASCADE,
  sequence_order integer NOT NULL DEFAULT 0,
  node_type text NOT NULL DEFAULT 'event',
  title text NOT NULL,
  body text DEFAULT '',
  year integer,
  year_label text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE thread_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read thread nodes"
  ON thread_nodes FOR SELECT
  TO anon, authenticated
  USING (true);

-- PEOPLE
CREATE TABLE IF NOT EXISTS people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  birth_year integer,
  death_year integer,
  role text DEFAULT '',
  summary text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE people ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read people"
  ON people FOR SELECT
  TO anon, authenticated
  USING (true);

-- PLACES
CREATE TABLE IF NOT EXISTS places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  state text DEFAULT '',
  city text DEFAULT '',
  lat numeric,
  lng numeric,
  significance text DEFAULT '',
  period text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read places"
  ON places FOR SELECT
  TO anon, authenticated
  USING (true);

-- EVENTS
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  year integer,
  date_label text DEFAULT '',
  summary text DEFAULT '',
  theme text DEFAULT '',
  significance_level integer DEFAULT 3,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

-- POLICIES
CREATE TABLE IF NOT EXISTS policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  year integer,
  policy_type text DEFAULT 'law',
  summary text DEFAULT '',
  effect text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read policies"
  ON policies FOR SELECT
  TO anon, authenticated
  USING (true);

-- SOURCES
CREATE TABLE IF NOT EXISTS sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text DEFAULT '',
  year integer,
  source_type text DEFAULT 'book',
  url text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read sources"
  ON sources FOR SELECT
  TO anon, authenticated
  USING (true);

-- MODERN OUTCOMES
CREATE TABLE IF NOT EXISTS modern_outcomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  summary text DEFAULT '',
  data_point text DEFAULT '',
  source_citation text DEFAULT '',
  category text DEFAULT '',
  thread_id uuid REFERENCES threads(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE modern_outcomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read modern outcomes"
  ON modern_outcomes FOR SELECT
  TO anon, authenticated
  USING (true);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_threads_slug ON threads(slug);
CREATE INDEX IF NOT EXISTS idx_threads_theme ON threads(theme);
CREATE INDEX IF NOT EXISTS idx_thread_nodes_thread_id ON thread_nodes(thread_id);
CREATE INDEX IF NOT EXISTS idx_people_slug ON people(slug);
CREATE INDEX IF NOT EXISTS idx_events_year ON events(year);
CREATE INDEX IF NOT EXISTS idx_places_slug ON places(slug);
