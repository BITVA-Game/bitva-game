const express = require('express');
const bodyParser = require('body-parser');

const server = (engine) => {
    const app = express();

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.send(engine.getState());
    });

    app.post('/', (req, res) => {
        console.log(new Date(), req.body);
        engine.handle(req.body.message);
        res.send(engine.getState());
    });

    return app;
};

module.exports = server;
