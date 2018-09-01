/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint func-names: ["error", "as-needed"] */

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
    /*
    for (const cardType in heroCardTypes) {
        // take count, create a new card for this type
        for (let i = 0; i < heroCardTypes[cardType].count; i += 1) {
            const newCard = allCards[cardType];
            // cards[newCard.id] = newCard;
            cardsArray.push(newCard);
        }
        // console.log(cardsArray);
    }
    */

    const cards = Object.keys(heroCardTypes);
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
    // console.log(cardsArray);
    }
    const deck = cardsArray.sort(() => Math.random() - 0.5);
    const deckHero = deck.slice(0, 15);
    // console.log(deckHero);
    return deckHero;
}

const generatePlayers = function (heroName) {
    const rand = getRandomBool();
    const players = [
        { active: rand },
        { active: !rand },
    ];

    players.forEach((p) => {
        if (p.active) {
            p.hero = heroName;
            p.cards = assignCards(heroName);
        }
    });
    
    return { players };
};

function handle(app, message) {
    switch (message.type) {
    case 'INITIAL': {
        return app.game;
    }
    case 'HEROSELECTED': {
        const heroName = message.hero;
        // console.log(heroName);
        return Object.assign({}, app.game, generatePlayers(heroName));
    }
    default: { return app.game; }
    }
}

exports.handle = handle;
