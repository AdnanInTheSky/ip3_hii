const buildSection1 = require('./build-section1');
const buildSection2 = require('./build-section2');
const buildSection3 = require('./build-section3');
const buildSection4 = require('./build-section4');
const buildSection5 = require('./build-section5');
const buildSection6 = require('./build-section6');
const buildSection7 = require('./build-section7');
const buildSection8 = require('./build-section8');

function buildAllApproch() {
    console.log('Building all approach data files from markdown...');
    buildSection1();
    buildSection2();
    buildSection3();
    buildSection4();
    buildSection5();
    buildSection6();
    buildSection7();
    buildSection8();
    console.log('✓ Successfully built all approach data files.\n');
}

if (require.main === module) {
    buildAllApproch();
}

module.exports = buildAllApproch;
