import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card,
} from '../../src/constants';

import cards from '../__data__/cards';

const {
    kladenets, bogatyr,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Kladenets Card Tests ** *//

// Test, that when Kladenets is in active player item holder
// then once active player attacks his attack points are increased by 1p

test('msg ACTION received: active player has kladenetsin item, it increase all attacks against opponent for 1pnt.', () => {
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
    gameForTest.game.players[0].item.key24 = kladenets;
    gameForTest.game.players[0].hand.key20 = bogatyr;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта kladenets в item holder активного игрока,
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(kladenets.id);
    expect(activePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);

    // ожидаем, что карта kladenets имеет category - attack
    expect(activePlayer.item[cardToTest].category).toEqual(card.ATTACKCATEGORY);
    // ожидаем, что очки карты kladenets  > 0
    expect(activePlayer.item[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что от текущего здоровья неактивного игрока убавится 5 очко
    expect(inactivePlayer.health.current).toEqual(10);
    // ожидаем, что от текущего здоровья активного игрока не изменится
    expect(activePlayer.health.current).toEqual(16);
    // ожидаем, что  фаза игры не сменится с ACTIVE
    expect(newGame.game.phase).toEqual('ACTIVE');
});

// Test to check that once kladenets hold in opponent item is attacked
// it goes to grave yard and get its health back
test('msg ACTION received: inactive player has kladenets in item, it attacked with damage => that its health and goes to grave yard.', () => {
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
    gameForTest.game.players[1].item.key24 = kladenets;
    gameForTest.game.players[0].hand.key20 = bogatyr;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта kladenets не в item holder активного игрока,
    expect(Object.values(inactivePlayer.item).length).toEqual(0);
    expect(inactivePlayer.grave[cardToTest].id).toEqual(kladenets.id);

    // ожидаем, что очки карты kladenets  > 0
    expect(inactivePlayer.grave[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что от текущего здоровья неактивного игрока не изменится
    expect(inactivePlayer.health.current).toEqual(15);
    // ожидаем, что от текущего здоровья активного игрока не изменится
    expect(activePlayer.health.current).toEqual(16);
    // ожидаем, что  фаза игры не сменится с ACTIVE
    expect(newGame.game.phase).toEqual('ACTIVE');
});

// Test, that active player can put Kladenets into item holder
test('msg ACTION received: active player put kladenets into item holder', () => {
    // we define card key for testing
    const cardToTest = 'key24';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMCARD,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key24 = kladenets;

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);

    // ожидаем, что карта kladenets в item holder активного игрока,
    expect(Object.values(activePlayer.item).length).toEqual(1);
    expect(activePlayer.item[cardToTest].id).toEqual(kladenets.id);
    expect(activePlayer.item[cardToTest].type).toEqual(card.ITEMCATEGORY);

    // ожидаем, что карта kladenets имеет category - attack
    expect(activePlayer.item[cardToTest].category).toEqual(card.ATTACKCATEGORY);
    // ожидаем, что очки карты kladenets  > 0
    expect(activePlayer.item[cardToTest].health).toBeGreaterThan(0);
    // ожидаем, что  фаза игры не сменится с ACTIVE
    expect(newGame.game.phase).toEqual('ACTIVE');
});
