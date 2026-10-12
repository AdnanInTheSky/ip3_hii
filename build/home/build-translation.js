const path = require('path');
const utils = require('../utils');

function buildTranslation() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'translation');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'translation.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const nodes = utils.readCollection(contentDir, ['section.md', 'dropdown-*.md']).map(item => ({
        title: item.title,
        description: item.body
    }));
    const dropdowns = utils.readCollection(contentDir, ['section.md', 'node-*.md']).map(item => ({
        question: item.question,
        items: item.items
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        sub: header.data.sub,
        nodes,
        dropdowns
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/translation.json');
    return result;
}

if (require.main === module) {
    buildTranslation();
}

module.exports = buildTranslation;
