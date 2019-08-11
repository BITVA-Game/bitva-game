const heroes = require('../gameTerminal/data/characters.json');
const cards = require('../gameTerminal/data/cards.json');
const {
    PLAY, HEROSELECTED,
} = require('../constants');

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
    return { allHeroes: heroes };
}

function playerData(player, players = []) {
    return { heroes: player.heroes, activePlayer: player.id, players };
}

function pendingPlayer(app, players) {
    const accounts = app.accounts;
    const completed = players.map(p => p.id);
    const pending = accounts.filter(a => !completed.includes(a.id));
    return pending[0];
}

function newPlayers(app, message) {
    const player = { id: message.player, hero: message.hero };
    return app.heroSelect.players.concat(player);
}

function handle(app, message) {
    let nextPlayer = null;
    let selectedPlayers = [];

    switch (message.type) {
    case PLAY:
        nextPlayer = app.accounts[0];
        break;
    case HEROSELECTED:
        selectedPlayers = newPlayers(app, message);
        nextPlayer = pendingPlayer(app, selectedPlayers);
        break;
    default: break;
    }

    if (!nextPlayer) {
        return null;
    }

    return Object.assign(
        {},
        initialState,
        heroWithCards(),
        playerData(nextPlayer, selectedPlayers),
    );
}

exports.handle = handle;
