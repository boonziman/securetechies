---
date: 2026-08-06
title: "Co-Managed IT After the Internal Admin Left"
meta_title: "Co-Managed IT After an Admin Left | Secure Techies"
description: "How we stood up co-managed IT after a plant admin left: inventory, help desk, Microsoft 365, backups, and an honest IT/OT line. See the six-week method."
image: "/images/case-studies/co-managed-it-after-admin-left.webp"
categories: ["Managed IT"]
tags:
  - co-managed IT
  - manufacturing IT
  - help desk
  - IT admin left
  - Microsoft 365
  - IT/OT boundary
draft: false
featured: false
industry: "Manufacturing"
project_type: "Co-Managed IT"
location: "San Fernando Valley, CA"
timeline: "Six-week standup"
client_size: "Regional manufacturer"
fact_industry: "Manufacturing"
fact_location: "SF Valley"
fact_timeline: "6 weeks"
fact_project: "Co-managed IT"
card_text: "The only IT admin left. The plant kept a coordinator. We took help desk, Microsoft 365, and backups, and we did not touch the PLCs."
kicker: "Co-managed IT"
short_name: "Co-managed after admin left"
hero_subtitle: "A coordinator who knew the floor, and a help desk that could take a ticket. Documentation started the week the admin's account was revoked."
hero_image: "images/case-studies/cs-comanaged-hero.webp"
hero_alt: "Plant office seen through a window, with a shop floor beyond"
client_heading: "A plant that kept a coordinator and needed a help desk"
client_image: "images/case-studies/cs-comanaged-client.webp"
client_alt: "Plant coordinator and engineer talking at a metal table"
mid_image: "images/case-studies/cs-comanaged-mid.webp"
mid_alt: "Manufacturing office with a closed laptop and hard hats on a shelf"
band_image: "images/case-studies/cs-comanaged-band.webp"
band_alt: "Office network closet with switches, cables, and a floor UPS"
band_quote: "The floor had a controls vendor. The office had a dead admin account and a password notebook."
body_image: "images/case-studies/cs-comanaged-body.webp"
body_alt: "Three people in a plant conference room after the standup readout"
anonymized: "Company name, staff names, ERP brand, and plant address are withheld at the client's request. The engagement type, method, and constraints are real."
summary: "A San Fernando Valley manufacturer asked Secure Techies for co-managed IT after their only internal admin left with almost no documentation. They kept a plant coordinator. We took Microsoft 365, help desk, backups, and the office network. We wrote an IT/OT line in the statement of work: we do not reprogram PLCs. Six weeks later they had an inventory, a restore test, revoked leftover admin, and a ticket path that did not depend on one person's phone."

goals:
  - title: "Keep the coordinator"
    icon: talk
    text: "The plant did not want to fire institutional knowledge. Co-managed meant they kept a person. We filled the gaps."
  - title: "Take the tickets"
    icon: clock
    text: "ERP users, printers, and Microsoft 365 could not wait on a hiring search."
  - title: "Draw the OT line"
    icon: shield
    text: "Business IT is our work. Controls stay with the controls vendor unless a later SOW says otherwise."

challenge_heading: "One person had been the entire IT department"
challenge_intro: "The plant was not starting from zero. ERP ran. Mail ran. A controls vendor owned the floor. What died with the admin was documentation, after-hours coverage, and anyone who could revoke an account."
challenge:
  - title: "The admin left with the map"
    text: "Passwords lived in a notebook. The Microsoft 365 tenant had leftover Global Admin. Nobody could name the last restore."
  - title: "Hiring would take a quarter"
    text: "A replacement admin was a search, not a Tuesday. Production and shipping still needed a help desk this week."
  - title: "OT and IT had been one hallway"
    text: "Office Wi-Fi and a couple of OEM PCs sat closer to the floor than anyone wanted to admit. We were not going to 'fix' that by touching a PLC."
  - title: "Vendors still had leftover access"
    text: "The prior MSP, a copier cloud, and a freelancer still had logins. Offboarding the admin did not offboard them."

process_heading: "Revoke, inventory, then take tickets"
process_intro: "We treated this as a standup, not a full MSP replacement. The coordinator stayed. Scope was written down before we took a single ticket."
process:
  - title: "Revoke and freeze"
    description: "Block the departed admin, revoke sessions, rotate what the notebook held. CIS Access Control Management is not optional because the person was liked."
  - title: "Inventory what we will touch"
    description: "Microsoft 365, office network, backups, endpoints, vendors. Floor controls listed as out of scope with the vendor's name next to them."
  - title: "Stand up the help desk"
    description: "Ticket path, after-hours, who approves a change that could affect a shift. The coordinator is still the plant voice."
  - title: "Prove a restore and a diagram"
    description: "One mailbox and one file share restored to a test place. A closet diagram that matches the rack. A 30-day list of leftover vendor access."

workstreams_heading: "Six workstreams, one RACI"
workstreams_intro: "Co-managed fails when nobody knows who owns a ticket. We wrote a RACI on a page, not a 40-page governance binder."
workstreams:
  - title: "Identity and offboarding"
    icon: identity
    description: "Entra roles, leftover Global Admin, vendor guests, the notebook. Same-day revoke for the leaver."
  - title: "Microsoft 365"
    icon: cloud
    description: "Licenses, MFA, shared mailboxes, who is allowed to be admin."
  - title: "Help desk"
    icon: talk
    description: "ERP users, printers, shipping desk. Application bugs stay with the ERP vendor."
  - title: "Backups"
    icon: data
    description: "What is copied, who can delete it, a restore test on the calendar."
  - title: "Office network"
    icon: network
    description: "Firewall, Wi-Fi, the closet. Floor segmentation noted, not casually changed during a shift."
  - title: "IT/OT line"
    icon: policy
    description: "Written: we do not reprogram PLCs. OEM PCs on the LAN get listed and isolated if we cannot harden them."

metrics:
  - value: "6 wks"
    label: "Standup window"
  - value: "RACI"
    label: "Who owns a ticket"
  - value: "1 restore"
    label: "Tested, not assumed"
  - value: "No PLC"
    label: "OT left with vendor"

results_heading: "A help desk, a map, and a line they can point at"
results:
  - "Departed admin blocked, sessions revoked, notebook secrets rotated"
  - "A one-page RACI: coordinator, Secure Techies, ERP vendor, controls vendor"
  - "Help desk taking office and shipping tickets without calling a personal cell"
  - "A restore test of a mailbox and a file share to a test location"
  - "Leftover vendor and guest access listed, then cut"
  - "IT/OT line in the SOW: no PLC work unless a later document says so"
  - "Clear statement of what this was not: not a full outsourcing, not an OT project, not a certification"

technologies:
  - "Microsoft 365"
  - "Microsoft Entra ID"
  - "Help desk"
  - "Backup and restore"
  - "Firewall"
  - "MFA"

related_services:
  - title: "Managed help desk"
    url: "/services/managed-help-desk/"
    text: "The ticket path when the only admin is gone and the coordinator is on the floor."
  - title: "Manufacturing IT"
    url: "/industries/manufacturing/"
    text: "Business systems solid. Production network left alone unless there is a written plan."
  - title: "Backup and disaster recovery"
    url: "/services/backup-disaster-recovery/"
    text: "Copies and drills for the office side of the plant."

faqs:
  - question: "What is co-managed IT?"
    answer: "Co-managed IT means an MSP works next to someone you still employ. They keep institutional knowledge. We take the tickets, the tenant, the backups, and the after-hours path you write down. It is not a full outsourcing and it is not a staff-aug body shop with no SOW."
  - question: "Will you replace our remaining IT person?"
    answer: "Not in this model. This plant kept a coordinator on purpose. We filled help desk, Microsoft 365, and backups. If you later want a fully managed model, that is a different statement of work. See switching IT providers if the old vendor is the problem."
  - question: "Do you run the plant-floor controls?"
    answer: "No, unless a later SOW says otherwise. Secure Techies does not casually reprogram PLCs. We isolate, document, and coordinate with your controls vendor. That limit is how we stay honest on manufacturing pages."
  - question: "How fast can you stand up after an admin leaves?"
    answer: "This standup ran six weeks from revoke to a restore test and a RACI the plant would sign. Week one is revoke and inventory. Tickets can start before the diagram is pretty. A same-day miracle is a myth."
  - question: "What do you need from us on day one?"
    answer: "Tenant admin, the closet, whoever has the password notebook, the controls vendor's name, and the coordinator who will stay. If you cannot revoke the leaver, start there. Everything else waits on that."
  - question: "Is this the same as switching MSPs?"
    answer: "No. Switching providers is a parallel handoff when you are leaving a vendor. Co-managed after an admin leaves is how you keep a person and add a desk. Different calendar, different RACI. We have a case study for each."

cta_heading: "Need a help desk the week after someone leaves?"
cta_text: "Secure Techies stands up co-managed IT for Southern California plants and offices that still have a coordinator and no longer have an admin. Start with a conversation in Canoga Park."
---

The only IT admin gave notice. The password notebook was real. The plant coordinator knew the floor and did not want to become the help desk.

That is the usual starting point for [co-managed IT](/blog/co-managed-it-services/). A San Fernando Valley [manufacturer](/industries/manufacturing/) called Secure Techies because hiring a replacement would take a quarter and shipping still needed printers on Tuesday. They were not asking us to own the plant. They were asking us to take the tickets, the tenant, and the backups, and to stay off the PLCs.

This case study records the revoke, the inventory, the RACI, and the line we wrote about OT. Client identifiers stay out. The method does not.

## Why they called

A small manufacturer is an office and a floor that share a building and should not share a network. ERP users, a shipping desk, and Microsoft 365 live on one side. Controls live on the other, with a vendor who already had a name.

The admin had been the bridge. When that person left, the bridge was a notebook and a cell number nobody was allowed to call after Friday.

CIS treats account revocation as [Access Control Management](https://www.cisecurity.org/controls/access-control-management). NIST [SP 800-53](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final) says the same thing as AC-2. A friendly goodbye is not a control. Microsoft documents the order in [Revoke user access](https://learn.microsoft.com/en-us/entra/identity/users/users-revoke-access): disable, revoke sessions, deal with devices.

Two facts set the date:

1. The last day was already on the calendar.
2. Production change windows are not "whenever IT feels like it."

We had no leftover diagrams. We treated the notebook as hostile until every secret in it was rotated.

## What this engagement was, and was not

Secure Techies sells [managed help desk](/services/managed-help-desk/) and Microsoft 365 as operations. Co-managed means we sit next to someone you still employ. Fully managed means we are the department. This plant chose the first.

We wrote that in the statement of work. We also wrote the OT line the [manufacturing](/industries/manufacturing/) page already uses: we do not casually reprogram PLCs. We isolate, document, and coordinate with the controls vendor.

Out of scope on purpose:

- Replacing the coordinator
- Owning the controls network
- A full MSP bake-off against a vendor they did not have
- A certification or a NIST seal

In scope:

- Revoke of the leaver
- Inventory of business systems
- Help desk for office and shipping
- Microsoft 365 admin
- Backup restore test
- Office network diagram
- A one-page RACI
- A written IT/OT boundary

CISA's [small and medium business](https://www.cisa.gov/audiences/small-and-medium-businesses) pages and the [FTC cybersecurity](https://www.ftc.gov/business-guidance/small-businesses/cybersecurity) guidance do not care that you used to have an admin. Headcount of IT staff is not a control.

## How we stood it up in six weeks

### Week 1: revoke and the notebook

Same-day work followed the [employee offboarding](/blog/employee-offboarding-it-checklist/) list: block sign-in, revoke sessions, reset, dump inbox rules, pull groups. Then the notebook. Every shared password, registrar login, and vendor portal in that book was rotated or killed.

We did not convert the mailbox on day one. Counsel had not been asked. The coordinator got access. License reclaim waited.

Leftover Global Admin was the ugly find. Two accounts. One was the leaver. One was a personal Microsoft account that had been "temporary" in 2022. Both lost the role.

### Weeks 2 and 3: inventory and the line

We listed what we would touch: Microsoft 365, office firewall, backups, endpoints, the copier cloud, the prior MSP leftover, the freelancer who still had a guest.

We listed what we would not touch: PLCs, the controls VLAN if we could identify it, OEM PCs that belonged to a machine vendor. Those got a name and a "do not patch during a shift" note. Isolation, if needed, waited on a production window and the controls vendor.

[NIST CSF 2.0](https://www.nist.gov/cyberframework) is a vocabulary, not a license. We used Identify and Protect in plain English: what we have, who can change it, what we will not change without a written plan.

The coordinator stayed the plant voice. Tickets that sounded like "the line is down" did not become our Windows patches. They became a call to the controls vendor and a note in the ticket so nobody "helpfully" rebooted a cell.

### Weeks 4 to 6: tickets, restore, RACI

Help desk opened for ERP users, printers, and mail. Application bugs stayed with the ERP vendor. We said that twice, because plants will ask the new IT company to fix a bill-of-materials screen.

We restored one shared mailbox and one file share to a test location. The method matches the [backup restore test](/case-studies/backup-restore-test-tax-season/) write-up: test place, clock, who approved. Green jobs were not the proof.

The RACI fit on a page:

| Work | Coordinator | Secure Techies | Other vendor |
| --- | --- | --- | --- |
| Floor / PLC | Escalate | Out of scope | Controls vendor |
| ERP application | User voice | Environment only | ERP vendor |
| Microsoft 365 | Approves guests | Admin | |
| Help desk | Plant context | Owns the ticket | |
| Backups | Knows the RPO | Jobs and drills | |
| Change during a shift | Must approve | Will not proceed alone | |

That page is the product. A 40-page governance PDF is how co-managed dies.

## What we found when the notebook opened

**The tenant had two Global Admins too many.** One was the leaver. One was a leftover personal account. Microsoft 365 does not need a committee of owners. It needs two people who are not the same as daily email.

**Vendors outlived the admin.** Copier cloud, old MSP, a freelancer guest. Offboarding one human does not offboard the grants. We used the same habit as [vendor risk](/blog/vendor-risk-management-small-business/): list who can see the tenant, then cut.

**Backup existed.** Proof did not. Jobs were green. The last restore was a story. We ran one.

**The closet and the floor were friendlier than anyone wanted.** A couple of OEM PCs sat on office DHCP. We did not yank them during a shift. We labeled them and put isolation on the 30-day list with the controls vendor in the room.

**After-hours was a cell phone.** That is not a help desk. It is a favor. We put hours and escalation in writing.

None of this required a plant-floor specialist. It required a standup that did not pretend we were one.

## What the first week of tickets looked like

The first tickets were boring, which is the point of a help desk.

A shipping label printer. An ERP user locked out after MFA. A shared mailbox that had been the admin's unofficial intake. We closed those. We did not "while we are here" reboot a cell PC.

One ticket sounded like a line-down. It was a scanner on office Wi-Fi that had wandered. We put the scanner back on the office SSID and wrote a note: scanners are business IT, the cell PC next to them is not. That sentence is how you keep co-managed from becoming accidental OT.

Change windows were written next to the production calendar. Patch Tuesday for office PCs is not patch Tuesday for anything that could stop a shift. If a change might, the coordinator had to say yes. If they said no, we waited. Heroic after-hours work that stops a Monday line is not a favor.

Microsoft 365 licenses were a mess of departed seasonal staff. We cleaned what we could prove. We did not delete mailboxes to "save money" on day four. That lesson is in the offboarding study for a reason.

## What the packet contained

1. **Revoke record.** What we disabled, what we rotated, what we left on hold.
2. **Inventory.** Business systems we own, OT we do not, vendors in the middle.
3. **RACI.** One page. Names, not departments.
4. **Restore notes.** What came back, how long, who watched.
5. **30-day list.** OEM PCs, leftover guests, a firewall rule that still said any-any.

We pointed leadership at [how to switch IT providers](/blog/how-to-switch-it-providers/) only to say this was not that project. They were not leaving a vendor. They were adding a desk. The [switching providers](/case-studies/switching-it-providers/) study is the other shape.

## Lessons we would repeat

**Write the OT line on day one.** If you do not, someone will ask you to reboot a cell at 2 p.m.

**Keep the coordinator if they are good.** Co-managed is not a polite word for replacement.

**Revoke before you take tickets.** A live leaver account is an incident, not a transition.

**RACI on one page.** If it needs a binder, nobody will use it on a night shift.

**Do not patch the floor to look busy.** Isolation and a production window beat a heroic reboot.

**Name the ERP vendor in the RACI.** Plants will ask the new IT company to fix a bill-of-materials screen. If the RACI does not say "environment only," you will own a product you do not support.

**Rotate the notebook the first day.** A shared password that outlives the admin is how the next incident starts, not how the last chapter of the story ends.

## Planning your own standup

If your only admin is leaving and you still have someone who knows the business, start with revoke and a RACI, not with a hiring panic. Bring the tenant, the notebook, the controls vendor's name, and the coordinator who will stay. We will tell you what belongs in six weeks and what belongs in a later OT conversation.

Secure Techies works from Canoga Park with plants and offices across Los Angeles and Southern California. [Schedule a consultation](/contact/) if you want the same kind of co-managed standup this plant left with.

For a different project record, see [a mobile surveillance trailer on a warehouse yard](/case-studies/warehouse-mobile-surveillance-trailer/).
