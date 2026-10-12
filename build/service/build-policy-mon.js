const path = require('path');
const utils = require('../utils');

function buildPolicyMon() {
    const mdPath = path.join(__dirname, '..', '..', 'content', 'service', 'policy_mon.md');
    const destPath = path.join(__dirname, '..', '..', 'data', 'service', 'policy_mon.json');

    const { data } = utils.parseMarkdownFile(mdPath);
    utils.writeJsonFile(destPath, data);
    console.log('✓ Rebuilt data/service/policy_mon.json');
    return data;
}

if (require.main === module) {
    buildPolicyMon();
}

module.exports = buildPolicyMon;
