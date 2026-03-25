# Secure Techies — Website

**Live site:** [https://securetechie.com](https://securetechie.com)

A professional business website for **Secure Techies, LLC** — a managed IT services and cybersecurity company based in Woodland Hills, California, serving businesses across Southern California and nationwide.

Built with [Hugo](https://gohugo.io/) (static site generator) + [TailwindCSS](https://tailwindcss.com/) and deployed automatically via [Netlify](https://www.netlify.com/).

---

## Table of Contents

1. [How the Site is Organized](#how-the-site-is-organized)
2. [How to Change Photos](#how-to-change-photos)
3. [How to Change Text and Titles](#how-to-change-text-and-titles)
4. [How to Publish Your Changes](#how-to-publish-your-changes)
   - [Method A — Edit Locally on Your Computer](#method-a--edit-locally-on-your-computer)
   - [Method B — Edit Directly on GitHub](#method-b--edit-directly-on-github)
5. [Technical Reference](#technical-reference)
6. [SEO & Analytics Setup](#seo--analytics-setup)
7. [Troubleshooting](#troubleshooting)

---

## How the Site is Organized

Think of your website files like folders on your computer. Here is what matters:

```
SecureTechies/
├── content/english/              ← All your page text lives here
│   ├── _index.md                 ← Homepage text & settings
│   ├── about/_index.md           ← About page
│   ├── contact/_index.md         ← Contact page
│   ├── faq/_index.md             ← FAQ page
│   ├── services/                 ← All 6 service pages
│   │   ├── infrastructure.md
│   │   ├── cybersecurity.md
│   │   ├── network-security.md
│   │   ├── managed-help-desk.md
│   │   ├── backup-disaster-recovery.md
│   │   └── compliance-security-audits.md
│   ├── blog/                     ← Blog posts
│   │   ├── hipaa-compliance-checklist.md
│   │   ├── top-cybersecurity-threats-2025.md
│   │   └── why-small-businesses-need-managed-it.md
│   └── pages/
│       └── privacy-policy.md
│
├── static/images/                ← All your photos and images
│   ├── services/                 ← Service page photos (hero + overview)
│   ├── pages/                    ← About and contact page photos
│   └── blog/                     ← Blog post images
│
├── assets/images/                ← Logo, favicon, and social sharing image
│   ├── logo.png                  ← Main site logo
│   ├── logo-darkmode.png         ← Logo for dark backgrounds (footer)
│   ├── favicon.png               ← Browser tab icon (source file)
│   └── og-image.png              ← Default image for social media shares
│
├── hugo.toml                     ← Main site settings (title, URL, analytics)
├── config/_default/
│   └── params.toml               ← SEO settings, verification codes, metadata
│
├── layouts/                      ← Page templates (HTML) — careful editing only
├── netlify.toml                  ← Netlify hosting settings & security headers
└── static/robots.txt             ← Search engine crawler instructions
```

### Key Rule

- **Content files** (`.md` files in `content/`) = **safe to edit anytime**
- **Image files** (in `static/images/`) = **safe to replace anytime**
- **Layout files** (in `layouts/`) = **only edit if you know HTML/CSS**
- **Config files** (`hugo.toml`, `params.toml`) = **edit carefully, follow the format**

---

## How to Change Photos

### Replacing a Service Page Photo

Each service page has **2 photos**: a **hero image** (the big banner at the top) and an **overview image** (smaller photo in the content section).

The photos are located in: `static/images/services/`

**Current service images:**

| Service | Hero Image | Overview Image |
|---------|-----------|---------------|
| Infrastructure | `infrastructure-hero.webp` | `infrastructure-overview.webp` |
| Cybersecurity | `cybersecurity-hero.webp` | `cybersecurity-overview.webp` |
| Network Security | `network-hero.webp` | `network-overview.webp` |
| Help Desk | `helpdesk-hero.webp` | `helpdesk-overview.webp` |
| Backup & Recovery | `backup-hero.webp` | `backup-overview.webp` |
| Compliance | `compliance-hero.webp` | `compliance-overview.webp` |

**To replace a photo:**

1. Get your new photo ready
2. Convert it to `.webp` format — use [squoosh.app](https://squoosh.app/) (free, just drag and drop your image)
3. **Name it the EXACT same filename** as the one you are replacing (e.g., `cybersecurity-hero.webp`)
4. Put it in the `static/images/services/` folder, replacing the old file
5. Publish your changes (see [How to Publish](#how-to-publish-your-changes))

> **Why `.webp`?** It is a modern image format that loads faster than `.jpg` or `.png`. Google recommends it for better page speed scores.

**Recommended image sizes:**
- **Hero images:** 1600 x 900 pixels (wide/landscape orientation)
- **Overview images:** 800 x 533 pixels (standard photo size)

### Replacing the About / Contact Page Photos

Located in: `static/images/pages/`

| Photo | Filename |
|-------|----------|
| About page — office photo | `about-office.webp` |
| About page — team photo | `about-team.webp` |
| Contact page — hero | `contact-hero.webp` |

Same process: convert to `.webp`, name it exactly the same, replace the file.

### Replacing the Logo

Located in: `assets/images/`

| File | Where It Appears |
|------|-----------------|
| `logo.png` | Header (top of every page) |
| `logo-darkmode.png` | Footer (bottom of every page, dark background) |
| `favicon.png` | Browser tab icon (the tiny icon next to the page title) |

After replacing the logo, you should also regenerate the favicon files:
1. Replace `assets/images/favicon.png` with your new icon (square image, at least 180x180 pixels)
2. Go to [realfavicongenerator.net](https://realfavicongenerator.net/) and upload your icon
3. Download the generated files and put `favicon.ico` and `apple-touch-icon.png` in the `static/` folder

### Replacing Blog Post Images

Located in: `static/images/blog/`

| Blog Post | Image File |
|-----------|-----------|
| Cybersecurity Threats 2025 | `cybersecurity-threats.jpg` |
| HIPAA Compliance Checklist | `hipaa-compliance.jpg` |
| Why Small Businesses Need Managed IT | `managed-it-services.jpg` |

> **Note:** The current blog images are placeholders. Replace them with real, relevant photos.

---

## How to Change Text and Titles

All page text is stored in **Markdown files** (`.md` files) inside the `content/english/` folder. You can open these files in any text editor (TextEdit, Notepad, VS Code, etc.).

### Understanding the File Format

Every page file has two parts:

```markdown
---
title: "Page Title Here"
meta_title: "SEO Title | Secure Techies"
description: "This shows in Google search results under the title."
image: "/images/services/cybersecurity-overview.webp"
---

Your page content goes here. This is regular text.

## This Is a Heading

Regular paragraph text continues here...

- Bullet point one
- Bullet point two
```

**The top section** (between the `---` lines) is called **frontmatter** — these are the page settings:

| Field | What It Does | Example |
|-------|-------------|---------|
| `title` | The heading displayed on the actual page | `"Cybersecurity Solutions"` |
| `meta_title` | The title shown in Google search results and browser tabs | `"Cybersecurity Solutions \| Secure Techies"` |
| `description` | The 1-2 sentence summary shown under the title in Google | `"Advanced cybersecurity from Secure Techies..."` |
| `image` | The photo shown when someone shares the page on social media | `"/images/services/cybersecurity-overview.webp"` |

**The bottom section** (after the second `---`) is the actual page content written in Markdown format.

### Common Markdown Formatting

| What You Type | What It Looks Like |
|--------------|-------------------|
| `**bold text**` | **bold text** |
| `*italic text*` | *italic text* |
| `## Heading` | A section heading |
| `- item` | A bullet point |
| `[link text](https://example.com)` | A clickable link |

### Editing the Main Site Title

Open `hugo.toml` and find this line near the top:

```toml
title = "Secure Techies | Managed IT & Cybersecurity in Southern California"
```

Change the text between the quotes. Save the file.

### Adding a New Blog Post

1. Create a new `.md` file in `content/english/blog/` (e.g., `my-new-post.md`)
2. Copy the frontmatter from an existing blog post and update it with your new title, description, etc.
3. Write your content below the second `---`
4. Add an image to `static/images/blog/` and reference it in the frontmatter `image` field
5. Publish your changes

---

## How to Publish Your Changes

After making changes to files, you need to **publish** them so they appear on the live website. There are two methods:

---

### Method A — Edit Locally on Your Computer

This is the **recommended method** for most changes, especially image replacements.

#### First-Time Setup (You Only Do This Once)

1. **Install these free tools on your computer:**
   - [Git](https://git-scm.com/downloads) — lets you sync files with GitHub
   - [Node.js](https://nodejs.org/) — download the **LTS** (Long Term Support) version
   - [Hugo Extended](https://gohugo.io/installation/) — the site builder

2. **Open Terminal** (on Mac: search "Terminal" in Spotlight)

3. **Download the project to your computer:**
   ```bash
   git clone https://github.com/boonziman/securetechies.git
   cd securetechies
   npm install
   ```

4. **Done!** You now have the entire website on your computer.

#### Making Changes and Publishing

**Step 1 — Make your changes:**
Edit text files, replace images, etc. using Finder and any text editor.

**Step 2 — Preview your changes locally (optional but recommended):**
```bash
npm run dev
```
Open your browser and go to `http://localhost:1313` — you will see a live preview of your site.
Changes update in real-time as you edit files. Press `Ctrl+C` in Terminal to stop the preview.

**Step 3 — Publish to the live website:**
```bash
git add -A
git commit -m "Brief description of what you changed"
git push origin main
```

**That is it!** Netlify will automatically detect the push and rebuild your site. Changes go live within **1-2 minutes**.

#### Full Example: Replacing a Service Photo

```bash
# 1. Open Terminal and go to your project folder
cd securetechies

# 2. Replace the image file
#    Use Finder to drag your new .webp image into static/images/services/
#    Make sure it has the EXACT same filename (e.g., cybersecurity-hero.webp)

# 3. Publish the change to the live site
git add -A
git commit -m "Updated cybersecurity hero image"
git push origin main

# Done! Your new image will be live in about 1 minute.
```

#### Full Example: Changing a Page Title

```bash
# 1. Open the service page in a text editor
#    e.g., content/english/services/cybersecurity.md

# 2. Find the "title:" line and change it:
#    title: "Your New Title Here"

# 3. Save the file, then publish
git add -A
git commit -m "Updated cybersecurity page title"
git push origin main
```

#### What the Git Commands Mean

| Command | What It Does |
|---------|-------------|
| `git add -A` | Stages all your changes (tells Git "I want to include these") |
| `git commit -m "message"` | Saves a snapshot with a description of what you changed |
| `git push origin main` | Uploads your changes to GitHub, which triggers Netlify to rebuild |

---

### Method B — Edit Directly on GitHub

For **quick text changes**, you can edit files directly in your browser — no software needed.

#### Editing a Text File

1. Go to [github.com/boonziman/securetechies](https://github.com/boonziman/securetechies)
2. Navigate to the file you want to edit
   - Example: click `content` → `english` → `services` → `cybersecurity.md`
3. Click the **pencil icon** in the top-right corner of the file
4. Make your changes in the editor
5. Scroll down and type a brief description of your change (e.g., "Updated cybersecurity page title")
6. Click the green **"Commit changes"** button
7. **Done!** Netlify automatically rebuilds and publishes within 1-2 minutes

#### Replacing an Image on GitHub

1. Navigate to the image folder (e.g., `static` → `images` → `services`)
2. Click **"Add file"** → **"Upload files"**
3. Drag in your new image (**must have the exact same filename** as the old one)
4. Type a brief commit message and click **"Commit changes"**
5. If the old file was not automatically replaced, click on it and delete it

> **Tip:** The local method (Method A) is easier for image replacements because you can simply drag and drop files to replace them. GitHub method requires uploading and potentially deleting the old file separately.

---

## Technical Reference

### Tech Stack

| Component | Technology |
|-----------|-----------|
| Site Generator | [Hugo](https://gohugo.io/) v0.157.0 (Extended) |
| CSS Framework | [TailwindCSS](https://tailwindcss.com/) v4 |
| Theme Base | Hugoplate v3.4.1 |
| Hosting | [Netlify](https://www.netlify.com/) |
| Source Code | [GitHub](https://github.com/boonziman/securetechies) |
| Domain | securetechie.com |

### Build Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start local development server with live reload |
| `npm run build` | Build the production site (output goes to `public/` folder) |
| `npm install` | Install project dependencies (run after first clone) |

### Project Structure (Detailed)

| Folder / File | Purpose |
|--------------|---------|
| `content/english/` | All page content — Markdown files you can safely edit |
| `static/images/` | Photos and images — copied as-is to the live site |
| `assets/images/` | Logo, favicon, OG image — processed by Hugo during build |
| `assets/css/custom.css` | Custom CSS styles for the site |
| `layouts/` | HTML templates that control page structure and design |
| `layouts/_partials/` | Reusable template pieces (header, footer, SEO tags, schemas) |
| `hugo.toml` | Main Hugo configuration (site title, URL, analytics) |
| `config/_default/params.toml` | Site parameters (SEO metadata, verification codes) |
| `config/_default/menus.en.toml` | Navigation menu items and order |
| `data/social.json` | Social media profile URLs |
| `data/theme.json` | Color scheme and font settings |
| `netlify.toml` | Netlify deployment settings, security headers, caching rules |
| `static/robots.txt` | Search engine crawler instructions |

---

## SEO & Analytics Setup

The site has comprehensive SEO already built in (structured data schemas, meta tags, Open Graph, sitemaps, etc.). The following items need the **site owner** to create accounts and add their personal IDs:

### Google Analytics (GA4)

1. Go to [analytics.google.com](https://analytics.google.com/) and sign in with your Google account
2. Click **Admin** (gear icon) → **Create Property**
3. Follow the steps, then set up a **Web** data stream for `securetechie.com`
4. Copy the **Measurement ID** (it starts with `G-`, like `G-ABC123XYZ`)
5. Open the file `hugo.toml` and find this line:
   ```toml
   ID = 'G-MEASUREMENT_ID'
   ```
6. Replace `G-MEASUREMENT_ID` with your real ID (keep the quotes)
7. Save and publish

### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → type `securetechie.com`
3. Choose the **HTML tag** verification method
4. They will give you a meta tag — copy just the `content="..."` value
5. Open `config/_default/params.toml` and find:
   ```toml
   [site_verification]
   google = ""
   ```
6. Paste your verification code between the quotes
7. Save and publish

### Bing Webmaster Tools

1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add your site and choose **HTML meta tag** method
3. Copy the content value
4. Open `config/_default/params.toml` and find:
   ```toml
   bing = ""
   ```
5. Paste your verification code between the quotes
6. Save and publish

---

## Troubleshooting

### "The site looks broken after my change"

You probably accidentally deleted a `---` line or broke the formatting in a `.md` file. Every content file needs exactly **two** `---` lines — one at the very top of the file, and one closing the frontmatter settings. Check that your file still looks like:

```markdown
---
title: "My Title"
description: "My description"
---

Content here...
```

### "My new image is not showing up"

1. Make sure the filename is **exactly the same** as the old one (capitalization matters!)
2. Make sure it is in the **correct folder** (`static/images/services/`, `static/images/pages/`, etc.)
3. Make sure you saved and published (committed + pushed) the changes
4. **Clear your browser cache:** press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### "How do I preview changes before publishing?"

Run the local development server:
```bash
npm run dev
```
Open `http://localhost:1313` in your browser. Changes update in real-time as you edit.

### "I want to undo my last change"

**If you have not pushed yet:**
```bash
git checkout -- .
```
This resets all your changes back to the last committed version.

**If you already pushed and the site is broken:**
```bash
git log --oneline -5          # Shows the last 5 commits
git revert HEAD               # Creates a new commit that undoes the last one
git push origin main          # Pushes the undo to the live site
```

### "I am getting a Git error when I push"

If someone else made changes on GitHub while you were editing locally:
```bash
git pull origin main          # Download the latest changes first
git push origin main          # Then push your changes
```

---

## License

Copyright Secure Techies, LLC. All rights reserved.
