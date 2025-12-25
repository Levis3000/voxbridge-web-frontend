-- Complete waitlist table setup
-- This will drop the existing table (if it exists) and create a fresh one with all columns
-- Run this in your Supabase SQL Editor

-- Drop the table if it exists (WARNING: This will delete all existing data!)
DROP TABLE IF EXISTS waitlist CASCADE;

-- Create the waitlist table with all columns
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  twitter_handle TEXT,
  use_case TEXT,
  feature_request TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Optional: Add unique constraint on email to prevent duplicates
-- Uncomment the line below if you want to prevent duplicate email signups
-- ALTER TABLE waitlist ADD CONSTRAINT unique_email UNIQUE (email);

-- Add comments to document the columns
COMMENT ON TABLE waitlist IS 'Waitlist table for GlotBridge app signups';
COMMENT ON COLUMN waitlist.id IS 'Primary key';
COMMENT ON COLUMN waitlist.name IS 'User''s name (required)';
COMMENT ON COLUMN waitlist.email IS 'User''s email address (required)';
COMMENT ON COLUMN waitlist.twitter_handle IS 'Twitter handle without @ symbol (optional)';
COMMENT ON COLUMN waitlist.use_case IS 'Selected use case from dropdown (optional)';
COMMENT ON COLUMN waitlist.feature_request IS 'Feature requests or improvement suggestions (optional)';
COMMENT ON COLUMN waitlist.created_at IS 'Timestamp when user joined the waitlist';

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated inserts" ON waitlist;
DROP POLICY IF EXISTS "waitlist_public_insert" ON waitlist;
DROP POLICY IF EXISTS "waitlist_authenticated_insert" ON waitlist;

-- Create separate policies for anon and authenticated roles
-- This is more reliable than combining them in one policy
CREATE POLICY "waitlist_public_insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "waitlist_authenticated_insert" ON waitlist
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Optional: Create policy to allow public reads (if you want to display waitlist count)
-- Uncomment if needed
-- CREATE POLICY "Allow public reads" ON waitlist
--   FOR SELECT
--   TO public
--   USING (true);

