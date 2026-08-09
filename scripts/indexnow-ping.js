#!/usr/bin/env node
/**
 * Post-deploy search notification:
 *   1) Ensure IndexNow key file exists in public/ (from env INDEXNOW_KEY or default).
 *   2) Bing Webmaster SubmitUrlbatch when BING_WEBMASTER_API_KEY is set (reliable for Bing).
 *   3) IndexNow multi-endpoint (Yandex + shared + Bing) with honest success/fail logs.
 *
 * Netlify env vars (recommended):
 *   INDEXNOW_KEY=5f6075356bfd4887826aefb626a581ee
 *   BING_WEBMASTER_API_KEY=<your Bing Webmaster API key>
 *
 * These are TWO different keys. IndexNow key is also hosted as /{key}.txt on the site.
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_INDEXNOW_KEY = "5f6075356bfd4887826aefb626a581ee";
const HOST = "securetechie.com";
const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const SITEMAP = path.join(PUBLIC_DIR, "sitemap.xml");

const KEY = (process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY).trim();
const KEY_FILE = `${KEY}.txt`;
const KEY_LOCATION = `https://${HOST}/${KEY_FILE}`;
const STATIC_KEY = path.join(ROOT, "static", KEY_FILE);
const PUBLIC_KEY = path.join(PUBLIC_DIR, KEY_FILE);

const PRIORITY_PATHS = [
  `/${KEY_FILE}`, // help Bing re-crawl ownership proof first
  "/BingSiteAuth.xml",
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
  "/locations/pasadena/",
  "/locations/burbank/",
  "/locations/glendale/",
  "/blog/",
];

function log(msg) {
  console.log(`[search-notify] ${msg}`);
}
function warn(msg) {
  console.warn(`[search-notify] WARNING: ${msg}`);
}
function error(msg) {
  console.error(`[search-notify] ERROR: ${msg}`);
}

function ensureIndexNowKeyFile() {
  log(`IndexNow key in use: ${KEY}`);
  log(`IndexNow key URL: ${KEY_LOCATION}`);

  // Prefer writing from env so Netlify INDEXNOW_KEY always wins.
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(PUBLIC_KEY, KEY, "utf8");

  // Keep static/ in sync when possible (local dev / git).
  try {
    fs.writeFileSync(STATIC_KEY, KEY, "utf8");
  } catch (e) {
    warn(`Could not write static key file: ${e.message}`);
  }

  const body = fs.readFileSync(PUBLIC_KEY, "utf8").trim();
  if (body !== KEY) {
    error(`public/${KEY_FILE} content mismatch after write.`);
    return false;
  }
  log(`Wrote public/${KEY_FILE} (${body.length} chars).`);
  return true;
}

async function verifyLiveKey() {
  if (process.env.INDEXNOW_SKIP_LIVE_VERIFY === "true") {
    log("Skipping live key verify (INDEXNOW_SKIP_LIVE_VERIFY=true).");
    return true;
  }
  try {
    const res = await fetch(KEY_LOCATION, {
      headers: { "User-Agent": "SecureTechies-IndexNow-Verify/1.0" },
      redirect: "follow",
    });
    const text = (await res.text()).trim();
    if (res.status === 200 && text === KEY) {
      log(`Live key OK (${KEY_LOCATION}).`);
      return true;
    }
    warn(`Live key check HTTP ${res.status}, body length ${text.length}. First deploy of a new key may need one more deploy.`);
    return false;
  } catch (e) {
    warn(`Live key check failed: ${e.message}`);
    return false;
  }
}

function collectUrls() {
  const urls = new Set(PRIORITY_PATHS.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`));

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
    let n = 0;
    for (const u of found) {
      if (urls.has(u)) continue;
      if (u.includes("/services/") || u.includes("/locations/") || u.includes("/tools/")) {
        urls.add(u);
        n += 1;
        if (n >= 30) break;
      }
    }
  }
  return Array.from(urls);
}

async function submitBingWebmaster(urls) {
  const apiKey = (process.env.BING_WEBMASTER_API_KEY || "").trim();
  if (!apiKey) {
    warn(
      "BING_WEBMASTER_API_KEY is not set in Netlify. Bing URL batch submit skipped. " +
        "Add env BING_WEBMASTER_API_KEY with your Bing Webmaster API key (NOT the IndexNow key)."
    );
    return false;
  }

  const batch = urls.slice(0, 25);
  log(`Bing SubmitUrlbatch: ${batch.length} URLs ...`);
  try {
    const res = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ siteUrl: `https://${HOST}`, urlList: batch }),
      }
    );
    const text = await res.text().catch(() => "");
    if (res.status === 200) {
      log(`Bing SubmitUrlbatch SUCCESS (HTTP 200).`);
      return true;
    }
    error(`Bing SubmitUrlbatch HTTP ${res.status}: ${text.slice(0, 300)}`);
    return false;
  } catch (e) {
    error(`Bing SubmitUrlbatch failed: ${e.message}`);
    return false;
  }
}

async function submitIndexNow(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 100),
  };

  // Also try option-1 style payload without keyLocation (root key file).
  const payloadRoot = {
    host: HOST,
    key: KEY,
    urlList: urls.slice(0, 100),
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  let anyOk = false;

  for (const endpoint of endpoints) {
    for (const [label, body] of [
      ["with keyLocation", payload],
      ["root key only", payloadRoot],
    ]) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(body),
        });
        const text = await res.text().catch(() => "");
        if (res.status === 200 || res.status === 202) {
          log(`IndexNow SUCCESS ${endpoint} (${label}) HTTP ${res.status}`);
          anyOk = true;
          break; // next endpoint
        }
        warn(`IndexNow ${endpoint} (${label}) HTTP ${res.status} ${text.slice(0, 160)}`);
      } catch (e) {
        warn(`IndexNow ${endpoint} error: ${e.message}`);
      }
    }
  }

  if (!anyOk) {
    error(
      "Bing IndexNow still rejected all attempts (403 = ownership not trusted by Bing yet). " +
        "Yandex may still succeed separately. " +
        "ACTION FOR BING: In Bing Webmaster Tools, re-verify the site using XML file verification " +
        "(BingSiteAuth.xml is now hosted at /BingSiteAuth.xml). " +
        "Microsoft Q&A: verifying Bing via Google Search Console import can break IndexNow until re-verified with XML. " +
        "Bing SubmitUrlbatch remains the reliable Bing path when BING_WEBMASTER_API_KEY is set."
    );
  }
  return anyOk;
}

async function main() {
  if (process.env.CONTEXT && process.env.CONTEXT !== "production") {
    log(`Skipping (Netlify context: ${process.env.CONTEXT}).`);
    return;
  }

  log("Starting search notify pipeline ...");
  if (!ensureIndexNowKeyFile()) return;

  await verifyLiveKey();
  const urls = collectUrls();
  log(`URL set size: ${urls.length}`);

  // Bing API first (reliable when env is set).
  await submitBingWebmaster(urls);

  // IndexNow second (Yandex often works; Bing may 403 until XML re-verify).
  await submitIndexNow(urls);

  log("Search notify pipeline complete.");
}

main().catch((e) => error(`Unexpected: ${e.message}`));
