const fs = require('fs').promises;

const path = `${__dirname}/../gameTerminal/data/accounts.json`;

async function write(accounts) {
    await fs.writeFile(path, JSON.stringify(accounts));
    return accounts;
}

async function init() {
    try {
        await fs.access(path);
    } catch (e) {
        await write({ records: [] });
    }
}

async function read() {
    await init();
    return JSON.parse(await fs.readFile(path));
}

async function create(record) {
    const accounts = await read();
    accounts.records.push(record);
    return write(accounts);
}

async function remove(id) {
    const accounts = await read();
    const records = accounts.records.filter((a) => a.id !== id);
    accounts.records = records;
    return write(accounts);
}

module.exports = {
    read, create, remove,
};
