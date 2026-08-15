---
title: "Ransomware Cost Calculator"
meta_title: "Ransomware Cost Calculator: Free Breach Impact Tool | Secure Techies"
description: "Free ransomware cost calculator for SMBs. Estimate downtime, recovery, records response, legal, reputation, readiness, and expected annualized loss ranges."
tool_id: "ransomware"
tool_icon: "shield"
tool_badge: "Risk"
tool_summary: "Estimate the business cost of ransomware and data breaches across downtime, recovery, and reputation."
tool_cta: "Want a security assessment before an incident forces one?"
related_services:
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
  - label: "Backup & Disaster Recovery"
    url: "/services/backup-disaster-recovery/"
  - label: "Compliance & Security Audits"
    url: "/services/compliance-security-audits/"
howto_steps:
  - name: "Enter revenue, staff, and records"
    text: "Those three numbers drive downtime, productivity, and notification cost more than the ransom line."
  - name: "Set downtime hours and recovery days honestly"
    text: "If you have never restored a backup, use a longer recovery window than marketing slides suggest."
  - name: "Read the mid range, not only the high"
    text: "Use the breakdown to decide whether MFA, immutable backups, or EDR would cut the largest slice."
faq:
  - question: "How is ransomware cost estimated?"
    answer: "This calculator combines downtime revenue loss, IT recovery labor, optional ransom demand, per-record breach response costs, legal/notification costs, and a reputation impact range. It produces low, mid, and high estimates because real incidents vary widely."
  - question: "Should companies pay the ransom?"
    answer: "Paying does not guarantee recovery, can fund criminals, and may create legal or insurance issues. The better plan is offline/immutable backups, tested restores, endpoint protection, and an incident response plan."
  - question: "What is the biggest cost driver?"
    answer: "For many SMBs, downtime and lost productivity dominate. For organizations holding lots of personal data, notification, legal, and customer remediation costs can exceed the ransom itself."
  - question: "Is this an insurance quote?"
    answer: "No. It is an educational planning model. Cyber insurance underwriters use their own questionnaires and actuarial models. Use this to prioritize prevention spend, not to set policy limits alone."
  - question: "How can I lower these numbers?"
    answer: "MFA, EDR, email security, least-privilege access, segmented networks, immutable backups, restore drills, and staff training reduce both likelihood and impact. Start with a security assessment and a tested recovery plan."
weight: 6
draft: false
---

## Free ransomware and data breach cost calculator

**Here is the short version:** for most small firms the ransom is not the bill. Downtime, rebuild labor, and record-response costs usually dwarf it. This **ransomware cost calculator** turns revenue, staff, records, downtime, recovery days, and readiness into low, mid, and high ranges plus an optional annualized loss.

Use it for board conversations and tabletop exercises. It is not an insurance quote or legal advice.

CISA's [StopRansomware](https://www.cisa.gov/stopransomware) program and the FBI [Internet Crime Complaint Center ransomware page](https://www.ic3.gov/ransomware) are the public baselines for what to do in an incident. This model is for the money conversation before one happens.

## Cost categories modeled

| Category | What it captures |
| --- | --- |
| Downtime | Lost revenue while systems are offline |
| Productivity | Staff idle or doing work by hand |
| Recovery | Emergency labor and rebuild effort |
| Records response | Notification, monitoring offers, support load |
| Legal / notice | Counsel, regulator, PR baseline |
| Reputation | Longer-term revenue impact band |
| Ransom | Optional demand line item |

Readiness (backups, MFA, EDR, drills) scales impact down. Industry multipliers raise healthcare, finance, and legal because notification and downtime hurt more there. They do not hide a zero on backups.

Hourly revenue in the model assumes a roughly 2,000-hour year. That is a planning shortcut. A tax firm in April is not a 2,000-hour average. Raise downtime hours if your busy season is the only season that matters.

## Why mid-range beats a single scary number

Incidents vary. A company with immutable backups and a rehearsed restore can limit damage. One without backups may face multi-week outages. Ranges keep planning honest. CISA's [StopRansomware Guide](https://www.cisa.gov/resources-tools/resources/stopransomware-guide) is blunt: paying does not guarantee recovery and can fund the next wave.

Insurance in this tool is a simple offset on the low and mid ranges. Real policies have waiting periods, sublimits, and "did you actually have MFA" questions. Do not set a policy limit from this page alone.

## Prevention levers that move the model

- MFA on email, VPN, and admin
- EDR plus email security
- Immutable or offline backups and restore tests
- Least privilege and network segmentation
- An incident response plan you have walked through once

If you have never restored a backup, do not score readiness as a 5. Untested backups are a rumor. Score the control gaps with the [cybersecurity risk assessment](/tools/cybersecurity-risk-assessment/). Then use [cybersecurity](/services/cybersecurity/), [backup and disaster recovery](/services/backup-disaster-recovery/), and [compliance audits](/services/compliance-security-audits/).

## Worked thinking example

A $2.5M revenue firm with 35 staff, 5,000 records, 72 hours downtime, and mid readiness often sees mid-range totals dominated by downtime, recovery, and records response. That stack is frequently larger than the ransom demand. "Just pay" is a poor strategy even before legal and re-extortion risk.

Change one input at a time. Cut downtime from 72 hours to 12 (that is what a tested restore is for) and watch the mid range drop more than deleting the ransom line. That is the point of the breakdown.

## What this calculator is not

It is not a forensic estimate for court. It is not IBM or Verizon reproducing their annual reports on your tenant. It will not know that your line-of-business app cannot run from a laptop hotspot. Use it to decide whether prevention spend is cheaper than hope.

Probability is optional and easy to abuse. A 1% annual chance times a large mid range is still a guess. Use it to compare "spend X now" against "expected loss," not to predict the year you get hit. Firms with open RDP and no MFA should not type 1%.

## Paying, notifying, and other decisions this page will not make

Whether to pay is a legal and practical decision. Law enforcement and CISA generally discourage it. Some policies restrict it. Some attackers take the money and encrypt again. This calculator can show what payment adds to the mid range. It cannot tell you it will work.

Notification rules depend on what data you hold and where you do business. Healthcare, finance, and anyone with California consumer data should assume counsel gets a call. The records line item is a placeholder for that mess. It is not a statute calculator.

If you are in an incident now, stop using this page as your runbook. Use the CISA and FBI pages linked above, call your insurer if you have one, and call people who have restored tenants before.

Law firms and clinics should add the cost of delayed work, not only "systems down." If attorneys cannot bill, or a practice cannot see the schedule, the hourly revenue shortcut is low. Raise it. Then compare that number to the cost of MFA and a restore drill. The drill almost always wins.

## How to use the number in a real meeting

Put the mid range next to last year's IT spend. If mid-range impact is larger than the entire security budget, you do not have a budget problem. You have a priority problem.

Then pick one control that cuts the largest slice in the breakdown. If downtime dominates, buy restore tests and immutable copies, not another awareness poster. If records response dominates, you have a data-minimization and encryption problem as well as a backup problem.

Walk the tabletop with finance in the room. Ask: who calls the bank, who calls counsel, who talks to clients, who pulls the last good backup. If those names are blank, the recovery-days input should go up, not down.

Southern California professional firms feel this in billable hours. A dark Microsoft 365 tenant on a filing deadline is not a theoretical outage. Raise the downtime hours if your calendar is the product.

After the meeting, assign owners. MFA has a name. Restore tests have a date. Email authentication has a DNS ticket. A mid-range number with no owner is decoration.

If the mid-range number is uncomfortable, schedule a security and backup assessment. Bring this page to the meeting. [Contact Secure Techies](/contact/).
