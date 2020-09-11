/* eslint-disable no-param-reassign */
const {
    card: cardConst,
    target: targetConst,
} = require('../src/constants');

const { getRandomUpTo } = require('../gameTerminal/randomFunc');

const { moveCardGraveyard } = require('./graveyard');

const {
    getRandomIndexes,
    getItemId,
    setDisabledProperty,
    increaseHealth,
    decreaseHealth,
} = require('./helpers');

// function to check if opponent has item card with id== bowArrow
// and to randomly (60% chance) to decrease pnts of 2 cards in hand by 1 pnt
function bowArrow(player, opponent) {
    const itemId = getItemId(opponent.item);
    if (itemId === cardConst.BOWARROWCARD) {
        const chance = getRandomUpTo(10, 'chanceBowArrow');
        if (chance <= 6) {
            const cards = Object.values(player.hand);
            const cardsKeys = Object.keys(player.hand);
            const cardsNew = [];
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < cardsKeys.length; i++) {
                if (cards[i].points > 1 && cards[i].type === cardConst.ACTIONCARD) {
                    cardsNew.push(cardsKeys[i]);
                }
            }
            const indexes = getRandomIndexes(cardsNew.length);
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < cardsKeys.length; i++) {
                if (cardsKeys[i] === cardsNew[indexes[0]]
                    || cardsKeys[i] === cardsNew[indexes[1]]
                ) {
                    cards[i].points -= 1;
                }
            }
        }
    }
}

// special water cards act with water function
function waterCard(players) {
    // we check for each player if they have card in item holder and card points !=0
    players.forEach((p) => {
        const itemCard = Object.values(p.item)[0];
        if (Object.keys(p.item).length !== 0 && itemCard.points !== 0) {
            if (itemCard.id === cardConst.WATERLIVINGCARD) {
                increaseHealth(players);
            } else if (itemCard.id === cardConst.WATERDEADCARD) {
                decreaseHealth(players);
            }
        }
    });
    return { players };
}

function malachiteBox(player, opponent, target) {
    const itemId = getItemId(player.item);
    if (itemId === cardConst.MALACHITEBOXCARD
        && (
            target === targetConst.OPPONENT
            || target === targetConst.GRAVE
            || target === targetConst.HERO
        )
    ) {
        opponent.health.current -= 1;
    }
}

// function set turningHand property to both players and allows active player to act with
// opponent hand card the same phase - moveCoutner increases only after act with opponent hand card
function turningPotion(player, opponent) {
    player.turningHand = true;
    opponent.turningHand = true;
    if (player.moveCounter === 0) {
        player.moveCounter = 0;
    } else {
        player.moveCounter = 1;
    }
}

// function to show 3 cards from opponent cards when active player attacks with claivoyance card
function clairvoyance(opponent) {
    const cardsKeys = Object.keys(opponent.cards).reverse().splice(-3);
    opponent.cardsShown = {};
    cardsKeys.forEach((key) => {
        opponent.cardsShown[key] = opponent.cards[key];
    });
    return opponent.cardsShown;
}

// function to set disabled property to true to random 2 cards in player's hand for russianOven card
function russianOven(opponent) {
    const opponentCards = Object.values(opponent.hand);
    const index1 = getRandomUpTo(opponentCards.length, 'index1Oven');
    let index2 = getRandomUpTo(opponentCards.length, 'index2Oven');
    if (index2 === index1) {
        index2 = getRandomUpTo(opponentCards.length);
    }
    setDisabledProperty(opponentCards[index1]);
    setDisabledProperty(opponentCards[index2]);
}

// this function runs when player attacks with the card Skull Lantern which category is attackItems
// it accept players and checks all item category cards from both players item holders and hands
// and move such cards to players grave yards
function skullLantern(players) {
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

module.exports = {
    bowArrow,
    waterCard,
    malachiteBox,
    turningPotion,
    clairvoyance,
    russianOven,
    skullLantern,
};
