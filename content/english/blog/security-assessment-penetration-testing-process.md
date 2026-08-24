---
title: "How Security Assessments and Penetration Testing Are Conducted"
meta_title: "Security Assessment and Pen Testing Process | Secure Techies"
description: "How security assessments and penetration testing find vulnerabilities on a new platform: infrastructure, APIs, scans, then a manual test that proves the path."
date: 2026-08-23
image: "/images/blog/security-assessment-penetration-testing-process.webp"
categories: ["Cybersecurity"]
author: "Secure Techies"
tags:
  - security assessments
  - penetration testing
  - vulnerability identification
  - API security testing
  - cybersecurity platform
  - security testing process
draft: false
faq:
  - question: "How are security assessments and penetration testing conducted?"
    answer: "You scope the platform, review infrastructure and APIs, run automated scans for known weaknesses, then have skilled testers try to exploit what the scanners cannot model. Findings are ranked, fixed, and retested. The point is to catch holes before a real incident, not to produce an unread PDF."
  - question: "What should you test on a new cybersecurity platform?"
    answer: "The new stack itself: identity, APIs, admin consoles, logging, integrations, and the aging systems it still talks to. A platform that is new in marketing can still sit on an unpatched VPN or a leftover guest account. Test the path an attacker would actually use, not only the vendor demo."
  - question: "Do you start with scanners or with a manual pen test?"
    answer: "Both, in that order for most shops. Scans give coverage of known CVEs and stale software. Manual penetration testing then pokes authentication, APIs, and business workflows the way a real attacker would. A scan-only engagement will miss logic and chaining. A pen test with no scan behind it wastes expensive hours on obvious patches."
  - question: "How is this different from a compliance audit?"
    answer: "An assessment or pen test asks what an attacker can do. An audit asks whether controls match a framework and whether you have evidence. NIST SP 800-53A is the control-assessment companion to 800-53. You can need all three across a year. Do not treat a SOC 2 report as proof nobody can break in."
  - question: "When should you test a newly launched platform?"
    answer: "Before it holds real customer data if you can, and again after the first integrations go live. Significant change (new IdP, new API, new region) is a retest trigger. Catching issues in a practice window is cheaper than catching them in production at 2 a.m."
---

Here's the short version: **security assessments and penetration testing find vulnerabilities in a new cybersecurity platform by reviewing the infrastructure and APIs, scanning for known weaknesses, then having skilled testers attack the live system the way a real adversary would.** Automated checklists are not enough. The goal is to catch the holes now so your first crisis is a practice drill.

That is true whether "the platform" is a product you are about to sell, or the new security stack you just stood up for your own office: identity, EDR, a SIEM, a customer portal. New does not mean empty. It usually means new code sitting on old network, old tenants, and APIs nobody inventoried.

If you want the shorter argument for why a human still has to try, read [manual vs automated penetration testing](/blog/manual-penetration-testing-vs-automated/). This page is the process: how the work is actually conducted.

## How a security assessment and penetration test starts

Once the platform is up and running, it is time to break things, on purpose. You do that under a written scope. Who owns the system. What is in. What is out. Which accounts the testers may use. When they may not (payroll night, clinic hours). Who they call if something falls over.

NIST's [SP 800-53A](https://csrc.nist.gov/publications/detail/sp/800-53a/rev-5/final) is the control-assessment companion to SP 800-53. It is built for assessing whether controls are implemented correctly, operating as intended, and producing the outcome you claimed. That is a security assessment. A penetration test is the more aggressive cousin: testers try to prove impact. Do not mix those two statements of work on the same cover page.

Think of the testers as **white-hat burglars** you invited in before the real ones arrive. They still need a key to the building and a rule that says they cannot smash the glass in the waiting room.

Out of scope, written down:

- Production data copies you did not sanitize
- Denial-of-service that would take paying customers offline, unless you asked for it
- Social engineering of staff who were not briefed, unless that is a separate SOW

## Review the infrastructure first

Security assessments start with a thorough review of the **IT infrastructure**: how the platform is hosted, who can reach the admin plane, what still runs unpatched, and which "temporary" VPN still answers.

CIS puts this in plain safeguards: know your assets, configure them on purpose, manage vulnerabilities ([CIS Critical Security Controls](https://www.cisecurity.org/controls)). A new dashboard does not retire an old jump box.

What we actually look at on a new stack:

- Identity: who is Global Admin, leftover guests, MFA gaps
- Network path: public admin pages, unused VPN, flat VLANs
- Endpoints and servers the platform depends on
- Logging: if the new SIEM cannot see the app, the platform is a blindfold
- Aging tech someone forgot to patch, including the "we will replace it next quarter" server

CISA publishes [no-cost cyber services and tools](https://www.cisa.gov/resources-tools/resources/no-cost-cybersecurity-services-and-tools), including external scanning for eligible organizations. That is coverage. It is not a substitute for walking the closet and the tenant with someone who knows the business.

Configuration errors show up here more often than Hollywood zero-days. Security Defaults off. Debug endpoints on the internet. A storage account public because a contractor needed it on Friday.

## Then the APIs, because that is where the platform actually talks

A cybersecurity platform that does not expose APIs is rare. Customer tenants, alert webhooks, identity connectors, ticketing: those interfaces are the product.

The [OWASP API Security Project](https://owasp.org/www-project-api-security/) exists because web-app scanners miss API-shaped bugs. The 2023 Top 10 leads with broken object-level authorization: change an ID, see someone else's tenant. Then broken authentication, property-level authorization, unrestricted resource consumption. If your "new platform" issues tokens and takes object IDs from the client, those tests belong in week one.

[OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) is the verification-standard version of the same idea: a list of what "done" means for an application, at different levels of rigor. Use it to decide how deep the assessment needs to go. A marketing site is not a multi-tenant security console.

API work that actually finds things:

- Authenticate as user A, request user B's object
- Replay a token after logout
- Hit admin functions with a standard role
- Skip a step in a workflow the UI would not allow
- Watch for verbose errors that dump stack traces into a customer tenant

![Open office workstations used during a cybersecurity platform security review](/images/blog/security-assessment-penetration-testing-process-2.webp "A new cybersecurity platform still sits on identity, APIs, and the network underneath")

## Automated scans: coverage, not the whole job

We do not skip scanners. They are how you find **known weaknesses, configuration errors, and aging software** across a lot of hosts without burning tester hours.

Use them for:

- Internet-facing services and the CISA [Known Exploited Vulnerabilities](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) that should jump the queue
- Missing patches on the boxes the new platform actually runs on
- Default credentials and leftover admin interfaces
- A baseline you can rescan after fixes

Do not use them as the entire assessment. A scanner will not notice that your new "unified" console still trusts a personal Microsoft account as Global Admin. It will not notice that the API authorizes on tenant ID in the URL and nowhere else.

[FTC data security guidance](https://www.ftc.gov/business-guidance/privacy-security/data-security) still treats assessment and remediation as part of running a business that handles other people's information. A scan you never ticket is not that.

## Manual penetration testing: poke, prod, and trick the system

This is where skilled security people act like real-world attackers. They will **poke, prod, and trick the system**, hunting for loopholes software scanners miss.

On a new cybersecurity platform, that usually means:

- Can a low-privilege analyst read another customer's alerts?
- Can they disable logging for their own session?
- Can they invite a guest who inherits too much?
- Can they get from the support portal into the production tenant?
- Can they chain a medium CVE on the jump host with a leftover key?

That is the same discipline as a [network vulnerability assessment](/blog/network-vulnerability-assessment/), plus exploitation. Assessment ranks. The pen test proves. Both belong on a new platform because "we just launched" is when shortcuts are still live: debug flags, shared credentials, a contractor who still has the repo.

Hands-on testing plus automated scans is how you check that defenses are not theoretical. A pretty architecture diagram is not a control. A control is what still holds when someone tries.

Rules of engagement belong on paper before that week starts. Named test accounts, not the CEO's mailbox. A kill switch if a customer-facing API starts failing. A daily log of what was tried so you can distinguish a tester from an incident. If you cannot tell those two apart in the SIEM, that is itself a finding: the new platform did not make threats more visible. It hid them in the same pile as your own test traffic.

Evidence is screenshots, request/response pairs, and timestamps, not a severity color. A finding without a reproduction step will not get fixed. A finding with a reproduction step and no owner will not get fixed either. The drill only counts if someone is assigned.

## How the two-week (or four-week) window usually runs

Cadence depends on size. A 20-person office standing up Microsoft 365 security is not a multi-tenant SaaS launch. The steps rhyme.

### Week 1: inventory and review

List systems, APIs, admin planes, data stores, and who can approve a change. Pull tenant settings. Export firewall rules. Read the identity roles. Interview the person who actually shipped the platform, not only the person who bought it.

### Weeks 2 and 3: scan, then attack

Authenticated and unauthenticated scans first. Then manual work on the findings that would hurt, plus the workflows scanners cannot see. Keep a daily check-in so a tester does not wander into an out-of-scope payment processor.

### Last week: report, rank, and retest the easy wins

A useful packet has three layers, the same way we write [risk assessments](/case-studies/financial-services-risk-assessment/):

| Audience | What they get |
| --- | --- |
| Owner / board | What would hurt first, in plain English |
| Operations | Ranked fix list with owners |
| Next engineer | Evidence, not adjectives |

Retest the items you claimed to close. A "fixed" finding that still works is the most expensive kind of theater.

![Two colleagues reviewing a printed security assessment findings packet](/images/blog/security-assessment-penetration-testing-process-3.webp "Rank findings, assign owners, and retest. A PDF is not the finish line")

## What "done" means before you call it a practice drill

The end goal the client brief got right: **catch the vulnerabilities now, so your first real crisis is just a practice drill.** That only works if findings become tickets.

Gates we use:

- Scope was written, including APIs
- Infrastructure review actually happened (tenant, closet, identity)
- Scans ran, noise was pulled out
- Manual testing tried at least one chained path
- High-impact items have owners and dates
- A rescan or retest is on the calendar

What this is not:

- A SOC 2 report ([SOC 2](/blog/soc-2-compliance/) is an auditor's letter, not a break-in test)
- A guarantee the next CVE never lands
- Permission to skip [MFA](/blog/mfa-multi-factor-authentication/) and [EDR](/blog/endpoint-detection-response/) because "we were tested"

[Incident response](/blog/incident-response-plan/) should be updated with what the test proved you could not see. If the new platform did not log the tester's path, that is a finding, not a footnote.

## How Southern California teams should staff this

From Canoga Park we see the same pattern on new stacks: the product team shipped, the office manager is still Global Admin, and nobody owns the first assessment. [Managed cybersecurity](/services/cybersecurity/) can run the scan cycle. A scoped pen test is a project. [Compliance audits](/services/compliance-security-audits/) sit next door when a customer questionnaire arrives.

You do not need all three the week you turn the platform on. You do need an honest first pass on infrastructure and APIs before real customer data lives there.

If you are about to launch, or you just did, bring the architecture diagram, Global Admin, and the person who wrote the API. [Contact Secure Techies](/contact/) to scope a security assessment and, where it belongs, a penetration test that actually tries to break in.
