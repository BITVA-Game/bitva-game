// JSON object with allication data
// const fs = require('fs');
// const path = require('path');

const { screen, message } = require('../constants');

let application = JSON.stringify();
// Additional files that have functions related to this part of application
const screenManager = require('./screenManager');
const gameEngineManager = require('./gameEngineManager');
const socketClient = require('./socketClient');
const accountManager = require('./accountManager');

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
    const newApp = {
        accounts: accountManager.handle(application, msg),
        manager: screenManager.handle(application, msg),
        engine: await gameEngineManager.handle(application, msg),
    };
    // console.log('NEW APP', newApp);
    return newApp;
}

function initApplication(msg) {
    // HACK until we have initial auth flow in place
    const accounts = accountManager.handle({}, msg);
    const manager = screenManager.handle({}, msg);
    return { ...application, accounts, manager };
}

// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
async function msgReceived(msg, sendReply) {
    const newApp = msg.type === message.INIT ? initApplication(msg) : await processMessage(msg);
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
