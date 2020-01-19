const { message } = require('../constants');

const testAccounts = require('../gameTerminal/__data__/accounts');

const heroes = require('../gameTerminal/data/characters.json');
const cards = require('../gameTerminal/data/cards.json');

const initialState = {
    players: [],
    activeAccount: '',
    heroes: [],
};

function accounts(app) {
    return app.terminals.reduce(
        (accs, terminal) => accs.concat(terminal.accounts),
        [],
    );
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
    let activeAccount = null;
    let selectedPlayers = [];

    switch (msg.type) {
    case message.PLAY:
        activeAccount = app.participants.player;
        break;
    case message.HEROSELECTED:
        selectedPlayers = newPlayers(app, msg);
        activeAccount = app.participants.guest;
        break;
    default:
        break;
    }

    if (!activeAccount) {
        return null;
    }

    const allHeroes = allHeroesWithCards();
    return {
        ...initialState,

        heroes: activeAccount.heroes,
        activePlayer: activeAccount.id,
        players: selectedPlayers,
        allHeroes,
    };
}

exports.handle = handle;
