---
name: landing-page
description: 'Create a high-converting Secure Techies marketing landing page from just a topic or title (e.g. "MSP transition", "HIPAA compliance for clinics", "ransomware protection for law firms"). Use when the user asks to build/generate/spin up a landing page, lead-gen page, campaign page, PPC/ad page, or conversion page. Produces a complete Hugo page bundle wired to the data-driven landing template, Netlify form, schema, and Lighthouse-optimized assets. Targets ~20% visitor-to-lead conversion with copywriter-grade persuasive copy.'
argument-hint: 'A landing page topic or title (e.g. "Cloud migration for law firms")'
---

# Landing Page On Demand

Generate a complete, conversion-focused landing page for **Secure Techies** (MSP / cybersecurity, Los Angeles) from a single topic. Everything is **data-driven**: you only write a content file (front matter). The template, styles, JS, schema, and form already exist and are Lighthouse-tuned — do **not** rewrite them.

## What already exists (reuse, never recreate)

| Asset | Path | Role |
|---|---|---|
| Template | [layouts/landing/single.html](../../../layouts/landing/single.html) | Renders all sections from front matter |
| Hero background | [layouts/_partials/landing/hero-bg.html](../../../layouts/_partials/landing/hero-bg.html) | Animated grid + orbs + scan-line + particles canvas (pass a canvas id) |
| Partner carousel | [layouts/_partials/landing/partner-logos.html](../../../layouts/_partials/landing/partner-logos.html) | "Certified & partnered" infinite logo marquee |
| Mid-page CTA | [layouts/_partials/landing/cta-band.html](../../../layouts/_partials/landing/cta-band.html) | Reusable centered CTA band (rendered from any section's `cta`) |
| Styles | [assets/css/landing.css](../../../assets/css/landing.css) | `.st-l-*` components + metric-adjusted CLS fonts |
| JS | [assets/js/landing.js](../../../assets/js/landing.js) | Multi-canvas particles, scroll reveals, counters, FAQ, sticky CTA |
| Schema | [layouts/_partials/landing-schema.html](../../../layouts/_partials/landing-schema.html) | FAQPage + Service JSON-LD |
| Thank-you | [layouts/_default/thank-you.html](../../../layouts/_default/thank-you.html) | Post-submit page + GA4 `generate_lead` |
| Header/footer gating | [layouts/_default/baseof.html](../../../layouts/_default/baseof.html) | `landing` / `hide_header` / `hide_footer` flags |

**Premium parity (matches the homepage).** Landing pages reuse the homepage's exact global `.st-*` classes (defined in [assets/css/custom.css](../../../assets/css/custom.css)) so they look identical in quality to the homepage — never duplicate that CSS. Key reused homepage components now baked into the template:
- **Animated hero background** — grid overlay, floating orbs, scan-line, and a `<canvas>` particle field (via the `hero-bg` partial). The final CTA section reuses it with a **second** canvas id (`st-particles-final`).
- **Animated security dashboard** — the homepage's tilting "live monitor" card (traffic-light dots, LIVE pulse, status rows, bar chart, metric strip, floating pills/badge). Driven entirely by `hero.dashboard` front matter, so it adapts to any topic.
- **Certified-partners carousel**, **gradient stats band** (homepage `.st-stats-inner`), **photo service cards** (homepage `.st-svc-card`, rendered as non-linking `<div>`s on landing pages), and **shimmer accent headings** + **animated divider line** under the hero/final headings.

Landing assets load **only** when `landing: true` is set. Header, footer, announcement bar, search modal, and back-to-top are hidden via `hide_header` / `hide_footer`.

## Procedure

1. **Confirm the angle (1 question max).** From the topic, infer the target audience, the pain, and the offer. Only ask the user if the audience or primary CTA is genuinely ambiguous. Otherwise proceed.
2. **Pick a slug + URL.** Short, keyword-rich, lowercase-hyphen (e.g. `cloud-migration-law-firms`). Page lives at `content/english/landing/<slug>/index.md`; set `url: "/<slug>/"`.
3. **Get 2 case-study images** via the Pexels workflow in [references/performance-checklist.md](./references/performance-checklist.md#images). Save to `assets/images/landing/`. Optional — skip if reusing existing images or the page has no case section.
4. **Write the front matter** following [references/frontmatter-schema.md](./references/frontmatter-schema.md). Fill every section the topic warrants; omit a section by leaving its key out. Reuse real company facts (below); invent only plausible, defensible specifics.
5. **Write the copy** in the conversion voice from [references/copywriting.md](./references/copywriting.md). Benefit-led, skimmable, emotionally specific, one clear CTA repeated.
6. **Build + validate.** Run `hugo --quiet`, confirm exit 0 and that `public/<slug>/index.html` exists. Check the FAQPage + Service schema rendered.
7. **Lighthouse (optional but recommended).** Follow [references/performance-checklist.md](./references/performance-checklist.md#lighthouse). Use `lighthouse@12` (not 11 — it crashes on Node ≥ 20). Target: A11y/BP/SEO = 100, CLS green, JS deferred.
8. **Report** to the user in plain language + the technical term in parentheses (their stated preference), and note the live URL `/<slug>/`.

## Locked company facts (use verbatim)

- Name: **Secure Techies** · Founded **2009** · Los Angeles / Canoga Park
- Address: 21515 Vanowen St Suite 1110, Canoga Park, CA 91303
- Phone: **(818) 431-5607** (`tel:+18184315607`) — pulled automatically from `site.Params.contact_phone`; don't hardcode in copy
- Reviews baseline: **5★** displayed on landing heroes (rating_value: "5"); Google profile shows **~4.8★ from 120+** businesses
- Services: Managed IT, Cybersecurity, MSP Transition, Cloud / Microsoft 365, Backup & DR, Compliance (HIPAA/CMMC/SOC 2/PCI), Help Desk, **Web Development & Design**
- Form → **Netlify** (`data-netlify="true"`) → redirects to `/thank-you/`
- Service-card photos live in `static/images/services/*.webp` (reuse via relURL); reviewer headshots in `static/images/landing/reviews/*.jpg`

## Non-negotiables

- **One offer, one CTA.** Every CTA scrolls to `#st-landing-final` or calls the phone. No competing links — the photo service cards are non-linking `<div>`s on purpose (they describe services without sending the visitor off-page; reinforce on-page with a `footnote` mentioning web development & design).
- `landing: true`, `hide_header: true`, `hide_footer: true` — always.
- **Legibility is non-negotiable.** Section headings use `.st-l-h2`, which is colored automatically by section tone (`.st-l-dark`/`.st-l-darker`/`.st-l-final` → light text; `.st-l-light`/`.st-l-white` → dark text). Never leave an `.st-l-h2` without its section-tone wrapper, or the theme's global heading color makes it invisible (dark-on-dark). Eyebrows on dark/gradient bands use `.st-l-eyebrow--light`.
- **Premium parity.** Always include the animated `hero.dashboard`, the single `hero.badge`, `hero.trust_items`, the partner carousel, the gradient stats band, photo service cards, and per-section `cta` bands — these are what make the page match homepage quality. Vary the long sections (timeline for `process`, split-image for `benefits`, photo cards for `services`) so three card-grids never stack back-to-back.
- Reviews must be **real** (from user-supplied Google screenshots) or clearly marked `Placeholder Name N` until the user provides them. Never fabricate named testimonials as if real. Gender-match headshots to names (download copyright-free Pexels portraits via **curl**, not urllib — see performance checklist).
- Honest stats only. Invent specifics that are plausible and defensible; never claim false certifications or numbers.
- Accessibility: text on dark backgrounds needs contrast ≥ 4.5:1. Every `<img>` gets `width`/`height` + alt. Mobile: the dashboard keeps a gentle 3D depth (not flat), grids collapse to 1–2 columns, and reduced-motion disables animations — all handled in CSS, but keep copy short enough to not overflow cards on a phone.

## Premium-polish lessons (hard-won in production — do not regress)

These are real bugs that shipped on the first pass. The fixes are now baked into the shared
template/CSS/JS, so new pages inherit them automatically — but if you ever touch those files,
preserve these invariants:

- **Hero must be its own positioning context.** `.st-l-hero` requires `position: relative; overflow: clip; isolation: isolate;`. Without `position: relative`, the `absolute inset-0` background layers (grid/orbs/particles) anchor to the viewport instead of the hero, so the background "gets cut off" and shows a flat navy block. `overflow: clip` on the hero (and `overflow-x: clip` on `.st-landing-body`) is also what kills mobile horizontal scroll/shift.
- **Keep hero vertical padding moderate.** The hero grid is `align-items: center`, so a tall security dashboard makes the whole hero grow and the copy float in a too-tall band. Keep `.st-l-hero` padding restrained (around `padding-top: 40px; padding-bottom: 54px`) so the hero stays compact — shrink the padding, NOT the dashboard, if the hero ever feels oversized. Do not touch `.st-l-hero-grid` columns (`1fr 1.08fr`), which set the dashboard size.
- **The hero badge is an inline pill, not a block.** The global `.st-badge` has no `display` set, so it defaults to `block` and stretches full-width on a landing page. Always render the hero badge as `.st-badge ... inline-flex items-center gap-2` (and `.st-l-hero-badge` sets `display: inline-flex; width: auto`). It must look identical to the homepage pill.
- **Seamless shimmer loop.** A shimmer heading only loops cleanly if the gradient's first and last color stops are identical and the animation travels exactly one tile (`background-size: 200% auto`; animate `background-position` by `-200%`). Mismatched edge colors produce a visible "jump" each cycle.
- **Dashboard needs the activity feed.** The homepage live-monitor includes an alert/activity feed under the chart. Drive it from `hero.dashboard.alerts` (each item: `text`, `time`, `color`, `icon`; `icon: info` renders the info-circle, anything else renders a check-circle). Omit `alerts` to fall back to sensible security defaults. A dashboard without the feed looks empty next to the homepage.
- **Images that need cropping must live in `assets/`, not `static/`.** `resources.Get` returns `nil` for files under `static/`, so Hugo can't `Fill`/resize them — they get served raw and look blurry when the template stretches them. Put any photo you intend to crop in `assets/images/...` so `Fill "WxH webp qNN"` produces a sharp, correctly-sized webp. **Never upscale** beyond the source resolution, or it blurs.
- **Benefits photo = a clean, square-cornered, FULL-HEIGHT frame contained in the column — never a full-bleed crop.** An earlier version bled the photo to the left screen edge with a negative `margin-left`; it upscaled a too-small source and looked blurry, weirdly cropped, and incohesive — the user rejected it. The correct treatment: `.st-l-split` is a `1fr 1fr` grid with `align-items: stretch`; `.st-l-split-media` is `display: flex; align-self: stretch; min-height: 460px; border-radius: 2px` (square/sharp corners, NOT rounded) and stays inside `.st-l-wrap` (no negative margins, no bleed); the `<img>` is `width:100%; height:100%; object-fit:cover; display:block`. This makes the photo a tall rectangle whose height exactly matches the feature-card list beside it, so the two columns read as one cohesive block. **Do NOT use `position:absolute` on the img** — it failed to paint in testing; the flex + `height:100%` approach renders reliably. **Source the benefits photo from Pexels at high resolution (≥1600px wide), download via curl to `assets/images/landing/`, and `Fill` it tall/portrait (e.g. `760x840 webp q86` with matching `width`/`height`)** so the stretched frame stays sharp. Never reuse a small `static/images/services/*.webp` for the benefits photo — they're low-res and blur when stretched. Pick a photo that crops well when tall (a person/team facing the viewer, subject roughly centered).
- **Process section = centered circular gradient icon steps.** Use the `.st-l-steps` grid where each `.st-l-step-bubble` is a **circular** gradient icon (`border-radius: 50%`, `.st-l-step-bubble--1/2/3` cycled via `mod`) **centered above** its white card (`.st-l-step-node { justify-content: center }`). The bubble renders the step's `icon` (an icon-set key), NOT a number, and there are no horizontal connectors — this matches the premium "emotecon"-style icon row. Give every step an `icon` in front matter.
- **Mobile is >50% of traffic — verify it explicitly.** Center card content on phones, make the before/after case columns stack and center, and **freeze scroll-reveal animations on the final form on mobile** (`opacity:1 !important; transform:none !important`) so the lead-capture form is never stuck invisible. Disable hover-only transforms under `@media (hover: none)` (including the dashboard tilt) so touch users don't get stuck hover states. Make the sticky mobile CTA premium (brighter gradient + stronger shadow).
- **Emphasis sparingly.** Wrap one or two impactful phrases per key heading in `.st-l-hl` (blue) or `.st-l-hl-green` (for money/positive numbers). Use `.st-l-accent-mark` for the small decorative tick. Don't color whole headings.
- **Scroll-driven accent line.** The animated underline can grow on scroll via `.st-l-line-scroll` (JS `initScrollLines()` adds `.is-grown` at ~0.6 intersection). Reduced-motion/no-IntersectionObserver grows it immediately.
- **The mobile hero dashboard must match the homepage, not go flat.** On phones the dashboard keeps a gentle 3D lean (`transform: perspective(1400px) rotateX(4deg)` — pure rotateX is safe horizontally), a strong depth shadow, the **floating stat pills** above, the **floating badge** below, and the **pulse ring** on the first status item (wrap that icon in `.st-shield-wrap` > `.st-pulse-ring`). These are global, so re-enabling the pills/badge at `@media (max-width:480px)` fixes the homepage and every city clone at the same time. A flat, bubble-less, pulse-less dashboard looks cheap on mobile.
- **Scroll-reveal fail-safe must be in-view-only.** `initReveals()` keeps a fail-safe timer, but it may ONLY reveal elements already at/above the fold (`getBoundingClientRect().top < innerHeight`). A blanket "reveal everything after Ns" timer silently kills every below-the-fold scroll animation on mobile (the user scrolls slowly, the timer fires, and everything is already visible by the time they arrive). Leave below-fold elements to the observer.
- **Mobile problem-card glow.** Touch devices have no hover, so the problem cards glow as they scroll through the centre band of the screen: JS `initProbGlow()` toggles `.st-l-glow` via an IntersectionObserver with `rootMargin: -42% 0 -42%`; CSS gives `.st-l-prob-card.st-l-glow` the same lift/border/accent as `:hover`. Runs on no-hover OR narrow viewports only.
- **No cookie banner on landing pages.** The site-wide cookie consent banner distracts from the single conversion goal. It's the theme's globally-`partialCached` banner, so don't try to gate it per-page in the template (the cache makes that unreliable). Hide it with `.st-landing-body .cookie-box { display: none !important; }` in landing.css — scoped to the landing `<body>` class so other pages are untouched.

## Reference files

- [frontmatter-schema.md](./references/frontmatter-schema.md) — every section + field, with a copy-paste skeleton
- [copywriting.md](./references/copywriting.md) — the 20%-conversion voice, section-by-section formulas
- [performance-checklist.md](./references/performance-checklist.md) — Pexels images, Hugo webp, Lighthouse, CLS fonts
