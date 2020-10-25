const { screen, message, phase } = require('../src/constants');

function heroSelected(state) {
    if (state.game.players.length === 2) {
        return screen.VERSUS;
    }
    return screen.HEROSELECT;
}

function gameScreen(state) {
    if (state.game.phase === phase.OVER) {
        return screen.OVER;
    }
    return screen.GAMESCREEN;
}

function handle(state, msg) {
    switch (msg.type) {
    case message.LOGIN:
        return screen.LOGIN;
    case message.PLAY:
        return screen.HEROSELECT;
    case message.HEROSELECTED:
        return heroSelected(state);
    case message.DEALALL:
        return screen.GAMESCREEN;
    case message.ACTION:
        return gameScreen(state);
    case message.SETTINGS:
        return screen.SETTINGS;
    default: return state.screen;
    }
}

exports.handle = handle;
