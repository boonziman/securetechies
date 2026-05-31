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

## hero (required)

```yaml
hero:
  badges: ["Zero downtime guaranteed", "No long-term contract", "15+ years in LA"]  # 2–3, each gets a check icon
  heading: "Primary pain headline?"
  heading_accent: "Benefit promise."   # rendered in gradient accent color, appended after heading
  lead: "2–3 sentence empathy + promise paragraph."
  cta_text: "Get My Free X Plan"
  cta_anchor: "#st-landing-final"       # default; keep as-is
  sticky_cta: "Get My Free Plan"         # short label for the mobile sticky bar
  rating_value: "4.8"
  rating_count: "120"
  card:                                  # the animated "live plan" visual (optional but recommended)
    title: "Live Transition Plan"
    status: "On track"
    foot: "Your team keeps working — no interruption"
    rows:                                # 4–6 rows; state ∈ done | active | queue
      - { name: "Discovery & risk audit", state: "done" }
      - { name: "Secure migration", state: "active" }
      - { name: "Go-live & hypercare", state: "queue" }
```

## trustbar (optional)

```yaml
trustbar:
  stats:                  # 3–4; icon = an icon key (see list below)
    - { icon: "clock",  value: "<2 hr", label: "avg. response time" }
    - { icon: "shield", value: "99.9%", label: "uptime delivered" }
```

## problems (optional, high-impact)

```yaml
problems:
  eyebrow: "Sound familiar?"
  heading: "If your provider does any of this, you're overpaying for stress"
  sub: "Optional supporting line."
  items:                  # 4–6 pain cards
    - { icon: "clock", title: "Tickets Sit for Days", text: "Specific, visceral pain." }
  cost_line: "One stat + reframe. Supports <b>bold</b>."   # optional emphasized closer
```

## process (optional)

```yaml
process:
  eyebrow: "The switch is painless"
  heading: "How it works in 5 simple steps"
  sub: "Optional."
  steps:                  # numbered automatically
    - { step: "Step 1 · Week 1", title: "Free Discovery", text: "What happens + reassurance." }
```

## benefits (optional)

```yaml
benefits:
  eyebrow: "Why Secure Techies"
  heading: "What it should actually feel like"
  sub: "Optional."
  items:                  # 4–6
    - { icon: "headset", title: "Real Humans, Fast", text: "Benefit, not feature." }
```

## stats (optional — animated counters)

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
      # avatar: "images/landing/review-1.jpg"   # optional; falls back to initial
```

**Never fabricate named reviews as real.** Use `Placeholder Name 1…9` until the user provides screenshots, then transcribe name/text/rating.

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
```

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

```yaml
final:
  heading: "Ready to stop babysitting your IT?"
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

A page needs at least: page-level keys + `hero` + `final`. Everything else is optional but more sections = more persuasion. A strong page uses: hero → trustbar → problems → process → benefits → stats → reviews → cases → guarantees → faq → final.
