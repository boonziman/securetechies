---
date: 2026-08-13
title: "Dark Web Credentials We Could Actually Reset"
meta_title: "Dark Web Credential Alert Case Study | Secure Techies"
description: "How Secure Techies handled a dark web credential alert at a Valley tech firm: reset, MFA, leftover guests, then a written watch. Read the full record."
image: "/images/case-studies/dark-web-credential-alert.webp"
categories: ["Cybersecurity"]
tags:
  - dark web monitoring
  - credential leak
  - password reset
  - Entra ID
  - technology IT
  - stolen credentials
draft: false
featured: false
industry: "Technology"
project_type: "Dark Web Credential Response"
location: "San Fernando Valley, CA"
timeline: "Same week plus 30 days"
client_size: "Early-stage software firm"
fact_industry: "Tech firm"
fact_location: "SF Valley"
fact_timeline: "1 week"
fact_project: "Credential alert"
card_text: "A monitoring alert named three work emails in a dump. We reset, enrolled MFA, and cut leftover guests. No invented breach number."
kicker: "Identity"
short_name: "Dark web credential alert"
hero_subtitle: "The dump was real. The passwords might have been old. We treated them as live until the tenant said otherwise."
hero_image: "images/case-studies/cs-dw-hero.webp"
hero_alt: "Founder at a standing desk in a small startup office at dusk"
client_heading: "A tech firm that got a name in a dump, not a movie breach"
client_image: "images/case-studies/cs-dw-client.webp"
client_alt: "Two people reviewing an out-of-focus alert packet"
mid_image: "images/case-studies/cs-dw-mid.webp"
mid_alt: "Hands at a laptop in a startup, screens out of focus"
band_image: "images/case-studies/cs-dw-band.webp"
band_alt: "Small startup network closet with a modest switch"
band_quote: "A dump is not a diagnosis. Reset is."
body_image: "images/case-studies/cs-dw-body.webp"
body_alt: "Three people in a startup conference room after the credential briefing"
anonymized: "Company name, staff names, and the dump source are withheld at the client's request. The engagement type, method, and constraints are real."
summary: "A San Fernando Valley software firm asked Secure Techies to handle a dark web credential alert after monitoring named three work emails in a public dump. We treated the passwords as live, reset, enrolled MFA, hunted inbox rules and leftover guests, and left a written watch. We did not invent a breach count or a dollar save."

goals:
  - title: "Treat the dump as live until proven otherwise"
    icon: shield
    text: "Old passwords still work when people reuse them. Reset first. Explain later."
  - title: "See whether a mailbox was owned"
    icon: search
    text: "A leak and a takeover look the same to the person reading Slack. They are not the same job."
  - title: "Leave a watch, not a war story"
    icon: list
    text: "The next dump will happen. Staff needed a one-page: reset, MFA, who to call."

challenge_heading: "Three work addresses in a dump nobody wanted to own"
challenge_intro: "The firm was not starting from zero. Microsoft 365 was daily work. What they lacked was a habit for when monitoring named their domain."
challenge:
  - title: "The dump did not say if the password still worked"
    text: "Hashes and old combos look the same in a report. Reuse is how they still work."
  - title: "MFA was incomplete"
    text: "Founders had Authenticator. A contractor mailbox and a shared ops box did not."
  - title: "Guests outlived contractors"
    text: "A 2024 contractor guest was still live. Offboarding had been a Slack message."
  - title: "Product engineering is not corporate IT"
    text: "The team could ship code. They did not want to become the help desk for password resets at 11 p.m."

process_heading: "Reset, hunt, then write the watch"
process_intro: "We treated the afternoon as an incident even if nothing had moved in the tenant yet."
process:
  - title: "Reset the named accounts"
    description: "Force password change, revoke sessions, check MFA. Out of scope: filing an IC3 complaint in the company's name."
  - title: "Read the mailboxes"
    description: "Inbox rules, forwarding, delegates, recent sign-ins. Assume takeover until the log says otherwise."
  - title: "Close the easy doors"
    description: "MFA on leftover mailboxes. Kill stale guests. Block legacy auth if it was still on."
  - title: "Write the watch"
    description: "What monitoring covers, who gets the next alert, what 'reset' means at 11 p.m."

workstreams_heading: "What we examined"
workstreams_intro: "A credential dump is not only a password problem. It is identity, mail flow, and whether reuse is still a habit."
workstreams:
  - title: "Named accounts"
    icon: identity
    description: "Reset, revoke, MFA, last password change vs dump date if we had one."
  - title: "Mailbox review"
    icon: mail
    description: "Rules, forwarding, send-as, sign-in logs."
  - title: "Guests and leftover access"
    icon: bug
    description: "Contractor guests, personal Microsoft accounts with admin."
  - title: "Tenant hygiene"
    icon: cloud
    description: "Legacy auth, Security Defaults, who held Global Admin."
  - title: "Watch and briefing"
    icon: talk
    description: "Who sees the next alert. Fifteen minutes with the people who ship."

metrics:
  - value: "3"
    label: "Named work emails"
  - value: "Same week"
    label: "Reset and MFA"
  - value: "Guests"
    label: "Stale access cut"
  - value: "Watch"
    label: "Written for next dump"

results_heading: "The dump became a checklist"
results:
  - "Named accounts reset, sessions revoked, MFA on"
  - "No hidden forwards or deleting rules found. We still rotated."
  - "Ops mailbox converted from a shared password to a shared mailbox"
  - "Stale contractor guest removed"
  - "Legacy auth checked and turned off where it was leftover"
  - "A one-page watch: who gets the alert, what reset means"
  - "No invented count of 'accounts saved' or dollars not stolen"
  - "Clear statement of what this was not: not a full forensic package, not a guarantee the password was in use"

technologies:
  - "Microsoft 365"
  - "Microsoft Entra ID"
  - "Entra ID Protection"
  - "Dark web monitoring"
  - "Microsoft Authenticator"

related_services:
  - title: "Cybersecurity"
    url: "/services/cybersecurity/"
    text: "Monitoring, MFA, and the identity work a dump usually names first."
  - title: "IT for technology companies"
    url: "/industries/technology/"
    text: "Corporate IT so the product team is not the help desk."
  - title: "Managed help desk"
    url: "/services/managed-help-desk/"
    text: "The number they call when the next alert arrives at 11 p.m."

faqs:
  - question: "What is a dark web credential alert?"
    answer: "It is a notice that an email address or password tied to your domain appeared in a dump or broker list. It is not proof the password still works. Secure Techies treats it as live until reset, MFA, and mailbox review say otherwise."
  - question: "Did someone actually break into the tenant?"
    answer: "In this job, sign-in logs and mailbox rules did not show a takeover. We still reset and enrolled MFA. A dump without a login is a gift you do not waste."
  - question: "Should we tell customers?"
    answer: "If customer data moved, that is a legal and product conversation. A work-email password in a third-party dump is not automatically a customer breach. We help the firm decide. We do not write the customer letter for them."
  - question: "Is Have I Been Pwned enough?"
    answer: "It is a useful public check for addresses. It is not a monitoring program, and it is not a reset. This firm already paid for monitoring. The work was using the alert."
  - question: "Do we report this to IC3?"
    answer: "If money moved or a mailbox was owned, report it. A dump hit with no tenant evidence is still worth a conversation. We help them decide. We do not file in their name."
  - question: "Will this stop the next dump?"
    answer: "No. Dumps keep coming. MFA, unique passwords, and a written reset path are how the next one stays boring."

cta_heading: "Got a credential alert, or do not want the next one to be a scramble?"
cta_text: "Secure Techies handles dark web credential alerts and Microsoft 365 identity for Southern California tech firms and offices. Start with a conversation in Canoga Park."
---

Three work emails showed up in a dump. The founders wanted to know if anyone was in the tenant, and what to do before the next alert. They did not want a movie.

That is the usual starting point for **dark web monitoring** that actually produces work. A San Fernando Valley [technology](/industries/technology/) firm called Secure Techies after a monitoring product named their domain. They ship software. They did not want to become the after-hours [help desk](/services/managed-help-desk/).

This case study records the reset, the mailbox hunt, the leftover guest, and the one-page watch. Company identifiers stay out. The method does not. We will not invent a count of accounts we "saved."

## Why they called

Product teams reuse passwords when a personal GitHub leak and a work mailbox share a habit. [Have I Been Pwned](https://haveibeenpwned.com/) is the public version of that news. A monitoring feed is the version you pay for. Neither one resets the tenant for you.

CISA's note on [phishing and social engineering](https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks) is about the next login, not the last dump. The [FTC small-business cybersecurity](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity) pages say the same thing in owner language: you still own the accounts.

Two facts set the afternoon:

1. Three addresses were work domain, not personal Gmail.
2. MFA was missing on a contractor mailbox that still received customer mail.

The dump named a founder, an ops mailbox, and a contractor who had rolled off in 2024 but whose guest still sat in Entra. The monitoring vendor's email said "credentials found." It did not say whether the hash was current, whether anyone had tried it, or whether the password had been reused on GitHub last year. That is normal. Combo lists do not come with a diagnosis.

We had no leftover sign-in report from a prior MSP. We treated the dump as live until the tenant said otherwise.

The founders' first instinct was to ask whether they should email customers. That is a legal question if customer data moved. It is not the first IT question. The first IT question is whether a mailbox is owned, whether a session is still open, and whether a leftover guest can still open mail.

## What this engagement was, and was not

Secure Techies sells [cybersecurity](/services/cybersecurity/) and Microsoft 365 operations. A dark web credential alert is incident-lite plus a short harden. It is not a courtroom forensic package, and it is not a promise that monitoring will stop the next dump.

We wrote the non-goals down before we touched Global Admin.

Out of scope on purpose:

- Filing an [IC3](https://www.ic3.gov/) complaint in the firm's name
- Inventing a loss number
- A full penetration test
- Pretending monitoring replaces MFA
- A customer-notification letter we are not counsel to write

In scope:

- Reset and session revoke
- Mailbox and sign-in review
- MFA on leftover boxes
- Stale guests
- A written watch for the next feed hit

Microsoft documents [Entra ID Protection](https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection) as risk-based identity. We used the tenant we had. We did not sell a new SKU to look busy. If Protection had a risky-user flag on those three accounts, we would have treated it. It did not. The dump still justified a reset.

## How we worked the alert

### Hour one: reset

First: force password change on the three named accounts. Revoke sessions. Confirm MFA. Microsoft's [how MFA works](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks) is the reason a dump without a second factor is still a problem. Microsoft also documents how to [revoke user access in an emergency](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access): disable if needed, revoke sessions, understand that access tokens can live until they expire. We revoked. We did not disable the founder accounts, because they still had to ship. We did disable the leftover guest.

We did not argue about whether the hash was current. Reuse is cheaper to assume than to prove. A password that appeared in a third-party dump is a password you should not keep, even if last-change in Entra is more recent than the dump date.

The founder who got the monitoring email had already changed their own password in a panic, from a phone, without revoking sessions. That is a common first move and it is incomplete. A refresh token on a laptop they left at the office would still have been good. Revoke is the part people skip.

### The rest of the day: the mailboxes

A leak and a takeover require different work. We assumed both until the logs said otherwise.

What we opened:

- Inbox rules and forwarding, including rules that delete after they forward
- Delegates and send-as
- Recent interactive and non-interactive sign-ins
- Whether Global Admin was a personal Microsoft account
- App passwords leftover from legacy IMAP
- Whether Security Defaults were on, or someone had turned them off because a script broke

The mailboxes did not show a takeover. No hidden forward. Sign-ins matched the people in the room, from expected cities, on expected devices. That was good news. It was not a reason to skip the rest.

We read interactive and non-interactive sign-ins for 30 days, not just today's successes. A dump that is a week old can already have been tried. We looked for client apps nobody in the room recognized, overnight successes, and a fail-then-success pair from a new country. We did not find those.

Inbox rules: we opened Outlook on the web for each named box and looked for rules that forward and then delete, including rules a user cannot see in the desktop client if they never open the rules wizard. That is the quiet payday in a mailbox takeover. None were there. We wrote "none found" so the next person does not have to guess.

CIS [Access Control Management](https://www.cisecurity.org/controls/access-control-management) still applies: leftover guests and password-only shared mail are access you forgot. The 2024 contractor guest had last signed in months ago. Access was still live. Offboarding had been a Slack goodbye.

We also looked at the shared ops mailbox. Two people knew the password. It had no MFA. Customer mail still landed there when a form on the marketing site used that address. That is not a process. That is a shared secret with a public inbox. We converted it to a real shared mailbox: Full Access for the two people, sign-in blocked on the mailbox itself, MFA on the people who open it. The marketing form kept the same address. The password on a sticky note did not.

### The week: harden and write

We enrolled the contractor mailbox on Authenticator, then converted ops to a shared mailbox so nobody signed into it as a person. We cut the 2024 guest. We checked legacy auth and turned Basic Authentication off where it was leftover. We wrote the watch. We sat with the people who actually ship, for fifteen minutes, and walked the 11 p.m. path: who gets the next alert, what "reset" means, which number to call.

The watch is one page on purpose. A 40-page incident plan would have sat in a Drive folder nobody opens. The page names the monitoring product, the mailbox that receives alerts, the Global Admin backup, and the [managed help desk](/services/managed-help-desk/) number. It says reset first, then call. It does not say "investigate the dump vendor."

## What the tenant actually showed

**The dump was a third-party combo list.** Not proof of a Microsoft breach. Not proof the password still worked. Enough to reset. The monitoring vendor named a source we will not reprint. It was a public leak of an unrelated consumer site, plus work emails that had been used as usernames. That is the usual path: your domain in someone else's breach.

**The founder mailboxes were not owned.** We still rotated, because "probably fine" is how leftover sessions survive an afternoon. Sign-in logs for the prior 30 days did not show a stranger. They showed the founder, from the office and from home, and one travel login they could name.

**A contractor mailbox could still receive customer mail.** It had no MFA. Two people knew the password. The contractor was gone. The mailbox was not. Form submissions still arrived. That is how a dump row becomes a customer conversation you did not plan.

**A guest outlived the contract.** Last sign-in was months old. Access was still live. The guest had been invited to a product-spec library "for two weeks." The library was still shared. That is the same leftover pattern we keep finding in [employee offboarding](/blog/employee-offboarding-it-checklist/).

**Global Admin was two people, both founders, both with Authenticator.** That was better than a personal Microsoft account as admin, which we have seen elsewhere. We still wrote down who the break-glass account was. There was not one. We put that on the watch as a next item, not a same-day panic.

None of this required a new monitoring product. It required an afternoon that treated an alert as a gift.

## What we would not do

We would not claim we stopped a hack in progress. The logs did not show one.

We would not invent "47 credentials remediated" when three work addresses were named.

We would not tell them to email every customer. No customer data had a demonstrated path out of the tenant. If counsel later wanted a notice, they would have facts: dump source, accounts reset, no mailbox takeover found. We are not their lawyer.

We would not skip the watch because everyone was tired.

We would not buy a second monitoring product because the first one had done its job.

Our [dark web monitoring](/blog/dark-web-monitoring/) guide is the product background. This page is one alert. [Password management](/blog/password-management-best-practices/) is the reuse chapter. [MFA](/blog/mfa-multi-factor-authentication/) is the second lock.

## What the packet contained

1. **Named accounts.** Reset, MFA, last sign-in, session revoke time.
2. **Mailbox notes.** Rules, forwards, none found, still rotated.
3. **Guest list.** Cut vs live, with the 2024 contractor called out.
4. **Tenant hygiene.** Legacy auth, Security Defaults, who held Global Admin.
5. **Watch page.** Who gets the next alert, what reset means at 11 p.m., help desk number.

The packet is short enough to re-read when the next alert arrives. It is specific enough that a new engineer could pick it up without a tour. Screenshots of settings sat in an appendix. Adjectives stayed out of the watch. Offboarding now includes the guest, so the next contractor does not become the next dump row.

## What we verified before we called it closed

An alert with no reset is a blog post.

| Gate | What "done" meant here |
| --- | --- |
| Named accounts | Password reset, sessions revoked, MFA on |
| Mailboxes | Rules and forwards checked |
| Guests | Stale contractor cut |
| Legacy | Basic auth off where leftover |
| Watch | One page, owner, help desk on it |
| Briefing | Founders who ship actually heard the 11 p.m. path |

We sat on the tenant for 30 days after the reset. The monitoring feed did not name new work addresses in that window. Sign-ins on the three accounts stayed boring. That is not a guarantee. It is a close-out note.

What they had that they did not have that morning:

- A clear answer: dump, not proven takeover, with the evidence
- MFA on the leftover mailboxes
- A guest that could not still open mail
- A watch for the next feed hit
- A help desk number that was not a founder's cell

What they still did not have, and should not claim:

- A guarantee the next dump never names them
- A customer-notification package
- A substitute for unique passwords
- A break-glass account (that stayed on the next-item list)

## Lessons we would repeat

**Reset first.** Debating hash age is how reuse wins.

**Revoke sessions, not just the password.** A panic change from a phone leaves tokens on the laptop at the office.

**Assume takeover until the log says no.** Rules and forwards are the quiet payday. Look for the rule that deletes after it forwards.

**MFA on contractor mail.** "They are not staff" is not a control. If the mailbox receives customer mail, it is staff for the purpose of MFA.

**Cut guests when the contract ends.** Slack goodbye is not offboarding.

**Write the 11 p.m. path.** The next alert will not wait for a board meeting. One page beats a binder.

**Do not turn a dump into a customer letter by default.** If data did not leave, do not perform a breach you cannot show.

## Planning for a dump with your name on it

If monitoring just named a work address, reset, revoke, check MFA, then call us. If nothing has happened yet and you want the watch written first, bring Global Admin and whoever actually reads the alerts.

Do not paste the dump into Slack. Do not email the hashes around. Do not disable every account in a panic and lock the company out of its own tenant.

Secure Techies works from Canoga Park with [technology](/industries/technology/) firms and other Southern California offices. [Schedule a consultation](/contact/) if you want the same kind of reset-and-watch this client used.

For a different project record, see [SharePoint oversharing cleanup for a media agency](/case-studies/sharepoint-external-sharing-cleanup/).
