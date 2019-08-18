import {
    message,
} from '../constants';

let engine = null;
const GameEngine = require('../gameEngine');

function handle(app, msg) {
    switch (msg.type) {
    case message.PLAY:
        // initialize game engine
        engine = new GameEngine();
        engine.handle(msg);
        break;
    case message.HEROSELECTED:
    case message.DEALALL:
    case message.ACTION:
    // call game engine to calculate new game state
        if (!engine) engine = new GameEngine();
        engine.handle(msg);
        break;
    // not a game-related message
    default: return app.engine;
    }

    // if we had a game-related message - return new game state
    return engine.getState();
}

function reset() {
    engine = null;
}

exports.handle = handle;
exports.reset = reset;
