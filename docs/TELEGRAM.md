# 📱 Creating a Telegram Bot

This takes about 2 minutes and is completely free.

## Step 1: Open @BotFather

1. Open Telegram (mobile or desktop)
2. Search for **@BotFather** — it's the official Telegram bot for creating bots
3. Start a chat and send `/newbot`

## Step 2: Name Your Bot

BotFather will ask you two things:

1. **Name** — the display name for your bot (e.g., "My Site Builder")
2. **Username** — must end in `bot` (e.g., `my_site_builder_bot`)

## Step 3: Copy Your Token

After creating the bot, BotFather will send you a message like:

```
Done! Congratulations on your new bot. You will find it at t.me/your_bot_name.
You can now add a description, about section and profile picture for your bot.

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

**Copy the token** (the long string after the colon). That's your `TELEGRAM_BOT_TOKEN`.

## Step 4: Add to .env

```env
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ
```

## Optional: Customize Your Bot

While in BotFather, you can:
- `/setdescription` — Add a description shown on the bot's profile
- `/setabouttext` — Short text shown in search results
- `/setuserpic` — Upload a profile picture
- `/setcommands` — Set the command menu that appears when users type `/`

### Suggested commands to set:
```
start - Welcome message and instructions
help - Show all commands
mysites - List your generated sites
style - Set a style preference
```

## Keeping Your Bot Private

Since this bot uses your own API keys and has rate limiting, you probably don't want strangers using it. Options:

1. **Just don't share the username** — bots are discoverable but not indexed, so it's effectively private
2. **Add user allowlist** — Add a check in `bot.mjs`:
   ```javascript
   const ALLOWED_USERS = process.env.ALLOWED_USERS?.split(',') || [];
   
   bot.use(async (ctx, next) => {
     const userId = String(ctx.from?.id);
     if (ALLOWED_USERS.length && !ALLOWED_USERS.includes(userId)) {
       await ctx.reply('Sorry, this bot is private.');
       return;
     }
     await next();
   });
   ```
   Then add to `.env`: `ALLOWED_USERS=123456789,987654321`

## Finding Your User ID

To find your own Telegram user ID (for the allowlist above):
1. Message [@userinfobot](https://t.me/userinfobot)
2. It will reply with your user ID

---

[← Back to README](../README.md)
