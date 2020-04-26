
const { screen } = require('../constants');

const heroes = require('../gameTerminal/data/characters.json');
const cards = require('../gameTerminal/data/cards.json');


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

function pairing() {
    return {
        screen: screen.PAIRING,
    };
}

function opponentScreen(app, activeAccount) {
    if (app.players.find((p) => p.id !== activeAccount)) {
        return screen.PAIRING;
    }
    return null;
}

function heroNotSelected(app, activeAccount) {
    const allHeroes = allHeroesWithCards();
    const account = Object.values(app.terminals).find((t) => t.id === activeAccount);
    let heroSelect = {};
    if (account) {
        heroSelect = {
            heroes: account.data.heroes,
            allHeroes,
        };
    }
    return {
        screen: screen.HEROSELECT,
        heroSelect,
        opponent: {
            connected: app.terminals.length === 2,
            screen: opponentScreen(app, activeAccount),
        },
    };
}

function unknownAccount() {
    return {
        screen: null,
        opponent: { connected: false },
    };
}

function show(app, activeAccount) {
    const account = Object.values(app.terminals).find((t) => t.id === activeAccount);
    if (!account) {
        return unknownAccount();
    }

    const selected = app.players.find((p) => p.id === activeAccount);
    if (selected) {
        return pairing();
    }

    return heroNotSelected(app, activeAccount);
}

exports.show = show;
