---
date: 2026-08-15
title: "Cybersecurity Risk Assessment"
meta_title: "Cybersecurity Risk Assessment (Free Score) | Secure Techies"
description: "Free cybersecurity risk assessment for small businesses. Score MFA, backups, EDR, DMARC, patching, and offboarding. Browser-only. Get a ranked gap list."
tool_id: "risk"
tool_icon: "clipboard"
tool_badge: "Assessment"
tool_summary: "A 10-question score for MFA, backups, EDR, email authentication, and offboarding. Ranked gaps, no signup."
tool_cta: "Want an engineer to validate this against your tenant?"
related_services:
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
  - label: "Compliance & Security Audits"
    url: "/services/compliance-security-audits/"
  - label: "Backup & Disaster Recovery"
    url: "/services/backup-disaster-recovery/"
howto_steps:
  - name: "Answer the ten control questions honestly"
    text: "Pick the row that matches how the business actually runs, not the policy binder."
  - name: "Read the score and band"
    text: "The score is 0 to 100. The band is Critical, At risk, Fair, or Strong."
  - name: "Fix the highest-value gaps first"
    text: "The tool ranks missing MFA, untested backups, and open email authentication ahead of nice-to-have paperwork."
  - name: "Confirm with a human review"
    text: "This is a planning score. A real assessment looks at the tenant, backups, and endpoints."
faq:
  - question: "What is a cybersecurity risk assessment tool?"
    answer: "It is a structured questionnaire that turns security habits into a score and a short gap list. This version covers MFA, backups, EDR, SPF/DKIM/DMARC, patching, phishing awareness, privilege, incident response, inventory, and offboarding."
  - question: "Is this a formal audit or certification?"
    answer: "No. It is a planning score for owners and IT leads. HIPAA, CMMC, SOC 2, and cyber insurance still need evidence, not a browser quiz. Use it to decide what to fix first."
  - question: "How is the cybersecurity score calculated?"
    answer: "Each control has a weight. MFA and tested backups are worth the most, then EDR and email authentication, then privilege, patching, monitoring-related process, training, inventory, and offboarding. The total is scaled to 0–100."
  - question: "What score should a small business aim for?"
    answer: "Treat anything under 60 as homework. 80 and up means the basics exist. Even a high score can hide one fatal gap, such as backups that have never been restored."
  - question: "Are my answers stored?"
    answer: "No. Scoring runs in the browser. Refresh the page and the answers reset. We never see them unless you choose to talk with us about the gaps."
weight: 9
draft: false
---

## Free cybersecurity risk assessment for small businesses

This **cybersecurity risk assessment** is a 10-question score for MFA, backups, EDR, email authentication, patching, training, privilege, incident response, inventory, and offboarding. It is built for owners and office managers who need a ranked list, not a 40-page binder.

**Here is the short version:** if multi-factor authentication is missing on email, or backups have never been restored, start there. Those two controls stop more real incidents than a new policy template.

Answers stay in your browser. This is not a pentest, a HIPAA audit, or an insurance application.

## How the score is weighted

Weights follow the spirit of CISA [Cybersecurity Performance Goals](https://www.cisa.gov/cybersecurity-performance-goals-cpgs) and [CIS Implementation Group 1](https://www.cisecurity.org/controls/implementation-groups): identity, recovery, email, and known assets first.

| Control | Why it is heavy |
| --- | --- |
| MFA on email and admin | Stops a large share of account takeovers |
| Tested backups | The difference between a bad week and a closed firm |
| EDR | Sees ransomware before the file server is gone |
| SPF / DKIM / DMARC | Makes domain spoofs fail more often |
| Privilege and patching | Shrinks what a stolen laptop can do |
| Offboarding and inventory | Closes the accounts nobody remembers |

Industry is a pressure note, not a vanity multiplier that hides a zero on MFA. Law, healthcare, and finance should treat a mid score as more urgent, not as a different math problem.

## How to use the gap list

1. Fix anything that scores zero on MFA or backups this week.
2. Publish or tighten DMARC with the [SPF and DMARC generator](/tools/spf-dmarc-generator/).
3. Put a restore test on the calendar. A backup you have never restored is a rumor.
4. Estimate money impact with the [ransomware cost calculator](/tools/ransomware-cost-calculator/).
5. Give staff a place to send suspicious mail. The [email header analyzer](/tools/email-header-analyzer/) is the two-minute check.

NIST's [Small Business Cybersecurity Corner](https://www.nist.gov/itl/smallbusinesscyber) is a good companion reading list if you want the longer version of the same priorities. CISA's [Cross-Sector Cybersecurity Performance Goals](https://www.cisa.gov/cross-sector-cybersecurity-performance-goals) is the same idea in federal language: identity, email, backups, and known assets first.

## What this assessment is not

It does not scan your network. It does not log into Microsoft 365. It does not produce an auditor's letter. People under-report "everyone is a local admin" and over-report "we have a plan." Be harsh with yourself or the score is theater.

For a real review of the tenant, endpoints, and backups, use [cybersecurity services](/services/cybersecurity/) or [compliance and security audits](/services/compliance-security-audits/).

Offboarding is on the list because leftover mailboxes are how former staff and forgotten vendors stay in the tenant. Same-day revoke of mail, VPN, and SaaS is the bar. "We will get to it Monday" is how a departed laptop still syncs SharePoint.

## Why these ten questions and not forty

You can buy a 200-control spreadsheet. Most small firms will not finish it. These ten map to the failures we see: stolen mailboxes, unrestored backups, silent endpoints, spoofed invoices, unpatched servers, nobody trained, everyone an admin, no plan, mystery devices, and leftover accounts.

CIS IG1 has more safeguards. Use that list when you have a program. Use this page when you need a starting rank. Do not skip MFA because a longer list also mentions secure configuration of browsers.

Patching is on the list because unpatched VPN and mail appliances are still how ransomware starts. "Monthly, but servers slip" is honest for a lot of firms. Move the critical internet-facing boxes first. Internal print servers can wait a week. Edge devices cannot.

## How to answer without lying to yourself

Pick the row that matches last Tuesday, not the policy PDF. If MFA is on for the owner and nobody else, that is "some staff." If backups exist in the cloud but nobody has restored a file this year, that is "untested." If the "incident plan" is a phone number in someone's head, that is "we would call whoever answers."

Law, healthcare, and finance should treat a mid score as more urgent. Attackers already know those inboxes move money and records. The industry dropdown is a pressure note. It does not change the weights so a law firm can feel better about missing MFA.

## What "good" looks like in 90 days

Week 1: MFA on Microsoft 365 and every admin path.  
Week 2: Confirm backups, then restore one file and one full system on purpose.  
Week 3: Publish SPF and DMARC at `p=none` with the [SPF and DMARC generator](/tools/spf-dmarc-generator/).  
Week 4: Name who watches EDR and mailbox alerts.  
The rest of the quarter: privilege cleanup, offboarding, and one tabletop.

That sequence matches CISA and CIS IG1 better than buying a new dashboard.

## Next step

Owners sometimes want a single product that "does security." That product does not exist. MFA, backups, email authentication, and someone watching alerts are four jobs. This score exists to stop you from buying the fifth tool first.

Share the score with whoever pays the bills, not only with IT. An owner who sees "At risk" and a four-item gap list can approve MFA and a restore weekend. A 40-page PDF often waits until after the incident. If you cannot name who watches alerts on a Saturday, the EDR line is not a 10 even if the agent is installed.

Re-take the score after those 90 days. If MFA and restores moved and the number did not, you answered generously the first time. That is useful. Fix the answers, then fix the systems.

If the band is Critical or At risk, close MFA and recovery, then talk to a partner who will own the rest. Bring the gap list. [Contact Secure Techies](/contact/) for a free assessment that looks at the actual systems.
