function heroSelected(state) {
    if (state.game.players.length === 2) {
        return 'VERSUS';
    }
    return 'HEROSELECT';
}

function handle(state, message) {
    switch (message.type) {
    case 'PLAY':
        return 'HEROSELECT';
    case 'HEROSELECTED':
        return heroSelected(state);
    case 'DEALALL':
        return 'PLAYERACT';
    case 'STARTSCREEN':
        return 'STARTSCREEN';
    case 'ACTION':
        return 'GAMESCREEN';
    case 'ENDGAME':
        return 'VICTORY';
    default: return state.screen;
    }
}

exports.handle = handle;
