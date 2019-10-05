/* eslint-disable max-len */
import {
    alice, bob,
    playState, heroselectStateP1, versusState, dealAllState,
} from '../__data__/states';

import {
    screen, message, target, card, phase,
} from '../../constants';


import cards from '../__data__/cards';

const {
    apple, bogatyr, shieldSmall, wolf, shieldLarge,
} = cards;

const heroData = require('../../gameTerminal/data/characters.json');

const GameEngine = require('../index');

const CARDSINHAND = 5;

jest.mock('../../gameTerminal/randomFunc');

test.only('First game state Play. Player1 can select any of the characters he has', () => {
    // Again we only need type
    const msg = { type: message.PLAY, accounts: [alice, bob] };

    const engine = new GameEngine();
    engine.handle(msg);

    expect(engine.getState()).toMatchObject(playState);
});

test('Second game state heroselectStateP1. Player 1 selected one of his characters. Player 2 is active.', () => {
    // we created message sent once Player 1 selected character
    const msg = { type: message.HEROSELECTED, hero: 'morevna', player: 'player1' };
    // we put GameEngine into previous state
    const engine = new GameEngine(playState);
    // we referencing to GameEngine to work out our message
    engine.handle(msg);
    console.log(engine.getState());

    // we expect that engine after receiving above msg will match object
    expect(engine.getState()).toMatchObject(heroselectStateP1);
});

test('msg HEROSELECTED for 2 players switches gameEngine state to VERSUS, Active players is set', () => {
    // we created message sent once Player 1 selected character
    const msg = { type: message.HEROSELECTED, hero: 'yaga', player: 'player2' };
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
    expect(newGame.screen).toEqual(screen.VERSUS);
});

test('msg DEALALL switch to gameEngine state GAME', () => {
    const msg = { type: message.DEALALL };

    const engine = new GameEngine(versusState);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);
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
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.GRAVE,
    };
    // Making a copy of dealAllState object as we need to give our player correct card
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = shieldSmall;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);

    expect(newGame.game.active).toBeDefined();
    expect(activePlayer.moveCounter).toEqual(1);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing is less than his max', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.HERO,
    };

    // Making a copy of dealAllState object as we need to give our player correct card
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));

    gameForTest.game.players[0].hand.key20 = apple;
    gameForTest.game.players[0].health.current = 10;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);

    expect(newGame.game.active).toBeDefined();
    expect(activePlayer.moveCounter).toEqual(1);
    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(activePlayer.health.current).toEqual(gameForTest.game.players[0].health.current + 2);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing will go over max', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.HERO,
    };
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = apple;
    gameForTest.game.players[0].health.current = 15;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    console.log(card.ACTIONCARD);

    expect(activePlayer.moveCounter).toEqual(1);
    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(activePlayer.health.current).toEqual(heroData[activePlayer.hero].health);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE3 player attacks the enemy, no protection', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = bogatyr;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(activePlayer.moveCounter).toEqual(1);
    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(activePlayer.grave[cardToTest].category).toEqual(card.ATTACKCATEGORY);
    expect(inactivePlayer.item).toEqual({});
    expect(inactivePlayer.health.current).toEqual(gameForTest.game.players[1].health.current - 4);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE3 player attacks, shield & card go to graveyard', () => {
    const cardToTest = 'key20';
    const shieldCard = 'key23';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[1].item.key23 = shieldSmall;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(activePlayer.moveCounter).toEqual(1);
    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(activePlayer.grave[cardToTest].category).toEqual(card.ATTACKCATEGORY);
    expect(inactivePlayer.item).toEqual({});
    expect(Object.keys(inactivePlayer.grave)).toContain(shieldCard);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE3 player attacks with more points than shield has, shield & card go to graveyard, opponent hit', () => {
    const cardToTest = 'key20';
    const shieldCard = 'key23';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = bogatyr;
    gameForTest.game.players[1].item.key23 = shieldSmall;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(activePlayer.grave[cardToTest].category).toEqual(card.ATTACKCATEGORY);
    expect(inactivePlayer.item).toEqual({});
    expect(Object.keys(inactivePlayer.grave)).toContain(shieldCard);
    expect(inactivePlayer.health.current).toEqual(inactivePlayer.health.maximum - 2);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE3 player attacks with less than shield, card goes to graveyard, shield points decreased', () => {
    const cardToTest = 'key20';
    const shieldCard = 'key23';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[1].item.key23 = shieldLarge;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(activePlayer.moveCounter).toEqual(1);
    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(activePlayer.grave[cardToTest].category).toEqual(card.ATTACKCATEGORY);
    expect(inactivePlayer.item[shieldCard].healthCurrent).toEqual(2);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE4 active player puts item into his itemholder', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMCARD,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item = {};
    gameForTest.game.players[0].hand.key20 = shieldSmall;
    // console.log('BEFORE', gameForTest.game.players[0]);
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    // console.log('AFTER', activePlayer);

    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('msg ACTION CASE4 player wants to move his card from item holder to graveyard', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.GRAVE,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = shieldSmall;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(activePlayer.moveCounter).toEqual(1);
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(Object.keys(activePlayer.item)).not.toContain(cardToTest);
    expect(inactivePlayer.health.current).toBeGreaterThan(0);
});

test('ACTION ANY active player moveCounter = 2 after his action, he gets missing cards to hand, inactive player becomes active.', () => {
    const cardToTest = 'key20';
    const player = 'player1';
    const opponent = 'player2';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].moveCounter = 2;
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(newGame.game.active).toEqual(opponent);
    expect(inactivePlayer.id).toEqual(player);
    expect(inactivePlayer.moveCounter).toEqual(0);
    expect(Object.keys(inactivePlayer.hand).length).toEqual(5);
    expect(activePlayer.id).toEqual(opponent);
});

test('EDGE CASE TEST player attacks with less points than shieldLarge has, only attacked shield cards points decreased', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key7 = shieldSmall;
    gameForTest.game.players[0].hand.key5 = shieldLarge;
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[1].item.key23 = shieldLarge;
    gameForTest.game.players[1].hand.key5 = shieldLarge;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(inactivePlayer.item.key23.healthCurrent).toEqual(2);
    expect(inactivePlayer.hand.key5.healthCurrent).toEqual(4);
    expect(activePlayer.hand.key5.healthCurrent).toEqual(4);
    expect(activePlayer.item.key7.healthCurrent).toEqual(2);
});

test('EDGE CASE TEST for shields with the same key, shields in item', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[0].item.key7 = shieldLarge;
    gameForTest.game.players[1].item.key7 = shieldLarge;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(activePlayer.moveCounter).toEqual(1);
    expect(activePlayer.grave.key20.type).toEqual(card.ACTIONCARD);
    expect(activePlayer.item.key7).toEqual(shieldLarge);
    expect(inactivePlayer.item.key7.healthCurrent).toEqual(2);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
});

test('EDGE CASE TEST no card in opponent item, player trying to attack, but cannot do it.', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMOPPONENT,
    };
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = wolf;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(Object.keys(activePlayer.hand)).toContain(cardToTest);
    expect(activePlayer.moveCounter).toEqual(0);
    expect(activePlayer.health.current).toEqual(16);
    expect(inactivePlayer.health.current).toEqual(15);
});

test('EDGE CASE TEST opponent has shield in item, player trying to attack, but cannot do it.', () => {
    const cardToTest = 'key20';
    const opponentItem = 'key10';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMOPPONENT,
    };
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[1].item.key10 = shieldSmall;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(Object.keys(activePlayer.hand)).toContain(cardToTest);
    expect(Object.keys(inactivePlayer.item)).toContain(opponentItem);
    expect(activePlayer.moveCounter).toEqual(0);
    expect(activePlayer.health.current).toEqual(16);
    expect(inactivePlayer.health.current).toEqual(15);
});

test('msg ACTION ANY, player life points === 0, game.phase = "OVER" ', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[1].health.current = 2;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active player
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    expect(activePlayer.active).not.toBeDefined();
    expect(inactivePlayer.active).not.toBeDefined();
    expect(inactivePlayer.health.current).toBeLessThanOrEqual(0);
    expect(newGame.game.phase).toEqual(phase.OVER);
});
