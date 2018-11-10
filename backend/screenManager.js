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
    case 'CASE1':
        return Object.assign({}, app.manager, { screen: 'GAMESCREEN' });
    case 'CASE2':
        return Object.assign({}, app.manager, { screen: 'GAMESCREEN' });
    case 'CASE3':
        return Object.assign({}, app.manager, { screen: 'GAMESCREEN' });
<<<<<<< HEAD
=======
    case 'CASE4':
        return Object.assign({}, app.manager, { screen: 'GAMESCREEN' });
>>>>>>> b3935c146013abc7f59a14a418926b1a4ac0781b
    default: return app.manager;
    }
}


exports.handle = handle;
