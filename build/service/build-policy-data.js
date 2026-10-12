const path = require('path');
const utils = require('../utils');

function buildPolicyData() {
    const mdPath = path.join(__dirname, '..', '..', 'content', 'service', 'policy_data.md');
    const destPath = path.join(__dirname, '..', '..', 'data', 'service', 'policy_data.json');

    const { data } = utils.parseMarkdownFile(mdPath);
    utils.writeJsonFile(destPath, data);
    console.log('✓ Rebuilt data/service/policy_data.json');
    return data;
}

if (require.main === module) {
    buildPolicyData();
}

module.exports = buildPolicyData;
