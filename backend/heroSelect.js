const heroes = require('./data/characters.json');
const cards = require('./data/cards.json');

const initialState = {
    players: [],
    activePlayer: '',
    heroes: [],
};

function heroWithCards() {
    for (const hero in heroes) {
        const heroCards = Object.keys(heroes[hero].cards);
        for (let i = 0; i < heroCards.length; i += 1) {
            const cardData = cards[heroCards[i]];
            const heroCard = heroes[hero].cards[heroCards[i]];
            heroes[hero].cards[heroCards[i]] = Object.assign({}, heroCard, cardData);
        }
    }
    return heroes;
}

function playerData(app, players = []) {
    const accounts = app.accounts;
    const completed = players.map(p => p.id);
    const pending = accounts.filter(a => !completed.includes(a.id));
    if (pending.length === 0) {
        return {};
    }
    const player = pending[0];
    return { heroes: player.heroes, activePlayer: player.id, players };
}

function newPlayers(app, message) {
    const player = { id: message.player, hero: message.hero };
    return app.heroSelect.players.concat(player);
}

function handle(app, message) {
    switch (message.type) {
    case 'PLAY':
        return Object.assign({}, initialState, heroWithCards(), playerData(app));
    case 'HEROSELECTED':
        return Object.assign({}, initialState, heroWithCards(),
            playerData(app, newPlayers(app, message)));
    default: return null;
    }
}

exports.handle = handle;
