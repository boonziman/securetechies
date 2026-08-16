---
date: 2026-08-16
title: "SHA-256 File Checksum"
meta_title: "SHA-256 Checksum Tool (Free Hash) | Secure Techies"
description: "Free SHA-256 file checksum tool. Hash a file in your browser and compare it to the published vendor digest. SHA-1 and SHA-512 too. Nothing is uploaded."
tool_id: "hash"
tool_icon: "hash"
tool_badge: "Utility"
tool_summary: "Hash a file in the browser and compare it to a published SHA-256, SHA-1, or SHA-512 digest."
tool_cta: "Need a process so staff only install software that matches the vendor hash?"
related_services:
  - label: "Cybersecurity Solutions"
    url: "/services/cybersecurity/"
  - label: "Managed Help Desk & IT Support"
    url: "/services/managed-help-desk/"
howto_steps:
  - name: "Get the published digest from the vendor"
    text: "Copy the SHA-256 (or SHA-1 / SHA-512) from the vendor page or the SHA256SUMS file. Do not copy a hash from a random forum post."
  - name: "Choose the file you downloaded"
    text: "Drop the installer or ISO on this page. The file is not uploaded. For files over 80 MB, use Get-FileHash on a workstation."
  - name: "Pick the same algorithm the vendor published"
    text: "SHA-256 is the default. Use SHA-1 only when that is the only digest they printed."
  - name: "Compare"
    text: "Paste the expected hex. Match means the bytes are the same. Mismatch means you have the wrong file, a bad download, or the wrong algorithm."
faq:
  - question: "What is a SHA-256 file checksum?"
    answer: "It is a 256-bit digest of the file bytes. Change one byte and the hex string changes. Vendors publish the digest so you can confirm the installer you downloaded is the one they built."
  - question: "Is my file uploaded?"
    answer: "No. The browser hashes it locally with the Web Cryptography API. Refresh the page and the file is gone from memory. Still avoid dropping files you would not open on this PC."
  - question: "Does a matching hash mean the file is safe?"
    answer: "No. It means the bytes match the digest you pasted. If the vendor site is honest, you have their build. It is not an antivirus verdict and it does not check a malware database."
  - question: "Why offer SHA-1 if it is broken?"
    answer: "Some older vendors still publish only SHA-1. Use it to confirm a download against that list. Do not use SHA-1 to prove a file is untampered against a motivated attacker. Prefer SHA-256."
  - question: "Why does my hash not match Get-FileHash?"
    answer: "You are hashing different bytes. A zip versus the file inside, a text file with different line endings, or SHA-256 versus SHA-512 will not match. Compare the same algorithm on the same file."
  - question: "Can I hash a password here?"
    answer: "You can hash a string, but do not use this page as a password store. Password hashing needs a slow, salted algorithm, not a raw SHA-256 of the password. Use a password manager instead."
weight: 14
draft: false
---

## Free SHA-256 file checksum tool

**Here is the short version:** hash the file you downloaded and compare it to the hex the vendor published. If they differ, do not run the installer. This **SHA-256 file checksum** tool does that in your browser. The file is not uploaded.

NIST defines the algorithm in [FIPS 180-4, the Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final). Microsoft's workstation command is [Get-FileHash](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash), which defaults to SHA-256. This page uses the same family of functions through the [W3C Web Cryptography API](https://www.w3.org/TR/WebCryptoAPI/).

Use it before you run an unknown installer, after you copy an ISO, or when two folders should hold the same build. Pair it with [managed help desk](/services/managed-help-desk/) so staff have a place to send "does this hash look right?"

## How a checksum actually helps

A filename is a label. `Setup.exe` can be anything. A SHA-256 digest is a fingerprint of the bytes. Vendors put that fingerprint on the download page or in a `SHA256SUMS` file so you are not trusting the CDN hop, the email attachment, or the USB stick.

A match answers one question: are these the same bytes the publisher hashed? It does not answer "is the publisher honest" or "is this malware." A criminal can hash their own trojan and print the digest next to the download.

That is still useful. Most bad installers in a small office are the wrong file, a truncated download, or a lookalike site. The [phishing email checker](/tools/phishing-email-checker/) is for the message that sent you the link. This page is for the file you then saved.

## What this page computes

| Algorithm | When to use it |
| --- | --- |
| SHA-256 | Default. What most vendors publish now |
| SHA-512 | Some Linux and appliance images |
| SHA-1 | Legacy lists only. Not a modern integrity proof |

The compare step strips spaces, colons, and a leading `0x`, then compares hex case-insensitively. That matches how people paste from PDF catalogs and from `Get-FileHash` output.

Text mode hashes the UTF-8 bytes of what you type. That is handy for checking a short string against a documented sample. It is the wrong tool for storing passwords.

## Worked sample (the button loads this)

Text: `Hello world`  
Algorithm: SHA-256  
Expected: `64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c`

That is the same digest Microsoft shows in the Get-FileHash documentation for that string. Expect **Match**. Change one letter and the hex will not look close. That is the point of a cryptographic hash.

On a workstation, the same check is:

```
Get-FileHash .\\Setup.exe -Algorithm SHA256
```

or `sha256sum Setup.exe` on macOS and Linux. Use those for multi-gigabyte ISOs. This page reads the whole file into memory. It will refuse files over 150 MB and warn above 80 MB so a phone does not freeze.

## Reading a SHA256SUMS file and certutil

Vendors often ship a text file next to the download. Each line is `hex  filename`. Hash the file you have, then search the text file for that hex. If the hex is there and the filename matches, you have that build. If the hex is missing, stop.

Windows also has `certutil -hashfile Setup.exe SHA256` ([certutil](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/certutil)). It prints the same digest with spaces between bytes. Paste that here. This tool ignores the spaces.

macOS: `shasum -a 256 Setup.exe`. Linux: `sha256sum Setup.exe`. All three should agree with this page on the same bytes.

Empty file SHA-256 is `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`. If you see that, you hashed nothing. Useful when a download created a 0-byte stub.

## When offices actually use this

A partner emails an "updated camera client." A vendor USB arrives at reception. Someone copies an ISO from a laptop to a server. Those are the three jobs. The hash is the cheap check before the file becomes "the official installer" on a share.

It is also how you prove two backups of a legal export are the same bytes, without opening the archive. Hash both files. If the hex matches, the copies match.

Do not email the file to yourself "to check it." That creates a second copy in mail. Hash it where it sits.

## Mistakes that create a fake mismatch

- You hashed the `.zip` and the vendor hashed the `.msi` inside it.
- You compared a SHA-256 digest to an MD5 or SHA-1 line.
- The text file grew a Windows CRLF on one side and a Unix LF on the other.
- The download stopped at 99 percent. The hash will not be "almost right." It will be wrong.
- You copied a truncated hash from a screenshot.

If the vendor only published MD5, treat that as a weak check. This tool does not offer MD5 on purpose. A two-minute hash is cheaper than rebuilding a PC.

## What a collision story does not change

You will see claims that "hashes can collide." For SHA-1 that is a real research result. For SHA-256, nobody has shown a practical collision on ordinary files. That is why vendors moved. This page still offers SHA-1 so you can read an old list. It labels that choice as legacy.

A more common failure is the wrong file, not a collision. People hash `Setup (1).exe` from Downloads and compare it to the digest for `Setup.iso`.

## What this checksum tool is not

It is not VirusTotal. It does not look up the hash in a malware set. It will not tell you the publisher is real. It will not hash a 4 GB Windows ISO without locking the tab. It will not see that `micros0ft-setup.com` is a lookalike. Read the URL first.

It is also not a substitute for application allow-listing or a signed package policy. A hash check is the two-minute gate. [Cybersecurity](/services/cybersecurity/) is the control that stops the next unsigned binary from running as admin.

Offices download remote-support tools, camera software, and "updated QuickBooks" files every week. The ones that get hurt run the file because the icon looked right.

If you want [cybersecurity](/services/cybersecurity/) controls so staff cannot run random installers, [contact Secure Techies](/contact/).
