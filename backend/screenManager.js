function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.manager;
    case 'PROFILE':
        return Object.assign({}, app.manager, { screen: 'PROFILE' });
    case 'PLAY':
        return Object.assign({}, app.manager, { screen: 'HEROSELECT' });
    case 'HEROSELECTED':
        return Object.assign({}, app.manager, { screen: 'VERSUS' });
    case 'DEALALL':
        return Object.assign({}, app.manager, { screen: 'PLAYERACT' });
    case 'STARTSCREEN':
        return Object.assign({}, app.manager, { screen: 'STARTSCREEN' });
    case 'ACTION':
        return Object.assign({}, app.manager, { screen: 'GAMESCREEN' });
    case 'ENDGAME':
        return Object.assign({}, app.manager, { screen: 'VICTORY' });
    case 'NETWORKPLAY':
        return Object.assign({}, app.manager, { screen: 'NETWORKPLAY' });
    default: return app.manager;
    }
}


exports.handle = handle;
