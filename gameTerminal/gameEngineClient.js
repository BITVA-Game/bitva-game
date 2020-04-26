/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const request = require('superagent');

const GameEngine = require('../gameEngine');
const server = require('../gameEngineServer');

const port = 5001;

class GameEngineRemote {
    constructor(address, process) {
        this.address = address;
        this.process = process;
    }

    async handle(message, activeAccount) {
        console.log('MSG TO ENGINE', message);
        await request.post(this.address).send({ message, activeAccount });
    }

    async getState() {
        const result = await request.get(this.address);
        console.log('RESPONSE ENGINE STATE', result.body);
        return result.body;
    }
}

class GameEngineLocalOffline {
    constructor(process) {
        this.gameEngine = new GameEngine(process);
    }

    async handle(message, activeAccount) {
        console.log('MSG TO ENGINE', message);
        this.gameEngine.handle(message, activeAccount);
        return Promise.resolve();
    }

    async getState(activeAccount) {
        const engine = this.gameEngine.getState(activeAccount);
        console.log('RESPONSE ENGINE STATE', engine);
        return Promise.resolve(engine);
    }
}

class GameEngineLocalNetwork {
    constructor(process) {
        this.gameEngine = new GameEngine(process);
        this.app = server(this.gameEngine);
        this.app.listen(port, () => console.log(`Engine listening on port ${port}!`));
    }

    async handle(message, activeAccount) {
        console.log('MSG TO ENGINE', message);
        this.gameEngine.handle(message, activeAccount);
        return Promise.resolve();
    }

    async getState(activeAccount) {
        const engine = this.gameEngine.getState(activeAccount);
        console.log('RESPONSE ENGINE STATE', engine);
        return Promise.resolve(engine);
    }
}

const createLocalOfflineEngine = () => new GameEngineLocalOffline();

const createLocalNetworkEngine = () => new GameEngineLocalNetwork();

const createRemoteEngine = (address) => new GameEngineRemote(address);

module.exports = { createLocalOfflineEngine, createLocalNetworkEngine, createRemoteEngine };
