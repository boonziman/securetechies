#!/usr/bin/env python3
"""Fetch copyright-free landscape service images from Pexels for managed IT landing."""
import json
import os
import urllib.parse
import urllib.request

KEY = "Pxs4l9L8cUglCyPGgCsi164C298d0xuBya8sqmAnNMYw7sihztxjEwQV"
OUT = "assets/images/services/landing"
os.makedirs(OUT, exist_ok=True)

# (filename, query)
IMAGES = [
    ("managed-it.jpg", "server room data center monitoring"),
    ("business-it-support.jpg", "small business office team working"),
    ("help-desk.jpg", "customer support headset call center"),
    ("microsoft-365.jpg", "microsoft office laptop collaboration"),
    ("cloud-services.jpg", "cloud computing technology abstract"),
    ("strategic-consulting.jpg", "business strategy meeting technology"),
]


def search(query, per_page=15, page=1):
    url = (
        f"https://api.pexels.com/v1/search?query={urllib.parse.quote(query)}"
        f"&per_page={per_page}&page={page}&orientation=landscape"
    )
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": KEY,
            "User-Agent": "SecureTechiesSiteBot/1.0",
            "Accept": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def pick_photo(query):
    data = search(query)
    photos = data.get("photos", [])
    if not photos:
        raise RuntimeError(f"No photos for query: {query}")
    # Prefer wider shots with good dimensions
    photos.sort(key=lambda p: (p.get("width", 0) * p.get("height", 0)), reverse=True)
    return photos[0]["src"]["original"]


def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)


manifest = {}
for filename, query in IMAGES:
    path = f"{OUT}/{filename}"
    url = pick_photo(query)
    size = download(url, path)
    manifest[filename] = {"bytes": size, "query": query}

print(json.dumps(manifest, indent=2))