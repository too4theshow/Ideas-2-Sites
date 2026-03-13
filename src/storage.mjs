/**
 * storage.mjs
 * Tracks generated sites. Uses Supabase if configured, otherwise a local JSON file.
 * Fully optional — the bot works without any storage configured.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCAL_DB_PATH = join(__dirname, '..', 'sites.json');
const MAX_SITES_PER_USER = parseInt(process.env.MAX_SITES_PER_USER || '10', 10);

// ── Supabase (optional) ─────────────────────────────────────────────────────────

let supabase = null;

if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    console.log('✅ Supabase storage connected');
  } catch (e) {
    console.warn('⚠️  Supabase import failed, falling back to local JSON storage:', e.message);
  }
} else {
  console.log('📁 Using local JSON storage (sites.json). Set SUPABASE_URL + SUPABASE_KEY to enable cloud storage.');
}

// ── Public API ──────────────────────────────────────────────────────────────────

/**
 * Save a generated site record.
 */
export async function addSite(site) {
  if (supabase) {
    const { error } = await supabase.from('sites').insert([site]);
    if (error) console.error('Supabase insert error:', error);
  } else {
    const db = loadLocalDB();
    db.sites.push(site);
    saveLocalDB(db);
  }
}

/**
 * Get all sites for a user (most recent first, max 10).
 */
export async function getSitesByUser(userId) {
  if (supabase) {
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })
      .limit(10);
    if (error) {
      console.error('Supabase query error:', error);
      return [];
    }
    return data || [];
  } else {
    const db = loadLocalDB();
    return db.sites
      .filter((s) => s.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }
}

/**
 * Check if a user can build another site (rate limiting).
 * Returns { allowed: boolean, remaining: number }
 */
export async function canUserBuildSite(userId) {
  const sites = await getSitesByUser(userId);

  // Count sites in the last 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recentSites = sites.filter((s) => new Date(s.createdAt) > oneDayAgo);

  const allowed = recentSites.length < MAX_SITES_PER_USER;
  const remaining = Math.max(0, MAX_SITES_PER_USER - recentSites.length);
  return { allowed, remaining };
}

// ── Local JSON DB helpers ───────────────────────────────────────────────────────

function loadLocalDB() {
  if (!existsSync(LOCAL_DB_PATH)) {
    return { sites: [] };
  }
  try {
    return JSON.parse(readFileSync(LOCAL_DB_PATH, 'utf-8'));
  } catch {
    return { sites: [] };
  }
}

function saveLocalDB(db) {
  writeFileSync(LOCAL_DB_PATH, JSON.stringify(db, null, 2));
}
