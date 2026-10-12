const buildPoilicyEco = require('./build-poilicy-eco');
const buildPolicyClimate = require('./build-policy-climate');
const buildPolicyData = require('./build-policy-data');
const buildPolicyDesign = require('./build-policy-design');
const buildPolicyEdu = require('./build-policy-edu');
const buildPolicyInnov = require('./build-policy-innov');
const buildPolicyMon = require('./build-policy-mon');

function buildAllService() {
    console.log('Building all service data files from markdown...');
    buildPoilicyEco();
    buildPolicyClimate();
    buildPolicyData();
    buildPolicyDesign();
    buildPolicyEdu();
    buildPolicyInnov();
    buildPolicyMon();
    console.log('✓ Successfully built all service data files.\n');
}

if (require.main === module) {
    buildAllService();
}

module.exports = buildAllService;
