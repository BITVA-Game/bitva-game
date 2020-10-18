const { message } = require('../src/constants');

function handle(app, msg) {
    const initSound = { soundOn: true };
    switch (msg.type) {
    case message.INIT:
        return initSound;
    case message.TOGGLESOUND:
        return { soundOn: msg.soundOn };
    default:
        return app.settings;
    }
}

exports.handle = handle;
