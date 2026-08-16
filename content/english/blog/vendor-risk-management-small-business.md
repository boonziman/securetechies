---
title: "Vendor Risk Management for Small Business: A Practical List"
meta_title: "Vendor Risk Management for Small Business | Secure Techies"
description: "Vendor risk management for small business: inventory who has your data, tier them, ask for proof, and cut access when the contract ends. A list you can run."
date: 2026-08-10
image: "/images/blog/vendor-risk-management-small-business.webp"
categories: ["Compliance"]
author: "Secure Techies"
tags: ["vendor risk management small business", "vendor risk", "third-party risk", "service provider management", "SOC 2 vendor", "business associate"]
draft: false
faq:
  - question: "What is vendor risk management for a small business?"
    answer: "Vendor risk management is a written list of who can touch your data or your network, a simple rating of how much damage they could do, and proof they will not be the hole in your year. For a 20-person firm that is a spreadsheet, a short questionnaire for high-risk vendors, and a habit of cutting access when the contract ends."
  - question: "Which vendors should a small business review first?"
    answer: "Start with anyone who has email, files, money, health or legal data, or a login into your tenant. That is usually Microsoft 365, payroll, the practice or matter system, the MSP, backup, and the copier or scanner cloud. The florist can wait. The OAuth app that can read every mailbox cannot."
  - question: "Do small businesses need a vendor risk software platform?"
    answer: "Usually no. A platform is useful when you have hundreds of suppliers. A law firm or clinic with 30 vendors needs an owner, a tiering rule, and a calendar. Buying software you will not open is not a program."
  - question: "Is a SOC 2 report enough to approve a vendor?"
    answer: "It is evidence, not a blessing. Read the scope, the period, and the exceptions. A SOC 2 Type 2 on a product you do not buy does not cover the module that holds your data. Ask how they notify you of a breach and how you get your data out."
  - question: "How often should we review vendors?"
    answer: "High-risk vendors at least once a year, or when they change ownership, have a public incident, or you expand what they can see. Low-risk vendors when you renew. Offboard them the week the contract ends, the same way you offboard staff."
---

Here's the short version: **vendor risk management for small business is a list of who has your data, a simple tier, and proof you can show an insurer or a client.** It is not a 200-question survey you never read. It is not a GRC platform with three unused licenses.

The breach you will actually feel often starts at a vendor: a copier cloud, a "free" AI plug-in in Outlook, a payroll site with SMS-only login, an old freelancer still in the tenant. You did not hire them this year. They still have a key.

CIS names this job [Service Provider Management](https://www.cisecurity.org/controls/service-provider-management): inventory providers, classify them, assess them, and monitor them. NIST's [Cybersecurity Framework](https://www.nist.gov/cyberframework) puts suppliers in the same risk conversation as your own systems. You can do a version of that in a spreadsheet.

For the report you might *request* from a SaaS company, see [SOC 2 compliance](/blog/soc-2-compliance/). For the insurance questions that now ask about vendors, see [cyber insurance requirements](/blog/cyber-insurance-requirements-small-business/).

## What vendor risk management for small business actually is

It answers four questions:

1. Who can see or change our data, or log into our network?
2. How bad is it if they get breached or go dark?
3. What proof do we have *before* we send them files?
4. How do we take the key back when we stop paying them?

That is the whole program. Everything else is decoration.

NIST [SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/final) is the federal Cybersecurity Supply Chain Risk Management playbook. You are not the Department of Defense. Steal the idea (know the supplier, write the expectation, watch for change) and leave the binders.

CISA's [ICT supply chain](https://www.cisa.gov/topics/information-communications-technology-supply-chain-security) pages exist because software and service vendors are now part of every office. Treating "the cloud" as someone else's problem is how you inherit their incident.

You do **not** need:

- A full-time vendor-risk analyst
- A 90-page policy nobody signed
- To assess the coffee shop

You **do** need an owner (office manager plus IT, or your MSP) and a list that is less than a year old.

## Build the inventory (you already have more vendors than you think)

Open last month's credit card and the Microsoft 365 admin center. That is the inventory.

Include:

- Cloud suites: Microsoft 365, Google, Zoom
- Line of business: Clio, NetDocuments, the EHR, QuickBooks, payroll
- Security and backup: EDR, the backup product, the email filter
- People with access: MSP, CPA, marketing, a contract paralegal
- Quiet ones: copier/scanner cloud, doorbell cameras, the "AI note taker" someone installed
- Entra **enterprise applications** and OAuth grants. Those are vendors with an API key into mail.

CISA's [defending against software supply chain attacks](https://www.cisa.gov/resources-tools/resources/defending-against-software-supply-chain-attacks) guide is aimed at software you run. The SMB translation: know what is installed and what can read the tenant. A browser extension that can see every tab is a vendor.

Do not inventory the janitorial service unless they have a badge and a login. Do inventory the freelancer who still has a shared mailbox.

![People reviewing documents at a vendor meeting](/images/blog/vendor-risk-management-small-business-2.webp "Start vendor risk with a list of who can see your data")

## Tier them so you do not boil the ocean

Three buckets. If everything is "high," nothing is.

| Tier | Rule of thumb | Examples | What you do |
| --- | --- | --- | --- |
| High | Holds client/patient/employee data, or has admin into your tenant | Microsoft 365, EHR, payroll, MSP, backup | Written review, contract language, annual check |
| Medium | Limited data or can disrupt work | Zoom, website host, copier cloud | MFA, who owns the account, offboard path |
| Low | No data, no network | Flowers, office snacks | Pay the invoice. Stop. |

Re-tier when the product changes. A "scheduling widget" that starts storing dates of birth is no longer low.

Healthcare adds a legal layer: a vendor that creates, receives, maintains, or transmits PHI for you is a business associate. You need a BAA. That is not optional branding. Use the [HIPAA compliance checklist](/blog/hipaa-compliance-checklist/) and have counsel look at the paper. We are not your lawyer.

California privacy work (see [CCPA](/blog/ccpa-california-privacy-compliance/)) cares who you "share" or "sell" personal information with. The vendor list is also your service-provider list.

## What to ask (and what to ignore)

A high-risk vendor gets a short pack, not a novel.

Ask for:

- **Who is in scope.** Product name, data centers or region, subprocessors that will see *your* data.
- **Proof.** SOC 2 Type 2 (or HITRUST, or an ISO 27001 certificate) covering that product. The [AICPA SOC 2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2) page is the home of the standard. Read exceptions. A clean cover letter with a ugly section 4 is the part that matters.
- **Identity.** MFA required for their staff who can see your tenant. No shared "support" password.
- **Breach notice.** Hours, not "promptly." Who they call. What they send.
- **Exit.** How you get a copy of your data, and how they delete it.
- **BAA or DPA** if HIPAA or privacy law applies.

Ignore, unless you are huge:

- Their pentest PDF from 2019
- A marketing one-pager that says "bank-grade"
- 180 yes/no questions you will not score

The FTC's [small business cybersecurity](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity) material keeps landing on the same point: you are still responsible for the data you hand over. "The vendor had a logo" is not a defense.

### SOC 2 is evidence, not a hug

We have watched firms file a SOC 2 and never open it. Scope was a different product. The audit period ended before they signed. The exceptions listed open remote access. File the PDF after you read those three facts.

If they have no report at all, decide if the risk is worth a smaller vendor. Plenty of good niche tools will not have SOC 2. Then you lean harder on MFA, least privilege, and an exit clause.

## Contracts beat questionnaires

A questionnaire expires the day they change owners. A contract sits.

Put in writing, in language counsel will actually send:

- Breach notification window
- Right to get your data out in a usable format
- Deletion on termination
- No selling your data
- Subprocessor notice for high-risk tools
- Insurance if your own cyber policy or client requires it

Your cyber application will ask some of this anyway. Align the contract with the application so you are not inventing answers in a rush. That is why the insurance post and this list belong on the same desk.

Do not sign a click-through that grants the vendor a broad license to train models on client files unless you meant to. Read the AI addendum. If you cannot explain it to a partner, do not click it.

## Access is the risk you can cut this week

Paper is slow. Access is now.

High-risk vendors should not all be Global Admin. Give the MSP a scoped role. Give the marketing tool a site, not the tenant. Give the copier cloud a dedicated mailbox, not the managing partner.

### OAuth grants and leftover guests

Review Entra enterprise applications quarterly. Remove the OAuth grants nobody can name. That is the same hygiene as [employee offboarding](/blog/employee-offboarding-it-checklist/): leftover access is leftover access, whether the person quit or the app was a three-week experiment.

Guest accounts for vendors expire. Calendar the date. A "temporary" SharePoint invite from 2023 is a vendor you forgot.

If they need a VPN or a jump box, log it and turn it off when the project ends.

![Office team ranking which vendors can see client data](/images/blog/vendor-risk-management-small-business-3.webp "Tier vendors by data and access, not by how long you have used them")

## A 90-day program that is not a GRC tool

**Days 1 to 15.** Export the card statement, the Microsoft 365 apps list, and the password vault. One spreadsheet: name, what they hold, who owns the relationship, tier, contract end, last review.

**Days 16 to 45.** High-risk only. Request SOC 2 or equivalent, confirm MFA, confirm BAA/DPA if needed, write the missing contract lines. Kill or replace anything that has tenant-wide access and no owner.

**Days 46 to 90.** Offboard the dead ones. Rotate shared vendor passwords into a vault. Put a calendar invite for annual high-risk review. Add "new vendor" to the same intake you use for a new hire: who approved it, what they can see, when access dies.

If you want a structured first pass on your own controls while you do this, use the free [cybersecurity risk assessment](/tools/cybersecurity-risk-assessment/). For a facilitated review, [compliance and security audits](/services/compliance-security-audits/) is the service that sits next to this list.

### When to walk away

Walk when:

- They will not say where the data lives
- They require you to disable MFA "for the integration"
- They had a public incident and will not tell you whether you were in the blast
- The only admin account is a personal Gmail
- You cannot get a copy of your files without a hostage negotiation

Price is not a risk control. The cheap tool with global mailbox access is the expensive one.

## What this looks like in a Valley firm

A 22-person practice. Thirty-one vendors on the card. Six were high-risk. Two of those six had leftover Global Admin from a migration. One "AI assistant" could read mail. The copier tenant was still under the last office manager's personal email.

None of that needed a platform. It needed a Tuesday and a person who would say no.

Your version will look similar. The names change. The leftover admin does not.

If you want a Canoga Park team to sit with the spreadsheet, the Entra app list, and the high-risk contracts, [contact Secure Techies](/contact/). Bring the last two insurance applications. We will line them up with the vendors you actually have, not the ones on the brochure.
