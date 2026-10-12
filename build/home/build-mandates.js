const path = require('path');
const utils = require('../utils');

function buildMandates() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'mandates');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'mandates.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        title: item.title,
        description: item.body
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        body: header.body,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/mandates.json');
    return result;
}

if (require.main === module) {
    buildMandates();
}

module.exports = buildMandates;
