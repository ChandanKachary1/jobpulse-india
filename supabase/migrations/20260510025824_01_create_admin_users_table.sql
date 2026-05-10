/*
  # Create admin_users table

  1. New Tables
    - `admin_users`
      - `user_id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `role` (text) - 'admin' or 'moderator'
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on admin_users table
    - Only admins can view all users
    - Users can view their own record
*/

CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  role text CHECK (role IN ('admin', 'moderator')) DEFAULT 'moderator',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

CREATE POLICY "Users can view their own admin record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Only admins can manage admin users"
  ON admin_users FOR ALL
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
