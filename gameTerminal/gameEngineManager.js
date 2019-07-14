let engine = null;

const GameEngine = require('../gameEngine');

function handle(app, message) {
    switch (message.type) {
    case 'PLAY':
        // initialize game engine
        engine = new GameEngine();
        engine.handle(message);
        break;
    case 'HEROSELECTED':
    case 'DEALALL':
    case 'ACTION':
    // call game engine to calculate new game state
        engine.handle(message);
        break;
    // not a game-related message
    default: return app.engine;
    }

    // if we had a game-related message - return new game state
    return engine.getState();
}

exports.handle = handle;
