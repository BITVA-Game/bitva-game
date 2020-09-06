const { screen } = require('../constants');

function opponent(app, activeAccount) {
    const opp = app.terminals.map((t) => t.account).find((a) => a.id !== activeAccount);
    const connected = app.terminals.length === 2;
    return {
        connected, screen: 'GAME', data: app.players.find((p) => p.id !== activeAccount), opp,
    };
}

function show(app, activeAccount) {
    return {
        screen: screen.VS,
        opponent: opponent(app, activeAccount),
        game: app.game,
        phase: app.phase,
        players: app.players,
    };
}

exports.show = show;
