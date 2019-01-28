const readlineSync = require('readline-sync');

const application = require('../backend/application');
const sheets = require('../backend/sheets');

let appObject;

const sendReply = function(arg) {
    appObject = arg;
}

function takeOneCardAtRand(hand) {
  let rand = Math.floor(Math.random() * Math.floor(Object.keys(hand).length));
  console.log("takeOneCardAtRand ", Object.keys(hand).length, rand, Object.keys(hand)[rand]);
  return Object.keys(hand)[rand];
}

function isDead() {
    appObject.game.players.forEach(p => {
        if (p.health.current<=0) {
          console.log(p.hero +" health is "+p.health.current);
          console.log(p.hero +" LOST");
          return true;
        }
    });
    return false;
}

function noCards() {
    appObject.game.players.forEach((p) => {
        if (p.deck.length<=0) {
            console.log(p.hero +" deck length is "+p.deck.length);
            console.log(p.hero +" LOST");
            return true;
        }
    });
    return false;
}

function playOnePhase() {
    console.log("START HEALTH");
    appObject.game.players.forEach((p) => {
        console.log(`${p.hero} ${p.health.current}`);
    });
    if (appObject.game.phase === 'OVER') {
        return;
    }
    let activePlayer = appObject.game.players[0];
    if (!activePlayer.active) {
        activePlayer = appObject.game.players[1];
    }
    console.log('-------------------------------------');
    console.log('Active player is ', activePlayer.hero);
    console.log('Active player move counter ', activePlayer.moveCounter);
    let msg = {};
    let action = 0;
    while (activePlayer.moveCounter < 2 && action < 2) {
        msg = {};
        console.log('playThrough N', action);
        const activeKey = takeOneCardAtRand(activePlayer.hand);
        console.log('Active Key ', activeKey);
        if (!activePlayer.hand[activeKey]) {
          console.log('ERROR');
          console.log(appObject);
          console.log(activePlayer.hand.length);
        }
        const activeCard = activePlayer.hand[activeKey];
        console.log('Selected card: ', activeCard.id);

        // If it's an item
        if (activeCard.type === 'item') {
            console.log(Object.values(activePlayer.item).length);
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

        if (Object.keys(msg).length>0) {
            console.log("SENDING MESSAGE");
            application.msgReceived(msg, sendReply);
        }
        console.log("END HEALTH");
        appObject.game.players.forEach((p) => {
            console.log(`${p.hero} ${p.health.current}`);
        });
    }
}


function simulationSequence() {
    //await sheets.getAllCards();
    console.log('Please select the hero to play');
    const heroes = ['morevna', 'yaga'];
    const index = readlineSync.keyInSelect(heroes, 'Which hero?');
    console.log(`Selected hero is ${heroes[index]}`);

    const msg1 = { type: 'HEROSELECTED', hero: heroes[index] };
    application.msgReceived(msg1, sendReply);

    const msg2 = { type: "DEALALL" }
    application.msgReceived(msg2, sendReply);
    process.on('unhandledRejection', (error) => {
        // Will print "unhandledRejection err is not defined"
        console.log('unhandledRejection', error.message);
    });
    let count = 0;
    while (appObject.game.phase != 'OVER') {
        console.log('* * * * * * * * * * * * *');
        console.log('Loop N', count);
        playOnePhase();
        count++;
    };
}

simulationSequence();
