/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
const request = require('superagent');
const process = require('process');
const GameEngine = require('../gameEngine');

const address = process.env.ENGINE_URL || 'http://localhost:5001/';

class GameEngineNetwork {
    async handle(message) {
        await request.post(address).send({ message });
    }

    async getState() {
        const result = await request.get(address);
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

module.exports = { GameEngineNetwork, GameEngineLocal };
