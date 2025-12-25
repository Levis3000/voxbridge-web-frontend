-- Re-enable RLS with a working policy
-- Run this after you've confirmed the insert works with RLS disabled

-- Step 1: Re-enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop any existing policies that might be conflicting
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated user inserts" ON waitlist;
DROP POLICY IF EXISTS "waitlist_insert_policy" ON waitlist;
DROP POLICY IF EXISTS "waitlist_allow_inserts" ON waitlist;

-- Step 3: Create a simple, working policy
-- This allows anyone (anon role) to insert into the waitlist
CREATE POLICY "waitlist_public_insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 4: Also allow authenticated users (optional, but good to have)
CREATE POLICY "waitlist_authenticated_insert" ON waitlist
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Step 5: Verify the policies
SELECT 
  policyname, 
  roles, 
  cmd,
  with_check
FROM pg_policies 
WHERE tablename = 'waitlist';

-- Test: Try inserting a row now - it should work!
-- If it doesn't work, check the roles column above to see what roles the policy applies to

