/* eslint-disable max-len */
import {
    dealAllState,
} from '../__data__/states';

import {
    screen, message, target, card, phase,
} from '../../constants';

import cards from '../__data__/cards';

const {
    // apple, bogatyr, shieldSmall, shieldLarge,
    waterLiving, waterDead, wolf,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

// Test, that  when living water is in item holder, then
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
