import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../constants';

import cards from '../__data__/cards';

const {
    plateMail, bogatyr, raven,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Plate Mail Card Tests ** *//

// Test, that when Plate Mail is in Morevna item holder then once Yaga attacks
// Morevna get damage = attack card points -1 to her health current until card has it health points.
// Yaga get 1 reflected pnt damage to her health
// and if Yaga health =<0 after attack then game is over
test('msg ACTION received: active player has dead water in item, it decreases players health current for 1pnt.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const bogatyrCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: bogatyrCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = plateMail;
    gameForTest.game.players[1].hand.key20 = bogatyr;
    gameForTest.game.players[1].health.current = 1;
    gameForTest.game.active = 'player2';
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта plateMail в item holder неактивного игрока,
    expect(Object.values(inactivePlayer.item).length).toEqual(1);
    expect(inactivePlayer.item[cardToTest].id).toEqual(plateMail.id);
    expect(inactivePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);
    expect(Object.keys(inactivePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что карта plateMail имеет category - reflect
    expect(inactivePlayer.item[cardToTest].category).toEqual(card.REFLECTCATEGORY);
    // ожидаем, что очки карты plateMail  > 0
    expect(inactivePlayer.item[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что от текущего здоровья активного игрока убавится 1 очко
    expect(activePlayer.health.current).toEqual(0);
    // ожидаем, что от текущего здоровья неактивного игрока убавится 3 очка
    expect(inactivePlayer.health.current).toEqual(13);
    // ожидаем, сменится фаза игры на GAME OVER
    expect(newGame.game.phase).not.toEqual('ACTIVE');
    expect(newGame.game.phase).toEqual('OVER');
});

// Test, that when Plate Mail is in Morevna item holder
// then once Yaga attacks with attack card which points == 1
// neither Morevna nor Yaga get any damage
test('msg ACTION received: active player has dead water in item, it decreases players health current for 1pnt.', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    const ravenCard = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: ravenCard,
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].item.key24 = plateMail;
    gameForTest.game.players[1].hand.key20 = raven;
    gameForTest.game.players[1].health.current = 1;
    gameForTest.game.active = 'player2';
    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find(p => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find(p => p.id !== newGame.game.active);

    // ожидаем, что карта plateMail в item holder неактивного игрока,
    expect(inactivePlayer.item[cardToTest].id).toEqual(plateMail.id);
    expect(Object.keys(inactivePlayer.grave)).not.toContain(cardToTest);
    // ожидаем, что очки карты plateMail  > 0
    expect(inactivePlayer.item[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что от текущего здорове игроков не изменится
    expect(activePlayer.health.current).toEqual(1);
    expect(inactivePlayer.health.current).toEqual(16);
});
