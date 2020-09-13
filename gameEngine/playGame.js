const { screen } = require('../constants');

function show(app, activeAccount) {
    if (app.game.players.every((p) => Object.keys(p.hand).length !== 0)) {
        console.log('SO Going to return GAMESCREEN');
        return {
            screen: screen.GAMESCREEN,
            ...app,
        };
    }
    console.log('SO Going to return VERSUS');
    return {
        screen: screen.VERSUS,
        ...app,
    };
}

exports.show = show;
