---
date: 2026-08-17
title: "Azure Cost Calculator"
meta_title: "Azure Cost Calculator (Free Estimate) | Secure Techies"
description: "Free Azure cost calculator for VMs, disks, blob, and egress. Uses published East US list rates from August 2026. Not a Microsoft quote. No signup needed."
tool_id: "azurecost"
tool_icon: "cloud"
tool_badge: "Cloud"
tool_summary: "Estimate Azure VMs, disks, blob, and egress from published list rates."
tool_cta: "Want Azure designed so the bill matches the diagram?"
related_services:
  - label: "Managed Infrastructure"
    url: "/services/infrastructure/"
  - label: "Backup & Disaster Recovery"
    url: "/services/backup-disaster-recovery/"
howto_steps:
  - name: "Pick region, size, OS, and hours"
    text: "730 hours is always-on. Drop hours if the VM really sleeps. Region is a multiplier on East US list."
  - name: "Add disks, blob, egress, and optional SQL"
    text: "OS disks bill while allocated. First 100 GB of internet egress is free on the US list we model."
  - name: "Read compute vs storage vs network"
    text: "If disks dwarf compute, you stopped the VM and kept the disk. If egress dwarfs compute, you are paying for leaving Azure."
  - name: "Confirm in Microsoft's calculator before you buy"
    text: "This page is a first-pass estimate. EA, CSP, Hybrid Benefit, and reserved SKUs change the real invoice."
faq:
  - question: "What does this Azure cost calculator estimate?"
    answer: "It estimates monthly list spend for a small Azure IaaS stack: VM compute, OS managed disks, Hot LRS blob, internet egress after the first 100 GB, Standard public IPv4, and optional SQL Database DTU SKUs. Rates are published East US retail prices from August 2026, then a region multiplier."
  - question: "Is this the official Microsoft Azure pricing calculator?"
    answer: "No. Microsoft's calculator is the source of truth for a quote, especially if you have an Enterprise Agreement or Azure Hybrid Benefit. Use this page to sanity-check a two-VM office stack in the browser with no login. Then rebuild the same SKUs in the official tool before you commit."
  - question: "Why is a stopped Azure VM still not free?"
    answer: "Deallocating a VM stops the compute meter. Stopped-but-still-allocated still bills compute. The managed disk, public IP if you kept it, and any SQL database keep billing either way. That is why this calculator prices disks and public IPs by the month, not by VM hours."
  - question: "How many hours is a month in Azure?"
    answer: "Microsoft's pricing pages often show a 730-hour month (365 × 24 ÷ 12). That is the default here. A 9-to-5 lab is closer to 160 to 200 hours if you actually shut it down. Partial months and leap years are rounding, not a new law."
  - question: "Does a 1-year savings plan apply to storage and egress?"
    answer: "Not in this model. The ~31% off compute matches the band Microsoft publishes for Dsv5 1-year savings versus pay-as-you-go. Disks, blob, SQL, and bandwidth stay at list. Real savings plans have product rules. Read the SKU."
  - question: "Can I use this as a vendor or board quote?"
    answer: "No. It is a planning estimate. Currency, reserved capacity, spot, availability zones, Defender for Cloud, backup vaults, and private endpoints are out of scope. Bring the breakdown to an engineer. Do not paste it into a contract."
weight: 16
draft: false
---

## Free Azure cost calculator

**Here is the short version:** Azure bills compute by the hour, disks by the month, and egress after a free band. This **Azure cost calculator** multiplies published East US list rates (August 2026) by your VM count, hours, disks, blob, and outbound GB so a two-server office stack has a number you can argue with.

It is not Microsoft's [pricing calculator](https://azure.microsoft.com/pricing/calculator/). That tool is the quote. This page is the napkin that does not need a login.

## What this Azure cost calculator includes

The model is the stack we actually size for Southern California firms moving a file server, a line-of-business VM, and some file dump to Azure:

- A handful of B-series, Dsv5, and Esv5 sizes, Linux or Windows pay-as-you-go
- One OS managed disk per VM (Standard SSD E10 or Premium SSD P10/P15/P30)
- Extra Hot LRS blob
- Internet egress (first 100 GB free, then the US list rate)
- Standard public IPv4
- Optional Azure SQL Database S0, S2, or S3

Microsoft documents the habit of turning usage into an estimate in [Estimate costs with the Azure pricing calculator](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/pricing-calculator). We keep the same job and a much smaller SKU list on purpose. Four hundred SKUs go stale. A D2s v5 you can explain does not.

## The formula

1. **Compute** = VMs × hours × list $/hour × savings-plan factor × region
2. **OS disks** = VMs × disk list $/month × region
3. **Blob** = GB × $0.0184 × region
4. **Egress** = max(0, GB − 100) × $0.087
5. **Public IP** = IPs × 730 × $0.005 × region (the IP resource, not VM hours)
6. **SQL** = selected DTU monthly list × region
7. **Month** = those lines. **Year** = month × 12

Hours default to **730**, the same convention Microsoft uses on VM pricing tables. Region is a multiplier taken from D2s v5 Linux list versus East US (West Europe about 1.20×, Central US about 1.13×). Egress stays on the US bandwidth list because Azure bandwidth is zone-priced and we will not pretend a single multiplier covers it. See [Bandwidth pricing](https://azure.microsoft.com/pricing/details/bandwidth/).

## Always-on is the expensive default

A VM that runs 730 hours is a server. A VM that runs 160 hours is a lab if you actually **deallocate** it. The compute line moves. The disk line does not. People "save money" by shutting down a box and then wonder why Premium SSD still shows up. That is not a bug. The disk is still allocated.

Azure's "Stopped" and "Stopped (deallocated)" are different. Stopped-but-allocated still bills compute. Deallocated stops the compute meter and keeps the disk and any public IP you did not delete. This calculator treats hours as compute hours and prices disks and public IPs as monthly resources.

If the office only needs the app from 8 to 6, model 200 hours and a runbook that deallocates. If nobody will remember to stop it, leave 730. Honesty here is cheaper than a reserved instance you do not use.

## Windows is not Linux plus hope

Windows list is the Linux compute meter plus the Windows Server license Microsoft sells by the hour. On D2s v5 in East US that is $0.096 versus $0.188 per hour at the rates baked into this tool. Azure Hybrid Benefit can pull Windows toward Linux if you already own eligible licenses. This calculator does **not** apply Hybrid Benefit. If you have Software Assurance, price that toggle in Microsoft's tool, not here.

SQL Server on the VM is also not in this model. The optional line is Azure SQL Database DTU SKUs (S0/S2/S3), billed while the database exists. Turning VM hours down does not pause SQL.

## Disks, blob, and the backup you forgot

Premium SSD P10 (128 GB) is the default OS disk because a random Standard HDD is how people create a slow file server and then blame Azure. Standard SSD E10 is here if the box is truly sleepy. P30 is 1 TB and it will dominate a small bill. That is the point of showing the line.

Blob is Hot LRS list. GRS, Cool, Archive, and Azure Files are different meters. Snapshots and Recovery Services vaults are not included. If backup is the reason you are moving, price the vault separately and read [Azure shared responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility): Microsoft runs the building. You still own the restore.

Pair this with the [VM host calculator](/tools/vm-calculator/) when the question is "how many guests fit a host," and with [backup retention](/tools/backup-retention-calculator/) when the question is "how many copies." This page is only the Azure invoice shape.

## Worked example

**2 × D2s v5 Linux, 730 hours, East US, Premium SSD P10, 200 GB blob, 250 GB egress, 1 Standard public IP, no SQL, pay-as-you-go**

- Compute = 2 × 730 × $0.096 = **$140.16**
- Disks = 2 × $19.71 = **$39.42**
- Blob = 200 × $0.0184 = **$3.68**
- Egress = (250 − 100) × $0.087 = **$13.05**
- Public IP = 1 × 730 × $0.005 = **$3.65**
- **Month ≈ $200** (the tool rounds to dollars)

That is a small always-on pair, not a company. Add Windows, a P30, or West Europe and the same diagram is not $200. Change one input at a time.

## Reservations and what this is not

The 1-year option applies **~31% off compute only**, in the band Microsoft publishes for Dsv5 savings plans versus pay-as-you-go. It is a teaching discount, not your EA price. Spot, reserved VM instances with a specific SKU, Dev/Test subscriptions, and Azure credits are out.

Also out: Defender for Cloud, NAT gateway, private endpoints, availability zones, App Service, AKS, Entra ID P2, and Microsoft 365 (that is a different bill). [Cloud services explained](/blog/cloud-services-explained/) is the vocabulary page. [Cloud infrastructure for data compliance](/blog/cloud-infrastructure-data-compliance/) is where region choice becomes a legal map, not a 20% multiplier.

This will not catch a forgotten public IP in another subscription. It will not model a partner's CSP markup. It will not replace [managed infrastructure](/services/infrastructure/) watching the actual invoice.

If the estimate is enough to decide "this belongs in Azure" versus "this stays on a host we already own," it did its job. Rebuild the same SKUs in Microsoft's calculator, then talk through identity, backup, and who gets the bill alert. [Contact Secure Techies](/contact/) if you want that design done once, not as a surprise in month three.
