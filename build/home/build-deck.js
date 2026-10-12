const path = require('path');
const utils = require('../utils');

function buildDeck() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'deck');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'deck.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        image: item.image,
        tag: item.tag,
        title: item.title,
        overview: item.overview,
        description: item.body,
        highlights: item.highlights
    }));

    const result = {
        tagline: header.data.tagline,
        title: header.data.title,
        description: header.data.description,
        tags: header.data.tags,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/deck.json');
    return result;
}

if (require.main === module) {
    buildDeck();
}

module.exports = buildDeck;
