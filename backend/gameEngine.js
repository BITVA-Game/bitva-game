/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
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

function assignCards(deck, cardsNumber) {
    const d = Object.keys(deck).sort(() => Math.random() - 0.5).slice(0, cardsNumber);
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

// we retrieve the name of the 2nd character not taken from the list previoulsy.
function searchSecondHero(heroKey, CharacterArray) {
    for (let i = 0; i < CharacterArray.length; i += 1) {
        if (CharacterArray[i].id !== heroKey) {
            return CharacterArray[i].id;
        }
    }
    return true;
}

const generatePlayers = function (heroName) {
    const rand = getRandomBool();
    const players = [
        { active: rand },
        { active: !rand },
    ];

    // We create array from all characters objects.
    const allCharactersArray = Object.values(allCharacters);
    const heroSecondName = searchSecondHero(heroName, allCharactersArray);

    // Assign the common data
    players.forEach((p) => {
        p.hand = {};
        p.item = {};
        p.grave = {};
        p.moveCounter = 0;
        p.health = {};
        p.deal = 0;
    });

    // Assign individual data to player 0
    players[0].position = 'bottom';
    players[0].hero = heroName;
    players[0].deck = createDeck(heroName);
    players[0].cards = assignCards(players[0].deck, allCharacters[heroName].cardsNumber);
    players[0].health.current = allCharacters[heroName].health;
    players[0].health.maximum = allCharacters[heroName].health;

    // Assign individual data to player 1
    players[1].position = 'top';
    players[1].hero = heroSecondName;
    players[1].deck = createDeck(heroSecondName);
    players[1].cards = assignCards(players[1].deck, allCharacters[heroSecondName].cardsNumber);
    players[1].health.current = allCharacters[heroSecondName].health;
    players[1].health.maximum = allCharacters[heroSecondName].health;

    console.log(`${players[0].hero} is active is ${players[0].active}`);
    console.log(`${players[1].hero} is active is ${players[1].active}`);
    return players;
};

function playerHasCards(pActive) {
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
        console.log('NO CARDS');
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

// This function taked the player and the key for his cards
// And moves it so graveyard via deleting the key from array
function moveCardGraveyard(player, key, from) {
    if (from === 'item') {
        // console.log('moveCardGraveyard called for item ', player, key);
        player.grave[key] = player.item[key];
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

function attackShield(player, itemKey, points) {
    // console.log('attackShield');
    if (player.item[itemKey].points > points) {
        // console.log('item > points');
        player.item[itemKey].points -= points;
    } else if (player.item[itemKey].points === points) {
        // console.log('item == points');
        player.item[itemKey].points = player.item[itemKey].initialpoints;
        moveCardGraveyard(player, itemKey, 'item');
        // console.log(player.grave[itemKey]);
    } else {
        // console.log('item < points', player.item[itemKey].points, points);
        damagePlayer(player, points - player.item[itemKey].points);
        player.item[itemKey].points = player.item[itemKey].initialpoints;
        moveCardGraveyard(player, itemKey, 'item');
    }
}

function attackOpponent(player, points) {
    // console.log('attackOpponent ', player, points);
    let itemCategory;
    const itemKey = Object.keys(player.item)[0];
    itemKey ? itemCategory = player.item[itemKey].category : null;
    if (Object.keys(player.item).length === 0 || itemCategory !== 'shield') {
        player.health.current -= points;
        if (player.health.current <= 0) {
            player.health.current = 0;
        }
    } else if (Object.keys(player.item).length === 1 && itemCategory === 'shield') {
        // console.log('Were in attack shield');
        console.log(itemKey);
        attackShield(player, itemKey, points);
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
function moveItem(player, key) {
    // we check if there is no card in item holder of active player
    if (Object.keys(player.item).length === 0) {
        // then active player's item get the active card's key from his hand
        player.item[key] = player.hand[key];
        // and also we delete the card with active key from player's hand
        delete player.hand[key];
    }
}

function cardIncreaseHealth(players) {
    for (let i = 0; i < players.length; i += 1) {
        players[i].health.current += 1;
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
            case 'livingWater':
                //  console.log('We are in living water case!');
                cardIncreaseHealth(players);
                // we deduct 1 point from item card points
                itemCard.points -= 1;
                break;
            // if it is Dead Water card then we run function
            // that decrease players current health by 1 point
            case 'deadWater':
                // console.log('We are in dead water case!');
                cardDecreaseHealth(players);
                // we deduct 1 point from item card points
                itemCard.points -= 1;
                break;
            }
            if (itemCard.points === 0) {
                // we move water item card to graveyard if its points == 0
                // console.log('We are in item card has 0 ponts!', p, (Object.keys(p.item)[0]));
                moveCardGraveyard(p, (Object.keys(p.item)[0]), 'item');
            }
        }
    });
    return { players };
}

function playerActs(game, player, opponent, active, target) {
    const activeCard = player.hand[active];
    // If the key for the second card is graveyard
    // We send the card that has key1 to graveyard
    if (target === 'graveyard') {
        // if active card is in item holder
        if (Object.keys(player.item)[0] === active) {
            // We move active card from item holder to graveyard
            moveCardGraveyard(player, active, 'item');
        } else {
            // In other cases we move active card from hand to Graveyard
            moveCardGraveyard(player, active);
        }
    }
    // if target is active player's hero, player can only heal his hero
    // then his active card moves to graveyard. Other scenarios are not allowed
    if (target === 'hero') {
        if (activeCard.type === 'action') {
            // eslint-disable-next-line default-case
            switch (activeCard.category) {
            case 'heal':
                healPlayer(player, activeCard.points);
                moveCardGraveyard(player, active);
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
    if (target === 'opponent') {
        if (activeCard.type === 'action') {
            // eslint-disable-next-line default-case
            switch (activeCard.category) {
            case 'heal':
                break;
            case 'attack':
                // console.log('attacking opponent');
                attackOpponent(opponent, activeCard.points);
                moveCardGraveyard(player, active);
                if (opponent.health.current <= 0) {
                    game.phase = 'OVER';
                }
                break;
                // if any mistake occurs during game process, player gets error message by default
            default:
                return new Error('You are under spell. Wait for redemption!');
            }
        }
    }
    if (target === 'item' && activeCard.type === 'item') {
        // console.log('We are in move item case');
        moveItem(player, active);
    }
    // after each move we increase active player's counter for 1
    player.moveCounter += 1;


    // once active player's counter ==2 we call function to give cards to players up to 5
    if (player.moveCounter === 2 && game.phase === 'ACTIVE') {
        // console.log(game);
        giveCardsTo(player);
        // active player becomes inactive once active player's counter ==2
        player.active = false;
        // player's counter set to 0
        player.moveCounter = 0;
        // save cards in personal graveyards for both players
        let playerGrave = player.grave;
        let opponentGrave = opponent.grave;
        opponentGrave = playerGrave;
        // inactive player becomes active once active player's counter ==2
        opponent.active = true;
        playerGrave = opponentGrave;
        // we check if there is special water cards in item holder of players
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
    case 'HEROSELECTED': {
        const heroName = message.hero;
        return Object.assign(game, { players: generatePlayers(heroName) });
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
    default: { return game; }
    }
}

exports.handle = handle;
