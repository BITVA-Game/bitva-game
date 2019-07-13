const profiles = require('./profiles');
const game = require('./game');
const heroSelect = require('./heroSelect');

class GameEngine {
    constructor() {
        this.state = { players: [], screen: 'HEROSELECT' };
    }

    handle(message) {
        const newState = {
            profiles: profiles.handle(this.state, message),
            heroSelect: heroSelect.handle(this.state, message),
            game: game.handle(this.state, message),
        };
        this.state = newState;
    }

    state() {
        return this.state;
    }
}

module.exports = GameEngine;
