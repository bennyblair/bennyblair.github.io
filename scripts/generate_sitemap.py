#!/usr/bin/env python3
"""
Dynamic Sitemap Generator for EMET Capital
Automatically generates sitemap.xml including all published articles
"""

import os
import json
import re
from datetime import datetime
from pathlib import Path

# Configuration
DOMAIN = "https://emetcapital.com.au"
CONTENT_DIRS = {
    'guides': 'src/content/guides',
    'case-studies': 'src/content/case-studies', 
    'insights': 'src/content/insights'
}

def parse_frontmatter(content):
    """Parse YAML frontmatter from markdown content"""
    if not content.startswith('---'):
        return {}, content
    
    try:
        parts = content.split('---', 2)
        if len(parts) < 3:
            return {}, content
            
        # Simple YAML parser for basic frontmatter
        frontmatter_text = parts[1].strip()
        frontmatter = {}
        
        for line in frontmatter_text.split('\n'):
            line = line.strip()
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip()
                
                # Remove quotes if present
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                elif value.startswith("'") and value.endswith("'"):
                    value = value[1:-1]
                
                frontmatter[key] = value
        
        body = parts[2].strip()
        return frontmatter, body
    except Exception:
        return {}, content

def get_articles_from_directory(dir_path, content_type):
    """Get all articles from a content directory"""
    articles = []
    
    if not os.path.exists(dir_path):
        print(f"Warning: Directory {dir_path} not found")
        return articles
    
    for file_path in Path(dir_path).glob('*.md'):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            frontmatter, _ = parse_frontmatter(content)
            
            if not frontmatter:
                continue
                
            slug = file_path.stem
            date = frontmatter.get('date', datetime.now().isoformat())
            
            # Parse date string to datetime object
            if isinstance(date, str):
                # Handle different date formats
                try:
                    if 'T' in date:
                        # Remove timezone info for simplicity
                        date_str = date.replace('Z', '').split('T')[0]
                        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
                    else:
                        date_obj = datetime.strptime(date, '%Y-%m-%d')
                except ValueError:
                    date_obj = datetime.now()
            else:
                date_obj = date if hasattr(date, 'strftime') else datetime.now()
            
            articles.append({
                'slug': slug,
                'content_type': content_type,
                'date': date_obj,
                'title': frontmatter.get('title', 'Untitled'),
                'url': f"{DOMAIN}/resources/{content_type}/{slug}"
            })
            
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            continue
    
    return articles

def generate_sitemap():
    """Generate complete sitemap.xml"""
    
    # Static pages with their priorities and change frequencies
    static_pages = [
        {'url': f"{DOMAIN}/", 'priority': '1.0', 'changefreq': 'weekly'},
        {'url': f"{DOMAIN}/about", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services", 'priority': '0.9', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/contact", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/resources", 'priority': '0.8', 'changefreq': 'weekly'},
        {'url': f"{DOMAIN}/resources/guides", 'priority': '0.8', 'changefreq': 'daily'},
        {'url': f"{DOMAIN}/resources/case-studies", 'priority': '0.8', 'changefreq': 'daily'},
        {'url': f"{DOMAIN}/resources/insights", 'priority': '0.8', 'changefreq': 'daily'},
        {'url': f"{DOMAIN}/tools", 'priority': '0.7', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/resources/faqs", 'priority': '0.5', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/resources/glossary", 'priority': '0.5', 'changefreq': 'monthly'},
        # Service pages (pillar pages)
        {'url': f"{DOMAIN}/services/first-second-mortgages", 'priority': '0.9', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/commercial-property-development", 'priority': '0.9', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/bridging-finance", 'priority': '0.9', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/refinancing-solutions", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/working-capital", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/equipment-finance", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/business-acquisition", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/trade-finance", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/asset-backed-lending", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/private-lending", 'priority': '0.9', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/smsf-lending", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/debt-consolidation", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/caveat-loans", 'priority': '0.9', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/asset-finance", 'priority': '0.8', 'changefreq': 'monthly'},
        # Tool pages
        {'url': f"{DOMAIN}/tools/commercial-property-loan-calculator", 'priority': '0.6', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/tools/second-mortgage-calculator", 'priority': '0.6', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/tools/commercial-real-estate-calculator", 'priority': '0.6', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/tools/asset-finance-roi-calculator", 'priority': '0.6', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/tools/working-capital-calculator", 'priority': '0.6', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/tools/loan-comparison-tool", 'priority': '0.6', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/tools/bridging-loan-calculator", 'priority': '0.6', 'changefreq': 'monthly'},
        # City-specific service pages
        {'url': f"{DOMAIN}/services/first-second-mortgages/cities/sydney", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/first-second-mortgages/cities/melbourne", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/first-second-mortgages/cities/brisbane", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/first-second-mortgages/cities/perth", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/first-second-mortgages/cities/adelaide", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/first-second-mortgages/cities/gold-coast", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/commercial-property-development/cities/sydney", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/commercial-property-development/cities/melbourne", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/commercial-property-development/cities/brisbane", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/commercial-property-development/cities/perth", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/commercial-property-development/cities/adelaide", 'priority': '0.8', 'changefreq': 'monthly'},
        {'url': f"{DOMAIN}/services/commercial-property-development/cities/gold-coast", 'priority': '0.8', 'changefreq': 'monthly'},
    ]
    
    # Get all articles from content directories
    all_articles = []
    for content_type, dir_path in CONTENT_DIRS.items():
        articles = get_articles_from_directory(dir_path, content_type)
        all_articles.extend(articles)
    
    # Sort articles by date (newest first)
    all_articles.sort(key=lambda x: x['date'], reverse=True)
    
    # Generate XML
    today = datetime.now().strftime('%Y-%m-%d')
    
    xml_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

'''
    
    # Add static pages
    for page in static_pages:
        xml_content += f'''  <url>
    <loc>{page['url']}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{page['changefreq']}</changefreq>
    <priority>{page['priority']}</priority>
  </url>
  
'''
    
    # Add article pages
    for article in all_articles:
        # Determine priority based on recency and content type
        days_old = (datetime.now() - article['date']).days
        
        # Pillar articles (guides with key topics) get higher priority
        is_pillar = article['content_type'] == 'guides' and any(keyword in article['title'].lower() for keyword in [
            'complete guide', 'comprehensive', 'everything you need', 'ultimate guide'
        ])
        
        if is_pillar:
            priority = '0.8'
            changefreq = 'monthly'
        elif days_old <= 7:
            priority = '0.7'  # New articles
            changefreq = 'weekly'
        elif days_old <= 30:
            priority = '0.7'
            changefreq = 'weekly'
        elif days_old <= 90:
            priority = '0.6'
            changefreq = 'monthly'
        else:
            priority = '0.6'
            changefreq = 'monthly'
            
        # Use current date as lastmod for better freshness signals
        article_date = datetime.now().strftime('%Y-%m-%d')
        
        xml_content += f'''  <url>
    <loc>{article['url']}</loc>
    <lastmod>{article_date}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>
  
'''
    
    xml_content += '</urlset>\n'
    
    # Write to public directory
    output_path = 'public/sitemap.xml'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(xml_content)
    
    print(f"✅ Generated sitemap.xml with {len(static_pages)} static pages and {len(all_articles)} articles")
    print(f"📊 Total URLs: {len(static_pages) + len(all_articles)}")
    
    # Show recent articles for verification
    if all_articles:
        print(f"\n📝 Latest articles included:")
        for article in all_articles[:5]:
            print(f"   • {article['title']} ({article['date'].strftime('%Y-%m-%d')})")
            print(f"     {article['url']}")
    
    return output_path

if __name__ == "__main__":
    generate_sitemap()
