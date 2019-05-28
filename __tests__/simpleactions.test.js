/* eslint-disable max-len */
/* eslint-disable no-plusplus */

// import module for tests
const application = require('../backend/application');

test('msg ACTION CASE1, player wants to move his card to graveyard', () => {
    // active Card is always a card
    // target can be a place (item place, graveyard, deck, herom etc) or a card
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'graveyard',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
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
                    health: 13,
                    hero: 'morevna',
                    // We expect the card 10 will be moved to graveyard
                    hand: {
                        key11: {},
                        key1: {},
                        key8: {},
                        key13: {},
                        key10: { points: 3, disabled: false },
                    },
                    moveCounter: 0,
                    item: {},
                    // graveyard is empty
                    grave: {},
                },
                {
                    active: false,
                    hero: 'yaga',
                    item: {},
                },
            ],

        },

    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // expect that player[0] is active
    expect(result.game.players[0].active).toBeTruthy();
    // expect that his cunter was increased
    expect(result.game.players[0].moveCounter).toEqual(1);
    // оexpect the card to move to graveryard
    expect(Object.keys(result.game.players[0].grave)).toContain('key10');
    // expect the card to move out of the hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key10');
});

// player heals for less than max
test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing is less than his max', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'hero',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
    application.setApp({
        game: {
            phase: 'ACTIVE',
            players: [
                {
                    active: false,
                    hero: 'yaga',
                    item: {},
                    hand: {},
                    grave: {},
                },
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal',
                            disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
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
    expect(result.game.players[1].moveCounter).toEqual(0);
    // expect that the card was an action card
    expect(result.game.players[1].grave.key1.type).toEqual('action');
    // expect that hero's health was increased
    expect(result.game.players[1].health.current).toEqual(8);
    // expect that the card was moved to graveyard
    expect(Object.keys(result.game.players[1].grave)).toContain('key1');
    // expect the card not to be in hand
    expect(Object.keys(result.game.players[1].hand)).not.toContain('key1');
});

// player heals for over the max
test('msg ACTION CASE2 player wants to heal himself. He is damaged and the healing will go over max', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'hero',
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
                    health: { current: 12, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal',
                            disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    item: {},
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
    expect(result.game.players[0].moveCounter).toEqual(0);
    // expect that the card was an action card
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect that hero's health was increased
    expect(result.game.players[0].health.current).toEqual(13);
    // expect that the card was moved to graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the card not to be in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// player attacks unprotected enemy
test('msg ACTION CASE3 player attacks the enemy, no protection', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key13',
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
                        key11: {},
                        key8: {},
                        key13: {
                            type: 'action', category: 'attack', points: 2, disabled: false,
                        },
                        key1: {},
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
                        key12: {}, key8: {}, key15: {}, key3: { type: 'action' },
                    },
                    item: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // expect the counter of actions to grow
    expect(result.game.players[0].moveCounter).toEqual(1);
    // expect that it was the action card
    expect(result.game.players[0].grave.key13.type).toEqual('action');
    // expect that it was the attack card
    expect(result.game.players[0].grave.key13.category).toEqual('attack');
    // expect opponent with no shield items
    expect(result.game.players[1].item).toEqual({});
    // expect opponents health to decrease
    expect(result.game.players[1].health.current).toEqual(4);
    // expect the card to be moved to graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key13');
    // expect the card to be removed from the hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key13');
});

// player attacks enemy with attack power == shield points
test('msg ACTION CASE3 player attacks, shield & card go to graveyard', () => {
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
            phase: 'ACTIVE',
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'shield', points: 3,
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
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect there's no item anymore
    expect(result.game.players[1].item).toEqual({});
    // expect the itme is now on graveyard
    expect(Object.keys(result.game.players[1].grave)).toContain('key7');

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// player attacks enemy with attack power > shield points
test('msg ACTION CASE3 player attacks with more points than shield has, shield & card go to graveyard, opponent hit', () => {
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
            phase: 'ACTIVE',
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'shield', healthCurrent: 1,
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
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect there's no item anymore
    expect(result.game.players[1].item).toEqual({});
    // expect the itme is now on graveyard
    expect(Object.keys(result.game.players[1].grave)).toContain('key7');
    // expect opponen's health to decrease
    expect(result.game.players[1].health.current).toEqual(4);

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// player attacks enemy with attack power < shield points
test('msg ACTION CASE3 player attacks with less than shield, card goes to graveyard, shield points decreased', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player attack card's key to key1
    application.setApp({
        game: {
            phase: 'ACTIVE',
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
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
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect the shield helath to lessen
    expect(result.game.players[1].item.key7.healthCurrent).toEqual(1);

    // expect the acting card is now on the graveyard
    expect(Object.keys(result.game.players[0].grave)).toContain('key1');
    // expect the acting card is now not in hand
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test, that when massage with item card  received, then
// if item holder is empty, active player moves item there
test('msg ACTION CASE4 received: active player choose item, if his item holder is empty player moves item there.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'item',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player card's key to key10
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            id: 'shieldLarge', type: 'item', category: 'shield', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    item: {},
                },
            ],
        },
    });
    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // ожидаем, что item holder активного игрока пустой
    expect(Object.values(result.game.players[0].item).length).toEqual(1);
    // ожидаем, что карта предмет окажется в item holder активного игрока
    expect(result.game.players[0].item.key1.type).toEqual('item');
    // ожидаем, что карта-item убралась из руки.
    expect(Object.keys(result.game.players[0].hand)).not.toContain('key1');
});

// Test, that active player after his moveCounter = 2 gets missing cards to his hand.
// Inactive Player becomes active. Turn change.
test('msg ACTION ANY received: active player moveCounter = 2 after his action, he gets missing cards to hand, inactive player becomes active.', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'hero',
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
                    health: { current: 12, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action',
                            points: 3,
                            category: 'heal',
                            disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    item: {},
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
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that active player hand has 4  cards before game passes to opponent
    expect(Object.keys(result.game.players[0].hand).length).toEqual(5);

    // expect that inactive player becomes active
    expect(result.game.players[1].active).toEqual(true);
});

// If Player does not have any life points left game.phase = 'OVER'
test('msg ACTION ANY, player life points === 0, game.phase = "OVER" ', () => {
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
            phase: 'ACTIVE',
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            id: 'bogatyr', type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {},
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 2, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
                    },
                    item: { },
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

    // expect the inactive player health ===0
    expect(result.game.players[1].health.current).toBeLessThanOrEqual(0);

    // expect manager, screen is now Victory
    expect(result.game.phase).toEqual('OVER');
});

// player moves a card to graveyard
test('msg ACTION CASE 5, player wants to move his card from item holder to graveyard', () => {
    // active Card is always a card
    // target can be a place (item place, graveyard, deck, hero etc) or a card
    const msg = {
        type: 'ACTION',
        activeCard: 'key10',
        target: 'graveyard',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
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
                    health: 13,
                    hero: 'morevna',
                    hand: {
                        key11: {}, key1: {}, key8: {}, key13: {},
                    },
                    // We expect the card 10 will be moved to graveyard
                    item: { key10: { points: 3, disabled: false } },
                    moveCounter: 0,
                    // graveyard is empty
                    grave: {},
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 8 },
                    item: {},
                },
            ],

        },

    });

    // Call the message function from application with this message and mocked function.
    application.msgReceived(msg, sendReply);
    expect(sendReply.mock.calls.length).toBe(1);

    // to use it more easy let's save the received app into result
    const result = sendReply.mock.calls[0][0];

    // expect that player[0] is active
    expect(result.game.players[0].active).toBeTruthy();
    // expect that his cunter was increased
    expect(result.game.players[0].moveCounter).toEqual(1);
    // оexpect the card to move to graveryard
    expect(Object.keys(result.game.players[0].grave)).toContain('key10');
    // expect the card to move out of the item
    expect(Object.keys(result.game.players[0].item)).not.toContain('key10');
    // expect the opponent health !== 0
    expect(result.game.players[1].health.current).toBeGreaterThan(0);
});

// test - player attacks enemy with attack power < shieldLarge points
// only opponent shield points decreased for activeCard points, other shield cards points remain
test('msg ACTION CASE3 player attacks with less points than shieldLarge has, only attacked shield cards points decreased', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player attack card's key to key1
    application.setApp({
        game: {
            phase: 'ACTIVE',
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
                    },
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4, disabled: false,
                        },
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 2,
                    item: {
                        key9: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 3,
                        },
                    },
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
                        key3: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4, health: 4, disabled: false,
                        },
                    },
                    item: {
                        key7: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4, health: 4, disabled: false,
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

    // expect the Large shield card key7 health to lessen
    expect(result.game.players[1].item.key7.healthCurrent).toEqual(1);

    // expect the Large shield card in opponent hand with key3 remains its health points
    expect(result.game.players[1].hand.key3.healthCurrent).toEqual(4);

    // expect the Large shield card in opponent hand with key3 remains its health points
    expect(result.game.players[0].hand.key13.healthCurrent).toEqual(4);

    // expect the Large shield card in active player item with key9 remains its health points
    expect(result.game.players[0].item.key9.healthCurrent).toEqual(3);
});

// test - player attacks enemy with attack power = shield small points
// only opponent shield points decreased for activeCard points, other shield cards points remain
test('msg ACTION CASE3 player attacks with less points than shieldLarge has, only attacked shield cards points decreased', () => {
    const msg = {
        type: 'ACTION',
        activeCard: 'key1',
        target: 'opponent',
    };
    // Mock sendReply function
    const sendReply = jest.fn();
    // Mock will rewrite all math.random and set active player attack card's key to key1
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
                    },
                    health: { current: 5, maximum: 13 },
                    hero: 'morevna',
                    hand: {
                        key11: {},
                        key8: {},
                        key13: {
                            id: 'shieldSmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2,
                        },
                        key1: {
                            type: 'action', category: 'attack', points: 1, disabled: false,
                        },
                    },
                    moveCounter: 2,
                    item: {
                        key9: {
                            id: 'shieldSmall', type: 'item', category: 'shield', healthCurrent: 1, health: 2,
                        },
                    },
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
                        key3: {
                            id: 'shieldSmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2,
                        },
                    },
                    item: {
                        key7: {
                            id: 'shieldSmall', type: 'item', category: 'shield', healthCurrent: 2, health: 2,
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

    // expect the small shield card key7 moved to gravyead and got its initial points back
    expect(result.game.players[1].item.key7.healthCurrent).toEqual(1);

    // expect the small shield card in opponent hand with key3 remains its health points
    expect(result.game.players[1].hand.key3.healthCurrent).toEqual(2);

    // expect the small shield card in opponent hand with key3 remains its health points
    expect(result.game.players[0].hand.key13.healthCurrent).toEqual(2);

    // expect the Large shield card in active player item with key9 remains its health points
    expect(result.game.players[0].item.key9.healthCurrent).toEqual(1);
});

// test to check that attacking card takes only points of shield in opponent's item
// and does not take points from other key shield in player's item
test('msg ACTION for shields with the same key, shields in item', () => {
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
            phase: 'ACTIVE',
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
                        key11: {},
                        key8: {},
                        key13: {},
                        key1: {
                            type: 'action', category: 'attack', points: 3, disabled: false,
                        },
                    },
                    moveCounter: 1,
                    item: {
                        key7: {
                            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4,
                        },
                    },
                    grave: { key10: {} },
                },
                {
                    active: false,
                    hero: 'yaga',
                    health: { current: 6, maximum: 15 },
                    hand: {
                        key12: {}, key8: {}, key15: {}, key3: {},
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
    expect(result.game.players[0].moveCounter).toEqual(0);

    // expect that it was an action card as we performing the action
    expect(result.game.players[0].grave.key1.type).toEqual('action');
    // expect it was the attack card
    expect(result.game.players[0].grave.key1.category).toEqual('attack');

    // expect shield for player 0 did not change
    expect(result.game.players[0].item).toEqual({
        key7: {
            id: 'shieldLarge', type: 'item', category: 'shield', healthCurrent: 4,
        },
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

// test to check that attacking card takes only points of shield in opponent's item
// and does not take points from other key shield in player's hand
test('msg ACTION for shields with the same key, shield with the same key in hand', () => {
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
test('msg ACTION received: no card in opponent item, player trying to attack, but cannot do it.', () => {
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
test('msg ACTION received: opponent has shield in item, player trying to attack, but cannot do it.', () => {
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
