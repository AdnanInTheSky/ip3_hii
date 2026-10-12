const path = require('path');
const utils = require('../utils');

function buildPublications() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'publications');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'publications.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        image: item.image,
        tag: item.tag,
        title: item.title,
        authors: item.authors,
        published: item.published,
        abstract: item.abstract,
        description: item.body,
        takeaways: item.takeaways
    }));

    const result = {
        tagline: header.data.tagline,
        title: header.data.title,
        description: header.data.description,
        tags: header.data.tags,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/publications.json');
    return result;
}

if (require.main === module) {
    buildPublications();
}

module.exports = buildPublications;
