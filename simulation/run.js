/* eslint-disable no-plusplus */
// const fs = require('fs');
// const path = require('path');
const application = require('../backend/application');
const appData = require('../backend/data/app.json');
const { simulationSequence } = require('./functions');

// function writeToFile(obj, filepath) {
//     fs.writeFileSync(path.join(__dirname, filepath), JSON.stringify(obj), 'utf8', (err) => {
//         if (err) { throw err; }
//     });
// }

function getAvgPhase(arr) {
    let sum = 0;
    arr.forEach((a) => { sum += a.round; });
    return parseInt((sum / arr.length) / 2, 10);
}

function formReport(arr, n) {
    // Separate wins per character
    const player = (players, name) => players.find(p => p.name === name);
    const morevnawins = arr.filter(a => player(a.players, 'yaga').health <= 0);
    const yagawins = arr.filter(a => player(a.players, 'morevna').health <= 0);
    console.log(`From ${n} games, Yaga has ${
        yagawins.length} and Morevna has ${
        morevnawins.length} wins`);

    // Wins at phase per character avg
    const morevnaPhaseAvg = getAvgPhase(morevnawins);
    console.log(`On average, Morevna wins at turn num ${morevnaPhaseAvg}`);
    const yagaPhaseAvg = getAvgPhase(yagawins);
    console.log(`On average, Yaga wins at turn num ${yagaPhaseAvg}`);
}

function runSim(n) {
    const simResult = [];
    for (let i = 0; i < n; i++) {
        console.log('simulationSequence ', i);
        application.setApp(appData);
        const result = simulationSequence(application);
        // console.log(result);
        simResult.push(result);
    }
    formReport(simResult, n);
    // writeToFile(report, '/result.txt');
}


process.on('unhandledRejection', (error) => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message);
});

runSim(100);
