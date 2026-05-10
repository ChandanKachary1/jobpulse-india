/*
  # Create jobs table

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `title` (text) - Job title
      - `organization` (text) - Organization/department name
      - `category` (text) - Job category
      - `vacancies` (integer) - Number of positions
      - `qualification` (text) - Required qualifications
      - `age_limit` (text) - Age eligibility
      - `salary` (text) - Salary details
      - `application_fee` (text) - Application fee info
      - `selection_process` (jsonb) - Steps in selection process
      - `how_to_apply` (text) - Application instructions
      - `important_dates` (jsonb) - Key dates
      - `links` (jsonb) - Important links
      - `description` (text) - Full description
      - `slug` (text, unique) - URL-friendly identifier
      - `is_trending` (boolean) - Featured status
      - `is_active` (boolean) - Published status
      - `views` (integer) - View count
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on jobs table
    - Public can view active jobs
    - Only admins can manage jobs
*/

CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  category text NOT NULL,
  vacancies integer,
  qualification text,
  age_limit text,
  salary text,
  application_fee text,
  selection_process jsonb,
  how_to_apply text,
  important_dates jsonb,
  links jsonb,
  description text,
  slug text UNIQUE NOT NULL,
  is_trending boolean DEFAULT false,
  is_active boolean DEFAULT true,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_is_active_created_at ON jobs(is_active, created_at DESC);
CREATE INDEX idx_jobs_slug ON jobs(slug);
CREATE INDEX idx_jobs_is_trending ON jobs(is_trending);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jobs are viewable by everyone when active"
  ON jobs FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can view all jobs"
  ON jobs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admin can insert jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Admin can update jobs"
  ON jobs FOR UPDATE
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

CREATE POLICY "Admin can delete jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );
