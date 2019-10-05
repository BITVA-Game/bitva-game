// JSON object with allication data
// const fs = require('fs');
// const path = require('path');

const { screen, message } = require('../constants');

let application = require('./data/app.json');
// Additional files that have functions related to this part of application
const screenManager = require('./screenManager');
const gameEngineManager = require('./gameEngineManager');
const gameAccounts = require('../gameAccounts');
const socketClient = require('./socketClient');
const account = require('./accountManager');

// This function will write your last game object into a file
// To be used in debug functionality

// function writeGameObject(newApp) {
//     fs.writeFileSync(
//         path.join(__dirname, '../gameTerminal/data/some.json'),
//         JSON.stringify(newApp), 'utf8', (err) => {
//             if (err) { throw err; }
//         }
// );
// }

// TODO This is a temporary solution, requires rewriting frontend to read from engine
function parseApplication(app) {
    let scr = app.manager;
    if (scr === screen.PLAY) {
        // we're inside game screen playing the game
        scr = app.engine.screen;
    }
    const parsedApp = {
        ...app, ...app.engine, manager: { screen: scr },
    };
    delete parsedApp.engine;
    return parsedApp;
}

async function processMessage(msg) {
    console.log('process', msg);
    // HACK until we have auth flow
    if (msg.type === message.PLAY) {
        application.guest = gameAccounts.bob;
    }
    const newApp = {
        account: application.account,
        guest: application.guest,
        manager: screenManager.handle(application, msg),
        engine: await gameEngineManager.handle(application, msg),
    };
    return newApp;
}

// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
async function msgReceived(msg, sendReply) {
    const newApp = msg === message.INIT ? application : await processMessage(msg);
    if (message.network) {
        newApp.network = true;
        console.log('OMG NETWORK PLAY IS: ', newApp.network);

        socketClient.emitMessage(msg);
    }

    // writeGameObject(newApp);
    application = newApp;
    sendReply(parseApplication(newApp));
}

function setApp(newApp) {
    application = newApp;
}

function getApp() {
    return parseApplication(application);
}

function reset() {
    gameEngineManager.reset();
}

/** *********** Exports ************** */
exports.msgReceived = msgReceived;
exports.setApp = setApp;
exports.getApp = getApp;
exports.reset = reset;
