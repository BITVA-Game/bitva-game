const uuid = require('uuid/v1');
const { message } = require('../constants');
const { read, create, remove } = require('../gameAccounts');

const DELAY = 3000;

function initAccounts(process) {
    (async () => {
        const accounts = await read();
        // Use this to see the delay on frontend
        // setTimeout(() => process({ type: 'READACCOUNTS', payload: accounts.accounts }), DELAY);
        console.log('process', process);
        process({ type: 'READACCOUNTS', payload: accounts.records });
    })();

    const result = {
        loading: true,
    };

    return result;
}

function createAccount(name, process) {
    (async () => {
        const accounts = await create({
            id: uuid(),
            name,
            heroes: ['morevna', 'yaga'],
        });
        // Use this to see the delay on frontend
        // setTimeout(() => process({ type: 'READACCOUNTS', payload: accounts.records }), DELAY);
        process({ type: 'READACCOUNTS', payload: accounts.records });
    })();

    const result = {
        loading: true,
    };

    return result;
}

function deleteAccount(id, process) {
    (async () => {
        const accounts = await remove(id);
        // Use this to see the delay on frontend
        // setTimeout(() => process({ type: 'READACCOUNTS', payload: accounts.records }), DELAY);
        process({ type: 'READACCOUNTS', payload: accounts.records });
    })();

    const result = {
        loading: true,
    };

    return result;
}

function handle(app, msg, process) {
    switch (msg.type) {
    case message.INIT:
        return initAccounts(process);
    case 'READACCOUNTS':
        return { loading: false, records: msg.payload };
    case message.CREATEACC:
        return createAccount(msg.account, process);
    case message.DELETEACC:
        return deleteAccount(msg.account, process);
    default:
        return app.accounts;
    }
}

exports.handle = handle;
