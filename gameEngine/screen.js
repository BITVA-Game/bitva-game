const {
    PLAY, HEROSELECT, HEROSELECTED, DEALALL, ACTION, GAMESCREEN, VERSUS,
} = require('../constants');

function heroSelected(state) {
    if (state.game.players.length === 2) {
        return VERSUS;
    }
    return HEROSELECT;
}

function handle(state, message) {
    switch (message.type) {
    case PLAY:
        return HEROSELECT;
    case HEROSELECTED:
        return heroSelected(state);
    case DEALALL:
        return GAMESCREEN;
    case ACTION:
        return GAMESCREEN;
    default: return state.screen;
    }
}

exports.handle = handle;
