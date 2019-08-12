/* eslint-disable max-len */
import {
    playState, heroselectStateP1, versusState, dealAllState,
} from '../__data__/states';

import {
    PLAY, HEROSELECTED, DEALALL, ACTION,
} from '../../constants';

const heroData = require('../../gameTerminal/data/characters.json');

const GameEngine = require('../index');

const CARDSINHAND = 5;
const HERO = 'hero';
const GRAVE = 'graveyard';

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
    const msg = { type: HEROSELECTED, hero: 'morevna', player: 'player1' };
    // we put GameEngine into previous state
    const engine = new GameEngine(playState);
    // we referencing to GameEngine to work out our message
    engine.handle(msg);

    // we expect that engine after receiving above msg will match object
    expect(engine.getState()).toMatchObject(heroselectStateP1);
});

test('msg HEROSELECTED for 2 players switches gameEngine state to VERSUS, Active players is set', () => {
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
test('msg DEALALL switch to gameEngine state GAME', () => {
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

test('msg ACTION CASE1, player wants to move his card to graveyard', () => {
    const cardToTest = 'key20';
    const msg = {
        type: ACTION,
        activeCard: cardToTest,
        target: GRAVE,
    };
    // Making a copy of dealAllState object as we need to give our player correct card
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));

    // Adding a test card for active player so we can test it
    gameForTest.game.players[0].hand.key20 = {
        id: 'shieldSmall',
        name: 'Small Shield',
        type: 'item',
        icon: 'shield',
        category: 'shield',
        categoryName: 'shield',
        description: 'The shield',
        health: 2,
        healthCurrent: 2,
        disabled: false,
    };

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find(player => player.id === newGame.game.active);

    // expect that we have active player in game
    expect(newGame.game.active).toBeDefined();

    // expect that counter increased
    expect(activePlayer.moveCounter).toEqual(1);
    // оexpect the card to move to graveryard
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    // expect the card to move out of the hand
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

// player heals for less than max
test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing is less than his max', () => {
    const cardToTest = 'key20';
    const cardTypeToTest = 'action';
    const msg = {
        type: ACTION,
        activeCard: cardToTest,
        target: HERO,
    };

    // Making a copy of dealAllState object as we need to give our player correct card
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));

    gameForTest.game.players[0].hand.key20 = {
        id: 'apple',
        name: 'Apple',
        type: 'action',
        icon: 'dropRed',
        category: 'heal',
        categoryName: 'heal',
        description: 'Magic youth-giving apples',
        initialpoints: 2,
        points: 2,
        disabled: false,
    };
    gameForTest.game.players[0].health.current = 10;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find(player => player.id === newGame.game.active);
    // expect that we have active player in game
    expect(newGame.game.active).toBeDefined();
    // expect that his counter set to 1 after player makes an action
    expect(activePlayer.moveCounter).toEqual(1);
    // expect that the card was an action card
    expect(activePlayer.grave[cardToTest].type).toEqual(cardTypeToTest);
    // expect that hero's health was increased
    expect(activePlayer.health.current).toEqual(gameForTest.game.players[0].health.current + 2);
    // expect that the card was moved to graveyard
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    // expect the card not to be in hand
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

// player heals for over the max
test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing will go over max', () => {
    const cardToTest = 'key20';
    const cardTypeToTest = 'action';
    const msg = {
        type: ACTION,
        activeCard: cardToTest,
        target: HERO,
    };
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));

    gameForTest.game.players[0].hand.key20 = {
        id: 'apple',
        name: 'Apple',
        type: 'action',
        icon: 'dropRed',
        category: 'heal',
        categoryName: 'heal',
        description: 'Magic youth-giving apples',
        initialpoints: 2,
        points: 2,
        disabled: false,
    };
    gameForTest.game.players[0].health.current = 14;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find(player => player.id === newGame.game.active);
    // expect that his counter set to 1 after the action
    expect(activePlayer.moveCounter).toEqual(1);
    // expect that the card was an action card
    expect(activePlayer.grave[cardToTest].type).toEqual(cardTypeToTest);
    // expect that hero's health was increased
    expect(activePlayer.health.current).toEqual(heroData[activePlayer.hero].health);
    // expect that the card was moved to graveyard
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    // expect the card not to be in hand
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});
