import https from 'https';

const BASE_URL = 'https://emetcapital.com.au'; // Non-www as per policy
const WWW_URL = 'https://www.emetcapital.com.au';

const urlsToCheck = [
    { url: `${WWW_URL}/`, expectedStatus: 301, expectedRedirect: `${BASE_URL}/` },
    { url: `${BASE_URL}/`, expectedStatus: 200 },
    { url: `${BASE_URL}/about-us`, expectedStatus: 301, expectedRedirect: `${BASE_URL}/about` },
    { url: `${BASE_URL}/commercial-property-development`, expectedStatus: 301, expectedRedirect: `${BASE_URL}/services/commercial-property-development` },
    { url: `${BASE_URL}/resources/tools/commercial-property-loan-calculator`, expectedStatus: 301, expectedRedirect: `${BASE_URL}/tools/commercial-property-loan-calculator` },
    { url: `${BASE_URL}/apply-now`, expectedStatus: 301, expectedRedirect: `${BASE_URL}/contact` },
    { url: `${BASE_URL}/copy-of-working-capital`, expectedStatus: 410 },
    { url: `${BASE_URL}/robots.txt`, expectedStatus: 200 },
    { url: `${BASE_URL}/sitemap.xml`, expectedStatus: 200 },
];

function checkUrl(item) {
    return new Promise((resolve) => {
        const req = https.request(item.url, { method: 'HEAD' }, (res) => {
            const result = {
                url: item.url,
                status: res.statusCode,
                location: res.headers.location,
                pass: false,
                message: ''
            };

            if (res.statusCode === item.expectedStatus) {
                if (item.expectedRedirect) {
                    // Netlify might return relative or absolute redirects
                    const location = res.headers.location;
                    if (location === item.expectedRedirect || location === item.expectedRedirect.replace(BASE_URL, '')) {
                        result.pass = true;
                    } else {
                        result.message = `Expected redirect to ${item.expectedRedirect}, got ${location}`;
                    }
                } else {
                    result.pass = true;
                }
            } else {
                result.message = `Expected status ${item.expectedStatus}, got ${res.statusCode}`;
            }
            resolve(result);
        });

        req.on('error', (e) => {
            resolve({ url: item.url, status: 'ERROR', pass: false, message: e.message });
        });

        req.end();
    });
}

async function runVerification() {
    console.log('Starting SEO Verification...');
    console.log('Note: This script must be run against the DEPLOYED site.');
    
    let passed = 0;
    for (const item of urlsToCheck) {
        const result = await checkUrl(item);
        if (result.pass) {
            console.log(`✅ ${result.url} -> ${result.status} ${result.location || ''}`);
            passed++;
        } else {
            console.log(`❌ ${result.url} -> ${result.status} ${result.location || ''}`);
            console.log(`   Error: ${result.message}`);
        }
    }

    console.log(`\nVerification Complete: ${passed}/${urlsToCheck.length} passed.`);
}

runVerification();
