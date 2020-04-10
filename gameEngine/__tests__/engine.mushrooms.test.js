/* eslint-disable no-plusplus */
import {
    dealAllState, bob,
} from '../__data__/states';

import {
    message, target, action,
} from '../../src/constants';

import cards from '../__data__/cards';

const {
    forestMushroom, apple,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Forest Mushrooms Card Tests ** *//

// Test, that active player can put Forest Mushrooms card in item holder
// then once turn changes, at next action opponent can get forest mushroom panic with 60 % chance,
// so opponent at the beggining of his next action can act only
// with this one random card from his/her hand ( move counter +1)
test('EDGE CASE TEST once player put forestMushroom card as item, then with 60% opponent can get only 1 random card available from hand.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.ITEMCARD,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].hand.key20 = forestMushroom;
    gameForTest.game.players[1].moveCounter = 1;
    gameForTest.game.active = bob.id;
    gameForTest.game.players[0].hand = {
        key10: {
            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
        },
        key1: {
            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false,
        },
        key7: {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
        key5: {
            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
        },

        key9: {
            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false,
        },
    };

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта forest mushrooms в item holder неактивного игрока Yaga
    // так как произошла смена хода
    expect(Object.keys(inactivePlayer.item)).toContain(cardToTest);
    // ожидаем, так как сменился ход - Morevna стала активной,
    // с 60% вероятностью лесные грибы сработали и одна рэндомная карта в руке Morevna
    // приобрела свойство panic: false, остальные - panic: true
    expect(activePlayer.hand).toEqual(
        {
            key10: {
                id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
            },
            key1: {
                id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
            },
            key7: {
                id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false, panic: false,
            },
            key5: {
                id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: true,
            },

            key9: {
                id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
            },
        },
    );
    expect(newGame.game.lastAction.type).toEqual(action.CHAINS);
});

// Test that if opponent has forestMushroom card in item holder, then with 60 % chance,
// active player's one random card in hand got panic: false property
// and other cards - panic: true incl item, at the beggining of action
// and then player acted with this one random card,
// it went to graveyard and panic: false property dissapeared
// and then again with 60 % chance cards got panic: true property
// except one random that gets panic: false
test('EDGE CASE TEST if forestMushroom card is at opponent item, then with 60% player can act only by 1 random card from hand at this action.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: 'key7',
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item[cardToTest] = forestMushroom;
    gameForTest.game.players[0].hand = {
        key5: {
            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
        },
        key1: {
            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
        },
        key7: {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false, panic: false,
        },
        key9: {
            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: true,
        },
    };
    gameForTest.game.players[0].item = {
        key10: {
            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
        },
    };

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта forest mushrooms в item holder неактивного игрока Yaga
    expect(Object.keys(inactivePlayer.item)).toContain(cardToTest);
    // ожидаем, здоровье карты forestMushroom после атаки активного игрока уменьшилось
    expect(inactivePlayer.item[cardToTest].healthCurrent).toEqual(1);
    // ожидаем, что оставшиеся карты в руке, item Morevna
    // с 60% вероятности снова приобрели свойство  panic: true, кроме 1ой
    expect(activePlayer.hand).toEqual(
        {
            key5: {
                id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
            },
            key1: {
                id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
            },
            key9: {
                id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: false,
            },
        },
    );
    expect(activePlayer.item.key10.panic).toEqual(true);
    // ожидаем, что Morevna походила, moveCounter + 1
    expect(activePlayer.moveCounter).toEqual(1);
    // ожидаем, что предыдущая рэндоманая карта с ключом 7 потеряла свойство panic, уйдя на кладбище
    expect(activePlayer.grave.key7).toEqual(
        {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
    );
    // ожидаем, что lastAction.type == CHAINS (используется для вызова звука)
    expect(newGame.game.lastAction.type).toEqual(action.CHAINS);
});

// Test that if opponent has forestMushroom card in item holder, and with 60 % chance,
// active player's one random card in hand got at the beggining of action panic: false property ,
// player acted with this one random card, it went to graveyard and panic property dissapeared
// 'forestMushroom' card has lost its healthCurrent points and went to graveyard
// no cards in hand of player got any panic property now
test('EDGE CASE TEST if by forestMushroom card player got 60% chance and acted by 1 random card, now mushroom went to gravyard and no panic property.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: 'key9',
        target: target.ITEMOPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item[cardToTest] = forestMushroom;
    gameForTest.game.players[1].item[cardToTest].healthCurrent = 1;
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].hand = {
        key10: {
            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
        },
        key1: {
            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
        },
        key9: {
            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: false,
        },
        key7: {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false, panic: true,
        },
        key5: {
            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
        },
    };

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта forest mushrooms ушла на кладбище Яги и здоровье ее восстановилось
    expect(Object.keys(activePlayer.grave)).toContain(cardToTest);
    expect(activePlayer.grave[cardToTest].healthCurrent).toEqual(2);

    // ожидаем, что ни одна из карт в руке Morevna не содержат свойства panic: true
    expect(Object.values(inactivePlayer.hand)).not.toContainEqual({ panic: false });
    // ожидаем, что предыдущая рэндоманая карта с ключом 9 потеряла свойство panic, уйдя на кладбище
    expect(inactivePlayer.grave.key9).toEqual(
        {
            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false,
        },
    );
    // ожидаем, что lastAction.type == ATTACKITEMOPPONENT (используется для вызова звука)
    expect(newGame.game.lastAction.type).toEqual(action.ATTACKITEMOPPONENT);
});

// Test that if active player has forestMushroom card in item from previous turn,
// with 60 % chance, opponent's one random card in hand got at previous act panic: true property ,
// then if active player acts now - none of the cards get panic property
test('EDGE CASE TEST if forestMushroom card is at opponent item, player got 60% chance and acted with 1 random card from hand, turn change, no panic .', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    const healCard = 'key10';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: healCard,
        target: target.HERO,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].hand[healCard] = apple;
    gameForTest.game.players[1].item[cardToTest] = forestMushroom;
    gameForTest.game.players[1].item[cardToTest].healthCurrent = 2;
    gameForTest.game.active = bob.id;
    gameForTest.game.players[0].hand = {
        key10: {
            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
        },
        key1: {
            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false,
        },
        key5: {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
        key7: {
            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
        },
    };

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что Yaga походила, moveCounter + 1
    expect(activePlayer.moveCounter).toEqual(1);
    // ожидаем, что карта forest mushrooms в item holder активного игрока Yaga
    expect(Object.keys(activePlayer.item)).toContain(cardToTest);
    // ожидаем, что здоровье карты 'forestMushroom' в item Яги после её дейтсвия не уменьшилось
    expect(activePlayer.item[cardToTest].healthCurrent).toEqual(2);
    // ожидаем, что предыдущая рэндоманая карта Моревны с ключом 7
    // осталась у неё в руке и сохраниласвойство panic до следующего её хода
    expect(inactivePlayer.hand.key7).toEqual(
        {
            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: false, panic: true,
        },
    );
    // we check every card in hand of inactive player Morevna
    // ожидаем, что ни одна из карт в руке Morevna не содержат свойства panic: true,кроме 'chemise'
    for (let i = Object.keys(inactivePlayer.hand).length - 1; i >= 0; i--) {
        if (Object.values(inactivePlayer.hand)[i].id === 'chemise') {
            Object.keys(inactivePlayer.hand).splice(i, 1);
        }
    }
});

// Test that if opponent atacked player with russianOven,
// player got 2 cards with disabled: true ( he can not act with these cards)
// and since opponent has forestMushroom card in item holder, then with 60 % chance,
// active player's one random card in hand got panic: false property
// other cards - panic: true, at the beggining of action
// and if  the same random card get panic: false that already got disabled: true,
// then we delete disbabled: true and override panice: false instead - player can act with this card
test('EDGE CASE TEST forestMushroom card is at opponent item && player attacked by russianOver, then with 60% player can act only by 1 random card even if it was chained by russian Oven.', () => {
    // we define card key for testing
    const cardToTest = 'key20';
    // we mock incoming message from frontend
    const msg = {
        type: message.ACTION,
        activeCard: 'key7',
        target: target.OPPONENT,
    };

    // we put game engine into needed state
    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].item[cardToTest] = forestMushroom;
    gameForTest.game.players[0].hand = {
        key10: {
            id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false,
        },
        key1: {
            id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false,
        },
        key7: {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
        key9: {
            id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: true,
        },
        key5: {
            id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: true,
        },
    };

    // we create new engine with our game state
    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // We find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта forest mushrooms в item holder неактивного игрока Yaga
    expect(Object.keys(inactivePlayer.item)).toContain(cardToTest);
    // ожидаем, что карта в руке Morevna потеряла свойство disabled: true и получила panic: false
    expect(activePlayer.hand).toEqual(
        {
            key10: {
                id: 'magicMirror', type: 'item', category: 'reflect', points: 2, initialpoints: 2, disabled: false, panic: true,
            },
            key1: {
                id: 'horsemanBlack', type: 'action', category: 'attack', points: 3, initialpoints: 3, disabled: false, panic: true,
            },
            key9: {
                id: 'bogatyr', type: 'action', category: 'attack', points: 4, initialpoints: 4, disabled: false, panic: false,
            },
            key5: {
                id: 'chemise', type: 'action', category: 'heal', points: 5, initialpoints: 5, disabled: true, panic: true,
            },
        },
    );
    // ожидаем, что Morevna походила, moveCounter + 1
    expect(activePlayer.moveCounter).toEqual(1);
    // ожидаем, что предыдущая рэндоманая карта с ключом 7 потеряла свойство panic, уйдя на кладбище
    expect(activePlayer.grave.key7).toEqual(
        {
            id: 'horsemanWhite', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
    );
});
