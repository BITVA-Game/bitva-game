const { message } = require('../constants');

function firstAccount(records, accId) {
    const record = records.find((e) => e.id === accId);
    if (record === undefined) {
        throw new Error('OMG NO ACCOUNT');
    }
    return { player: record.id, guest: null };
}

function secondAccount(accounts, accId) {
    const guest = accounts.find((e) => e.id !== accId);
    if (guest === undefined) {
        throw new Error('OMG NO SECOND ACCOUNT');
    }
    return { player: accId, guest: guest.id };
}


function handle(app, msg) {
    switch (msg.type) {
    case message.INIT:
        return {};
    case message.STARTSCREEN:
        return Object.assign(app.participants, firstAccount(app.accounts.records, msg.account));
    case message.PLAY:
        return Object.assign(app.participants, secondAccount(app.accounts.records, app.participants.player));
    default: return app.participants;
    }
}


exports.handle = handle;
