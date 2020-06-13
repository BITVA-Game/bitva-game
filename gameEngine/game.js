/* eslint-disable no-plusplus */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint func-names: ["error", "as-needed"] */
const keygen = require('keygenerator');
const {
    message,
    card: cardConst,
    styles,
} = require('../src/constants');

const { getRandomUpTo } = require('../gameTerminal/randomFunc');

const allCharacters = require('../gameTerminal/data/characters.json');
const allCards = require('../gameTerminal/data/cards.json');

const { removeDisable } = require('./specials');
const { makeMove } = require('./actions');

// HEROSELECTED

function createDeck(heroName) {
    const cards = allCharacters[heroName].cards;
    const deck = {};
    let key = 0;
    for (const cardType in cards) {
    // take count, create a new card for this type
        for (let i = 0; i < cards[cardType].count; i += 1) {
            const keyId = `key${key}`;
            deck[keyId] = { ...allCards[cardType] };
            key += 1;
        }
    }

    return deck;
}

function assignCards(deck, cardsNumber) {
    const d = Object.keys(deck)
        .sort(() => Math.random() - 0.5)
        .slice(0, cardsNumber);
    const cards = {};
    d.forEach((key) => {
        cards[key] = deck[key];
        if (cards[key].type === cardConst.ITEMCARD) {
            cards[key].healthCurrent = cards[key].health;
        }
        if (cards[key].initialpoints !== undefined) {
            cards[key].points = cards[key].initialpoints;
        }
        cards[key].disabled = false;
    });
    return cards;
}

const generatePlayer = function (heroName, id) {
    const player = {};
    player.id = id;
    player.hand = {};
    player.item = {};
    player.grave = {};
    player.turningHand = false;
    player.moveCounter = 0;
    player.health = {};
    player.deal = 0;
    player.background = allCharacters[heroName].background;
    player.hero = heroName;
    player.deck = createDeck(heroName);
    player.cards = assignCards(player.deck, allCharacters[heroName].cardsNumber);
    player.health.current = allCharacters[heroName].health;
    player.health.maximum = allCharacters[heroName].health;

    const keyHero = Object.create(null);
    player.keyHero = keygen.number();
    keyHero[player.keyHero] = player;
    return player;
};

function getRandomBool() {
    const rand = getRandomUpTo(2, 'firstPlayerActive');
    return rand === 0;
}

const selectActive = function (players) {
    if (players.length < 2) {
        return null;
    }
    const rand = getRandomBool();
    if (rand) {
        return players[0].id;
    }
    return players[1].id;
};

const assignPlayersPositions = function (players) {
    if (players.length < 2) {
        return players;
    }

    players[0].position = styles.BOTTOM;
    players[1].position = styles.TOP;
    return players;
};

// DEALALL

function playerHasCards(pActive) {
    // eslint-disable-next-line max-len
    // console.log('playerHasCards', Object.keys(pActive.cards).length, Object.keys(pActive.hand).length);
    if (
        Object.keys(pActive.cards).length + Object.keys(pActive.hand).length
    >= 5
    ) {
        return true;
    }
    return false;
}

function dealFromGraveyard(graveyard) {
    // Shffle cards we had in graveryard;
    return assignCards(graveyard, Object.keys(graveyard).length);
}

function giveCardsTo(player) {
    // console.log(`PLAYER ${player.hero} HAS IN DECK `, Object.keys(player.cards).length);
    // console.log(`PLAYER ${player.hero} HAS IN GRAVEYARD `, Object.keys(player.grave).length);
    // console.log(`PLAYER ${player.hero} HAS IN HAND `, Object.keys(player.hand).length);
    if (!playerHasCards(player)) {
    // console.log('NO CARDS');
    // Player doesn't have cards to acts
    // Move cards from graveyard. Set deal to 1;
        player.deal += 1;
        player.cards = dealFromGraveyard(player.grave);
        player.grave = {};
    }
    while (Object.keys(player.hand).length < 5) {
        if (Object.keys(player.cards).length > 0) {
            // const key = randomKey(player.cards);
            const key = Object.keys(player.cards)[0];
            player.hand[key] = player.cards[key];
            delete player.cards[key];
        } else {
            break;
        }
    }

    return player;
}

function giveCardsToAll(players) {
    players.forEach((p) => {
        giveCardsTo(p);
        removeDisable(p);
    });
    return players;
}

function handle(app, msg) {
    const game = { ...app.game };
    switch (msg.type) {
    case message.HEROSELECTED: {
        const playersInitital = game.players.concat(
            generatePlayer(msg.hero, msg.player),
        );
        const active = selectActive(playersInitital);
        const players = assignPlayersPositions(playersInitital);
        return Object.assign(game, { active, players });
    }
    case message.DEALALL: {
        return Object.assign(game, { players: giveCardsToAll(game.players) });
    }
    // All actions have the same action name as they all call the same function
    case message.ACTION: {
        // helperToDebug(message, game);
        return Object.assign(game, makeMove(game, msg));
    }
    default:
        return game;
    }
}

module.exports = {
    giveCardsTo,
    handle,
};
