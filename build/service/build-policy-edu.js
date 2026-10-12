const path = require('path');
const utils = require('../utils');

function buildPolicyEdu() {
    const mdPath = path.join(__dirname, '..', '..', 'content', 'service', 'policy_edu.md');
    const destPath = path.join(__dirname, '..', '..', 'data', 'service', 'policy_edu.json');

    const { data } = utils.parseMarkdownFile(mdPath);
    utils.writeJsonFile(destPath, data);
    console.log('✓ Rebuilt data/service/policy_edu.json');
    return data;
}

if (require.main === module) {
    buildPolicyEdu();
}

module.exports = buildPolicyEdu;
