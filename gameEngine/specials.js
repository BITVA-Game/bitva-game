/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
const {
    card: cardConst,
    target: targetConst,
} = require('../src/constants');

const { getRandomUpTo } = require('../gameTerminal/randomFunc');

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
// and to randomly (60% chance) to decrease pnts of 2 cards in hand by 1 pnt
function bowArrow(player, opponent) {
    // console.log('We are in borrow and Arrow case!');
    let itemId;
    const itemKey = Object.keys(opponent.item)[0];
    itemKey ? (itemId = opponent.item[itemKey].id) : null;
    if (itemId === cardConst.BOWARROWCARD) {
        const chance = getRandomUpTo(10, 'chanceBowArrow');
        if (chance <= 6) {
            const cards = Object.values(player.hand);
            const cardsKeys = Object.keys(player.hand);
            const cardsNew = [];
            for (let i = 0; i < cardsKeys.length; i++) {
                if (cards[i].points > 1 && cards[i].type === cardConst.ACTIONCARD) {
                    cardsNew.push(cardsKeys[i]);
                }
            }
            const indexes = getRandomIndexes(cardsNew.length);
            for (let i = 0; i < cardsKeys.length; i++) {
                if (
                    cardsKeys[i] === cardsNew[indexes[0]]
          || cardsKeys[i] === cardsNew[indexes[1]]
                ) {
                    cards[i].points -= 1;
                }
            }
        }
    }
}

// function to remove panic true (for forestMushroom card)
// from player's hand cards
function removePanic(player) {
    const playerCards = Object.values(player.hand);
    playerCards.forEach((card) => (card.panic === true ? delete card.panic : null));
    if (Object.keys(player.item).length !== 0) {
        delete Object.values(player.item)[0].panic;
    }
    return playerCards;
}

function cardIncreaseHealth(players) {
    for (let i = 0; i < players.length; i += 1) {
    // if any player has current health == maximum health
    // then player remains with current health
        if (players[i].health.current !== players[i].health.maximum) {
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
            case cardConst.WATERLIVINGCARD:
                //  console.log('We are in living water case!');
                cardIncreaseHealth(players);
                break;
                // if it is Dead Water card then we run function
                // that decrease players current health by 1 point
            case cardConst.WATERDEADCARD:
                // console.log('We are in dead water case!');
                cardDecreaseHealth(players);
                break;
            }
        }
    });
    return { players };
}

function malachiteBox(player, opponent, target) {
    let itemId;
    const itemKey = Object.keys(player.item)[0];
    itemKey ? (itemId = player.item[itemKey].id) : null;
    itemId === cardConst.MALACHITEBOXCARD
  && (target === targetConst.OPPONENT
    || target === targetConst.GRAVE
    || target === targetConst.HERO)
        ? (opponent.health.current -= 1)
        : null;
}

// TODO: turningPotion
// function set turningHand property to both players
// and allows active player to act with opponent hand card
// the same phase - moveCoutner increases only after act with opponent hand card
function turningHand(player, opponent) {
    player.turningHand = true;
    opponent.turningHand = true;
    player.moveCounter === 0
        ? (player.moveCounter = 0)
        : (player.moveCounter = 1);
}

// TODO: rename to claivoyance
// function to show 3 cards from opponent cards
// when active player attackes with claivoyance card
function showCards(opponent) {
    const cardsKeys = Object.keys(opponent.cards)
        .reverse()
        .splice(-3);
    opponent.cardsShown = {};
    cardsKeys.forEach((key) => {
        opponent.cardsShown[key] = opponent.cards[key];
    });
    return opponent.cardsShown;
}

// function to delete cardsShown property from player object
const deleteCardsShown = (opponent) => {
    delete opponent.cardsShown;
};

// TODO: rename to russianOven
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
    opponentCards[index1].panic === false
        ? (opponentCards[index1].disabled = false)
        : null;
    opponentCards[index2].panic === false
        ? (opponentCards[index2].disabled = false)
        : null;
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

module.exports = {
    bowArrow,
    removePanic,
    waterCard,
    malachiteBox,
    turningHand,
    showCards,
    deleteCardsShown,
    disableCards,
    removeDisable,
};
