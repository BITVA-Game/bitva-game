const heroes = require('./data/characters.json');
function handle(app, message) {
    switch (message.type) {
        case 'INITIAL':
            return app.heroSelect;
        case 'PLAY':  
            return Object.assign({}, app.heroSelect, heroes);
        case 'HEROSELECTED':
            return Object.assign({});
        default: return app.heroSelect;
    }
}
exports.handle = handle;