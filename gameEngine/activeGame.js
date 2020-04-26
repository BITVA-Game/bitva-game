const { screen } = require('../constants');

function opponent(app, activeAccount) {
    const connected = app.terminals.length === 2;
    return {
        connected, screen: screen.VS,
    };
}


function show(app, activeAccount) {
    return {
        screen: screen.VS,
        opponent: opponent(app, activeAccount),
        game: app.game,
    };
}

exports.show = show;
