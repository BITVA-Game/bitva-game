const fs = require('fs');
const uuid = require('uuid/v1');
const { message } = require('../constants');
const gameAccounts = require('../gameAccounts');

function read() {
    const path = `${__dirname}/data/accounts.json`;
    try {
        if (!fs.existsSync(path)) {
            try {
                fs.writeFileSync(path, JSON.stringify({ accounts: [] }));
            } catch (e) {
                console.log('Cannot write file ', e);
            }
        }
    } catch (err) {
        console.error(err);
    }
    return JSON.parse(fs.readFileSync(path));
}

function write(obj) {
    const path = `${__dirname}/data/accounts.json`;
    try {
        fs.writeFileSync(path, JSON.stringify(obj));
    } catch (err) {
        console.error(err);
    }
}

function readAccounts() {
    console.log('READ ACCOUNTS');
    const accounts = read().accounts;
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

function createAccount(name) {
    console.log('CALLED create account');
    const accounts = read();
    accounts.accounts.push({ id: uuid(), name });
    write(accounts);
}

function deleteAccount(id) {
    const accounts = read();
    const updatedAccs = accounts.account.find((a) => a.id !== id);
    accounts.accounts = updatedAccs;
    write(accounts);
}

function handle(app, msg) {
    console.log('handle accounts', msg);
    switch (msg.type) {
    case message.INIT:
        return readAccounts();
    case message.CREATEACC:
        createAccount(msg.account);
        return readAccounts();
    case message.DELETEACC:
        deleteAccount(msg.account);
        return readAccounts();
    case message.STARTSCREEN:
        return Object.assign(app.accounts, firstAccount(msg.account));
    case message.PLAY:
        return Object.assign(app.accounts, secondAccount(app.accounts.account));
    default: return app.accounts;
    }
}


exports.handle = handle;
