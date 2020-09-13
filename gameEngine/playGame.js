const { screen } = require('../constants');

function show(app, activeAccount) {
    if (app.game && app.game.players.every((p) => p.cards)) {
        return {
            screen: screen.GAMESCREEN,
            ...app,
        };
    }
    return {
        screen: screen.VERSUS,
        ...app,
    };
}

exports.show = show;
