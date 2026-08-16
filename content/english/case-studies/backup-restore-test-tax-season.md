---
date: 2026-08-16
title: "A Backup Restore Test Before Tax Season"
meta_title: "Tax-Season Backup Restore Case Study | Secure Techies"
description: "How we ran a backup restore test for a CPA firm before tax season: shared mailbox, current-returns library, timed restore, and the gaps green jobs hid."
image: "/images/case-studies/backup-restore-test-tax-season.webp"
categories: ["Managed IT"]
tags:
  - backup restore test
  - tax season backup
  - Microsoft 365 backup
  - accounting firm backup
  - disaster recovery test
  - CPA IT
draft: false
featured: false
industry: "Accounting"
project_type: "Backup Restore Test"
location: "San Fernando Valley, CA"
timeline: "Three-week engagement"
client_size: "Regional CPA firm"
fact_industry: "CPA firm"
fact_location: "SF Valley"
fact_timeline: "3 weeks"
fact_project: "Restore test"
card_text: "A CPA firm had green backup jobs and no proof a restore would work before tax season."
kicker: "Backup and recovery"
short_name: "Tax-season restore test"
hero_subtitle: "Green backup jobs are not a restore. We ran one on purpose, before January, and wrote down what actually came back."
hero_image: "images/case-studies/cs-backup-hero.webp"
hero_alt: "Accountant at dusk reviewing papers at a desk with monitors turned off"
client_heading: "A CPA firm that could not name the last restore"
client_image: "images/case-studies/cs-backup-client.webp"
client_alt: "Managing partner and engineer reviewing a restore packet at a small table"
mid_image: "images/case-studies/cs-backup-mid.webp"
mid_alt: "Two people pointing at an out-of-focus backup console"
band_image: "images/case-studies/cs-backup-band.webp"
band_alt: "Small office closet with a switch cart and a floor UPS"
band_quote: "The jobs were green. The intake mailbox was not in the product."
body_image: "images/case-studies/cs-backup-body.webp"
body_alt: "Partners and staff in a conference room after the restore readout"
anonymized: "Firm name, staff names, tax-software brand, and mailbox addresses are withheld at the client's request. The engagement type, method, and constraints are real."
summary: "A regional CPA firm in the San Fernando Valley asked Secure Techies to prove the backup before tax season, not after a delete. Jobs had been completing. Nobody could name a restore. We inventoried what had to come back, restored a shared mailbox and a file library to a test location, timed it, and left a written RPO plus a calendar for the next drill."

goals:
  - title: "Prove the copy exists"
    icon: search
    text: "Leadership needed a restore they had watched, not a screenshot of a green job."
  - title: "Find what the product missed"
    icon: list
    text: "Intake mail, tax-year shares, and OneDrive had to be in the policy, or named as accepted risk."
  - title: "Leave a repeatable drill"
    icon: clock
    text: "The next test had to live on a calendar with an owner, before January, not as a wish."

challenge_heading: "The jobs were green. The proof was not."
challenge_intro: "The firm was not starting from zero. A backup product was licensed. Recycle bins existed in Microsoft 365. What they lacked was a restore anyone had run on purpose this year."
challenge:
  - title: "Tax season does not wait for a failed restore"
    text: "Busy season is when the firm can least afford to discover that last night's copy is a hope. The test had to happen in the fall."
  - title: "Shared mailboxes sat outside the policy"
    text: "Client intake and a billing box were where work actually landed. The last restore conversation had used one partner's mailbox."
  - title: "The same admin could wipe the copy"
    text: "Backup sat behind the same Global Admin used for daily mail. A compromised tenant admin was also a compromised backup admin."
  - title: "Retention was being treated as backup"
    text: "Partners thought Microsoft 'kept everything.' Recycle-bin windows and a retention label are not an isolated restore copy."

process_heading: "Inventory first, then one restore you can time"
process_intro: "We treated this as a drill, not a disaster. Scope was written down before anyone clicked Restore. Production stayed untouched."
process:
  - title: "Name what must come back"
    description: "A half-day workshop listed mailboxes, shares, and tax-year libraries the firm could not rebuild from last week's email. Out of scope: a full ransomware tabletop and any claim of zero data loss."
  - title: "Compare the product to the list"
    description: "We opened the backup console and checked protection units against the workshop list. Gaps were written down before the restore, not after it failed."
  - title: "Restore without overwriting production"
    description: "One shared mailbox restored to a Recovered Items folder, and one SharePoint library restored to a new site URL. We timed it and recorded who had to approve it."
  - title: "Write the RPO and the next date"
    description: "Partners got a one-sentence recovery objective they could say out loud, plus a calendar invite for the next drill."

workstreams_heading: "Five checks, one restore packet"
workstreams_intro: "The restore was the headline. The workstreams were how we knew the headline was not theater."
workstreams:
  - title: "Mailbox coverage"
    icon: mail
    description: "User mailboxes, shared intake and billing boxes, and whether archives were in the policy."
  - title: "Files and SharePoint"
    icon: data
    description: "Tax-year libraries, the 'current returns' site, and OneDrive accounts that actually held work."
  - title: "Microsoft 365 native undo"
    icon: cloud
    description: "Recycle bins, recoverable items, and retention, so nobody confused a dumpster with a backup product."
  - title: "Who can delete the copy"
    icon: identity
    description: "Backup admin roles versus daily Global Admin, and whether a single stolen account could wipe both."
  - title: "On-prem leftovers"
    icon: network
    description: "A small file share and the closet UPS. If it still held tax PDFs, it needed a job and a test too."

metrics:
  - value: "3 wks"
    label: "Engagement window"
  - value: "2"
    label: "Objects restored to test"
  - value: "Timed"
    label: "Restore, not a screenshot"
  - value: "Next drill"
    label: "On a calendar"

results_heading: "A timed restore, and a shorter list of holes"
results:
  - "A shared mailbox restored to a Recovered Items folder and a SharePoint library restored to a new site URL, with a clock on the work"
  - "Intake and billing mailboxes added to the backup policy after the inventory showed they were missing"
  - "A one-sentence RPO the partners could repeat: last night's mail and the current-returns library back the same business day"
  - "Backup admin split from daily Global Admin so one stolen account could not delete the copy"
  - "A written note of what the product still did not cover, including chat, so nobody claimed otherwise"
  - "The next restore drill on a calendar before January, with a named owner"
  - "Clear statement of what this was not: not a ransomware recovery, not a continuity certification"

technologies:
  - "Microsoft 365 Backup"
  - "Exchange Online"
  - "SharePoint Online"
  - "OneDrive"
  - "Microsoft Entra ID"
  - "File-share backup"
  - "Restore testing"

related_services:
  - title: "Backup and disaster recovery"
    url: "/services/backup-disaster-recovery/"
    text: "Cloud and Microsoft 365 backup with restores that get scheduled, not assumed."
  - title: "Managed help desk"
    url: "/services/managed-help-desk/"
    text: "The team that owns the next drill when tax season is on the wall."
  - title: "IT for accounting firms"
    url: "/industries/accounting/"
    text: "Tax-season coverage, client-file security, and restores before January."

faqs:
  - question: "What is a backup restore test?"
    answer: "A backup restore test is a planned restore of real data to a safe location so you know the copy works, how long it takes, and who has to approve it. Secure Techies treats the clock and the missing objects as the deliverable. A green job list is not a test."
  - question: "Does Microsoft 365 already back up our mail and files?"
    answer: "Microsoft keeps the service running and offers recycle bins, retention, and, if you buy it, Microsoft 365 Backup. Recycle bins are short-window undo. Retention is a compliance hold. A restore copy you control is a separate decision. This firm needed that copy proven, not assumed."
  - question: "What should an accounting firm restore in a drill?"
    answer: "At least one shared mailbox the firm cannot live without, and one library that holds current work. Restoring only the managing partner's mailbox misses intake, billing, and the tax-year share. Decide chat and planner data in writing. Do not skip mail and files while you debate them."
  - question: "How long does a restore test take?"
    answer: "This engagement ran three weeks from inventory to readout. The restore day itself was hours, not days, because we picked two objects and a test location. Larger tenants and full-site rollbacks take longer. The calendar depends on access and how messy the first inventory is."
  - question: "Is a restore test the same as a disaster recovery plan?"
    answer: "No. A restore test proves one or two objects. A disaster recovery or business continuity plan names order, people, and what you do if the building or the tenant is the incident. We wrote the RPO sentence this firm could say out loud. A full continuity binder was out of scope."
  - question: "Will you recover us if ransomware hits during tax season?"
    answer: "Incident response is a different engagement. This project was a drill before busy season so the firm would not learn the gaps in March. If you are already in an incident, say so. Do not book a restore test and expect a ransom negotiation."

cta_heading: "Need a restore you have actually watched?"
cta_text: "Secure Techies runs backup restore tests for Southern California firms that cannot discover a hole in March. Start with a conversation in Canoga Park."
---

The jobs were green. Nobody in the room could name the last time a mailbox or a library had come back from the copy.

That is the usual starting point for a [backup restore test](/services/backup-disaster-recovery/). A regional CPA firm in the San Fernando Valley called Secure Techies in the fall because tax season does not wait for a failed restore. They had a product. They had recycle bins. They did not have a drill.

This case study records what we inventoried, what we restored to a test place, how long it took, and what the green jobs had been hiding. Client identifiers stay out. The method does not.

## Why they called

The firm sits in the same risk class as other [accounting](/industries/accounting/) offices we support: client tax files, seasonal staff, an intake mailbox that never sleeps in March, and a small partnership that cannot lose a week. The [IRS recordkeeping page](https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records) is not a backup policy. It is a reminder that some records have to exist for years. A recycle bin measured in days does not meet that job.

CISA's [ransomware guide](https://www.cisa.gov/stopransomware/ransomware-guide) keeps landing on the same point: backups you can restore, including a copy the attacker cannot encrypt. OneDrive sync is how a bad laptop becomes a bad cloud. The partners had read a version of that sentence on an insurance form. They had not watched a restore.

Two facts forced the date:

1. Busy season was twelve weeks out. Risky change after January was off the table.
2. The last documented restore, if it existed, lived in someone's memory of "the old vendor."

We had no leftover diagrams. We treated the console as untrusted until it proved a file.

## What this engagement was, and was not

Secure Techies sells [backup and disaster recovery](/services/backup-disaster-recovery/) as copies, jobs, and drills. We do not issue a continuity certification. We do not pretend a three-week test is a full [business continuity](/blog/business-continuity-plan-small-business/) program.

We wrote that limit into the statement of work. The partners wanted a restore they had seen, not a binder they would not open.

Out of scope on purpose:

- A live ransomware recovery
- A tabletop of every disaster scenario
- Re-platforming the tax application
- Claiming zero data loss for the whole tenant

In scope:

- What the backup product actually protected
- Microsoft 365 native undo versus a real copy
- One shared mailbox restore to a test location
- One SharePoint library restore to a test location
- Who could delete the backups
- A written RPO and a next-drill date

Microsoft documents [Microsoft 365 Backup](https://learn.microsoft.com/en-us/microsoft-365/backup/backup-overview) as a first-party restore product for Exchange, OneDrive, and SharePoint. This firm already paid for a copy. The question was whether the copy covered the work, and whether anyone had used it.

## How we ran the backup restore test

### Week 1: inventory

The first half-day was a list, not a click. We named mailboxes the firm could not rebuild, the current-returns library, prior-year archives, and the leftover file share in the closet. Operations walked us through intake. The office manager walked us through who still stored returns on a desktop.

That list prevented the usual failure: restoring the wrong mailbox and calling it a pass.

We also asked the partners, before they saw the console, what they thought was protected. Most named "email" and "the server." Almost nobody named the shared intake box or the OneDrive folder a senior manager used as a working directory.

### The restore day

We did not restore in place. Microsoft's [restore guidance](https://learn.microsoft.com/en-us/microsoft-365/backup/backup-restore-data) is explicit about destinations. Exchange and OneDrive can land in a new folder (Recovered Items plus a timestamp) instead of overwriting live items. SharePoint can restore to a new site URL instead of rolling the production site back. We used those non-destructive options so a drill could not wreck current returns.

Two objects:

| Object | Why this one | Where it landed |
| --- | --- | --- |
| Shared intake mailbox | Client mail and organizer PDFs land here | New Recovered Items folder in that mailbox, not an in-place overwrite |
| Current-returns SharePoint library | This year's work, not the archive dump | New site URL, not a rollback of the live library |

We started a clock when the restore job was approved. We stopped it when a named partner could open a known message and a known folder in the recovered location. The number went in the packet. A six-hour restore is still a plan. A restore nobody has tried is a rumor.

NIST [SP 800-34](https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final) is the old contingency-planning paper and it is still right: know what you must get back, and in what order. We did not write a federal plan. We wrote two objects and a sentence the partners could say in a partners' meeting.

## What the green jobs hid

We are not going to invent a "recovery time improved 47 percent" slide. The useful story is the pattern, which is common in firms this size.

**The product was not watching the work.** User mailboxes were in the policy. The intake shared mailbox was not. Billing was not. A restore of the managing partner's mailbox would have passed a demo and failed March.

**OneDrive was informal.** A manager's personal-looking OneDrive held current work because "it was faster than the library." That account was not in the backup policy. Recycle bin would have helped for a few days. It would not have helped after a bad empty.

**Native undo was being sold as backup.** Exchange has a [Recoverable Items folder](https://learn.microsoft.com/en-us/exchange/security-and-compliance/recoverable-items-folder/recoverable-items-folder). SharePoint has first- and second-stage recycle bins. Those are useful. They are not an isolated copy. We walked the partners through the difference the same way we do in the [Microsoft 365 backup](/blog/microsoft-365-backup/) guide: dumpster diving is not a product.

**The same key opened mail and the backup.** Daily Global Admin could change backup policy and delete restore points. CISA [Cross-Sector Cybersecurity Performance Goals](https://www.cisa.gov/cross-sector-cybersecurity-performance-goals) put tested backups next to identity for a reason. A stolen admin is also a stolen undo button if you never split the role.

**The closet still mattered.** A small file share held prior-year PDFs "until we finish the move." It had a job. It did not have a restore anyone could describe. The UPS on the floor had never been tested either. That was a side note, not the headline, and we wrote it down anyway.

### Chat versus files

Teams *files* live in SharePoint. If the library is in the policy, the files are in the policy. Teams *chats* are a different store. We asked the partners, in writing, whether lost chat would stop a filing. They said no. Lost current-returns files would. The packet records that decision so nobody later claims "everything in Teams" was covered.

None of this required a nation-state. It required a drill that treated a 22-person CPA firm like a business that holds other people's tax files.

## What we changed after the test

The restore itself does not "back up" a firm. Closing the gaps does.

Same week:

- Intake and billing mailboxes added to the backup policy
- The manager's working OneDrive added, then a plan to move that work into the library
- Backup admin given to a separate role. Daily Global Admin lost the right to delete restore points without a second person
- Next drill booked on the shared calendar before January

Thirty-day items:

- Confirm prior-year libraries and archives are in policy or named as accepted risk
- Finish moving the leftover file share or give it a tested job with an owner
- Write the one-sentence RPO into the insurance folder next to last year's answers

We pointed the partners at the [backup retention calculator](/tools/backup-retention-calculator/) for the on-prem leftover, and at the [cost of IT downtime](/blog/cost-of-it-downtime/) so a "we will do it after April" conversation had a number attached. The [FTC small-business cybersecurity](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity) pages say the same thing in owner language: you still own the data you hold.

## What the packet contained

A useful restore packet is short enough to read in a partners' meeting.

1. **One-page summary.** What we restored, how long it took, what was missing from the policy, and the RPO sentence.
2. **Coverage list.** Mailboxes, libraries, OneDrive accounts, and the file share, each marked in policy / added / accepted.
3. **Restore runbook.** Which console, which test location, who approves, who watches the clock.
4. **Next date.** A calendar item with a name on it, not a bullet in a PDF.

We kept screenshots in an appendix and adjectives out of the summary. Insurers want both. Partners only have time for the first.

## Lessons we would repeat

**Do not restore the easy mailbox.** If the drill uses the owner's inbox, you will miss the box that prints money.

**Restore to a test place.** A rollback of production is how a drill becomes an incident.

**Write the non-goals down.** If you do not say "this is not a ransomware recovery," someone will read the packet as if it were.

**Split the admin.** A backup the same Global Admin can wipe is a second copy with one lock.

**Put the next drill on a calendar.** [Managed help desk](/services/managed-help-desk/) can own the invite. A PDF will not.

## Planning your own restore test

If your insurance form, your partners, or last year's scare has you asking whether the copy works, start with two objects and a test location. Bring the backup console, the list of shared mailboxes, and whoever actually runs intake. We will tell you what belongs in a three-week drill and what belongs in a later continuity conversation.

Secure Techies works from Canoga Park with firms across Los Angeles and Southern California. [Schedule a consultation](/contact/) if you want the same kind of timed restore this client left with.

For a different kind of project record, see the [IT risk assessment](/case-studies/financial-services-risk-assessment/) we ran for a financial firm that could name products but not residual risk.
