---
title: "Surveillance Storage Calculator"
meta_title: "CCTV Storage Calculator — Free NVR Capacity Tool | Secure Techies"
description: "Free CCTV storage calculator for NVR planning. Estimate capacity from cameras, resolution, FPS, H.264/H.265, quality, scene activity, motion, RAID, and retention."
tool_id: "surveillance"
tool_icon: "camera"
tool_badge: "CCTV"
tool_summary: "Estimate NVR and archive storage from cameras, resolution, retention, and codec."
tool_cta: "Deploying cameras or mobile surveillance trailers?"
related_services:
  - label: "Mobile CCTV Trailers"
    url: "/services/mobile-cctv-trailers/"
  - label: "Backup & Disaster Recovery"
    url: "/services/backup-disaster-recovery/"
faq:
  - question: "How do you calculate CCTV storage?"
    answer: "Storage is estimated from bitrate (or resolution and FPS), number of cameras, hours recorded per day, retention days, and whether recording is continuous or motion-based. Higher resolution and frame rates need more disk space."
  - question: "Does H.265 really save space?"
    answer: "H.265 (HEVC) typically uses about 40–50% less bitrate than H.264 at a similar visual quality, which can nearly cut storage needs. Exact savings depend on scene complexity and camera implementation."
  - question: "How many days of retention should I keep?"
    answer: "Many businesses keep 14–30 days for general sites. Construction, parking, and higher-risk sites often keep 30–90 days. Compliance or insurance requirements can require longer retention."
  - question: "Should I plan continuous or motion recording?"
    answer: "Continuous recording is simpler and stronger for investigations. Motion-only recording saves storage but can miss events if sensitivity is wrong. Many sites use continuous for critical cameras and motion for low-traffic areas."
  - question: "Does this include RAID overhead?"
    answer: "This calculator estimates camera recording volume. If the NVR or server uses RAID, usable disk space will be lower than raw drive capacity. Use our RAID calculator for array overhead."
weight: 2
draft: false
---

## Free CCTV / NVR storage calculator

Use this **surveillance storage calculator** (also searched as a CCTV storage calculator or NVR hard drive calculator) to estimate how much disk space a camera system needs. Configure cameras, retention days, hours per day, motion percentage, codec (H.264, H.265, H.265+, MJPEG), resolution, FPS, quality, scene activity, audio, safety buffer, and optional NVR RAID. Results include recording volume, buffered usable capacity, throughput, raw capacity for RAID, drive planning hints, and reverse day-count if you already know installed TB.

## Core storage formula

For each camera:

**Bytes ≈ bitrate (bits/sec) × recording seconds × retention days × motion fraction**

With bitrate in Mbps:

**GB ≈ Mbps × 1,000,000 / 8 × hours × 3600 × days × cameras × (motion%/100) / 1e9**

Add buffer (often 20–30%) for growth, filesystem overhead, and bitrate spikes. If the NVR uses RAID, usable space is lower than raw drives — this tool applies a first-pass RAID factor and links to the [RAID calculator](/tools/raid-calculator/) for precise array math.

## What changes storage the most

| Factor | Effect |
| --- | --- |
| Resolution | 4K can need several times 1080p |
| FPS | 30 fps uses more than 10–15 fps |
| Codec | H.265 often ~40–55% of H.264; MJPEG is much larger |
| Scene activity | Busy lots and noisy night IR inflate bitrate |
| Motion % | 30% motion can cut continuous storage dramatically |
| Retention | 90 days is 3× a 30-day design |

## Practical design tips

1. Prefer **H.265** when the camera and VMS/NVR support it reliably.  
2. Keep **continuous** recording on entrances, POS, and high-risk zones.  
3. Use motion on low-traffic areas after tuning sensitivity.  
4. Plan **enterprise/surveillance-rated drives**, not desktop disks.  
5. Document retention for insurance and investigations.  
6. Back up critical configurations and consider offsite clip export workflows.

## Mobile and temporary sites

Construction, events, and remote lots often rely on [mobile CCTV trailers](/services/mobile-cctv-trailers/) with finite onboard storage and cellular uplink. Correct retention planning prevents full disks mid-project.

## Worked example

**16 cameras, 1080p, 15 fps, H.265, medium quality/scene, continuous, 30 days, 25% buffer**

Bitrate is estimated per camera, scaled for codec and scene, then multiplied by time and camera count. Expect on the order of multiple terabytes usable — confirm with live bitrate from a sample camera when possible.

## Next steps

After you estimate capacity, design NVR/server hardware, RAID, health monitoring, and recovery. Secure Techies helps with storage design, [backup and disaster recovery](/services/backup-disaster-recovery/), and camera deployments. [Contact us](/contact/) for a site review.
