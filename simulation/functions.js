function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function takeOneCardAtRand(hand) {
    const rand = Math.floor(Math.random() * Math.floor(Object.keys(hand).length));
    // console.log('takeOneCardAtRand ', Object.keys(hand).length, rand, Object.keys(hand)[rand]);
    return Object.keys(hand)[rand];
}

function isDead(appObject) {
    appObject.game.players.forEach((p) => {
        if (p.health.current <= 0) {
            // console.log(p.hero +" health is "+p.health.current);
            // console.log(p.hero +" LOST");
            return true;
        }
    });
    return false;
}

function noCards() {
    appObject.game.players.forEach((p) => {
        if (p.deck.length <= 0) {
            // console.log(`${p.hero} deck length is ${p.deck.length}`);
            // console.log(`${p.hero} LOST`);
            return true;
        }
    });
    return false;
}

function playOnePhase(appObject, sendMessage) {
    // console.log('START HEALTH');
    // appObject.game.players.forEach((p) => {
    //     console.log(`${p.hero} ${p.health.current}`);
    // });
    if (appObject.game.phase === 'OVER') {
        return;
    }
    let activePlayer = appObject.game.players[0];
    if (!activePlayer.active) {
        activePlayer = appObject.game.players[1];
    }
    // console.log('-------------------------------------');
    // console.log('Active player is ', activePlayer.hero);
    // console.log('Active player move counter ', activePlayer.moveCounter);
    let msg = {};
    let action = 0;
    while (activePlayer.moveCounter < 2 && action < 2 && !isDead(appObject)) {
        msg = {};
        // console.log('playThrough N', action);
        const activeKey = takeOneCardAtRand(activePlayer.hand);
        // console.log('Active Key ', activeKey);
        if (!activePlayer.hand[activeKey]) {
            console.log('ERROR');
            console.log(activePlayer.hand.length);
            console.log(activePlayer.graveyard.length);
            console.log(activePlayer.deck.length);
            break;
        }
        const activeCard = activePlayer.hand[activeKey];
        // console.log('Selected card: ', activeCard.id);

        // If it's an item
        if (activeCard.type === 'item') {
            // console.log(Object.values(activePlayer.item).length);
            if (Object.values(activePlayer.item).length === 0) {
                // console.log('set up item');
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
                // console.log('heal');
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
            // console.log('attack');
            msg = {
                type: 'ACTION',
                activeCard: activeKey,
                target: 'opponent',
            };
            action++;
        }

        if (Object.keys(msg).length > 0) {
            // console.log('SENDING MESSAGE');
            sendMessage(msg);
        }
        // console.log('END HEALTH');
        // appObject.game.players.forEach((p) => {
        //     console.log(`${p.hero} ${p.health.current}`);
        // });
    }
}


function simulationSequence(application) {
    console.log('STARTING SIM');
    let appObject = null;
    const sendReply = (arg) => {
        appObject = arg;
    };
    const sendMessage = (msg) => {
        application.msgReceived(msg, sendReply);
    }

    const index = getRandomInt(1);
    const heroes = ['morevna', 'yaga'];

    console.log(`First hero is ${heroes[index]}`);

    const msg1 = { type: 'HEROSELECTED', hero: heroes[index] };
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
    playThroughResult.first = heroes[index];

    return playThroughResult;
}

exports.simulationSequence = simulationSequence;
