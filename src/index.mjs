/**
 * index.mjs
 * Entry point — validates config and starts the Telegram bot.
 *
 * Usage:
 *   npm start
 *   node src/index.mjs
 */

import 'dotenv/config';
import { bot } from './bot.mjs';

// ── Validate required environment variables ─────────────────────────────────────

const required = ['TELEGRAM_BOT_TOKEN', 'ANTHROPIC_API_KEY', 'NETLIFY_AUTH_TOKEN'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach((key) => console.error(`   - ${key}`));
  console.error('\nCopy .env.example to .env and fill in your keys:');
  console.error('   cp .env.example .env');
  process.exit(1);
}

// ── Start ───────────────────────────────────────────────────────────────────────

console.log(`
╔═══════════════════════════════════════╗
║       🌐  Ideas 2 Sites  🤖          ║
║   Turn any idea into a live website   ║
╚═══════════════════════════════════════╝

Model:  ${process.env.CLAUDE_MODEL || 'claude-sonnet-4-5'}
Prefix: ${process.env.SITE_PREFIX || 'ideas2sites'}
Limit:  ${process.env.MAX_SITES_PER_USER || 10} sites/user/day
Storage: ${process.env.SUPABASE_URL ? 'Supabase ☁️' : 'Local JSON 📁'}

Starting bot...
`);

// Graceful shutdown
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());

// Start long polling — no server needed!
bot.start({
  onStart: (info) => {
    console.log(`✅ Bot started: @${info.username}`);
    console.log(`💬 Send a message to t.me/${info.username} to build your first site!\n`);
  },
  drop_pending_updates: true, // Don't process messages received while offline
});
