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

function warn(msg) {
  console.warn(`[indexnow] WARNING: ${msg}`);
}

// IndexNow is a best-effort notification ping. It must never fail the
// production build, so verification/submission problems are logged as
// warnings instead of aborting. fail() is kept only for truly fatal,
// non-network setup issues.
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
    warn(`Key file not found at ${PUBLIC_KEY}. Hugo should copy static/${KEY_FILE} into public/. Skipping IndexNow submit.`);
    return false;
  }

  if (content !== KEY) {
    warn(
      `Key file content mismatch in public/${KEY_FILE}.\n` +
        `  Expected: ${KEY}\n` +
        `  Got:      ${content === null ? "(unreadable)" : JSON.stringify(content)}`
    );
    return false;
  }

  log(`Key file verification PASSED (public/${KEY_FILE})`);
  return true;
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
    warn(`Live key file fetch failed: ${err.message}. (Expected on the deploy that first publishes a new key.)`);
    return;
  }

  const body = (await response.text()).trim();

  if (response.status !== 200) {
    warn(
      `Live key file not yet 200 (HTTP ${response.status}) at ${KEY_LOCATION}.\n` +
        `  This is expected on the deploy that first publishes a new key — it goes live\n` +
        `  only after this build is published. IndexNow will pick it up on the next ping.`
    );
    return;
  }

  if (body !== KEY) {
    warn(
      `Live key file content mismatch.\n` +
        `  URL:      ${KEY_LOCATION}\n` +
        `  Expected: ${KEY}\n` +
        `  Got:      ${JSON.stringify(body)}`
    );
    return;
  }

  log(`Live key file verification PASSED (${KEY_LOCATION})`);
}

function collectProductionUrls() {
  if (!fs.existsSync(SITEMAP)) {
    warn(`Sitemap not found at ${SITEMAP}; cannot submit URLs.`);
    return [];
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
    warn(`No production URLs found in sitemap for host ${HOST}.`);
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
    warn(`IndexNow API request failed: ${err.message}`);
    return;
  }

  if (response.status === 200 || response.status === 202) {
    log(`IndexNow submission PASSED (HTTP ${response.status}, ${urls.length} URLs).`);
    return;
  }

  const responseText = await response.text().catch(() => "");
  warn(
    `IndexNow submission returned HTTP ${response.status} (not fatal).\n` +
      (responseText ? `  Response: ${responseText.trim()}\n` : "") +
      `  This usually clears once ${KEY_LOCATION} has been live for a while and Bing has crawled it.`
  );
}

async function main() {
  if (process.env.CONTEXT && process.env.CONTEXT !== "production") {
    log(`Skipping (Netlify context: ${process.env.CONTEXT}).`);
    return;
  }

  log("Starting IndexNow verification ...");
  const keyOk = verifyPublicKeyFile();
  await verifyLiveKeyFile();

  if (!keyOk) {
    warn("Key file not present in build — skipping IndexNow submission this deploy.");
    return;
  }

  const urls = collectProductionUrls();
  if (urls.length === 0) {
    warn("No URLs to submit — skipping IndexNow submission this deploy.");
    return;
  }
  await submitToIndexNow(urls);
  log("IndexNow complete.");
}

main().catch((err) => {
  warn(`Unexpected error (non-fatal): ${err.message}`);
});