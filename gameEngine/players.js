const { message } = require('../constants');


function handle(app, msg, activeAccount) {
    let selectedPlayers = app.players;

    switch (msg.type) {
    case message.HEROSELECTED:
        selectedPlayers = selectedPlayers.concat({ id: activeAccount, hero: msg.hero });
        break;
    default:
        break;
    }
    return selectedPlayers;
}

exports.handle = handle;
