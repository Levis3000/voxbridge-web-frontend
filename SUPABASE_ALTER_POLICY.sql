-- Alter the existing "Allow public inserts" policy
-- This updates the policy to allow both anon and authenticated roles

ALTER POLICY "Allow public inserts"
ON "public"."waitlist"
TO anon, authenticated
WITH CHECK (true);

-- Verify the policy was updated
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual, 
  with_check
FROM pg_policies 
WHERE tablename = 'waitlist' 
  AND policyname = 'Allow public inserts';

