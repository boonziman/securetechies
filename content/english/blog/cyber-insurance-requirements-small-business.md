---
title: "Cyber Insurance Requirements for Small Business (What They Ask)"
meta_title: "Cyber Insurance Requirements | Small Business | ST"
description: "Cyber insurance requirements for small businesses: MFA, backups, EDR, and offboarding. What applications actually ask, and how to prepare without theater."
date: 2026-08-13
image: "/images/blog/cyber-insurance-requirements-small-business.webp"
categories: ["Compliance"]
author: "Secure Techies"
tags: ["cyber insurance requirements", "cyber insurance small business", "MFA insurance", "cyber liability", "insurance questionnaire", "EDR requirement"]
draft: false
faq:
  - question: "What do cyber insurers require from small businesses?"
    answer: "Most applications now ask about multi-factor authentication on email and admin, tested backups, endpoint detection, email authentication, and how fast you revoke access when someone leaves. Exact questions vary by carrier. Treat the list as a security baseline, not as paperwork for its own sake."
  - question: "Will we be denied cyber insurance without MFA?"
    answer: "Many carriers will decline, raise the premium, or exclude account-takeover losses if MFA is missing on email. MFA is the question that used to be optional and is now close to a gate. Turn it on before you shop, not after the broker calls it out."
  - question: "Do insurers require immutable backups?"
    answer: "More applications ask whether backups are offline, immutable, or tested. A job that has never been restored is a weak answer. You do not always need a specific vendor. You do need a copy ransomware cannot quietly delete, and a restore you can describe."
  - question: "Is cyber insurance a substitute for cybersecurity?"
    answer: "No. A policy may pay part of a response. It will not turn MFA on, test a restore, or offboard the bookkeeper. Insurers know that. They underwrite the controls. Buy coverage and do the work."
  - question: "How should a small firm prepare for a cyber insurance application?"
    answer: "Answer from the tenant and the backup console, not from memory. Screenshot MFA enforcement, last restore test, EDR coverage, and DMARC. Have one person own the form. If you cannot prove a control, say so and fix it before you bind the policy."
---

Here's the short version: **cyber insurance requirements for small businesses are mostly the same controls you should have anyway: MFA on email, backups you have restored, endpoint detection, and same-day offboarding.** The application is a quiz about your tenant. Guessing is how you get a denial or a silent exclusion.

Brokers still sell "cyber liability" like a fire policy you buy and forget. Underwriters do not forget. They ask how you sign in, what watches the laptops, and whether last year's backup was a rumor.

This is not legal advice and it is not a quote. It is the list we see on applications for Southern California professional firms, and how to answer without theater. For the wider control set, use the [small business cybersecurity checklist](/blog/small-business-cybersecurity-checklist/) and the free [cybersecurity risk assessment](/tools/cybersecurity-risk-assessment/).

## What changed: the application got specific

Five years ago a lot of forms asked "do you have antivirus" and took yes. That era is over.

CISA's [small and medium business](https://www.cisa.gov/audiences/small-and-medium-businesses) pages exist because underwriters and federal guidance landed on the same list: identity, email, backups. The NAIC tracks the market on its [cybersecurity topic page](https://content.naic.org/cipr-topics/cybersecurity). You do not need to become an insurance analyst. You need to know they now ask for evidence.

FBI's [Internet Crime Complaint Center](https://www.ic3.gov/) still shows business email compromise and ransomware as the losses that make underwriters nervous. If your firm wires money or keeps client files, assume the form will probe email and backups. A law firm that has never had a claim still fills out the same grid. The carrier is pricing the next five years, not last Tuesday.

## Cyber insurance requirements that actually decide the bind

Every carrier writes its own form. The pattern is stable.

| They ask | What they mean | Weak answer |
| --- | --- | --- |
| MFA on email and admin | Enforced, not "available" | "Users can turn it on" |
| Backups, offline or immutable, restore tested | A copy ransomware cannot wipe, plus a drill | "We have OneDrive" |
| EDR on endpoints | Something that alerts a person | "Windows Defender, I think" |
| Email authentication | SPF, DKIM, DMARC beyond none | "Microsoft handles that" |
| Offboarding | Same-day revoke | "HR emails IT" |
| Privileged accounts | Separate admin, not daily email as Global Admin | "We have two admins" |
| Incident plan | Who you call at 9 p.m. | "We would Google it" |

CIS [Implementation Group 1](https://www.cisecurity.org/controls/implementation-groups) is a decent map of those themes: inventory, access, email, backups. Insurers did not invent a new religion. They copied the boring list.

### MFA is the gate

If [multi-factor authentication](/blog/mfa-multi-factor-authentication/) is missing on Microsoft 365, fix that this week. Do not start shopping. Several carriers will not bind, or will exclude BEC, until it is on.

Enforced means Conditional Access or the equivalent, not a poster in the kitchen.

## Backups: they will ask how you know

"We use Microsoft 365" is not a backup answer. Read [Microsoft 365 backup](/blog/microsoft-365-backup/) if that is your only copy.

They want:

- What is copied (mail, files, servers)
- How often
- Whether a copy is offline, immutable, or offsite
- When you last restored something on purpose

CISA's [ransomware guide](https://www.cisa.gov/stopransomware/ransomware-guide) is the same sermon. A green job report is not a restore.

### Immutable is a word. Isolation is the point.

You do not have to buy a specific logo. You do need a copy a stolen admin cannot delete in five minutes. Object lock, a vault, an offline disk in another building: pick one and be able to describe it.

## EDR, email, and the rest of the form

Endpoint detection is how you answer "antivirus." Built-in Defender without anyone watching alerts is a soft yes. [Endpoint detection and response](/blog/endpoint-detection-response/) that pages a human is a better yes.

Coverage means every laptop and the few servers that still matter, not "the new ones." Count devices in Intune or your RMM, then count EDR agents. If those numbers disagree, the form should say so, or you should close the gap before you send it. Underwriters can ask for the export.

Email authentication is how you answer spoofing. Publish SPF and DKIM. Get DMARC off `none` when you are ready. The [SPF and DMARC generator](/tools/spf-dmarc-generator/) is the two-minute start, not the whole program.

Offboarding is on the form because leftover accounts are how last year's bookkeeper still has payroll. Use the [employee offboarding IT checklist](/blog/employee-offboarding-it-checklist/) and actually revoke sessions.

An incident response plan can be short. Name, phone, who calls counsel, who calls the carrier. One page beats a 40-page binder nobody can find.

### Who should sign the form

The person who can open the admin center should review every technical line. The office manager can gather documents. A partner should see the exclusions. If the only person who "knows IT" is a former employee, stop and fix offboarding before you bind anything.

Put the screenshots in a shared folder the broker can use next year. Name files with the date. When the same question comes back, you are not hunting Slack. That folder is also useful if a claim examiner asks how long MFA has been enforced. Dates beat adjectives. Keep that folder out of email if it has admin screenshots. Share it the same way you share other sensitive files.

## How to fill the application without lying

![Operations lead gathering MFA and backup evidence for a cyber insurance form](/images/blog/cyber-insurance-requirements-small-business-2.webp "Answer from the tenant and the backup console, not from memory")

1. Open the tenant. Screenshot MFA enforcement and a Conditional Access policy.
2. Open the backup console. Screenshot last job and last restore test, with a date.
3. Open EDR. Screenshot coverage count versus laptop count.
4. Open DNS. Screenshot DMARC.
5. Write the offboarding steps in six bullets.

If a control is missing, say no and give a date you will fix it. A broker can sometimes work with a plan. A surprise "yes" that fails after a claim is how you fight coverage.

Do not let the office manager invent answers because the IT person is on vacation. One owner. [Compliance and security audits](/services/compliance-security-audits/) exist for firms that want the evidence pack built once.

## Ninety days before renewal

Do not start the application the week the policy expires.

- Week 1: export the current form from the broker. Highlight every technical question.
- Week 2: collect screenshots. Fix MFA and obvious holes.
- Week 3: run a restore test and write the date on the form.
- Week 4: review exclusions with counsel or the broker, especially social engineering and funds transfer.

CISA's [Secure Your Business](https://www.cisa.gov/secure-our-world) list is a decent pre-binder checklist if you want a public version of the same ideas. FTC [small business cybersecurity](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity) is written for owners, not only for IT.

If a control will take longer than the bind date, tell the broker. A delayed bind with a true answer beats a fast bind with a story.

## Exclusions people skip

Read the social-engineering and funds-transfer language. Many policies treat a wired payment as a different event from "a system was hacked." A polished invoice scam may not look like a "cyber incident" to the claims team.

Ask the broker, in writing:

- Is BEC covered, and at what sublimit?
- Is a fraudulent instruction from a compromised vendor mailbox covered?
- Do we need a separate crime or social-engineering endorsement?

If the answer is mushy, assume you will argue later. Controls plus a clear endorsement beat hope.

## What insurance will not do

It will not configure Microsoft 365. It will not test the backup. It will not sit with AP on a fake invoice.

A policy can help pay counsel, forensics, and some losses. Deductibles and exclusions are real. BEC is a common fight. Read the form. Then do the controls so you are not relying on a fight.

Keep a folder of last year's answers next to this year's screenshots. Carriers notice when MFA was "yes" last year and the tenant still has security defaults off. Consistency is part of the story.

If you want the controls in place before the next renewal, [contact Secure Techies](/contact/). Bring the questionnaire. We will answer from the tenant, not from a sales deck.

A one-hour walkthrough of the form with someone who can click the admin center is cheaper than a denial, and cheaper than a claim fight. Do that walkthrough while the policy is still optional. After the binder, the questions get less friendly. The same screenshots you gather for the broker are the ones a claims examiner will ask for later, so date them and keep them.

![Reviewed cyber insurance questionnaire next to a laptop](/images/blog/cyber-insurance-requirements-small-business-3.webp "Evidence beats adjectives on a cyber application")
