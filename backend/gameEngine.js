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
    /* const cards = Object.keys(heroCardTypes);
for (let j = 0; j < cards.length; j += 1) {
// for (cardType in Object.keys(heroCardTypes)) {
// take count, create a new card for this type
const cardType = cards[j];
if ({}.hasOwnProperty.call(heroCardTypes, cardType)) {
for (let i = 0; i < heroCardTypes[cardType].count; i += 1) {
const newCard = allCards[cardType];
// cards[newCard.id] = newCard;
cardsArray.push(newCard);
}
}
} */
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

    const allCharactersArray = Object.values(allCharacters);
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
            p.playerHand = {};
        }
        if (p.active === false) {
        	p.hero = heroSecondName;
        	p.cards = assignCards(heroSecondName);
            p.playerHand = {};
        }
    });

    return { players };
};

const giveCardsToAll = function () {

};

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
        return Object.assign({}, app.game, giveCardsToAll());

    }
    default: { return app.game; }
    }
}

exports.handle = handle;
