const { screen, message } = require('../constants');

function handle(app, msg) {
    switch (msg.type) {
    case message.INIT:
        return screen.LOGIN;
    case message.LOGIN:
        return screen.STARTSCREEN;
    case message.PROFILE:
        return screen.PROFILE;
    case message.TUTORIAL:
        return screen.TUTORIAL;
    case message.SELECTOPPONENT:
        return screen.SELECTOPPONENT;
    case message.OPPONENT:
        return screen.VS;
    case message.PLAY:
        return screen.VERSUS;
    case message.NETWORKSCREEN:
        return screen.NETWORKSCREEN;
    default:
        return app.manager;
    }
}

exports.handle = handle;
