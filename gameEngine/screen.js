const { screen, phase } = require('../constants');

// eslint-disable-next-line no-unused-vars
function overScreen(state, activeAcc) {
    return screen.OVER;
}

// eslint-disable-next-line no-unused-vars
function activeScreen(state, activeAcc) {
    return screen.GAMESCREEN;
}

function selectionScreen(state, activeAcc) {
    const playerSelected = state.players && state.players.find((p) => p.id === activeAcc);
    if (playerSelected) {
        return screen.VERSUS;
    }
    return screen.HEROSELECT;
}

function handle(state, activeAcc) {
    console.log('handle', activeAcc);
    console.log('state', state);
    switch (state.game.phase) {
    case phase.SELECTION:
        return selectionScreen(state, activeAcc);
    case phase.ACTIVE:
        return activeScreen(state, activeAcc);
    case phase.OVER:
        return overScreen(state, activeAcc);
    default:
        throw new Error(`Unknown phase ${state.game.phase}`);
    }
}

exports.handle = handle;
