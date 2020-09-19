/* eslint-disable no-param-reassign */
const { card: cardConst } = require('../src/constants');
const { moveToGraveyard } = require('./graveyard');
const { setHealthToZero, damagePlayer } = require('./helpers');

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
        if (points === 1) {
            damage = 1;
        } else {
            damage = Math.floor(points / 2);
        }
        opponent.health.current -= damage;
    }
    if (itemCard === cardConst.PLATEMAILCARD) {
        if (points === 1) {
            damage = 0;
        } else {
            damage = 1;
        }
        // eslint-disable-next-line no-unused-expressions
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
    if (itemKey) {
        itemCategory = player.item[itemKey].category;
    }
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
            if (opponent.turningHand === true) {
                reflect(opponent, player, points);
            } else {
                reflect(player, opponent, points);
            }
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

module.exports = { attackOpponent };
