const { message } = require('../constants');

const gameAccounts = require('../gameAccounts');

const heroes = require('../gameTerminal/data/characters.json');
const cards = require('../gameTerminal/data/cards.json');

const initialState = {
    players: [],
    activePlayer: '',
    heroes: [],
};

function accounts(app) {
    return app.terminals.reduce((accs, terminal) => accs.concat(terminal.accounts), []);
}

function allHeroesWithCards() {
    for (const hero in heroes) {
        const heroCards = Object.keys(heroes[hero].cards);
        for (let i = 0; i < heroCards.length; i += 1) {
            const cardData = cards[heroCards[i]];
            const heroCard = heroes[hero].cards[heroCards[i]];
            heroes[hero].cards[heroCards[i]] = { ...heroCard, ...cardData };
        }
    }
    return heroes;
}

function pendingPlayer(app, players) {
    const accs = accounts(app);
    const completed = players.map((p) => p.id);
    const pending = accs.filter((a) => !completed.includes(a.id));
    return pending[0];
}

function newPlayers(app, msg) {
    const player = { id: msg.player, hero: msg.hero };
    return app.heroSelect.players.concat(player);
}

function handle(app, msg) {
    let nextPlayer = null;
    let selectedPlayers = [];

    switch (msg.type) {
    case message.PLAY:
        nextPlayer = accounts(app)[0];
        break;
    case message.HEROSELECTED:
        selectedPlayers = newPlayers(app, msg);
        nextPlayer = pendingPlayer(app, selectedPlayers);
        console.log(nextPlayer);
        break;
    default: break;
    }

    if (!nextPlayer) {
        return null;
    }

    const allHeroes = allHeroesWithCards();
    return {
        ...initialState,

        heroes: gameAccounts.heroes(nextPlayer.id),
        activePlayer: nextPlayer.id,
        players: selectedPlayers,
        allHeroes,
    };
}

exports.handle = handle;
