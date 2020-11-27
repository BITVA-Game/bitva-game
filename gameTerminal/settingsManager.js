const { message } = require('../src/constants');

function handle(app, msg) {
    const initSound = { soundOn: true, volume: 0 };
    switch (msg.type) {
    case message.INIT:
        return initSound;
    case message.TOGGLESOUND:
        return { ...app.settings, soundOn: msg.soundOn };
    case message.CHANGEVOLUME:
        return { ...app.settings, volume: msg.volume };
    default:
        return app.settings;
    }
}

exports.handle = handle;
