-- Quick fix for RLS policy error
-- Run this if you're getting "new row violates row-level security policy" error

-- Step 1: Check current RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';

-- Step 2: Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'waitlist';

-- Step 3: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow authenticated user inserts" ON waitlist;

-- Step 4: Ensure RLS is enabled
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Step 5: If "Allow public inserts" policy exists, alter it
-- Otherwise create new policies
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'waitlist' 
    AND policyname = 'Allow public inserts'
  ) THEN
    -- Alter existing policy
    ALTER POLICY "Allow public inserts"
    ON "public"."waitlist"
    TO anon, authenticated
    WITH CHECK (true);
  ELSE
    -- Create new policies if they don't exist
    CREATE POLICY "Allow anonymous inserts" ON waitlist
      FOR INSERT
      TO anon
      WITH CHECK (true);
    
    CREATE POLICY "Allow authenticated inserts" ON waitlist
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Step 7: Verify the policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies 
WHERE tablename = 'waitlist';

-- Option 2: If still not working, temporarily disable RLS for testing (Not recommended for production)
-- ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

