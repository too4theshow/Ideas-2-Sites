# ☁️ Supabase Setup (Optional)

Supabase stores your generated sites in a cloud database. Without it, sites are tracked in a local `sites.json` file — which works fine for single-machine use.

**Why add Supabase?**
- `/mysites` works across devices and bot restarts
- Multiple users can use the same bot instance
- Site analytics and history persists forever

## Step 1: Create a Free Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **"New project"**
3. Choose an organization, name your project, set a database password
4. Select the region closest to you
5. Wait ~2 minutes for the project to be ready

## Step 2: Create the Sites Table

Go to the **SQL Editor** in your Supabase dashboard and run:

```sql
CREATE TABLE sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" TEXT NOT NULL,
  username TEXT,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  "siteId" TEXT,
  "siteName" TEXT,
  prompt TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX idx_sites_user_id ON sites("userId");

-- Enable Row Level Security (optional but good practice)
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Allow the anon key to read/write (since we're using server-side only)
CREATE POLICY "Allow all operations" ON sites
  FOR ALL USING (true) WITH CHECK (true);
```

## Step 3: Get Your API Keys

1. Go to **Project Settings → API**
2. Copy:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 4: Add to .env

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 5: Install the Supabase Client

The Supabase client is listed as an optional dependency. Install it:

```bash
npm install @supabase/supabase-js
```

## Verifying It Works

After starting the bot and generating a site, check your Supabase table:

1. Go to **Table Editor → sites**
2. You should see a row with the site details

---

[← Back to README](../README.md)
