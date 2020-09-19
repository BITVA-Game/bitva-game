/* eslint-disable no-param-reassign */
const keygen = require('keygenerator');

const { getRandomUpTo } = require('../gameTerminal/randomFunc');
const allCharacters = require('../gameTerminal/data/characters.json');
const allCards = require('../gameTerminal/data/cards.json');

const { card: cardConst } = require('../src/constants');

function getRandomBool() {
    const rand = getRandomUpTo(2, 'firstPlayerActive');
    return rand === 0;
}

function getActivePlayer(game) {
    return game.players.find((p) => p.id === game.active);
}

function getInActivePlayer(game) {
    return game.players.find((p) => p.id !== game.active);
}

// helper function to get random index for player's cards in hand
function getRandomIndexes(cardsLength) {
    const index1 = getRandomUpTo(cardsLength, 'index1Bow');
    let index2 = getRandomUpTo(cardsLength, 'index2Bow');
    if (index2 === index1) {
        index2 = getRandomUpTo(cardsLength);
    }
    return [index1, index2];
}

function getItemId(item) {
    let itemId;
    const itemKey = Object.keys(item)[0];
    if (itemKey) {
        itemId = item[itemKey].id;
    }
    return itemId;
}

function setDisabledPropertyToDefault(player) {
    const playerCards = Object.values(player.hand);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < Object.keys(player.hand).length; i++) {
        if (playerCards[i].disabled === true) {
            playerCards[i].disabled = false;
        }
    }
    return playerCards;
}

function setDisabledProperty(card) {
    const currentCard = card;
    if (currentCard.panic === false) {
        currentCard.disabled = false;
    } else {
        currentCard.disabled = true;
    }
}

function setHealthToZero(currentHealth) {
    let health = currentHealth;
    if (health < 0) {
        health = 0;
    }
}

function increaseHealth(players) {
    for (let i = 0; i < players.length; i += 1) {
    // if any player has current health == maximum health
    // then player remains with current health
        if (players[i].health.current !== players[i].health.maximum) {
            const allPlayers = players;
            allPlayers[i].health.current += 1;
        }
    }
    return players;
}

function decreaseHealth(players) {
    for (let i = 0; i < players.length; i += 1) {
        const allPlayers = players;
        allPlayers[i].health.current -= 1;
    }
    return players;
}

// function to remove panic true (for forestMushroom card) from player's hand cards
function removePanic(player) {
    const playerCards = Object.values(player.hand);
    playerCards.forEach((card) => (card.panic === true ? delete card.panic : null));
    if (Object.keys(player.item).length !== 0) {
        delete Object.values(player.item)[0].panic;
    }
    return playerCards;
}

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

function generatePlayer(heroName, id) {
    const keyHero = Object.create(null);
    const initialPlayer = {
        hand: {},
        item: {},
        grave: {},
        turningHand: false,
        moveCounter: 0,
        health: {},
        deal: 0,
        keyHero: keygen.number(),
    };
    const player = { ...initialPlayer };
    player.id = id;
    player.background = allCharacters[heroName].background;
    player.health.current = allCharacters[heroName].health;
    player.health.maximum = allCharacters[heroName].health;
    player.hero = heroName;
    player.deck = createDeck(heroName);
    player.cards = assignCards(player.deck, allCharacters[heroName].cardsNumber);
    keyHero[player.keyHero] = player;
    return player;
}

function selectActive(players) {
    if (players.length < 2) {
        return null;
    }
    const rand = getRandomBool();
    if (rand) {
        return players[0].id;
    }
    return players[1].id;
}

function playerHasCards(pActive) {
    if (Object.keys(pActive.cards).length + Object.keys(pActive.hand).length >= 5) {
        return true;
    }
    return false;
}

function dealFromGraveyard(graveyard) {
    // Shuffle cards we had in graveryard;
    return assignCards(graveyard, Object.keys(graveyard).length);
}

function giveCardsTo(player) {
    // console.log(`PLAYER ${player.hero} HAS IN DECK `, Object.keys(player.cards).length);
    // console.log(`PLAYER ${player.hero} HAS IN GRAVEYARD `, Object.keys(player.grave).length);
    // console.log(`PLAYER ${player.hero} HAS IN HAND `, Object.keys(player.hand).length);
    if (!playerHasCards(player)) {
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
        setDisabledPropertyToDefault(p);
    });
    return players;
}

// function to change lastAction game property (using for playing sound)
function lastActionChange(game, lastAction) {
    game.lastAction.type = lastAction;
}

function damagePlayer(player, points) {
    player.health.current -= points;
}

function healPlayer(player, points) {
    if (player.health.current + points > player.health.maximum) {
        player.health.current = player.health.maximum;
    } else {
        player.health.current += points;
    }
}

const deleteCardsShownProperty = (opponent) => {
    delete opponent.cardsShown;
};

module.exports = {
    getActivePlayer,
    getInActivePlayer,
    getRandomIndexes,
    getItemId,
    setDisabledPropertyToDefault,
    setDisabledProperty,
    setHealthToZero,
    increaseHealth,
    decreaseHealth,
    removePanic,
    generatePlayer,
    selectActive,
    giveCardsTo,
    giveCardsToAll,
    lastActionChange,
    damagePlayer,
    healPlayer,
    deleteCardsShownProperty,
};
