/* eslint-disable no-param-reassign */
const { card: cardConst } = require('../src/constants');

const {
    getActivePlayer,
    getInActivePlayer,
    removePanic,
} = require('./helpers');

// This function takes the player and the key for his card
// and destination = from, then moves card to graveyard via deleting the key from array
function moveCardGraveyard(player, key, from, opponent) {
    if (from === cardConst.ITEMCARD) {
        player.grave[key] = player.item[key];
        delete player.item[key];
    } else if (from === cardConst.ITEMINACTIVE) {
        opponent.grave[key] = player.item[key];
        delete player.item[key];
    } else {
        player.grave[key] = player.hand[key];
        // we check if card has panic == false property (forest Mushroom card)
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

function moveToGraveyard(player, itemKey, opponent) {
    player.item[itemKey].healthCurrent = player.item[itemKey].health;
    if (player.item[itemKey].fromOpponent === true) {
        moveCardGraveyard(player, itemKey, cardConst.ITEMINACTIVE, opponent);
    } else {
        moveCardGraveyard(player, itemKey, cardConst.ITEMCARD);
    }
}

module.exports = {
    moveCardGraveyard,
    graveyardCheck,
    moveToGraveyard,
};
