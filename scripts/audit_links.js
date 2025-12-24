import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDirs = [
    { path: path.join(__dirname, '../src/content/guides'), type: 'guide', urlPrefix: '/resources/guides/' },
    { path: path.join(__dirname, '../src/content/case-studies'), type: 'case-study', urlPrefix: '/resources/case-studies/' }
];

const appPath = path.join(__dirname, '../src/App.tsx');

// 1. Get all valid content slugs
const validContent = {
    guides: new Set(),
    caseStudies: new Set()
};

contentDirs.forEach(dir => {
    if (fs.existsSync(dir.path)) {
        const files = fs.readdirSync(dir.path);
        files.forEach(file => {
            if (path.extname(file) === '.md') {
                const slug = path.basename(file, '.md');
                if (dir.type === 'guide') validContent.guides.add(slug);
                if (dir.type === 'case-study') validContent.caseStudies.add(slug);
            }
        });
    }
});

// 2. Get all valid routes from App.tsx
const validRoutes = new Set();
const appContent = fs.readFileSync(appPath, 'utf8');
const routeRegex = /<Route path="([^"]+)"/g;
let match;
while ((match = routeRegex.exec(appContent)) !== null) {
    validRoutes.add(match[1]);
}

// Add implicit routes or variations
validRoutes.add('/');

// 3. Scan files for links
let brokenLinks = [];

contentDirs.forEach(dir => {
    if (!fs.existsSync(dir.path)) return;
    
    const files = fs.readdirSync(dir.path);
    files.forEach(file => {
        if (path.extname(file) !== '.md') return;
        
        const filePath = path.join(dir.path, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Regex for markdown links [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let linkMatch;
        
        while ((linkMatch = linkRegex.exec(content)) !== null) {
            const text = linkMatch[1];
            const url = linkMatch[2];
            
            // Ignore external links, anchors, and mailto
            if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:')) continue;
            
            let isValid = false;
            let cleanUrl = url.split('#')[0]; // Remove anchor for validation
            
            // Check against content
            if (cleanUrl.startsWith('/resources/guides/')) {
                const slug = cleanUrl.replace('/resources/guides/', '');
                if (validContent.guides.has(slug)) isValid = true;
            } else if (cleanUrl.startsWith('/guides/')) {
                 // Legacy path check
                 const slug = cleanUrl.replace('/guides/', '');
                 if (validContent.guides.has(slug)) isValid = true;
            } else if (cleanUrl.startsWith('/resources/case-studies/')) {
                const slug = cleanUrl.replace('/resources/case-studies/', '');
                if (validContent.caseStudies.has(slug)) isValid = true;
            } else if (cleanUrl.startsWith('/case-studies/')) {
                 // Legacy path check
                 const slug = cleanUrl.replace('/case-studies/', '');
                 if (validContent.caseStudies.has(slug)) isValid = true;
            } else {
                // Check against App.tsx routes
                // Handle dynamic routes like /resources/guides/:slug
                // We already checked specific content paths, so here we check static routes
                if (validRoutes.has(cleanUrl)) {
                    isValid = true;
                } else {
                    // Check if it matches a dynamic route pattern (simplified)
                    // e.g. /services/something might match /services/* or specific routes
                    // For now, let's check if the exact path exists in validRoutes
                    // If not, check if it's a known legacy redirect (we can read _redirects later if needed)
                }
            }
            
            if (!isValid) {
                brokenLinks.push({
                    file: file,
                    text: text,
                    url: url
                });
            }
        }
    });
});

// 4. Report
if (brokenLinks.length > 0) {
    console.log(`Found ${brokenLinks.length} potentially broken internal links:`);
    brokenLinks.forEach(link => {
        console.log(`File: ${link.file}`);
        console.log(`  Link: [${link.text}](${link.url})`);
        console.log('---');
    });
} else {
    console.log('No broken internal links found.');
}
