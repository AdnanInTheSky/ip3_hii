const path = require('path');
const utils = require('../utils');

function buildSidebar() {
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'sidebar.json');
    const result = {
        heading: 'Navigation',
        startSection: 'mandates',
        endSection: 'contact',
        sections: [
            { id: 'mandates', title: 'Mandates', number: '01' },
            { id: 'capabilities', title: 'Capabilities', number: '02' },
            { id: 'why-ip3', title: 'Why IP3', number: '03' },
            { id: 'sectors', title: 'Sectors', number: '04' },
            { id: 'translation', title: 'Workflow', number: '05' },
            { id: 'engagements', title: 'Engagements', number: '06' },
            { id: 'research', title: 'Research', number: '07' },
            { id: 'evidence', title: 'Evidence', number: '08' },
            { id: 'convening', title: 'Convening', number: '09' },
            { id: 'deck', title: 'Deck', number: '10' },
            { id: 'clients', title: 'Clients', number: '11' },
            { id: 'publications', title: 'Publications', number: '12' },
            { id: 'leadership', title: 'Leadership', number: '13' },
            { id: 'contact', title: 'Contact', number: '14' }
        ]
    };
    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/sidebar.json');
    return result;
}

if (require.main === module) {
    buildSidebar();
}

module.exports = buildSidebar;
