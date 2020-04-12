const { message } = require('../constants');

const heroes = require('../gameTerminal/data/characters.json');
const cards = require('../gameTerminal/data/cards.json');

const initialState = {
    players: [],
    activePlayer: '',
    heroes: [],
};

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


function handle(app, msg, activeAccount) {
    let selectedPlayers = (app.heroSelect || initialState).players;

    switch (msg.type) {
    case message.HEROSELECTED:
        selectedPlayers = selectedPlayers.concat({ id: activeAccount, hero: msg.hero });
        break;
    default:
        break;
    }
    const allHeroes = allHeroesWithCards();
    const account = Object.values(app.participants).find((p) => p.id === activeAccount);
    return {
        ...initialState,

        heroes: account.heroes,
        activePlayer: activeAccount,
        players: selectedPlayers,
        allHeroes,
    };
}

exports.handle = handle;
