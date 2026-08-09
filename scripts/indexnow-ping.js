#!/usr/bin/env node
/**
 * IndexNow ping — notifies Bing, Yandex, Seznam, Naver and other
 * IndexNow-enabled search engines after each production deploy.
 *
 * Ownership is proven by hosting a UTF-8 key file at:
 *   https://{host}/{key}.txt  with body exactly equal to {key}
 *
 * IMPORTANT:
 *   - IndexNow 403 UserForbiddedToAccessSite means ownership failed.
 *     Fix by regenerating the key and deploying a matching key file.
 *   - Do not claim success unless the API returns 200 or 202.
 *   - Optional Bing Webmaster SubmitUrlbatch fallback via env BING_WEBMASTER_API_KEY.
 */

const fs = require("fs");
const path = require("path");

// Must match static/{KEY}.txt filename and file body exactly.
const KEY = "5f6075356bfd4887826aefb626a581ee";
const HOST = "securetechie.com";
const KEY_FILE = `${KEY}.txt`;
const KEY_LOCATION = `https://${HOST}/${KEY_FILE}`;
const ROOT = path.join(__dirname, "..");
const STATIC_KEY = path.join(ROOT, "static", KEY_FILE);
const PUBLIC_KEY = path.join(ROOT, "public", KEY_FILE);
const SITEMAP = path.join(ROOT, "public", "sitemap.xml");

// Prefer a focused priority set so we do not spam engines every deploy.
const PRIORITY_PATHS = [
  "/",
  "/services/",
  "/services/infrastructure/",
  "/services/managed-help-desk/",
  "/services/cybersecurity/",
  "/services/network-security/",
  "/services/backup-disaster-recovery/",
  "/services/compliance-security-audits/",
  "/services/mobile-cctv-trailers/",
  "/services/web-development/",
  "/managed-it-services-los-angeles/",
  "/contact/",
  "/tools/",
  "/locations/",
  "/blog/",
];

function log(msg) {
  console.log(`[indexnow] ${msg}`);
}

function warn(msg) {
  console.warn(`[indexnow] WARNING: ${msg}`);
}

function error(msg) {
  console.error(`[indexnow] ERROR: ${msg}`);
}

function readKeyContent(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8").trim();
}

function ensurePublicKeyFile() {
  log("Checking key file in public/ ...");
  let content = readKeyContent(PUBLIC_KEY);

  if (content !== KEY) {
    const staticContent = readKeyContent(STATIC_KEY);
    if (staticContent === KEY) {
      log("Copying key file from static/ into public/ ...");
      fs.copyFileSync(STATIC_KEY, PUBLIC_KEY);
      content = readKeyContent(PUBLIC_KEY);
    }
  }

  if (!fs.existsSync(PUBLIC_KEY)) {
    error(`Key file missing at public/${KEY_FILE}. Expected static/${KEY_FILE} to be present in the repo.`);
    return false;
  }

  if (content !== KEY) {
    error(
      `Key file content mismatch in public/${KEY_FILE}.\n` +
        `  Expected: ${KEY}\n` +
        `  Got:      ${content === null ? "(unreadable)" : JSON.stringify(content)}`
    );
    return false;
  }

  log(`Key file OK (public/${KEY_FILE})`);
  return true;
}

async function verifyLiveKeyFile() {
  if (process.env.INDEXNOW_SKIP_LIVE_VERIFY === "true") {
    log("Skipping live key verification (INDEXNOW_SKIP_LIVE_VERIFY=true).");
    return { ok: true, skipped: true };
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
    warn(`Live key fetch failed: ${err.message}. On the first deploy of a new key this is expected.`);
    return { ok: false, pending: true };
  }

  const body = (await response.text()).trim();

  if (response.status !== 200) {
    warn(
      `Live key not HTTP 200 yet (got ${response.status}) at ${KEY_LOCATION}. ` +
        `First deploy of a new key often needs a second deploy before IndexNow accepts it.`
    );
    return { ok: false, pending: true };
  }

  if (body !== KEY) {
    error(
      `Live key body mismatch.\n` +
        `  URL:      ${KEY_LOCATION}\n` +
        `  Expected: ${KEY}\n` +
        `  Got:      ${JSON.stringify(body)}`
    );
    return { ok: false, pending: false };
  }

  log(`Live key verification PASSED (${KEY_LOCATION})`);
  return { ok: true, pending: false };
}

function collectUrls() {
  const urls = new Set(PRIORITY_PATHS.map((p) => `https://${HOST}${p}`));

  if (fs.existsSync(SITEMAP)) {
    const xml = fs.readFileSync(SITEMAP, "utf8");
    const found = (xml.match(/<loc>([^<]+)<\/loc>/g) || [])
      .map((m) => m.replace(/<\/?loc>/g, "").trim())
      .filter((u) => {
        try {
          return new URL(u).host === HOST;
        } catch {
          return false;
        }
      });

    // Cap total submit size to avoid spammy full-sitemap dumps while key trust rebuilds.
    const maxExtra = 40;
    let added = 0;
    for (const u of found) {
      if (urls.has(u)) continue;
      // Prefer services + locations + tools first
      if (
        u.includes("/services/") ||
        u.includes("/locations/") ||
        u.includes("/tools/") ||
        u.includes("/blog/")
      ) {
        urls.add(u);
        added += 1;
        if (added >= maxExtra) break;
      }
    }
  } else {
    warn(`Sitemap not found at ${SITEMAP}; submitting priority URLs only.`);
  }

  return Array.from(urls);
}

async function submitIndexNow(urls) {
  log(`Submitting ${urls.length} URLs to IndexNow endpoints ...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  // Shared hub + Bing + Yandex (honest per-engine results).
  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  let anyOk = false;

  for (const endpoint of endpoints) {
    let response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      warn(`${endpoint} request failed: ${err.message}`);
      continue;
    }

    const text = await response.text().catch(() => "");
    if (response.status === 200 || response.status === 202) {
      log(`IndexNow SUCCESS via ${endpoint} (HTTP ${response.status}).`);
      anyOk = true;
      continue;
    }

    warn(
      `IndexNow ${endpoint} returned HTTP ${response.status}` +
        (text ? ` — ${text.trim().slice(0, 240)}` : "")
    );
  }

  if (!anyOk) {
    error(
      `No IndexNow endpoint accepted this batch. Key must stay live at ${KEY_LOCATION}. ` +
        `Bing may return 403 until it crawls the key file; Yandex often accepts sooner. ` +
        `Set BING_WEBMASTER_API_KEY for SubmitUrlbatch as a reliable Bing path.`
    );
  }

  return anyOk;
}

async function submitBingWebmaster(urls) {
  const apiKey = process.env.BING_WEBMASTER_API_KEY;
  if (!apiKey) {
    log("BING_WEBMASTER_API_KEY not set — skipping Bing SubmitUrlbatch fallback.");
    return;
  }

  // Bing batch quota is limited; keep a tight priority list.
  const batch = urls.slice(0, 20);
  log(`Submitting ${batch.length} URLs via Bing Webmaster SubmitUrlbatch ...`);

  try {
    const response = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          siteUrl: `https://${HOST}`,
          urlList: batch,
        }),
      }
    );
    const text = await response.text().catch(() => "");
    if (response.status === 200) {
      log(`Bing SubmitUrlbatch SUCCESS (HTTP 200, ${batch.length} URLs).`);
    } else {
      warn(`Bing SubmitUrlbatch HTTP ${response.status}: ${text.slice(0, 300)}`);
    }
  } catch (err) {
    warn(`Bing SubmitUrlbatch failed: ${err.message}`);
  }
}

async function main() {
  if (process.env.CONTEXT && process.env.CONTEXT !== "production") {
    log(`Skipping (Netlify context: ${process.env.CONTEXT}).`);
    return;
  }

  log("Starting IndexNow pipeline ...");
  log(`Key: ${KEY}`);
  log(`Key location: ${KEY_LOCATION}`);

  const keyOk = ensurePublicKeyFile();
  if (!keyOk) {
    error("Aborting IndexNow submit — key file not ready in build output.");
    // Still try Bing API fallback if configured
    await submitBingWebmaster(PRIORITY_PATHS.map((p) => `https://${HOST}${p}`));
    return;
  }

  const live = await verifyLiveKeyFile();
  const urls = collectUrls();

  if (urls.length === 0) {
    warn("No URLs to submit.");
    return;
  }

  // Always attempt IndexNow if key is in the build; live pending may still accept after CDN warm.
  const ok = await submitIndexNow(urls);
  if (!ok && live.pending) {
    warn(
      "IndexNow did not succeed on this deploy. If this was the first deploy of a new key, " +
        "wait for the key URL to be live worldwide, then redeploy or re-run this script."
    );
  }

  // Independent fallback that already works for this property.
  await submitBingWebmaster(urls);

  log("IndexNow pipeline complete.");
}

main().catch((err) => {
  error(`Unexpected error: ${err.message}`);
});
