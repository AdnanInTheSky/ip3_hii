const path = require('path');
const utils = require('../utils');

function buildResearch() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'research');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'research.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const cards = utils.readCollection(contentDir, ['section.md']).map(item => ({
        image: item.image,
        title: item.title,
        description: item.body,
        researchType: item.researchType,
        region: item.region,
        year: String(item.year),
        findings: item.findings
    }));

    const result = {
        tagline: header.data.tagline,
        title: header.data.title,
        description: header.data.description,
        cards
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/research.json');
    return result;
}

if (require.main === module) {
    buildResearch();
}

module.exports = buildResearch;
