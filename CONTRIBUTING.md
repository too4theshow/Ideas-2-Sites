# Contributing to Ideas 2 Site

Thanks for wanting to contribute! This is a simple project and PRs are very welcome.

## Getting Started

1. Fork the repo
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/site-from-chat`
3. Create a branch: `git checkout -b my-feature`
4. Make your changes
5. Test it with real API keys
6. Submit a PR

## What We Need Most

### 🔥 High Impact

- **Better AI prompt** — The system prompt in `src/prompts/site-builder.md` is the heart of this project. If you find prompting techniques that generate noticeably better sites, please share them.

- **Example sites** — Built something beautiful? Add it to `examples/sites.md` with a description.

- **Bug fixes** — Netlify API changes, Claude API changes, Grammy API changes — the world moves fast.

### 💡 Feature Ideas

- **WhatsApp or Discord support** — Port the bot interface to other platforms
- **Image generation** — Add a hero image via DALL-E 3 or Stable Diffusion
- **Multi-page sites** — Currently generates single-page. Multi-page would be awesome.
- **Site updates** — Let users update an existing site with a new prompt
- **Style gallery** — A `/styles` command that shows available presets
- **Password protection** — Optional Netlify password gate
- **Custom domain support** — Hook up a custom domain via Netlify API

## Code Style

- ES Modules (`.mjs`) throughout
- No TypeScript (keeps the barrier to entry low)
- Clear comments explaining *why*, not *what*
- Error messages should be human-friendly
- Prefer `async/await` over `.then()`

## Testing

There's no automated test suite (yet — feel free to add one!). To test:

1. Set up your `.env` with real API keys
2. Run `npm start`
3. Test each command in Telegram
4. Make sure error cases produce friendly messages

## PR Guidelines

- Keep PRs focused — one thing at a time
- Update the README if you add features
- Add your example to `examples/sites.md` if relevant
- Don't commit `.env`, `sites.json`, or `node_modules`

## Questions?

Open an issue! This project is friendly and responses are fast.
