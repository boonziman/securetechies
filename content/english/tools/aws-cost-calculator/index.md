---
date: 2026-08-16
title: "AWS Cost Calculator"
meta_title: "AWS Cost Calculator (Free Estimate) | Secure Techies"
description: "Free AWS cost calculator for EC2, EBS, S3, and data transfer. Uses published us-east-1 list rates from August 2026. Not an AWS quote. No signup needed."
tool_id: "awscost"
tool_icon: "cloud"
tool_badge: "Cloud"
tool_summary: "Estimate EC2, EBS, S3, and data transfer from published us-east-1 list rates."
tool_cta: "Want AWS designed so the invoice matches the architecture?"
related_services:
  - label: "Managed Infrastructure"
    url: "/services/infrastructure/"
  - label: "Backup & Disaster Recovery"
    url: "/services/backup-disaster-recovery/"
howto_steps:
  - name: "Pick region, instance, OS, and hours"
    text: "730 hours is always-on. T3 is burstable. m5/r5 are steady. Region is a multiplier on us-east-1 list."
  - name: "Set gp3 GB, S3 GB, and data transfer out"
    text: "EBS bills while the volume exists. First 100 GB of internet egress is free across AWS."
  - name: "Read compute vs storage vs transfer"
    text: "If EBS dwarfs EC2, you stopped the instance and kept the disk. If transfer dwarfs EC2, you are paying to leave AWS."
  - name: "Confirm in the AWS Pricing Calculator before you buy"
    text: "This page is a first-pass estimate. Private pricing, Savings Plans SKUs, and Multi-AZ RDS change the real invoice."
faq:
  - question: "What does this AWS cost calculator estimate?"
    answer: "It estimates monthly list spend for a small IaaS stack: EC2 On-Demand, gp3 EBS, S3 Standard, internet data transfer after the first 100 GB, public IPv4, and optional single-AZ RDS. Rates are published us-east-1 list from August 2026, then a region multiplier."
  - question: "Is this the official AWS Pricing Calculator?"
    answer: "No. calculator.aws is the source of truth, especially if you have an Enterprise Discount Program or a partner wrap. Use this page to sanity-check two instances in the browser with no login. Then rebuild the same SKUs in the official tool before you commit."
  - question: "Why is a stopped EC2 instance still not free?"
    answer: "Stopping EC2 stops the instance-hour meter. EBS volumes, Elastic IPs you did not release, and RDS keep billing. That is why this calculator prices EBS by GB-month and public IPv4 as a monthly address, not by instance hours."
  - question: "Are T3 unlimited burst credits included?"
    answer: "No. T3 On-Demand list is in the compute line. If you pin the CPU in unlimited mode, AWS adds CPU-credit charges ($0.05 per vCPU-hour on Linux). Sustained 100% CPU on T3 can cost more than an m5. Use m5 when the box is actually busy."
  - question: "Does a 1-year savings estimate apply to S3 and data transfer?"
    answer: "Not in this model. The ~27% off compute is a teaching band for 1-year no-upfront reserved-class savings. EBS, S3, RDS, and transfer stay at On-Demand list. Real Savings Plans have product rules. Read the SKU."
  - question: "Can I paste this into a board quote?"
    answer: "No. It is a planning estimate. NAT gateways, load balancers, CloudWatch, backups, Multi-AZ, and data transfer between AZs are out of scope. Bring the breakdown to an engineer. Do not put it in a contract."
weight: 17
draft: false
---

## Free AWS cost calculator

**Here is the short version:** AWS bills EC2 by the hour, EBS and S3 by the GB-month, and internet egress after a free band. This **AWS cost calculator** multiplies published us-east-1 list rates (August 2026) by your instance count, hours, disks, object storage, and outbound GB so a two-server office stack has a number you can argue with.

It is not the [AWS Pricing Calculator](https://calculator.aws/). That tool is the quote. This page is the napkin that does not need an IAM user.

## What this AWS cost calculator includes

The model is the stack we actually size when a Southern California firm asks "what does two servers in AWS cost before we migrate?"

- t3 (burstable), m5 (general), and r5 (memory) sizes, Linux or Windows license-included
- gp3 EBS per instance
- S3 Standard
- Internet data transfer out (first 100 GB free, then the US list rate)
- Public IPv4 (in-use and idle)
- Optional single-AZ RDS on db.t3.micro / small / medium

[EC2 On-Demand pricing](https://aws.amazon.com/ec2/pricing/on-demand/) is the compute source. Windows is Linux plus **$0.046 per vCPU-hour**, which is the Windows Server AMI component AWS publishes on that page. We do not invent a Windows SKU table.

## The formula

1. **EC2** = instances × hours × list $/hour × savings factor × region
2. **EBS gp3** = instances × GB × $0.08 × region
3. **S3 Standard** = GB × $0.023 × region
4. **Data transfer out** = max(0, GB − 100) × $0.09
5. **Public IPv4** = addresses × 730 × $0.005 × region (the address exists all month unless you release it)
6. **RDS** = selected monthly On-Demand × region
7. **Month** = those lines. **Year** = month × 12

Hours default to **730**. Region is a multiplier versus us-east-1 (Ireland about 1.12×, Singapore about 1.25×). Transfer stays on the US internet-out list because AWS transfer is zonal and we will not fake a single multiplier. The 100 GB free band is aggregated across EC2, S3, and the other services AWS lists on the On-Demand page.

gp3 list is the **$0.08 per GB-month** figure AWS uses in its [EBS pricing](https://aws.amazon.com/ebs/pricing/) worked example. Extra provisioned IOPS above the gp3 baseline is not in this model.

## Always-on vs "we will stop it at 6"

A box that runs 730 hours is a server. A box that runs 160 hours is a lab **if someone actually stops it**. The EC2 line moves. The EBS line does not. People "save money" by stopping instances and then wonder why 500 GB of gp3 is still on the bill. That is not a bug. The volume is still provisioned.

If the app is 8 to 6, model 200 hours and a stop/start runbook. If nobody will remember, leave 730. Reserved capacity you do not use is just a slower way to overpay.

## T3 is not a cheaper m5

t3 looks cheap until the CPU sits at 80% all day. Unlimited mode then bills CPU credits. This calculator does **not** add those credits. If the workload is a domain controller or a busy SQL box, pick m5 or r5. t3 is for bursty utilities.

Windows is not "Linux plus a little." On m5.large that is $0.096 versus $0.188 per hour with the $0.046 × 2 vCPU license. BYOL is not modeled. If you already own Windows with Software Assurance, price License Manager in the official calculator.

RDS here is **single-AZ On-Demand**. Multi-AZ is roughly another instance. Do not compare this line to a production failover pair.

## Worked example

**2 × m5.large Linux, 730 hours, us-east-1, 30 GB gp3 each, 200 GB S3, 250 GB transfer out, 1 public IPv4, no RDS, On-Demand**

- EC2 = 2 × 730 × $0.096 = **$140.16**
- EBS = 2 × 30 × $0.08 = **$4.80**
- S3 = 200 × $0.023 = **$4.60**
- Transfer = (250 − 100) × $0.09 = **$13.50**
- IPv4 = 1 × 730 × $0.005 = **$3.65**
- **Month ≈ $167** (the tool rounds to dollars)

That is a small always-on pair, not a company. Add Windows, 1 TB gp3, or Ireland and the same diagram is not $167. Change one input at a time. Compare with the [Azure cost calculator](/tools/azure-cost-calculator/) only after you match vCPU, RAM, and disk, not after you match marketing names.

Private subnets with a NAT gateway are the silent AWS tax. One NAT in us-east-1 is tens of dollars a month plus per-GB processing, none of which is in this estimate. If every instance needs outbound internet without a public IP, add NAT in the official calculator. Elastic IPs you forgot to release after a rebuild show up here as the public IPv4 line. Release them.

## What this is not

The 1-year option applies **~27% off EC2 compute only**. It is a teaching band for 1-year no-upfront reserved-class savings, not your private rate. Spot, Compute Savings Plans with a dollar commitment, and Standard Reserved Instances with an instance family lock are out.

Also out: NAT gateway, ALB/NLB, CloudWatch, GuardDuty, backup vaults, data transfer between AZs, and Microsoft 365 (different vendor). [AWS shared responsibility](https://aws.amazon.com/compliance/shared-responsibility-model/) is still the rule: AWS runs the building. You patch the guest OS, the security group, and the restore.

[Cloud services explained](/blog/cloud-services-explained/) is the vocabulary. [Cloud infrastructure for data compliance](/blog/cloud-infrastructure-data-compliance/) is where region choice becomes a legal map. The [VM calculator](/tools/vm-calculator/) answers "how many guests fit a host," which is a different question from "what does AWS charge for two m5.large."

This will not find a forgotten Elastic IP in another account. It will not model a partner margin. It will not replace [managed infrastructure](/services/infrastructure/) watching Cost Explorer.

Turn on a budget alarm and tags before the first production instance, not after month three. Rebuild the same SKUs at calculator.aws so EA or partner pricing can replace this list. Then decide who owns IAM, backup, and the invoice. If you want that ownership to sit with one local team, [contact Secure Techies](/contact/).
