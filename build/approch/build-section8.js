const path = require('path');
const utils = require('../utils');

function buildSection8() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'approch', 'section8');
    const destPath = path.join(__dirname, '..', '..', 'data', 'approch', 'section8.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const diffs = utils.readCollection(contentDir, ['section.md', 'reality-*.md']).map(item => ({
        title: item.title,
        text: item.text || item.body
    }));
    const realities = utils.readCollection(contentDir, ['section.md', 'diff-*.md']).map(item => ({
        title: item.title,
        text: item.text || item.body
    }));

    const result = {
        subtitle: header.data.subtitle,
        title: header.data.title,
        paragraph: header.data.paragraph,
        backgroundImage: header.data.backgroundImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop',
        cards: (header.data.pillars || []).map(p => ({ text: p })),
        subsection1: {
            title: header.data.subsection1Title,
            paragraph: header.data.subsection1Paragraph,
            cards: diffs
        },
        subsection2: {
            title: header.data.subsection2Title,
            paragraph: header.data.subsection2Paragraph,
            cards: realities
        }
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/approch/section8.json');
    return result;
}

if (require.main === module) {
    buildSection8();
}

module.exports = buildSection8;
