const { screen, message } = require('../constants');

function handle(app, msg) {
    switch (msg.type) {
    case message.PROFILE: return screen.PROFILE;
    case message.PLAY: return screen.PLAY;
    case message.NETWORKPLAY: return screen.NETWORKPLAY;
    case message.STARTSCREEN: return screen.STARTSCREEN;
    default: return app.manager;
    }
}


exports.handle = handle;
