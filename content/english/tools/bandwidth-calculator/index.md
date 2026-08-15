---
date: 2026-08-15
title: "Office Bandwidth Calculator"
meta_title: "Office Bandwidth Calculator (Free) | Secure Techies"
description: "Free office bandwidth calculator. Size download and upload for Teams, Zoom, VoIP, cloud apps, cameras, and backup. Browser-only. No signup required."
tool_id: "bandwidth"
tool_icon: "gauge"
tool_badge: "Network"
tool_summary: "Size download and upload for video calls, VoIP, Microsoft 365, cameras, and backup."
tool_cta: "Need the circuit, firewall, and Wi-Fi designed together?"
related_services:
  - label: "Network Security"
    url: "/services/network-security/"
  - label: "Managed Infrastructure"
    url: "/services/infrastructure/"
howto_steps:
  - name: "Enter people on site at the busy hour"
    text: "Use the peak, not the headcount on the lease. Hybrid days still spike at 10 a.m."
  - name: "Set how many are on video and at what quality"
    text: "Planning rates are higher than the smallest number on a Zoom or Teams slide."
  - name: "Add voice, cloud load, cameras, and backup"
    text: "Upload is the number that kills hybrid offices. Watch it separately from download."
  - name: "Read download, upload, and the next common circuit"
    text: "Buy a circuit you can live on at peak, then put QoS on voice and video."
faq:
  - question: "How do I calculate office internet bandwidth?"
    answer: "Estimate concurrent video streams, voice calls, cloud and web use, plus cameras and backup, then add headroom. Size download and upload separately. Peak hour, not the daily average, is the number that matters."
  - question: "How much bandwidth does Microsoft Teams or Zoom need?"
    answer: "Plan about 1.2 to 1.5 Mbps each way for 720p and about 2 to 2.5 Mbps each way for 1080p per concurrent participant. Audio-only is roughly 0.1 Mbps. Official vendor tables list lower floors. Those floors are not a circuit design."
  - question: "Why is upload as important as download?"
    answer: "Video calls, cloud backup, camera streams, and large SharePoint saves all consume upload. Many business circuits are still asymmetric. A 500/35 line can look fast in a speed test and still choke a 15-person all-hands."
  - question: "How much headroom should I add?"
    answer: "Thirty percent is a reasonable start. Busy tax, legal, and launch weeks need more. Headroom is not waste. It is the difference between a usable Monday and a war-room Slack thread."
  - question: "Does this replace a site survey?"
    answer: "No. Wi-Fi design, firewall inspection, provider SLA, and QoS still decide whether the circuit you bought is usable. This page sizes the pipe. It does not design the LAN."
weight: 10
draft: false
---

## Free office bandwidth calculator

**Here is the short version:** size the busy hour, not the brochure. Add concurrent video, voice, cloud work, cameras, and backup, then add headroom. This **office bandwidth calculator** estimates download and upload separately and names the next common business circuit.

It is a planning model. Microsoft and Zoom publish per-stream floors. Those floors assume a clean path. Inspection firewalls, guest Wi-Fi, and a backup job at 9:05 a.m. are not in the brochure.

## How the bandwidth estimate is built

1. Video load = people on site × (percent on video) × Mbps per stream
2. Voice load = extra concurrent voice-only calls × 0.1 Mbps
3. Cloud / web load = people on site × a light, typical, or heavy Mbps each
4. Extras = cameras × Mbps per camera, plus a backup or sync stream
5. Apply headroom to download and upload

Video quality presets:

| Quality | Planning Mbps each way |
| --- | --- |
| Audio / VoIP | 0.1 |
| HD 720p | 1.5 |
| HD 1080p | 2.5 |

Those sit above the lowest rows in Microsoft's [Prepare your network for Teams](https://learn.microsoft.com/en-us/microsoftteams/prepare-network) and Zoom's [bandwidth requirements](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0060748). The extra is intentional. A circuit sized to the absolute floor fails the first week everyone joins with video on.

Vonage and other voice vendors still quote on the order of 80–100 kbps per G.711 call. This tool uses 0.1 Mbps so you do not undercount packet overhead. See [VoIP bandwidth guidance](https://www.vonage.com/resources/articles/voip-bandwidth/) if you want the codec-level table.

## Download vs upload

Speed-test ads sell download. Hybrid offices die on upload.

A 15-person all-hands at 720p is about 22 Mbps **each way** before cloud, guest, or backup. A 300/20 cable product cannot carry that meeting. Fiber or a business circuit with real upload is the fix, not a new laptop.

Cameras that record to the cloud or a central NVR eat upload all day. Size them with the [surveillance storage calculator](/tools/surveillance-storage-calculator/) for disk and this page for the WAN.

## Worked example

**25 people on site, 35% on 720p video, 5 extra voice calls, typical cloud, 10 Mbps backup, 30% headroom, no cameras**

- Video streams: about 9 × 1.5 = 13.5 Mbps each way
- Voice: 0.5 Mbps
- Cloud: 25 × 1.5 = 37.5 Mbps down, and about 35% of that on upload
- Backup: 10 Mbps upload
- Raw download ≈ 51 Mbps, upload ≈ 37 Mbps
- With 30% headroom: about **66 down / 48 up**
- Next common circuit: **100/100**, not 300/20

If that office also sends eight cameras offsite at 2 Mbps, add 16 Mbps of upload before headroom. The circuit conversation changes immediately.

## Mistakes that waste a provider meeting

- Sizing from a home speed test at 7 p.m.
- Ignoring guest Wi-Fi on pitch days
- Running cloud backup at 9 a.m. against the all-hands
- Buying 1 Gbps download with 35 Mbps upload
- Skipping QoS so a OneDrive sync starves Teams
- Forgetting the firewall inspects TLS and adds latency

CISA's [Secure Your Business](https://www.cisa.gov/secure-our-world/secure-your-business) guidance is about more than malware. An office that cannot take a client call is already having an incident.

A second circuit for failover is not the same as more speed. If the primary dies, the backup should carry voice and a thin set of apps, not the full 1080p all-hands. Size failover to the minimum you can run the firm on. Put that number in a runbook.

## What this calculator is not

It does not measure your current line. It does not replace a Wi-Fi survey. It does not pick a carrier. It will not warn you that the conference room AP is a consumer mesh node. Use it to get the order of magnitude right, then design [network security](/services/network-security/) and [infrastructure](/services/infrastructure/) around a circuit you can actually use.

QoS still matters. Mark voice and video. Cap guest and backup during meetings if you must. A correctly sized pipe with no policy will still feel random.

## Guest, inspection, and the 9 a.m. pile-up

Guest Wi-Fi on a pitch day is not free. Twenty visitors joining a webinar look like twenty more video streams. Either give guests a capped SSID or add them as extra people in this calculator for that week.

TLS inspection on the firewall adds latency and can stall video if the box is undersized. A 1 Gbps circuit behind a tired appliance still feels like 2014. Size the firewall for inspected throughput, not the sticker WAN speed.

Cloud backup should miss the all-hands. Schedule it at night or cap it during meeting hours. This tool lets you type the backup Mbps so you see the collision before users feel it.

Wi-Fi is a separate design. A correct circuit and a single consumer mesh node in a 6,000 square foot suite will still drop calls. Survey the floor. Put an AP in the conference room.

## Southern California offices

Warner Center suites, Brand Boulevard floors, and Irvine campus tenants often share a building riser. The circuit you buy is not always the circuit you get at 10 a.m. Ask the landlord who else sits on the same handoff. Then size for your peak, not their brochure.

Test the real path after you buy. A speed test to a nearby server is not a Teams call to a client in New York. Have three people join a 720p meeting while someone uploads a 200 MB file. If the call breaks, you undersized upload or skipped QoS. Fix that before the partner meeting. Write the result in the ticket so the next circuit renewal is not a guess. Keep the last speed-test PDF too, but treat the meeting test as the one that counts.

If you want the circuit, firewall, and Wi-Fi treated as one design, [contact Secure Techies](/contact/).
