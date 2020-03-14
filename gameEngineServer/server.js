const process = require('process');
const gameServer = require('./index');
const GameEngine = require('../gameEngine');

const engine = new GameEngine();
const app = gameServer(engine);

const port = process.env.PORT || 5001;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Engine listening on port ${port}!`));
}

module.exports = app;
