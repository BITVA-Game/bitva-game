// JSON object with allication data
let application = require('./data/app.json');

// Additional files that have functions related to this part of application
const screenManager = require('./screenManager');
const profileManager = require('./profileManager');
const gameEngine = require('./gameEngine');


// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
function msgReceived(message, sendReply) {
    const newApp = {
        profile: profileManager.handle(application, message),
        manager: screenManager.handle(application, message),
        game: gameEngine.handle(application, message),
    };
    sendReply(newApp);
    application = newApp;
}

function setApp(newApp) {
    application = newApp;
}

/** *********** Exports ************** */
exports.msgReceived = msgReceived;
exports.setApp = setApp;
