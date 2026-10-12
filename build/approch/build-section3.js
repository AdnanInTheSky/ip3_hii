const path = require('path');
const utils = require('../utils');

function buildSection3() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'approch', 'section3');
    const destPath = path.join(__dirname, '..', '..', 'data', 'approch', 'section3.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const questionCards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        title: item.title,
        text: item.text || item.body
    }));

    const result = {
        subtitle: header.data.subtitle,
        title: header.data.title,
        paragraph: header.data.paragraph,
        currentState: {
            title: header.data.currentStateTitle,
            items: header.data.currentStateItems
        },
        desiredState: {
            title: header.data.desiredStateTitle,
            items: header.data.desiredStateItems
        },
        questionCards,
        bigCard: {
            title: header.data.frameworkTitle,
            items: header.data.frameworkItems,
            image: header.data.frameworkImage
        }
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/approch/section3.json');
    return result;
}

if (require.main === module) {
    buildSection3();
}

module.exports = buildSection3;
