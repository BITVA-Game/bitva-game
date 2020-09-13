/* eslint-disable no-await-in-loop */
// JSON object with allication data
// const fs = require('fs');
// const path = require('path');

const { screen, message, phase } = require('../constants');

let application = JSON.stringify();
const messages = [];
// Additional files that have functions related to this part of application
const screenManager = require('./screenManager');
const gameEngineManager = require('./gameEngineManager');
const accountManager = require('./accountManager');
const participantManager = require('./participantManager');
const systemManager = require('./systemManager');
const activeAccountManager = require('./activeAccountManager');

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

const reProcess = (source) => (m) => {
    // console.log(`${source} SCHEDULING MESSAGE BACKEND TO BACKEND`, m);
    messages.push(m);
};

// TODO This is a temporary solution, requires rewriting frontend to read from engine
function parseApplication(app) {
    let scr = app.manager;
    if (app.engine && app.engine.screen) {
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

async function processMessage(msg, oldApp) {
    // We need to have a way to NOT send app if message
    // is being reprocessed.
    //
    // For example, when we're
    // initialising game engine, we want to reply
    // with the result of START given to reProcess function,
    // and ignore the result of original NETWORKPLAY/LOCALPLAY message.

    const newApp = {
        accounts: accountManager.handle(oldApp, msg, reProcess('accounts')),
        activeAccount: activeAccountManager.handle(oldApp, msg, reProcess('activeAccount')),
        participants: participantManager.handle(oldApp, msg, null),
        manager: screenManager.handle(oldApp, msg, null),
        engine: await gameEngineManager.handle(oldApp, msg, reProcess('engine')),
        system: systemManager.handle(oldApp, msg, null),
    };

    const participants = Object.values(newApp.participants);
    if (newApp.engine && newApp.engine.screen === screen.VS
        && participants.length === 2 && newApp.engine.phase === phase.SELECTION) {
        reProcess('pairing')({ type: message.SWITCHACTIVE });
    }

    return newApp;
}

async function initApplication(msg) {
    const accounts = accountManager.handle({}, msg, reProcess('accounts'));
    const manager = screenManager.handle({}, msg, null);
    const participants = participantManager.handle({}, msg, null);
    const system = systemManager.handle({}, msg, null);
    return {
        ...application,
        accounts,
        manager,
        participants,
        system,
    };
}

// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevant state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
async function msgReceived(msg) {
    // console.log('MSG FROM FRONTEND', msg);
    messages.push(msg);
}

function startMsgQueue(sendReply) {
    const reply = (app) => {
        application = app;
        const newApp = parseApplication(app);
        sendReply(newApp);
    };

    const worker = async () => {
        const m = messages.shift();
        if (!m) {
            setTimeout(worker, 100);
            return;
        }
        // console.log('SCHEDULED MESSAGE BACKEND PROCESSING', m);
        const newApp = m.type === message.INIT
            ? await initApplication(m)
            : await processMessage(m, application);
        reply(newApp);
        setTimeout(worker, 1);
    };
    worker();
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
exports.startMsgQueue = startMsgQueue;
exports.msgReceived = msgReceived;
exports.setApp = setApp;
exports.getApp = getApp;
exports.reset = reset;
