/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const request = require('superagent');
const GameEngine = require('../gameEngine');

// const address = process.env.ENGINE_URL || 'http://localhost:6000/';

class GameEngineNetwork {
    constructor(address) {
        this.address = address;
    }

    async handle(message) {
        await request.post(this.address).send({ message });
    }

    async getState() {
        const result = await request.get(this.address);
        // console.log(result.body);
        return result.body;
    }
}

class GameEngineLocal {
    constructor() {
        this.gameEngine = new GameEngine();
    }

    async handle(message) {
        this.gameEngine.handle(message);
        return Promise.resolve();
    }

    async getState() {
        return Promise.resolve(this.gameEngine.getState());
    }
}

const createLocalEngine = () => new GameEngineLocal();

const createNetworkEngine = (address) => new GameEngineNetwork(address);

module.exports = { createLocalEngine, createNetworkEngine };
