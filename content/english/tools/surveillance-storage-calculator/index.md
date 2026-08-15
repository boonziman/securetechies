---
title: "Surveillance Storage Calculator"
meta_title: "CCTV Storage Calculator: Free NVR Capacity Tool | Secure Techies"
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
howto_steps:
  - name: "Set cameras, retention, and hours"
    text: "Retention days and motion percent move the number more than most people expect."
  - name: "Choose estimate or paste a real bitrate"
    text: "A live sample from one camera beats any table. H.265 usually cuts H.264 roughly in half."
  - name: "Add buffer and optional RAID"
    text: "The RAID factor is a first pass. Use the RAID calculator for exact array math."
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

**Here is the short version:** storage is bitrate × time × cameras × motion fraction, then a buffer. This **surveillance storage calculator** (CCTV / NVR hard drive calculator) estimates disk from cameras, retention, codec, resolution, and FPS.

Camera vendors use the same method. [AXIS Site Designer](https://www.axis.com/support/tools/axis-site-designer) is the manufacturer-grade version. Always confirm with a live sample from one camera on the real scene. Axis [Zipstream](https://www.axis.com/solutions/zipstream) and H.265 cut bitrate. They do not change the formula.

## Core storage formula

For each camera:

**Bytes ≈ bitrate (bits/sec) × recording seconds × retention days × motion fraction**

With bitrate in Mbps:

**GB ≈ Mbps × 1,000,000 / 8 × hours × 3600 × days × cameras × (motion%/100) / 1e9**

Add a buffer (often 20–30%) for growth, filesystem overhead, and bitrate spikes. If the NVR uses RAID, usable space is lower than raw drives. This tool applies a first-pass RAID factor. Use the [RAID calculator](/tools/raid-calculator/) when you need exact array math.

## What changes storage the most

| Factor | Effect |
| --- | --- |
| Resolution | 4K can need several times 1080p |
| FPS | 30 fps uses more than 10–15 fps |
| Codec | H.265 is often about 40–55% of H.264. MJPEG is much larger |
| Scene activity | Busy lots and noisy night IR inflate bitrate |
| Motion % | 30% motion can cut continuous storage dramatically |
| Retention | 90 days is 3× a 30-day design |

A parking lot at night with IR noise can out-store a quiet hallway at the same resolution. That is why a datasheet bitrate is a start, not a purchase order.

## Continuous vs motion recording

Continuous recording is simpler for investigations. You do not argue with a motion mask after a theft. It costs disk.

Motion-only recording saves space. It also misses events when sensitivity is wrong, when foliage moves, or when someone walks at the edge of the frame. Many sites use continuous on doors, POS, and cash offices, and motion on low-traffic perimeters after a week of tuning.

If insurance or counsel will ask for a clip, write the retention rule down. "We thought 14 days was enough" is a weak answer after a weekend incident.

## Practical design tips

1. Prefer H.265 when the camera and VMS or NVR support it reliably.
2. Keep continuous recording on entrances, POS, and high-risk zones.
3. Use motion on low-traffic areas after you watch false triggers.
4. Buy surveillance-rated drives, not desktop disks. Desktop drives are not designed for 24/7 write streams.
5. Document retention for insurance and investigations.
6. Back up NVR configuration. A rebuilt recorder with no camera passwords is a second outage.
7. Plan export workflows. Investigators will ask for a clip, not a tour of the GUI.

## Mobile and temporary sites

Construction, events, and remote lots often rely on [mobile CCTV trailers](/services/mobile-cctv-trailers/) with finite onboard storage and a cellular uplink. Correct retention planning prevents a full disk mid-project. Cellular also has a monthly cap. High bitrate plus 4K plus 30 fps will burn that cap before it fills the disk.

For trailer jobs, prefer 1080p or 2K, 10–15 fps, H.265, and a retention number the SIM plan can support. Use this calculator for disk. Ask the carrier about the uplink separately.

## Worked example

**16 cameras, 1080p, 15 fps, H.265, medium quality and scene, continuous, 30 days, 25% buffer**

The tool estimates bitrate per camera, then multiplies by time and count. Expect multiple terabytes usable. Confirm with live bitrate from a sample camera when possible. If those 16 cameras sit on RAID 6, buy more raw disk than the usable number. That is the RAID factor talking.

A second pass: set motion to 40% on the same design if most cameras watch a quiet warehouse aisle. The drop in TB is often larger than switching codecs.

## What this calculator is not

It does not size the switch, the PoE budget, or the cellular plan. It does not replace a site walk. It will not warn you that a camera is pointed at a waving flag. Use it to get the disk number into the right order of magnitude, then validate.

## 4K is not always the right default

Marketing loves 4K. Investigations love a face they can identify. Those are not the same purchase. A well-placed 1080p camera at 15 fps with a sane lens often beats a 4K stream of a parking lot at 30 fps that fills the NVR in a week. Run both settings in this calculator before you standardize a site on 4K.

## Audio, hours per day, and cameras that lie about bitrate

Audio is cheap next to 4K video (this tool adds about 64 kbps). It still matters for investigations. If you need speech at a reception desk, turn it on for those cameras only.

Hours per day is not always 24. A shop that records 12 hours saves about half the disk if the cameras truly sleep. Confirm they sleep. Many "after hours" streams still write because motion is never zero.

If a vendor quotes one bitrate for a quiet showroom and you install in a warehouse, believe the warehouse. Re-run this calculator with a high scene setting or a manual Mbps from a live camera.

## Drives, RAID, and the NVR that dies on day 400

Surveillance writes all day. Desktop hard drives fail early in that job. Buy drives the vendor rates for 24/7 video. Plan at least one spare slot. When a disk fails, you want a rebuild, not a parts hunt during an investigation.

RAID on the NVR is still not a backup of the footage you must keep. If a clip has legal value, export it off the box. A stolen recorder or a ransomware hit on the same LAN as the NVR will not care that you used RAID 5.

Health monitoring matters. A failed disk that nobody sees is a RAID 0 in slow motion. Send alerts to a mailbox that humans read, or to [managed help desk](/services/managed-help-desk/).

After you estimate capacity, design NVR or server hardware, RAID, health monitoring, and recovery. Secure Techies helps with storage design, [backup and disaster recovery](/services/backup-disaster-recovery/), and camera deployments. [Contact us](/contact/) for a site review.
