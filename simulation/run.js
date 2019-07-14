/* eslint-disable no-plusplus */
// const fs = require('fs');
// const path = require('path');
const readlineSync = require('readline-sync');
const application = require('../gameTerminal/application');
const appData = require('../gameTerminal/data/app.json');
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
    const player1name = arr[0].players[0].name;
    const player2name = arr[0].players[1].name;
    console.log('PLAYERS: ', player1name, player2name);
    const player = (players, name) => players.find(p => p.name === name);
    const player2wins = arr.filter(a => player(a.players, player1name).health <= 0);
    const player1wins = arr.filter(a => player(a.players, player2name).health <= 0);
    console.log(`From ${n} games, ${player2name} has ${
        player2wins.length} and ${player1name} has ${
        player1wins.length} wins`);

    // Wins at phase per character avg
    console.log(`On average, ${player1name} wins at turn num ${getAvgPhase(player1wins)}`);
    console.log(`On average, ${player2name} wins at turn num ${getAvgPhase(player2wins)}`);
}

function runSim(n) {
    const simResult = [];
    const heroes = ['morevna', 'yaga', 'premudraya', 'hozyaika'];
    const hero = readlineSync.keyInSelect(heroes, 'Select hero:');
    const opponent = readlineSync.keyInSelect(heroes, 'Select opponent:');
    for (let i = 0; i < n; i++) {
        console.log('simulationSequence ', i);
        application.setApp(appData);
        const result = simulationSequence(application, heroes[hero], heroes[opponent]);
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

runSim(300);
