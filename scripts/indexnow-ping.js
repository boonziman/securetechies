#!/usr/bin/env node
/**
 * IndexNow ping — notifies Bing, Yandex, Seznam, Naver and other
 * IndexNow-enabled search engines after each production deploy.
 *
 * Flow:
 *   1. Verify the key file exists in public/ with the exact expected content.
 *   2. Verify the key file is reachable on the live site.
 *   3. Read public/sitemap.xml and submit all production URLs to IndexNow.
 *
 * Fails the build (exit 1) if verification or submission fails so problems
 * are visible in Netlify instead of failing silently.
 *
 * One-time recovery: if the key file has never been live, set
 * INDEXNOW_SKIP_LIVE_VERIFY=true in Netlify env vars for a single deploy,
 * confirm the URL returns 200, then remove the variable.
 */

const fs = require("fs");
const path = require("path");

const KEY = "61877435df8441a864568fdbd3fb3897";
const HOST = "securetechie.com";
const KEY_FILE = `${KEY}.txt`;
const KEY_LOCATION = `https://${HOST}/${KEY_FILE}`;
const ROOT = path.join(__dirname, "..");
const STATIC_KEY = path.join(ROOT, "static", KEY_FILE);
const PUBLIC_KEY = path.join(ROOT, "public", KEY_FILE);
const SITEMAP = path.join(ROOT, "public", "sitemap.xml");

function log(msg) {
  console.log(`[indexnow] ${msg}`);
}

function error(msg) {
  console.error(`[indexnow] ERROR: ${msg}`);
}

function fail(msg) {
  error(msg);
  process.exit(1);
}

function readKeyContent(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8").trim();
}

function verifyPublicKeyFile() {
  log("Checking key file in public/ ...");

  let content = readKeyContent(PUBLIC_KEY);

  if (content !== KEY) {
    const staticContent = readKeyContent(STATIC_KEY);
    if (staticContent === KEY) {
      log("Key missing or invalid in public/ — copying from static/ ...");
      fs.copyFileSync(STATIC_KEY, PUBLIC_KEY);
      content = readKeyContent(PUBLIC_KEY);
    }
  }

  if (!fs.existsSync(PUBLIC_KEY)) {
    fail(`Key file not found at ${PUBLIC_KEY}. Hugo must copy static/${KEY_FILE} into public/.`);
  }

  if (content !== KEY) {
    fail(
      `Key file content mismatch in public/${KEY_FILE}.\n` +
        `  Expected: ${KEY}\n` +
        `  Got:      ${content === null ? "(unreadable)" : JSON.stringify(content)}`
    );
  }

  log(`Key file verification PASSED (public/${KEY_FILE})`);
}

async function verifyLiveKeyFile() {
  if (process.env.INDEXNOW_SKIP_LIVE_VERIFY === "true") {
    log("Skipping live key verification (INDEXNOW_SKIP_LIVE_VERIFY=true).");
    return;
  }

  log(`Checking live key file at ${KEY_LOCATION} ...`);

  let response;
  try {
    response = await fetch(KEY_LOCATION, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "SecureTechies-IndexNow-Verify/1.0" },
    });
  } catch (err) {
    fail(`Live key file fetch failed: ${err.message}`);
  }

  const body = (await response.text()).trim();

  if (response.status !== 200) {
    fail(
      `Live key file verification FAILED (HTTP ${response.status}).\n` +
        `  URL: ${KEY_LOCATION}\n` +
        `  The build artifact contains the key, but the live site does not serve it yet.\n` +
        `  Fix: Netlify → Deploys → Trigger deploy → Clear cache and deploy site.\n` +
        `  If this is the first recovery deploy, set INDEXNOW_SKIP_LIVE_VERIFY=true for one build,` +
        ` then remove it after https://${HOST}/${KEY_FILE} returns 200.`
    );
  }

  if (body !== KEY) {
    fail(
      `Live key file content mismatch.\n` +
        `  URL:      ${KEY_LOCATION}\n` +
        `  Expected: ${KEY}\n` +
        `  Got:      ${JSON.stringify(body)}`
    );
  }

  log(`Live key file verification PASSED (${KEY_LOCATION})`);
}

function collectProductionUrls() {
  if (!fs.existsSync(SITEMAP)) {
    fail(`Sitemap not found at ${SITEMAP}; cannot submit URLs.`);
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
    fail(`No production URLs found in sitemap for host ${HOST}.`);
  }

  return urls;
}

async function submitToIndexNow(urls) {
  log(`Submitting ${urls.length} URLs to IndexNow ...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  let response;
  try {
    response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    fail(`IndexNow API request failed: ${err.message}`);
  }

  if (response.status === 200 || response.status === 202) {
    log(`IndexNow submission PASSED (HTTP ${response.status}, ${urls.length} URLs).`);
    return;
  }

  const responseText = await response.text().catch(() => "");
  fail(
    `IndexNow submission FAILED (HTTP ${response.status}).\n` +
      (responseText ? `  Response: ${responseText.trim()}\n` : "") +
      `  Ensure ${KEY_LOCATION} returns HTTP 200 with the key before submitting.`
  );
}

async function main() {
  if (process.env.CONTEXT && process.env.CONTEXT !== "production") {
    log(`Skipping (Netlify context: ${process.env.CONTEXT}).`);
    return;
  }

  log("Starting IndexNow verification ...");
  verifyPublicKeyFile();
  await verifyLiveKeyFile();

  const urls = collectProductionUrls();
  await submitToIndexNow(urls);
  log("IndexNow complete.");
}

main().catch((err) => {
  fail(`Unexpected error: ${err.message}`);
});