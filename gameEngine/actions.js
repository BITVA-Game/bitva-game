/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

const {
    phase,
    card: cardConst,
    target: targetConst,
    action,
} = require('../src/constants');

const { giveCardsTo } = require('./specials');

const { bowArrow } = require('./specials');
const { forestMushroom } = require('./specials');
const { removePanic } = require('./specials');
const { magicTree } = require('./specials');
const { reflect } = require('./specials');
const { waterCard } = require('./specials');
const { malachiteBox } = require('./specials');
const { turningHand } = require('./specials');
const { showCards } = require('./specials');
const { deleteCardsShown } = require('./specials');
const { disableCards } = require('./specials');
const { removeDisable } = require('./specials');
const { attackItems } = require('./specials');

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
    Object.keys(pActive.item).length !== 0
  && Object.values(pActive.item)[0].category === cardConst.PANICCATEGORY
        ? forestMushroom(game, pInactive, 'afterTurn')
        : null;
    // we run bowArrow function to check if opponent has bow & arrow card in item
    // and to supress attack points if any
    bowArrow(pActive, pInactive);
}

// basic function for the game that represents each act of active player
function playerActs(game, cardId, target) {
    let pActive = getActivePlayer(game);
    const pInactive = getInActivePlayer(game);

    // at the beggining of each player action
    // we run bowArrow function to check if opponent has bow & arrow card in item
    // and to supress attack points if any

    // TODO Move this out
    bowArrow(pActive, pInactive);
    let activeCard;

    // Player is acting with a full moveCounter, do not approve;
    if (pActive.moveCounter === 2) {
        playerMoveEnd(pActive, pInactive, game);
        return game;
    }

    pActive.turningHand !== true
        ? (activeCard = pActive.hand[cardId])
        : (activeCard = pInactive.hand[cardId]);
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
        pActive.turningHand === true
            ? moveCardGraveyard(pInactive, cardId)
            : moveCardGraveyard(pActive, cardId);
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
    Object.keys(pInactive.item).length !== 0
  && Object.values(pInactive.item)[0].category === cardConst.PANICCATEGORY
  && pActive.moveCounter === 1
        ? forestMushroom(game, pActive)
        : null;
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

module.exports = {
    getActivePlayer,
    getInActivePlayer,
    lastActionChange,
    moveCardGraveyard,
    attackShield,
    changeTurn,
    makeMove,
};
