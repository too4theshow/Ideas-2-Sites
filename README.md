<div align="center">

# 🌐 Ideas 2 Sites

### Turn any idea into a live website. Just send a message.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)
[![Telegram](https://img.shields.io/badge/Telegram-Bot-blue.svg)](https://telegram.org)
[![Powered by Claude](https://img.shields.io/badge/AI-Claude%20Sonnet-orange.svg)](https://anthropic.com)
[![Deploy: Netlify](https://img.shields.io/badge/Deploy-Netlify-teal.svg)](https://netlify.com)

**Message your Telegram bot → AI designs a stunning site → Deploys live in under 2 minutes**

[**Quick Start**](#-quick-start-5-minutes) · [**How It Works**](#-how-it-works) · [**Example Sites**](#-example-sites) · [**Setup Guides**](#-setup-guides)

---

</div>

## ✨ What Is This?

You type a message to your Telegram bot:

> *"Build me a website about the history of jazz music"*

And 90 seconds later, you get back a URL like `https://ideas2sites-jazz-history.netlify.app` — a **genuinely stunning, animated single-page website** with custom typography, scroll animations, atmospheric backgrounds, and real content. Not a template. Not a placeholder. A real website.

This project wires together four APIs into something magical:

```
You → Telegram → Claude AI → Netlify → Live URL back to you
```

That's it. No coding required to run it. No servers to maintain. Just four API keys and `npm start`.

---

## 🎬 How It Works

| Step | What Happens |
|------|-------------|
| 💬 **1. You message the bot** | Send any topic — "the Roman Colosseum", "my cat Mr. Whiskers", "quantum physics for kids" |
| 🤖 **2. Claude designs it** | Our carefully-crafted AI prompt generates a complete, beautiful HTML site with animations, fonts, and real content |
| 🚀 **3. Netlify deploys it** | The HTML is deployed via Netlify's API in seconds — no CLI, no account setup needed per site |
| 🔗 **4. You get the URL** | The bot sends you a live link. Click it. Share it. It works everywhere. |

---

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher
- A [Telegram bot token](docs/TELEGRAM.md) (free, 2 min)
- An [Anthropic API key](docs/ANTHROPIC.md) (~$5 to start)
- A [Netlify auth token](docs/NETLIFY.md) (free account)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/too4theshow/Ideas-2-Sites.git
cd Ideas-2-Sites

# 2. Install dependencies
npm install

# 3. Set up your environment
cp .env.example .env
```

Now open `.env` in your editor and fill in your four keys:

```env
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
ANTHROPIC_API_KEY=sk-ant-your-key-here
NETLIFY_AUTH_TOKEN=your-netlify-personal-access-token
```

```bash
# 4. Start the bot
npm start
```

```
╔═══════════════════════════════════════╗
║       🌐  Ideas 2 Sites  🤖          ║
║   Turn any idea into a live website   ║
╚═══════════════════════════════════════╝

✅ Bot started: @YourBotName
💬 Send a message to t.me/YourBotName to build your first site!
```

**5. Message your bot!** Open Telegram, find your bot, and type anything. Your first site will be live in about 90 seconds.

---

## 🤖 Bot Commands

| Command | What It Does |
|---------|-------------|
| Just type anything | Build a website about that topic |
| `/start` | Welcome message + instructions |
| `/help` | Show commands and tips |
| `/mysites` | List your recently generated sites with links |
| `/style dark and cinematic` | Set a style preference for future sites |
| `/style bright and playful` | Another style example |

---

## 🎨 What Can You Build?

This isn't just "make a website about a topic." People use this for **real things that matter:**

### 🎉 Anniversary & Relationship Gift
> *"Build a website celebrating my 10th anniversary with my wife. We met in line at a taco truck in Denver in 2015 — she was wearing a Broncos jersey and I made fun of her for putting ketchup on a breakfast burrito. First date was hiking Hanging Lake. I proposed at sunset on the Maroon Bells trail with her mom's ring. We got married at a barn venue in Estes Park with 47 guests and a bluegrass band. We have two kids — Nora (7, obsessed with horses) and James (4, thinks he's Spider-Man). She's a pediatric nurse who reads murder mysteries and I'm a high school baseball coach. Our song is 'First Day of My Life' by Bright Eyes."*

→ Gets a cinematic scroll-through timeline of your love story with every detail woven in. The taco truck, the ketchup joke, the Maroon Bells sunset — all of it. Better than flowers. She'll cry.

### 🏠 Apartment & House Finder
> *"Help me find a 2-bedroom apartment in Denver under $1,400/month. I work near the DTC but might switch to a remote job soon, so I want somewhere with good coffee shops and co-working nearby. I have a golden retriever so I need a dog-friendly building with a park within walking distance. I'm 28, single, and I like running — bonus points for trails nearby. I'm currently in a sketchy part of Aurora and my catalytic converter got stolen last month, so safety matters. I don't need fancy, just clean, modern, and not depressing."*

→ Gets an interactive neighborhood guide with safety comparisons, dog park maps, trail access ratings, co-working spots, real apartment suggestions, and a decision matrix sorted by what matters most to you.

### 🎂 Birthday Party Planner
> *"Plan my daughter's 7th birthday party in Portland, Oregon. She is OBSESSED with ocean animals — especially octopuses and sea otters. Budget is $600 total including food, decorations, and activities. We need a venue that can hold 25 kids and 15 parents. She's allergic to peanuts. Party should be the first Saturday in May. She wants a 'marine biologist' theme, not just generic 'under the sea.' Her best friend's name is Cleo and she's already told everyone there will be a real octopus at the party (there will not be a real octopus)."*

→ Gets venue options near Portland with aquarium connections, marine biologist theme ideas, peanut-free menu suggestions, activity plans (touch tanks, ocean slime station, field journal craft), a supply checklist with costs, and a week-by-week planning timeline. Plus ideas for how to manage the octopus expectations.

### 👶 Baby Announcement
> *"We're expecting our first baby! Build a surprise announcement site we can text to our families. We're the Nguyen-Petersons — Marcus and Linh. We've been together 6 years, married 2. We live in a tiny apartment in Chicago with our cat Chairman Meow. The baby is due in October. Linh's parents don't know yet and they're going to LOSE THEIR MINDS. We want the site to build suspense — start with 'we have some news' and slowly reveal it with a scroll. Confetti at the big moment. Maybe a countdown to October. Our vibe is warm and funny, not Pinterest-perfect."*

→ Gets a password-gated reveal site with scroll-driven storytelling, the cat intro, the suspense build, a confetti explosion at the reveal, an October countdown, and a tone that's genuinely warm and funny — because that's who you are.

### 🎵 Tribute Site for Someone You Admire
> *"Build a tribute for my mentor, Coach Williams. He taught high school chemistry for 32 years at Jefferson High in Milwaukee and coached girls' basketball to 3 state championships. He drove a beat-up Subaru with a bumper sticker that said 'I teach therefore I'm broke.' He retired last year and half the town showed up to his farewell assembly. His thing was always 'the periodic table is just organized chaos — kind of like life.' He volunteers at the food bank every Saturday morning. His wife Carol makes the best banana bread on earth. He changed my life and I want him to know."*

→ Gets a cinematic profile site with the Subaru, the bumper sticker, the state championships, the periodic table quote woven through as a narrative thread, the food bank, Carol's banana bread — every detail that makes him HIM. The kind of site that makes a 62-year-old retired teacher tear up.

### 🌍 Travel Itinerary
> *"Plan a 7-day trip to Japan for me and my wife. We land in Tokyo on March 28. We LOVE ramen (we've been to 40+ ramen shops in the US), we want to see cherry blossoms, she's into vintage clothing shopping, and I'm obsessed with Japanese whisky. We want 4 days Tokyo, day trip to Hakone for an onsen, then 2 days Kyoto. Mid-range budget — we'll splurge on food but want reasonable hotels. We don't speak Japanese but she's been studying on Duolingo for 3 months. We hate tourist traps."*

→ Gets a day-by-day itinerary with specific ramen shops ranked by style, cherry blossom viewing spots with peak bloom dates, Shimokitazawa vintage shopping route, a whisky bar crawl in Golden Gai, Hakone onsen recommendations, Kyoto temple route that avoids the crowds, daily budget estimates, and transit tips. Save it to your phone and use it as your actual trip guide.

### 🎓 Portfolio / Resume Site
> *"Build my portfolio site. I'm a freelance illustrator based in Nashville. I spent 5 years at Hallmark designing greeting cards — I illustrated over 800 cards including their best-selling 'Peanuts Christmas' line. Now I'm freelance doing editorial illustration for magazines, children's book covers, and brand mascots. My style is mid-century modern meets whimsical — think Charley Harper crossed with Oliver Jeffers. I use Procreate and gouache. My biggest client right now is Trader Joe's seasonal packaging. I have a studio in East Nashville above a record shop."*

→ Gets a stunning portfolio site with mid-century color palette, whimsical typography, project showcase sections for each specialization, a bio that captures the Hallmark-to-freelance story, the studio-above-a-record-shop detail, and a visual style that MATCHES your illustration style. 1000x better than a Squarespace template.

### 🐕 Pet Memorial
> *"Build a memorial for our cat Professor Whiskers. He was a 19-year-old orange tabby who showed up on our doorstep in 2007 as a kitten during a thunderstorm. He earned the name 'Professor' because he'd sit on top of the bookshelf and judge everyone. He survived a coyote encounter, two cross-country moves (Vermont to Arizona to Oregon), and outlived two dogs. His favorite spot was the bathroom sink. He only liked my wife. He passed away last Tuesday in his sleep on his favorite blanket. He was the best worst cat."*

→ A gentle, warm tribute with the thunderstorm origin story, the bookshelf judging, the bathroom sink, the cross-country moves mapped out, the coyote survival badge of honor, and "the best worst cat" as the closing line. The kind of site you revisit when you miss him.

### 🏡 Real Estate Listing
> *"Create a listing site for 814 Sycamore Lane — a 3-bed 2-bath mid-century ranch in Boise, Idaho. 1,800 sq ft, built in 1961, original hardwood floors throughout. Updated kitchen with butcher block counters and a farmhouse sink. Huge backyard with a 100-year-old maple tree, raised garden beds, and a fire pit. Detached 2-car garage converted to a workshop. The neighborhood is Warm Springs — walkable to the river, 10 min bike ride to downtown. Asking $485K. The sellers are the original owners' grandkids."*

→ A beautiful single-property showcase that leads with the maple tree and the generational story, highlights the workshop garage, shows the Warm Springs neighborhood walkability, and makes a buyer feel like they're already home.

### 🎪 Event Invitation
> *"Create an invitation for our annual Friendsgiving. Saturday, November 22nd at our place — 2847 Birch Street, Apt 4B. Potluck style: we're doing the turkey and gravy, everyone else sign up for sides. BYOB but we'll have a mulled wine station. Starts at 4pm, eating at 6. Our apartment is small so max 20 people. There WILL be a pie contest again — last year's winner (Derek's sweet potato pie) has been talking trash. Dog-friendly. Street parking only. Dress code: stretchy pants."*

→ A festive, shareable invitation with the potluck sign-up list, the pie contest hype, the mulled wine station callout, parking details, the stretchy pants dress code, and a countdown timer. Text the link to the group chat.

**If you can describe it, it becomes a live website.** See [examples/sites.md](examples/sites.md) for the full gallery.

---

## 🧠 How the AI Prompt Works

The secret sauce is `src/prompts/site-builder.md` — a detailed system prompt that instructs Claude to act as an elite web designer.

Key principles baked into the prompt:

- **Fonts must match the topic's soul** — Google Fonts chosen for emotional resonance (never generic Inter/Roboto)
- **Color palette from the emotional world** — jazz gets warm amber and charcoal; space gets void black and stellar gold
- **Atmospheric backgrounds** — CSS gradient animations, canvas particles, or pattern overlays
- **Scroll-triggered animations** — every section animates in via IntersectionObserver
- **Custom cursor on desktop** — subtle but striking
- **5–7 content sections** — hero, intro, two deep dives, visual feature, context, emotional close
- **Real content** — Claude writes actual facts, quotes, and narrative about the topic
- **BANNED patterns** — Bootstrap, Lorem ipsum, generic templates, emoji in headings

The result feels like something a freelance designer spent a weekend on.

---

## 💸 Cost Transparency

Running this bot is very cheap:

| Item | Cost |
|------|------|
| Claude Sonnet (per site) | ~$0.05–0.15 |
| Netlify hosting | **Free** (up to 100 sites/month on free tier) |
| Telegram Bot API | **Free** |
| Running the bot (local/VPS) | ~$0–$5/month |

To generate 100 sites: approximately **$5–$15 in Claude API credits**.

You can switch to `claude-opus-4-5` in `.env` for even better quality at ~3x the price.

---

## 🔧 Customization

### Change the AI prompt
Edit `src/prompts/site-builder.md` to change the design style, add constraints, or focus on specific aesthetics.

### Change the site naming
Set `SITE_PREFIX=myname` in `.env` — your sites will be `myname-jazz-history.netlify.app`

### Add your own commands
`src/bot.mjs` is clean and well-commented — add Grammy commands easily:

```javascript
bot.command('mycommand', async (ctx) => {
  await ctx.reply('Hello from my custom command!');
});
```

### Enable Supabase storage
Add `SUPABASE_URL` and `SUPABASE_KEY` to your `.env` to store site history in the cloud. See [docs/SUPABASE.md](docs/SUPABASE.md).

---

## ☁️ Running in the Cloud

### Option 1: GitHub Codespaces (free, no server needed)
1. Fork this repo
2. Open in Codespaces
3. Add your `.env` variables as Codespaces secrets
4. Run `npm start` in the terminal

### Option 2: Run as a GitHub Action
See `.github/workflows/run-bot.yml` — runs the bot on a schedule (workaround since Actions isn't designed for long-running processes, but it works).

### Option 3: Any VPS ($4/month on Hetzner/DigitalOcean)
```bash
npm install -g pm2
pm2 start npm --name "ideas-2-site" -- start
pm2 save && pm2 startup
```

### Option 4: Raspberry Pi, old laptop, anywhere
Node.js runs everywhere. Just `npm start` and leave it running.

---

## 📁 Project Structure

```
Ideas-2-Sites/
├── src/
│   ├── index.mjs          # Entry point — validates env + starts bot
│   ├── bot.mjs            # Telegram bot (Grammy framework)
│   ├── builder.mjs        # Claude API → HTML generator
│   ├── deployer.mjs       # HTML → Netlify live URL
│   ├── storage.mjs        # Site tracking (local JSON or Supabase)
│   └── prompts/
│       └── site-builder.md # 🔥 The AI system prompt (the secret sauce)
├── docs/
│   ├── TELEGRAM.md        # How to create a Telegram bot
│   ├── NETLIFY.md         # How to get your Netlify token
│   ├── ANTHROPIC.md       # How to get your Claude API key
│   └── SUPABASE.md        # Optional cloud storage setup
├── examples/
│   └── sites.md           # Gallery of example generated sites
├── .env.example           # Template for your secrets
├── package.json
└── README.md
```

---

## 🛠 Setup Guides

Complete step-by-step guides for each service:

- 📱 [**Telegram Bot Setup**](docs/TELEGRAM.md) — Create a bot with @BotFather in 2 minutes
- 🌐 [**Netlify Token Setup**](docs/NETLIFY.md) — Get your personal access token
- 🤖 [**Anthropic API Key**](docs/ANTHROPIC.md) — Get your Claude API key
- ☁️ [**Supabase Setup**](docs/SUPABASE.md) — Optional: cloud storage for site history

---

## 🤝 Contributing

PRs welcome! Ideas for contributions:

- 🖼 **Image generation** — Add a hero image to each site via DALL-E or Replicate
- 🎵 **Background music** — Ambient audio via Web Audio API
- 📊 **Analytics** — Track site visits
- 🎨 **More style presets** — Dark academia, vaporwave, brutalist, etc.
- 🌍 **Multi-language support** — Build sites in any language
- 📱 **WhatsApp / Discord support** — Port the bot interface

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT — do whatever you want with this. Build a business, give it away, modify it completely.

---

<div align="center">

Built with ❤️ using [Grammy](https://grammy.dev), [Anthropic Claude](https://anthropic.com), and [Netlify](https://netlify.com)

**[⭐ Star this repo](https://github.com/too4theshow/Ideas-2-Sites)** if it made something beautiful for you.

</div>
