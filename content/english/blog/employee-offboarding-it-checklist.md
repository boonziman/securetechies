---
title: "Employee Offboarding IT Checklist: Same-Day Access Close"
meta_title: "Employee Offboarding IT Checklist | Secure Techies"
description: "Employee offboarding IT checklist for Microsoft 365: block sign-in, revoke sessions, inbox rules, devices, and SaaS. Same-day steps you can run today."
date: 2026-08-15
image: "/images/blog/employee-offboarding-it-checklist.webp"
categories: ["Cybersecurity"]
author: "Secure Techies"
tags: ["employee offboarding IT checklist", "Microsoft 365 offboarding", "revoke access", "offboarding checklist", "Entra ID", "leaver process"]
draft: false
faq:
  - question: "What should IT do first when an employee leaves?"
    answer: "Block sign-in, revoke sessions, and reset the password. Then check inbox rules and auto-forwards. Disabling the account without revoking tokens can leave Outlook or Teams open for about an hour on some apps. Collect the laptop and badge the same day."
  - question: "Should we delete the Microsoft 365 account on the last day?"
    answer: "Usually no. Convert or hold the mailbox, transfer OneDrive, and set forwarding first. Microsoft keeps deleted-account content only for a short window. License reclaim comes after you no longer need the mailbox."
  - question: "How do we revoke Microsoft 365 access immediately?"
    answer: "In Entra ID, disable the account and use Revoke sessions. On a hybrid tenant, disable and reset the password in on-premises Active Directory first so the next sync does not turn the cloud account back on. Then remove MFA methods and check inbox rules."
  - question: "What SaaS apps get missed during offboarding?"
    answer: "Password vaults, QuickBooks, payroll, CRM, Adobe, vendor portals, and anything they opened with Login with Microsoft. Entra enterprise applications show many of those grants. Shared mailboxes and Teams guest invites are the other quiet leftovers."
  - question: "Is offboarding a security control or an HR task?"
    answer: "Both, but IT owns access. CIS treats account revocation as Access Control Management. A Friday email to IT at 3:40 p.m. is not a control. A written same-day list is."
---

Here's the short version: **an employee offboarding IT checklist starts with block, revoke, and inbox rules, not with deleting the account.** Do those three on the last day. Keep the mailbox until legal hold, OneDrive, and forwarding are done. Everything else is cleanup.

Accounts left on after someone leaves are a common incident path. We still find personal Gmail forwards in "departed" mailboxes. The person is gone. The mail is not.

Use this as the ticket body. If you want the interactive version, use the free [employee offboarding checklist](/tools/employee-offboarding-checklist/). [Managed help desk](/services/managed-help-desk/) should own the list so HR is not chasing three vendors on a Friday.

## Why same-day offboarding is a security control

CIS puts this under [Access Control Management](https://www.cisecurity.org/controls/access-control-management): create, assign, manage, and revoke credentials. NIST's [SP 800-53](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) says the same thing in federal language (AC-2). It is not an HR courtesy.

A disabled account stops new tokens. Existing access tokens can last about an hour. Desktop Outlook and a phone can last longer if you never revoke. Microsoft documents the order in [Revoke user access in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access): disable the account, revoke sessions, disable registered devices.

### Hybrid AD first, or the sync will undo you

On a hybrid tenant, disable and reset the password in Active Directory first. If you only flip the cloud switch, the next sync can turn it back on. Reset twice if you worry about pass-the-hash. Then revoke Entra sessions. Microsoft's revoke article is written for that exact failure.

## Employee offboarding IT checklist: same day, before you convert the mailbox

Microsoft's own series is [Remove a former employee](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/remove-former-employee). Use it. Then add the items Microsoft assumes you already remember.

Same day:

1. Block Microsoft 365 / Entra sign-in.
2. Revoke sessions and refresh tokens.
3. Reset the password and remove MFA methods, including Authenticator on a personal phone.
4. Check inbox rules, forwarding, delegates, and app passwords.
5. Revoke Entra app consents (Login with Microsoft on random tools).
6. Remove from security groups and shared mailboxes.
7. Disable VPN, remote desktop, and on-prem AD.
8. Remove them from the company password vault.
9. Collect laptop, phone, badge, keys, and tokens.
10. Retire or wipe the device in Intune.

Do not convert the mailbox until 1 through 4 are done. A hidden forward is how a "closed" account keeps leaking.

### Intune will not save an unmanaged home PC

Intune can wipe a managed laptop. Microsoft covers device wipe in the former-employee series and in [Intune remote actions](https://learn.microsoft.com/en-us/mem/intune/remote-actions/devices-wipe). An unmanaged home PC that had Outlook installed cannot be wiped from the cloud. Collect the hardware you own. Write the rest on the ticket.

## The next 48 hours (keep the work, drop the license later)

![IT admin reviewing a leaver checklist on a workstation](/images/blog/employee-offboarding-it-checklist-2.webp "Same-day block and revoke, then mailbox and OneDrive")

After access is dead:

- Legal hold or convert the mailbox to shared. Do not delete on day one unless counsel said to.
- Transfer OneDrive and Teams ownership so a client channel does not die with the user.
- Remove SaaS: CRM, Adobe, payroll, project tools.
- Remove vendor portals: insurance, benefits, shipping, banks.
- Remove guest accounts or Teams invites they created.
- Reclaim the Microsoft 365 license after the hold window, not before.

### Do not reclaim the license to "save money" on day one

Microsoft keeps content for a short window after you delete a user. Do not bet a matter file on that window. Convert, transfer, then reclaim. The [convert or forward mailbox](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/remove-former-employee-step-4) step exists so customers still reach the firm. Use it.

A seat you keep for two weeks is cheaper than reconstructing a matter from someone's laptop. If finance is pushing to cut licenses the same afternoon, show them the 30-day clock Microsoft documents in the former-employee series.

If HR even hinted at a dispute, stop and ask counsel before anyone "cleans up" the mailbox. IT should not be the one who emptied the evidence.

## Privileged and finance leavers are a different job

A standard associate is a same-day identity job. A bookkeeper is also a payments job. A Global Admin is an incident-shaped job.

**Finance:** remove bank, payroll, and bill-pay the same day. Tell AP that any "updated wiring instructions" from that address are hostile until proven otherwise. That is the same habit as [business email compromise](/blog/business-email-compromise/) and the [phishing email checker](/tools/phishing-email-checker/).

**IT / privileged:** remove directory roles, rotate shared secrets they could see, and transfer DNS, registrar, Azure, AWS, and GitHub. A personal Microsoft account that is still a guest counts. So does the Authenticator entry for the break-glass account.

Use the [password generator](/tools/password-generator/) when you replace vault items. [Password management](/blog/password-management-best-practices/) is how you stop the next shared admin password from living in a spreadsheet.

## A worked Friday: 18-person Valley law firm

An associate leaves Friday. HR emails IT at 3:40 p.m.

Same day: block Entra, revoke sessions, reset password, dump inbox rules, pull them from the litigation group and the billing shared mailbox, disable VPN, remove them from the vault, collect the laptop. Leave the mailbox.

Monday: convert to shared, give the practice chair access, move OneDrive, remove Clio and Adobe, reclaim the license after the chair confirms the files are there.

If they had been the only Global Admin, Friday also includes promoting a second admin and rotating tenant secrets. Do not discover that on Monday.

## Guests, OAuth, and the mailbox that still talks

Enterprise applications in Entra show which apps they consented to. A departed user who clicked Login with Microsoft on a random PDF tool can leave that grant sitting there. Review their sign-in log. Revoke those grants when you revoke sessions.

Guest accounts are the cousin of this problem. If they invited a personal Gmail into a client Teams, remove the guest or transfer the invite. Shared mailboxes they Send As still accept their old Outlook profile until you strip the permission.

Personal phones with Authenticator still hold MFA methods until you delete those methods. Blocking sign-in is not the same as wiping Authenticator.

Microsoft's first former-employee step is [prevent sign-in](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/remove-former-employee-step-1). Do that, then do the unglamorous inventory. The tenant will not volunteer every SaaS app.

## A ticket you can copy

Paste this into the help desk and check boxes as you go:

```
Last day:
Role: standard / finance / IT admin
Company device: yes / no
Legal hold: yes / no

Same day
[ ] Block Entra sign-in
[ ] Revoke sessions
[ ] Reset password, remove MFA methods
[ ] Inbox rules, forwards, delegates
[ ] Entra app consents
[ ] Groups and shared mailboxes
[ ] VPN / AD / RDP
[ ] Password vault
[ ] Collect hardware / Intune retire

Next 48 hours
[ ] Hold or convert mailbox
[ ] OneDrive and Teams ownership
[ ] SaaS and vendor portals
[ ] Guests they invited
[ ] License reclaim after hold
```

That is the whole process. Fancy identity products help. They do not replace the list.

## Common misses (the ones that show up in incidents)

| Miss | Why it hurts |
| --- | --- |
| Delete on day one | You lose the mailbox before anyone reads it |
| Disable but no revoke | Outlook stays open on the phone |
| Skip inbox rules | Personal Gmail keeps a copy |
| Skip the vault | They still have the shared 1Password folder |
| Leave QuickBooks | Bookkeeping continues from home |
| Unmanaged laptop | Cloud wipe does nothing |
| Shared mailbox Send As | Old Outlook profile still sends |

If this leaver is also a suspected incident, stop treating it as HR. Follow the [incident response plan](/blog/incident-response-plan/) and [cybersecurity](/services/cybersecurity/) path. Contain first.

## How to make the checklist survive the next Friday

Write it once. Put it in the ticket system. HR sends one form: last day, role (standard / finance / IT), device yes or no, legal hold yes or no.

Train one person on the help desk to run it without heroics. Review leftover accounts quarterly. A living inventory is how you find the intern from 2023 who still has Adobe.

Copy the remaining open items into the ticket when you hand off a shift. The next person should not guess. If the leaver was finance, tell AP in writing the same day, not in Slack the next week.

Southern California firms do this weekly. The ones that get hurt delete the account, skip the forward rule, and leave payroll open until Monday.

If you want the process owned as a ticket, not a panic, [contact Secure Techies](/contact/).

![Office laptop and badge ready for collection on a last day](/images/blog/employee-offboarding-it-checklist-3.webp "Collect the device. Cloud wipe only works on managed hardware")
