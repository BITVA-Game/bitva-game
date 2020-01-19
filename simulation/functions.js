/* eslint-disable no-plusplus */


function takeOneCardAtRand(hand) {
    console.log('takeOneCardAtRand');
    console.log(Object.keys(hand));
    const rand = Math.floor(Math.random() * Math.floor(Object.keys(hand).length));
    console.log(rand);
    console.log('takeOneCardAtRand ', Object.keys(hand).length, rand, Object.keys(hand)[rand]);
    return Object.keys(hand)[rand];
}

function isDead(appObject) {
    appObject.game.players.forEach((p) => p.health.current <= 0);
    return false;
}

function getActivePlayer(appObject) {
    let activePlayer = appObject.game.players[0];
    if (!activePlayer.active) {
        activePlayer = appObject.game.players[1];
    }
    return activePlayer;
}

function playOnePhase(appObject, sendMessage) {
    if (appObject.game.phase === 'OVER') {
        return;
    }
    const hero = getActivePlayer(appObject).hero;
    console.log('-------------------------------------');
    console.log('Active player is ', hero);
    let msg = {};
    let action = 0;
    let unblocker = 0;
    while (action < 2 && !isDead(appObject)) {
        msg = {};
        const activePlayer = getActivePlayer(appObject);
        if (activePlayer.hero !== hero) {
            break;
        }
        console.log('Active player move counter ', activePlayer.moveCounter);
        console.log(`playThrough N ${action} for ${activePlayer.hero}`);
        const activeKey = takeOneCardAtRand(activePlayer.hand);
        console.log('Active Key ', activeKey);
        if (!activePlayer.hand[activeKey]) {
            console.log('ERROR');
            console.log(Object.keys(activePlayer.hand).length);
            console.log(Object.keys(activePlayer.graveyard).length);
            console.log(Object.keys(activePlayer.deck).length);
            break;
        }
        const activeCard = activePlayer.hand[activeKey];
        console.log('Selected card: ', activeCard.id);

        // If it's an item
        if (activeCard.type === 'item') {
            // console.log(Object.values(activePlayer.item).length);
            if (Object.values(activePlayer.item).length === 0) {
                console.log('set up item');
                msg = {
                    type: 'ACTION',
                    activeCard: activeKey,
                    target: 'item',
                };
                action++;
            }
        }
        // If it's health
        if (activeCard.category === 'heal') {
            if ((activePlayer.health.maximum - activePlayer.health.current) >= 3) {
                console.log('heal');
                msg = {
                    type: 'ACTION',
                    activeCard: activeKey,
                    target: 'hero',
                };
                action++;
            }
        }
        // If it's attack
        if (activeCard.category === 'attack') {
            console.log('attack');
            msg = {
                type: 'ACTION',
                activeCard: activeKey,
                target: 'opponent',
            };
            action++;
        }

        unblocker++;
        if (unblocker > 3) {
            msg = {
                type: 'ACTION',
                activeCard: activeKey,
                target: 'graveyard',
            };
            action++;
        }

        if (Object.keys(msg).length > 0) {
            console.log('SENDING MESSAGE');
            console.log('______________________');
            sendMessage(msg);
        }
    }
}


function simulationSequence(application, hero, opponent) {
    console.log('STARTING SIM');
    let appObject = null;
    const sendReply = (arg) => {
        appObject = arg;
    };
    const sendMessage = (msg) => {
        application.msgReceived(msg, sendReply);
    };

    console.log(`Playing ${hero} against ${opponent}`);

    const msg1 = { type: 'HEROSELECTED', hero, opponent };
    sendMessage(msg1);

    const msg2 = { type: 'DEALALL' };
    sendMessage(msg2);

    let count = 0;
    const playThroughResult = {
        first: '',
        players: [{}, {}],
        round: 0,
    };
    while (appObject.game.phase !== 'OVER') {
        console.log('* * * * * * * * * * * * *');
        console.log('Loop N', count);
        playOnePhase(appObject, sendMessage);
        count++;
    }

    for (let j = 0; j < 2; j++) {
        const player = appObject.game.players[j];
        playThroughResult.players[j].name = player.hero;
        playThroughResult.players[j].health = player.health.current;
        playThroughResult.players[j].graveyard = Object.keys(player.grave).length;
        playThroughResult.players[j].hand = Object.keys(player.hand).length;
    }
    playThroughResult.round = count;
    playThroughResult.first = hero;

    return playThroughResult;
}

exports.simulationSequence = simulationSequence;
