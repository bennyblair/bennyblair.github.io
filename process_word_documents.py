#!/usr/bin/env python3
"""
SIMPLE WORD DOCUMENT PROCESSOR
Paste your Word document content and run - that's it!
"""

import re
import json
import os
from datetime import datetime, timedelta
import pandas as pd
import pytz
from pathlib import Path

def create_slug(title):
    """Create URL-friendly slug from title"""
    slug = title.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug.strip('-')

def extract_meta_description(content):
    """Extract meta description from content"""
    # Try to extract from JSON-LD first
    json_match = re.search(r'"description":\s*"([^"]+)"', content)
    if json_match:
        return json_match.group(1)
    
    # Fallback: use introduction paragraph
    intro_match = re.search(r'Introduction\n(.+?)(?:\n\n|\n[A-Z])', content, re.DOTALL)
    if intro_match:
        intro = intro_match.group(1).strip()
        sentences = intro.split('.')
        if sentences:
            return sentences[0].strip() + '.'
    
    return "Professional guide for Australian businesses seeking private lending solutions."

def extract_keywords(title, content):
    """Extract relevant keywords"""
    keywords = []
    title_lower = title.lower()
    content_lower = content.lower()
    
    # Core private lending keywords
    core_keywords = [
        'private lending', 'business loans', 'second mortgage', 'caveat loans',
        'bridging loans', 'commercial finance', 'property finance', 'business funding',
        'commercial lending', 'asset finance', 'working capital', 'short term loans'
    ]
    
    for keyword in core_keywords:
        if keyword in title_lower or keyword in content_lower:
            keywords.append(keyword)
    
    # Extract from title
    title_words = [word for word in title_lower.split() 
                  if len(word) > 3 and word not in ['what', 'when', 'where', 'how', 'for', 'the', 'and', 'or', 'with']]
    keywords.extend(title_words[:3])
    
    return list(set(keywords))[:8]  # Unique keywords, max 8

def parse_article(content):
    """Parse a single article from Word document format"""
    lines = content.split('\n')
    
    # Extract title (first substantial line)
    title = ""
    for line in lines:
        line = line.strip()
        if line and not line.startswith('Article') and not line.startswith('Emet Capital'):
            title = line
            break
    
    if not title:
        return None
    
    slug = create_slug(title)
    meta_description = extract_meta_description(content)
    keywords = extract_keywords(title, content)
    
    # Clean content - remove JSON-LD and structure data
    content_clean = re.sub(r'<script type="application/ld\+json">.*?</script>', '', content, flags=re.DOTALL)
    content_clean = re.sub(r'JSON-LD Structured Data.*$', '', content_clean, flags=re.MULTILINE | re.DOTALL)
    
    # Process sections
    sections = []
    current_section = ""
    current_content = []
    
    in_content = False
    lines = content_clean.split('\n')
    
    for line in lines:
        line = line.strip()
        
        # Skip header info
        if line.startswith('Article') or line.startswith('Emet Capital |') or line == title:
            in_content = True
            continue
        
        if not in_content:
            continue
            
        # Detect section headers
        if (line and 
            not line.startswith('•') and 
            not line.startswith('-') and 
            not line.startswith('Example:') and
            (line == line.upper() or line in ['Introduction', 'Conclusion', 'FAQs', 'Glossary']) and
            len(line.split()) <= 6):
            
            # Save previous section
            if current_section and current_content:
                sections.append({
                    'heading': current_section,
                    'content': '\n'.join(current_content).strip()
                })
            
            current_section = line.title()
            current_content = []
        elif line:
            current_content.append(line)
    
    # Save final section
    if current_section and current_content:
        sections.append({
            'heading': current_section,
            'content': '\n'.join(current_content).strip()
        })
    
    return {
        'title': title,
        'slug': slug,
        'meta_description': meta_description,
        'keywords': keywords,
        'sections': sections
    }

def generate_markdown(article):
    """Generate clean markdown with proper frontmatter"""
    publish_date = datetime.now(pytz.timezone('Australia/Sydney')).strftime('%Y-%m-%d')
    
    # Frontmatter
    frontmatter = f"""---
title: "{article['title']}"
description: "{article['meta_description']}"
date: {publish_date}
category: guides
slug: {article['slug']}
keywords: {json.dumps(article['keywords'])}
---

"""
    
    # Build content
    content_parts = []
    
    for section in article['sections']:
        if section['heading'] == 'Introduction':
            content_parts.append(section['content'])
        elif section['heading'] in ['Faqs', 'FAQ', 'Frequently Asked Questions']:
            content_parts.append(f"\n## Frequently Asked Questions\n\n{format_faqs(section['content'])}")
        elif section['heading'] == 'Glossary':
            content_parts.append(f"\n## Glossary\n\n{format_glossary(section['content'])}")
        else:
            content_parts.append(f"\n## {section['heading']}\n\n{section['content']}")
    
    return frontmatter + '\n'.join(content_parts)

def format_faqs(content):
    """Format FAQ content properly"""
    formatted = []
    lines = content.split('\n')
    current_question = None
    current_answer = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line.endswith('?'):
            if current_question:
                formatted.append(f"### {current_question}\n\n{' '.join(current_answer)}\n")
            current_question = line
            current_answer = []
        else:
            current_answer.append(line)
    
    if current_question:
        formatted.append(f"### {current_question}\n\n{' '.join(current_answer)}")
    
    return '\n'.join(formatted)

def format_glossary(content):
    """Format glossary content"""
    formatted = []
    for line in content.split('\n'):
        line = line.strip()
        if ':' in line:
            term, definition = line.split(':', 1)
            formatted.append(f"**{term.strip()}**: {definition.strip()}")
    return '\n'.join(formatted)

def process_word_content(content):
    """Main function to process Word document content"""
    base_path = Path(__file__).parent.parent
    guides_path = base_path / "src" / "content" / "guides"
    guides_path.mkdir(parents=True, exist_ok=True)
    
    # Split by article boundaries
    article_pattern = r'Article (\d+)\n(.+?)(?=Article \d+|$)'
    matches = re.findall(article_pattern, content, re.DOTALL)
    
    processed = []
    
    for article_num, article_content in matches:
        article = parse_article(article_content.strip())
        if article:
            markdown = generate_markdown(article)
            filename = f"{article['slug']}.md"
            filepath = guides_path / filename
            
            # Write file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(markdown)
            
            processed.append({
                'title': article['title'],
                'filename': filename,
                'slug': article['slug']
            })
            
            print(f"✅ Created: {filename}")
    
    return processed

# =============================================================================
# PASTE YOUR WORD DOCUMENT CONTENT BETWEEN THE TRIPLE QUOTES BELOW
# =============================================================================

word_content = """
PASTE YOUR WORD DOCUMENT CONTENT HERE

Replace this text with the content from your Word document.
Copy everything from "Article 1" to the end of the last article.
"""

# =============================================================================
# MAIN PROCESSING
# =============================================================================

def main():
    print("🚀 SIMPLE WORD DOCUMENT PROCESSOR")
    print("=" * 40)
    
    if "PASTE YOUR WORD DOCUMENT CONTENT HERE" in word_content:
        print("❌ Please paste your Word document content in the word_content variable above")
        print("📝 Instructions:")
        print("   1. Open this file in your editor")
        print("   2. Find the word_content = \"\"\" section")
        print("   3. Replace the placeholder text with your Word document content")
        print("   4. Save and run again")
        return
    
    print("📝 Processing Word document content...")
    processed = process_word_content(word_content)
    
    if processed:
        print(f"\n✅ Successfully processed {len(processed)} articles:")
        for article in processed:
            print(f"   📄 {article['title']}")
            print(f"      → {article['filename']}")
        
        print(f"\n📁 Files created in: src/content/guides/")
        print(f"🔄 Next steps:")
        print(f"   1. Files are ready for publishing")
        print(f"   2. Commit and push to trigger GitHub Actions")
        print(f"   3. Articles will be live on the website")
    else:
        print("❌ No articles were processed")

if __name__ == "__main__":
    main()
