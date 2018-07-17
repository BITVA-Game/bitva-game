let application = require('./data/app.json');


function profileHandler(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.profile;
    default: return app.profile;
    }
}

function managerHandler(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.manager;
    default: return app.manager;
    }
}

function gameHandler(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.game;
    default: return app.game;
    }
}

// This function is called from main.js
// It redirects the message to all handlers
// Only those that have relevatn state will be updated
// It also sends the reply back. The reply is mocked by tests
// so we can se what we're sending back.
function msgReceived(message, sendReply) {
    const newApp = {
        profile: profileHandler(application, message),
        manager: managerHandler(application, message),
        game: gameHandler(application, message),
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
