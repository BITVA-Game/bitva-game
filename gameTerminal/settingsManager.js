const { message } = require('../src/constants');

function handle(app, msg) {
    console.log('SETTINGS MANAGER');
    let settings = { ...app.settings };
    if (msg.type === message.TOGGLESOUND) {
        settings = { ...settings, soundOn: msg.soundOn };
    } else {
        settings = { ...settings, soundOn: false };
    }
    return settings;
}

exports.handle = handle;
