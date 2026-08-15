---
date: 2026-08-15
title: "IT Downtime Cost Calculator"
meta_title: "IT Downtime Cost Calculator (Free) | Secure Techies"
description: "Free IT downtime cost calculator. Estimate lost revenue, idle staff, and recovery labor for an outage. Not a ransomware quote. Browser-only. No signup."
tool_id: "downtime"
tool_icon: "clock"
tool_badge: "Operations"
tool_summary: "Estimate lost revenue, idle staff, and recovery labor for any IT outage."
tool_cta: "Want fewer unplanned hours on the clock?"
related_services:
  - label: "Managed Infrastructure"
    url: "/services/infrastructure/"
  - label: "Managed Help Desk & IT Support"
    url: "/services/managed-help-desk/"
  - label: "Backup & Disaster Recovery"
    url: "/services/backup-disaster-recovery/"
howto_steps:
  - name: "Enter annual revenue and operating hours"
    text: "Hourly revenue is revenue divided by the hours you actually sell. A 2,000-hour year is a starting point, not a law firm in April."
  - name: "Set who is blocked and for how long"
    text: "Use people who cannot do the job, not the entire headcount, unless the whole firm is dark."
  - name: "Add recovery hours and labor rate"
    text: "Someone has to fix it. Unplanned outages cost more than a planned window."
  - name: "Read the total and the breakdown"
    text: "If productivity dwarfs revenue, you sell time. If revenue dwarfs productivity, you sell a live system."
faq:
  - question: "How do you calculate the cost of IT downtime?"
    answer: "Add lost revenue, lost staff productivity, and recovery labor for the length of the outage. Hourly revenue is annual revenue divided by operating hours. Productivity is blocked people times loaded hourly cost times the percent of work they cannot do."
  - question: "What is a typical cost of downtime per hour?"
    answer: "There is no honest single number. Enterprise data-center studies quote thousands of dollars per minute. A 25-person professional firm is usually hundreds to a few thousand per hour. This calculator uses your revenue and payroll instead of a headline average."
  - question: "How is this different from the ransomware cost calculator?"
    answer: "This page models any outage: internet, a failed host, Microsoft 365, a bad change. It does not add ransom, record notification, or legal bands. Use the ransomware calculator when the incident is a cyber event with those extras."
  - question: "Should I use 2,000 operating hours?"
    answer: "Use 2,000 for a plain 40-hour week. Use fewer hours if almost all revenue happens in a season or in clinic hours. Using 8,760 hours will understate hourly revenue and make the outage look cheap."
  - question: "Is this an SLA or insurance figure?"
    answer: "No. It is a planning estimate so you can compare prevention to hope. Insurers and vendors use their own models. Bring this breakdown to a meeting. Do not print it as a claim."
weight: 11
draft: false
---

## Free IT downtime cost calculator

**Here is the short version:** an outage costs lost revenue plus idle people plus the labor to recover. This **IT downtime cost calculator** turns annual revenue, operating hours, blocked staff, and recovery work into a total and an hourly rate for any unplanned (or planned) IT failure.

It is not Gartner's old "$5,600 a minute" data-center headline. That number is not your 25-person office. Use your books.

## The formula

1. Hourly revenue = annual revenue ÷ operating hours
2. Lost revenue = hourly revenue × outage hours (then scaled if the outage is unplanned)
3. Lost productivity = people blocked × loaded hourly cost × (productivity lost %) × outage hours
4. Recovery = emergency hours × labor rate
5. Total = those three lines

Unplanned incidents get a 1.35× factor on the revenue and productivity lines. A Saturday change window you chose is cheaper than a Tuesday crash you did not. Atlassian's [cost of downtime](https://www.atlassian.com/incident-management/kpis/cost-of-downtime) write-up is honest that published averages hide a huge range. This page refuses the average and asks for your inputs instead.

Loaded hourly cost should include taxes and benefits, not only the wage. The BLS [Employer Costs for Employee Compensation](https://www.bls.gov/ecec/) series is the public benchmark. The default $48 is in that neighborhood for private industry. Raise it for attorneys. Lower it only if you are sure.

## Worked example

**$2.5M revenue, 2,000 hours, 25 people blocked, $48 loaded, 70% idle, 4-hour unplanned outage, 6 recovery hours at $200**

- Hourly revenue = 2,500,000 / 2,000 = **$1,250**
- Lost revenue ≈ 1,250 × 4 × 1.35 = **$6,750**
- Productivity ≈ 25 × 48 × 0.70 × 4 × 1.35 ≈ **$4,536**
- Recovery = 6 × 200 = **$1,200**
- Total ≈ **$12,500** for one morning

That is a lot of MFA and monitoring. It is a small fraction of a bad ransomware week. Use the [ransomware cost calculator](/tools/ransomware-cost-calculator/) when records and ransom enter the story.

## Planned vs unplanned

A planned window still costs money. You chose the hour. Customers were warned. Recovery is a runbook, not a scavenger hunt. Unplanned adds chaos: the wrong person is on call, the last backup is a rumor, finance is in a close. The 1.35× factor is a teaching thumb, not a law.

If you have never restored Microsoft 365 or a file server, your recovery hours are not "two." Raise them. The [cybersecurity risk assessment](/tools/cybersecurity-risk-assessment/) treats untested backups as a gap for this reason.

## What this number is for

Compare prevention to hope. A redundant circuit, a second host, or overnight monitoring looks expensive until you price four hours of a dark floor. Our note on [the cost of IT downtime](/blog/cost-of-it-downtime/) is the longer editorial version of the same argument.

CISA's [Secure Your Business](https://www.cisa.gov/secure-our-world/secure-your-business) list is not only malware. If the firm cannot take a call, you are already in an incident.

Do not use this total to scare a board with fake precision. Change one input at a time. If productivity dominates, you sell hours. If revenue dominates, you sell a live system (clinic schedule, e-commerce, phones). The fix is different.

Write the last three outages on a whiteboard: date, hours, what broke, what it cost in this model. Patterns appear. Same vendor. Same single host. Same person on vacation. That list is more honest than an industry benchmark. Then price the control that would have cut the longest row.

Keep the worksheet. Next year's budget meeting will ask why you want monitoring. Hand them the sheet instead of a vibe. One page beats a 40-slide fear deck. Bring the last outage date. Memory is kind. Calendars are not.

A four-hour Microsoft 365 outage and a four-hour dead firewall look the same in this math. The fix does not. Identity and a second circuit are different projects. Use the total to get attention. Use the post-incident notes to pick the project.

## Recurring outages vs one bad morning

One four-hour incident is a meeting. Three of them a year is a program. Multiply the total by the number of times this actually happens. If printers and VPN fail weekly, do not model one hour. Model the year.

That is how you justify monitoring and a help desk that is not "email the owner." Prevention is cheaper than the third scramble.

After hours still costs if clients expect a response. A dark after-hours answering path is an outage for a clinic or a law firm with a trial in the morning. Put those hours in if they are real. Leave them out if nobody works them.

## Who is actually blocked

Do not count people who can keep working on a phone. Do count anyone whose system of record is down: the scheduler, the document system, the shop floor, the phones. A receptionist on a working cell is not 70% idle. A litigator who cannot open the matter system is.

If only one department is dark, put that headcount in, not the whole firm. Honesty here keeps the number usable.

## What this calculator is not

It is not a ransomware model. It does not add HIPAA notification or reputation bands. It does not know that your line-of-business app cannot run from a phone hotspot. It will not price a lost client who never calls back. Use it to get the order of magnitude right.

Southern California professional firms feel downtime as missed billable time and missed appointments. Raise operating-hour honesty if April, trial week, or month-end is when you actually make the year.

If you want fewer unplanned hours, that is [managed infrastructure](/services/infrastructure/), [managed help desk](/services/managed-help-desk/), and [backup and disaster recovery](/services/backup-disaster-recovery/). Bring last quarter's outage list. [Contact Secure Techies](/contact/).
