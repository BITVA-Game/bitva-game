const { message } = require('../constants');

function firstAccount(accounts, accId) {
    const account = accounts.find((e) => e.id === accId);
    if (account === undefined) {
        throw new Error('OMG NO ACCOUNT');
    }
    return { account: account.id, guest: null };
}

function secondAccount(accounts, accId) {
    const guest = accounts.find((e) => e.id !== accId);
    if (guest === undefined) {
        throw new Error('OMG NO SECOND ACCOUNT');
    }
    return { guest: guest.id };
}


function handle(app, msg) {
    switch (msg.type) {
    case message.STARTSCREEN:
        return Object.assign(app.accounts, firstAccount(app.accounts, msg.account));
    case message.PLAY:
        return Object.assign(app.accounts, secondAccount(app.accounts, app.accounts.account));
    default: return app.accounts;
    }
}


exports.handle = handle;
