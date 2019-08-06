/* eslint-disable max-len */
import {
    playState, heroselectStateP1, versus,
} from '../__data__/states';

import {
    PLAY, HEROSELECTED,
} from '../../constants';

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

test('First game state Play. Player1 can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: PLAY };

    const engine = new GameEngine();
    engine.handle(msg);

    expect(engine.getState()).toMatchObject(playState);
});

test('Second game state heroselectStateP1. Player 1 selected one of his characters. Player 2 is active.', () => {
    // we created message sent once Player 1 selected character
    const msg = { type: HEROSELECTED, hero: 'premudraya', player: 'player1' };
    // we put GameEngine into previous state
    const engine = new GameEngine(playState);
    // we referencing to GameEngine to work out our message
    engine.handle(msg);

    // we expect that engine after receiving above msg will match object
    expect(engine.getState()).toMatchObject(heroselectStateP1);
});

test('msg HEROSELECTED for 2 players switches gameEngine state to VERSUS, Active players is set', () => {
    // we created message sent once Player 1 selected character
    // const msg1 = { type: HEROSELECTED, hero: 'premudraya', player: 'player1' };
    const msg2 = { type: HEROSELECTED, hero: 'yaga', player: 'player2' };
    // we put GameEngine into previous statee
    const engine = new GameEngine(heroselectStateP1);
    // we referencing to GameEngine to work out our message
    // engine.handle(msg1);
    engine.handle(msg2);

    // we expect that engine after receiving above msg will match object
    expect(engine.getState()).toMatchObject(versus);
});
