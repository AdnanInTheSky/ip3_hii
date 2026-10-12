const path = require('path');
const utils = require('../utils');

function buildLeadership() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'leadership');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'leadership.json');

    const lead = utils.parseMarkdownFile(path.join(contentDir, 'dr-amara-singh.md'));

    const result = {
        eyebrow: lead.data.eyebrow,
        name: lead.data.name,
        position: lead.data.position,
        bio: lead.body,
        image: lead.data.image
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/leadership.json');
    return result;
}

if (require.main === module) {
    buildLeadership();
}

module.exports = buildLeadership;
