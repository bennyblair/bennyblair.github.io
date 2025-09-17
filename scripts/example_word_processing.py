#!/usr/bin/env python3
"""
EXAMPLE: How to Process Your Word Documents
Copy this pattern for future Word document processing
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from scripts.word_workflow import process_word_document_workflow
from datetime import datetime

# STEP 1: Paste your Word document content here
word_content = """
Article 1
Your Article Title Here
Emet Capital | Resources → Guides
Introduction
Your article introduction content here...

Main Content Section
Your main content here...

Conclusion
Your conclusion here...

FAQs
What is this about?
This is an example FAQ answer.

Are there more questions?
Yes, you can add as many as needed.

Article 2
Second Article Title
Emet Capital | Resources → Guides
Introduction
Second article content...
"""

# STEP 2: Run the workflow
def example_processing():
    """Example of processing Word documents"""
    
    print("🚀 EXAMPLE: Processing Word Document")
    print("This is how you'll process your future Word documents")
    print()
    
    # Optional: Set a specific start date for publishing
    # start_date = datetime(2025, 9, 20).date()  # Uncomment and adjust date
    start_date = None  # Use today
    
    # Process the content
    result = process_word_document_workflow(word_content, start_date)
    
    if result:
        print("\n✅ EXAMPLE COMPLETE!")
        print("Your real Word documents will follow this same pattern.")

if __name__ == "__main__":
    # Run example
    example_processing()
    
    print("\n" + "="*50)
    print("INSTRUCTIONS FOR YOUR REAL WORD DOCUMENTS:")
    print("="*50)
    print()
    print("1. Open this file: scripts/example_word_processing.py")
    print("2. Replace the word_content with your actual Word document text")
    print("3. Run: python3 scripts/example_word_processing.py")
    print("4. That's it! Articles will be processed and scheduled")
    print()
    print("💡 TIP: Keep this file for future processing!")
    print("Just change the word_content and run again.")
