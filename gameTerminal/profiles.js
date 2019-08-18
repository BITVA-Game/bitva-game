import {
    message,
} from '../constants';

function handle(app, msg) {
    switch (msg.type) {
    case message.INIT:
        return app.profiles;
    default: return app.profiles;
    }
}


exports.handle = handle;
