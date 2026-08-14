---
date: 2026-08-13
title: "A Close Call With a Fake Wire Instruction"
meta_title: "Wire Fraud Email Close Call Case Study | Secure Techies"
description: "How Secure Techies handled a fake wire instruction at a law firm: mailbox review, MFA, email authentication, and a written call-back. Read the record."
image: "/images/case-studies/wire-fraud-email-close-call.webp"
categories: ["Cybersecurity"]
tags:
  - wire fraud email
  - business email compromise
  - fake wire instruction
  - email authentication
  - law firm email security
  - DMARC
draft: false
featured: true
industry: "Law Firms"
project_type: "Email Security Response"
location: "San Fernando Valley, CA"
timeline: "Same afternoon plus one week"
client_size: "Boutique firm, ~20 people"
fact_industry: "Law firm"
fact_location: "SF Valley"
fact_timeline: "1 week"
fact_project: "Email security"
card_text: "A lookalike email almost moved a settlement wire. Staff called the partner first. Then we locked the tenant down."
kicker: "Email security"
short_name: "Fake wire instruction"
hero_subtitle: "The money did not move. The email still had to be treated as an incident: mailbox, identity, authentication, and a written call-back."
hero_image: "images/case-studies/cs-wire-hero.webp"
hero_alt: "Attorney at a worn conference table with closed folders and a laptop, late afternoon Valley light"
client_heading: "A firm that almost sent a settlement to the wrong account"
client_image: "images/case-studies/cs-wire-client.webp"
client_alt: "Office manager and attorney reviewing papers in a small law office"
mid_image: "images/case-studies/cs-wire-mid.webp"
mid_alt: "Associate at a cluttered desk with dark dual monitors"
band_image: "images/case-studies/cs-wire-band.webp"
band_alt: "Law firm conference table at dusk with a landline phone, closed laptop, and stacked folders"
band_quote: "The email looked like the partner. The phone call did not."
body_image: "images/case-studies/cs-wire-body.webp"
body_alt: "Office manager on a landline taking notes during an out-of-band call-back"
anonymized: "Firm name, staff names, matter captions, and the exact dollar amount are withheld at the client's request. The engagement type, method, and constraints are real."
summary: "A San Fernando Valley law firm almost sent a settlement wire after a lookalike email used a partner's display name. Staff called the partner on a known number first. The partner had not sent it. Secure Techies reviewed the mailboxes, closed identity gaps, set email authentication on a path to enforcement, and left a written call-back that is now a rule, not a suggestion."

goals_heading: "What had to be true before we left"
goals:
  - title: "Prove the money path was closed"
    icon: shield
    text: "No wire, no new payee, no silent inbox rule still forwarding the next try. Contain first. Explain later."
  - title: "See whether a mailbox was actually owned"
    icon: search
    text: "Display-name spoof and account takeover look the same to the person holding the check. They are not the same job."
  - title: "Leave a rule staff will follow on a Friday"
    icon: check
    text: "A call-back on a number already in the file, not in the email. Written. Dual control on the wire itself."

challenge_heading: "What made the afternoon dangerous"
challenge_intro: "The firm did not lose money. They still had a live lookalike, a tenant they had never really audited, and a wire process that lived in people's heads."
challenge:
  - title: "The email used a name everyone trusted"
    text: "Display name matched a partner. The domain was one character off if you stared. On a phone screen it looked like internal mail. Urgency did the rest: settlement, today, new account."
  - title: "Nobody could say if the mailbox was owned"
    text: "A spoof does not need your password. A takeover does. Until we looked at rules, forwarding, sign-in logs, and MFA, we had to assume both."
  - title: "Authentication was half-finished"
    text: "SPF and DKIM existed. DMARC was monitoring. Impersonation protection was the default policy, which is not the same as naming the partners attackers would impersonate."
  - title: "The wire process was a habit, not a rule"
    text: "The office manager did the right thing this time. There was no written requirement that the next person would."

process_heading: "Contain, then harden, then write it down"
process_intro: "We treated the afternoon as an incident even though the money stayed put. A close call is how you find out whether the next one would have landed."
process:
  - title: "Freeze the payment path"
    description: "Confirm no wire left the bank. Hold any payee change. Tell staff: no payment or banking change from email until we say otherwise."
  - title: "Read the mailboxes, not the story"
    description: "Inbox rules, forwarding, delegates, recent sign-ins, MFA status on the partner and the people who can move money."
  - title: "Close the easy doors"
    description: "MFA on every privileged and finance mailbox. Kill leftover forwards. Start DMARC toward enforcement. Name the partners in anti-phishing impersonation."
  - title: "Write the call-back"
    description: "Out-of-band verification on a number already in the file. Dual control on the wire. A one-page note staff actually read."

workstreams_heading: "What we examined"
workstreams_intro: "A fake wire instruction is not only an email problem. It is identity, mail flow, and the habit at the desk."
workstreams:
  - title: "Mailbox and mail-flow review"
    icon: mail
    description: "Rules, forwarding, send-as, and whether anything was quietly copying mail out of the firm."
  - title: "Identity and MFA"
    icon: identity
    description: "Who held Global Admin, who could approve a wire, and whether a stolen password was enough."
  - title: "Email authentication"
    icon: shield
    description: "SPF, DKIM, and DMARC as they actually were, not as last year's questionnaire claimed."
  - title: "Impersonation controls"
    icon: scan
    description: "Anti-phishing policy: named users, owned domains, what happens when a lookalike arrives."
  - title: "Wire process"
    icon: policy
    description: "Who can initiate, who can approve, which phone number counts, what gets written down."
  - title: "Staff briefing"
    icon: talk
    description: "Fifteen minutes with the people who move money. The sample email. The rule. No slide deck."

metrics:
  - value: "0"
    label: "Dollars sent"
  - value: "1"
    label: "Afternoon contain"
  - value: "1 wk"
    label: "Harden and write-up"
  - value: "2"
    label: "People on every wire"

results_heading: "What the firm had a week later"
results:
  - "Confirmation the lookalike was a display-name / lookalike-domain message, not a partner mailbox takeover. We still treated it as if it could have been both."
  - "MFA on every privileged account and every mailbox that can start or approve a payment."
  - "No leftover inbox forwards. Delegates listed and owned."
  - "DMARC moved from monitor-only toward enforcement after a clean reporting window."
  - "Partners and the controller named in anti-phishing impersonation protection."
  - "A one-page call-back rule: known number, two people, no exceptions for 'the partner is in court.'"
  - "No invented dollar figure for money that never left the account."

technologies:
  - "Microsoft 365"
  - "Entra ID"
  - "SPF / DKIM / DMARC"
  - "Defender anti-phishing"

related_services:
  - title: "Cybersecurity"
    url: "/services/cybersecurity/"
    text: "Identity, email authentication, and the monitoring that should sit under a close call."
  - title: "Managed help desk"
    url: "/services/managed-help-desk/"
    text: "The number staff call when the next urgent email arrives at 4:50 p.m."
  - title: "Compliance and security audits"
    url: "/services/compliance-security-audits/"
    text: "If you want the tenant reviewed before the close call, not after."

faqs:
  - question: "Did the firm lose money?"
    answer: "No. Staff called the partner on a number they already had. The partner had not sent the email. This page is a close call, not a recovery of a completed wire. We do not invent a dollar save for money that never moved."
  - question: "Was this a mailbox takeover or a spoof?"
    answer: "The message used a lookalike domain and the partner's display name. Sign-in logs and the mailbox did not show a takeover. We still hunted for inbox rules and forwards, because those are how a quiet compromise keeps paying off after the first email."
  - question: "What is a call-back, exactly?"
    answer: "You do not reply to the email. You do not use a phone number printed in the email. You call a number already in your file or in the signature block from a prior, trusted message, and you confirm the payee and the amount with a human. If you cannot reach them, the wire waits."
  - question: "Does DMARC stop business email compromise?"
    answer: "DMARC makes it harder to spoof your own domain. It does not stop a lookalike domain, a compromised vendor, or a well-written display-name trick. Pair it with MFA, impersonation protection, and the call-back. Tools narrow the funnel. The habit stops the wire."
  - question: "Should we report a close call to IC3?"
    answer: "If money moved, report it immediately to your bank and to the FBI's Internet Crime Complaint Center. A close call with no loss is still worth a report if you have headers and the lookalike domain. We help the firm decide. We do not file the complaint for them."
  - question: "Is this only a law firm problem?"
    answer: "No. Any office that wires money on email is in scope: real estate, construction draws, professional services. Law firms are a frequent target because settlement and trust accounting look routine. The method is the same."

cta_heading: "Had a close call, or do not want one?"
cta_text: "Secure Techies reviews Microsoft 365, email authentication, and the wire process for Southern California firms. Start with a conversation in Canoga Park."
---

The fake wire instruction used the partner's name, a settlement the office already knew about, and a new account number that needed to go out before close of business. It was a [business email compromise](/blog/business-email-compromise/) attempt dressed as a routine wire fraud email.

The office manager called the partner on the cell number already in the directory. The partner was in a hearing. He had not sent anything. The wire stayed in the account.

That is when the [law firm](/industries/law-firms/) called Secure Techies. They wanted to know whether a mailbox was owned, whether the next email would look the same, and what to write down so the next person at the desk did the same call. This page is that afternoon and the week after. Client identifiers stay out. The method does not.

## What the fake wire instruction almost did

The message was not clever in a cinematic way. It was ordinary. Display name matched a partner. The subject named a real matter. The body asked for a payee change because "the client updated their account." On a laptop, if you hovered the From address, the domain was wrong by one character. On a phone, most people would not hover.

The FBI's Internet Crime Complaint Center has been publishing the same pattern for years: attackers impersonate a trusted party and ask for a legitimate-looking transfer of funds ([IC3 on business email compromise](https://www.ic3.gov/CrimeInfo/BEC)). Their 2024 update put adjusted BEC losses since 2013 in the tens of billions. That is a national series, not a quote for this office ([IC3 PSA, September 2024](https://www.ic3.gov/PSA/2024/PSA240911)). It is still the number partners have in their heads when they ask "could that have been us."

It could have been. The only reason it was not is a phone call that was not required in writing.

CISA's guidance on social engineering is blunt: verify unexpected requests out of band, not inside the same thread that asked you to hurry ([CISA on phishing and social engineering](https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks)). The office manager already knew that. The process did not.

## What this engagement was, and was not

Secure Techies sells [cybersecurity](/services/cybersecurity/) and Microsoft 365 operations. A close-call review is incident work plus a short harden. It is not a courtroom forensic package and it is not a claim that we "saved" a dollar figure the bank never sent.

We wrote the non-goals down.

Out of scope on purpose:

- A full penetration test
- Pretending a week of email work replaces daily monitoring
- Filing an IC3 complaint in the firm's name
- Inventing a loss number for a wire that did not leave

In scope:

- Contain the payment path
- Mailbox and identity review
- Email authentication and impersonation controls
- A written call-back and dual control
- A staff briefing the people who move money actually attended

The [American Bar Association's cybersecurity work](https://www.americanbar.org/groups/cybersecurity/) exists because competence now includes the technology that holds client funds and client mail. That is not a slogan. It is why a lookalike email is an ethics problem as well as an IT problem.

## How we worked the afternoon

### Hour one: contain

First question: did any money move. It had not. Second: was any payee file already edited. It was not. Third: tell the room, in one sentence, that no payment or banking change from email goes out until we finish the review.

We collected the message as it sat: headers, the lookalike domain, who it was sent to, who was cc'd. We did not need a novel. We needed evidence we could still see after someone hit delete.

### The rest of the day: the mailboxes

A spoof and a takeover require different work. A spoof means the partner's mailbox may be fine and the attacker never had a password. A takeover means inbox rules, forwards, and a quiet copy of everything the partner reads.

We assumed both until the tenant said otherwise.

What we opened:

- Inbox rules and automatic forwarding on the partner, the office manager, and accounting
- Delegates and send-as
- Recent sign-ins and MFA status
- Whether Global Admin was a shared password from a prior vendor

The mailboxes did not show a takeover. No hidden forward. No rule deleting sent items. Sign-ins matched the people in the room. That was good news. It was not a reason to skip the rest. The next email might not be a spoof.

Microsoft documents how multifactor authentication stops a stolen password from becoming a tenant problem ([how Entra MFA works](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks)). MFA was on for most users and missing on a shared operations mailbox that sometimes initiated wires "so we are not stuck when someone is out." That mailbox was the real finding, not the lookalike domain.

### The week: harden and write

We did not rip tools for theater. We closed the doors this firm actually left open, then we wrote the habit down.

## What the mailbox actually showed

**The message was a lookalike.** One-character domain. Partner display name. No malware, no link that mattered. That is why the spam folder did not save them. There was nothing for a simple filter to hate.

**The partner mailbox was not owned.** We still rotated the password and confirmed MFA, because "probably fine" is how leftover sessions survive an afternoon.

**A shared mailbox could start a wire.** It had no MFA. Two people knew the password. That is not a process. That is a hope.

**Delegates were undocumented.** A former assistant still had access to a partner calendar and mail. Offboarding had been a conversation, not a ticket.

None of this required a nation-state. It required an afternoon that treated a close call as a gift you do not waste.

## Email authentication and impersonation

SPF and DKIM were present. DMARC was `p=none`. Microsoft is explicit that the set is incomplete until DMARC is actually enforcing, after you have watched the reports ([set up DMARC in Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/email-authentication-dmarc-configure)). Monitor-only is better than nothing. It is also what a questionnaire calls "we have DMARC" when you do not.

We moved them onto a short reporting window, then toward quarantine for failures, with a named owner for the reports. We did not flip enforcement the same afternoon as the scare. A bad cut breaks legitimate mail and teaches the firm to ignore the next change.

Anti-phishing policy was the tenant default. Defaults do not name the three partners an attacker would impersonate. Microsoft's anti-phishing policies are built to do exactly that: spoof intelligence for everyone, impersonation protection when you tell the product who matters ([anti-phishing policies in Microsoft 365](https://learn.microsoft.com/en-us/defender-office-365/anti-phishing-policies-about)). We named the partners, the controller, and the owned domain.

DMARC will not stop a lookalike domain. Impersonation protection might flag it. The call-back stops the wire either way. Stack the three. Do not pick a favorite.

If you want the longer hygiene list this week sat on, our [Microsoft 365 security checklist](/blog/microsoft-365-security-checklist/) and [phishing](/blog/phishing-email-security/) guide are the same controls in blog form. [MFA](/blog/mfa-multi-factor-authentication/) is the identity half.

## The process that stops the next one

Tools narrow the funnel. The desk stops the payment.

The written rule we left is short enough to tape inside a drawer:

1. Any new payee, any changed account, any "send today" wire from email is unverified until a human on a known number says it is real.
2. The number comes from the directory or a prior trusted signature, never from the email that asked.
3. Two people: one initiates, one approves. "The partner is in court" is not an exception. It is a reason to wait.
4. If you cannot reach them, the wire waits. A delayed settlement is cheaper than a second wire you cannot get back.

We ran a fifteen-minute briefing with the people who actually move money. We showed the sample. We did not do an hour of slides. [Security awareness training](/blog/employee-security-awareness-training/) still belongs on the calendar. The briefing was for this incident.

The [help desk](/services/managed-help-desk/) number went on the same page. If the next email arrives at 4:50 p.m. and the partner's cell goes to voicemail, they call us instead of deciding alone.

## What changed in the following weeks

The incident does not "secure" a firm. Closing the items does.

By the end of the week: MFA on the shared mailbox, leftover delegate gone, DMARC reports arriving, impersonation names in the policy, call-back posted where accounting can see it. The managing partner asked us to stay on for [managed cybersecurity](/services/cybersecurity/) rather than treat the afternoon as a one-off. That follow-on is a separate engagement. This page is the close call.

What they had that they did not have that morning:

- A clear answer: spoof, not takeover, with the evidence
- MFA on every mailbox that can touch a wire
- A path to DMARC enforcement with an owner
- A rule the next new hire can follow

What they still did not have, and should not claim:

- A guarantee the next lookalike never arrives
- A certification
- A substitute for the phone call

## What a buyer should copy

**Treat a close call as an incident.** If you only say "good catch" and go back to work, you will meet the next email with the same luck.

**Assume takeover until the tenant says otherwise.** Rules and forwards are how a quiet compromise keeps paying.

**Finish DMARC.** `p=none` is a start. It is not a control you can brag about.

**Name the humans attackers will impersonate.** Defaults do not know your partners.

**Write the call-back.** The person who did the right thing this time will not be at the desk forever.

## Planning for a close call of your own

If an email just asked you to change a payee, stop the wire and call a number you already trust. Then call us. If nothing has happened yet and you want the tenant reviewed first, bring Global Admin, the people who move money, and the last wire that felt rushed.

Secure Techies works from Canoga Park with firms across Los Angeles and Southern California. [Schedule a consultation](/contact/) if you want the same kind of contain-and-harden this client used.

For a different kind of project record, see [switching IT providers without a weekend outage](/case-studies/switching-it-providers/) or the [Microsoft 365 email migration](/case-studies/microsoft-365-email-migration/).
