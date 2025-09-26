# ⚠️ EMET CAPITAL DAILY AUTOMATION DISABLED

**Date Disabled**: September 26, 2025
**Reason**: User request to turn off daily article posting functionality

## What was disabled:
- ✅ GitHub Actions workflow: `publish-daily-content.yml` → renamed to `.disabled`
- ✅ Daily publishing at 06:00 and 14:00 AEST stopped
- ✅ Automatic content processing from CSV data halted

## Backup files created:
- `data/emet_ai_feed_daily.csv.backup` - Main content data
- `data/scheduled_articles.csv` - Publishing schedule (preserved)

## To re-enable automation:
1. Rename `.github/workflows/publish-daily-content.yml.disabled` back to `.yml`
2. Ensure CSV files are present in `data/` directory
3. Commit and push changes

## Manual publishing options still available:
```bash
# Publish specific date content manually
python scripts/publish_from_sot.py --csv data/emet_ai_feed_daily.csv --dry-run

# Process Word documents manually  
python scripts/word_workflow.py
```

---
*Note: All existing published content remains live and unchanged.*