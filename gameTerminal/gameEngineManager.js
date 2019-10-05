const { message } = require('../constants');

let engine = null;
const GameEngine = require('./gameEngineClient');

async function handle(app, msg) {
    switch (msg.type) {
    case message.PLAY:
        // initialize game engine
        engine = new GameEngine();

        await engine.handle({ ...msg, accounts: [app.account, app.guest] });
        break;
    case message.HEROSELECTED:
    case message.DEALALL:
    case message.ACTION:
    // call game engine to calculate new game state
        if (!engine) engine = new GameEngine();
        await engine.handle(msg);
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
