const path = require('path');
const utils = require('../utils');

function buildContact() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'contact');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'contact.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const paths = utils.readCollection(contentDir, ['section.md']).map(item => ({
        title: item.title,
        description: item.body
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        sub: header.data.sub,
        paths,
        focusAreas: header.data.focusAreas
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/contact.json');
    return result;
}

if (require.main === module) {
    buildContact();
}

module.exports = buildContact;
