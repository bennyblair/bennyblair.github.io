#!/usr/bin/env python3
"""
SINGLE ARTICLE PROCESSOR
Process one article at a time to avoid word limits
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

def process_single_article(content):
    """Process a single article"""
    base_path = Path(__file__).parent
    guides_path = base_path / "src" / "content" / "guides"
    guides_path.mkdir(parents=True, exist_ok=True)
    
    article = parse_article(content.strip())
    if article:
        markdown = generate_markdown(article)
        filename = f"{article['slug']}.md"
        filepath = guides_path / filename
        
        # Write file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(markdown)
        
        print(f"✅ Created: {filename}")
        print(f"📄 Title: {article['title']}")
        print(f"🔗 Slug: {article['slug']}")
        print(f"🏷️ Keywords: {', '.join(article['keywords'])}")
        
        return {
            'title': article['title'],
            'filename': filename,
            'slug': article['slug']
        }
    else:
        print("❌ Could not parse article")
        return None

# =============================================================================
# PASTE ONE ARTICLE CONTENT BELOW
# =============================================================================

single_article_content = """
Article 16

How to Secure Fast Business Funding in Australia: A Complete Guide

Emet Capital | Fast Business Funding Solutions

Introduction

In today's competitive business environment, access to fast funding can make the difference between seizing an opportunity and watching it slip away. Whether you're looking to expand operations, manage cash flow, or invest in new equipment, understanding your fast funding options is crucial for Australian businesses.

What is Fast Business Funding?

Fast business funding refers to financing solutions that can be approved and disbursed quickly, typically within 24-48 hours to a few weeks. Unlike traditional bank loans that may take months to process, fast funding options are designed for businesses that need immediate capital injection.

Types of Fast Business Funding Available

ASSET-BASED LENDING
Asset-based lending allows businesses to borrow against their existing assets, including property, equipment, or inventory. This type of funding is often processed faster because the collateral reduces lender risk.

BRIDGING LOANS
Bridging loans provide short-term financing to bridge timing gaps, such as when purchasing new premises before selling existing property. These loans can often be approved within days.

CAVEAT LOANS
Caveat loans are secured against property and can be processed extremely quickly, sometimes within 24 hours. They're ideal for businesses needing immediate capital for time-sensitive opportunities.

ALTERNATIVE LENDERS
Non-bank lenders often have more flexible criteria and faster approval processes than traditional banks, making them popular for urgent funding needs.

When to Consider Fast Funding

Fast funding solutions are most appropriate when:
• Time-sensitive business opportunities arise
• Cash flow gaps need immediate attention
• Equipment purchases can't wait for lengthy approval processes
• Property settlements require quick bridging finance
• Emergency business expenses occur

Benefits of Fast Business Funding

SPEED OF APPROVAL
The primary advantage is rapid access to capital, with some lenders providing approval within hours rather than weeks or months.

FLEXIBLE CRITERIA
Fast funding providers often have more flexible lending criteria, considering factors beyond just credit scores and financial statements.

OPPORTUNITY CAPITALISATION
Quick access to funds allows businesses to act on time-sensitive opportunities that traditional lending timeframes would prevent.

CASH FLOW MANAGEMENT
Fast funding can help businesses manage seasonal fluctuations or unexpected expenses without disrupting operations.

Requirements for Fast Funding

While fast funding has fewer requirements than traditional loans, applicants typically need:
• Valid ABN and business registration
• Proof of income or business revenue
• Asset documentation (for secured loans)
• Basic business financial information

How to Apply for Fast Business Funding

ASSESS YOUR NEEDS
Determine exactly how much funding you need and for what purpose. This clarity helps lenders process applications faster.

GATHER DOCUMENTATION
Prepare basic business documents, financial statements, and asset information to expedite the application process.

CHOOSE THE RIGHT LENDER
Research lenders who specialise in your type of business and funding requirements. Some focus on specific industries or loan types.

SUBMIT YOUR APPLICATION
Complete applications accurately and provide all requested information upfront to avoid delays in processing.

REVIEW TERMS CAREFULLY
Fast funding often comes with higher interest rates, so ensure you understand all terms and can meet repayment obligations.

Costs and Considerations

Fast business funding typically involves:
• Higher interest rates than traditional bank loans
• Additional fees for expedited processing
• Shorter repayment terms
• More stringent default consequences

However, the speed and flexibility often justify these costs when urgent funding is needed.

Choosing the Right Fast Funding Solution

Consider these factors when selecting fast funding:
• Your specific business needs and timeline
• Available collateral or assets
• Repayment capacity and terms
• Lender reputation and transparency
• Total cost of the funding solution

Alternative Fast Funding Options

INVOICE FACTORING
Sell outstanding invoices to access immediate cash flow, though this isn't technically a loan.

MERCHANT CASH ADVANCES
Receive upfront cash in exchange for a percentage of future sales, though rates can be very high.

PEER-TO-PEER LENDING
Online platforms connecting businesses with individual investors, offering potentially faster approval than banks.

Conclusion

Fast business funding can be a valuable tool for Australian businesses needing immediate capital. While these solutions come at a premium compared to traditional financing, the speed and flexibility they offer can be crucial for capitalising on opportunities or managing urgent business needs.

The key is understanding your options, choosing reputable lenders, and ensuring any funding solution aligns with your business's capacity to repay. When used strategically, fast funding can help businesses grow and thrive in competitive markets.

FAQs

How fast can I get business funding approved?
Approval times vary by lender and loan type, but some fast funding solutions can be approved within 24 hours. Caveat loans and asset-based lending typically offer the fastest approval times.

What's the difference between fast funding and traditional bank loans?
Fast funding prioritises speed over lengthy due diligence processes. While traditional bank loans may offer lower rates, they typically take weeks or months to approve, whereas fast funding can be accessed within days.

Do I need perfect credit for fast business funding?
Not necessarily. Many fast funding providers focus more on business assets, cash flow, and repayment capacity rather than just credit scores. However, better credit will typically result in more favourable terms.

What are the typical interest rates for fast business funding?
Interest rates for fast funding are generally higher than traditional bank loans, often ranging from 8% to 25% annually, depending on the risk profile and loan type.

Can I use fast funding for any business purpose?
Most fast funding can be used for legitimate business purposes, including equipment purchases, working capital, property investments, or business expansion. Some lenders may have restrictions on certain uses.

Glossary

Asset-Based Lending: Financing secured against business assets such as property, equipment, or inventory.

Bridging Loan: Short-term financing used to bridge timing gaps, often in property transactions.

Caveat Loan: A secured loan where a legal notice (caveat) is placed on property title as security.

Due Diligence: The investigation and verification process lenders undertake before approving loans.

Merchant Cash Advance: Upfront cash provided in exchange for a percentage of future business sales.
"""

# =============================================================================
# MAIN PROCESSING
# =============================================================================

def main():
    print("🚀 SINGLE ARTICLE PROCESSOR")
    print("=" * 40)
    
    if "PASTE SINGLE ARTICLE CONTENT HERE" in single_article_content:
        print("❌ Please paste your single article content in the single_article_content variable above")
        print("📝 Instructions:")
        print("   1. Copy ONE article from your Word document")
        print("   2. Paste it between the triple quotes above")
        print("   3. Run this script")
        print("   4. Repeat for each article")
        return
    
    print("📝 Processing single article...")
    result = process_single_article(single_article_content)
    
    if result:
        print(f"\n✅ Article processed successfully!")
        print(f"📁 File saved to: src/content/guides/{result['filename']}")
        print(f"🔄 Ready for the next article!")
    else:
        print("❌ Article processing failed")

if __name__ == "__main__":
    main()
