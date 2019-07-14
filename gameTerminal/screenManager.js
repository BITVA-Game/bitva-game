const {
    PROFILE, STARTSCREEN, PLAY, NETWORKPLAY,
} = require('../constants');

function handle(app, message) {
    switch (message.type) {
    case PROFILE: return PROFILE;
    case PLAY: return PLAY;
    case NETWORKPLAY: return NETWORKPLAY;
    case STARTSCREEN: return STARTSCREEN;
    default: return app.manager;
    }
}


exports.handle = handle;
