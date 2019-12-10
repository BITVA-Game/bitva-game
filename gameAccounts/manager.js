const fs = require('fs').promises;

const path = `${__dirname}/../gameTerminal/data/accounts.json`;

async function init() {
    fs.writeFile(path, JSON.stringify({ accounts: [] }));
}

async function read() {
    return JSON.parse(await fs.readFile(path));
}

async function write(obj) {
    fs.writeFile(path, JSON.stringify(obj));
}

module.exports = {
    init, read, write,
};
