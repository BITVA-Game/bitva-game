/* eslint-disable max-len */
/* eslint-disable no-plusplus */

// import module for tests
import {
    gameStartState, gameP1DamagedState, gameP2HasShieldState,
    gameP2HasSmallShieldState, gameP1Action2, gameP2Dying,
} from '../__mocks__/stateMock';

const application = require('../gameTerminal/application');

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getActivePlayer(newGame) {
    return newGame.game.players.find(player => player.id === newGame.game.active);
}

function getInActivePlayer(newGame) {
    return newGame.game.players.find(player => player.id !== newGame.game.active);
}


// test to check that attacking card takes only points of shield in opponent's item
// and does not take points from other key shield in player's hand
test.skip('msg ACTION for shields with the same key, shield with the same key in hand', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player arrack card's key to key1
    application.setApp({
        game: {
            players: [
                {
                    active: true,
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key7: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4, disabled: false,
                        },
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 0,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {},
                        key8: {},
                        key15: {},
                        key3: {},
                    },
                    item: {
                        key7: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4,
                        },
                    },
                    grave: { },
                },
            ],
        },
    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // expect that his counter set to 0 after turn's change
    expect(result.game.players[0].moveCounter).toEqual(1);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect shield for player 0 did not change
    expect(result.game.players[0].hand).toEqual({
        key7: {
            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4, disabled: false,
        },
        key8: {},
        key13: {},
    });

    // expect shield for player 1 lost health
    expect(result.game.players[1].item).toEqual({
        key7: {
            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 1,
        },
    });

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test, that when active player cannot attacks item holder of opponent of it is empty
test.skip('msg ACTION received: no card in opponent item, player trying to attack, but cannot do it.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'itemOpponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 13 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: {},
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: { },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта dead water ушла на кладбище неактивного игрока
    expect(Object.keys(result.game.players[0].hand)).toContain('key1');
    // ожидаем, что moveCounter активного игрока не изменился
    expect(result.game.players[0].moveCounter).toEqual(1);
    // ожидаем, что текущее здоровье игроков не изменится
    expect(result.game.players[0].health.current).toEqual(10);
    expect(result.game.players[1].health.current).toEqual(8);
});

// Test, that active player cannot attacks shield directly at item holder of opponent
test.skip('msg ACTION received: opponent has shield in item, player trying to attack, but cannot do it.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'itemOpponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: true,
                    hero: 'morevna',
                    cards: {
                        key0: {},
                        key2: {},
                        key17: {},
                        key5: {},
                        key7: {},
                        key4: {},
                        key6: {},
                        key14: {},
                        key12: {},
                        key9: {},
                    },
                    health: { current: 10, maximum: 13 },
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: {},
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8, maximum: 15 },
                    item: {
                        key10: {
                            id: 'shieldSmall', type: 'item', category: 'shield', health: 2, healthCurrent: 2, disabled: false,
                        },
                    },
                    grave: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что карта dead water ушла на кладбище неактивного игрока
    expect(Object.keys(result.game.players[0].hand)).toContain('key1');
    // ожидаем, что moveCounter активного игрока не изменился
    expect(result.game.players[0].moveCounter).toEqual(1);
    // ожидаем, что текущее здоровье игроков не изменится
    expect(result.game.players[0].health.current).toEqual(10);
    expect(result.game.players[1].health.current).toEqual(8);
});
