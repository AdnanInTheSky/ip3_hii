const path = require('path');
const utils = require('../utils');

function buildFaq() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'faq');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'faq.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const items = utils.readCollection(contentDir, ['section.md']).map(item => ({
        question: item.question,
        answer: item.body
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        items
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/faq.json');
    return result;
}

if (require.main === module) {
    buildFaq();
}

module.exports = buildFaq;
