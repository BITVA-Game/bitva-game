/* eslint-disable max-len */
import {
    playState, heroselectStateP1,
} from '../__data__/states';

import {
    PLAY, HEROSELECTED,
} from '../../constants';

const GameEngine = require('../index');

test('First game state Play. Player1 can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: PLAY };

    const engine = new GameEngine();
    engine.handle(msg);

    expect(engine.getState()).toMatchObject(playState);
});

test.only('Second game state heroselectStateP1. Player 1 selected one of his characters', () => {
    // we created message sent once Player 1 selected character
    const msg = { type: HEROSELECTED, hero: 'premudraya', player: 'player1' };
    // we referencing to GameEngine to work out our message
    const engine = new GameEngine();
    engine.handle(msg);
    console.log(engine);
    // we expect that engine after receiving above msg will match object
    expect(engine.getState()).toMatchObject(heroselectStateP1);
});
