const path = require('path');
const utils = require('../utils');

function buildWhyIp3() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'why-ip3');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'why-ip3.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const reasons = utils.readCollection(contentDir, ['section.md']).map(item => ({
        number: item.number,
        title: item.title,
        description: item.body,
        link: item.link,
        linkText: item.linkText
    }));

    const result = {
        eyebrow: header.data.eyebrow,
        h2: header.data.h2,
        image: header.data.image,
        reasons
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/why-ip3.json');
    return result;
}

if (require.main === module) {
    buildWhyIp3();
}

module.exports = buildWhyIp3;
