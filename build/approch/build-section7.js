const path = require('path');
const utils = require('../utils');

function buildSection7() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'approch', 'section7');
    const destPath = path.join(__dirname, '..', '..', 'data', 'approch', 'section7.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        title: item.title,
        text: item.text || item.body
    }));

    const result = {
        subtitle: header.data.subtitle,
        title: header.data.title,
        paragraph: header.data.paragraph,
        backgroundImage: header.data.backgroundImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
        cards,
        subsection: {
            subtitle: header.data.subsectionSubtitle,
            title: header.data.subsectionTitle,
            description: header.data.subsectionDescription,
            leftTitle: header.data.leftTitle,
            leftItems: header.data.leftItems,
            rightTitle: header.data.rightTitle,
            rightItems: header.data.rightItems,
            togetherTitle: header.data.togetherTitle,
            togetherDescription: header.data.togetherDescription
        }
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/approch/section7.json');
    return result;
}

if (require.main === module) {
    buildSection7();
}

module.exports = buildSection7;
