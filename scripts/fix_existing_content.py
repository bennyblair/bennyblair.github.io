#!/usr/bin/env python3
"""
Fix existing published content by cleaning up formatting and removing any remaining issues.
This script will process all existing markdown files to apply the new formatting standards.
"""

import os
import re
from pathlib import Path

def clean_content(content):
    """Clean up content formatting issues"""
    
    # Remove Chinese characters
    content = re.sub(r'[一-龯]+', '', content)
    content = re.sub(r'bridging loan 是 什么', 'bridging loan guide', content)
    
    # Remove excessive repetition (common in AI content)
    lines = content.split('\n')
    seen_paragraphs = set()
    cleaned_lines = []
    
    for line in lines:
        # Skip empty lines
        if not line.strip():
            cleaned_lines.append(line)
            continue
            
        # Check if this is a paragraph (not heading, list, etc.)
        if not line.startswith(('#', '-', '*', '|', '<', '```')) and len(line.strip()) > 20:
            # Normalize for comparison
            normalized = re.sub(r'[^\w\s]', '', line.lower()).strip()
            if normalized in seen_paragraphs:
                print(f"  Removing duplicate: {line[:50]}...")
                continue
            seen_paragraphs.add(normalized)
        
        cleaned_lines.append(line)
    
    content = '\n'.join(cleaned_lines)
    
    # Fix spacing issues
    content = re.sub(r'\n{3,}', '\n\n', content)  # Max 2 line breaks
    content = re.sub(r'([.!?])\s*([A-Z])', r'\1 \2', content)  # Proper sentence spacing
    
    # Fix quote marks
    content = re.sub(r'"([^"]*)"', r'"\1"', content)
    
    # Fix dash usage
    content = re.sub(r'(\w)\s*[-–—]\s*(\w)', r'\1—\2', content)
    
    # Ensure proper heading spacing
    content = re.sub(r'([^\n])\n(#{1,6}\s)', r'\1\n\n\2', content)
    content = re.sub(r'(#{1,6}[^\n]*)\n([^#\n])', r'\1\n\n\2', content)
    
    # Fix table formatting
    lines = content.split('\n')
    in_table = False
    formatted_lines = []
    
    for line in lines:
        if '|' in line and not line.startswith('<'):
            if not in_table:
                in_table = True
                if formatted_lines and formatted_lines[-1].strip():
                    formatted_lines.append('')  # Add space before table
            
            # Clean up table row
            cells = [cell.strip() for cell in line.split('|')]
            if cells and not cells[0]:  # Remove empty first cell
                cells = cells[1:]
            if cells and not cells[-1]:  # Remove empty last cell
                cells = cells[:-1]
            
            if cells:  # Only add if we have actual content
                formatted_lines.append('|' + '|'.join(f' {cell} ' for cell in cells) + '|')
        else:
            if in_table and line.strip():
                formatted_lines.append('')  # Add space after table
                in_table = False
            formatted_lines.append(line)
    
    content = '\n'.join(formatted_lines)
    
    return content

def process_file(file_path):
    """Process a single markdown file"""
    print(f"Processing: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_size = len(content)
        cleaned_content = clean_content(content)
        new_size = len(cleaned_content)
        
        # Only write if content changed significantly
        if abs(original_size - new_size) > 50 or '是' in content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(cleaned_content)
            
            print(f"  ✅ Updated: {original_size} → {new_size} chars")
        else:
            print(f"  ℹ️  No significant changes needed")
            
    except Exception as e:
        print(f"  ❌ Error processing {file_path}: {e}")

def main():
    """Process all content directories"""
    base_dir = Path('src/content')
    
    if not base_dir.exists():
        print("❌ Content directory not found!")
        return
    
    print("🧹 Fixing existing published content...\n")
    
    total_files = 0
    
    # Process all content types
    for content_type in ['guides', 'case-studies', 'insights']:
        content_dir = base_dir / content_type
        
        if not content_dir.exists():
            print(f"⚠️  Directory {content_dir} doesn't exist, skipping")
            continue
            
        print(f"📁 Processing {content_type}:")
        
        # Process all markdown files
        md_files = list(content_dir.glob('*.md'))
        
        if not md_files:
            print(f"  No markdown files found in {content_type}")
            continue
        
        for file_path in md_files:
            process_file(file_path)
            total_files += 1
        
        print()
    
    print(f"🎉 Completed! Processed {total_files} files")
    print("Next steps:")
    print("1. Review the changes with: git diff")
    print("2. Commit and deploy: git add -A && git commit -m 'Fix existing content formatting' && git push")

if __name__ == '__main__':
    main()
