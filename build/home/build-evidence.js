const path = require('path');
const utils = require('../utils');

function buildEvidence() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'evidence');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'evidence.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        image: item.image,
        title: item.title,
        description: item.body,
        type: item.type,
        date: item.date,
        author: item.author,
        related: item.related,
        insights: item.insights
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        sub: header.data.sub,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/evidence.json');
    return result;
}

if (require.main === module) {
    buildEvidence();
}

module.exports = buildEvidence;
