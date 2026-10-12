const path = require('path');
const utils = require('../utils');

function buildSection1() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'approch', 'section1');
    const destPath = path.join(__dirname, '..', '..', 'data', 'approch', 'section1.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        text: item.text
    }));

    const result = {
        subtitle: header.data.subtitle,
        title: header.data.title,
        paragraph: header.data.paragraph,
        buttonText: header.data.buttonText,
        backgroundImage: header.data.backgroundImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
        backgroundVideo: header.data.backgroundVideo || '',
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/approch/section1.json');
    return result;
}

if (require.main === module) {
    buildSection1();
}

module.exports = buildSection1;
