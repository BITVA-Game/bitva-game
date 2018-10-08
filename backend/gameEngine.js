/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint func-names: ["error", "as-needed"] */
/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */

const allCharacters = require('./data/characters.json');
const allCards = require('./data/cards.json');


function getRandomUpTo(n) {
    return Math.floor(Math.random() * Math.floor(n));
}

function getRandomBool() {
    const rand = getRandomUpTo(2);
    return rand === 0;
}

function assignCards(deck) {
    const d = Object.keys(deck).sort(() => Math.random() - 0.5).slice(0, 15);
    const cards = {};
    d.forEach((key) => {
        cards[key] = deck[key];
    });

    return cards;
}

function assignHand(cards) {
    const c = Object.keys(cards).sort(() => Math.random() - 0.5).slice(0, 5);
    const hand = {};
    c.forEach((key) => {
        hand[key] = c[key];
        delete c[key];
    });

    return hand;
}

function createDeck(heroName) {
    const cards = allCharacters[heroName].cards;
    const deck = {};
    let key = 0;
    for (const cardType in cards) {
        // take count, create a new card for this type
        for (let i = 0; i < cards[cardType].count; i += 1) {
            const keyId = `key${key}`;
            const card = allCards[cardType];
            deck[keyId] = card;
            key += 1;
        }
    }

    return deck;
}

const generatePlayers = function (heroName) {
    const rand = getRandomBool();
    const players = [
        { active: rand },
        { active: !rand },

    ];
    // We create array from all characters objects.
    const allCharactersArray = Object.values(allCharacters);

    // we retrieve the name of the 2nd character not taken from the list previoulsy.
    function searchSecondHero(heroKey, CharacterArray) {
        for (let i = 0; i < CharacterArray.length; i += 1) {
            if (CharacterArray[i].id !== heroKey) {
                return CharacterArray[i].id;
            }
        }
        return true;
    }
    const heroSecondName = searchSecondHero(heroName, allCharactersArray);

    players.forEach((p) => {
        if (p.active) {
            p.hero = heroName;
            p.deck = createDeck(heroName);
            p.cards = assignCards(p.deck);
            p.hand = {};
            p.health = allCharacters[heroName].health;
        }
        if (p.active === false) {
            p.hero = heroSecondName;
            p.deck = createDeck(heroSecondName);
            p.cards = assignCards(p.deck);
            p.hand = {};
            p.health = allCharacters[heroSecondName].health;
        }
    });

    return { players };
};

function randomKey(hashtable) {
    const keys = Object.keys(hashtable);
    return keys[Math.floor(keys.length * Math.random())];
}

function giveCardsTo(player) {
    while (Object.keys(player.hand).length < 5) {
        const key = randomKey(player.cards);
        player.hand[key] = player.cards[key];
        delete player.cards[key];
    }

    return player;
}

function giveCardsToAll(playersArray) {
    playersArray.forEach((p) => {
        giveCardsTo(p);
    });
    return playersArray;
}

function handle(app, message) {
    switch (message.type) {
    case 'INITIAL': {
        return app.game;
    }
    case 'HEROSELECTED': {
        const heroName = message.hero;

        return Object.assign({}, app.game, generatePlayers(heroName));
    }
    case 'DEALALL': {
        const playersArray = app.game.players;

        return Object.assign({}, app.game, giveCardsToAll(playersArray));
    }
    default: { return app.game; }
    }
}

exports.handle = handle;
