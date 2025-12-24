import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const guidesDir = path.join(__dirname, '../src/content/guides');

// Define Critical Service Pages
const servicePages = [
    '/services/private-lending',
    '/services/asset-backed-lending',
    '/services/bridging-finance',
    '/services/asset-finance',
    '/services/commercial-property-development',
    '/services/working-capital',
    '/services/business-acquisition',
    '/services/caveat-loans',
    '/services/first-second-mortgages',
    '/services/debt-consolidation',
    '/services/refinancing-solutions',
    '/services/equipment-finance',
    '/services/trade-finance',
    '/services/smsf-lending'
];

// Define Pillar Articles (Core Guides)
const pillarArticles = [
    '/resources/guides/commercial-property-loans-australia-complete-guide',
    '/resources/guides/construction-finance-australia-complete-guide',
    '/resources/guides/caveat-loans-australia-complete-guide',
    '/resources/guides/invoice-finance-australia-complete-guide',
    '/resources/guides/mezzanine-finance-australia-complete-guide',
    '/resources/guides/bridging-finance-australia-complete-property-guide',
    '/resources/guides/private-commercial-real-estate-lenders-cre-directory'
];

function auditContent() {
    if (!fs.existsSync(guidesDir)) {
        console.error(`Directory not found: ${guidesDir}`);
        return;
    }

    const files = fs.readdirSync(guidesDir).filter(file => file.endsWith('.md'));
    
    const results = {
        totalFiles: files.length,
        missingServiceLinks: [],
        missingPillarLinks: [],
        wellLinked: []
    };

    files.forEach(file => {
        const filePath = path.join(guidesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const slug = '/resources/guides/' + path.basename(file, '.md');

        // Check for Service Links
        const hasServiceLink = servicePages.some(service => content.includes(service));

        // Check for Pillar Links (excluding self)
        const hasPillarLink = pillarArticles.some(pillar => {
            if (pillar === slug) return false; // Don't count link to self
            return content.includes(pillar);
        });

        if (!hasServiceLink) {
            results.missingServiceLinks.push(file);
        }

        if (!hasPillarLink) {
            // If this file IS a pillar page, it's okay if it doesn't link to another pillar (though it should ideally)
            // But for strict audit, let's report it.
            results.missingPillarLinks.push(file);
        }

        if (hasServiceLink && hasPillarLink) {
            results.wellLinked.push(file);
        }
    });

    console.log('--- SEO Internal Link Audit Report ---');
    console.log(`Total Articles Scanned: ${results.totalFiles}`);
    console.log(`Articles with Good Linking (Service + Pillar): ${results.wellLinked.length}`);
    console.log('\n--- Articles Missing Service Page Links ---');
    if (results.missingServiceLinks.length === 0) {
        console.log('None! All articles link to at least one service page.');
    } else {
        results.missingServiceLinks.forEach(f => console.log(`- ${f}`));
    }

    console.log('\n--- Articles Missing Pillar Content Links ---');
    if (results.missingPillarLinks.length === 0) {
        console.log('None! All articles link to at least one pillar article.');
    } else {
        results.missingPillarLinks.forEach(f => console.log(`- ${f}`));
    }
}

auditContent();
