#!/usr/bin/env python3
"""
Enhanced Daily Publishing System for Word Document Articles
Integrates with the Word document processor for seamless publishing.
"""

import os
import pandas as pd
from datetime import datetime, timedelta
import pytz
from pathlib import Path
import glob

class WordDocumentPublisher:
    def __init__(self):
        self.base_path = Path(__file__).parent.parent
        self.guides_path = self.base_path / "src" / "content" / "guides"
        self.scheduled_path = self.base_path / "data" / "scheduled_articles.csv"
        self.timezone = pytz.timezone('Australia/Sydney')
        
    def scan_for_new_articles(self):
        """Scan guides directory for new articles"""
        articles = []
        
        for md_file in self.guides_path.glob("*.md"):
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract frontmatter
            if content.startswith('---\n'):
                end_frontmatter = content.find('\n---\n', 4)
                if end_frontmatter > 0:
                    frontmatter = content[4:end_frontmatter]
                    
                    # Parse basic frontmatter
                    meta = {}
                    for line in frontmatter.split('\n'):
                        if ':' in line:
                            key, value = line.split(':', 1)
                            meta[key.strip()] = value.strip().strip('"')
                    
                    articles.append({
                        'filename': md_file.name,
                        'title': meta.get('title', ''),
                        'slug': meta.get('slug', md_file.stem),
                        'date_created': meta.get('date', ''),
                        'category': meta.get('category', 'guides'),
                        'published': False  # Default to not published
                    })
        
        return articles
    
    def create_publishing_schedule(self, articles, start_date=None):
        """Create a publishing schedule for articles (2 per day at 06:00 and 14:00 AEST)"""
        if start_date is None:
            start_date = datetime.now(self.timezone).date()
        
        schedule = []
        current_date = start_date
        
        # Publishing times (AEST)
        morning_time = "06:00"
        afternoon_time = "14:00"
        
        for i, article in enumerate(articles):
            # Alternate between morning and afternoon
            if i % 2 == 0:
                publish_time = morning_time
            else:
                publish_time = afternoon_time
                
            schedule.append({
                'filename': article['filename'],
                'title': article['title'],
                'slug': article['slug'],
                'category': article['category'],
                'scheduled_date': current_date.strftime('%Y-%m-%d'),
                'scheduled_time': publish_time,
                'published': False,
                'url': f"/resources/{article['category']}/{article['slug']}"
            })
            
            # Move to next day after afternoon slot
            if i % 2 == 1:
                current_date += timedelta(days=1)
        
        return schedule
    
    def save_schedule(self, schedule):
        """Save publishing schedule to CSV"""
        df = pd.DataFrame(schedule)
        df.to_csv(self.scheduled_path, index=False)
        print(f"📅 Saved publishing schedule with {len(schedule)} articles")
        print(f"📁 Schedule saved to: {self.scheduled_path}")
        
        # Show first few entries
        print("\n📋 Upcoming publications:")
        for i, item in enumerate(schedule[:6]):
            print(f"   {item['scheduled_date']} {item['scheduled_time']} - {item['title']}")
            if i == 5 and len(schedule) > 6:
                print(f"   ... and {len(schedule) - 6} more")
                break
    
    def load_schedule(self):
        """Load existing publishing schedule"""
        try:
            return pd.read_csv(self.scheduled_path)
        except FileNotFoundError:
            return pd.DataFrame()
    
    def get_ready_to_publish(self):
        """Get articles ready to publish now"""
        schedule_df = self.load_schedule()
        if schedule_df.empty:
            return []
        
        now = datetime.now(self.timezone)
        current_date = now.strftime('%Y-%m-%d')
        current_time = now.strftime('%H:%M')
        
        # Find articles scheduled for today at or before current time
        ready = schedule_df[
            (schedule_df['scheduled_date'] == current_date) &
            (schedule_df['scheduled_time'] <= current_time) &
            (schedule_df['published'] == False)
        ]
        
        return ready.to_dict('records')
    
    def mark_published(self, filename):
        """Mark an article as published"""
        schedule_df = self.load_schedule()
        schedule_df.loc[schedule_df['filename'] == filename, 'published'] = True
        schedule_df.to_csv(self.scheduled_path, index=False)
    
    def setup_new_articles(self, start_date=None):
        """Set up publishing schedule for new articles"""
        print("🔍 Scanning for new articles...")
        articles = self.scan_for_new_articles()
        
        if not articles:
            print("❌ No articles found in guides directory")
            return
        
        print(f"📚 Found {len(articles)} articles")
        
        # Filter out already scheduled articles
        existing_schedule = self.load_schedule()
        if not existing_schedule.empty:
            scheduled_files = set(existing_schedule['filename'])
            new_articles = [a for a in articles if a['filename'] not in scheduled_files]
        else:
            new_articles = articles
        
        if not new_articles:
            print("✅ All articles already scheduled")
            return
        
        print(f"📝 Creating schedule for {len(new_articles)} new articles...")
        schedule = self.create_publishing_schedule(new_articles, start_date)
        
        # Merge with existing schedule
        if not existing_schedule.empty:
            existing_list = existing_schedule.to_dict('records')
            schedule = existing_list + schedule
        
        self.save_schedule(schedule)
        print("✅ Publishing schedule updated!")

def main():
    """Main function for command line usage"""
    publisher = WordDocumentPublisher()
    
    import sys
    if len(sys.argv) > 1:
        if sys.argv[1] == "schedule":
            # Set up new publishing schedule
            start_date = None
            if len(sys.argv) > 2:
                try:
                    start_date = datetime.strptime(sys.argv[2], '%Y-%m-%d').date()
                except ValueError:
                    print("❌ Invalid date format. Use YYYY-MM-DD")
                    return
            
            publisher.setup_new_articles(start_date)
            
        elif sys.argv[1] == "check":
            # Check what's ready to publish
            ready = publisher.get_ready_to_publish()
            if ready:
                print(f"📰 {len(ready)} articles ready to publish:")
                for article in ready:
                    print(f"   - {article['title']}")
            else:
                print("✅ No articles scheduled for now")
                
        elif sys.argv[1] == "status":
            # Show schedule status
            schedule_df = publisher.load_schedule()
            if schedule_df.empty:
                print("❌ No publishing schedule found")
            else:
                total = len(schedule_df)
                published = len(schedule_df[schedule_df['published'] == True])
                pending = total - published
                print(f"📊 Publishing Status:")
                print(f"   Total articles: {total}")
                print(f"   Published: {published}")
                print(f"   Pending: {pending}")
    else:
        print("📰 Word Document Publisher")
        print("Usage:")
        print("  python3 word_publisher.py schedule [YYYY-MM-DD]  - Create/update publishing schedule")
        print("  python3 word_publisher.py check                  - Check articles ready to publish")
        print("  python3 word_publisher.py status                 - Show publishing status")

if __name__ == "__main__":
    main()
