const path = require('path');
const utils = require('../utils');

function buildPolicyClimate() {
    const mdPath = path.join(__dirname, '..', '..', 'content', 'service', 'policy_climate.md');
    const destPath = path.join(__dirname, '..', '..', 'data', 'service', 'policy_climate.json');

    const { data } = utils.parseMarkdownFile(mdPath);
    utils.writeJsonFile(destPath, data);
    console.log('✓ Rebuilt data/service/policy_climate.json');
    return data;
}

if (require.main === module) {
    buildPolicyClimate();
}

module.exports = buildPolicyClimate;
