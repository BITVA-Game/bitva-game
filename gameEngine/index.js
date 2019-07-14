const profiles = require('./profiles');
const game = require('./game');
const heroSelect = require('./heroSelect');
const screen = require('./screen');
const initialState = require('./data/initialState.json');

class GameEngine {
    constructor() {
        this.state = JSON.parse(JSON.stringify(initialState));
    }

    handle(message) {
        const newState = {
            accounts: this.state.accounts,
            terminals: this.state.terminals,
            profiles: profiles.handle(this.state, message),
            heroSelect: heroSelect.handle(this.state, message),
            game: game.handle(this.state, message),
        };
        newState.screen = screen.handle(newState, message);
        this.state = newState;
    }

    getState() {
        return this.state;
    }
}

module.exports = GameEngine;
