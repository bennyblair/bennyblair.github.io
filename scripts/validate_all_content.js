import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDirs = [
    path.join(__dirname, '../src/content/guides'),
    path.join(__dirname, '../src/content/case-studies')
];

let errorCount = 0;

contentDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        console.log(`Directory not found: ${dir}`);
        return;
    }

    console.log(`Scanning ${dir}...`);
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(dir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            try {
                matter(content);
            } catch (e) {
                console.error(`\nERROR in ${file}:`);
                console.error(e.message);
                errorCount++;
                
                // Check for specific issues
                if (content.startsWith('---\n\n')) {
                    console.error("  -> Starts with --- followed by empty line");
                }
                
                const lines = content.split('\n');
                for (let i = 0; i < Math.min(lines.length, 20); i++) {
                    const line = lines[i];
                    if (line.includes(':') && !line.startsWith('---') && !line.startsWith('#')) {
                        // Check if it's a key-value pair in frontmatter
                        if (i > 0 && lines[i-1].trim() === '---') {
                             // This is the first line of frontmatter
                        }
                        
                        // Simple check for unquoted colons in values
                        const parts = line.split(':');
                        if (parts.length > 2) {
                             // Likely has a colon in the value
                             const value = parts.slice(1).join(':').trim();
                             if (!value.startsWith('"') && !value.startsWith("'") && !value.startsWith('[')) {
                                 console.error(`  -> Potential unquoted colon in value at line ${i+1}: ${line}`);
                             }
                        }
                    }
                }
            }
        }
    });
});

console.log(`\nScan complete. Found ${errorCount} errors.`);
if (errorCount > 0) {
    process.exit(1);
}
