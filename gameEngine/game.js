/* eslint-disable no-param-reassign */
const {
    phase,
    message,
    card: cardConst,
    target: targetConst,
    action,
} = require('../src/constants');

const {
    getItemId, getActivePlayer, healPlayer,
    getInActivePlayer, setDisabledPropertyToDefault, generatePlayer, selectActive,
    assignPlayersPositions, giveCardsTo, giveCardsToAll, lastActionChange,
} = require('./helpers');

const {
    bowArrow,
    malachiteBox,
    turningPotion,
    clairvoyance,
    russianOven,
    skullLantern,
} = require('./specials');

const {
    changeTurn,
    moveItem,
    changeMoveCounter,
    forestMushroom,
    attackOpponent,
} = require('./actions');

const { graveyardCheck, moveCardGraveyard } = require('./graveyard');

function turningPotionEffect(pInactive, pActive, cardId) {
    if (pActive.turningHand === true) {
        moveCardGraveyard(pInactive, cardId);
    } else {
        moveCardGraveyard(pActive, cardId);
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

// GAME

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

    if (pActive.turningHand !== true) {
        (activeCard = pActive.hand[cardId]);
    } else {
        (activeCard = pInactive.hand[cardId]);
    }
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
        if (pActive.turningHand === true) {
            moveCardGraveyard(pInactive, cardId);
        } else {
            moveCardGraveyard(pActive, cardId);
        }
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
    if (Object.keys(pInactive.item).length !== 0
        && Object.values(pInactive.item)[0].category === cardConst.PANICCATEGORY
        && pActive.moveCounter === 1) {
        forestMushroom(game, pActive);
    }

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

// HANDLE

function handle(app, msg) {
    const game = { ...app.game };
    switch (msg.type) {
    case message.HEROSELECTED: {
        const playersInitital = game.players.concat(
            generatePlayer(msg.hero, msg.player),
        );
        const active = selectActive(playersInitital);
        const players = assignPlayersPositions(playersInitital);
        return Object.assign(game, { active, players });
    }
    case message.DEALALL: {
        return Object.assign(game, { players: giveCardsToAll(game.players) });
    }
    // All actions have the same action name as they all call the same function
    case message.ACTION: {
        // helperToDebug(message, game);
        return Object.assign(game, makeMove(game, msg));
    }
    default:
        return game;
    }
}

exports.handle = handle;
