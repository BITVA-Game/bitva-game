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
    const opp = app.terminals.map((t) => t.account).find((a) => a.id !== activeAccount);
    const oppplayer = app.players.find((p) => p.id !== activeAccount);
    const scr = oppplayer ? screen.VS : null;
    const connected = app.terminals.length === 2;
    return {
        connected, screen: scr, phase: app.phase, opp,
    };
}

function pairing(app, activeAccount) {
    return {
        screen: screen.VS,
        opponent: opponent(app, activeAccount),
        phase: app.phase,
        players: app.players,
    };
}

function heroNotSelected(app, activeAccount) {
    const allHeroes = allHeroesWithCards();
    const terminal = Object.values(app.terminals).find((t) => t.id === activeAccount);
    let heroSelect = {};
    if (terminal) {
        heroSelect = {
            heroes: terminal.account.heroes,
            allHeroes,
        };
    }
    return {
        screen: screen.HEROSELECT,
        heroSelect,
        opponent: opponent(app, activeAccount),
        phase: app.phase,
        players: app.players,
    };
}

function unknownAccount(app) {
    return {
        screen: null,
        opponent: { connected: false },
        phase: app.phase,
        players: app.players,
    };
}

function show(app, activeAccount) {
    const account = Object.values(app.terminals).find((t) => t.id === activeAccount);
    if (!account) {
        return unknownAccount(app);
    }

    const selected = app.players.find((p) => p.id === activeAccount);
    if (selected) {
        return pairing(app, activeAccount);
    }

    return heroNotSelected(app, activeAccount);
}

exports.show = show;
