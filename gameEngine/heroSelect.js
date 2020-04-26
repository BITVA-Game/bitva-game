
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

function opponent(app, activeAccount) {
    const opp = app.players.find((p) => p.id !== activeAccount);
    const scr = opp ? screen.PAIRING : null;
    const connected = app.terminals.length === 2;
    return {
        connected, screen: scr,
    };
}

function pairing(app, activeAccount) {
    return {
        screen: screen.PAIRING,
        opponent: opponent(app, activeAccount),
    };
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
        opponent: opponent(app, activeAccount),
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
        return pairing(app, activeAccount);
    }

    return heroNotSelected(app, activeAccount);
}

exports.show = show;
