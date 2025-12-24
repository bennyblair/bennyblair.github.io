import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const guidesDir = path.join(__dirname, '../src/content/guides');

console.log(`Scanning ${guidesDir}...`);

try {
    const files = fs.readdirSync(guidesDir);
    let errorCount = 0;

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(guidesDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            try {
                matter(content);
            } catch (e) {
                console.error(`Error in ${file}:`);
                console.error(e.message);
                errorCount++;
                
                // Attempt to fix common errors
                if (e.message.includes('incomplete explicit mapping pair')) {
                     console.log(`Attempting to fix ${file}...`);
                     // Check for the --- \n \n pattern
                     if (content.startsWith('---\n\n')) {
                         const newContent = '---\n' + content.substring(5);
                         fs.writeFileSync(filePath, newContent);
                         console.log('Fixed extra newline.');
                     } else {
                         console.log('Could not automatically fix.');
                     }
                }
            }
        }
    });

    console.log(`Scan complete. Found ${errorCount} errors.`);

} catch (e) {
    console.error("Error reading directory:", e);
}
