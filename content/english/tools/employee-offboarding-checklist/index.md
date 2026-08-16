---
date: 2026-08-16
title: "Employee Offboarding Checklist"
meta_title: "Employee Offboarding Checklist (IT) | Secure Techies"
description: "Free IT employee offboarding checklist for Microsoft 365. Same-day sign-in block, session revoke, inbox rules, devices, and leftover SaaS. Browser-only."
tool_id: "offboard"
tool_icon: "user"
tool_badge: "Checklist"
tool_summary: "Same-day Microsoft 365 offboarding: block sign-in, revoke sessions, inbox rules, devices, and leftover SaaS."
tool_cta: "Want help desk to own joiners and leavers so HR is not chasing IT?"
related_services:
  - label: "Managed Help Desk & IT Support"
    url: "/services/managed-help-desk/"
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
howto_steps:
  - name: "Mark the role"
    text: "Turn on privileged or finance extras if this person had admin or money access. Leave company device on if they had a laptop or badge."
  - name: "Finish same-day items first"
    text: "Block sign-in, revoke sessions, reset the password, and check inbox rules before you convert the mailbox or reclaim the license."
  - name: "Copy what is still open"
    text: "Use the remaining list as the ticket body so the next person is not guessing."
  - name: "Do not delete the account on day one"
    text: "Keep the mailbox until legal hold, OneDrive transfer, and mail forwarding are done. Microsoft keeps deleted-account content only for a short window."
faq:
  - question: "What is an IT employee offboarding checklist?"
    answer: "It is the list of access to close when someone leaves: Microsoft 365 sign-in, sessions, MFA, inbox rules, VPN, devices, password vaults, and leftover SaaS. This page is a browser checklist. It does not change the tenant."
  - question: "What should we do first on the last day?"
    answer: "Block sign-in, revoke sessions, and reset the password. Then check inbox rules and auto-forwards. Disabling the account without revoking tokens can leave mail and Teams open for about an hour on some apps."
  - question: "Should we delete the Microsoft 365 account immediately?"
    answer: "Usually no. Convert or hold the mailbox, transfer OneDrive, and set forwarding first. Microsoft documents a limited window after delete. License reclaim comes after you no longer need the mailbox."
  - question: "Is this only for Microsoft 365?"
    answer: "The same-day block list is written for Entra ID and Microsoft 365 because that is what most of our clients run. The SaaS, vault, VPN, and finance extras apply to Google Workspace shops too."
  - question: "What if the person was a Global Admin?"
    answer: "Treat it as an incident-shaped offboard. Remove directory roles, rotate shared secrets they knew, and transfer DNS, registrar, Azure, and GitHub the same day. A leftover break-glass account in their Authenticator is still a key."
  - question: "Are my answers uploaded?"
    answer: "No. Checks stay in this browser. Refresh the page and they reset. Copy the remaining list into your ticket system if you want a record."
weight: 13
draft: false
---

## Free employee offboarding checklist for Microsoft 365

**Here is the short version:** on the last day, block sign-in, revoke sessions, reset the password, and read inbox rules before you touch the mailbox. This **employee offboarding checklist** tracks those steps in your browser. It does not log into Entra ID.

Accounts left on after someone leaves are a common incident path. CIS puts this under [Access Control Management](https://www.cisecurity.org/controls/access-control-management). Microsoft's own series is [Remove a former employee](https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/remove-former-employee). Use this page as the ticket, then do the work in the admin centers.

Pair it with the [cybersecurity risk assessment](/tools/cybersecurity-risk-assessment/) if you want the wider score. Offboarding is one question there. This page is the runbook.

## Same day is not "disable the user"

Blocking the account stops new tokens. Existing access tokens can last about an hour. Session cookies in desktop Outlook or a phone can last longer if you never revoke. Microsoft documents the order in [Revoke user access in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access): disable the account, revoke sessions, disable registered devices.

On a hybrid tenant, disable and reset the password in on-premises Active Directory first, or the next sync will turn the cloud account back on. Reset the password twice if you worry about pass-the-hash. Then revoke Entra sessions.

Inbox rules are the item firms skip. A hidden forward to a personal Gmail account is how a "departed" mailbox keeps leaking. Check rules, forwarding, mailbox delegates, and app passwords on day one. Then revoke the Entra app consents they clicked ("Login with Microsoft" on a random PDF tool). Those grants survive a password reset.

## What to keep, what to delete

Do not delete the account on the last day unless counsel said to. You usually need:

1. The mailbox, as a shared mailbox or on hold
2. OneDrive files, transferred to a manager
3. Teams ownership, so a client channel does not die
4. A forwarding address for a few weeks

Microsoft keeps content for a short window after you delete a user. Do not bet the matter file on that window. Convert, transfer, then reclaim the license. The checklist puts license reclaim in the 48-hour group on purpose.

Legal hold belongs before anyone "cleans up" the mailbox. If HR even hinted at a dispute, stop and ask counsel. IT should not be the one who emptied the evidence.

## Devices, vaults, and the stuff that is not Entra

Intune can wipe a managed laptop. An unmanaged home PC that had Outlook installed cannot be wiped from the cloud. Collect the hardware. Retire the object in MDM so it cannot keep pulling mail.

Password vaults are the other silent miss. If they were in 1Password, Bitwarden, or a shared LastPass folder, remove them before you send the "thanks for everything" email. Shared items they could export are now a rotation job. Use the [password generator](/tools/password-generator/) when you replace those secrets.

VPN profiles, Wi-Fi PSKs written on a sticky note, and the alarm code for the suite are not in Entra. Write them on the ticket. [Managed help desk](/services/managed-help-desk/) is the group that should own this list so HR is not pinging three vendors.

## Privileged and finance leavers

A standard associate is a same-day identity job. A bookkeeper is also a payments job. A Global Admin is an incident-shaped job.

For finance: remove bank, payroll, and bill-pay the same day. Tell AP that any "updated wiring instructions" from that person's address are hostile until proven otherwise. That is the same habit as the [phishing email checker](/tools/phishing-email-checker/).

For IT: remove directory roles, rotate the secrets they could see, and transfer DNS, registrar, Azure, AWS, and GitHub. A personal Microsoft account that was still a guest on the tenant counts. So does the Authenticator entry for the break-glass account.

NIST [SP 800-53](https://csrc.nist.gov/pubs/sp/800-53/r5/upd1/final) treats account disable and revocation as Access Control (AC-2), not as an HR courtesy. Offboarding is how you stop a former admin from remaining an admin.

## Worked example (18-person Valley law firm)

An associate leaves Friday. HR emails IT at 3:40 p.m.

Same day: block Entra, revoke sessions, reset password, dump inbox rules, pull them from the litigation security group and the billing shared mailbox, disable VPN, remove them from the vault, collect the laptop. Leave the mailbox.

Monday: convert to shared, give the practice chair access, move OneDrive, remove Clio and Adobe, reclaim the license after the chair confirms the files are there.

If they had been the only Global Admin, Friday also includes promoting a second admin and rotating the tenant's shared secrets. Do not discover that on Monday.

## Guests, OAuth, and the mailbox that still talks

Enterprise applications in Entra show which apps they consented to. A departed user who clicked "Login with Microsoft" on a random PDF tool can leave that grant sitting there. Review their sign-in log and revoke those grants when you revoke sessions.

Guest accounts are the cousin of this problem. If they invited a personal Gmail into a client Teams, remove the guest or transfer the invite. Shared mailboxes they "Send As" still accept their old Outlook profile until you strip the permission.

Personal phones with the Microsoft Authenticator app still hold MFA methods until you delete those methods. Blocking sign-in is not the same as wiping Authenticator.

## What this checklist is not

It is not a Microsoft Graph script. It will not disable the user for you. It will not find every SaaS app they signed into with "Login with Microsoft" unless you look at Entra enterprise applications. It is not legal advice about holds.

Score starts at 0% with every box open. That is the honest first result. A 100% on this page means you checked boxes, not that the tenant is clean.

The offices that get hurt are the ones that delete the account on Friday, skip the forward rule, and leave QuickBooks open until Monday.

If you want [help desk](/services/managed-help-desk/) to run joiners and leavers as a ticket, not a 3:40 p.m. scramble, [contact Secure Techies](/contact/).
