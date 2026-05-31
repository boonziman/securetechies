# Front Matter Schema

The landing page is **100% data-driven**. Create `content/english/landing/<slug>/index.md`. Each top-level key below maps to one section in [single.html](../../../../layouts/landing/single.html). **Omit a key to hide that section.** All text fields accept inline HTML (rendered with `safeHTML`) — use `<b>` for emphasis.

## Page-level keys (required)

```yaml
title: "Primary H1-style SEO title | Benefit + Keyword"
meta_title: "<60-char SERP title — pain + outcome"
meta_description: "<155-char SERP description — pain, promise, CTA."
description: "One-line internal summary."
url: "/your-slug/"

landing: true          # loads landing.css/js, enables CLS fonts
hide_header: true      # remove site nav/announcement/search
hide_footer: true      # remove site footer/back-to-top
draft: false

# Netlify form
form_name: "your-slug-lead"          # unique per page; also used as Netlify form name
form_action: "/thank-you/"
form_service_label: "What do you need most?"
form_services:                        # dropdown options (urlized as values)
  - "Option A"
  - "Option B"
service_name: "Service Name for Schema"   # used by Service JSON-LD
robots: "index, follow"               # use "noindex, nofollow" for paid-only pages you don't want in search
```

Add **"Web Development & Design"** (worded for the niche, e.g. "Law Firm Website & Web Development") to `form_services` — Secure Techies now offers web work and the service cards reference it.

## hero (required)

```yaml
hero:
  badge: "Trusted IT Partner · Southern California"   # ONE pill (niche-worded), not a list of 3
  heading: "Primary pain headline?"
  heading_accent: "Benefit promise."   # rendered in gradient + shimmer accent, appended after heading
  lead: "2–3 sentence empathy + promise paragraph."
  cta_text: "Get My Free X Plan"
  cta_anchor: "#st-landing-final"       # default; keep as-is
  sticky_cta: "Get My Free Plan"         # short label for the mobile sticky bar
  rating_value: "5"                      # display 5/5 stars on the hero
  rating_count: "120"
  trust_items: ["24/7 Support", "No Long-Term Contracts", "Free Risk Assessment"]   # 3, niche-worded
  dashboard:                             # the animated "live monitor" card (homepage component)
    label: "Secure Techies · Transition Monitor"   # header label next to traffic dots + LIVE
    pills:                               # 1–2 floating pills above the card
      - { text: "Zero downtime", dot: "green" }
      - { text: "Fully encrypted", dot: "cyan" }
    status:                              # 3 status rows; color ∈ green|blue|purple|amber, icon = icon key
      - { icon: "shield", label: "Threat Status", value: "All Clear", color: "green" }
      - { icon: "swap",   label: "Migration",     value: "On Track",  color: "blue" }
      - { icon: "lock",   label: "Backups",       value: "Protected", color: "purple" }
    chart_title: "Transition Progress (30 days)"
    chart_legend_a: "Migrated"
    chart_legend_b: "Pending"
    alerts:                              # activity feed under the chart (homepage parity); omit for security defaults
      - { text: "Ransomware attempt blocked",      time: "2m ago", color: "green", icon: "check" }
      - { text: "All endpoints patched & current", time: "8m ago", color: "green", icon: "check" }
      - { text: "Monthly security report ready",   time: "1h ago", color: "blue",  icon: "info"  }
    metrics:                             # 3 small metric-strip stats under the chart
      - { val: "24/7", lbl: "Monitored" }
      - { val: "100%", lbl: "Encrypted" }
      - { val: "0",    lbl: "Downtime" }
    badge: "Migration secured"           # floating badge bottom-corner
```

The single `badge`, `rating_value: "5"`, `trust_items`, and `dashboard` are **premium-parity requirements** — always include them (re-themed to the topic).

## trustbar (deprecated — do not use)

The old thin trust-stat strip is **removed**. Its job is now done by `hero.trust_items` (under the hero) and the gradient `stats` band. Omit `trustbar`.

## problems (optional, high-impact)

```yaml
problems:
  eyebrow: "Sound familiar?"
  heading: "If your provider does any of this, you're overpaying for stress"
  sub: "Optional supporting line."
  items:                  # 4–6 pain cards
    - { icon: "clock", title: "Tickets Sit for Days", text: "Specific, visceral pain." }
  cost_line: "One stat + reframe. Supports <b>bold</b>."   # optional emphasized closer
  cta: "Show Me a Better Way — Free"     # optional → renders a mid-page CTA band scrolling to the form
```

Any section may carry a `cta:` string — it renders the reusable centered CTA band (button → `#st-landing-final`). Add one after `problems`, `benefits`, `services`, and `cases` to keep a CTA always in view.

## process (optional — renders a vertical timeline)

```yaml
process:
  eyebrow: "The switch is painless"
  heading: "How it works in 5 simple steps"
  sub: "Optional."
  steps:                  # numbered automatically, shown on a connected timeline rail
    - { step: "Step 1 · Week 1", title: "Free Discovery", text: "What happens + reassurance." }
```

## benefits (optional — renders a split image + feature list)

```yaml
benefits:
  eyebrow: "Why Secure Techies"
  heading: "What it should actually feel like"
  sub: "Optional."
  image: "images/services/helpdesk-overview.webp"   # left media column (reuse a static/images/services/*.webp or assets/images/landing/*)
  image_badge: "Real engineers, on call"            # small badge over the image
  items:                  # 4–6 feature rows with check icons
    - { icon: "headset", title: "Real Humans, Fast", text: "Benefit, not feature." }
  cta: "Talk to a Real Engineer"   # optional CTA band
```

## services (optional — photo service cards, no links)

Mirrors the homepage's 6 service cards. Rendered as non-linking `<div>`s (visitors stay on-page). Use a `footnote` to mention web development & design and a `cta` to drive to the form.

```yaml
services:
  eyebrow: "Everything under one roof"
  heading: "Full-stack IT, handled"
  sub: "Optional."
  items:                  # ideally 6
    - title: "Managed IT & Help Desk"
      text: "Fast, friendly, senior-level support by phone, email, and chat."
      image: "images/services/helpdesk-overview.webp"   # static/images/services/*.webp (relURL fallback) or assets/images/landing/*
      tag_class: "cyan"     # number-pill color ∈ cyan|green|amber|purple
      badge: "24/7"          # optional small pill on the card
  footnote: "We also offer <b>web development & design</b> services — ask us about your site."
  cta: "Get My Free Assessment"
```

## stats (optional — animated counters on a gradient band)

```yaml
stats:
  eyebrow: "The numbers"
  heading: "Results you can count on"
  items:                  # target is the number to count up to
    - { target: 99.9, suffix: "%", label: "Uptime delivered", sub: "All clients" }
    - { target: 2, prefix: "<", suffix: " hr", label: "Avg. response", sub: "Real engineers" }
```

`target` is numeric. Use `prefix`/`suffix` for symbols. Decimals (e.g. `99.9`) animate with one decimal place.

## reviews (optional — feeds Service schema aggregateRating)

```yaml
reviews:
  eyebrow: "Don't take our word for it"
  heading: "Businesses that switched — and never looked back"
  sub: "Optional."
  rating_value: "4.8"
  rating_count: "120"
  items:                  # ideally 9 (3×3 grid)
    - rating: 5
      text: "Real review text from a Google screenshot."
      name: "First L."           # or "Placeholder Name N" until real ones supplied
      meta: "Office Manager · Healthcare"
      avatar: "images/landing/reviews/firstname.jpg"   # copyright-free, gender-matched headshot (Pexels via curl); falls back to initials if omitted
```

**Never fabricate named reviews as real.** Use `Placeholder Name 1…9` until the user provides screenshots, then transcribe name/text/rating. Company/org reviewers (no person) can omit `avatar` to show initials. Recommend the **3×3 grid** over a carousel — all social proof is visible at once, which converts better than a slider.

## cases (optional — before/after case studies)

```yaml
cases:
  eyebrow: "Real outcomes"
  heading: "Two transitions, zero downtime"
  sub: "Optional."
  items:                  # usually 2
    - title: "Healthcare Clinic, 45 Staff"
      tag: "HIPAA"                         # optional pill on image
      image: "images/landing/case-healthcare.jpg"   # processed → 720x360 webp q82
      before: "The painful starting point."
      after: "The relief after switching."
      results:                            # small stat chips
        - { value: "0", label: "hrs downtime" }
        - { value: "60%", label: "fewer tickets" }
  cta: "Get Results Like These"           # optional CTA band
```

Case cards render with a **before → after** layout separated by a circular "vs" arrow divider.

## guarantees (optional)

```yaml
guarantees:
  eyebrow: "Our promise"
  heading: "Risk is on us, not you"
  items:
    - { icon: "shield", title: "Zero-Downtime Guarantee", text: "What you're promised." }
```

## faq (optional — renders FAQPage schema)

```yaml
faq:
  eyebrow: "Questions?"
  heading: "What businesses ask before switching"
  items:                  # 5–7; q/a — answers feed Google rich results
    - { q: "Will switching disrupt my team?", a: "Direct, reassuring answer with <b>specifics</b>." }
```

## final (required — CTA + Netlify form)

The final section reuses the **animated hero background** (with a second particle canvas, `st-particles-final`) and a **shimmer accent + divider line** on its heading, so the page closes as strongly as it opens.

```yaml
final:
  heading: "Ready to stop babysitting your IT?"
  heading_accent: "Let's Fix That."     # gradient + shimmer accent appended to the heading
  text: "One short reinforcing paragraph."
  points: ["Free, no-obligation plan", "Response in under 2 hours", "No long-term contract"]
  form_title: "Get Your Free Assessment"
  form_sub: "Takes under 2 minutes • No obligation"
  form_btn: "Get My Free Assessment"
```

Form fields are fixed: **Name, Company, Email, Phone** (all required), **Service** (from `form_services`), **Message** (optional). It posts to Netlify and redirects to `form_action`.

## Icon keys

`check` `shield` `clock` `bolt` `phone` `alert` `users` `chart` `lock` `gear` `headset` `doc` `thumb` `swap` `calendar` `money`. Unknown keys fall back safely. Pick the one that best matches each item's meaning.

## Minimal valid skeleton

A page needs at least: page-level keys + `hero` (with `badge`, `rating_value: "5"`, `trust_items`, and `dashboard`) + `final`. Everything else is optional but more sections = more persuasion. A strong, premium-parity page uses: hero → partner carousel (automatic) → problems (+cta) → process (timeline) → benefits (split image, +cta) → services (photo cards, +cta) → stats (gradient band) → reviews (3×3 grid + headshots) → cases (before/after, +cta) → guarantees → faq → final (hero-bg + shimmer).
