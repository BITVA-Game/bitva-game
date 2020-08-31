/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const keygen = require('keygenerator');
const {
    phase,
    message,
    card: cardConst,
    target: targetConst,
    styles,
    action,
} = require('../src/constants');

const { getRandomUpTo } = require('../gameTerminal/randomFunc');

const allCharacters = require('../gameTerminal/data/characters.json');
const allCards = require('../gameTerminal/data/cards.json');

const {
    bowArrow,
    malachiteBox,
    removeDisable,
} = require('./specials');

const {
    getActivePlayer,
    getInActivePlayer,
    graveyardCheck,
    changeTurn,
    lastActionChange,
    pActiveIsTarget,
    pInactiveIsTarget,
    moveItem,
    moveCardGraveyard,
    changeMoveCounter,
    forestMushroom,
} = require('./actions');

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

function generatePlayer(heroName, id) {
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
}

function getRandomBool() {
    const rand = getRandomUpTo(2, 'firstPlayerActive');
    return rand === 0;
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

function assignPlayersPositions(players) {
    if (players.length < 2) {
        return players;
    }

    players[0].position = styles.BOTTOM;
    players[1].position = styles.TOP;
    return players;
}

// DEALALL

function playerHasCards(pActive) {
    // eslint-disable-next-line max-len
    // console.log('playerHasCards', Object.keys(pActive.cards).length, Object.keys(pActive.hand).length);
    if (Object.keys(pActive.cards).length + Object.keys(pActive.hand).length >= 5) {
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

// OTHER

function playerMoveEnd(pActive, pInactive, game) {
    // console.log(game);
    // we call function to return disabled cards property to false if any have true
    removeDisable(pActive);
    // we check then if any cardsShown property in opponent cards
    // and remove by calling deleteCardsShown function
    // setTimeout(() => deleteCardsShown(pActive), 4000);
    // we call function to give cards to players up to 5
    if (pActive.health.current > 0) {
        giveCardsTo(pActive);
    }

    // run changeTurn function
    changeTurn(game);

    //  after change of turn,  we check
    // whether inactive player has in item holder card forest Mushroom with category panic,
    // then we call function forestMushroom
    if (Object.keys(pActive.item).length !== 0) {
        if (Object.values(pActive.item)[0].category === cardConst.PANICCATEGORY) {
            forestMushroom(game, pInactive, 'afterTurn');
        }
    }
    // we run bowArrow function to check if opponent has bow & arrow card in item
    // and to supress attack points if any
    bowArrow(pActive, pInactive);
}

// function checks whether opponent item is not empty
// and whether opponent has magicTree card in item
// if so - function change turn runs after moveCounter === 1, active layer becomes inactive etc.
function magicTree(game) {
    let itemId;
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    const itemKey = Object.keys(pInactive.item)[0];
    if (itemKey) {
        (itemId = pInactive.item[itemKey].id);
    }
    if (pActive.moveCounter === 1 && itemId === cardConst.MAGICTREECARD) {
        giveCardsTo(pActive);
        changeTurn(game);
    }
}

// basic function for the game that represents each act of active player
function playerActs(game, cardId, target) {
    let pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);

    // at the beggining of each player action
    // we run bowArrow function to check if opponent has bow & arrow card in item
    // and to supress attack points if any
    console.log(typeof bowArrow);
    // TODO Move this out
    bowArrow(pActive, pInactive);
    let activeCard;

    // Player is acting with a full moveCounter, do not approve;
    if (pActive.moveCounter === 2) {
        playerMoveEnd(pActive, pInactive, game);
        return game;
    }

    if (pActive.turningHand !== true) {
        (activeCard = pActive.hand[cardId]);
    } else {
        (activeCard = pInactive.hand[cardId]);
    }
    // If the key for the second card is graveyard
    // We send the card that has active key to graveyard
    // after player's act we change lastAction property of the game
    if (target === targetConst.GRAVE) {
        graveyardCheck(game, cardId, activeCard);
        lastActionChange(game, action.GRAVEYARD);
    }
    // For all the cases when the player acts against himself
    if (
        target === targetConst.HERO
    && activeCard.disabled === false
    && activeCard.type === cardConst.ACTIONCARD
    ) {
        pActiveIsTarget(game, activeCard, cardId);
    }
    // if target is inactive player's hero - opponent, player can only attack opponent
    // then his active card moves to graveyard. Other scenarios are not allowed
    if (
        target === targetConst.OPPONENT
    && activeCard.disabled === false
    && activeCard.type === cardConst.ACTIONCARD
    ) {
        pInactiveIsTarget(game, activeCard, cardId);
    }

    if (
        target === targetConst.ITEMCARD
    && activeCard.type === cardConst.ITEMCARD
    ) {
    // console.log('We are in move item case');
        moveItem(game, pActive, cardId, pInactive);
    }
    // if player attacks opponent item with card type action, then
    // if item is not empty we deduct points of attack from item card points
    // if item card points <= 0 cards get its initial points and goes to graveyard
    if (
        target === targetConst.ITEMOPPONENT
    && activeCard.category === cardConst.ATTACKCATEGORY
    && Object.keys(pInactive.item).length !== 0
    && Object.values(pInactive.item)[0].category !== cardConst.SHIELDCATEGORY
    ) {
        lastActionChange(game, action.ATTACKITEMOPPONENT);
        const itemCard = Object.values(pInactive.item)[0];
        itemCard.healthCurrent -= activeCard.points;
        if (itemCard.healthCurrent <= 0) {
            // console.log('itemCard.healthCurrent <= 0');
            itemCard.healthCurrent = itemCard.health;
            // console.log(opponent.hero, Object.keys(opponent.item)[0]);
            moveCardGraveyard(
                pInactive,
                Object.keys(pInactive.item)[0],
                cardConst.ITEMCARD,
            );
        }
        if (pActive.turningHand === true) {
            moveCardGraveyard(pInactive, cardId);
        } else {
            moveCardGraveyard(pActive, cardId);
        }
    }
    // after each act we delete turningHand property for both players
    // if active player acted after turning potion card
    // we also turn active card's key to null as players's cards keys duplicate
    if (
        pActive.turningHand === true
    && (cardId in pInactive.grave || cardId in pActive.item)
    ) {
        pInactive.turningHand = false;
        pActive.turningHand = false;
        cardId = null;
    }
    // after each move we increase active player's counter for 1 if activeCard acted
    // if activeCard remains in player's hand we do not increase move Counter
    pActive = changeMoveCounter(pActive, cardId, pInactive);

    // after each move of active player we check for forestMushroom in opponent's item
    if (Object.keys(pInactive.item).length !== 0
        && Object.values(pInactive.item)[0].category === cardConst.PANICCATEGORY
        && pActive.moveCounter === 1) {
        forestMushroom(game, pActive);
    }

    // after each move of active player we check whether opponent has magicTree card in item
    magicTree(game);
    // after each move of active player we run function malachiteBox if applicable
    malachiteBox(pActive, pInactive, target);
    // once active player's move counter == 2
    if (pActive.moveCounter === 2 && game.phase === phase.ACTIVE) {
        playerMoveEnd(pActive, pInactive, game);
    }
    // we return the whole game to continue
    if (pInactive.health.current <= 0 || pActive.health.current <= 0) {
        game.phase = phase.OVER;
    }
    return game;
}

function makeMove(game, msg) {
    game = playerActs(game, msg.activeCard, msg.target);
    return game;
}

// HANDLE

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

exports.handle = handle;
