const uuid = require('uuid/v1');
const { message } = require('../constants');
const { init, read, write } = require('../gameAccounts/manager');

function initAccounts(process) {
    (async () => {
        await init();
        const accounts = await read();
        process({ type: 'SETACCOUNTS', payload: accounts.accounts });
    })();

    const result = {
        loading: true,
        accounts: [],
        account: null,
        guest: null,
    };

    return result;
}

// function readAccounts() {
//     const accounts = await read().accounts;
//     return accounts
// }

// function createAccount(name) {
//     const accounts = await read();
//     accounts.accounts.push({ id: uuid(), name });
//     await write(accounts);
// }

// function deleteAccount(id) {
//     const accounts = await read();
//     const updatedAccs = accounts.accounts.filter((a) => a.id !== id);
//     accounts.accounts = updatedAccs;
//     await write(accounts);
// }

function handle(app, msg, process) {
    switch (msg.type) {
    case message.INIT:
        return initAccounts(process);
    case 'SETACCOUNTS':
        return { loading: false, accounts: msg.payload };
    // case message.CREATEACC:
    //     createAccount(msg.account);
    //     return readAccounts();
    // case message.DELETEACC:
    //     deleteAccount(msg.account);
    //     return readAccounts();
    default: return app.accounts;
    }
}


exports.handle = handle;
