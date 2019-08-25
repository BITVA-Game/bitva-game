/* eslint-disable max-len */
import {
    dealAllState,
} from '../__data__/states';

import {
    screen, message, target, card, phase,
} from '../../constants';

import cards from '../__data__/cards';

const {
    // apple, shieldSmall, shieldLarge,
    waterLiving, waterDead, wolf, bogatyr,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

// Test, that  when player puts living water in item holder, then
// players get +1 to their health current each until card has its points > 0
test('msg ACTION received: active player put Living Water in item, it increases players health current for 1pnt.', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMCARD,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = waterLiving;
    gameForTest.game.players[0].health.current = 15;
    gameForTest.game.players[1].health.current = 14;
    gameForTest.game.players[0].moveCounter = 1;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта living water в item holder неактивного игрока
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(waterLiving.id);
    expect(inactivePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);
    expect(Object.keys(inactivePlayer.hand)).not.toContain(cardToTest);
    // ожидаем, что карта dead water неактивного игрока имеет тип - heal
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.HEALCATEGORY);
    // ожидаем, что очки карты living water неактивного игрока > 0
    expect(inactivePlayer.item[cardToTest].points).toBeGreaterThan(0);
    // ожидаем, что к текущему здоровью игроков прибавится по 1му очку
    expect(inactivePlayer.health.current).toEqual(16);
    expect(activePlayer.health.current).toEqual(15);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(inactivePlayer.item[cardToTest].points).not.toEqual(0);
});

// Test, that when dead water is in any player item holder then
// players get -1 to their health current each until card has it health points.
test('msg ACTION received: active player has dead water in item, it decreases players health current for 1pnt.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const wolfCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = waterDead;
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[0].moveCounter = 1;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта dead water в item holder неактивного игрока,
    // т.к. после перехода хода бывший активный игрок стал неактивным
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(waterDead.id);
    expect(inactivePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);
    expect(Object.keys(inactivePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что карта dead water имеет тип - heal
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.DAMAGECATEGORY);
    // ожидаем, что очки карты dead water  > 0
    expect(inactivePlayer.item[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что от текущего здоровья игроков убавится по 1му очку
    // помимо ущерба от очков карты атаки
    expect(inactivePlayer.health.current).toEqual(15);
    expect(activePlayer.health.current).toEqual(12);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(inactivePlayer.item[cardToTest].points).not.toEqual(0);
});

// Test, that  when living water is in item holder, then
// players get +1 to their current health each until card is in item holder
test('msg ACTION received: active player already has Living Water in item, it increases players health current for 1pnt.', () => {
    const cardToTest = 'key24';
    const wolfCard = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = waterLiving;
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[0].health.current = 15;
    gameForTest.game.players[1].health.current = 14;
    gameForTest.game.players[0].moveCounter = 1;

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта living water в item holder неактивного игрока
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(waterLiving.id);
    // ожидаем, что карта  living water неактивного игрока имеет тип - heal
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.HEALCATEGORY);
    // ожидаем, что очки карты living water неактивного игрока > 0
    expect(inactivePlayer.item[cardToTest].points).toBeGreaterThan(0);
    // ожидаем, что к текущему здоровью игроков прибавится по 1му очку
    expect(inactivePlayer.health.current).toEqual(16);
    expect(activePlayer.health.current).toEqual(13);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(inactivePlayer.item[cardToTest].points).not.toEqual(0);
});

// Test, that when dead water is attacked once is in any player item holder
// and gone to graveyard once its health points are == 0
test('msg ACTION received: after attack the dead water in item, its health =0 and card goes to graveyaed.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const bogatyrCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item.key24 = waterDead;
    gameForTest.game.players[0].hand.key20 = bogatyr;
    gameForTest.game.players[1].moveCounter = 1;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта dead water ушла из item holder активного игрока,
    // т.к. после атаки е ездоровье  стало == 0 и она ушла на кладбище
    expect(Object.values(activePlayer.item).length).toEqual(0);
    expect(inactivePlayer.grave[cardToTest].id).toEqual(waterDead.id);
    expect(Object.keys(activePlayer.item)).not.toContain(cardToTest);
    // ожидаем, что очки карты dead water восстановились до первоначальных
    expect(inactivePlayer.grave[cardToTest].healthCurrent).toEqual(3);
    // ожидаем, что текущее здоровье игроков не имзеняется ( карта ушла )
    expect(inactivePlayer.health.current).toEqual(15);
    expect(activePlayer.health.current).toEqual(16);
});

// Test, that when living water is attacked once is in any player item holder
// and gone to graveyard once its health points are == 0
test('msg ACTION received: after attack the living water in item, its health =0 and card goes to graveyaed.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const bogatyrCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item.key24 = waterLiving;
    gameForTest.game.players[0].hand.key20 = bogatyr;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[1].health.current = 12;
    gameForTest.game.players[0].health.current = 10;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта dead water ушла из item holder активного игрока,
    // т.к. после атаки е ездоровье  стало == 0 и она ушла на кладбище
    expect(Object.values(activePlayer.item).length).toEqual(0);
    expect(activePlayer.grave[cardToTest].id).toEqual(waterLiving.id);
    expect(Object.keys(activePlayer.item)).not.toContain(cardToTest);
    // ожидаем, что очки карты dead water восстановились до первоначальных
    expect(activePlayer.grave[cardToTest].healthCurrent).toEqual(3);
    // ожидаем, что текущее здоровье игроков не имзеняется ( карта ушла )
    expect(inactivePlayer.health.current).toEqual(10);
    expect(activePlayer.health.current).toEqual(12);
});

// Test, that when living water  is in any player item holder then
// active player with current health == maximum does not get +1 to current health
test('msg ACTION received: after attack the living water in item, its health =0 and card goes to graveyaed.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const wolfCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: wolfCard,
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item.key24 = waterLiving;
    gameForTest.game.players[0].hand.key20 = wolf;
    gameForTest.game.players[0].moveCounter = 1;
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);
    // ожидаем, что карта living water в item holder активного игрока,
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(waterLiving.id);
    // ожидаем, что очки карты living water уменьшились на очки атаки
    expect(activePlayer.item[cardToTest].healthCurrent).toEqual(1);
    // ожидаем, что текущее здоровье игроков не имзеняется ( т.к. === maximum )
    expect(inactivePlayer.health.current).toEqual(16);
    expect(activePlayer.health.current).toEqual(15);
});
