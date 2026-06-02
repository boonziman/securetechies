#!/usr/bin/env node
/**
 * IndexNow ping — instantly notifies Bing, Yandex, Seznam, Naver and other
 * IndexNow-enabled search engines whenever the site is (re)deployed.
 *
 * How it works:
 *   1. Reads the freshly built public/sitemap.xml.
 *   2. Extracts every <loc> URL.
 *   3. Submits the full list to the IndexNow API in one batch.
 *
 * Safety:
 *   - Only runs on the Netlify PRODUCTION context (skips deploy previews and
 *     branch deploys, so we never ping with the wrong host).
 *   - Only submits URLs that match the production host, so a misconfigured
 *     baseURL can never leak preview URLs to search engines.
 *   - Never fails the build: any error is logged as a warning and the script
 *     exits 0.
 *
 * The IndexNow key is public by design and is verified via the key file at
 * https://securetechie.com/<key>.txt (served from static/).
 */

const fs = require("fs");
const path = require("path");

const KEY = "61877435df8441a864568fdbd3fb3897";
const HOST = "securetechie.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = path.join(__dirname, "..", "public", "sitemap.xml");

function warn(msg) {
  console.warn(`[indexnow] ${msg}`);
}

async function main() {
  // Only ping from the real production deploy.
  if (process.env.CONTEXT && process.env.CONTEXT !== "production") {
    console.log(`[indexnow] Skipping (Netlify context: ${process.env.CONTEXT}).`);
    return;
  }

  if (!fs.existsSync(SITEMAP)) {
    warn(`Sitemap not found at ${SITEMAP}; nothing to submit.`);
    return;
  }

  const xml = fs.readFileSync(SITEMAP, "utf8");
  const urls = (xml.match(/<loc>([^<]+)<\/loc>/g) || [])
    .map((m) => m.replace(/<\/?loc>/g, "").trim())
    .filter((u) => {
      try {
        return new URL(u).host === HOST;
      } catch {
        return false;
      }
    });

  if (urls.length === 0) {
    warn("No production URLs found in sitemap; nothing to submit.");
    return;
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    // 200 = accepted, 202 = accepted/queued. Anything else is just logged.
    if (res.status === 200 || res.status === 202) {
      console.log(`[indexnow] Submitted ${urls.length} URLs (HTTP ${res.status}).`);
    } else {
      warn(`IndexNow responded HTTP ${res.status}. Submitted ${urls.length} URLs anyway.`);
    }
  } catch (err) {
    warn(`Ping failed (non-fatal): ${err.message}`);
  }
}

main().catch((err) => {
  warn(`Unexpected error (non-fatal): ${err.message}`);
  process.exit(0);
});
