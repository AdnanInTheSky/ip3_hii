const buildHero = require('./build-hero');
const buildMandates = require('./build-mandates');
const buildCapabilities = require('./build-capabilities');
const buildWhyIp3 = require('./build-why-ip3');
const buildSectors = require('./build-sectors');
const buildTranslation = require('./build-translation');
const buildEngagements = require('./build-engagements');
const buildResearch = require('./build-research');
const buildEvidence = require('./build-evidence');
const buildConvening = require('./build-convening');
const buildClients = require('./build-clients');
const buildEndorsements = require('./build-endorsements');
const buildDeck = require('./build-deck');
const buildPublications = require('./build-publications');
const buildLeadership = require('./build-leadership');
const buildContact = require('./build-contact');
const buildFaq = require('./build-faq');
const buildOrganization = require('./build-organization');

function buildAllHome() {
    console.log('Building all home data files from markdown...');
    buildHero();
    buildMandates();
    buildCapabilities();
    buildWhyIp3();
    buildSectors();
    buildTranslation();
    buildEngagements();
    buildResearch();
    buildEvidence();
    buildConvening();
    buildClients();
    buildEndorsements();
    buildDeck();
    buildPublications();
    buildLeadership();
    buildContact();
    buildFaq();
    buildOrganization();
    console.log('✓ Successfully built all home data files.\n');
}

if (require.main === module) {
    buildAllHome();
}

module.exports = buildAllHome;
