/*
  # Create bookmarks, email_subscribers, and banners tables

  1. New Tables
    - `bookmarks` - User bookmarked jobs
    - `email_subscribers` - Email subscription list
    - `banners` - Promotional banners

  2. Security
    - Enable RLS on all tables
    - Users can only access their own bookmarks
    - Email subscribers are private
    - Only admins can manage banners
*/

CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, job_id)
);

CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_job_id ON bookmarks(job_id);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON bookmarks FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own bookmarks"
  ON bookmarks FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own bookmarks"
  ON bookmarks FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  categories text[] DEFAULT ARRAY[]::text[],
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_email_subscribers_is_active ON email_subscribers(is_active);

ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Email subscribers are private"
  ON email_subscribers FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Anyone can subscribe"
  ON email_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Subscribers can update their own record"
  ON email_subscribers FOR UPDATE
  TO authenticated
  USING (
    email = (SELECT email FROM auth.users WHERE auth.users.id = auth.uid())
  )
  WITH CHECK (
    email = (SELECT email FROM auth.users WHERE auth.users.id = auth.uid())
  );

CREATE TABLE IF NOT EXISTS banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text,
  link text,
  position text CHECK (position IN ('top', 'middle', 'sidebar')) DEFAULT 'top',
  is_active boolean DEFAULT true,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_banners_is_active ON banners(is_active);
CREATE INDEX idx_banners_priority ON banners(priority DESC);

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Banners are viewable by everyone when active"
  ON banners FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin can manage banners"
  ON banners FOR ALL
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
