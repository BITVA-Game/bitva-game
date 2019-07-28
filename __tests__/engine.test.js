/* eslint-disable max-len */
import {
    playState,
} from '../__mocks__/stateMock';


const GameEngine = require('../gameEngine');

test.only('First game state Play. Player1 can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: 'PLAY' };

    const engine = new GameEngine();
    engine.handle(msg);

    expect(engine.getState()).toMatchObject(playState);
});
