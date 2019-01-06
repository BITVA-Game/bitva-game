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
            p.cards = assignCards(p.deck, allCharacters[heroName].cardsNumber);
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
            p.cards = assignCards(p.deck, allCharacters[heroSecondName].cardsNumber);
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

// function randomKey(hashtable) {
//     const keys = Object.keys(hashtable);
//     return keys[Math.floor(keys.length * Math.random())];
// }

function giveCardsTo(player) {
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

function giveCardsToAll(playersArray) {
    playersArray.forEach((p) => {
        giveCardsTo(p);
    });

    return playersArray;
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
        moveCardGraveyard(player, itemKey, 'item');
    } else {
        // console.log('item < points');
        damagePlayer(player, points - player.item[itemKey].points);
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
    // active player's item get the active card's key from his hand
    player.item[key] = player.hand[key];
    // we delete the card with active key from player's hand
    delete player.hand[key];
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
    // console.log('playerActs called');
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
    if (player.moveCounter === 2) {
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
    let pActive;
    let pInactive;
    game.players.forEach((p) => {
        if (p.active) {
            pActive = p;
        } else {
            pInactive = p;
        }
    });

    // We expect the first card is always the selected card that acts
    if (pActive.moveCounter < 2) {
        game = playerActs(game, pActive, pInactive, msg.activeCard, msg.target);
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
    // All actions have the same action name as they all call the same function
    case 'ACTION': {
        return Object.assign({}, app.game, makeMove(app.game, message));
    }
    default: { return app.game; }
    }
}

exports.handle = handle;
