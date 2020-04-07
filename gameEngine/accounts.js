const { message } = require('../src/constants');

function handle(state, msg) {
    switch (msg.type) {
    case message.PLAY:
        return [{ accounts: state.accounts }];
    default: return state.accounts;
    }
}

exports.handle = handle;
