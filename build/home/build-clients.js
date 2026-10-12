const path = require('path');
const utils = require('../utils');

function buildClients() {
    const contentDir = path.join(__dirname, '..', '..', 'content', 'home', 'clients');
    const destPath = path.join(__dirname, '..', '..', 'data', 'home', 'clients.json');

    const header = utils.parseMarkdownFile(path.join(contentDir, 'section.md'));
    const logos = utils.readCollection(contentDir, ['section.md']).map(item => ({
        name: item.name,
        logo: item.logo
    }));

    const result = {
        tagline: header.data.tagline,
        title: header.data.title,
        description: header.data.description,
        logos
    };

    utils.writeJsonFile(destPath, result);
    console.log('✓ Rebuilt data/home/clients.json');
    return result;
}

if (require.main === module) {
    buildClients();
}

module.exports = buildClients;
