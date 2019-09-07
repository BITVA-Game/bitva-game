/* eslint-disable class-methods-use-this */

// This doesn't work by itself as a manual mock, but it can be combined with
// a jest.mock call in a test and import of mockHandle function to check
// its calls

const mockHandle = jest.fn();

const state = {
    screen: 'RANDOM',
    innerState: { a: 1 },
};

class GameEngine {
    constructor() {
        this.handle = mockHandle;
    }

    getState() {
        return state;
    }
}

module.exports = GameEngine;
module.exports.mockHandle = mockHandle;
module.exports.mockState = state;
