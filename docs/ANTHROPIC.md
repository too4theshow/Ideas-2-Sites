# 🤖 Getting Your Anthropic API Key

Anthropic makes Claude — the AI that generates your websites.

## Step 1: Create an Account

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up with your email
3. Verify your email address

## Step 2: Add Credits

Anthropic requires prepaid credits (no subscription required):

1. Go to **Settings → Billing**
2. Click **"Add credits"**
3. Start with **$5–10** — that's 50–100 sites worth of generation

## Step 3: Create an API Key

1. Go to **API Keys** (in the left sidebar)
2. Click **"Create Key"**
3. Name it: `Ideas-2-Site`
4. Copy the key — it starts with `sk-ant-api03-...`

## Step 4: Add to .env

```env
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

## Choosing a Model

Set in `.env`:

```env
CLAUDE_MODEL=claude-sonnet-4-5
```

| Model | Speed | Quality | Cost/Site |
|-------|-------|---------|-----------|
| `claude-haiku-3-5` | ⚡ Fastest | Good | ~$0.02 |
| `claude-sonnet-4-5` | 🚀 Fast | **Great** (recommended) | ~$0.05–0.10 |
| `claude-opus-4-5` | 🐢 Slower | 🏆 Best | ~$0.30–0.50 |

**Recommendation:** Start with `claude-sonnet-4-5`. It generates excellent sites quickly and affordably.

## Monitoring Usage

Track your API usage at [console.anthropic.com/usage](https://console.anthropic.com/usage). You'll see token counts and costs per request.

## Rate Limits

Free tier: Limited requests per minute (enough for personal use).  
If you hit rate limits (error 429), the bot will return a friendly error and you can try again.

For heavy use, check [Anthropic's rate limit tiers](https://docs.anthropic.com/en/api/rate-limits).

---

[← Back to README](../README.md)
