#!/usr/bin/env python3
"""
Dynamic sitemap generator for Emet Capital.
Builds sitemap.xml from the canonical route metadata generated from the app router,
then excludes redirect aliases so the sitemap only contains canonical URLs.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

DOMAIN = "https://emetcapital.com.au"
REPO_ROOT = Path(__file__).resolve().parents[1]
ROUTE_DATA_PATH = REPO_ROOT / "scripts" / "seo-route-data.generated.json"
NETLIFY_TOML_PATH = REPO_ROOT / "netlify.toml"
OUTPUT_PATH = REPO_ROOT / "public" / "sitemap.xml"

DEFAULT_CHANGEFREQ = "monthly"
DEFAULT_PRIORITY = "0.6"

PRIORITY_OVERRIDES = {
    "/": ("weekly", "1.0"),
    "/services": ("monthly", "0.9"),
    "/resources": ("weekly", "0.8"),
    "/resources/guides": ("daily", "0.8"),
    "/resources/case-studies": ("weekly", "0.8"),
    "/tools": ("monthly", "0.7"),
    "/contact": ("monthly", "0.8"),
    "/about": ("monthly", "0.8"),
}

PREFIX_OVERRIDES = [
    ("/resources/guides/", ("monthly", "0.6")),
    ("/resources/case-studies/", ("monthly", "0.6")),
    ("/services/", ("monthly", "0.8")),
    ("/tools/", ("monthly", "0.6")),
]


def canonical_path_from_value(value: str) -> str:
    if not value:
        return "/"
    if value.startswith("http://") or value.startswith("https://"):
        parsed = urlparse(value)
        return parsed.path or "/"
    return value if value.startswith("/") else f"/{value}"


def load_route_data() -> dict:
    if not ROUTE_DATA_PATH.exists():
        raise FileNotFoundError(f"Missing route data file: {ROUTE_DATA_PATH}")
    with ROUTE_DATA_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def netlify_pattern_to_regex(pattern: str) -> re.Pattern | None:
    if pattern == "/*":
        return None
    regex_parts: list[str] = []
    i = 0
    while i < len(pattern):
        ch = pattern[i]
        if ch == ':':
            j = i + 1
            while j < len(pattern) and (pattern[j].isalnum() or pattern[j] in {'-', '_'}):
                j += 1
            name = pattern[i + 1:j]
            regex_parts.append('.+' if name == 'splat' else '[^/]+')
            i = j
            continue
        if ch == '*':
            regex_parts.append('.*')
            i += 1
            continue
        regex_parts.append(re.escape(ch))
        i += 1
    return re.compile('^' + ''.join(regex_parts) + '$')


def parse_redirect_sources() -> tuple[set[str], list[re.Pattern]]:
    text = NETLIFY_TOML_PATH.read_text(encoding="utf-8")
    fixed_sources: set[str] = set()
    pattern_sources: list[re.Pattern] = []
    blocks = text.split("[[redirects]]")
    for block in blocks[1:]:
        from_match = re.search(r'from\s*=\s*"([^"]+)"', block)
        to_match = re.search(r'to\s*=\s*"([^"]+)"', block)
        status_match = re.search(r'status\s*=\s*(\d+)', block)
        if not (from_match and to_match and status_match):
            continue
        status = int(status_match.group(1))
        if status not in {301, 302}:
            continue
        from_path = from_match.group(1)
        to_path = to_match.group(1)
        if from_path == to_path:
            continue
        if ":" in from_path or "*" in from_path:
            regex = netlify_pattern_to_regex(from_path)
            if regex:
                pattern_sources.append(regex)
        else:
            fixed_sources.add(from_path)
    return fixed_sources, pattern_sources


def pick_priority(path: str) -> tuple[str, str]:
    if path in PRIORITY_OVERRIDES:
        return PRIORITY_OVERRIDES[path]
    for prefix, values in PREFIX_OVERRIDES:
        if path.startswith(prefix):
            return values
    return DEFAULT_CHANGEFREQ, DEFAULT_PRIORITY


def build_entries() -> list[dict]:
    route_data = load_route_data()
    redirect_sources, redirect_patterns = parse_redirect_sources()
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    entries: dict[str, dict] = {}
    for route_path, meta in route_data.items():
        if route_path == "*" or ":" in route_path or "*" in route_path:
            continue
        canonical_path = canonical_path_from_value(meta.get("canonical") or route_path)
        canonical_path = canonical_path.rstrip("/") or "/"

        # Exclude redirect aliases and any non-canonical path that differs from canonical.
        if route_path.rstrip("/") != canonical_path:
            continue
        if canonical_path in redirect_sources:
            continue
        if any(pattern.match(canonical_path) for pattern in redirect_patterns):
            continue

        changefreq, priority = pick_priority(canonical_path)
        entries[canonical_path] = {
            "loc": f"{DOMAIN}{canonical_path}" if canonical_path != "/" else f"{DOMAIN}/",
            "lastmod": today,
            "changefreq": changefreq,
            "priority": priority,
        }

    return [entries[path] for path in sorted(entries.keys())]


def render_xml(entries: list[dict]) -> str:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
        '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
        '',
    ]
    for entry in entries:
        lines.extend([
            '  <url>',
            f"    <loc>{entry['loc']}</loc>",
            f"    <lastmod>{entry['lastmod']}</lastmod>",
            f"    <changefreq>{entry['changefreq']}</changefreq>",
            f"    <priority>{entry['priority']}</priority>",
            '  </url>',
            '',
        ])
    lines.append('</urlset>')
    lines.append('')
    return '\n'.join(lines)


def main() -> None:
    entries = build_entries()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(render_xml(entries), encoding="utf-8")
    print(f"✅ Generated sitemap.xml with {len(entries)} canonical URLs")
    for entry in entries[:10]:
        print(f"   • {entry['loc']}")


if __name__ == "__main__":
    main()
