/* const screen = require('./screenManager');
const profileManager = require('./profileManager');
*/
function getRandomUpTo(n) {
    return Math.floor(Math.random() * Math.floor(n));
}

function getRandomBool() {
    const rand = getRandomUpTo(2);
    return rand !== 0;
}

// var player = players[Math.floor(Math.random() * Math.floor(2))];

const makePlayerActive = function PA() {
    const rand = getRandomBool();
    const players = [
        { active: rand },
        { active: !rand },
    ];
    // console.log("here are my players:");
    // console.log(players);
    return { players };
};

function handle(app, message) {
    switch (message.type) {
    case 'INITIAL':
        return app.game;
    case 'HEROSELECTED':
        return Object.assign({}, app.game, makePlayerActive());
    default: return app.game;
    }
}

exports.handle = handle;
