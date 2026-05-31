#!/usr/bin/env python3
"""One-off: fetch copyright-free headshots from Pexels for landing reviews.
Saves square 160x160 JPGs into static/images/landing/reviews/.
Pexels License: free to use, no attribution required."""
import json, os, sys, urllib.request

KEY = "Pxs4l9L8cUglCyPGgCsi164C298d0xuBya8sqmAnNMYw7sihztxjEwQV"
OUT = "static/images/landing/reviews"
os.makedirs(OUT, exist_ok=True)

# (filename, query, gender bucket) — we collect a pool per gender then assign.
WOMEN = 6
MEN = 4

def search(query, per_page, page=1):
    url = f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}&per_page={per_page}&page={page}&orientation=square"
    req = urllib.request.Request(url, headers={"Authorization": KEY})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def collect(query, n):
    out = []
    page = 1
    while len(out) < n and page <= 4:
        data = search(query, 30, page)
        for p in data.get("photos", []):
            src = p["src"]["original"] + "?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop"
            out.append(src)
            if len(out) >= n:
                break
        page += 1
    return out

women = collect("professional businesswoman headshot smiling", WOMEN)
men = collect("professional businessman headshot smiling", MEN)

def dl(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)

names_w = ["natali", "nancy", "noella", "catherine", "heather", "morgan"]
names_m = ["shadi", "bonbright", "spare1", "spare2"]

manifest = {}
for nm, url in zip(names_w, women):
    p = f"{OUT}/{nm}.jpg"
    sz = dl(url, p)
    manifest[nm] = sz
for nm, url in zip(names_m, men):
    p = f"{OUT}/{nm}.jpg"
    sz = dl(url, p)
    manifest[nm] = sz

print(json.dumps(manifest, indent=2))
