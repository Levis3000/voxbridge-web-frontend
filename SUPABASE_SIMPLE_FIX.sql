-- SIMPLE FIX - Run this to fix RLS policy error
-- This is the most straightforward solution

-- 1. Drop the problematic policy
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;

-- 2. Create a new, simple policy with a different name
CREATE POLICY "waitlist_allow_inserts" ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 3. Verify it worked
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'waitlist';

-- If you want to test without RLS (TEMPORARY ONLY):
-- ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

