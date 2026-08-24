---
date: 2026-08-15
title: "A Two-Week Business Firewall Cleanup"
meta_title: "Business Firewall Cleanup Case Study | Secure Techies"
description: "How Secure Techies cleaned a private-school firewall in two weeks: any-any leftovers, unused VPN, staff vs student paths, then a weekend test. Read the record."
image: "/images/case-studies/business-firewall-cleanup.webp"
categories: ["Cybersecurity"]
tags:
  - business firewall cleanup
  - firewall rule review
  - network security
  - next-generation firewall
  - education IT
  - VPN leftovers
draft: false
featured: false
industry: "Education"
project_type: "Firewall Cleanup"
location: "San Fernando Valley, CA"
timeline: "Two-week engagement"
client_size: "Independent school"
fact_industry: "Private school"
fact_location: "SF Valley"
fact_timeline: "2 weeks"
fact_project: "Firewall cleanup"
card_text: "The school had a next-generation firewall and an any-any leftover nobody could explain. We cleaned the rules on a weekend window."
kicker: "Network security"
short_name: "Firewall cleanup"
hero_subtitle: "New hardware does not retire old rules. We listed every allow, killed the leftovers, and tested staff and student paths before Monday."
hero_image: "images/case-studies/cs-fw-hero.webp"
hero_alt: "School administrator working alone in a late-day office"
client_heading: "A school whose firewall still trusted everything"
client_image: "images/case-studies/cs-fw-client.webp"
client_alt: "Two adults reviewing an out-of-focus network diagram"
mid_image: "images/case-studies/cs-fw-mid.webp"
mid_alt: "Next-generation firewall appliance in a small school rack"
band_image: "images/case-studies/cs-fw-band.webp"
band_alt: "School admin hallway with an open network closet"
band_quote: "The box was competent. The any-any leftover was the design."
body_image: "images/case-studies/cs-fw-body.webp"
body_alt: "Three adults in a school conference room after the firewall readout"
anonymized: "School name, staff names, and internal hostnames are withheld at the client's request. The engagement type, method, and constraints are real."
summary: "An independent San Fernando Valley school asked Secure Techies to clean a business firewall after an insurance questionnaire asked how the office network was separated from student devices. The hardware was current. The rule base was not. We inventoried allows, removed unused VPN profiles, split staff and student paths, and tested on a weekend before classes returned."

goals:
  - title: "Know every allow"
    icon: search
    text: "A next-generation box with unexplained any-any leftovers is still a flat trust model."
  - title: "Split staff and student"
    icon: network
    text: "Student devices needed the internet. They did not need the office file server or the copier."
  - title: "Change on a weekend"
    icon: clock
    text: "Monday morning classes were not a change window. We tested print and a staff sign-in before we left."

challenge_heading: "The hardware was new. The rules were folklore."
challenge_intro: "The school was not starting from zero. A next-generation firewall sat in the closet. What they lacked was a current, honest list of what that box still allowed."
challenge:
  - title: "Any-any leftovers from the last vendor"
    text: "Someone had opened a wide allow so a copier could scan. The copier moved. The rule stayed."
  - title: "Unused VPN profiles"
    text: "Remote teachers had a leftover SSL VPN from 2021. Nobody could name who still had the password."
  - title: "Student and staff shared a path"
    text: "The SSIDs had different names. The subnet did not. A student device could see office printers."
  - title: "The questionnaire had started asking"
    text: "Insurance wanted segmentation language. The head of school needed an honest answer, not a logo on the rack."

process_heading: "Export the rules, then change them on purpose"
process_intro: "We treated this as a cleanup, not a forklift. Scope was written down before any production rule moved."
process:
  - title: "Export and name every allow"
    description: "Rule dump, VPN profiles, DHCP, and who still had admin. Out of scope: replacing every access point if they could take a VLAN."
  - title: "Design staff vs student"
    description: "Office VLAN for staff and printers. Student path to the internet only. Guest if they still needed a parent waiting-room SSID."
  - title: "Change on a weekend window"
    description: "Kill unused VPN. Tighten allows. Keep the staff SSID name so Monday was not a Wi-Fi help desk."
  - title: "Test, then write"
    description: "Staff print. Student cannot reach the office subnet. Document who owns the firewall admin."

workstreams_heading: "Five checks, one weekend window"
workstreams_intro: "The firewall was the headline. The workstreams were how we knew Monday still printed."
workstreams:
  - title: "Rule inventory"
    icon: list
    description: "Every allow, every any-any leftover, every comment that said 'temp'."
  - title: "VPN leftovers"
    icon: identity
    description: "Unused profiles, shared passwords, who could still dial in."
  - title: "Staff vs student path"
    icon: network
    description: "VLAN or equivalent. Student to internet. Not to the office file share."
  - title: "Admin hygiene"
    icon: shield
    description: "Named firewall admin, MFA, no leftover vendor account."
  - title: "Weekend test"
    icon: check
    description: "Print, staff sign-in, student isolation, a rollback note if we broke SIS."

metrics:
  - value: "2 wks"
    label: "Cleanup window"
  - value: "Weekend"
    label: "Change, not Monday"
  - value: "0"
    label: "Planned class outages"
  - value: "Named"
    label: "Firewall admin"

results_heading: "The box finally matched the story"
results:
  - "Any-any leftover removed. Copier got a specific allow or it moved to staff VLAN"
  - "Unused VPN profiles retired. Remaining remote access named and MFA-gated"
  - "Student path could not reach the office subnet in the weekend test"
  - "Staff printing still worked before we left"
  - "Firewall admin named, leftover vendor account disabled"
  - "A one-page rule map the next engineer could read"
  - "Clear statement of what this was not: not a new wireless system, not a CIPA seal"

technologies:
  - "Next-generation firewall"
  - "VLAN segmentation"
  - "SSL VPN"
  - "WPA2/WPA3"
  - "MFA on admin"

related_services:
  - title: "Network security"
    url: "/services/network-security/"
    text: "Firewall, wireless, and the closet that never matches the last diagram."
  - title: "IT for education"
    url: "/industries/education/"
    text: "Staff, student, and guest paths that should not be the same subnet."
  - title: "Cybersecurity"
    url: "/services/cybersecurity/"
    text: "Identity and monitoring around the same site."

faqs:
  - question: "What is a business firewall cleanup?"
    answer: "A business firewall cleanup is a planned review of every allow, VPN profile, and admin account on the edge device, then a change window to remove leftovers. New hardware is not a cleanup. Secure Techies treats the rule dump and the weekend test as the deliverable."
  - question: "Do we have to replace the firewall?"
    answer: "Not if the current box can do VLANs, logging, and named admin. This school kept the hardware. We replaced the folklore in the rule base. A forklift is a different statement of work."
  - question: "Will this take classes down?"
    answer: "This job ran on a weekend window. Staff SSID names stayed. We tested print and a staff sign-in before we left. Monday was not the change window."
  - question: "Should student Wi-Fi see office printers?"
    answer: "No. Student devices belong on a path that can reach the internet and the instructional tools you intend. They should not scan the office subnet. A second SSID name is not that wall."
  - question: "What about unused VPN profiles?"
    answer: "If nobody can name who still has the password, the profile is an account you forgot to offboard. Disable it. Put remaining remote access on MFA. Do not keep a 2021 SSL VPN 'just in case.'"
  - question: "Are you saying the school is now CIPA compliant?"
    answer: "No. Content filtering and CIPA are a separate conversation with the school's own obligations. This project was the firewall rule base and staff vs student path. We did not issue a seal."

cta_heading: "Need a firewall whose rules you can actually explain?"
cta_text: "Secure Techies cleans business firewalls for Southern California offices and schools that have good hardware and leftover allows. Start with a conversation in Canoga Park."
---

The firewall was a current next-generation box. A student laptop on the guest-looking SSID could still see an office printer. The insurance form asked how the networks were separated. The honest answer was "by name."

That is the usual starting point for a **business firewall cleanup**. An independent [education](/industries/education/) school in the San Fernando Valley called Secure Techies after a questionnaire outran the last vendor's rack photo. They had hardware. They did not have a rule base anyone would sign.

This case study records the export, the leftover VPN, the weekend change, and the test before Monday. School identifiers stay out. The method does not.

## Why they called

A school is two businesses sharing a building: staff who hold student records, and student devices that should not. CIS puts the design work under [Network Infrastructure Management](https://www.cisecurity.org/controls/network-infrastructure-management): know the gear, configure it on purpose. A friendly SSID is a label. The subnet is the design.

NIST's [SP 800-41](https://csrc.nist.gov/pubs/sp/800/41/r1/final) is the old firewall paper and it is still right: default deny, named allows, logging. The school's box could do that. The rule dump showed it was not doing that.

Two facts set the calendar:

1. Monday classes were not a change window.
2. The insurance questions were not going to get easier.

We had no leftover diagram that matched the rack. We exported the rules. A screenshot of a blinking box is not a network design. The dump is.

The office manager already knew those student devices should not see those payroll files at all. The process did not. We wrote the non-goals down so nobody would later read a weekend VLAN as a CIPA project.

## What this engagement was, and was not

Secure Techies sells [network security](/services/network-security/) as design, firewall, and wireless you can test. We do not issue CIPA attestations. We do not replace the student information system.

We wrote that limit into the statement of work. The head of school wanted an honest paragraph for insurance and a Monday that still printed.

Out of scope on purpose:

- A CIPA or COPPA seal
- Replacing every access point if they could take a VLAN
- A full wireless forklift
- Pretending student filtering is the same job as office isolation

In scope:

- Rule export and named allows
- Unused VPN retirement
- Staff vs student path
- Named firewall admin
- A weekend test we would write down

CISA's [guidance on securing enterprise wireless](https://www.cisa.gov/news-events/news/securing-enterprise-wireless-networks) is written for offices. The idea still holds on a campus: visitor and student paths should not be the staff LAN.

## How we cleaned the business firewall

### Week 1: the rule dump

We exported every allow. Policy, objects, NAT, VPN, and who could still log into the box. We sat with the office manager and asked what each rule was for. "Temp" and "copier" showed up more than once. The copier had moved. The any-any had not.

We did not start with a Visio. The dump is the design until you prove otherwise. Interface labels on the firewall still said LAN. The switch behind it already had VLANs the prior vendor never mapped into policy. That is why two SSIDs still landed in one DHCP pool: wireless names were cosmetic.

Unused SSL VPN profiles still answered. A shared password from a prior vendor still worked. That is not remote access. That is an account you forgot to offboard.

Student and staff SSIDs had different names. DHCP was still one pool. A join test from a student-style laptop we brought reached an office printer. We did not use a student's device. We did not need to. Nobody argued with a screenshot from their own hallway.

Management of the box itself still answered on an address a student-style join could route toward. We moved admin to a staff-only address and killed HTTP on the WAN before the weekend change. A current appliance with a public admin page is still a leftover.

### Weekend: the change

The change window started after the last after-school program, not at 3 p.m. when teachers still needed the copier. We put a named rollback on paper before we hit commit: which policy to re-enable, who had the console cable, who called the SIS vendor if login failed.

We did not forklift the firewall. It could VLAN. We created a staff path and a student path. Student to internet, deny to the office subnet. Staff kept printers. NAT for student internet stayed on the student zone so a broken NAT did not take the office with it.

VPN leftovers died. Remaining remote access, if any, required MFA and a named person. The prior vendor account on the firewall was disabled the same window.

SSID names stayed. Changing the staff name on Sunday is how you spend Monday explaining Wi-Fi instead of teaching.

We tested in this order: SIS from a staff machine, print from the office, then a student-style join on the student SSID. DHCP on the student VLAN handed a different subnet. Ping to the office printer timed out. That screenshot went in the packet. Then we wrote the rollback: which rule to re-enable if SIS broke at 7 a.m. It did not.

### What the rule dump actually showed

**Any-any was the copier myth.** Scan-to-email had been "fixed" with a wide allow years earlier. The copier was on a new address. The allow still said any. That is how a student device sees a printer.

**VPN was a shared secret.** Two leftover profiles. One password. No MFA. A prior vendor account could still authenticate to the box. Offboarding the human had not offboarded the firewall.

**DHCP lied about isolation.** Two SSIDs, one pool. CISA's wireless note is about not putting organizational information on a visitor path. A school has the same geometry with student devices.

**Admin was a group hobby.** Three people had the firewall password. None had MFA. We left two named admins and MFA. CIS Control work on network devices is pointless if the admin password is the school mascot.

We pointed the office at [network vulnerability assessment](/blog/network-vulnerability-assessment/) for the scan-vs-judgment idea, and at the [small-business cybersecurity checklist](/blog/small-business-cybersecurity-checklist/) for the hygiene that should sit under any later tool purchase. CISA [Cybersecurity Performance Goals](https://www.cisa.gov/cybersecurity-performance-goals-cpgs) put known assets and controlled access next to each other for a reason.

## What the first deny rule broke

Honesty shows up in the first hour.

A classroom display that had been on the staff path for "convenience" lost the shared drive. It belonged on instructional VLAN or it needed a specific allow. We did not punch a hole back to the whole office so a TV could see files.

A teacher laptop that used student Wi-Fi because the password was on a board lost office printing. We moved it to staff and took the board down in the office. Student passwords still should not be a mural in the front office. That is a different sentence than CIPA.

The SIS still loaded. That was the leave-behind. We do not change a school firewall and walk out before the student system answers.

Bandwidth caps are not security. We set one on the student path anyway. One classroom of video should not stall office mail. Inbound from the internet to student IPs stayed off.

We did not put a captive portal on this campus. The school did not want an email harvest at the curb. Isolation plus a rotated staff passphrase was the control. A portal is a later conversation if they want logs of who joined.

Logging went on for a week after deny so we could see what we broke. We also watched deny logs for an hour after commit, not the next morning. A camera DVR on the staff switch that had been using student Wi-Fi because "the guest password is easier" showed up immediately. We moved it. We did not open the student VLAN to the DVR subnet to make the picture come back. Usually the surprise is a camera or a display. It is cheaper to find that on Sunday than in first period.

## What we told the insurer

The questionnaire wanted a paragraph. We gave facts:

- Staff and student traffic sit on different paths
- A deny stops student from the office subnet
- Unused VPN profiles are gone
- Firewall admin is named and MFA-gated
- We tested on a weekend before classes

We did not let anyone write "we are fully segmented and compliant" in that box. Isolation is a control. Compliance is an assessor's sentence.

[NIST CSF](https://www.nist.gov/cyberframework) is a vocabulary, not a license. We used Protect and Identify in plain English: what talks to what, who can change it.

The [FTC small-business cybersecurity](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity) pages say the same thing in owner language: lock down the network you actually run.

## What the packet contained

1. **Before/after rule notes.** What a student-style device could reach, what it could not after.
2. **One-page design.** VLANs or equivalent, who owns firewall admin, rotation for the staff passphrase.
3. **VPN list.** What died, what remains, MFA on the remainder.
4. **Monday runbook.** If SIS dies at 7 a.m., who to call, what not to "fix" by re-enabling any-any.

We pointed the school at [guest Wi-Fi security](/blog/guest-wifi-security-office/) for the same isolation idea in office language, and at [network security](/services/network-security/) for the parent service. For a dining-room version of the join test, see [guest Wi-Fi that stopped at the register](/case-studies/restaurant-guest-wifi-isolation/).

## What we verified before Monday

A VLAN with no second join test is still a story.

| Gate | What "done" meant here |
| --- | --- |
| Rule dump | Every allow named or marked leftover |
| Any-any | Removed or replaced with a specific copier/staff allow |
| VPN | Unused profiles gone. Remainder MFA-gated |
| Student path | Cannot reach office subnet from a test device |
| Staff path | Print and a staff sign-in still work |
| Admin | Named person, leftover vendor disabled |

What they had that they did not have on day one:

- A rule base the office manager could see
- Student devices off the office subnet
- Unused VPN gone
- A weekend test with a time and a name

What they still did not have, and should not claim:

- A CIPA letter
- A new wireless system
- A guarantee a student never shares a staff password

## Lessons we would repeat

**Export before you redesign.** The last vendor's story and the rule dump are often different people.

**Keep the staff SSID name.** Changing it on Sunday is a Monday outage with a security label.

**Do not park copiers on any-any.** You will either break scanning or break the design.

**Retire unused VPN.** It is leftover access, not a comfort blanket.

**Print before you leave.** A firewall that breaks SIS is not a successful security project.

**Write the deny where the next person can see it.** If the only proof is a vendor checkbox, the next manager will open any-any to fix a TV.

## Planning your own business firewall cleanup

If an insurer, an auditor, or your own gut is asking whether a student or visitor device can see an office printer, start with a join test and a rule export. Bring firewall admin and whoever owns the student information system. We will tell you what belongs in a two-week window and what belongs in a later wireless forklift.

Secure Techies works from Canoga Park with schools and offices across Los Angeles and Southern California. [Schedule a consultation](/contact/) if you want the same kind of weekend-tested cleanup this school left with.

For a different project record, see [Microsoft 365 MFA without locking out the board](/case-studies/microsoft-365-mfa-rollout/). Identity and the closet are separate jobs. Education context lives on our [education IT](/industries/education/) page.
