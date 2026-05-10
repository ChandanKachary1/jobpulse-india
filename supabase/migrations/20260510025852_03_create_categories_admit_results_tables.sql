/*
  # Create categories, admit_cards, results, answer_keys, and scholarships tables

  1. New Tables
    - `categories` - Job categories for filtering
    - `admit_cards` - Exam admit cards
    - `results` - Exam/interview results
    - `answer_keys` - Answer keys for exams
    - `scholarships` - Educational scholarships

  2. Security
    - Enable RLS on all tables
    - Public can view all entries
    - Only admins can manage
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text UNIQUE NOT NULL,
  icon text,
  description text,
  job_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories(slug);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE TABLE IF NOT EXISTS admit_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  exam_date text,
  download_link text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_admit_cards_is_active ON admit_cards(is_active);
CREATE INDEX idx_admit_cards_created_at ON admit_cards(created_at DESC);

ALTER TABLE admit_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admit cards are viewable by everyone when active"
  ON admit_cards FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage admit cards"
  ON admit_cards FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  );

CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  result_date text,
  result_link text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_results_is_active ON results(is_active);
CREATE INDEX idx_results_created_at ON results(created_at DESC);

ALTER TABLE results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Results are viewable by everyone when active"
  ON results FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage results"
  ON results FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  );

CREATE TABLE IF NOT EXISTS answer_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  exam_date text,
  download_link text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_answer_keys_is_active ON answer_keys(is_active);
CREATE INDEX idx_answer_keys_created_at ON answer_keys(created_at DESC);

ALTER TABLE answer_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Answer keys are viewable by everyone when active"
  ON answer_keys FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage answer keys"
  ON answer_keys FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  );

CREATE TABLE IF NOT EXISTS scholarships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  last_date text,
  amount text,
  link text,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_scholarships_is_active ON scholarships(is_active);
CREATE INDEX idx_scholarships_created_at ON scholarships(created_at DESC);

ALTER TABLE scholarships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Scholarships are viewable by everyone when active"
  ON scholarships FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage scholarships"
  ON scholarships FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  );
