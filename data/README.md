# EMET Capital Content Automation - Data Directory

This directory contains the CSV files needed for automated daily content publishing.

## Required Files

### 1. emet_ai_feed_daily.csv
- **Source**: Your main content CSV with daily article data
- **Contains**: Articles scheduled for publication with full content and metadata
- **Key columns**: date, slot, title, json_header, body_html, post_url, section_key, etc.

### 2. interlinks.csv  
- **Source**: Your internal linking strategy CSV
- **Contains**: Cross-references between articles for SEO optimization
- **Key columns**: source_file, target_url, anchor, relation, etc.

## Setup Instructions

1. **Copy your CSV files here:**
   ```
   cp /path/to/your/emet_ai_feed_daily.csv data/
   cp /path/to/your/interlinks.csv data/
   ```

2. **Verify the files are correct:**
   ```bash
   # Check the CSV structure
   head -1 data/emet_ai_feed_daily.csv
   head -1 data/interlinks.csv
   ```

3. **Test the automation system:**
   ```bash
   # Dry run to see what would be published today
   python scripts/publish_from_sot.py \
     --csv data/emet_ai_feed_daily.csv \
     --published-dir src/content \
     --dry-run
   ```

## File Formats

### emet_ai_feed_daily.csv expected columns:
- date (YYYY-MM-DD format)
- slot (Morning/Afternoon)
- title
- json_header (complete JSON metadata)
- body_html (article content)
- post_url (publication URL)
- section_key (content section)
- menu_label (navigation label)
- proposed_link_out_json (internal links)

### interlinks.csv expected columns:
- source_file (filename.md)
- target_url (link destination)
- anchor (link text)
- relation (link relationship)

## Automation Schedule

Once set up, the system automatically publishes:
- **06:00 AEST**: Morning article
- **14:00 AEST**: Afternoon article

## Security Notes

- CSV files may contain sensitive business content
- Consider adding data/*.csv to .gitignore if content is confidential
- GitHub Actions will need access to these files for automation
