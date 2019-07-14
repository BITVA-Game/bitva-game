// JSON object with allication data
// const fs = require('fs');
// const path = require('path');
let application = require('./data/app.json');

// Additional files that have functions related to this part of application
const screenManager = require('./screenManager');
const gameEngineManager = require('./gameEngineManager');
const socketClient = require('./socketClient');

// This function will write your last game object into a file
// To be used in debug functionality

// function writeGameObject(newApp) {
//     fs.writeFileSync(
//        path.join(__dirname, '../gameTerminal/data/some.json'),
//        JSON.stringify(newApp), 'utf8', (err) => {
//         if (err) { throw err; }
//     });
// }

// TODO This is a temporary solution, getting read of it requires rewriting frontend to read from engine
function parseApplication(app) {
    let screen = app.manager;
    if (screen === 'PLAY') {
        // we're inside game screen playing the game
        screen = app.engine.screen;
    }
    const parsedApp = Object.assign(
        {}, app, app.engine, { manager: { screen } },
    );
    return parsedApp;
}

function processMessage(message) {
    const newApp = {
        accounts: application.accounts,
        terminals: application.terminals,
        manager: screenManager.handle(application, message),
        engine: gameEngineManager.handle(application, message),
    };
    return newApp;
}

// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
function msgReceived(message, sendReply) {
    const newApp = message === 'Init' ? application : processMessage(message);

    // writeGameObject(newApp);
    if (message.network) {
        newApp.network = true;
        console.log('OMG NETWORK PLAY IS: ', newApp.network);

        socketClient.emitMessage(message);
    }

    application = newApp;
    sendReply(parseApplication(newApp));
}

function setApp(newApp) {
    application = newApp;
}

/** *********** Exports ************** */
exports.msgReceived = msgReceived;
exports.setApp = setApp;
