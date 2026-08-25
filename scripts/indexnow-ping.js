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
  "/blog/",
  "/case-studies/",
  "/blog/microsoft-365-business-premium-vs-e3/",
  "/blog/employee-offboarding-it-checklist/",
  "/blog/microsoft-365-backup/",
  "/blog/cyber-insurance-requirements-small-business/",
  "/blog/microsoft-intune-small-business/",
  "/blog/guest-wifi-security-office/",
  "/blog/vendor-risk-management-small-business/",
  "/case-studies/backup-restore-test-tax-season/",
  "/case-studies/microsoft-intune-rollout/",
  "/case-studies/restaurant-guest-wifi-isolation/",
  "/case-studies/warehouse-mobile-surveillance-trailer/",
  "/case-studies/co-managed-it-after-admin-left/",
  "/services/",
  "/services/infrastructure/",
  "/services/managed-help-desk/",
  "/services/cybersecurity/",
  "/services/network-security/",
  "/services/backup-disaster-recovery/",
  "/services/compliance-security-audits/",
  "/services/mobile-cctv-trailers/",
  "/services/web-development/",
  "/managed-it-services/",
  "/managed-it-services-los-angeles/",
  "/managed-it-services-inland-empire/",
  "/contact/",
  "/tools/",
  "/locations/",
  "/locations/pasadena/",
  "/locations/burbank/",
  "/locations/glendale/",
  "/industries/",
  "/industries/law-firms/",
  "/industries/healthcare/",
  "/industries/hospitality/",
  "/industries/warehousing-logistics/",
  "/industries/accounting/",
  "/industries/real-estate/",
  "/industries/manufacturing/",
  "/llms.txt",
  "/llms-full.txt",
  "/.well-known/llms.txt",
  "/sitemap.xml",
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
  const urls = [];
  const seen = new Set();
  const add = (u) => {
    if (!u || seen.has(u)) return;
    try {
      if (new URL(u).host !== HOST) return;
    } catch {
      return;
    }
    seen.add(u);
    urls.push(u);
  };

  for (const p of PRIORITY_PATHS) {
    add(`https://${HOST}${p.startsWith("/") ? p : `/${p}`}`);
  }

  if (fs.existsSync(SITEMAP)) {
    const xml = fs.readFileSync(SITEMAP, "utf8");
    const found = (xml.match(/<loc>([^<]+)<\/loc>/g) || []).map((m) => m.replace(/<\/?loc>/g, "").trim());
    for (const u of found) add(u);
  }

  return urls;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
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

  const batch = urls.slice(0, 500);
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
  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
    "https://search.seznam.cz/indexnow",
    "https://searchadvisor.naver.com/indexnow",
  ];

  let anyOk = false;
  const batches = chunk(urls, 100);
  log(`IndexNow batches: ${batches.length} (${urls.length} URLs).`);

  for (let i = 0; i < batches.length; i += 1) {
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batches[i],
    };

    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(payload),
        });
        const text = await res.text().catch(() => "");
        if (res.status === 200 || res.status === 202) {
          log(`IndexNow SUCCESS ${endpoint} batch ${i + 1}/${batches.length} HTTP ${res.status}`);
          anyOk = true;
        } else {
          warn(
            `IndexNow ${endpoint} batch ${i + 1}/${batches.length} HTTP ${res.status} ${text.slice(0, 160)}`
          );
        }
      } catch (e) {
        warn(`IndexNow ${endpoint} error: ${e.message}`);
      }
    }
  }

  if (!anyOk) {
    error(
      "Every IndexNow endpoint rejected the submit. " +
        "ACTION FOR BING: In Bing Webmaster Tools, re-verify the site using XML file verification " +
        "(BingSiteAuth.xml is hosted at /BingSiteAuth.xml). " +
        "Importing the site from Google Search Console can break IndexNow until XML re-verify. " +
        "Bing SubmitUrlbatch remains the reliable Bing path when BING_WEBMASTER_API_KEY is set."
    );
  }
  return anyOk;
}

async function pingSitemaps() {
  const sitemap = `https://${HOST}/sitemap.xml`;
  const pings = [
    `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemap)}`,
  ];
  for (const url of pings) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "SecureTechies-IndexNow/1.0" } });
      log(`Sitemap ping ${url.split("?")[0]} HTTP ${res.status}`);
    } catch (e) {
      warn(`Sitemap ping failed: ${e.message}`);
    }
  }
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

  // IndexNow second (Yandex, Seznam, Naver usually work; Bing may 403 until XML re-verify).
  await submitIndexNow(urls);
  await pingSitemaps();

  log("Search notify pipeline complete.");
}

main().catch((e) => error(`Unexpected: ${e.message}`));
