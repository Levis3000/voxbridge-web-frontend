-- Complete RLS Fix - Run this entire script
-- This will completely reset and fix the RLS policies

-- Step 1: Check current RLS status and policies
SELECT 
  'Current RLS Status:' as info,
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';

SELECT 
  'Existing Policies:' as info,
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'waitlist';

-- Step 2: Drop ALL existing policies (start fresh)
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated user inserts" ON waitlist;

-- Step 3: Ensure RLS is enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Step 4: Create a single, simple policy that works
-- This allows both anon and authenticated roles to insert
CREATE POLICY "waitlist_insert_policy" ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Step 5: Verify the new policy
SELECT 
  'New Policy Created:' as info,
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd
FROM pg_policies 
WHERE tablename = 'waitlist';

-- If the above still doesn't work, try this (TEMPORARY - for testing only):
-- ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

