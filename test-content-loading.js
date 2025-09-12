// Simple test to see what content files are available
const fs = require('fs');
const path = require('path');

const guidesDir = path.join(__dirname, 'src/content/guides');
console.log('Checking guides directory:', guidesDir);

try {
  const files = fs.readdirSync(guidesDir);
  console.log('Found files:', files);
  
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(guidesDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      console.log(`\n${file}:`);
      console.log(`  - Lines: ${lines.length}`);
      console.log(`  - First line: ${lines[0]}`);
      console.log(`  - Has frontmatter: ${content.startsWith('---')}`);
    }
  });
} catch (error) {
  console.error('Error reading guides directory:', error);
}
