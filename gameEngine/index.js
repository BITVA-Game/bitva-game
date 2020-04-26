const game = require('./game');
const heroSelect = require('./heroSelect');
const terminals = require('./terminals');
const players = require('./players');
const initialState = require('./data/initialState.json');
const { message, phase } = require('../constants');

function playerState(state, account) {
    switch (state.phase) {
    case phase.SELECTION:
        return heroSelect.show(state, account);
    default:
        throw new Error(`Unknown phase ${state.phase}`);
    }
}
class GameEngine {
    constructor(state = initialState) {
        this.state = JSON.parse(JSON.stringify(state));
    }

    handle(msg, account) {
        // HACK until we init engine in prev game state
        console.log('ENGINE handle message', msg, account);
        if (msg.type === message.PLAY) {
            this.state.participants = msg.participants;
        }
        const newState = {
            terminals: terminals.handle(this.state, msg, account),
            players: players.handle(this.state, msg, account),
            game: game.handle(this.state, msg),
        };
        newState.phase = this.state.phase;
        this.state = newState;
        console.log('GAME ENGING STATE', this.state);
    }

    getState(account) {
        console.log('GET GAME ENGING STATE', account);
        return playerState(this.state, account);
    }
}

module.exports = GameEngine;
