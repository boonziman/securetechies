# Performance, Images & Lighthouse Checklist

The template, CSS, and JS are already tuned for high Lighthouse scores. Keep new pages fast by following the rules below. Measured baseline for the MSP-transition page: **Desktop** Perf 90 / A11y 100 / BP 100 / SEO 100, LCP 1.3s, CLS ~0.11, TBT 0ms. **Mobile** Perf 70 / A11y 100 / BP 100 / SEO 100, LCP 5.2s, CLS 0, TBT 30ms. (Mobile Perf is capped by the site-wide render-blocking CSS + GTM — a known, deferred site-wide item, not a per-page issue.)

## Images {#images}

Use Pexels for case-study / hero imagery (free, license-clear).

1. **Download via the Pexels API** (key may rotate — ask the user if it 401s):
   ```bash
   curl -s -H "Authorization: Pxs4l9L8cUglCyPGgCsi164C298d0xuBya8sqmAnNMYw7sihztxjEwQV" \
     "https://api.pexels.com/v1/search?query=medical+office+team&per_page=3&orientation=landscape" \
     | python3 -c "import sys,json;[print(p['src']['large']) for p in json.load(sys.stdin)['photos']]"
   ```
   Then `curl -sL "<src_url>" -o "assets/images/landing/case-<name>.jpg"`.
2. Save into `assets/images/landing/`. Reference in front matter as `images/landing/case-<name>.jpg`.
3. The template runs Hugo's pipeline `.Fill "720x360 webp q82"` automatically → modern **WebP**, correct dimensions, lazy-loaded. You do **not** add `<img>` tags.
4. Pick photos that look like real LA businesses (offices, teams, clinics, law firms). Avoid stocky handshake clichés. Always set descriptive alt via the case `title`.
5. **Service-card / benefit-split images** can reuse already-optimized repo photos in `static/images/services/*.webp` (e.g. `helpdesk-overview.webp`, `cybersecurity-overview.webp`, `cloud-overview.webp`, `backup-overview.webp`, `network-overview.webp`, `compliance-overview.webp`). Reference them by `images/services/<name>.webp`; the template resolves static paths via `relURL` fallback (no re-processing needed).

### Reviewer headshots {#headshots}

For named reviews, download **copyright-free, gender-matched** portrait headshots:
```bash
# 1) get candidate portrait URLs (women + men)
curl -s -H "Authorization: Pxs4l9L8cUglCyPGgCsi164C298d0xuBya8sqmAnNMYw7sihztxjEwQV" \
  "https://api.pexels.com/v1/search?query=professional+woman+headshot&per_page=20&orientation=portrait" \
  | python3 -c "import sys,json;[print(p['src']['medium']) for p in json.load(sys.stdin)['photos']]"
# 2) download + square-crop to 160x160
curl -sL "<src_url>" -o static/images/landing/reviews/<firstname>.jpg
```
- **Use curl, not Python urllib** — Pexels blocks the default urllib User-Agent (403); curl works.
- Save to `static/images/landing/reviews/<firstname>.jpg`; reference as `images/landing/reviews/<firstname>.jpg`.
- Match the apparent gender of the photo to the reviewer's name. Verify a couple of downloads look professional (the API returns the same query result set, so pick distinct photos). Company/org reviewers omit `avatar` → fall back to initials.

## CLS (layout shift) {#cls}

Already handled — don't undo it:
- `landing.css` defines **metric-adjusted fallback fonts** (`Inter-fallback`, `Jakarta-fallback` with `ascent/descent/size-adjust` overrides) at the top of the file so web-font swap barely shifts. Keep these.
- `baseof.html` preconnects to Google Fonts and loads them with `display=optional` for landing pages.
- All images carry explicit `width`/`height`. The hero canvas and reveal animations use `transform`/`opacity` only (no layout shift).
- `.st-landing-body` sets `overflow-x: clip` to prevent decorative orbs/particles from causing horizontal scroll on mobile.

If you add new fonts or images, preserve these patterns.

## JS / TBT

- `landing.js` is loaded with `defer` and only on `landing: true` pages.
- Particle count auto-scales (22 mobile / 60 desktop) and pauses off-screen / on tab blur.
- All motion respects `prefers-reduced-motion`. Don't add blocking scripts.

## Accessibility (must stay 100)

- Body text on dark sections needs contrast **≥ 4.5:1**. Safe light-on-dark colors already in use: headings `#f1f5f9`, lead/body `#d1d5db`/`#cbd5e1`, muted `#93a3ba`. Avoid going dimmer than `#93a3ba` on the darkest backgrounds.
- **Section headings (`.st-l-h2`) get their color from the section-tone wrapper** (`.st-l-dark`/`.st-l-darker`/`.st-l-final` → light; `.st-l-light`/`.st-l-white` → dark). Never output an `.st-l-h2` outside a toned section, or the theme's global heading color makes it invisible. Eyebrows on dark/gradient bands use `.st-l-eyebrow--light`.
- Every interactive control has a label / `aria-*`. Form inputs are labeled; the FAQ uses `aria-expanded`.
- Don't remove the `alt` fallbacks or the logo `width`/`height`.

## Build & validate

```bash
# from repo root
hugo --quiet            # must exit 0
ls public/<slug>/index.html   # confirm output
```
Confirm in the built HTML: header/nav absent, `landing.css`/`landing.js` linked (fingerprinted in prod), case images are `.webp`, and the page contains `FAQPage` + `Service` JSON-LD.

## Lighthouse {#lighthouse}

**Use `lighthouse@12`, not 11** — Lighthouse 11's trace gatherer crashes on Node ≥ 20 ("frame_sequence" error) and reports false CLS/LCP.

```bash
# 1) build for a local origin
hugo --quiet --baseURL "http://localhost:8099/" --destination /tmp/public_lh
# 2) serve (a simple static server with gzip/brotli mimics Netlify; `python3 -m http.server` works for a rough check)
python3 -m http.server 8099 --directory /tmp/public_lh &
# 3) audit desktop
npx --yes lighthouse@12 http://localhost:8099/<slug>/ --quiet \
  --chrome-flags="--headless --no-sandbox" --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=/tmp/lh.json
# 4) read scores
node -e "const d=require('/tmp/lh.json'),c=d.categories,a=d.audits;for(const k in c)console.log(k,Math.round(c[k].score*100));console.log('LCP',a['largest-contentful-paint'].displayValue,'CLS',a['cumulative-layout-shift'].displayValue,'TBT',a['total-blocking-time'].displayValue)"
```
Drop `--preset=desktop` for the mobile run. Kill the server and clean `/tmp` when done.

**Targets:** Accessibility / Best-Practices / SEO = **100**; CLS in the green (< 0.1 ideal, ≤ 0.12 acceptable given cold-cache font swap); LCP green on desktop. Mobile Performance is gated by site-wide render-blocking assets — acceptable until that deferred site-wide optimization is done.
