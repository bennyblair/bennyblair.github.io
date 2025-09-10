#!/usr/bin/env python3
"""
Daily content publishing script for EMET Capital
Reads from CSV data and publishes 2 articles per day with full SEO optimization
"""

import os
import re
import json
import pandas as pd
from datetime import date, datetime
from pathlib import Path
import pytz

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

def validate_article(content: str, post_url: str, title: str, section_key: str) -> bool:
    """Validate article meets quality standards"""
    # Parse content
    header, body, _ = parse_header_and_body(content)
    
    # Check word count (1500-2100)
    word_count = len(body.split())
    if word_count < 1500 or word_count > 2100:
        print(f"❌ Word count {word_count} outside range 1500-2100")
        return False
    
    # Check H2 count (minimum 8)
    h2_count = len(re.findall(r'<h2[^>]*>', body))
    if h2_count < 8:
        print(f"❌ H2 count {h2_count} below minimum 8")
        return False
    
    # Check for table
    if '<table>' not in body:
        print(f"❌ Missing required table element")
        return False
    
    # Check for bullets
    if '<ul>' not in body and '<li>' not in body:
        print(f"❌ Missing required bullet list")
        return False
    
    # Check for CTA (contact/enquiry text)
    cta_patterns = ['contact', 'enquiry', 'speak with', 'call', 'get quote']
    has_cta = any(pattern.lower() in body.lower() for pattern in cta_patterns)
    if not has_cta:
        print(f"❌ Missing CTA (call-to-action)")
        return False
    
    # Check for disclaimer
    disclaimer_patterns = ['commercial', 'broker', 'no consumer credit']
    has_disclaimer = any(pattern.lower() in body.lower() for pattern in disclaimer_patterns)
    if not has_disclaimer:
        print(f"❌ Missing commercial broker disclaimer")
        return False
    
    # Check JSON header structure
    if 'meta' not in header:
        print(f"❌ Missing meta section in JSON header")
        return False
    
    meta = header['meta']
    if meta.get('url') != post_url:
        print(f"❌ URL mismatch: header={meta.get('url')} vs expected={post_url}")
        return False
    
    if meta.get('section') != section_key:
        print(f"❌ Section mismatch: header={meta.get('section')} vs expected={section_key}")
        return False
    
    print(f"✅ Article validation passed: {word_count} words, {h2_count} H2s")
    return True

def add_breadcrumb_to_content(content: str, menu_label: str, title: str) -> str:
    """Add breadcrumb navigation to article content"""
    breadcrumb_json = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://emetcapital.com.au/"
            },
            {
                "@type": "ListItem", 
                "position": 2,
                "name": "Resources",
                "item": "https://emetcapital.com.au/resources"
            },
            {
                "@type": "ListItem",
                "position": 3, 
                "name": menu_label,
                "item": f"https://emetcapital.com.au/resources/{menu_label.lower().replace(' ', '-').replace('&', 'and')}"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": title,
                "item": f"https://emetcapital.com.au/resources/guides/{title.lower().replace(' ', '-')}"
            }
        ]
    }
    
    header, body, raw_header = parse_header_and_body(content)
    
    # Add breadcrumb to schema
    if 'breadcrumb' not in header:
        header['breadcrumb'] = breadcrumb_json
    
    return write_header_and_body(header, body)

def main():
    import argparse
    ap = argparse.ArgumentParser(description="Publish daily articles from EMET CSV data")
    ap.add_argument("--csv", required=True, help="Path to emet_ai_feed_daily.csv")
    ap.add_argument("--published-dir", default="src/content", help="Published content directory")
    ap.add_argument("--dry-run", action="store_true", help="Show what would be published without writing files")
    args = ap.parse_args()

    # Use Australia/Sydney timezone
    sydney_tz = pytz.timezone('Australia/Sydney')
    today = datetime.now(sydney_tz).date()
    today_str = today.isoformat()
    
    print(f"🗓️  Publishing for date: {today_str} (AEST)")
    
    # Read CSV data
    if not os.path.exists(args.csv):
        print(f"❌ CSV file not found: {args.csv}")
        return 1
    
    df = pd.read_csv(args.csv)
    
    # Filter today's rows
    today_rows = df[df['date'] == today_str].copy()
    
    if today_rows.empty:
        print(f"ℹ️  No articles scheduled for {today_str}")
        return 0
    
    print(f"📄 Found {len(today_rows)} articles for today")
    
    published_dir = Path(args.published_dir)
    published_dir.mkdir(parents=True, exist_ok=True)
    
    published_files = []
    
    for _, row in today_rows.iterrows():
        slot = row['slot']
        title = row['title']
        post_url = row['post_url']
        section_key = row['section_key']
        menu_label = row['menu_label']
        
        # Extract slug from URL
        slug = post_url.split('/')[-1]
        slot_num = '1' if str(slot).lower().startswith('m') else '2'
        filename = f"{today_str}_{slot_num}--{slug}.md"
        
        print(f"\n📝 Processing {slot} article: {title}")
        print(f"   📁 Filename: {filename}")
        print(f"   🔗 URL: {post_url}")
        
        # Create content from CSV data
        json_header = json.loads(row['json_header'])
        body_html = row['body_html']
        
        # Normalize header
        json_header['meta']['url'] = post_url
        json_header['meta']['section'] = section_key
        json_header['meta']['title'] = title
        
        # Ensure canonical URL
        if 'schema' in json_header:
            json_header['schema']['mainEntityOfPage'] = post_url
        
        # Add proposed links if available
        if pd.notna(row.get('proposed_link_out_json')) and row['proposed_link_out_json'].strip():
            try:
                link_out = json.loads(row['proposed_link_out_json'])
                if not json_header.get('interlinking'):
                    json_header['interlinking'] = {}
                json_header['interlinking']['link_out'] = link_out
                print(f"   🔗 Added {len(link_out)} internal links")
            except Exception as e:
                print(f"   ⚠️  Could not parse proposed_link_out_json: {e}")
        
        # Create full content
        content = write_header_and_body(json_header, body_html)
        
        # Add breadcrumb
        content = add_breadcrumb_to_content(content, menu_label, title)
        
        # Validate article
        if not validate_article(content, post_url, title, section_key):
            print(f"❌ Article validation failed for {filename}")
            continue
        
        if args.dry_run:
            print(f"   🔍 DRY RUN: Would write to {published_dir / filename}")
            print(f"   📊 Content length: {len(content)} characters")
        else:
            # Write to published directory
            output_path = published_dir / filename
            output_path.write_text(content, encoding='utf-8')
            published_files.append(output_path)
            print(f"   ✅ Published: {output_path}")
    
    if published_files:
        print(f"\n🎉 Successfully published {len(published_files)} articles:")
        for path in published_files:
            print(f"   📄 {path}")
        
        print(f"\n💡 Next steps:")
        print(f"   1. Run build process to generate static files")
        print(f"   2. Commit and push changes")
        print(f"   3. Verify articles are live on website")
    
    return 0

if __name__ == "__main__":
    exit(main())
