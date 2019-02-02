/* eslint-disable no-plusplus */
const application = require('../backend/application');
const appData = require('../backend/data/app.json');

const { simulationSequence } = require('./functions');

function runSim(n) {
    const simResult = [];
    for (let i = 0; i < n; i++) {
        console.log('simulationSequence ', i);
        application.setApp(appData);
        const result = simulationSequence(application);
        console.log(result);
        simResult.push(result);
    }
}

process.on('unhandledRejection', (error) => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message);
});

runSim(2);
