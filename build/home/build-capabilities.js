const path = require('path');
const utils = require('../utils');

function buildCapabilities() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'capabilities');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'capabilities.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        title: item.title,
        problem: item.problem,
        deliverables: item.deliverables
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/capabilities.json');
    return result;
}

if (require.main === module) {
    buildCapabilities();
}

module.exports = buildCapabilities;
