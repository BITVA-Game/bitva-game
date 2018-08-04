function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.manager;
    case 'PLAY':
        return Object.assign({}, app.manager, { screen: 'HEROSELECT' });
    case 'HEROSELECTED':
        return Object.assign({}, app.manager, { screen: 'VERSUS' });
    default: return app.manager;
    }
}


exports.handle = handle;
