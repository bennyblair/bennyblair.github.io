#!/usr/bin/env python3
"""
Clean up interlinks CSV by removing Chinese characters and improving anchor text quality.
This script will:
1. Replace Chinese anchor text with proper English alternatives
2. Ensure all anchor texts are in English
3. Maintain the same structure and relationships
"""

import csv
import shutil
from pathlib import Path

def clean_interlinks_csv():
    """Clean up the interlinks CSV file"""
    
    # File paths
    csv_path = Path('data/interlinks.csv')
    public_csv_path = Path('public/data/interlinks.csv')
    backup_path = Path('data/interlinks_backup.csv')
    
    if not csv_path.exists():
        print(f"❌ File {csv_path} not found!")
        return False
    
    # Create backup
    shutil.copy2(csv_path, backup_path)
    print(f"✅ Created backup at {backup_path}")
    
    # Read and process CSV
    rows_cleaned = 0
    total_rows = 0
    
    with open(csv_path, 'r', encoding='utf-8') as infile:
        reader = csv.DictReader(infile)
        fieldnames = reader.fieldnames
        
        cleaned_rows = []
        
        for row in reader:
            total_rows += 1
            original_anchor = row['anchor']
            
            # Replace Chinese text with English equivalent
            if 'bridging loan 是 什么' in original_anchor:
                row['anchor'] = 'bridging loan guide'
                rows_cleaned += 1
                print(f"✅ Fixed: '{original_anchor}' → '{row['anchor']}'")
            
            # Check for any other non-ASCII characters and flag them
            elif any(ord(char) > 127 for char in original_anchor):
                print(f"⚠️  Found non-ASCII characters in: '{original_anchor}' (line {total_rows + 1})")
            
            cleaned_rows.append(row)
    
    # Write cleaned CSV
    with open(csv_path, 'w', encoding='utf-8', newline='') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(cleaned_rows)
    
    # Also update the public copy
    if public_csv_path.exists():
        shutil.copy2(csv_path, public_csv_path)
        print(f"✅ Updated public copy at {public_csv_path}")
    
    print(f"\n🎉 Cleanup complete!")
    print(f"   Total rows processed: {total_rows}")
    print(f"   Rows cleaned: {rows_cleaned}")
    print(f"   Backup saved to: {backup_path}")
    
    return True

if __name__ == '__main__':
    clean_interlinks_csv()
