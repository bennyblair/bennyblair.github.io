#!/usr/bin/env python3
"""
Apply internal links to published articles based on interlinks.csv
"""

import os
import re
import json
import pandas as pd
from pathlib import Path

def parse_header_and_body(text: str):
    """Parse JSON header and body from markdown content"""
    m = re.search(r"^```json\s*(\{.*?\})\s*```", text, flags=re.DOTALL|re.IGNORECASE)
    if not m: 
        return {}, text, ""
    header = json.loads(m.group(1))
    body = text[m.end():].lstrip()
    return header, body, m.group(1)

def write_header_and_body(header: dict, body: str) -> str:
    """Combine JSON header and body into markdown format"""
    return "```json\n" + json.dumps(header, ensure_ascii=False, indent=2) + "\n```\n\n" + body

def main():
    import argparse
    ap = argparse.ArgumentParser(description="Apply internal links to published articles")
    ap.add_argument("--csv", required=True, help="interlinks.csv file")
    ap.add_argument("--dir", required=True, help="folder with published markdown files")
    ap.add_argument("--dry-run", action="store_true", help="Show what would be updated without writing files")
    args = ap.parse_args()

    if not os.path.exists(args.csv):
        print(f"❌ Interlinks CSV not found: {args.csv}")
        return 1

    df = pd.read_csv(args.csv)
    grouped = df.groupby("source_file")
    base = Path(args.dir)
    updated_files = []
    
    print(f"🔗 Processing interlinks from {args.csv}")
    print(f"📁 Target directory: {base}")
    
    for fname, group in grouped:
        path = base / fname
        if not path.exists(): 
            print(f"⚠️  Skip (missing): {fname}")
            continue
            
        print(f"\n📄 Processing: {fname}")
        
        text = path.read_text(encoding="utf-8")
        header, body, raw = parse_header_and_body(text)
        
        # Prepare interlinking data
        inter = header.setdefault("interlinking", {})
        link_out = []
        
        for _, r in group.iterrows():
            link_out.append({
                "url": r["target_url"], 
                "anchor": r["anchor"], 
                "relation": r["relation"]
            })
        
        inter["link_out"] = link_out
        
        print(f"   🔗 Adding {len(link_out)} internal links")
        
        if args.dry_run:
            print(f"   🔍 DRY RUN: Would update {fname} with {len(link_out)} links")
        else:
            out = write_header_and_body(header, body)
            path.write_text(out, encoding="utf-8")
            updated_files.append(fname)
            print(f"   ✅ Updated: {fname}")
    
    if updated_files:
        print(f"\n🎉 Successfully updated {len(updated_files)} files with internal links")
    else:
        print(f"\nℹ️  No files were updated")
    
    return 0

if __name__ == "__main__":
    exit(main())
