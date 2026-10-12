const path = require('path');
const utils = require('../utils');

function buildSection5() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'approch', 'section5');
    const destPath = path.join(__dirname, '..', '..', 'data', 'approch', 'section5.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        title: item.title,
        text: item.text,
        image: item.image,
        bullets: item.bullets,
        paragraph: item.paragraph || item.body
    }));

    const result = {
        subtitle: header.data.subtitle,
        title: header.data.title,
        paragraph: header.data.paragraph,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/approch/section5.json');
    return result;
}

if (require.main === module) {
    buildSection5();
}

module.exports = buildSection5;
