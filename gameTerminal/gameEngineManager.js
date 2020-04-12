const { message } = require('../constants');

let engine = null;
const {
    createLocalOfflineEngine, createLocalNetworkEngine, createRemoteEngine,
} = require('./gameEngineClient');

const account = (app, id) => app.accounts.records.find((a) => a.id === id);
const participants = (app) => ({
    player: account(app, app.participants.player),
    guest: account(app, app.participants.guest),
});

async function handle(app, msg, process) {
    switch (msg.type) {
    case message.LOCALPLAY:
        // call game engine to calculate new game state
        if (!engine) {
            engine = createLocalOfflineEngine();
        }
        process({ type: message.START }, false);
        break;
    case message.NETWORKPLAY:
        // call game engine to calculate new game state
        if (!engine && msg.role === 'client') {
            engine = createRemoteEngine(msg.ip);
        }
        if (!engine && msg.role === 'host') {
            engine = createLocalNetworkEngine();
        }
        if (!engine) {
            throw new Error('NO ENGINE!');
        }
        process({ type: message.START }, false);
        break;
    case message.PLAY:
        await engine.handle({
            type: message.PLAY,
            participants: participants(app),
        }, app.participants.player);
        break;
    case message.HEROSELECTED:
    case message.DEALALL:
    case message.ACTION:
        await engine.handle(msg, app.participants.player);
        break;
    // not a game-related message
    default:
        return app.engine;
    }

    // if we had a game-related message - return new game state
    return engine.getState();
}

function reset(newEngine = null) {
    engine = newEngine;
}

exports.handle = handle;
exports.reset = reset;
