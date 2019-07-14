const {
    INIT,
} = require('../constants');

function handle(app, message) {
    switch (message.type) {
    case INIT:
        return app.profiles;
    default: return app.profiles;
    }
}


exports.handle = handle;
