---
title: "Subnet Calculator"
meta_title: "Subnet Calculator: Free IPv4 CIDR & VLSM Tool | Secure Techies"
description: "Free subnet calculator for IPv4 CIDR planning. Get network address, broadcast, usable host range, wildcard mask, binary mask, and VLSM-style subnet splits."
tool_id: "subnet"
tool_icon: "network"
tool_badge: "Networking"
tool_summary: "IPv4 CIDR calculator with usable ranges, wildcard masks, and VLSM split planning."
tool_cta: "Need network design or firewall segmentation help?"
related_services:
  - label: "Network Security"
    url: "/services/network-security/"
  - label: "Managed Infrastructure"
    url: "/services/infrastructure/"
howto_steps:
  - name: "Enter an IPv4 address and prefix"
    text: "Example: 192.168.10.0 and /24. Use the chips for common prefixes."
  - name: "Read network, mask, usable range, and wildcard"
    text: "/31 and /32 follow modern point-to-point and host-route rules, not the old minus-two formula."
  - name: "Optionally plan a VLSM split"
    text: "Hosts needed or subnet count produces a first-pass child prefix. Confirm in IPAM."
faq:
  - question: "What is a subnet calculator?"
    answer: "A subnet calculator converts an IP address and CIDR prefix (or mask) into network details: network address, broadcast address, usable host range, subnet mask, wildcard mask, and host counts."
  - question: "What is CIDR notation?"
    answer: "CIDR writes a network as address/prefix, for example 192.168.10.0/24. The prefix is the number of network bits (0–32 for IPv4). Larger prefixes mean smaller subnets."
  - question: "How many usable hosts are in a /24?"
    answer: "A /24 has 256 total addresses and typically 254 usable hosts (network and broadcast reserved). /31 and /32 are special cases used for point-to-point links and single hosts."
  - question: "What is a wildcard mask?"
    answer: "A wildcard mask is the inverse of the subnet mask, commonly used in Cisco ACL and OSPF configurations. For 255.255.255.0 the wildcard is 0.0.0.255."
  - question: "Can this tool do VLSM planning?"
    answer: "Yes. Enter hosts needed or subnets needed to see a recommended prefix and a sample split table. For complex multi-site designs, validate against your IPAM standards."
weight: 4
draft: false
---

## Free IPv4 subnet calculator (CIDR)

**Here is the short version:** a prefix of n bits is the network. The rest are hosts. This **subnet calculator** turns an IPv4 address and CIDR prefix into network, broadcast, mask, wildcard, usable range, and host count, plus an optional VLSM split.

CIDR is defined in [RFC 4632](https://www.rfc-editor.org/rfc/rfc4632). Private ranges still follow [RFC 1918](https://www.rfc-editor.org/rfc/rfc1918): 10/8, 172.16/12, 192.168/16. If two offices both use 192.168.1.0/24, the VPN will hurt later.

## How CIDR subnet math works

IPv4 addresses are 32-bit numbers. A prefix length of **n** means the first **n** bits identify the network and the remaining **32 − n** bits identify hosts.

| Prefix | Typical use | Usable hosts (classic) |
| --- | --- | --- |
| /30 | Point-to-point (legacy) | 2 |
| /29 | Tiny segment | 6 |
| /28 | Small office VLAN | 14 |
| /27 | Small department | 30 |
| /26 | Medium LAN | 62 |
| /24 | Common LAN default | 254 |
| /16 | Large private block | 65,534 |

Modern point-to-point links often use **/31** ([RFC 3021](https://www.rfc-editor.org/rfc/rfc3021)) with both addresses usable and no classic broadcast. Host routes use **/32**. This tool follows those special cases instead of blindly subtracting two.

## Formulas this tool uses

1. **Subnet mask** from prefix: binary ones for network bits, zeros for host bits
2. **Network address** = IP AND mask
3. **Broadcast** = network OR wildcard
4. **Usable range** = network+1 through broadcast−1 (except /31 and /32)
5. **Usable hosts** = 2^(32−prefix) − 2 when prefix ≤ 30

Those are the same fundamentals taught in CCNA-style networking and used by ipcalc-style tools. The wildcard mask is the inverse of the subnet mask. Cisco ACLs and OSPF still ask for it.

## VLSM and real network design

Variable Length Subnet Masking lets you carve a parent block into unequal children so a 12-host printer VLAN does not waste a full /24. Use "hosts needed" and "subnets needed" for a first-pass split, then document the plan in IPAM. The table this tool prints is a sketch, not a signed design.

Good production design also includes:

- Separate user, server, voice, IoT, and guest networks
- Firewall zones between trust levels
- DHCP scopes that match usable ranges (leave room for printers and VIPs)
- Documentation for reverse DNS and ACLs
- A written rule for what happens when you add a second site

A flat /16 with every camera, laptop, and domain controller in one broadcast domain will work until it does not. Segmentation is a [network security](/services/network-security/) problem, not only a math problem.

## Common mistakes this calculator helps catch

- Using /24 everywhere and running out of private space later
- Forgetting network and broadcast reservations when ordering gear
- Mismatched masks on two ends of a link
- Overlapping VPN and LAN ranges after an acquisition
- Planning IoT cameras on the same flat LAN as domain controllers
- Treating 192.168.0.0/16 as "free" when a cloud VPC already claimed part of it

If you are connecting a warehouse or a second suite, write the existing ranges down first. Then assign the new block.

Guest Wi-Fi belongs on its own prefix and should not reach file servers. Voice VLANs keep jitter away from backups. Camera VLANs keep a cheap IoT stack from talking to domain controllers. The calculator will happily put them all in one /24. That is a valid math answer and a bad network.

## IPv6 note

This page is IPv4 only. IPv6 planning uses different prefix habits (/64 on a LAN is normal). Do not force IPv4 VLSM habits onto IPv6. If you need both stacks, design them as two plans.

## Networking services from Secure Techies

If you are redesigning VLANs, deploying SD-WAN, or hardening edge firewalls, pair this tool with [network security services](/services/network-security/) and [managed infrastructure](/services/infrastructure/). For camera networks, also size storage with the [surveillance storage calculator](/tools/surveillance-storage-calculator/).

Printers, badge readers, and cameras should not roam DHCP if you ever want a firewall rule that lasts. Give them reservations or statics inside the documented range. Then keep a list. The calculator will not store that list for you.

## DHCP, gateways, and the addresses people fight over

Usable range is not the same as "hand all of it to DHCP." Reserve the gateway (usually the first usable), printers, access points, and any VIP. A /24 with a DHCP pool of .50 through .200 leaves room. A pool of .1 through .254 will collide with the router the day you forget.

Write those reservations in the same place you write the CIDR. Future you will not remember that .10 is the copier.

## A simple office plan that does not paint you into a corner

Start with 10.50.0.0/16 or another empty RFC 1918 block if you can. Then, for one site:

- Users: 10.50.10.0/24
- Servers: 10.50.20.0/24
- Voice: 10.50.30.0/24
- Cameras / IoT: 10.50.40.0/24
- Guest: 10.50.90.0/24
- Site-to-site / management: small /29 or /31 links

Leave 10.50.11.0/24 and friends empty for the next suite. Use this calculator to print usable ranges and DHCP pools. Put the guest network behind a firewall that cannot see servers. That last sentence is the security design. The math only makes it possible.

If you already live in 192.168.1.0/24 with everything on one switch, do not renumber on a Friday. Plan a weekend cut, or add a new block and migrate in slices.

Document the WAN and VPN pools in the same IPAM as the LAN. Cloud virtual networks love 10.0.0.0/16. Home routers love 192.168.1.0/24. If you do not write yours down, someone else will collide with it.

Label the switch ports to match the plan. A perfect CIDR on a whiteboard and a mystery cable in the closet is how guest Wi-Fi ends up on the server VLAN.

Ready for a network review? [Contact Secure Techies](/contact/) for a free assessment.
