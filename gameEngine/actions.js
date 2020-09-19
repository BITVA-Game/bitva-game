/* eslint-disable no-param-reassign */
const { getRandomUpTo } = require('../gameTerminal/randomFunc');

const { card: cardConst, action } = require('../src/constants');

const {
    waterCard,
    bowArrow,
    turningPotion,
    clairvoyance,
    russianOven,
    skullLantern,
} = require('./specials');

const { attackOpponent } = require('./attack');

const { moveCardGraveyard } = require('./graveyard');

const {
    getActivePlayer,
    getInActivePlayer,
    getItemId,
    removePanic,
    lastActionChange,
    healPlayer,
    deleteCardsShownProperty,
    giveCardsTo,
    setDisabledPropertyToDefault,
} = require('./helpers');

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

function turningPotionEffect(pInactive, pActive, cardId) {
    if (pActive.turningHand === true) {
        moveCardGraveyard(pInactive, cardId);
    } else {
        moveCardGraveyard(pActive, cardId);
    }
}

// EXPORTS

function changeMoveCounter(pActive, card, pInactive) {
    if (pActive.hand[card] === undefined && pActive.turningHand === false) {
        pActive.moveCounter += 1;
        const noClairvoyance = (player) => setTimeout(() => deleteCardsShownProperty(player), 1000);
        noClairvoyance(pInactive);
        noClairvoyance(pActive);
    }
    return pActive;
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
                if (player.turningHand === true) {
                    removePanic(opponent);
                } else {
                    removePanic(player);
                }
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

// function forestMushroom accepts opponent
// and if opponent get 60% chance, then his/ her cards in hand
// get panic: true property except one random card
// so at the begginig of opponent action he can play only this card
function forestMushroom(game, opponent) {
    // console.log('We ate forest mushrooms!!', opponent.hero);
    const chance = getRandomUpTo(10, 'chanceforestMushroom');
    const opponentCards = Object.values(opponent.hand);
    if (chance <= 6) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < Object.keys(opponent.hand).length; i++) {
            opponentCards[i].panic = true;
        }
        if (Object.keys(opponent.item).length !== 0) {
            Object.values(opponent.item)[0].panic = true;
        }
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

// checks if opponent item is not empty and if opponent has magicTree card in item
// if so - function change turn runs after moveCounter === 1, active layer becomes inactive etc.
function magicTree(game) {
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    const itemId = getItemId(pInactive.item);
    if (pActive.moveCounter === 1 && itemId === cardConst.MAGICTREECARD) {
        giveCardsTo(pActive);
        changeTurn(game);
    }
}

function playerMoveEnd(pActive, pInactive, game) {
    // we call function to return disabled cards property to false if any have true
    setDisabledPropertyToDefault(pActive);
    // we call function to give cards to players up to 5
    if (pActive.health.current > 0) {
        giveCardsTo(pActive);
    }

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

// eslint-disable-next-line consistent-return
function pActiveIsTarget(game, activeCard, cardId) {
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    switch (activeCard.category) {
    case cardConst.HEALCATEGORY:
        healPlayer(pActive, activeCard.points);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.HEAL);
        if (pActive.turningHand === true) {
            moveCardGraveyard(pInactive, cardId);
        } else {
            moveCardGraveyard(pActive, cardId);
        }
        break;
    case cardConst.ATTACKCATEGORY:
        break;
    // if any mistake occurs during game process, player gets error message by default
    default:
        return new Error('You are under spell. Wait for redemption!');
    }
}

// eslint-disable-next-line consistent-return
function pInactiveIsTarget(game, activeCard, cardId) {
    const pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);
    switch (activeCard.category) {
    case cardConst.HEALCATEGORY:
        break;
    case cardConst.ATTACKCATEGORY:
        attackOpponent(pInactive, pActive, activeCard.points);
        turningPotionEffect(pInactive, pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.ATACKOPPONENT);
        break;
    // if player attacks with card category holdCard we call disableCards function
    // then move this attack card to gravyeard
    case cardConst.HOLDCARDCATEGORY:
        russianOven(pInactive);
        turningPotionEffect(pInactive, pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.CHAINS);
        break;
    // if player attacks with card category == attackItems, we call attack items function
    // then move this attack card to gravyeard
    case cardConst.ATTACKITEMSCATEGORY:
        skullLantern(game.players);
        turningPotionEffect(pInactive, pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.ATTACKITEMS);
        break;
    // if player attackes with clairvoyance card, we call showCards function
    // then move this attack card to gravyeard
    case cardConst.SHOWCARDSCATEGORY:
        clairvoyance(pInactive);
        turningPotionEffect(pInactive, pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.CLAIRVOYANCE);
        break;
    // if player attackes with turningPotion card, we call turningHand function
    // then move this attack card to gravyeard
    case cardConst.TURNINGCATEGORY:
        turningPotion(pActive, pInactive);
        moveCardGraveyard(pActive, cardId);
        // after player's act we change lastAction property of the game
        lastActionChange(game, action.TURNINGPOTION);
        break;

    // if any mistake occurs during game process, player gets error message by default
    default:
        return new Error('You are under spell. Wait for redemption!');
    }
}

module.exports = {
    changeMoveCounter,
    moveItem,
    forestMushroom,
    magicTree,
    playerMoveEnd,
    pActiveIsTarget,
    pInactiveIsTarget,
};
