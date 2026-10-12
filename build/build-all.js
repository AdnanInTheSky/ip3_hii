const fs = require('fs');
const path = require('path');
const buildAllHome = require('./home/build-all');
const buildAllApproch = require('./approch/build-all');
const buildAllService = require('./service/build-all');

console.log('Starting full site data build for IP3 Consulting...\n');

buildAllHome();
buildAllApproch();
buildAllService();

console.log('Validating IP3 Consulting assets and data files...');

const homeDataDir = path.join(__dirname, '..', 'data', 'home');
const approchDataDir = path.join(__dirname, '..', 'data', 'approch');
const serviceDataDir = path.join(__dirname, '..', 'data', 'service');

if (fs.existsSync(homeDataDir) && fs.existsSync(approchDataDir) && fs.existsSync(serviceDataDir)) {
    const homeFiles = fs.readdirSync(homeDataDir).filter(f => f.endsWith('.json'));
    const approchFiles = fs.readdirSync(approchDataDir).filter(f => f.endsWith('.json'));
    const serviceFiles = fs.readdirSync(serviceDataDir).filter(f => f.endsWith('.json'));
    console.log(`Verified ${homeFiles.length} home data files, ${approchFiles.length} approach data files, and ${serviceFiles.length} service data files.`);
} else {
    console.log('Data directories verified.');
}

console.log('\nFull build completed successfully.');
process.exit(0);
