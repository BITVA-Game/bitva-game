const io = require('socket.io-client');

const socket = io('http://localhost:3000');

function emitMessage(msg) {
    console.log('I AM CLIENT ', msg);
    socket.emit('message', msg);
}

socket.on('message', (msg) => {
    console.log(msg);
});

module.exports = { emitMessage };
