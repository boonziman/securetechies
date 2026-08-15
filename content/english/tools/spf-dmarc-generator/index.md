---
date: 2026-08-15
title: "SPF & DMARC Record Generator"
meta_title: "SPF & DMARC Record Generator (Free) | Secure Techies"
description: "Free SPF and DMARC record generator. Build TXT records, count SPF DNS lookups, and copy a safe rollout path. Browser-only. No signup required."
tool_id: "authgen"
tool_icon: "auth"
tool_badge: "Email auth"
tool_summary: "Build SPF and DMARC TXT records, count DNS lookups, and copy a safe rollout path."
tool_cta: "Want SPF, DKIM, and DMARC enforced on Microsoft 365?"
related_services:
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
  - label: "Network Security"
    url: "/services/network-security/"
howto_steps:
  - name: "Enter the From domain"
    text: "Use the domain customers see in From, such as yourfirm.com."
  - name: "List every legitimate sender"
    text: "Add Microsoft 365, Google Workspace, or other include hosts, plus any static mail IPs."
  - name: "Start DMARC at p=none"
    text: "Publish aggregate reports first. Move to quarantine, then reject, after the report stream looks clean."
  - name: "Publish one SPF TXT and one _dmarc TXT"
    text: "Do not create a second SPF record. Multiple SPF TXTs break authentication."
faq:
  - question: "What is an SPF record generator?"
    answer: "An SPF record generator builds the TXT record that lists which servers may send mail for your domain. You choose includes, IP addresses, and an all policy. This tool also counts mechanisms that use DNS so you stay under the 10-lookup limit."
  - question: "What is a DMARC record generator?"
    answer: "A DMARC record generator builds the TXT record published at _dmarc.yourdomain.com. It sets the policy (none, quarantine, or reject), report addresses, and alignment. Receivers use it when SPF or DKIM do not align with the From domain."
  - question: "What is the SPF 10 DNS lookup limit?"
    answer: "RFC 7208 caps the number of DNS-using mechanisms (include, a, mx, ptr, exists, and redirect) at 10. Going over makes SPF fail with permerror. ip4 and ip6 do not count. Nested includes from Microsoft or Google still count at lookup time."
  - question: "Should I use -all or ~all?"
    answer: "Use ~all (soft fail) while you discover forgotten senders. Switch to -all (fail) once reports show only legitimate sources. Never use +all. That tells the world anyone may send as you."
  - question: "Does this publish the records for me?"
    answer: "No. It only builds the text. You or your DNS host add the TXT records. We can implement and monitor this on Microsoft 365 as part of a security engagement."
  - question: "Do I still need DKIM?"
    answer: "Yes. DMARC can pass on SPF alignment alone, but DKIM survives forwarding better. Turn on DKIM in Microsoft 365 or Google Workspace, then raise DMARC."
weight: 8
draft: false
---

## Free SPF and DMARC record generator

This **SPF record generator** and **DMARC record generator** builds the TXT records you publish in DNS. Enter the domain people see in From, list includes and IPs, pick an `all` policy, and set a DMARC policy plus a report mailbox. The tool counts SPF mechanisms that use DNS and warns before you blow the **10-lookup** limit.

**Here is the short version:** one SPF record, DKIM on in your tenant, DMARC at `p=none` with reports, then quarantine, then reject. That path stops a large share of domain spoofing used in invoice and wire fraud.

Records are generated in your browser. Nothing is sent to Secure Techies.

## What SPF should say

SPF is a public list of who may send mail for a domain. Official rules are in [RFC 7208](https://datatracker.ietf.org/doc/html/rfc7208).

Common includes:

| Platform | Typical include |
| --- | --- |
| Google Workspace | `_spf.google.com` |
| Microsoft 365 | `spf.protection.outlook.com` |
| A static smarthost | `ip4:` or `ip6:` of that host |

Publish **one** SPF TXT on the apex (or on the From domain). Two SPF records is a frequent self-inflicted outage.

Microsoft's own [email authentication guide](https://learn.microsoft.com/en-us/microsoft-365/security/office-365-security/email-authentication-spf-configure) walks through the Microsoft 365 include. Use it when the tenant is the primary sender.

## What DMARC should say

DMARC tells receivers what to do when SPF or DKIM do not align with From. See [RFC 7489](https://datatracker.ietf.org/doc/html/rfc7489).

A safe first record looks like:

`v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com; adkim=r; aspf=r; pct=100`

Read aggregate reports for a few weeks. Forgotten tools (scanners, marketing platforms, printers) show up there. Then raise `p` to `quarantine`, then `reject`.

CISA recommends email authentication as a baseline control in its [Cybersecurity Performance Goals](https://www.cisa.gov/cybersecurity-performance-goals-cpgs). For law firms and anyone who wires money, reject is the destination, not a nice-to-have.

## Rollout order that does not break mail

1. Inventory senders (Microsoft 365, Google, bill-pay, marketing, scanners).
2. Publish SPF with `~all` if you are unsure.
3. Enable DKIM in the tenant.
4. Publish DMARC `p=none` with `rua`.
5. Fix gaps the reports show.
6. Move to `quarantine`, then `reject`.
7. Keep one owner for DNS changes.

Use the [email header analyzer](/tools/email-header-analyzer/) to confirm Authentication-Results after you publish.

## Mistakes that waste a Friday

- A second SPF TXT "just for Mailchimp"
- `+all` because someone copied a 2008 blog
- Nested includes that push lookups past 10
- DMARC `reject` on day one with no report history
- Publishing DMARC on the wrong host (it belongs at `_dmarc.domain.com`)

## How this ties to the rest of the stack

Authentication does not replace inbox filtering, MFA, or a call-back rule for payment changes. It does make lookalike-From spoofs fail more often. That is the same theme as our [wire fraud close call](/case-studies/wire-fraud-email-close-call/) and our [cybersecurity](/services/cybersecurity/) work.

If you want this implemented and monitored on Microsoft 365, [contact Secure Techies](/contact/).
