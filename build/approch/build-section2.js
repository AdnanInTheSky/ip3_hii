const path = require('path');
const utils = require('../utils');

function buildSection2() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'approch', 'section2');
    const destPath = path.join(__dirname, '..', '..', 'data', 'approch', 'section2.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const items = utils.readCollection(contentDir, ['section.md']).map(item => ({
        title: item.title,
        category: item.category,
        image: item.image
    }));

    const result = {
        subtitle: header.data.subtitle,
        title: header.data.title,
        paragraph: header.data.paragraph,
        items
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/approch/section2.json');
    return result;
}

if (require.main === module) {
    buildSection2();
}

module.exports = buildSection2;
