const fs = require('fs');
const { message } = require('../constants');
const gameAccounts = require('../gameAccounts');

function readAccounts() {
    const path = `${__dirname}/data/accounts.json`;
    let accounts = [];
    try {
        if (fs.existsSync(path)) {
            console.log('Found the file');
            accounts = JSON.parse(fs.readFileSync(path)).accounts;
        } else {
            console.log('NOT Found the file');
            try {
                fs.writeFileSync(path, JSON.stringify({ accounts: [] }));
            } catch (e) {
                console.log('Cannot write file ', e);
            }
        }
    } catch (err) {
        console.error(err);
    }
    const result = { accounts, account: null, guest: null };
    console.log('readAccounts', result);
    return result;
}

function firstAccount(acc) {
    const account = gameAccounts.accounts.find((e) => e.id === acc);
    if (account === undefined) {
        throw new Error('OMG NO ACCOUNT');
    }
    return { account: account.id, guest: null };
}

function secondAccount(firsAccId) {
    const guest = gameAccounts.accounts.find((e) => e.id !== firsAccId);
    if (guest === undefined) {
        throw new Error('OMG NO SECOND ACCOUNT');
    }
    return { guest: guest.id };
}

function handle(app, msg) {
    console.log('handle accounts', msg);
    switch (msg.type) {
    case message.INIT:
        return readAccounts();
    case message.STARTSCREEN:
        return Object.assign(app.accounts, firstAccount(msg.account));
    case message.PLAY:
        return Object.assign(app.accounts, secondAccount(app.accounts.account));
    default: return app.accounts;
    }
}


exports.handle = handle;
