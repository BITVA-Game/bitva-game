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

function assignCards(heroName) {
// const cards = {};
// find all cardTypes for this heroName
    const heroCardTypes = allCharacters[heroName].cards;
    // for each cardType in all CardTypes take count
    const cardsArray = [];

    for (const cardType in heroCardTypes) {
        // take count, create a new card for this type
        for (let i = 0; i < heroCardTypes[cardType].count; i += 1) {
            const newCard = allCards[cardType];
            // cards[newCard.id] = newCard;
            cardsArray.push(newCard);
        }
    }
    const deck = cardsArray.sort(() => Math.random() - 0.5);
    const deckHero = deck.slice(0, 15);

    return deckHero;
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
            p.cards = assignCards(heroName);
            p.health = allCharacters[heroName].health;
            p.playerHand = {};
        }
        if (p.active === false) {
            p.hero = heroSecondName;
            p.cards = assignCards(heroSecondName);
            p.health = allCharacters[heroSecondName].health;
            p.playerHand = {};
        }
    });

    return { players };
};


function giveCardsTo(player) {
    player.playerHand = player.cards.splice(0, 5);
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
