const path = require('path');
const utils = require('../utils');

function buildSectors() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'sectors');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'sectors.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        image: item.image,
        title: item.title,
        description: item.body,
        focusAreas: item.focusAreas
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        sub: header.data.sub,
        tagline: header.data.tagline,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/sectors.json');
    return result;
}

if (require.main === module) {
    buildSectors();
}

module.exports = buildSectors;
