const path = require('path');
const utils = require('../utils');

function buildSection6() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'approch', 'section6');
    const destPath = path.join(__dirname, '..', '..', 'data', 'approch', 'section6.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const orbitItems = utils.readCollection(contentDir, ['section.md']).map(item => ({
        shortLabel: item.shortLabel,
        label: item.label,
        description: item.description || item.body
    }));

    const result = {
        subtitle: header.data.subtitle,
        title: header.data.title,
        paragraph: header.data.paragraph,
        orbitItems,
        iterateText: header.data.iterateText,
        tags: header.data.tags,
        questionText: header.data.questionText,
        questionAnswer: header.data.questionAnswer,
        showQuestion: header.data.showQuestion
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/approch/section6.json');
    return result;
}

if (require.main === module) {
    buildSection6();
}

module.exports = buildSection6;
