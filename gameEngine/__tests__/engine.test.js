/* eslint-disable max-len */
import {
    playState, heroselectStateP1, versusState,
} from '../__data__/states';

import {
    PLAY, HEROSELECTED, DEALALL,
} from '../../constants';

const heroData = require('../../gameTerminal/data/characters.json');

const GameEngine = require('../index');

const CARDSINHAND = 5;

jest.mock('../../gameTerminal/randomFunc');

test.only('First game state Play. Player1 can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: PLAY };

    const engine = new GameEngine();
    engine.handle(msg);

    expect(engine.getState()).toMatchObject(playState);
});

test.only('Second game state heroselectStateP1. Player 1 selected one of his characters. Player 2 is active.', () => {
    // we created message sent once Player 1 selected character
    const msg = { type: HEROSELECTED, hero: 'morevna', player: 'player1' };
    // we put GameEngine into previous state
    const engine = new GameEngine(playState);
    // we referencing to GameEngine to work out our message
    engine.handle(msg);

    // const eng = engine.getState();
    // eng.game.players[0].cards = {};
    // eng.game.players[0].deck = {};
    // eng.game.players[0].allHeroes = {};
    // we expect that engine after receiving above msg will match object
    expect(engine.getState()).toMatchObject(heroselectStateP1);
});

test.only('msg HEROSELECTED for 2 players switches gameEngine state to VERSUS, Active players is set', () => {
    // we created message sent once Player 1 selected character
    const msg = { type: HEROSELECTED, hero: 'yaga', player: 'player2' };
    // we put GameEngine into previous statee
    const engine = new GameEngine(heroselectStateP1);
    // we referencing to GameEngine to work out our message
    engine.handle(msg);

    const newGame = engine.getState();

    // we expect that engine after receiving above msg will match object
    expect(newGame.game.active).toBeDefined();
    expect(newGame.game.players.length).toEqual(2);
    expect(newGame.game.players.length).toEqual(2);
    expect(newGame.heroSelect).toEqual(null);
    expect(newGame.screen).toEqual('VERSUS');
});

// Test that active player gets all the data. Game state VERSUS.
test.only('msg DEALALL switch to gameEngine state GAME', () => {
    const msg = { type: DEALALL };

    const engine = new GameEngine(versusState);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find(player => player.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(player => player.id !== newGame.game.active);
    // Expect player to have relevant data
    expect(activePlayer.hero).toBeDefined();

    expect(Object.keys(activePlayer.cards).length).toEqual(
        heroData[activePlayer.hero].cardsNumber - CARDSINHAND,
    );
    expect(activePlayer.health.maximum).toEqual(heroData[activePlayer.hero].health);
    expect(Object.keys(activePlayer.hand).length).toEqual(CARDSINHAND);
    expect(activePlayer.turningHand).not.toBeTruthy();

    expect(inactivePlayer.hero).toBeDefined();
    expect(Object.keys(inactivePlayer.cards).length).toEqual(
        heroData[inactivePlayer.hero].cardsNumber - CARDSINHAND,
    );
    expect(inactivePlayer.health.maximum).toEqual(heroData[inactivePlayer.hero].health);
    expect(Object.keys(inactivePlayer.hand).length).toEqual(CARDSINHAND);
    expect(inactivePlayer.turningHand).not.toBeTruthy();
});
