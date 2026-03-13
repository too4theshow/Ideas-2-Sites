/**
 * deployer.mjs
 * Deploys a single-file HTML site to Netlify using the direct file upload API.
 * No CLI required — pure API calls.
 */

import { createHash } from 'crypto';

const NETLIFY_API = 'https://api.netlify.com/api/v1';
const AUTH_TOKEN = process.env.NETLIFY_AUTH_TOKEN;
const SITE_PREFIX = process.env.SITE_PREFIX || 'ideas2site';

if (!AUTH_TOKEN) {
  throw new Error('NETLIFY_AUTH_TOKEN is not set in environment variables');
}

/**
 * Deploy an HTML string to Netlify and return the live URL.
 * @param {string} html - Complete HTML content
 * @param {string} slug - URL-friendly name for the site
 * @returns {Promise<{ url: string, siteId: string, siteName: string }>}
 */
export async function deploySite(html, slug) {
  const siteName = await getAvailableSiteName(slug);
  console.log(`🚀 Deploying to Netlify as: ${siteName}`);

  // Step 1: Create the Netlify site
  const site = await createNetlifySite(siteName);

  // Step 2: Deploy via file digest API
  const htmlBuffer = Buffer.from(html, 'utf-8');
  const sha1 = createHash('sha1').update(htmlBuffer).digest('hex');
  const filePath = '/index.html';

  // Start a deploy with the file manifest
  const deploy = await netlifyFetch(`/sites/${site.id}/deploys`, {
    method: 'POST',
    body: JSON.stringify({
      files: { [filePath]: sha1 },
      async: false,
    }),
  });

  // Step 3: Upload the file if Netlify says it's required
  if (deploy.required && deploy.required.includes(sha1)) {
    await netlifyFetch(`/deploys/${deploy.id}/files${filePath}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/octet-stream' },
      rawBody: htmlBuffer,
    });
  }

  // Step 4: Wait for deploy to be ready
  const finalDeploy = await waitForDeploy(deploy.id);
  const url = `https://${siteName}.netlify.app`;

  console.log(`✅ Live at: ${url}`);
  return { url, siteId: site.id, siteName };
}

/**
 * Find an available site name, appending a random suffix if taken
 */
async function getAvailableSiteName(slug) {
  const base = `${SITE_PREFIX}-${slug}`.slice(0, 60);

  // Check if name is available by trying a short random suffix loop
  for (let attempt = 0; attempt < 5; attempt++) {
    const name = attempt === 0 ? base : `${base}-${randomSuffix()}`;
    const available = await checkSiteNameAvailable(name);
    if (available) return name;
  }

  // Fallback: always unique
  return `${base}-${Date.now()}`;
}

async function checkSiteNameAvailable(name) {
  try {
    const sites = await netlifyFetch(`/sites?name=${encodeURIComponent(name)}`);
    return !Array.isArray(sites) || sites.length === 0;
  } catch {
    return true; // Assume available on error
  }
}

async function createNetlifySite(name) {
  return netlifyFetch('/sites', {
    method: 'POST',
    body: JSON.stringify({
      name,
      custom_domain: null,
    }),
  });
}

async function waitForDeploy(deployId, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const deploy = await netlifyFetch(`/deploys/${deployId}`);

    if (deploy.state === 'ready') return deploy;
    if (deploy.state === 'error') {
      throw new Error(`Netlify deploy failed: ${deploy.error_message || 'Unknown error'}`);
    }

    // Wait 2 seconds between polls
    await sleep(2000);
  }

  throw new Error('Netlify deploy timed out after 60 seconds');
}

/**
 * Generic Netlify API fetch helper
 */
async function netlifyFetch(path, options = {}) {
  const { method = 'GET', body, headers = {}, rawBody } = options;

  const fetchOptions = {
    method,
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      ...(!rawBody && { 'Content-Type': 'application/json' }),
      ...headers,
    },
  };

  if (rawBody) {
    fetchOptions.body = rawBody;
  } else if (body) {
    fetchOptions.body = body;
  }

  const res = await fetch(`${NETLIFY_API}${path}`, fetchOptions);

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'No response body');
    throw new Error(`Netlify API error ${res.status}: ${errorText}`);
  }

  // Some endpoints return empty body (e.g., file uploads)
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
