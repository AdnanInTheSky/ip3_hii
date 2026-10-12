const path = require('path');
const utils = require('../utils');

function buildPolicyInnov() {
    const mdPath = path.join(__dirname, '..', '..', 'content', 'service', 'policy_innov.md');
    const destPath = path.join(__dirname, '..', '..', 'data', 'service', 'policy_innov.json');

    const { data } = utils.parseMarkdownFile(mdPath);
    utils.writeJsonFile(destPath, data);
    console.log('✓ Rebuilt data/service/policy_innov.json');
    return data;
}

if (require.main === module) {
    buildPolicyInnov();
}

module.exports = buildPolicyInnov;
