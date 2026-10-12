const path = require('path');
const utils = require('../utils');

function buildPolicyDesign() {
    const mdPath = path.join(__dirname, '..', '..', 'content', 'service', 'policy_design.md');
    const destPath = path.join(__dirname, '..', '..', 'data', 'service', 'policy_design.json');

    const { data } = utils.parseMarkdownFile(mdPath);
    utils.writeJsonFile(destPath, data);
    console.log('✓ Rebuilt data/service/policy_design.json');
    return data;
}

if (require.main === module) {
    buildPolicyDesign();
}

module.exports = buildPolicyDesign;
