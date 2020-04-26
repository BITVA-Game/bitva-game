const { message } = require('../constants');

function addTerminal(existingAccs, newAccId, newAccData) {
    console.log('addTerminal', existingAccs, newAccId, newAccData);
    if (existingAccs.find((a) => a.id === newAccId)) {
        return existingAccs;
    }
    return existingAccs.concat({ id: newAccId, data: newAccData });
}

function handle(state, msg, account) {
    switch (msg.type) {
    case (message.JOIN):
        return addTerminal(state.terminals, account, msg.account);
    default:
        return state.terminals;
    }
}

exports.handle = handle;
