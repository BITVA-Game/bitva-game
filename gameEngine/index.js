const game = require('./game');
const heroSelect = require('./heroSelect');
const screen = require('./screen');
const initialState = require('./data/initialState.json');
const { message } = require('../constants');

class GameEngine {
    constructor(state = initialState) {
        this.state = JSON.parse(JSON.stringify(state));
    }

    handle(msg, activeAccount) {
        // HACK until we init engine in prev game state
        if (msg.type === message.PLAY) {
            this.state.participants = msg.participants;
        }
        const newState = {
            terminals: this.state.terminals,
            participants: this.state.participants,
            heroSelect: heroSelect.handle(this.state, msg, activeAccount),
            game: game.handle(this.state, msg),
        };
        newState.screen = screen.handle(newState, activeAccount);
        this.state = newState;
    }

    getState() {
        return this.state;
    }
}

module.exports = GameEngine;
