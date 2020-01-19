/* eslint-disable class-methods-use-this */
const request = require('superagent');
const process = require('process');

const address = process.env.ENGINE_URL || 'http://localhost:5001/';

class GameEngineClient {
    async handle(message) {
        await request.post(address).send({ message });
    }

    async getState() {
        const result = await request.get(address);
        // console.log(result.body);
        return result.body;
    }
}

module.exports = GameEngineClient;
