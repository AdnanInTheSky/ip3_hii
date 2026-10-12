const path = require('path');
const utils = require('../utils');

function buildConvening() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'convening');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'convening.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        image: item.image,
        label: item.label,
        description: item.body
    }));

    const result = {
        sectionTagline: header.data.sectionTagline,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/convening.json');
    return result;
}

if (require.main === module) {
    buildConvening();
}

module.exports = buildConvening;
