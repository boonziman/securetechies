---
title: "Password Strength Checker & Generator"
meta_title: "Password Generator & Strength Checker (Free) | Secure Techies"
description: "Free password strength checker and generator. Entropy scoring, common-pattern flags, random or passphrase mode, multi-password batch, browser-only privacy."
tool_id: "password"
tool_icon: "lock"
tool_badge: "Security"
tool_summary: "Check password strength and generate strong random passwords offline in your browser."
tool_cta: "Want MFA, password managers, and email security done right?"
related_services:
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
  - label: "Managed Help Desk"
    url: "/services/managed-help-desk/"
howto_steps:
  - name: "Check or generate in the browser"
    text: "Type a candidate or generate a random password or passphrase. Nothing is uploaded."
  - name: "Read entropy and flags, not just the color bar"
    text: "A Name123 pattern can look complex and still be weak. Unique plus MFA matters more than any single score."
  - name: "Store it in a password manager"
    text: "Do not reuse the result. Turn on MFA for email, VPN, banking, and admin."
faq:
  - question: "Is my password sent to a server?"
    answer: "No. Strength checks and generation run entirely in your browser with JavaScript. Nothing is uploaded to Secure Techies for this tool."
  - question: "What makes a password strong?"
    answer: "Length, randomness, and uniqueness matter most. A long unique passphrase or a high-entropy random password beats short complex patterns that people reuse. NIST now emphasizes length and blocking known-bad passwords over forced periodic rotation."
  - question: "Should I use a password manager?"
    answer: "Yes for almost every business. Managers create unique passwords per site, store them encrypted, and reduce reuse. Pair them with MFA on email, banking, VPN, and admin accounts."
  - question: "What entropy score is good enough?"
    answer: "As a rough guide, 60+ bits is moderate for many accounts, 80+ bits is strong, and 100+ bits is excellent for high-value vaults. Unique passwords and MFA still matter more than any single number."
  - question: "Why do crack-time estimates vary?"
    answer: "They are educational estimates based on an assumed offline guess rate. Real attackers also use breached password lists and phishing, so a high-entropy unique password is safer than a clever word that appears in dumps."
weight: 5
draft: false
---

## Free password strength checker and secure password generator

**Here is the short version:** a unique 16+ character secret plus MFA beats a clever short password every time. This **password strength checker** and **secure password generator** estimates entropy, flags common patterns, and can mint random passwords or passphrases in your browser. Secrets are not uploaded to Secure Techies.

Use it to test a candidate, generate a batch for a rotation, or show a team why `Summer2026!` is still weak.

## How strength is estimated

1. Detect character classes (lower, upper, digits, symbols)
2. Estimate charset size
3. Compute **entropy ≈ length × log2(charset)** for random-looking secrets
4. Apply penalties for repeats, years, Name123 shapes, digits-only, and a small common-password list
5. Map entropy bands to Very weak through Excellent

Crack times assume about 10 billion offline guesses per second. That is teaching math, not a promise. Attackers also use phishing and credential stuffing. CISA's [MFA guidance](https://www.cisa.gov/MFA) is the control that still matters after a password leaks.

A password can score "fair" on entropy and still be in a dump. Uniqueness is not optional. If the same secret opens Microsoft 365 and a shopping site, one breach becomes a mailbox takeover.

## What NIST actually says now

[NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html) moved agencies away from frequent forced rotation and composition theater. Prefer:

- Longer secrets (or passphrases) people can actually use
- Screening against known-breached passwords
- MFA on anything that can reset mail or money
- A manager so uniqueness is automatic

Microsoft's [password policy recommendations](https://learn.microsoft.com/en-us/microsoft-365/admin/misc/password-policy-recommendations) for Microsoft 365 match that direction. Forced 90-day rotation without a manager produces `Winter2026!` written on a monitor. That is not a policy. That is a gift.

## Generator options that matter

- **Length 16–20** for important random passwords
- **Passphrases** of 4–5 words when a human must type them
- Exclude ambiguous characters when someone will read them off a screen
- Generate batches for staged rotations
- Never reuse a generated password across sites

Generation prefers `crypto.getRandomValues` when the browser provides it. Passphrase mode uses a short built-in word list for convenience. It is not diceware with 7,776 words. For a vault master password, prefer the random mode at 20+ characters or a longer phrase you do not reuse.

## Business password policy baseline

1. Password manager for staff, paid for by the firm
2. MFA on Microsoft 365, VPN, finance, and admin. Prefer phishing-resistant methods where you can
3. Block known breached passwords where the identity provider allows
4. Unique service accounts in a vault. No shared "office" login
5. A report path for phishing. Pair with the [email header analyzer](/tools/email-header-analyzer/)
6. Offboarding that kills the manager and the MFA device on the last day

Layer this with [cybersecurity services](/services/cybersecurity/) and [managed help desk](/services/managed-help-desk/). Estimate incident dollars with the [ransomware cost calculator](/tools/ransomware-cost-calculator/). Score the rest of the stack with the [cybersecurity risk assessment](/tools/cybersecurity-risk-assessment/).

## Privacy and limits

Scoring and generation are client-side. Refresh the page and the secrets are gone from this site. This is not a replacement for privileged access management or conditional access. It will not tell you that an admin reused the generated password in a personal mailbox.

Browser extensions that "check your password" can be helpful or hostile. Prefer the manager's own breach check. This page does not call Have I Been Pwned or any API. That is a feature. It also means a green score here does not mean the string is absent from every dump.

## What the color bar is not

Green does not mean "safe to reuse." Green means this particular string looks random enough under a simple model. The same green password pasted into twelve sites is still one breach away from a mailbox takeover. The checker cannot see reuse. Only a manager can.

Do not paste production passwords into random websites to "see the score." This page runs locally. Most "password testers" on the internet do not. If you would not print the secret, do not put it in a stranger's form.

## Passphrases vs random strings

A four-word phrase is easier to type on a phone. It is weaker than a 20-character random string from a large charset if the word list is small. Use passphrases for the few secrets humans still type (workstation unlock, if policy allows). Use random strings in the manager for everything else.

Do not build a phrase from your kids' names and a year. The flags on this page exist because that pattern is common. Attackers know it too.

Shared mailbox passwords in a spreadsheet are not a manager. If three people know the password, it will appear in a departure email and a Slack thread.

Service accounts (backup, scanners, line-of-business) need long random secrets in the vault, not a passphrase someone typed once in 2019. Rotate them when a vendor or an employee who knew them leaves. The generator batch mode exists for that rotation, not for decorating a wiki.

## What a good rollout looks like

Pick a manager. Enforce MFA on Microsoft 365 first. Import or reset the worst reused passwords. Then expand to VPN and finance. Help desk should know the reset path so people do not write new secrets on paper. That is an operations project. We run those under [managed help desk](/services/managed-help-desk/).

Local admin passwords on workstations should be unique per device (LAPS or equivalent), not one shared local admin for the firm. This generator can mint those. The manager or directory has to store them. A spreadsheet named `passwords-final-FINAL.xlsx` is not that store.

Print the policy in one page: manager required, MFA required, no shared inboxes, resets go through help desk. Hang it next to the coffee machine if you must. Then enforce it in the tenant, not only on paper.

If you want MFA and identity rolled out as an operation, not a memo, [contact Secure Techies](/contact/).
