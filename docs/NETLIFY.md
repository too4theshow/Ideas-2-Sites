# 🌐 Getting Your Netlify Auth Token

Netlify's free tier gives you unlimited static site deployments — perfect for this project.

## Step 1: Create a Free Account

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub, GitLab, Bitbucket, or email
3. No credit card required for the free tier

## Step 2: Get Your Personal Access Token

1. Go to **User Settings**: click your avatar → User settings
   - Or go directly to: https://app.netlify.com/user/applications
2. Click **"Personal access tokens"**
3. Click **"New access token"**
4. Give it a description: `Ideas-2-Site`
5. Click **"Generate token"**
6. **Copy the token immediately** — it won't be shown again

## Step 3: Add to .env

```env
NETLIFY_AUTH_TOKEN=nfp_your_token_here
```

## Free Tier Limits

Netlify's free tier includes:
- ✅ Unlimited sites
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS on all sites
- ✅ Custom domains (optional)
- ⚠️ 300 build minutes/month (we don't use builds — direct file upload bypasses this limit entirely)

## How Sites Are Named

Sites are created as Netlify subdomains:
```
{SITE_PREFIX}-{topic-slug}.netlify.app
```

Examples:
- `ideas2site-jazz-history.netlify.app`
- `ideas2site-ancient-rome.netlify.app`
- `ideas2site-black-holes.netlify.app`

Customize the prefix with `SITE_PREFIX=myname` in `.env`.

## Viewing Your Sites

All generated sites appear in your Netlify dashboard at [app.netlify.com](https://app.netlify.com). You can:
- View traffic analytics
- Set custom domains
- Delete old sites
- Update environment variables

## API Rate Limits

Netlify's API allows generous limits for personal use. The bot creates one site per user request, so you'd need thousands of requests per hour to approach any limits.

---

[← Back to README](../README.md)
