const heroes = require('./data/characters.json');
const cards = require('./data/cards.json');

function heroWithCards() {
    for (const hero in heroes) {
        const heroCards = Object.keys(heroes[hero].cards);
        for (let i = 0; i < heroCards.length; i++) {
            const cardData = cards[heroCards[i]];
            const heroCard = heroes[hero].cards[heroCards[i]];
            heroes[hero].cards[heroCards[i]] = Object.assign({}, heroCard, cardData);
        }
    }
    return heroes;
}

function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.heroSelect;
    case 'PLAY':
        return Object.assign({}, app.heroSelect, heroWithCards());
    case 'HEROSELECTED':
        return Object.assign({});
    default: return app.heroSelect;
    }
}

exports.handle = handle;
