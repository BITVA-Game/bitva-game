// JSON object with allication data
const fs = require('fs');
const path = require('path');
let application = require('./data/app.json');

// Additional files that have functions related to this part of application
const screenManager = require('./screenManager');
const profileManager = require('./profileManager');
const gameEngine = require('./gameEngine');
const heroManager = require('./heroSelect');
const socketClient = require('./socketClient');

// This function will write your last game object into a file
// To be used in debug functionality

function writeGameObject(newApp) {
    fs.writeFileSync(path.join(__dirname, '../backend/data/some.json'), JSON.stringify(newApp), 'utf8', (err) => {
        if (err) { throw err; }
    });
}

// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
function msgReceived(message, sendReply) {
    const newApp = {
        profile: profileManager.handle(application, message),
        manager: screenManager.handle(application, message),
        heroSelect: heroManager.handle(application, message),
        game: gameEngine.handle(application.game, message),
    };
    // writeGameObject(newApp);
    if (message.network) {
        newApp.network = true;
        console.log('OMG NETWORK PLAY IS: ', newApp.network);

        socketClient.emitMessage(message);
        sendReply(newApp);
        application = newApp;
    } else {
        sendReply(newApp);
        application = newApp;
    }
}

function setApp(newApp) {
    console.log('Setting app into needed state');
    application = newApp;
}

/** *********** Exports ************** */
exports.msgReceived = msgReceived;
exports.setApp = setApp;
