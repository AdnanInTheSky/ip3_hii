const path = require('path');
const utils = require('../utils');

function buildPoilicyEco() {
    const mdPath = path.join(__dirname, '..', '..', 'content', 'service', 'poilicy_eco.md');
    const destPath = path.join(__dirname, '..', '..', 'data', 'service', 'poilicy_eco.json');

    const { data } = utils.parseMarkdownFile(mdPath);
    utils.writeJsonFile(destPath, data);
    console.log('✓ Rebuilt data/service/poilicy_eco.json');
    return data;
}

if (require.main === module) {
    buildPoilicyEco();
}

module.exports = buildPoilicyEco;
