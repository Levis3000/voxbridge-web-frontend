# Supabase Setup Instructions

## 1. Create Supabase Table

**Recommended: Use the complete script in `SUPABASE_UPDATE.sql`**

This script will:
- Drop the existing table if it exists (⚠️ deletes all data)
- Create a fresh table with all columns
- Set up indexes, RLS policies, and column comments

**Or create manually:**

```sql
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
-- ALTER TABLE waitlist ADD CONSTRAINT unique_email UNIQUE (email);
```

## 2. Set Up Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings:
1. Go to https://app.supabase.com
2. Select your project
3. Go to Settings > API
4. Copy the "Project URL" and "anon public" key

## 3. Enable Row Level Security (RLS)

In Supabase, go to Authentication > Policies and create a policy that allows inserts:

```sql
-- Allow anyone to insert into waitlist
CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);
```

Or disable RLS if you prefer (not recommended for production):
```sql
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
```

## Table Schema

The waitlist table has the following columns:
- `id` (BIGSERIAL) - Primary key
- `name` (TEXT) - User's name (required)
- `email` (TEXT) - User's email (required)
- `twitter_handle` (TEXT) - Twitter handle without @ (optional)
- `use_case` (TEXT) - Selected use case (optional)
- `feature_request` (TEXT) - Feature requests or improvement suggestions (optional)
- `created_at` (TIMESTAMPTZ) - Timestamp of signup

## Adding the feature_request Column (If table already exists)

If you already created the table without the `feature_request` column, run this SQL:

```sql
ALTER TABLE waitlist 
ADD COLUMN IF NOT EXISTS feature_request TEXT;
```

