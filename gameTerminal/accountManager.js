const uuid = require('uuid/v1');
const { message } = require('../constants');
const { init, read, write } = require('../gameAccounts/manager');

async function readAccounts() {
    const accounts = await read().accounts;
    const result = { accounts, account: null, guest: null };
    return result;
}

async function createAccount(name) {
    const accounts = await read();
    accounts.accounts.push({ id: uuid(), name });
    await write(accounts);
}

async function deleteAccount(id) {
    const accounts = await read();
    const updatedAccs = accounts.accounts.filter((a) => a.id !== id);
    accounts.accounts = updatedAccs;
    await write(accounts);
}

async function handle(app, msg) {
    switch (msg.type) {
    case message.INIT:
        console.log('account manager handle init');
        await init();
        console.log('account manager read accounts');
        return readAccounts();
    case message.CREATEACC:
        createAccount(msg.account);
        return readAccounts();
    case message.DELETEACC:
        deleteAccount(msg.account);
        return readAccounts();
    default: return app.accounts;
    }
}


exports.handle = handle;
