const { screen, message, phase } = require('../constants');

const availableCharacters = {
    set1: ['morevna', 'yaga', 'premudraya'],
    set2: ['morevna', 'yaga', 'hozyaika'],
};

function handle(state, msg) {
    switch (msg.type) {
    case message.PLAY:
        return [{ accounts: state.accounts }];
    default: return state.accounts;
    }
}

exports.handle = handle;
