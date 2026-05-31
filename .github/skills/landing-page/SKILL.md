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
- Accessibility: text on dark backgrounds needs contrast ≥ 4.5:1. Every `<img>` gets `width`/`height` + alt. Mobile: the dashboard drops its 3D tilt, grids collapse to 1–2 columns, and reduced-motion disables animations — all handled in CSS, but keep copy short enough to not overflow cards on a phone.

## Reference files

- [frontmatter-schema.md](./references/frontmatter-schema.md) — every section + field, with a copy-paste skeleton
- [copywriting.md](./references/copywriting.md) — the 20%-conversion voice, section-by-section formulas
- [performance-checklist.md](./references/performance-checklist.md) — Pexels images, Hugo webp, Lighthouse, CLS fonts
