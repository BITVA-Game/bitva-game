/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint func-names: ["error", "as-needed"] */
/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": true }] */
const keygen = require('keygenerator');
const { getRandomUpTo } = require('./randomFunc');


const allCharacters = require('./data/characters.json');
const allCards = require('./data/cards.json');

function getRandomBool() {
    const rand = getRandomUpTo(2, 'indexPlayer');
    return rand === 0;
}

function assignCards(deck, cardsNumber) {
    const d = Object.keys(deck).sort(() => Math.random() - 0.5).slice(0, cardsNumber);
    const cards = {};
    d.forEach((key) => {
        cards[key] = deck[key];
        if (cards[key].type === 'item') {
            cards[key].healthCurrent = cards[key].health;
        }
        if (cards[key].initialpoints !== undefined) {
            cards[key].points = cards[key].initialpoints;
        }
        cards[key].disabled = false;
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
            deck[keyId] = Object.assign({}, allCards[cardType]);
            key += 1;
        }
    }

    return deck;
}

const assignPlayers = function (players) {
    const rand = getRandomBool();
    players[0].active = rand;
    players[1].active = !rand;

    players[0].position = 'bottom';
    players[1].position = 'top';
    return players;
};

const generatePlayer = function (heroName) {
    const player = {};
    player.hand = {};
    player.item = {};
    player.grave = {};
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

function playerHasCards(pActive) {
// eslint-disable-next-line max-len
// console.log('playerHasCards', Object.keys(pActive.cards).length, Object.keys(pActive.hand).length);
    if ((Object.keys(pActive.cards).length + Object.keys(pActive.hand).length) >= 5) {
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
    });

    return players;
}

// This function takes the player and the key for his card
// and destination = from, then moves card to graveyard via deleting the key from array
function moveCardGraveyard(player, key, from, opponent) {
    if (from === 'item') {
        // console.log('moveCardGraveyard called for item ', player.hero, key);
        player.grave[key] = player.item[key];
        delete player.item[key];
    } else if (from === 'itemInactive') {
        // console.log('moveCardGraveyard called for itemOpponent ', opponent.hero, opponent.grave);
        opponent.grave[key] = player.item[key];
        delete player.item[key];
    } else {
        // console.log('moveCardGraveyard called ', player, key);
        player.grave[key] = player.hand[key];
        delete player.hand[key];
    }
}


function damagePlayer(player, points) {
    // console.log('damagePlayer');
    player.health.current -= points;
}

function attackShield(player, itemKey, points, opponent) {
    // console.log('attackShield');
    if (player.item[itemKey].healthCurrent > points) {
        // console.log('item > points');
        player.item[itemKey].healthCurrent -= points;
    } else if (player.item[itemKey].healthCurrent === points) {
        // console.log('item == points');
        player.item[itemKey].healthCurrent = player.item[itemKey].health;
        // moveCardGraveyard(player, itemKey, 'item');
        player.item[itemKey].fromOpponent === true
            ? moveCardGraveyard(player, itemKey, 'itemInactive', opponent) : moveCardGraveyard(player, itemKey, 'item');
        // console.log(player.grave[itemKey]);
    } else {
        // console.log('item < points', player.item[itemKey].healthCurrent, points);
        damagePlayer(player, points - player.item[itemKey].healthCurrent);
        player.item[itemKey].healthCurrent = player.item[itemKey].health;
        player.item[itemKey].fromOpponent === true
            ? moveCardGraveyard(player, itemKey, 'itemInactive', opponent) : moveCardGraveyard(player, itemKey, 'item');
    }
}

// function to reflect half of the damage (or round down to integer) for magicMirror card
function reflect(opponent, player, points) {
    console.log('We are in reflect function!', player);
    const damage = Math.floor(points / 2);
    opponent.health.current -= damage;
    if (Object.keys(player.item).length === 0 || Object.values(player.item)[0].category !== 'shield') {
        player.health.current -= damage;
    }
    if (Object.keys(player.item).length === 1 && Object.values(player.item)[0].category === 'shield') {
        attackShield(player, Object.keys(player.item)[0], damage);
    }
    if (player.health.current < 0) {
        player.health.current = 0;
    }
}

// function to handle attack points deduction from opponent player health
// depending on item card if any present
function attackOpponent(player, opponent, points) {
    // console.log('attackOpponent ', player, points);
    let itemCategory;
    const itemKey = Object.keys(player.item)[0];
    itemKey ? itemCategory = player.item[itemKey].category : null;

    // we check if item holder is not empty and item card does not have shield category
    const itemLength = Object.keys(player.item).length;
    if (itemLength === 0 || itemCategory !== 'shield') {
        // and if item card does not have 'reflect' category (e.g. magicMirror card)
        // we descrease hero health for attack card points
        if (itemCategory !== 'reflect') {
            opponent.turningHand === true
                ? opponent.health.current -= points : player.health.current -= points;
        }
        // we check for special mirror card at opponent item holder with category 'reflect'
        // and run reflect function if it is present there
        if (itemCategory === 'reflect') {
            opponent.turningHand === true
                ? reflect(opponent, player, points) : reflect(player, opponent, points);
        }
        if (player.health.current <= 0) {
            player.health.current = 0;
        }
    } else if (itemLength === 1 && itemCategory === 'shield') {
        // console.log('Were in attack shield');
        // console.log(itemKey);
        attackShield(player, itemKey, points, opponent);
    }
}

function healPlayer(player, points) {
    // console.log('healPlayer');
    if (player.health.current + points > player.health.maximum) {
        player.health.current = player.health.maximum;
    } else {
        player.health.current += points;
    }
}

// we move item card from active player's hand to his item holder
function moveItem(player, key, opponent) {
    // we check if there is no card in item holder of active player
    if (Object.keys(player.item).length === 0) {
        if (player.turningHand !== true) {
            // then active player's item get the active card's key from his hand
            player.item[key] = player.hand[key];
            // and also we delete the card with active key from player's hand
            delete player.hand[key];
        // if player attacked with turningPotion and got turningHand property
        // then she / he can put to item holder an item card from opponent hand
        } if (player.turningHand === true) {
            // then active player's item get the active card's key from opponent's hand
            player.item[key] = opponent.hand[key];
            // and such card got new property fromOpponent: true
            // so we may return it later on back to opponent cards via opponent's graveyard
            player.item[key].fromOpponent = true;
            // and also we delete the card with active key from opponent's hand
            delete opponent.hand[key];
        }
    }
}

function cardIncreaseHealth(players) {
    for (let i = 0; i < players.length; i += 1) {
        // if any player has current health == maximum health
        // then player remains with current health
        if (players[i].health.current === players[i].health.maximum) {
            players[i].health.current = players[i].health.current;
        // in other cases we increase each player's health with 1 point
        } else {
            players[i].health.current += 1;
        }
    }
    return players;
}

function cardDecreaseHealth(players) {
    for (let i = 0; i < players.length; i += 1) {
        players[i].health.current -= 1;
    }
    return players;
}

// special water cards act with water function
function waterCard(players) {
    // console.log('We are in water function!');
    // we check for each player if they have card in item holder and card points !=0
    players.forEach((p) => {
        // console.log(Object.values(p.item)[0]);
        const itemCard = Object.values(p.item)[0];
        if (Object.keys(p.item).length !== 0 && itemCard.points !== 0) {
            // we run switch by all players item id card
            switch (itemCard.id) {
            // if it is Living Water card then we run function
            // that increase players current health by 1 point
            case 'waterLiving':
                //  console.log('We are in living water case!');
                cardIncreaseHealth(players);
                break;
            // if it is Dead Water card then we run function
            // that decrease players current health by 1 point
            case 'waterDead':
                // console.log('We are in dead water case!');
                cardDecreaseHealth(players);
                break;
            }
        }
    });
    return { players };
}


// function to set disabled property to true to random 2 cards in player's hand for russianOven card
function disableCards(opponent) {
    const opponentCards = Object.values(opponent.hand);
    const index1 = getRandomUpTo(opponentCards.length, 'index1Oven');
    let index2 = getRandomUpTo(opponentCards.length, 'index2Oven');
    if (index2 === index1) {
        index2 = getRandomUpTo(opponentCards.length);
    }
    opponentCards[index1].disabled = true;
    opponentCards[index2].disabled = true;
}

// function to return disabled cards property to false if any have true
function removeDisable(player) {
    const playerCards = Object.values(player.hand);
    for (let i = 0; i < Object.keys(player.hand).length; i++) {
        if (playerCards[i].disabled === true) {
            playerCards[i].disabled = false;
        }
    }
    return playerCards;
}

// function to show 3 cards from opponent cards
// when active player attackes with claivoyance card
function showCards(opponent) {
    const cardsKeys = Object.keys(opponent.cards).reverse().splice(-3);
    opponent.cardsShown = {};
    cardsKeys.forEach((key) => {
        opponent.cardsShown[key] = opponent.cards[key];
    });
    return opponent.cardsShown;
}

// function to delete cardsShown property from player object
const deleteCardsShown = (opponent) => { delete opponent.cardsShown; };

// this function runs when player attacks with the card Skull Lantern which category is attackItems
// it accept players and checks all item category cards from both players item holders and hands
// and move such cards to players grave yards
function attackItems(players) {
    players.forEach((p) => {
        if (Object.keys(p.item).length !== 0) {
            const itemCard = Object.values(p.item)[0];
            // we reset item card's health points to initial points
            itemCard.healthCurrent = itemCard.health;
            // we move any item card to graveyard
            moveCardGraveyard(p, (Object.keys(p.item)[0]), 'item');
        }
        // we check whether each player hand is not empty
        if (Object.keys(p.hand).length !== 0) {
            // and for each card in hand with type item
            for (const cardIndex in p.hand) {
                if (p.hand[cardIndex].type === 'item') {
                    // we reset item card's points to initial points
                    p.hand[cardIndex].healthCurrent = p.hand[cardIndex].health;
                    // we move any item card to graveyard
                    moveCardGraveyard(p, cardIndex);
                }
            }
        }
    });
    return { players };
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

// function to check if opponent has item card with id== bowArrow
// and to randomly ( 60% chance) to decrease pnts of 2 cards in hand by 1 pnt
function bowArrow(player, opponent) {
    // console.log('We are in borrow and Arrow case!');
    let itemId;
    const itemKey = Object.keys(opponent.item)[0];
    itemKey ? itemId = opponent.item[itemKey].id : null;
    if (itemId === 'bowArrow') {
        const chance = getRandomUpTo(10, 'chanceBowArrow');
        if (chance <= 6) {
            const cards = Object.values(player.hand);
            const cardsNew = [];
            for (let i = 0; i < Object.keys(player.hand).length; i++) {
                if (cards[i].initialpoints > 1 && cards[i].type === 'action') {
                    cardsNew.push(cards[i]);
                }
            }

            const indexes = getRandomIndexes(cardsNew.length);
            cardsNew[indexes[0]].points -= 1;
            cardsNew[indexes[1]].points -= 1;
        }
    }
}

// function that change turn in the game
function changeTurn(player, opponent) {
    // active player becomes inactive
    player.active = false;
    // player's counter set to 0
    player.moveCounter = 0;
    // save cards in personal graveyards for both players
    let playerGrave = player.grave;
    let opponentGrave = opponent.grave;
    opponentGrave = playerGrave;
    // inactive player becomes active
    opponent.active = true;
    playerGrave = opponentGrave;
}

// function checks whether opponent item is not empty
// and whether opponent has magicTree card in item
// if so - function change turn runs after moveCounter === 1, active layer becomes inactive etc.
function magicTree(player, opponent) {
    let itemId;
    const itemKey = Object.keys(opponent.item)[0];
    itemKey ? itemId = opponent.item[itemKey].id : null;
    player.moveCounter === 1 && itemId === 'magicTree' ? changeTurn(player, opponent) : null;
}

function malachiteBox(player, opponent, target) {
    let itemId;
    const itemKey = Object.keys(player.item)[0];
    itemKey ? itemId = player.item[itemKey].id : null;
    itemId === 'malachiteBox' && (target === 'opponent' || target === 'grave' || target === 'hero') ? opponent.health.current -= 1 : null;
}

// function set turningHand property to both players
// and allows active player to act with opponent hand card
// the same phase - moveCoutner increases only after act with opponent hand card
function turningHand(player, opponent) {
    player.turningHand = true;
    opponent.turningHand = true;
}

// basic function for the game that represents each act of active player
function playerActs(game, player, opponent, active, target) {
    // at the beggining of each player action
    // we run bowArrow function to check if opponent has bow & arrow card in item
    // and to supress attack points if any
    bowArrow(player, opponent);
    let activeCard;
    player.turningHand !== true
        ? activeCard = player.hand[active] : activeCard = opponent.hand[active];
    // If the key for the second card is graveyard
    // We send the card that has active key to graveyard
    if (target === 'graveyard') {
        // if active card is in item holder
        if (Object.keys(player.item)[0] === active) {
            // We move active card from item holder to graveyard
            moveCardGraveyard(player, active, 'item');
        // if active player can chose opponent's card after act with turningPotion
        // then we move card from opponent hand to his grave
        } else if (player.turningHand === true) {
            moveCardGraveyard(opponent, active);
        } else if (activeCard.disabled === false) {
            // In other cases we move active card from hand to Graveyard
            moveCardGraveyard(player, active);
        }
    }
    // if target is active player's hero, player can only heal his hero
    // then his active card moves to graveyard. Other scenarios are not allowed
    if (target === 'hero' && activeCard.disabled === false) {
        if (activeCard.type === 'action') {
            // eslint-disable-next-line default-case
            switch (activeCard.category) {
            case 'heal':
                healPlayer(player, activeCard.points);
                player.turningHand === true
                    ? moveCardGraveyard(opponent, active) : moveCardGraveyard(player, active);
                break;
            case 'attack':
                break;
                // if any mistake occurs during game process, player gets error message by default
            default:
                return new Error('You are under spell. Wait for redemption!');
            }
        }
    }
    // if target is inactive player's hero - opponent, player can only attack opponent
    // then his active card moves to graveyard. Other scenarios are not allowed
    if (target === 'opponent' && activeCard.disabled === false) {
        if (activeCard.type === 'action') {
            // eslint-disable-next-line default-case
            switch (activeCard.category) {
            case 'heal':
                break;
            case 'attack':
                attackOpponent(opponent, player, activeCard.points);
                player.turningHand === true
                    ? moveCardGraveyard(opponent, active) : moveCardGraveyard(player, active);
                if (opponent.health.current <= 0) {
                    game.phase = 'OVER';
                }
                break;
            // if player attacks with card category holdCard we call disableCards function
            // then move this attack card to gravyeard
            case 'holdCard':
                disableCards(opponent);
                player.turningHand === true
                    ? moveCardGraveyard(opponent, active) : moveCardGraveyard(player, active);
                break;
            // if player attacks with card category == attackItems, we call attack items function
            // then move this attack card to gravyeard
            case 'attackItems':
                attackItems(game.players);
                player.turningHand === true
                    ? moveCardGraveyard(opponent, active) : moveCardGraveyard(player, active);
                if (opponent.health.current <= 0) {
                    game.phase = 'OVER';
                }
                break;
            // if player attackes with clairvoyance card, we call showCards function
            // then move this attack card to gravyeard
            case 'showCards':
                showCards(opponent);
                player.turningHand === true
                    ? moveCardGraveyard(opponent, active) : moveCardGraveyard(player, active);
                break;
            // if player attackes with turningPotion card, we call turningHand function
            // then move this attack card to gravyeard
            case 'turning':
                turningHand(player, opponent);
                moveCardGraveyard(player, active);
                break;

                // if any mistake occurs during game process, player gets error message by default
            default:
                return new Error('You are under spell. Wait for redemption!');
            }
        }
    }

    if (target === 'item' && activeCard.type === 'item') {
        // console.log('We are in move item case');
        moveItem(player, active, opponent);
    }
    // if player attacks opponent item with card type action, then
    // if item is not empty we deduct points of attack from item card points
    // if item card points <= 0 cards get its initial points and goes to graveyard
    if (target === 'itemOpponent' && activeCard.category === 'attack'
    && Object.keys(opponent.item).length !== 0 && Object.values(opponent.item)[0].category !== 'shield') {
        const itemCard = Object.values(opponent.item)[0];
        itemCard.healthCurrent -= activeCard.points;
        if (itemCard.healthCurrent <= 0) {
            // console.log('itemCard.healthCurrent <= 0');
            itemCard.healthCurrent = itemCard.health;
            // console.log(opponent.hero, Object.keys(opponent.item)[0]);
            moveCardGraveyard(opponent, Object.keys(opponent.item)[0], 'item');
        }
        player.turningHand === true
            ? moveCardGraveyard(opponent, active) : moveCardGraveyard(player, active);
    }
    // after each act we delete turningHand property for both players
    // if active player acted after turning potion card
    // we also turn active card's key to null as players's cards keys duplicate
    player.turningHand === true && (active in opponent.grave || active in player.item)
        ? (delete opponent.turningHand) && (delete player.turningHand) && (active = null) : null;
    // after each move we increase active player's counter for 1 if activeCard acted
    // if activeCard remains in player's hand we do not increase move Counter
    player.hand[active] || player.turningHand === true ? null : player.moveCounter += 1;
    // after each move of active player we check whether opponent has magicTree card in item
    magicTree(player, opponent);
    // after each move of active player we run function malachiteBox if applicable
    malachiteBox(player, opponent, target);
    // once active player's move counter == 2
    if (player.moveCounter === 2 && game.phase === 'ACTIVE') {
        // console.log(game);
        // we call function to return disabled cards property to false if any have true
        removeDisable(player);
        // we check then if any cardsShown property in opponent cards
        // and remove by calling deleteCardsShown function
        deleteCardsShown(opponent);
        // we call function to give cards to players up to 5
        giveCardsTo(player);

        // run changeTurn function
        changeTurn(player, opponent);
        // we run bowArrow function to check if opponent has bow & arrow card in item
        // and to supress attack points if any
        bowArrow(player, opponent);
        // and run function water if any
        waterCard(game.players);
    }
    // we return the whole game to continue
    return game;
}

function makeMove(game, msg) {
    // console.log('makeMove called');
    let pActive = game.players[0];
    let pInactive = game.players[1];
    if (!pActive.active) {
        pActive = game.players[1];
        pInactive = game.players[0];
    }
    // We expect the first card is always the selected card that acts
    game = playerActs(game, pActive, pInactive, msg.activeCard, msg.target);

    return game;
}

function handle(appgame, message) {
    const game = Object.assign({}, appgame);

    switch (message.type) {
    case 'INITIAL': {
        return game;
    }
    case 'PROFILE': {
        return game;
    }
    case 'HEROSELECTED': {
        const heroName = message.hero;
        return Object.assign(game, { players: [generatePlayer(heroName)] });
    }
    case 'HEROSSELECTED': {
        const opponentName = message.opponent
            ? message.opponent
            : Object.values(allCharacters)[getRandomUpTo(Object.keys(allCharacters).length, 'indexOpponent')].id;
        console.log(game.players);
        const players = [game.players[0], generatePlayer(opponentName)];
        return Object.assign(game, { players: assignPlayers(players) });
    }
    case 'DEALALL': {
        return Object.assign(game, { players: giveCardsToAll(game.players) });
    }
    // All actions have the same action name as they all call the same function
    case 'ACTION': {
        console.log('ACTION');
        // helperToDebug(message, game);
        return Object.assign(game, makeMove(game, message));
    }
    case 'NETWORKPLAY': { return game; }

    default: { return game; }
    }
}

exports.handle = handle;
