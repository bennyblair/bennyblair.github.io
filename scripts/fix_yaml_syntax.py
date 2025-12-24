import glob
import os

def fix_yaml_syntax():
    files = glob.glob('src/content/guides/*.md')
    fixed_count = 0
    print(f"Checking {len(files)} files...")
    
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check for the specific syntax error: --- followed by an empty line
        if content.startswith('---\n\n'):
            print(f"Fixing {os.path.basename(file_path)}")
            # Remove the extra newline
            new_content = '---\n' + content[5:]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            fixed_count += 1
            
    print(f"Finished. Fixed {fixed_count} files.")

if __name__ == "__main__":
    fix_yaml_syntax()
