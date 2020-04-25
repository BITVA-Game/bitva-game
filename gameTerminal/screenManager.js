const { screen, message } = require('../src/constants');

function handle(app, msg) {
    console.log('screenManager handle', msg.type);
    switch (msg.type) {
    case message.INIT:
        return screen.LOGIN;
    case message.LOGIN:
        return screen.STARTSCREEN;
    case message.PROFILE:
        return screen.PROFILE;
    case message.START:
        return screen.SELECTOPPONENT;
    case message.OPPONENT:
        return screen.VS;
    case message.PLAY:
        return screen.PLAY;
    case message.NETWORKSCREEN:
        return screen.NETWORKSCREEN;
    default:
        return app.manager;
    }
}

exports.handle = handle;
