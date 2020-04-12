/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const request = require('superagent');

const GameEngine = require('../gameEngine');
const server = require('../gameEngineServer');

const port = 5001;

class GameEngineRemote {
    constructor(address) {
        this.address = address;
    }

    async handle(message, activeAccount) {
        await request.post(this.address).send({ message, activeAccount });
    }

    async getState() {
        const result = await request.get(this.address);
        // console.log(result.body);
        return result.body;
    }
}

class GameEngineLocalOffline {
    constructor() {
        this.gameEngine = new GameEngine();
    }

    async handle(message, activeAccount) {
        this.gameEngine.handle(message, activeAccount);
        return Promise.resolve();
    }

    async getState() {
        return Promise.resolve(this.gameEngine.getState());
    }
}

class GameEngineLocalNetwork {
    constructor() {
        this.gameEngine = new GameEngine();
        this.app = server(this.gameEngine);
        this.app.listen(port, () => console.log(`Engine listening on port ${port}!`));
    }

    async handle(message, activeAccount) {
        this.gameEngine.handle(message, activeAccount);
        return Promise.resolve();
    }

    async getState() {
        return Promise.resolve(this.gameEngine.getState());
    }
}

const createLocalOfflineEngine = () => new GameEngineLocalOffline();

const createLocalNetworkEngine = () => new GameEngineLocalNetwork();

const createRemoteEngine = (address) => new GameEngineRemote(address);

module.exports = { createLocalOfflineEngine, createLocalNetworkEngine, createRemoteEngine };
