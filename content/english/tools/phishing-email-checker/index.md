---
date: 2026-08-16
title: "Phishing Email Checker"
meta_title: "Phishing Email Checker (Free Red Flags) | Secure Techies"
description: "Free phishing email checker. Paste From, subject, and body to see wire, gift-card, lookalike, and urgency flags. Browser-only. Not a live URL scan. No signup."
tool_id: "phish"
tool_icon: "mail"
tool_badge: "Email"
tool_summary: "Paste a message and see urgency, payment, lookalike-domain, and gift-card red flags."
tool_cta: "Need a process so finance does not wire on a fake invoice?"
related_services:
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
  - label: "Managed Help Desk & IT Support"
    url: "/services/managed-help-desk/"
howto_steps:
  - name: "Copy From, subject, and body as text"
    text: "Do not open the attachment. Do not click the link to 'check' it."
  - name: "Run the red-flag check"
    text: "The tool scores wording, display names, free-mail From lines, and suspicious links locally."
  - name: "If money or passwords are involved, stop anyway"
    text: "A low flag count is not approval. Call the person on a number you already have."
  - name: "Check headers on the same message"
    text: "Use the email header analyzer for SPF, DKIM, and DMARC. This page reads the story, not the postmark."
faq:
  - question: "What is a phishing email checker?"
    answer: "It is a local review of the words and addresses on a message. You paste From, subject, and body. The tool looks for urgency, payment changes, gift cards, free-mail From lines, brand-name mismatches, punycode, shorteners, and a short list of abused TLDs. It does not visit those links."
  - question: "Is this the same as the email header analyzer?"
    answer: "No. The header analyzer reads SPF, DKIM, DMARC, and the Received path. This checker reads the story the attacker wrote. Use both. A pass on headers can still be a compromised vendor mailbox."
  - question: "Can it tell me if a link is malicious?"
    answer: "It can flag shorteners, raw IP addresses, punycode, risky file types, and a short list of abused TLDs such as .zip or .xyz. It cannot query VirusTotal or open the site. Do not click to find out."
  - question: "Is my email uploaded?"
    answer: "No. Scoring runs in the browser. Still avoid pasting secrets you would not print. Delete the paste when you are done."
  - question: "What should I do if the band is High?"
    answer: "Do not click, do not pay, and do not reply. Call the supposed sender on a known number. Send the message to whoever owns security or help desk."
  - question: "What if the email looks perfect and the band is Low?"
    answer: "Treat money and password requests as callbacks anyway. A compromised vendor mailbox often looks like last week's invoice. Headers can pass. The process is the control, not the wording score."
weight: 12
draft: false
---

## Free phishing email checker for invoice and login scams

**Here is the short version:** if a message asks you to change a payment, send a gift card, or type a password, stop. This **phishing email checker** reads From, subject, and body in your browser and lists red flags. It does not visit links and it does not open attachments.

Use it next to the [email header analyzer](/tools/email-header-analyzer/). Headers are the postmark. This page is the story.

## What the checker looks for

The scorer is a list of patterns, not a neural net. That is a feature. You can see why it fired.

| Family | Examples |
| --- | --- |
| Urgency | today only, immediate action, account suspended |
| Money | wire, ACH, routing, W-9, invoice attached, overdue |
| Gift / crypto | gift card, Bitcoin, iTunes, Steam |
| Credential | verify your password, unusual login, MFA reset |
| Identity | CEO, payroll, attorney, bank display name on Gmail |
| Links | bit.ly, tinyurl, raw IP, xn-- punycode, .zip / .exe in URL |

CISA's [malware, phishing, and ransomware topic](https://www.cisa.gov/topics/cyber-threats-and-advisories/malware-phishing-and-ransomware) and the FBI [Internet Crime Complaint Center](https://www.ic3.gov/) describe the same families. Microsoft documents tenant-side controls in [anti-phishing policies for Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/anti-phishing-policies-about). This tool is the two-minute human pass before those controls, or when someone forwards you a message on their phone.

## How the band is scored

Each flag adds weight. Money-plus-urgency is heavier than a lone "please see attached." A bank-like display name on a free-mail From line is heavy. A `bit.ly` link next to a password request is heavy.

Bands:

- **Low:** wording looks ordinary. Still verify money requests out of band.
- **Medium:** two or more weak signals. Read headers. Ask help desk.
- **High:** payment or credential language plus a domain or link problem. Treat as hostile.

A Low band is not a green light to wire $48,000. Compromised mailboxes send polite, well-spelled invoices. That is the [fake wire instruction case study](/case-studies/wire-fraud-email-close-call/).

## Worked sample (the button loads this)

From: `First National Wire Desk <treasury@firstnational.example>`  
Reply-To: `payments-update@gmail.com`  
Subject: `Updated wiring instructions: action required`  
Body talks about a same-day ACH change and a short link.

Expect High. Reply-To is free mail. The subject is urgency plus money. You do not need a sandbox to refuse that.

## What to do after the score

1. Do not click. Do not open the attachment on a workstation you care about.
2. Run headers on the same message.
3. Call the vendor or partner on a number from last month's invoice, not from the email.
4. Send the message to [managed help desk](/services/managed-help-desk/) or whoever owns security.
5. If you already clicked, disconnect, and treat it as an incident. Use the [cybersecurity risk assessment](/tools/cybersecurity-risk-assessment/) later. Contain first.

FTC's [phishing page](https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams) is written for people, not only for IT. Finance staff should read it once.

## Lookalikes, homoglyphs, and the one-letter swap

Attackers register `securetechie-billing.com` or swap `rn` for `m`. This checker flags a display name that says Microsoft or PayPal on the wrong domain, a few misspellings (`micros0ft`, `paypa1`), punycode, and abused TLDs. It will not catch every lookalike. Read the From address, not only the display name. Outlook and iPhone mail hide the address until you tap it. Tap it.

Punycode (`xn--`) lets a domain look like a brand in some fonts. If you see `xn--` in a link, do not click. Paste the text here or into headers. Then call.

QR codes in PDFs are links you cannot hover. If an "invoice" is a QR and a deadline, treat it as a link you did not inspect.

## Why finance gets hit

The message is rarely "please send Bitcoin." It is last week's vendor, last week's amount, and a new routing number because "we changed banks." That is business email compromise. CISA and the FBI publish it because it works. A checker helps the first 30 seconds. A written rule helps the next 30 years: no payment-detail change without a voice call on a number already in the file.

Finance teams in Los Angeles get these on ordinary Tuesdays. Staff are busy. The PDF looks like last week's. The control is the two-minute process, not a longer training video.

Two failures look the same in the inbox. A spoof often fails SPF or DMARC; the header analyzer will show that. A compromised vendor mailbox often passes. This checker still helps because the story (new routing, same-day ACH, gift cards) is what AP should refuse. Use both tools. Neither replaces a phone call.

Keep a folder of known-good invoices from real vendors. Compare the next "update" against that folder, not against the email's own letterhead. Teach one person in AP what High means and who to call. Forwarding a suspected phish to the whole firm is how the second person clicks. Send it to one owner.

A normal vendor invoice that only says "invoice attached" can land in Medium. That is not a false alarm you should ignore. It is a reminder to use last month's phone number. Gift cards and free-mail Reply-To lines should never wait for a second opinion from this page. Refuse those on sight.

## What this checker is not

It is not VirusTotal. It is not a sandbox. It will not open a `.html` attachment. It will not invent a lookalike it cannot see in the paste. It cannot prove a clean vendor mailbox is honest.

If the sender domain is real and DMARC passed, you still call back. Authentication answers "did this domain send it," not "is this person who they claim."

[Cybersecurity](/services/cybersecurity/) plus a written payment-change rule is the real control. If you want that owned, [contact Secure Techies](/contact/).
