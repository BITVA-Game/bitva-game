/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
const { getRandomUpTo } = require('../gameTerminal/randomFunc');

const {
    // phase,
    card: cardConst,
    // target: targetConst,
    action,
} = require('../src/constants');

const {
    removePanic,
    waterCard,
    turningHand,
    showCards,
    deleteCardsShown,
    disableCards,
} = require('./specials');


function getActivePlayer(game) {
    return game.players.find((p) => p.id === game.active);
}

function getInActivePlayer(game) {
    return game.players.find((p) => p.id !== game.active);
}

// function to change lastAction game property (using for playing sound)
function lastActionChange(game, lastAction) {
    game.lastAction.type = lastAction;
}

// This function takes the player and the key for his card
// and destination = from, then moves card to graveyard via deleting the key from array
function moveCardGraveyard(player, key, from, opponent) {
    if (from === cardConst.ITEMCARD) {
    // console.log('moveCardGraveyard called for item ', player.hero, key);
        player.grave[key] = player.item[key];
        delete player.item[key];
    } else if (from === cardConst.ITEMINACTIVE) {
    // console.log('moveCardGraveyard called for itemOpponent ', opponent.hero, opponent.grave);
        opponent.grave[key] = player.item[key];
        delete player.item[key];
    } else {
    // console.log('moveCardGraveyard called ', player, key);
        player.grave[key] = player.hand[key];
        // we check if card has panic  == false property (forest Mushroom card)
        // and delete it then we call function removePanic
        if (player.grave[key].panic === false) {
            // console.log('We delete panic!');
            delete player.grave[key].panic;
            removePanic(player);
        }
        delete player.hand[key];
    }
}

function graveyardCheck(game, card, activeCard) {
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    // if active card is in item holder
    if (Object.keys(pActive.item)[0] === card) {
    // We move active card from item holder to graveyard
        moveCardGraveyard(pActive, card, cardConst.ITEMCARD);
    // if active player can chose opponent's card after act with turningPotion
    // then we move card from opponent hand to his grave
    } else if (pActive.turningHand === true) {
        moveCardGraveyard(pInactive, card);
    } else if (activeCard.disabled === false) {
    // In other cases we move active card from hand to Graveyard
        moveCardGraveyard(pActive, card);
    }
}

function damagePlayer(player, points) {
    // console.log('damagePlayer');
    player.health.current -= points;
}

function healPlayer(player, points) {
    // console.log('healPlayer');
    if (player.health.current + points > player.health.maximum) {
        player.health.current = player.health.maximum;
    } else {
        player.health.current += points;
    }
}

function attackShield(player, itemKey, points, opponent) {
    // console.log('attackShield');
    if (player.item[itemKey].healthCurrent > points) {
    // console.log('item > points');
        player.item[itemKey].healthCurrent -= points;
    } else if (player.item[itemKey].healthCurrent === points) {
    // console.log('item == points');
        player.item[itemKey].healthCurrent = player.item[itemKey].health;

        player.item[itemKey].fromOpponent === true
            ? moveCardGraveyard(player, itemKey, cardConst.ITEMINACTIVE, opponent)
            : moveCardGraveyard(player, itemKey, cardConst.ITEMCARD);
    // console.log(player.grave[itemKey]);
    } else {
    // console.log('item < points', player.item[itemKey].healthCurrent, points);
        damagePlayer(player, points - player.item[itemKey].healthCurrent);
        player.item[itemKey].healthCurrent = player.item[itemKey].health;
        player.item[itemKey].fromOpponent === true
            ? moveCardGraveyard(player, itemKey, cardConst.ITEMINACTIVE, opponent)
            : moveCardGraveyard(player, itemKey, cardConst.ITEMCARD);
    }
}

// TODO: rename to magicMirror/plateMail or not
// function to reflect half of the damage (or round down to integer) for magicMirror card
// if active card has 1 attack points then each player gets 1 pnt damage
// or in case of plateMail func reflect 1 point back to player
// if active card has 1 attack points then no damage to both players
function reflect(opponent, player, points) {
    // console.log('We are in reflect function!', player);
    const itemCard = Object.values(opponent.item)[0].id;
    let damage;
    if (itemCard === cardConst.MAGICMIRRORCARD) {
        points === 1 ? (damage = 1) : (damage = Math.floor(points / 2));
        opponent.health.current -= damage;
    }
    if (itemCard === cardConst.PLATEMAILCARD) {
        points === 1 ? (damage = 0) : (damage = 1);
        damage === 0
            ? opponent.health.current
            : (opponent.health.current -= points - damage);
    }
    if (
        Object.keys(player.item).length === 0
    || Object.values(player.item)[0].category !== cardConst.SHIELDCARD
    ) {
        player.health.current -= damage;
    }
    if (
        Object.keys(player.item).length === 1
    && Object.values(player.item)[0].category === cardConst.SHIELDCARD
    ) {
        attackShield(player, Object.keys(player.item)[0], damage);
    }
    if (player.health.current < 0) {
        player.health.current = 0;
    }
    if (opponent.health.current < 0) {
        opponent.health.current = 0;
    }
}

// function to handle attack points deduction from opponent player health
// depending on item card if any present
function attackOpponent(player, opponent, points) {
    // console.log('attackOpponent ', player, points);
    let itemCategory;
    const itemKey = Object.keys(player.item)[0];
    itemKey ? (itemCategory = player.item[itemKey].category) : null;

    // we check if item holder is not empty and item card does not have shield category
    const itemLength = Object.keys(player.item).length;
    if (itemLength === 0 || itemCategory !== cardConst.SHIELDCATEGORY) {
    // and if item card does not have 'reflect' category (e.g. magicMirror card)
    // we descrease hero health for attack card points
        if (itemCategory !== cardConst.REFLECTCATEGORY) {
            player.health.current -= points;
        }
        // we check for special mirror card at opponent item holder with category 'reflect'
        // and run reflect function if it is present there
        if (itemCategory === cardConst.REFLECTCATEGORY) {
            opponent.turningHand === true
                ? reflect(opponent, player, points)
                : reflect(player, opponent, points);
        }
        if (player.health.current <= 0) {
            player.health.current = 0;
        }
    } else if (itemLength === 1 && itemCategory === cardConst.SHIELDCATEGORY) {
    // console.log('Were in attack shield');
    // console.log(itemKey);
        attackShield(player, itemKey, points, opponent);
    }
}

function pActiveIsTarget(game, activeCard, cardId) {
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    switch (activeCard.category) {
    case cardConst.HEALCATEGORY:
        healPlayer(pActive, activeCard.points);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.HEAL);
        pActive.turningHand === true
            ? moveCardGraveyard(pInactive, cardId)
            : moveCardGraveyard(pActive, cardId);
        break;
    case cardConst.ATTACKCATEGORY:
        break;
    // if any mistake occurs during game process, player gets error message by default
    default:
        return new Error('You are under spell. Wait for redemption!');
    }
}

// TODO: rename to Skull Lantern
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
            moveCardGraveyard(p, Object.keys(p.item)[0], cardConst.ITEMCARD);
        }
        // we check whether each player hand is not empty
        if (Object.keys(p.hand).length !== 0) {
            // and for each card in hand with type item
            for (const cardIndex in p.hand) {
                if (p.hand[cardIndex].type === cardConst.ITEMCARD) {
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

function pInactiveIsTarget(game, activeCard, cardId) {
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    // eslint-disable-next-line default-case
    switch (activeCard.category) {
    case cardConst.HEALCATEGORY:
        break;
    case cardConst.ATTACKCATEGORY:
        attackOpponent(pInactive, pActive, activeCard.points);
        pActive.turningHand === true
            ? moveCardGraveyard(pInactive, cardId)
            : moveCardGraveyard(pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.ATACKOPPONENT);
        break;
    // if player attacks with card category holdCard we call disableCards function
    // then move this attack card to gravyeard
    case cardConst.HOLDCARDCATEGORY:
        disableCards(pInactive);
        pActive.turningHand === true
            ? moveCardGraveyard(pInactive, cardId)
            : moveCardGraveyard(pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.CHAINS);
        break;
    // if player attacks with card category == attackItems, we call attack items function
    // then move this attack card to gravyeard
    case cardConst.ATTACKITEMSCATEGORY:
        attackItems(game.players);
        pActive.turningHand === true
            ? moveCardGraveyard(pInactive, cardId)
            : moveCardGraveyard(pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.ATTACKITEMS);
        break;
    // if player attackes with clairvoyance card, we call showCards function
    // then move this attack card to gravyeard
    case cardConst.SHOWCARDSCATEGORY:
        showCards(pInactive);
        pActive.turningHand === true
            ? moveCardGraveyard(pInactive, cardId)
            : moveCardGraveyard(pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.CLAIRVOYANCE);
        break;
    // if player attackes with turningPotion card, we call turningHand function
    // then move this attack card to gravyeard
    case cardConst.TURNINGCATEGORY:
        turningHand(pActive, pInactive);
        moveCardGraveyard(pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.TURNINGPOTION);
        break;

    // if any mistake occurs during game process, player gets error message by default
    default:
        return new Error('You are under spell. Wait for redemption!');
    }
}

// we move item card from active player's hand to his item holder
function moveItem(game, player, key, opponent) {
    // we check if there is no card in item holder of active player
    if (Object.keys(player.item).length === 0) {
    // if active player has not gotten property turningHand
        if (player.turningHand !== true) {
            // then active player's item get the active card's key from his hand
            player.item[key] = player.hand[key];
            // we check if card has panic  == false property (forest Mushroom card)
            // and delete it, then we call function removePanic
            if (player.item[key].panic === false) {
                // console.log('We delete panic!');
                delete player.item[key].panic;
                player.turningHand === true
                    ? removePanic(opponent)
                    : removePanic(player);
            }
            // and also we delete the card with active key from player's hand
            delete player.hand[key];
            // if player attacked with turningPotion and got turningHand property
            // then she / he can put to item holder an item card from opponent hand
        }
        if (player.turningHand === true) {
            // then active player's item get the active card's key from opponent's hand
            player.item[key] = opponent.hand[key];
            // and such card got new property fromOpponent: true
            // so we may return it later on back to opponent cards via opponent's graveyard
            player.item[key].fromOpponent = true;
            // and also we delete the card with active key from opponent's hand
            delete opponent.hand[key];
        }
    }
    // after player's act we change lastAction property of the game
    lastActionChange(game, action.ITEM);
}

function changeMoveCounter(pActive, card, pInactive) {
    if (pActive.hand[card] === undefined && pActive.turningHand === false) {
        pActive.moveCounter += 1;
        const noClairvoyance = (player) => setTimeout(() => deleteCardsShown(player), 1000);
        noClairvoyance(pInactive);
        noClairvoyance(pActive);
    }
    return pActive;
}

// function that change turn in the game
function changeTurn(game) {
    // active player becomes inactive
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    // player's counter set to 0
    pActive.moveCounter = 0;
    // inactive player becomes active
    game.active = pInactive.id;
    // and run function water if any
    waterCard(game.players);
}

// function forestMushroom accepts opponent
// and if opponent get 60% chance, then his/ her cards in hand
// get panic: true property except one random card
// so at the begginig of opponent action he can play only this card
function forestMushroom(game, opponent) {
    // console.log('We ate forest mushrooms!!', opponent.hero);
    const chance = getRandomUpTo(10, 'chanceforestMushroom');
    const opponentCards = Object.values(opponent.hand);
    if (chance <= 6) {
        for (let i = 0; i < Object.keys(opponent.hand).length; i++) {
            opponentCards[i].panic = true;
        }
        Object.keys(opponent.item).length !== 0
            ? (Object.values(opponent.item)[0].panic = true)
            : null;
        const index = getRandomUpTo(opponentCards.length, 'indexMushroom');
        opponentCards[index].panic = false;
        if (opponentCards[index].disabled === true) {
            opponentCards[index].panic = false;
            opponentCards[index].disabled = false;
        }
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.CHAINS);
    }
    return opponentCards;
}

module.exports = {
    getActivePlayer,
    getInActivePlayer,
    lastActionChange,
    moveCardGraveyard,
    graveyardCheck,
    attackShield,
    pActiveIsTarget,
    attackItems,
    pInactiveIsTarget,
    moveItem,
    changeMoveCounter,
    changeTurn,
    forestMushroom,
};
