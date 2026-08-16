---
date: 2026-08-16
title: "Backup Retention Calculator"
meta_title: "Backup Retention Calculator (3-2-1) | Secure Techies"
description: "Free backup retention calculator. Size GFS or forever-incremental storage for 3-2-1 copies from source TB and daily change rate. Browser-only, no signup."
tool_id: "backup"
tool_icon: "backup"
tool_badge: "Calculator"
tool_summary: "Estimate backup repository size from source data, change rate, GFS retention, and 3-2-1 copies."
tool_cta: "Want backups that restore, not just a disk that looks full?"
related_services:
  - label: "Backup & Disaster Recovery"
    url: "/services/backup-disaster-recovery/"
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
howto_steps:
  - name: "Enter source size and daily change"
    text: "Use used data, not raw disk. Change rate is new and changed bytes per day, not how busy people feel."
  - name: "Pick GFS or forever incremental"
    text: "Classic GFS treats weekly, monthly, and yearly points as fulls. That is conservative. Forever incremental keeps one full plus incrementals."
  - name: "Set how many points you keep"
    text: "A common SMB start is 14 dailies, 4 weeklies, 12 monthlies, and 3 yearlies. Compliance may demand longer."
  - name: "Count backup copies, not production"
    text: "3-2-1 means production plus two backup copies. This calculator sizes the backup repositories, not the live server."
faq:
  - question: "What is a backup retention calculator?"
    answer: "It estimates how much backup storage you need for a retention policy. You enter source size, daily change, compression, and how many daily, weekly, monthly, and yearly points you keep. It can model classic GFS fulls or forever incrementals."
  - question: "What is 3-2-1 backup?"
    answer: "Three copies of the data, on two kinds of media, with one copy offsite. Production is copy one. The backup repository is copy two. The offsite or cloud copy is copy three. This tool sizes those backup copies. It does not size the live disk."
  - question: "Why is classic GFS so much larger?"
    answer: "Because every weekly, monthly, and yearly point is counted as a full backup. That matches old tape and many still-running jobs. Modern products often synthesize those points from incrementals, so forever incremental is closer to the invoice."
  - question: "Does this include Microsoft 365 backup?"
    answer: "Not as a mailbox count. Microsoft 365 backup is a different product and a different unit (seats, not TB of a file server). Use this page for file servers, VMs, and NAS. Ask us about Microsoft 365 separately."
  - question: "Is this a Veeam or Acronis quote?"
    answer: "No. Vendors add database logs, metadata, immutability overhead, and their own compression. Use the number to see if a 4 TB appliance is a fantasy. Then size with the product you will actually run."
  - question: "What matters more than the TB number?"
    answer: "A restore test. A repository you have never restored is a rumor. Pair this page with a restore drill and with the ransomware cost calculator if you are arguing for immutability."
weight: 15
draft: false
---

## Free backup retention calculator for 3-2-1 storage

**Here is the short version:** backup storage is not "the same size as the server." It is source data, times how often it changes, times how long you keep points, times how many backup copies you store. This **backup retention calculator** turns that into terabytes in your browser.

CISA's [ransomware guide](https://www.cisa.gov/stopransomware/ransomware-guide) treats backups you can actually restore as a core control. NIST's [SP 800-34 contingency planning guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) is the longer version of the same idea: know what you must get back, and in what order. Microsoft documents cloud copies in [What is Azure Backup?](https://learn.microsoft.com/en-us/azure/backup/backup-overview).

This page sizes the repository. It does not run a backup job. Use [backup and disaster recovery](/services/backup-disaster-recovery/) when you want the jobs, the offsite copy, and a restore test.

## The formulas (so you can audit the number)

Let `S` be source size in GB (`TB * 1024`). Let `C` be compression ratio (1.0 means none). Let `D` be dedup factor (1.0 means none). Let `r` be daily change as a fraction.

- Stored full `F = S / C / D`
- Stored incremental `I = S * r / C / D`

**Classic GFS**

`one repository = (dailies * I) + ((weeklies + monthlies + yearlies) * F)`

Weekly, monthly, and yearly points are counted as full backups. That is conservative on purpose.

**Forever incremental**

`one repository = F + ((dailies + weeklies + monthlies + yearlies) * I)`

There is one full. Later points are incrementals (or synthetic points treated as incrementals). This is closer to many current products.

**3-2-1 copies**

`total = one repository * copies`

Copies = 2 is the usual reading: primary backup plus offsite or cloud. Production is not added again. You already have it.

CISA [Cross-Sector Cybersecurity Performance Goals](https://www.cisa.gov/cross-sector-cybersecurity-performance-goals) put tested backups next to identity. The TB number is only useful if a restore has been done this year.

## Worked example (the default inputs)

- 2 TB used on the file server
- 5 percent daily change
- 1.5x compression, no dedup
- 14 dailies, 4 weeklies, 12 monthlies, 3 yearlies
- 2 backup copies

`S = 2048 GB`. `F = 2048 / 1.5 = 1,365 GB`. `I = 2048 * 0.05 / 1.5 = 68 GB`.

Classic GFS, one repository:

- Dailies: 14 * 68 = 955 GB
- Other points: (4 + 12 + 3) * 1,365 = 25,941 GB
- One repo ≈ 26.3 TB
- Two copies ≈ 52.6 TB

Forever incremental, one repository:

- 1,365 + (14 + 4 + 12 + 3) * 68 ≈ 3.5 TB
- Two copies ≈ 7.1 TB

If a vendor quotes 4 TB for two years of monthly fulls on 2 TB of data, ask which method they used. Both numbers can be honest. They are not the same product.

## What people get wrong

They enter raw RAID capacity instead of used data. Use used. The [RAID calculator](/tools/raid-calculator/) is for the live array, not the backup repo.

They enter 20 percent change because "we are busy." Measure. A quiet file server is often 2 to 5 percent. A SQL or busy CAD share can be much higher. If you do not know, start at 5 and raise it after a week of job reports.

They plan on 10x dedup because a slide said so. Already-compressed video, Outlook OST files, and zip archives dedup poorly. Leave dedup at 1.0 unless you have measured it on this data.

They forget the second copy. One NAS in the same rack as the server is not 3-2-1. Ransomware that finds the share will encrypt both.

They never restore. Storage you cannot restore is a large paperweight. Price that failure with the [ransomware cost calculator](/tools/ransomware-cost-calculator/) and the [downtime cost calculator](/tools/downtime-cost-calculator/).

## Retention is a legal question too

Keeping everything forever feels safe and is usually wrong. Tax, medical, and matter files have rules. Chatty file shares do not need seven years of incrementals. Split the policy: long retention on the finance share, shorter on the scratch folder.

Immutability (object lock, air gap, or a vault the admin cannot delete) is how you keep the second copy when the admin account is the incident. This calculator does not add a fee for that. Budget it anyway.

Microsoft 365 is a separate pile. OneDrive and mailbox backup is licensed per seat, not per TB of a file server. Do not use this form as a Microsoft 365 quote.

## RPO is not the same as retention

Retention answers "how far back can I go?" RPO answers "how much work do I lose if the job last ran last night?" Daily incrementals mean about a day of work is at risk. Hourly jobs shrink that. This form does not model hourly points. If your RPO is one hour, you need a different job schedule than 14 nightly incrementals.

The first full also needs a pipe. Seeding 2 TB to the cloud on a 50 Mbps upload is days, not an afternoon. The [office bandwidth calculator](/tools/bandwidth-calculator/) is the companion for that question. After the seed, incrementals are what the WAN has to carry.

Keep the offsite copy offline or immutable enough that a compromised admin cannot delete both. 3-2-1 without that extra lock is 3-2-1 until the attacker logs in as you.

## What this calculator is not

It is not a Veeam, Acronis, Datto, or Azure invoice. It does not model synthetic fulls, forever-forward incrementals with block clones, or per-VM CBT rounding. It does not size internet pipe for the first seed. It does not prove the backup is ransomware-proof.

Southern California firms often buy a 4 TB "backup box" for an 8 TB file server and then keep 30 days. The math does not work. This page is how you see that before the box arrives.

If you want [backup and disaster recovery](/services/backup-disaster-recovery/) with a restore test on the calendar, [contact Secure Techies](/contact/).
