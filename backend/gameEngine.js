/* eslint-disable no-case-declarations */
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

function createDeck(heroName) {
    const cards = allCharacters[heroName].cards;
    const deck = {};
    let key = 0;
    for (const cardType in cards) {
        // take count, create a new card for this type
        for (let i = 0; i < cards[cardType].count; i += 1) {
            const keyId = `key${key}`;
            deck[keyId] = allCards[cardType];
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
            p.item = {};
            p.grave = {};
            p.moveCounter = 0;
            p.health = {};
            p.health.current = allCharacters[heroName].health;
            p.health.maximum = allCharacters[heroName].health;
        }
        if (p.active === false) {
            p.hero = heroSecondName;
            p.deck = createDeck(heroSecondName);
            p.cards = assignCards(p.deck);
            p.hand = {};
            p.item = {};
            p.grave = {};
            p.moveCounter = 0;
            p.health = {};
            p.health.current = allCharacters[heroSecondName].health;
            p.health.maximum = allCharacters[heroSecondName].health;
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

function increaseCounter(player) {
    player.moveCounter += 1;
}

function moveHandGraveyard(player, key) {
    player.grave[key] = player.hand[key];
    delete player.hand[key];
}

function moveItemGraveyard(player) {
    const key = Object.keys(player.item)[0];
    if (key !== undefined) {
        player.grave[key] = player.item[key];
        delete player.item[key];
    }
}

function makeMove(game, msg) {
    let pActive;
    let pInactive;
    game.players.forEach((p) => {
        if (p.active) {
            pActive = p;
        } else {
            pInactive = p;
        }
    });
    if (pActive.moveCounter < 2) {
        const points = pActive.hand[msg.key].points;
        switch (msg.category) {
        case 'graveyard':
            moveHandGraveyard(pActive, msg.key);
            break;

        case 'heal':
            if (pActive.health.current < pActive.health.maximum) {
                pActive.health.current += pActive.hand[msg.key].points;
            } else {
                pActive.health.current = pActive.health.maximum;
            }
            moveHandGraveyard(pActive, msg.key);
            // p.grave[msg.key].points == 0;
            break;
        // eslint-disable-next-line no-case-declarations
        case 'attack':
            const itemInactive = Object.values(pInactive.item)[0];
            if ((itemInactive === undefined) || (itemInactive.category !== 'defense')) {
                if (pInactive.health.current > points) {
                    pInactive.health.current -= pActive.hand[msg.key].points;
                } else {
                    pInactive.health.current = 0;
                }
                moveHandGraveyard(pActive, msg.key);
            }
            if ((itemInactive !== undefined) && (itemInactive.category === 'defense')) {
                const pointsAttack = points - itemInactive.points;
                if (pointsAttack >= 0) {
                    pInactive.health.current -= pointsAttack;
                    moveItemGraveyard(pInactive, itemInactive);
                } else {
                    itemInactive.points -= points;
                }
                moveHandGraveyard(pActive, msg.key);
            }
            break;
        default:
            return new Error('You are under spell. Wait for redemption!');
        }
        increaseCounter(pActive);
    }
    return game;
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
    case 'CASE1': {
        return Object.assign({}, app.game, makeMove(app.game, message));
    }
    case 'CASE2': {
        return Object.assign({}, app.game, makeMove(app.game, message));
    }
    case 'CASE3': {
        return Object.assign({}, app.game, makeMove(app.game, message));
    }

    default: { return app.game; }
    }
}

exports.handle = handle;
