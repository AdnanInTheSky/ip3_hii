const path = require('path');
const utils = require('../utils');

function buildHero() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'hero');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'hero.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const slides = utils.readCollection(contentDir, ['section.md']).map(({ order, _file, body, ...rest }) => rest);

    const result = {
        data: header.data,
        slides
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/hero.json');
    return result;
}

if (require.main === module) {
    buildHero();
}

module.exports = buildHero;
