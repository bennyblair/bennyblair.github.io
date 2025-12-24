import os
import re

guides_dir = 'src/content/guides'

def fix_legacy_links():
    count = 0
    for filename in os.listdir(guides_dir):
        if filename.endswith('.md'):
            filepath = os.path.join(guides_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace ](/guides/ with ](/resources/guides/
            # We use a regex to ensure we don't double-replace if I run this twice (though simple string replace is also fine if careful)
            # Simple string replace is safer: content.replace('](/guides/', '](/resources/guides/')
            
            new_content = content.replace('](/guides/', '](/resources/guides/')
            
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed links in: {filename}")
                count += 1
    
    print(f"\nTotal files updated: {count}")

if __name__ == "__main__":
    fix_legacy_links()
