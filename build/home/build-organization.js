const path = require('path');
const utils = require('../utils');

function buildOrganization() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'organization');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'organization.json');

    const org = utils.parseMarkdownFile(path.join(contentDir, 'organization.md'));

    const result = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        legalName: org.data.legalName,
        alternateName: org.data.alternateName,
        url: org.data.url,
        email: org.data.email,
        telephone: org.data.telephone,
        address: {
            '@type': 'PostalAddress',
            streetAddress: org.data.streetAddress,
            addressLocality: org.data.addressLocality,
            postalCode: String(org.data.postalCode),
            addressCountry: org.data.addressCountry
        }
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/organization.json');
    return result;
}

if (require.main === module) {
    buildOrganization();
}

module.exports = buildOrganization;
