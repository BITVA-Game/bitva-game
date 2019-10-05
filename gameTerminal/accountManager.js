import {
    message,
} from '../constants';

function handle(app, msg) {
    console.log('handle account');
    switch (msg.type) {
    case message.INIT:
        return app.account;
    default: return app.account;
    }
}


exports.handle = handle;
