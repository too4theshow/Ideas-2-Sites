/**
 * bot.mjs
 * Telegram bot powered by Grammy.
 * Long-polling mode — no server or webhook needed.
 */

import { Bot, InlineKeyboard } from 'grammy';
import { buildSite } from './builder.mjs';
import { deploySite } from './deployer.mjs';
import {
  addSite,
  getSitesByUser,
  canUserBuildSite,
} from './storage.mjs';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) throw new Error('TELEGRAM_BOT_TOKEN is not set');

export const bot = new Bot(BOT_TOKEN);

// ── Middleware: Track typing state ─────────────────────────────────────────────

async function sendTyping(ctx) {
  await ctx.replyWithChatAction('typing');
}

// ── /start ──────────────────────────────────────────────────────────────────────

bot.command('start', async (ctx) => {
  const name = ctx.from?.first_name || 'there';
  await ctx.reply(
    `👋 Hey ${name}! I'm your personal website builder.\n\n` +
      `Just tell me what you want a website about, and I'll:\n` +
      `  🎨 Design a stunning single-page site using AI\n` +
      `  🚀 Deploy it live to Netlify automatically\n` +
      `  🔗 Send you the URL — usually in under 2 minutes!\n\n` +
      `*Try it now:* Just type something like...\n` +
      `  • "the history of jazz music"\n` +
      `  • "my dog Max who loves fetch"\n` +
      `  • "ancient Roman gladiators"\n` +
      `  • "the science of black holes"\n\n` +
      `Or use /help to see all commands.`,
    { parse_mode: 'Markdown' }
  );
});

// ── /help ───────────────────────────────────────────────────────────────────────

bot.command('help', async (ctx) => {
  await ctx.reply(
    `*🛠 Site From Chat — Commands*\n\n` +
      `*Just type anything* → Build a website about it\n\n` +
      `/start — Welcome message\n` +
      `/help — Show this menu\n` +
      `/mysites — List your recently generated sites\n` +
      `/style [theme] — Set a style preference\n` +
      `  e.g. /style dark and cinematic\n` +
      `  e.g. /style bright and playful\n\n` +
      `*Cost per site:* ~\\$0.05–0.15 in Claude API credits\n` +
      `*Netlify:* Free tier — unlimited static sites\n\n` +
      `💡 Tip: Be specific! "Jazz music in 1950s New York" makes a better site than just "jazz"`,
    { parse_mode: 'MarkdownV2' }
  );
});

// ── /mysites ────────────────────────────────────────────────────────────────────

bot.command('mysites', async (ctx) => {
  const userId = String(ctx.from?.id);
  const sites = await getSitesByUser(userId);

  if (!sites.length) {
    await ctx.reply(
      `You haven't built any sites yet! Just type a topic to get started. 🚀`
    );
    return;
  }

  const list = sites
    .slice(0, 10)
    .map((s, i) => `${i + 1}. [${s.title}](${s.url})`)
    .join('\n');

  await ctx.reply(
    `*Your sites* (${sites.length} total):\n\n${list}`,
    { parse_mode: 'Markdown', disable_web_page_preview: false }
  );
});

// ── /style ──────────────────────────────────────────────────────────────────────

const userStyles = new Map(); // In-memory style preferences

bot.command('style', async (ctx) => {
  const style = ctx.match?.trim();
  const userId = String(ctx.from?.id);

  if (!style) {
    const current = userStyles.get(userId);
    await ctx.reply(
      current
        ? `Your current style: *${current}*\n\nChange it with: /style [your preference]`
        : `No style set. Use /style to set one.\nExamples:\n• /style dark and cinematic\n• /style bright and playful\n• /style minimalist and elegant`,
      { parse_mode: 'Markdown' }
    );
    return;
  }

  userStyles.set(userId, style);
  await ctx.reply(`✅ Style set to: *${style}*\n\nYour next sites will use this aesthetic!`, {
    parse_mode: 'Markdown',
  });
});

// ── Main message handler ────────────────────────────────────────────────────────

bot.on('message:text', async (ctx) => {
  const text = ctx.message.text.trim();
  const userId = String(ctx.from?.id);
  const username = ctx.from?.username || ctx.from?.first_name || 'User';

  // Ignore commands (handled above)
  if (text.startsWith('/')) return;

  // Rate limiting check
  const { allowed, remaining } = await canUserBuildSite(userId);
  if (!allowed) {
    await ctx.reply(
      `⚠️ You've hit the site limit (${process.env.MAX_SITES_PER_USER || 10} sites).\n\n` +
        `Want more? Self-host this bot with your own API keys — see the README!`
    );
    return;
  }

  // Acknowledge immediately
  const buildingMsg = await ctx.reply(
    `🔨 *Building your site...*\n\n` +
      `Topic: _${escapeMarkdown(text)}_\n\n` +
      `This takes about 60–90 seconds. Claude is crafting something beautiful ✨`,
    { parse_mode: 'Markdown' }
  );

  try {
    // Keep typing indicator alive during build
    const typingInterval = setInterval(() => {
      ctx.replyWithChatAction('typing').catch(() => {});
    }, 4000);

    // 1. Generate the HTML
    const style = userStyles.get(userId);
    const { html, title, slug } = await buildSite(text, { style });

    // 2. Deploy to Netlify
    const { url, siteId, siteName } = await deploySite(html, slug);

    clearInterval(typingInterval);

    // 3. Track the site
    await addSite({
      userId,
      username,
      title,
      url,
      siteId,
      siteName,
      prompt: text,
      createdAt: new Date().toISOString(),
    });

    // 4. Send the result
    const keyboard = new InlineKeyboard()
      .url('🌐 Visit Site', url)
      .url('📤 Share', `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out this site about ${title}!`)}`);

    await ctx.api.editMessageText(
      ctx.chat.id,
      buildingMsg.message_id,
      `✅ *Your site is live!*\n\n` +
        `🎨 *${escapeMarkdown(title)}*\n` +
        `🔗 ${url}\n\n` +
        `Built in under 2 minutes by Claude AI 🤖\n` +
        `Use /mysites to see all your sites.`,
      {
        parse_mode: 'Markdown',
        reply_markup: keyboard,
      }
    );
  } catch (error) {
    console.error('Build error:', error);

    await ctx.api.editMessageText(
      ctx.chat.id,
      buildingMsg.message_id,
      `❌ *Something went wrong*\n\n` +
        `Error: ${escapeMarkdown(error.message || 'Unknown error')}\n\n` +
        `Please try again in a moment. If this keeps happening, check your API keys.`,
      { parse_mode: 'Markdown' }
    );
  }
});

// ── Error handler ───────────────────────────────────────────────────────────────

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error handling update ${ctx.update.update_id}:`, err.error);
});

// ── Helpers ─────────────────────────────────────────────────────────────────────

function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+=|{}.!\\-]/g, '\\$&');
}
