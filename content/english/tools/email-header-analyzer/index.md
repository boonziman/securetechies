---
date: 2026-08-15
title: "Email Header Analyzer"
meta_title: "Email Header Analyzer (Free SPF, DKIM, DMARC) | Secure Techies"
description: "Free email header analyzer. Paste raw headers to read SPF, DKIM, DMARC, From vs Return-Path, and the Received path. Browser-only. No signup required."
tool_id: "headers"
tool_icon: "mail"
tool_badge: "Email"
tool_summary: "Paste raw headers to see SPF, DKIM, DMARC, spoof flags, and the Received hop path."
tool_cta: "Think a client email was spoofed? We can harden Microsoft 365."
related_services:
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
  - label: "Managed Help Desk & IT Support"
    url: "/services/managed-help-desk/"
howto_steps:
  - name: "Open the original message headers"
    text: "In Outlook, Gmail, or Microsoft 365, open View message details or Show original and copy the full header block, not just the body."
  - name: "Paste the headers into the tool"
    text: "Paste the raw text on this page. Analysis runs in your browser. Nothing is uploaded to Secure Techies."
  - name: "Read SPF, DKIM, and DMARC first"
    text: "Authentication-Results is the fastest honesty check. Fail or missing results are a reason to pause before you click or pay."
  - name: "Compare From, Return-Path, and Reply-To"
    text: "A friendly display name with a different sending domain is a classic business email compromise pattern."
faq:
  - question: "What is an email header analyzer?"
    answer: "An email header analyzer turns the hidden routing and authentication lines on a message into a readable report. You paste the raw headers and see SPF, DKIM, DMARC, From versus Return-Path, Reply-To, and the Received hop list."
  - question: "How do I view original email headers in Outlook or Gmail?"
    answer: "In Outlook on the web, open the message, choose View, then View message details. In classic Outlook, File, Properties, Internet headers. In Gmail, open the message, choose the three-dot menu, then Show original, and copy the headers."
  - question: "What do SPF, DKIM, and DMARC mean in headers?"
    answer: "SPF checks whether the sending server is allowed for the envelope domain. DKIM checks a cryptographic signature. DMARC checks alignment between the visible From domain and those results, then applies the domain owner's policy."
  - question: "Does a DMARC pass mean the email is safe?"
    answer: "No. Pass means the domain's authentication lined up. The content can still be a scam from a lookalike domain, a compromised mailbox, or a supplier account. Use headers plus process: call back on a known number before you send money."
  - question: "Is my email uploaded when I use this tool?"
    answer: "No. Parsing runs in your browser with JavaScript. Secure Techies does not receive the headers you paste. Still avoid pasting messages that contain secrets you would not print."
  - question: "Why does From look real if Return-Path is different?"
    answer: "The From line is easy to spoof. Return-Path and Authentication-Results describe who actually handed the message to the receiving server. A mismatch is a common sign of spoofing or a forwarding path you should understand before you trust the message."
weight: 7
draft: false
---

## Free email header analyzer for SPF, DKIM, and spoof checks

An **email header analyzer** makes the hidden part of a message readable. Paste the raw headers from Outlook, Gmail, or Microsoft 365. This tool highlights **SPF**, **DKIM**, and **DMARC** results, compares **From**, **Return-Path**, and **Reply-To**, and lists the **Received** path from the newest hop to the oldest.

**Here is the short version:** if Authentication-Results shows a fail, or the visible From domain does not match Return-Path, stop. Do not click, do not pay, and call the person on a number you already have.

Analysis stays in your browser. Nothing is uploaded to Secure Techies.

## How to copy headers (search intent, done plainly)

People search "how to view email headers" as often as they search for an analyzer.

1. **Gmail:** open the message, three-dot menu, Show original, copy the header block.
2. **Outlook on the web / Microsoft 365:** open the message, View, View message details.
3. **Outlook desktop:** File, Properties, Internet headers.
4. Paste the full block here, including Received and Authentication-Results lines.

You need the headers, not just the body. The body is the story. The headers are the postmark.

## What this email header checker actually reads

| Field | Why it matters |
| --- | --- |
| Authentication-Results | Receiver's SPF, DKIM, and DMARC verdict |
| Received-SPF | Older SPF result line if present |
| DKIM-Signature | Whether a signature exists, plus the signing domain |
| From | Visible author. Easy to fake |
| Return-Path | Envelope sender used for bounces |
| Reply-To | Where a reply actually goes |
| Received | Each server hop, newest first in most inboxes |

Header folding (a newline plus a space) is unfolded first, the same way [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322) describes message format. This is a parser, not a live DNS checker. It reports what the receiving system already wrote down.

## How to read SPF, DKIM, and DMARC in headers

**SPF** asks: is this sending IP allowed for the envelope domain? Official mechanics live in [RFC 7208](https://datatracker.ietf.org/doc/html/rfc7208).

**DKIM** asks: does the signature match a public key in DNS for that domain?

**DMARC** asks: do SPF or DKIM pass **and** align with the From domain, and what should receivers do if they do not? See [RFC 7489](https://datatracker.ietf.org/doc/html/rfc7489).

Microsoft documents the same trio for Microsoft 365 tenants in its [SPF, DKIM, and DMARC setup guidance](https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/email-authentication-about). If your own domain is missing those records, generate them with our [SPF and DMARC record generator](/tools/spf-dmarc-generator/).

## Red flags this tool is built to surface

- SPF, DKIM, or DMARC **fail**
- No Authentication-Results at all (common on some internal or poorly configured paths)
- From domain different from Return-Path domain
- Reply-To domain different from From domain
- Display name that looks like a bank, law firm, or executive, with a free-mail address
- A very short hop list on a message that claims to be from a large provider

CISA's guidance on [phishing and business email compromise](https://www.cisa.gov/news-events/news/business-email-compromise-bec-and-email-account-compromise-eac) is blunt: verify payment changes out of band. Headers help you decide whether to start that call.

## When headers pass and the email is still a scam

A compromised vendor mailbox can send authenticated mail. A lookalike domain (`securetechie-billing.com`) can have its own clean SPF. Headers answer "did this domain send it," not "is this person who they claim."

That is the pattern in our [fake wire instruction case study](/case-studies/wire-fraud-email-close-call/). The process still wins: call back, do not use the number in the email.

## How this helps Southern California teams

Law firms, clinics, and professional offices in Los Angeles get polished payment and W-9 requests every week. A two-minute header check is cheaper than a wire recall. Pair it with [cybersecurity](/services/cybersecurity/) and [managed help desk](/services/managed-help-desk/) so staff have a place to escalate.

## How to walk a suspicious invoice

1. Do not click. Do not open the attachment on a workstation you care about.
2. Copy headers into this analyzer.
3. If SPF, DKIM, or DMARC fail, treat the message as hostile until proven otherwise.
4. If they pass, still call the vendor on a number from last month's invoice, not from the email.
5. Send the message to whoever owns security or [managed help desk](/services/managed-help-desk/). Do not forward it to the whole firm.

That is a two-minute process. Firms skip it because the email looks like last week's PDF. That is the point of the display name.

## Forwarding, lists, and other honest mismatches

Not every mismatch is a crime. A mailing list can break DKIM. A forwarding rule can change Return-Path. Some small hosts never write Authentication-Results. Ask: does this message ask me to do something irreversible (wire, password, W-9, gift cards)? If yes, the bar is higher. If it is a newsletter, a fail is still a reason to unsubscribe, not a reason to panic.

Internal messages on Microsoft 365 often look different from internet mail. Compare against a known-good message from the same person before you train the whole office on one sample.

## What this tool is not

It is not a sandbox, a VirusTotal scan, or a court-grade forensic report. It will not fetch live DNS. It will not mark mail in your inbox. It will not see a lookalike domain that has its own clean SPF. Use it to read what is already on the message, then decide the next human step.

Teach one person in finance this page. They do not need to become mail administrators. They need to know where Show original lives and what "fail" means. That is cheaper than a recall.

If you want DMARC enforcement, Microsoft 365 hardening, or a staff process for payment changes, [contact Secure Techies](/contact/).
