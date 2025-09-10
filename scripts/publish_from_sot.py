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
    """Parse header and body from markdown content (supports both JSON and YAML frontmatter)"""
    
    # Try YAML frontmatter first
    yaml_match = re.search(r"^---\s*\n(.*?)\n---\s*\n", text, flags=re.DOTALL)
    if yaml_match:
        # Simple YAML parser for basic frontmatter
        yaml_content = yaml_match.group(1)
        header = {}
        for line in yaml_content.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip().strip('"\'')
                header[key] = value
        
        body = text[yaml_match.end():].lstrip()
        return header, body, yaml_match.group(1)
    
    # Fall back to JSON format
    json_match = re.search(r"^```json\s*(\{.*?\})\s*```", text, flags=re.DOTALL|re.IGNORECASE)
    if json_match: 
        header = json.loads(json_match.group(1))
        body = text[json_match.end():].lstrip()
        return header, body, json_match.group(1)
    
    # No header found
    return {}, text, ""

def write_header_and_body(header: dict, body: str) -> str:
    """Combine header and body into markdown format with YAML frontmatter"""
    
    # Extract key fields from the nested JSON structure
    meta = header.get('meta', {})
    
    # Create YAML frontmatter
    yaml_content = []
    yaml_content.append("---")
    yaml_content.append(f'title: "{meta.get("title", "")}"')
    yaml_content.append(f'date: {meta.get("publish_date", "")}T06:00:00Z')  # Default morning time
    yaml_content.append(f'description: "{meta.get("description", "")}"')
    
    # Generate featuredImage path from target keyword
    target_keyword = meta.get("target_keyword", "article")
    image_name = target_keyword.replace(" ", "-").replace("(", "").replace(")", "")
    yaml_content.append(f'featuredImage: "/images/uploads/{image_name}.jpg"')
    
    # Map pillar to category
    pillar = meta.get('pillar', '')
    if 'Bridging' in pillar:
        category = 'Bridging Finance'
    elif 'Second' in pillar:
        category = 'Second Mortgage'  
    elif 'Property' in pillar:
        category = 'Property Finance'
    else:
        category = 'Commercial Finance'
    
    yaml_content.append(f'category: "{category}"')
    
    # Tags from target keyword
    if target_keyword and target_keyword != 'article':
        tags = [target_keyword, 'commercial lending', 'business finance']
        tags_str = '[' + ', '.join(f'"{tag}"' for tag in tags) + ']'
        yaml_content.append(f'tags: {tags_str}')
    
    yaml_content.append(f'author: "{meta.get("author", "Emet Capital Editorial Team")}"')
    yaml_content.append(f'readingTime: {meta.get("word_count_target", 1800) // 200}')  # Rough estimate
    yaml_content.append("---")
    yaml_content.append("")
    
    return '\n'.join(yaml_content) + body

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
    
    # Check header structure (works with both YAML and JSON formats)
    if 'meta' in header:
        # JSON format
        meta = header['meta']
        header_url = meta.get('url')
        header_title = meta.get('title')
        header_section = meta.get('section')
    else:
        # YAML format - flat structure
        header_url = header.get('url')  # Note: YAML may not have URL
        header_title = header.get('title')
        header_section = header.get('section')  # May not exist in YAML
    
    # Title check (if available)
    if header_title and header_title != title:
        print(f"⚠️  Title mismatch: header={header_title} vs expected={title}")
        # Don't fail validation on title mismatch, just warn
    
    # Section check (if available)
    if header_section and header_section != section_key:
        print(f"❌ Section mismatch: header={header_section} vs expected={section_key}")
        return False
    
    print(f"✅ Article validation passed: {word_count} words, {h2_count} H2s")
    return True

def add_breadcrumb_to_content(content: str, menu_label: str, title: str) -> str:
    """Add breadcrumb navigation to article content - for YAML format just return content as-is"""
    # Since we're now using YAML frontmatter instead of JSON, 
    # we don't need to add breadcrumb schema to the header
    # The breadcrumb will be handled by the React frontend
    return content

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
    
    # Create subdirectories if they don't exist
    for subdir in ['guides', 'case-studies', 'insights']:
        (published_dir / subdir).mkdir(parents=True, exist_ok=True)
    
    published_files = []
    
    for _, row in today_rows.iterrows():
        slot = row['slot']
        title = row['title']
        post_url = row['post_url']
        section_key = row['section_key']
        menu_label = row['menu_label']
        
        # Extract slug from URL and determine subdirectory
        slug = post_url.split('/')[-1]
        
        # Determine content subdirectory based on URL structure
        if '/guides/' in post_url:
            content_subdir = 'guides'
        elif '/case-studies/' in post_url:
            content_subdir = 'case-studies'
        elif '/insights/' in post_url:
            content_subdir = 'insights'
        else:
            content_subdir = 'guides'  # Default fallback
        
        # Simple filename format: just the slug
        filename = f"{slug}.md"
        
        print(f"\n📝 Processing {slot} article: {title}")
        print(f"   📁 Filename: {content_subdir}/{filename}")
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
            print(f"   🔍 DRY RUN: Would write to {published_dir / content_subdir / filename}")
            print(f"   📊 Content length: {len(content)} characters")
        else:
            # Write to published directory with subdirectory
            output_path = published_dir / content_subdir / filename
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
