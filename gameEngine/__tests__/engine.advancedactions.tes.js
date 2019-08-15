/* eslint-disable max-len */
import {
    dealAllState,
} from '../__data__/states';

import {
    ACTION, HEALCATEGORY, ITEMCARD, ITEMCATEGORY,
    // OPPONENT, GRAVE, ACTIONCARD, 
    // ATTACKCATEGORY, ITEMOPPONENT,
    //  PLAY, HEROSELECTED, DEALALL, HERO,
} from '../../constants';

import cards from '../__data__/cards';

const {
    // apple, bogatyr, shieldSmall, wolf, shieldLarge,
    waterLiving,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

// Test, that  when living water is in item holder, then
// players get +1 to their health current each until card has its points > 0
test('msg ACTION received: active player put Living Water in item, it increases players health current for 1pnt.', () => {
    const cardToTest = 'key20';
    const msg = {
        type: ACTION,
        activeCard: cardToTest,
        target: ITEMCARD,
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

    // ожидаем, что карта living water в item holder активного игрока
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(waterLiving.id);
    expect(activePlayer.item[cardToTest].type).toEqual(ITEMCATEGORY);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
    // ожидаем, что карта dead water активного игрока имеет тип - heal
    expect(activePlayer.item[cardToTest].category).toEqual(HEALCATEGORY);
    // ожидаем, что очки карты living water активного игрока > 0
    expect(activePlayer.item[cardToTest].points).toBeGreaterThan(0);
    // ожидаем, что к текущему здоровью игроков прибавится по 1му очку
    expect(activePlayer.health.current).toEqual(16);
    expect(inactivePlayer.health.current).toEqual(15);
    // ожидаем, что карта-water находится в item пока у нее есть очки.
    expect(activePlayer.item[cardToTest].points).not.toEqual(0);
});
