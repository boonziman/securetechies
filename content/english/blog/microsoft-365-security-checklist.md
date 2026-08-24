---
title: "Microsoft 365 Security Checklist: Harden Your Tenant in 2026"
meta_title: "Microsoft 365 Security Checklist | Tenant Hardening Guide"
description: "A practical Microsoft 365 security checklist for small and mid-size businesses: MFA, Conditional Access, email auth, admin hygiene, audit logs, and backups."
date: 2026-08-04
image: "/images/blog/microsoft-365-security-checklist.webp"
categories: ["Cybersecurity"]
author: "Secure Techies"
tags: ["Microsoft 365 security checklist", "M365 security", "Microsoft 365 hardening", "Secure Score", "Conditional Access", "Microsoft 365 MFA"]
draft: false
faq:
  - question: "What is a Microsoft 365 security checklist?"
    answer: "A Microsoft 365 security checklist is a prioritized list of tenant settings and processes that reduce account takeover, email fraud, data leakage, and ransomware impact. It typically covers MFA, Conditional Access, admin account hygiene, email authentication, sharing controls, audit logging, device requirements, and backup or retention strategy beyond native recycle bins."
  - question: "Is Microsoft Secure Score enough to secure Microsoft 365?"
    answer: "Secure Score is a useful progress meter, not a finish line. It highlights recommended controls, but it cannot judge your business risk, legacy app exceptions, or whether backups and incident processes actually work. Use Secure Score to find gaps, then validate configurations and operational habits with a checklist tailored to your tenant."
  - question: "What is the first Microsoft 365 security control to enable?"
    answer: "Multi-factor authentication for all users, especially admins, is the highest-impact first control for most small and mid-size tenants. Pair it with blocking legacy authentication so MFA cannot be bypassed by old protocols. After MFA, prioritize admin reduction, email authentication (SPF, DKIM, DMARC), and Conditional Access baselines."
  - question: "Do small businesses need Conditional Access?"
    answer: "Yes, if your licenses support it. Conditional Access lets you require MFA, block risky sign-ins, and limit access by location or device compliance instead of relying on passwords alone. Even a small set of policies (require MFA for all, block legacy auth, require compliant devices for sensitive apps) dramatically improves Microsoft 365 security posture."
  - question: "Should we back up Microsoft 365 separately?"
    answer: "Native recycle bins and retention help, but they are not a full backup strategy against ransomware, malicious admins, or accidental mass deletion after retention windows. Many businesses add third-party Microsoft 365 backup for mail, OneDrive, and SharePoint with tested restores. Decide based on how painful permanent loss of email and files would be."
---

Here's the short version: **a Microsoft 365 security checklist hardens the controls attackers actually abuse (identity, email, admin privilege, sharing, and recovery) so your tenant is harder to take over and faster to restore.** Default settings and a high Secure Score screenshot are not a security program.

Microsoft 365 is the operating system of modern work for countless small and mid-size companies. That also makes it a prime target for business email compromise, token theft, and ransomware that aims at cloud data. This checklist is a security hardening guide, not a license shopping tour. For product and productivity context, see our [Microsoft 365 for business](/blog/microsoft-365-business/) overview, then use this page to lock the tenant down.

## How to use this checklist

Work top to bottom. Identity failures cause more real-world pain than exotic zero-days for most SMBs. Assign an owner for each item, record the date completed, and re-check quarterly. Microsoft publishes security guidance and baselines you should treat as living references ([Microsoft 365 security documentation](https://learn.microsoft.com/en-us/microsoft-365/security/)).

![IT admin reviewing Microsoft 365 security settings](/images/blog/microsoft-365-security-checklist-2.webp "Harden identity and email first in Microsoft 365")

## 1. Identity: MFA and Conditional Access

**Checklist**

- [ ] MFA required for **all** users, not only admins.
- [ ] Prefer authenticator apps or phishing-resistant methods over SMS where possible.
- [ ] Legacy authentication blocked (old protocols that skip modern MFA).
- [ ] Self-service password reset configured with secure methods.
- [ ] Conditional Access policies require MFA for all cloud apps (or equivalent security defaults if that is your interim state).
- [ ] Separate policies for admins with stricter requirements.
- [ ] Break-glass emergency admin accounts documented, monitored, and excluded carefully.

MFA remains one of the highest-leverage controls against account takeover. Pair it with process: no shared mailboxes used as primary logins, and no passwords in chat threads. Deeper background: [multi-factor authentication](/blog/mfa-multi-factor-authentication/).

### Security Defaults versus Conditional Access

Security Defaults are better than nothing. Conditional Access is better for real businesses because you can require compliant devices, block impossible travel patterns, and stage rollouts. If licenses allow Conditional Access, plan the migration off pure defaults with explicit policies and exception tracking.

## 2. Admin hygiene and least privilege

**Checklist**

- [ ] Fewer than a handful of Global Admins (track every one).
- [ ] Daily work done in non-admin accounts; elevate only when needed.
- [ ] Privileged roles use stronger MFA and limited standing access.
- [ ] Guest and partner admin access time-bound and reviewed.
- [ ] Unused admin roles removed after projects.
- [ ] Privileged access reviews scheduled (quarterly is a good SMB rhythm).

Most tenants accumulate privilege the way drawers accumulate cables. Attackers love that. Reduce standing admin rights and log privileged actions.

## 3. Email authentication and anti-phishing

**Checklist**

- [ ] SPF published for sending domains.
- [ ] DKIM enabled for Microsoft 365 domains.
- [ ] DMARC policy at least `p=quarantine` (work toward `reject` when ready).
- [ ] Anti-phishing policies tuned for executives and finance users.
- [ ] External sender warnings enabled.
- [ ] Safe Links / Safe Attachments (or equivalent Defender capabilities) enabled if licensed.
- [ ] User reporting button and a real handling process for phish reports.

Email remains the front door for [business email compromise](/blog/business-email-compromise/) and [phishing](/blog/phishing-email-security/). Technical authentication stops a class of spoofing; training reduces the rest. CISA and related federal guidance continue to stress MFA and email hygiene as baseline cyber practices ([CISA cybersecurity best practices](https://www.cisa.gov/topics/cybersecurity-best-practices)).

## 4. Sharing, SharePoint, and OneDrive controls

**Checklist**

- [ ] Default sharing link type is not "anyone with the link" unless you truly need that.
- [ ] Guest sharing governed: who can invite, which domains, expiration where possible.
- [ ] OneDrive and SharePoint external sharing reviewed at tenant and site levels.
- [ ] Sensitivity labels or at least clear classification practices for sensitive libraries.
- [ ] Unmanaged device access limited for high-sensitivity content if licenses allow.
- [ ] Periodic review of sites with broad "everyone" permissions.

Data loss in Microsoft 365 is often accidental oversharing, not Hollywood hacking. Tighten defaults, then open exceptions with owners and expiration dates. For a project record of that cleanup, see [SharePoint oversharing cleanup for a media agency](/case-studies/sharepoint-external-sharing-cleanup/).

## 5. Devices, sessions, and endpoint trust

**Checklist**

- [ ] Devices that access mail and files are managed where practical (Intune or equivalent).
- [ ] Disk encryption and screen locks enforced on corporate laptops.
- [ ] Sign-in frequency and persistent browser session settings reviewed for risk.
- [ ] Mobile device access policies defined (wipe on loss, require PIN).
- [ ] Mac and BYOD exceptions documented, not ignored.

Identity without device hygiene still leaves large holes, especially for remote teams. Align with your broader [endpoint detection and response](/blog/endpoint-detection-response/) approach and [cybersecurity services](/services/cybersecurity/).

## 6. Audit logs, alerts, and detections

**Checklist**

- [ ] Unified audit log enabled and retention understood.
- [ ] Alerts for suspicious sign-ins, mass downloads, and inbox rules that forward mail externally.
- [ ] Mailbox audit where available for high-risk users.
- [ ] Defender or third-party detections reviewed weekly, not only after incidents.
- [ ] Incident owners named (internal or MSP) with after-hours path.

Logs you never read are not a control. Even a small business can alert on a few high-value signals: impossible travel, new inbox forwarding rules, and sudden admin role changes.

![Security dashboard and checklist for cloud email and files](/images/blog/microsoft-365-security-checklist-3.webp "Monitor Microsoft 365 alerts, not only Secure Score")

## 7. Backup, retention, and recovery

**Checklist**

- [ ] Retention policies match legal and business needs without accidental over-deletion.
- [ ] Recycle bin and litigation hold concepts understood by admins.
- [ ] Third-party Microsoft 365 backup evaluated for mail, OneDrive, SharePoint, and Teams files if permanent loss is unacceptable.
- [ ] Restore tests performed and timed.
- [ ] Ransomware tabletop includes cloud data recovery, not only file servers.

Native tools help with accidental deletion. They are incomplete insurance against sophisticated destructive attacks or malicious insiders. Tie recovery to your [business continuity plan](/blog/business-continuity-plan-small-business/) and [backup disaster recovery](/blog/backup-disaster-recovery/) strategy.

## 8. Secure Score, baselines, and quarterly review

**Checklist**

- [ ] Microsoft Secure Score reviewed monthly; track trend, not vanity peaks.
- [ ] Compare against Microsoft security baselines relevant to your license set.
- [ ] Exception register: every risky setting has an owner and review date.
- [ ] Offboarding checklist removes licenses, groups, devices, and sessions the same day.
- [ ] Quarterly access review for guests and high-privilege roles.

NIST's Cybersecurity Framework is a useful way to map these operational habits to identify, protect, detect, respond, and recover ([NIST CSF](https://www.nist.gov/cyberframework)). FTC guidance for businesses also continues to treat reasonable security safeguards as an ongoing duty, not a one-time project ([FTC data security](https://www.ftc.gov/business-guidance/privacy-security/data-security)).

## Priority roadmap for busy teams

| Priority | Controls | Target window |
| --- | --- | --- |
| P0 | MFA everywhere, block legacy auth, reduce Global Admins | This week |
| P1 | SPF/DKIM/DMARC, anti-phish policies, external sharing defaults | This month |
| P2 | Conditional Access maturity, device compliance, alerting | This quarter |
| P3 | Backup product + restore drills, label strategy, advanced detections | This half |

If you lack internal bandwidth, a managed partner can operate this checklist as part of ongoing [managed IT](/services/managed-help-desk/) and [compliance security audits](/services/compliance-security-audits/). Related reading: [password management best practices](/blog/password-management-best-practices/) and [zero trust security](/blog/zero-trust-security/).

## Common Microsoft 365 security mistakes

- MFA for admins only.
- Legacy protocols left on "for that one scanner."
- Thirteen Global Admins "just in case."
- Anyone-links on confidential libraries.
- No process for phishing reports.
- Assuming Microsoft backs up your tenant the way a backup product does.
- Chasing Secure Score points that break line-of-business apps without staging.

Avoid those and your Microsoft 365 security checklist becomes a living control system instead of a one-time project plan that dies after onboarding.

## Guest access, apps, and shadow IT inside Microsoft 365

Tenants accumulate risk through convenience. Users connect third-party apps with OAuth grants, invite guests to sensitive Teams, and create shared mailboxes that become orphaned when someone leaves. Extend your Microsoft 365 security checklist to application consents: review enterprise applications quarterly, remove stale OAuth grants, and restrict who can consent to new apps when licenses allow.

Teams and SharePoint sprawl creates permission models that nobody can explain. Establish naming standards, site ownership rules, and lifecycle policies for unused teams. Orphaned collaboration spaces are where confidential files go to be overshared. A light governance model beats a free-for-all followed by a panic lockdown after an incident.

### Mailbox rules and BEC tradecraft

Attackers who gain mailbox access often create inbox rules that hide warnings and forward mail externally. Your detections should flag new forwarding rules, unusual send patterns from executives, and consent to suspicious apps. Finance should verify payment detail changes by phone using known numbers, not by replying inside a compromised thread. Technical controls and process controls have to meet in the middle.

Document emergency procedures for a suspected executive mailbox compromise: reset credentials, revoke sessions, review rules, notify finance, and preserve audit logs. Minutes matter more than perfect forensics on hour one. Tie this into your wider [incident response plan](/blog/incident-response-plan/) so Microsoft 365 events are not improvised in a side chat.

Licensing clarity helps too. Some advanced Defender and Conditional Access capabilities require specific SKUs. Rather than guessing, inventory licenses, enable the controls you already pay for, and only then decide whether an upgrade is justified. Many tenants leave included security value turned off while shopping for yet another tool.

## 30-day Microsoft 365 hardening sprint

If the full Microsoft 365 security checklist feels large, run a focused sprint. Do not rearrange deck chairs in SharePoint while Global Admin MFA is still optional.

| Days | Actions | Exit criteria |
| --- | --- | --- |
| 1 to 7 | Enforce MFA for all users, block legacy auth, inventory Global Admins | No interactive user without MFA; admin list documented |
| 8 to 14 | SPF, DKIM, DMARC baseline; external sender warnings; phish report process | Auth records valid; staff know how to report |
| 15 to 21 | Sharing defaults tightened; guest review; disable stale guests | Default links are not anonymous anyone-links |
| 22 to 30 | Alerts for forwarding rules and risky sign-ins; backup decision; Secure Score trend note | Named owner watches alerts; restore strategy chosen |

After the sprint, schedule quarterly access reviews and a restore test if you added backup tooling. For hybrid workers who live in Teams and Outlook all day, align device and identity rules with your [remote work security checklist](/blog/remote-work-security-checklist/). If you lack internal admins, fold the sprint into [managed help desk](/services/managed-help-desk/) and [cybersecurity](/services/cybersecurity/) operations so settings do not drift the week after a consultant leaves.

### Proof you can show leadership

Leaders do not need every blade of Conditional Access detail. They need proof:

1. Percent of users with MFA enforced (should be effectively 100% of interactive accounts).
2. Number of Global Admins and date of last access review.
3. DMARC policy state and whether spoofing tests still land in inboxes.
4. Last backup restore test for mail and files (date and result).
5. Open high-risk items from Secure Score or your checklist with owners and due dates.

That one-page proof turns a Microsoft 365 security checklist from IT busywork into board-ready risk management. It also prepares you for insurer questionnaires and customer security reviews without a last-minute scramble.

Ready to harden your tenant with a prioritized action plan and proof of progress? [Contact Secure Techies](/contact/) for a Microsoft 365 security review and remediation roadmap.
