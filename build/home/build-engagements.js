const path = require('path');
const utils = require('../utils');

function buildEngagements() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'engagements');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'engagements.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cases = utils.readCollection(contentDir, ['section.md', 'advisory-*.md']).map(item => ({
        image: item.image,
        title: item.title,
        description: item.body,
        client: item.client,
        duration: item.duration,
        outcomes: item.outcomes
    }));
    const advises = utils.readCollection(contentDir, ['section.md', 'case-*.md']).map(item => ({
        image: item.image,
        title: item.title,
        quote: item.body
    }));

    const result = {
        data: {
            eyebrow: header.data.eyebrow,
            h2: header.data.h2,
            cards: cases
        },
        adviseData: {
            tagline: header.data.adviseTagline,
            title: header.data.adviseTitle,
            description: header.data.adviseDescription,
            cards: advises
        }
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/engagements.json');
    return result;
}

if (require.main === module) {
    buildEngagements();
}

module.exports = buildEngagements;
