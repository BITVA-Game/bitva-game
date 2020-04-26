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
            engine = createLocalOfflineEngine(process);
        }
        process({ type: message.START }, false);
        break;
    case message.NETWORKPLAY:
        // call game engine to calculate new game state
        if (!engine && msg.role === 'client') {
            engine = createRemoteEngine(msg.ip, process);
        }
        if (!engine && msg.role === 'host') {
            engine = createLocalNetworkEngine(process);
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
        }, app.activeAccount);
        break;
    case message.JOIN:
        await engine.handle({
            type: message.JOIN,
            account: account(app, app.activeAccount),
        }, app.activeAccount);
        break;
    case message.HEROSELECTED:
    case message.DEALALL:
    case message.ACTION:
        await engine.handle(msg, app.activeAccount);
        break;
    case message.SWITCHACTIVE:
        process({ type: message.JOIN });
        return null;
    // not a game-related message
    default:
        return app.engine;
    }

    // if we had a game-related message - return new game state
    const currentEngingState = engine.getState(app.activeAccount);
    return currentEngingState;
}

function reset(newEngine = null) {
    engine = newEngine;
}

exports.handle = handle;
exports.reset = reset;
