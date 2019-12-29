/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import {
    dealAllState,
} from '../__data__/states';

import {
    message, target, card, action,
} from '../../constants';

import cards from '../__data__/cards';

const {
    russianOven, apple,
} = cards;

const GameEngine = require('../index');

jest.mock('../../gameTerminal/randomFunc');

//* ****** Russian Oven Card Tests ** *//

// Test, that when a player attackes with  russianOven card, then opponent
// cannot use two random cards from his hand in next turn (move counter 1+1)
test('msg ACTION received: active player attacks with russianOven, it disables 2 cards in hand of opponent for 1 turn.', () => {
    const cardToTest = 'key20';
    const msg = {
        type: message.ACTION,
        activeCard: cardToTest,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].hand.key20 = russianOven;
    gameForTest.game.players[1].hand = {
        key11: { disabled: false },
        key8: { disabled: false },
        key13: { disabled: false },
        key1: { disabled: false },
        key3: { disabled: false },
    };

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта russianOven на кладбище походившего игрока
    expect(activePlayer.grave[cardToTest].id).toEqual(russianOven.id);
    expect(activePlayer.grave[cardToTest].type).toEqual(card.ACTIONCARD);
    expect(Object.keys(activePlayer.hand)).not.toContain(cardToTest);
    // ожидаем, что карта russianOven неактивного игрока имеет category - holdCard
    expect(activePlayer.grave[cardToTest].category).toEqual(card.HOLDCARDCATEGORY);
    // ожидаем, что 2 карты  атакованного игрока получили свойство disabled: true
    expect(Object.values(inactivePlayer.hand)).toContainEqual(
        { disabled: true },
        { disabled: true },
        { disabled: false },
        { disabled: false },
        { disabled: false },
    );
    // ожидаем, что lastAction.type == CHAINS (используется для вызова звука)
    expect(newGame.game.lastAction.type).toEqual(action.CHAINS);
});

// Test, that when a player is attacked with  russianOven card by opponent, then this player
// cannot use two random cards from his hand  during his turn ( move counter 1+1)
test('msg ACTION received: inactive player attacked with russianOven, 2 cards in hand of active player got disabled: true for full turn.', () => {
    const cardToTest = 'key23';
    const bajunCard = 'key3';
    const msg = {
        type: message.ACTION,
        activeCard: bajunCard,
        target: target.OPPONENT,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[1].grave.key23 = russianOven;
    gameForTest.game.players[0].hand = {
        key11: { disabled: true },
        key8: { disabled: true },
        key13: { disabled: false },
        key1: { disabled: false },
        key3: {
            id: 'bajun', type: 'action', category: 'attack', points: 1, initialpoints: 1, disabled: false,
        },
    };

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта russianOven на кладбище неактивного игрока
    expect(inactivePlayer.grave[cardToTest].id).toEqual(russianOven.id);

    // ожидаем, что 2 карты  активного игрока со свойством disabled: true
    expect(Object.values(activePlayer.hand)).toContainEqual(
        { disabled: true }, { disabled: true }, { disabled: false }, { disabled: false },
    );
    // ожидаем, что у активного игрока счетчик хода равен 1
    expect(activePlayer.moveCounter).toEqual(1);
});

// Test, that when a player has been attacked with  russianOven card by opponent, then this player
// get back disabled: false to all cards in hand after his full turn ( move counter 1+1)
test('msg ACTION received:  all cards (incl disabled by russianOven prev) in hand of active player got disabled: false after full turn.', () => {
    const appleCard = 'key2';
    const cardToTest = 'key23';
    const msg = {
        type: message.ACTION,
        activeCard: appleCard,
        target: target.HERO,
    };

    const gameForTest = JSON.parse(JSON.stringify(dealAllState));
    gameForTest.game.players[0].moveCounter = 1;
    gameForTest.game.players[0].health.current = 10;
    gameForTest.game.players[1].grave.key23 = russianOven;
    gameForTest.game.players[0].hand = {
        key11: { disabled: true },
        key8: { disabled: true },
        key13: { disabled: false },
        key2: apple,
    };

    const engine = new GameEngine(gameForTest);
    engine.handle(msg);
    const newGame = engine.getState();

    // Find active and inactive players
    const activePlayer = newGame.game.players.find((p) => p.id === newGame.game.active);
    const inactivePlayer = newGame.game.players.find((p) => p.id !== newGame.game.active);

    // ожидаем, что карта russianOven на кладбище активного игрока
    expect(activePlayer.grave[cardToTest].id).toEqual(russianOven.id);
    // ожидаем, что 2 карты  походившего игрока,
    // что были со свойством disabled: true - стали disabled: false
    expect(Object.values(inactivePlayer.hand)).toContainEqual(
        { disabled: false }, { disabled: false }, { disabled: false },
    );
    // we check every card dealt to ex-active player 0
    for (let i = 0; i < Object.keys(inactivePlayer.hand).length; i++) {
    // and we expect inactive player 0 to have disabled: false property in each card
        expect(Object.values(inactivePlayer.hand)[i]).toHaveProperty('disabled', false);
    }
    // ожидаем, что у походившего  игрока счетчик хода равен 0
    expect(activePlayer.moveCounter).toEqual(0);
});
