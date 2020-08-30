const { screen } = require('../constants');

function opponent(app, activeAccount) {
    const connected = app.terminals.length === 2;
    return {
        connected, screen: screen.VS, active: activeAccount,
    };
}


function show(app, activeAccount) {
    return {
        screen: screen.VS,
        opponent: opponent(app, activeAccount),
        game: app.game,
        phase: app.phase,
    };
}

exports.show = show;
