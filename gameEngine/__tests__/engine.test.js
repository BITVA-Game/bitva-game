/* eslint-disable max-len */
import {
    playState,
} from '../__data__/states';

import {
    PLAY,
} from '../../constants';

const GameEngine = require('../index');

test('First game state Play. Player1 can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: PLAY };

    const engine = new GameEngine();
    engine.handle(msg);

    expect(engine.getState()).toMatchObject(playState);
});
