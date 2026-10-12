const path = require('path');
const utils = require('../utils');

function buildEndorsements() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'endorsements');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'endorsements.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const endorsements = utils.readCollection(contentDir, ['section.md']).map(item => ({
        quote: item.body,
        endorser: item.endorser,
        title: item.title,
        organization: item.organization,
        image: item.image
    }));

    const result = {
        tagline: header.data.tagline,
        title: header.data.title,
        description: header.data.description,
        endorsements
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/endorsements.json');
    return result;
}

if (require.main === module) {
    buildEndorsements();
}

module.exports = buildEndorsements;
