function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.manager;
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

    default: return app.manager;
    }
}


exports.handle = handle;
