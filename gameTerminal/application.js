// JSON object with allication data
// const fs = require('fs');
// const path = require('path');

const { screen, message } = require('../constants');

let application = JSON.stringify();
// Additional files that have functions related to this part of application
const screenManager = require('./screenManager');
const gameEngineManager = require('./gameEngineManager');
const accountManager = require('./accountManager');
const participantManager = require('./participantManager');
const systemManager = require('./systemManager');

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
        ...app,
        ...app.engine,
        manager: { screen: scr },
    };
    delete parsedApp.engine;
    return parsedApp;
}

async function processMessage(msg, reply) {
    console.log('process', msg);
    const reProcess = (m) => processMessage(m, reply);

    const newApp = {
        accounts: accountManager.handle(application, msg, reProcess),
        participants: participantManager.handle(application, msg, reProcess),
        manager: screenManager.handle(application, msg, reProcess),
        engine: await gameEngineManager.handle(application, msg, reProcess),
        system: systemManager.handle(application, msg, reProcess),
    };
    console.log('NEW APP', newApp);
    reply(newApp);
}

async function initApplication(msg, reply) {
    const reProcess = (m) => processMessage(m, reply);
    const accounts = accountManager.handle({}, msg, reProcess);
    const manager = screenManager.handle({}, msg, reProcess);
    const participants = participantManager.handle({}, msg, reProcess);
    const system = systemManager.handle({}, msg, reProcess);
    const newApp = {
        ...application,
        accounts,
        manager,
        participants,
        system,
    };
    reply(newApp);
}

// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
async function msgReceived(msg, sendReply) {
    const reply = (app) => {
        application = app;
        sendReply(parseApplication(app));
    };

    if (msg.type === message.INIT) {
        await initApplication(msg, reply);
    } else {
        await processMessage(msg, reply);
    }
    // if (message.network) {
    //     newApp.network = true;
    //     console.log('OMG NETWORK PLAY IS: ', newApp.network);

    //     socketClient.emitMessage(msg);
    // }

    // writeGameObject(newApp);
}

function setApp(newApp) {
    application = newApp;
}

function getApp() {
    return application;
}

function reset() {
    gameEngineManager.reset();
}

/** *********** Exports ************** */
exports.msgReceived = msgReceived;
exports.setApp = setApp;
exports.getApp = getApp;
exports.reset = reset;
exports.parseApplication = parseApplication;
