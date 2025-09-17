#!/usr/bin/env python3
"""
Process Word document articles into optimized markdown files for the website.
Handles the Emet Capital article format with SEO optimization and backlinking.
"""

import re
import json
import os
from datetime import datetime, timedelta
import pandas as pd
import pytz
from pathlib import Path

class WordArticleProcessor:
    def __init__(self):
        self.base_path = Path(__file__).parent.parent
        self.content_path = self.base_path / "src" / "content"
        self.guides_path = self.content_path / "guides"
        self.interlinks_path = self.base_path / "data" / "interlinks.csv"
        
        # Ensure directories exist
        self.guides_path.mkdir(parents=True, exist_ok=True)
        
        # Load existing interlinks for backlinking
        self.load_interlinks()
        
    def load_interlinks(self):
        """Load existing interlinks data for automatic backlinking"""
        try:
            self.interlinks_df = pd.read_csv(self.interlinks_path)
            print(f"Loaded {len(self.interlinks_df)} existing interlinks")
            
            # Check if this is the old format and adapt
            if 'target_url' in self.interlinks_df.columns:
                # Convert old format to new format for compatibility
                print("Converting old interlinks format...")
                self.interlinks_df = self.interlinks_df.rename(columns={
                    'target_url': 'URL',
                    'anchor': 'Keywords'
                })
                # Add missing columns
                if 'Title' not in self.interlinks_df.columns:
                    self.interlinks_df['Title'] = self.interlinks_df['URL'].apply(
                        lambda x: x.split('/')[-1].replace('-', ' ').title() if x else ''
                    )
                if 'Category' not in self.interlinks_df.columns:
                    self.interlinks_df['Category'] = 'guides'
                    
        except FileNotFoundError:
            print("No existing interlinks found, creating new structure")
            self.interlinks_df = pd.DataFrame(columns=['Title', 'URL', 'Keywords', 'Category'])
    
    def parse_article_content(self, content):
        """Parse a single article from the Word document format"""
        articles = []
        
        # Split by article headers (Article X)
        article_pattern = r'Article (\d+)\n(.+?)(?=Article \d+|$)'
        matches = re.findall(article_pattern, content, re.DOTALL)
        
        for article_num, article_content in matches:
            article = self.parse_single_article(article_num, article_content.strip())
            if article:
                articles.append(article)
                
        return articles
    
    def parse_single_article(self, article_num, content):
        """Parse a single article's content"""
        lines = content.split('\n')
        article = {
            'article_number': int(article_num),
            'title': '',
            'breadcrumb': '',
            'meta_description': '',
            'keywords': [],
            'category': 'guides',
            'content_sections': [],
            'faqs': [],
            'glossary': [],
            'related_links': [],
            'json_ld': '',
            'slug': ''
        }
        
        current_section = None
        current_content = []
        
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            # Extract title (first non-empty line)
            if not article['title'] and line:
                article['title'] = line
                article['slug'] = self.create_slug(line)
                i += 1
                continue
                
            # Extract breadcrumb
            if line.startswith('Emet Capital |'):
                article['breadcrumb'] = line
                i += 1
                continue
                
            # Handle different sections
            if line == 'Introduction':
                if current_section:
                    article['content_sections'].append({
                        'heading': current_section,
                        'content': '\n'.join(current_content).strip()
                    })
                current_section = 'Introduction'
                current_content = []
            elif line == 'FAQs':
                if current_section:
                    article['content_sections'].append({
                        'heading': current_section,
                        'content': '\n'.join(current_content).strip()
                    })
                article['faqs'] = self.parse_faqs(lines[i+1:])
                break
            elif line == 'Glossary':
                article['glossary'] = self.parse_glossary(lines[i+1:])
            elif line.startswith('Links to Related Guides'):
                article['related_links'] = self.parse_related_links(lines[i+1:])
            elif line.startswith('<script type="application/ld+json">'):
                # Extract JSON-LD
                json_start = i
                json_end = i
                for j in range(i, len(lines)):
                    if '</script>' in lines[j]:
                        json_end = j
                        break
                article['json_ld'] = '\n'.join(lines[json_start:json_end+1])
                break
            elif line and not line.startswith('•') and not line.startswith('-') and line.isupper() and len(line.split()) <= 5:
                # New section heading
                if current_section:
                    article['content_sections'].append({
                        'heading': current_section,
                        'content': '\n'.join(current_content).strip()
                    })
                current_section = line.title()
                current_content = []
            else:
                if line:
                    current_content.append(line)
                    
            i += 1
        
        # Add final section
        if current_section and current_content:
            article['content_sections'].append({
                'heading': current_section,
                'content': '\n'.join(current_content).strip()
            })
        
        # Extract meta description from JSON-LD or first paragraph
        article['meta_description'] = self.extract_meta_description(article)
        article['keywords'] = self.extract_keywords(article)
        
        return article
    
    def create_slug(self, title):
        """Create URL-friendly slug from title"""
        slug = title.lower()
        slug = re.sub(r'[^a-z0-9\s-]', '', slug)
        slug = re.sub(r'\s+', '-', slug)
        return slug.strip('-')
    
    def extract_meta_description(self, article):
        """Extract meta description from JSON-LD or create from content"""
        if article['json_ld']:
            try:
                # Extract description from JSON-LD
                json_match = re.search(r'"description":\s*"([^"]+)"', article['json_ld'])
                if json_match:
                    return json_match.group(1)
            except:
                pass
        
        # Fallback: use first paragraph of introduction
        for section in article['content_sections']:
            if section['heading'] == 'Introduction':
                sentences = section['content'].split('.')
                if sentences:
                    return sentences[0].strip() + '.'
        
        return f"Learn about {article['title'].lower()} for Australian businesses."
    
    def extract_keywords(self, article):
        """Extract relevant keywords from the article"""
        keywords = []
        title = article['title'].lower()
        
        # Common private lending keywords
        lending_keywords = [
            'private lending', 'business loans', 'second mortgage', 'caveat loans',
            'bridging loans', 'commercial finance', 'property finance', 'short term loans',
            'business funding', 'commercial lending', 'asset finance', 'working capital'
        ]
        
        for keyword in lending_keywords:
            if keyword in title or any(keyword in section['content'].lower() 
                                     for section in article['content_sections']):
                keywords.append(keyword)
        
        # Add title-specific keywords
        title_words = title.split()
        for word in title_words:
            if len(word) > 3 and word not in ['what', 'when', 'where', 'how', 'for', 'the', 'and', 'or']:
                keywords.append(word)
        
        return keywords[:8]  # Limit to 8 keywords
    
    def parse_faqs(self, lines):
        """Parse FAQ section"""
        faqs = []
        current_question = None
        current_answer = []
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            if line == 'Glossary' or line.startswith('Links to Related'):
                break
            if line.endswith('?'):
                if current_question:
                    faqs.append({
                        'question': current_question,
                        'answer': '\n'.join(current_answer).strip()
                    })
                current_question = line
                current_answer = []
            else:
                current_answer.append(line)
        
        if current_question:
            faqs.append({
                'question': current_question,
                'answer': '\n'.join(current_answer).strip()
            })
        
        return faqs
    
    def parse_glossary(self, lines):
        """Parse glossary section"""
        glossary = []
        for line in lines:
            line = line.strip()
            if not line or line.startswith('Links to Related'):
                break
            if ':' in line:
                term, definition = line.split(':', 1)
                glossary.append({
                    'term': term.strip(),
                    'definition': definition.strip()
                })
        return glossary
    
    def parse_related_links(self, lines):
        """Parse related links section"""
        links = []
        for line in lines:
            line = line.strip()
            if not line or line.startswith('JSON-LD'):
                break
            if line.startswith('•') or line.startswith('-'):
                link_text = line[1:].strip()
                links.append(link_text)
        return links
    
    def add_backlinks(self, content):
        """Add relevant backlinks to content based on existing articles"""
        if self.interlinks_df.empty:
            return content
        
        # Find opportunities to add internal links
        for _, row in self.interlinks_df.iterrows():
            # Check if Keywords column exists and has value
            if 'Keywords' not in row or pd.isna(row['Keywords']):
                continue
                
            keywords = str(row['Keywords']).split(',')
            for keyword in keywords:
                keyword = keyword.strip().lower()
                if len(keyword) > 3:
                    # Simple replacement (first occurrence only)
                    pattern = r'\b' + re.escape(keyword) + r'\b'
                    replacement = f'[{keyword}]({row["URL"]})'
                    content = re.sub(pattern, replacement, content, count=1, flags=re.IGNORECASE)
        
        return content
    
    def generate_markdown(self, article):
        """Generate optimized markdown content"""
        publish_date = datetime.now(pytz.timezone('Australia/Sydney')).strftime('%Y-%m-%d')
        
        # Build frontmatter
        frontmatter = f"""---
title: "{article['title']}"
description: "{article['meta_description']}"
date: {publish_date}
category: {article['category']}
slug: {article['slug']}
keywords: {json.dumps(article['keywords'])}
---

"""
        
        # Build content
        content_parts = []
        
        for section in article['content_sections']:
            if section['heading'] == 'Introduction':
                content_parts.append(section['content'])
            else:
                content_parts.append(f"\n## {section['heading']}\n\n{section['content']}")
        
        # Add FAQs
        if article['faqs']:
            content_parts.append("\n## Frequently Asked Questions\n")
            for faq in article['faqs']:
                content_parts.append(f"### {faq['question']}\n\n{faq['answer']}\n")
        
        # Add glossary
        if article['glossary']:
            content_parts.append("\n## Glossary\n")
            for item in article['glossary']:
                content_parts.append(f"**{item['term']}**: {item['definition']}\n")
        
        # Add related links
        if article['related_links']:
            content_parts.append("\n## Related Guides\n")
            for link in article['related_links']:
                # Convert to proper internal links
                slug = self.create_slug(link)
                content_parts.append(f"- [{link}](/resources/guides/{slug})")
        
        content = '\n'.join(content_parts)
        
        # Add backlinks
        content = self.add_backlinks(content)
        
        return frontmatter + content
    
    def process_articles(self, word_content):
        """Process all articles from Word document content"""
        articles = self.parse_article_content(word_content)
        processed_files = []
        
        for article in articles:
            markdown_content = self.generate_markdown(article)
            filename = f"{article['slug']}.md"
            filepath = self.guides_path / filename
            
            # Write file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(markdown_content)
            
            processed_files.append({
                'filename': filename,
                'title': article['title'],
                'slug': article['slug'],
                'filepath': str(filepath)
            })
            
            # Add to interlinks
            self.add_to_interlinks(article)
            
            print(f"✅ Created: {filename}")
        
        # Save updated interlinks
        self.save_interlinks()
        
        return processed_files
    
    def add_to_interlinks(self, article):
        """Add article to interlinks database"""
        new_row = {
            'Title': article['title'],
            'URL': f"/resources/guides/{article['slug']}",
            'Keywords': ', '.join(article['keywords']),
            'Category': article['category']
        }
        
        # Check if already exists
        existing = self.interlinks_df[self.interlinks_df['URL'] == new_row['URL']]
        if existing.empty:
            self.interlinks_df = pd.concat([self.interlinks_df, pd.DataFrame([new_row])], ignore_index=True)
    
    def save_interlinks(self):
        """Save updated interlinks to CSV"""
        self.interlinks_df.to_csv(self.interlinks_path, index=False)
        print(f"📝 Updated interlinks with {len(self.interlinks_df)} entries")

def main():
    """Main processing function"""
    processor = WordArticleProcessor()
    
    # For now, we'll expect the content to be provided
    # In practice, you would paste the Word document content here
    print("Word Article Processor ready!")
    print("Usage: Copy content from Word document and call processor.process_articles(content)")
    
    return processor

if __name__ == "__main__":
    processor = main()
