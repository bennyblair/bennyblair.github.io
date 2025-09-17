#!/usr/bin/env python3
"""
Complete Word Document Workflow for Emet Capital
Process Word documents → Generate articles → Schedule publishing
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.process_word_content import process_word_content
from scripts.word_publisher import WordDocumentPublisher
from datetime import datetime, timedelta
import pytz

def process_word_document_workflow(word_content, start_publishing_date=None):
    """
    Complete workflow:
    1. Process Word document content into markdown articles
    2. Set up automated publishing schedule
    3. Generate summary report
    """
    
    print("🚀 EMET CAPITAL WORD DOCUMENT PROCESSOR")
    print("=" * 50)
    
    # Step 1: Process articles
    print("\n📝 STEP 1: Processing Word Document Content...")
    processed_articles = process_word_content(word_content)
    
    if not processed_articles:
        print("❌ No articles were processed")
        return
    
    print(f"✅ Successfully processed {len(processed_articles)} articles")
    for article in processed_articles:
        print(f"   📄 {article['title']}")
        print(f"      → {article['filename']}")
    
    # Step 2: Set up publishing schedule
    print(f"\n📅 STEP 2: Setting Up Publishing Schedule...")
    publisher = WordDocumentPublisher()
    publisher.setup_new_articles(start_publishing_date)
    
    # Step 3: Generate summary
    print(f"\n📊 STEP 3: Workflow Summary")
    print("=" * 30)
    
    # Calculate publishing timeline
    if start_publishing_date:
        start_date = start_publishing_date
    else:
        start_date = datetime.now(pytz.timezone('Australia/Sydney')).date()
    
    # Show publishing schedule
    print(f"\n📋 Publishing Timeline (Starting {start_date}):")
    print("   📅 2 articles per day at 06:00 and 14:00 AEST")
    
    days_needed = (len(processed_articles) + 1) // 2
    end_date = start_date + timedelta(days=days_needed - 1)
    
    print(f"   🏁 All articles published by: {end_date}")
    print(f"   ⏱️  Publishing window: {days_needed} days")
    
    # Show next steps
    print(f"\n🔄 Next Steps:")
    print("   1. Articles are ready and scheduled")
    print("   2. GitHub Actions will publish automatically")
    print("   3. Check status with: python3 scripts/word_publisher.py status")
    print("   4. Manual publish check: python3 scripts/word_publisher.py check")
    
    # SEO Summary
    print(f"\n🎯 SEO Summary:")
    print(f"   📰 {len(processed_articles)} new articles added")
    print("   🔗 Automatic internal linking applied")
    print("   📱 Mobile-optimized markdown format")
    print("   🔍 SEO-optimized meta descriptions and keywords")
    
    return {
        'processed_articles': processed_articles,
        'start_date': start_date,
        'end_date': end_date,
        'days_needed': days_needed
    }

def main():
    """Example usage"""
    print("EMET Capital Word Document Processor")
    print("=====================================")
    print("")
    print("To use this workflow:")
    print("1. Copy your Word document content")
    print("2. Paste it into the word_content variable below")
    print("3. Run the workflow")
    print("")
    print("Example:")
    print('word_content = """')
    print('Article 1')
    print('Your Article Title Here')
    print('Emet Capital | Resources → Guides')
    print('Introduction')
    print('Your article content...')
    print('"""')
    print("")
    print('result = process_word_document_workflow(word_content)')

if __name__ == "__main__":
    main()
