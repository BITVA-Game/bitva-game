/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
const { getRandomUpTo } = require('../gameTerminal/randomFunc');

const { card: cardConst, action } = require('../src/constants');

const { waterCard } = require('./specials');

const {
    getActivePlayer,
    getInActivePlayer,
    setHealthToZero,
    removePanic,
    lastActionChange,
    damagePlayer,
    deleteCardsShownProperty,
} = require('./helpers');

const { moveToGraveyard } = require('./graveyard');

function attackShield(player, itemKey, points, opponent) {
    if (player.item[itemKey].healthCurrent > points) {
        player.item[itemKey].healthCurrent -= points;
    } else if (player.item[itemKey].healthCurrent === points) {
        moveToGraveyard(player, itemKey, opponent);
    } else {
        damagePlayer(player, points - player.item[itemKey].healthCurrent);
        moveToGraveyard(player, itemKey, opponent);
    }
}

// TODO: rename to magicMirror/plateMail or not
// function to reflect half of the damage (or round down to integer) for magicMirror card
// if active card has 1 attack points then each player gets 1 pnt damage
// or in case of plateMail func reflect 1 point back to player
// if active card has 1 attack points then no damage to both players
function reflect(opponent, player, points) {
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
    setHealthToZero(player.health.current);
    setHealthToZero(opponent.health.current);
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
        const noClairvoyance = (player) => setTimeout(() => deleteCardsShownProperty(player), 1000);
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
    attackShield,
    moveItem,
    changeMoveCounter,
    changeTurn,
    forestMushroom,
    attackOpponent,
};
