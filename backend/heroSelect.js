const heroes = require('./data/characters.json');
const cards = require('./data/cards.json');

function getCards(heroes) {
    const heroArr = Object.values(heroes);
    const cardsArr = Object.values(cards);
    heroArr.forEach((h) => {
        for (let i = 0; i < heroArr.length; i += 1) {
            h.cards = Object.values(heroArr[i].cards);
            console.log(h.cards);
            for (let j = 0; j < h.cards.length; j += 1) {
                // console.log(h.cards[j], cardsArr[j]);
                if (h.cards[j].id === cardsArr[j].id) {
                    h.cards[j] = cardsArr[j];
                }
            }
        }
        console.log(h.cards);
        return heroArr;
    });
}

function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.heroSelect;
    case 'PLAY':
        console.log(getCards(heroes));
        return Object.assign({}, app.heroSelect, heroes);
    case 'HEROSELECTED':
        return Object.assign({});
    default: return app.heroSelect;
    }
}
exports.handle = handle;
