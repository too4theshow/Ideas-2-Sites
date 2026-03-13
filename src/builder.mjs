/**
 * builder.mjs
 * Calls Claude API with the site-builder system prompt to generate a complete HTML site.
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load the system prompt once at startup
const SYSTEM_PROMPT = readFileSync(
  join(__dirname, 'prompts', 'site-builder.md'),
  'utf-8'
);

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-5';

/**
 * Generate a complete HTML website for the given topic/prompt.
 * @param {string} userPrompt - The user's topic or request
 * @param {object} options - Optional config (style preference, etc.)
 * @returns {Promise<{ html: string, title: string, slug: string }>}
 */
export async function buildSite(userPrompt, options = {}) {
  console.log(`🤖 Building site for: "${userPrompt}"`);

  const styleHint = options.style
    ? `\n\nUser's preferred style: ${options.style}`
    : '';

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Build me a stunning website about: ${userPrompt}${styleHint}

Remember: output ONLY the raw HTML. Start with <!DOCTYPE html> and end with </html>. No explanations, no markdown fences.`,
      },
    ],
  });

  const rawOutput = response.content[0].text;

  // Extract HTML — handle both raw HTML and accidentally-wrapped HTML
  const html = extractHTML(rawOutput);

  if (!isValidHTML(html)) {
    throw new Error('Claude returned invalid HTML. Please try again.');
  }

  // Extract title for the slug
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : userPrompt;
  const slug = slugify(userPrompt);

  console.log(`✅ Site built: "${title}" (${html.length.toLocaleString()} chars)`);

  return { html, title, slug };
}

/**
 * Extract HTML from Claude's response, handling edge cases
 */
function extractHTML(text) {
  // If it starts with <!DOCTYPE — perfect, return as-is
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    return text.trim();
  }

  // Try to extract from a ```html block
  const fenceMatch = text.match(/```html\s*([\s\S]*?)```/i);
  if (fenceMatch) return fenceMatch[1].trim();

  // Try to extract from any ``` block
  const genericFence = text.match(/```\s*([\s\S]*?)```/);
  if (genericFence) return genericFence[1].trim();

  // Try to find <!DOCTYPE anywhere in the text
  const doctypeIdx = text.indexOf('<!DOCTYPE');
  if (doctypeIdx !== -1) return text.slice(doctypeIdx).trim();

  const htmlIdx = text.indexOf('<html');
  if (htmlIdx !== -1) return text.slice(htmlIdx).trim();

  // Give up and return raw — validation will catch it
  return text.trim();
}

/**
 * Basic HTML validation
 */
function isValidHTML(html) {
  return (
    typeof html === 'string' &&
    html.length > 500 &&
    (html.includes('<!DOCTYPE') || html.includes('<html')) &&
    html.includes('</html>') &&
    html.includes('<body')
  );
}

/**
 * Convert a topic into a URL-friendly slug
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50); // Netlify subdomain limit
}
